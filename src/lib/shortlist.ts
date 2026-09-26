import type { Ecole } from './types.ts';
import { distanceMetres, formaterDistance, contient, type Geometrie, type Position } from './geo.ts';
import { comparerNoms } from './tri.ts';

export type Critere = 'bilingue' | 'montessori' | '2ans' | 'proximite' | 'indifferent';

/** Secteur normalisé par scripts/ : géométrie + identifiant de l'école de secteur dans notre modèle. */
export interface Secteur { idEcole: string; geometrie: Geometrie }

export interface Resultat {
  ecole: Ecole;
  groupe: 'secteur' | 'autres' | 'hors-secteur';
  distance: number | null;
  raisons: string[];
}

export interface Entree {
  ecoles: Ecole[];
  arrondissement: number;
  /** Arrondissement saisi + limitrophes. */
  voisinage: number[];
  position: Position | null;
  secteurs: Secteur[];
  critere: Critere;
}

export function trouverSecteur(p: Position, secteurs: Secteur[]): string | null {
  return secteurs.find((s) => contient(s.geometrie, p))?.idEcole ?? null;
}

function correspond(e: Ecole, c: Critere): string | null {
  const en = e.enrichissement;
  const releve = en ? ` (relevé du ${en.dateReleve}${en.confiance === 'à vérifier' ? ', à vérifier' : ''})` : '';
  switch (c) {
    case 'bilingue':
      return en?.langues?.some((l) => l.toLowerCase() === 'anglais') ? `Enseignement en anglais${releve}` : null;
    case 'montessori':
      return en?.pedagogie?.toLowerCase().includes('montessori') ? `Pédagogie ${en.pedagogie}${releve}` : null;
    case '2ans':
      // Seul l'âge relevé école par école compte. Rien n'est déduit pour le public.
      return en?.ageMinMois != null && en.ageMinMois <= 24 ? `Accueil à partir de ${en.ageMinMois} mois${releve}` : null;
    default:
      return '';
  }
}

/**
 * Ordre : l'école de secteur (fait administratif), puis les autres écoles par
 * distance croissante, puis les écoles publiques hors secteur par distance.
 * Aucune école ne bénéficie d'un traitement d'ordre particulier.
 * Sans position (repli code postal) : pas de secteur, ordre alphabétique,
 * arrondissement saisi avant les limitrophes.
 */
export function construireShortlist(x: Entree): Resultat[] {
  const idSecteur = x.position ? trouverSecteur(x.position, x.secteurs) : null;
  const resultats: Resultat[] = [];

  for (const e of x.ecoles) {
    if (!x.voisinage.includes(e.arrondissement)) continue;
    const estSecteur = e.id === idSecteur;
    const motif = correspond(e, x.critere);
    if (!estSecteur && motif === null) continue;

    const distance = x.position && e.position ? distanceMetres(x.position, e.position) : null;
    const raisons: string[] = [];
    if (estSecteur) raisons.push('École de secteur de l’adresse saisie, d’après les secteurs publiés par la Ville de Paris');
    if (motif) raisons.push(motif);
    raisons.push(e.arrondissement === x.arrondissement ? 'Dans votre arrondissement' : 'Dans un arrondissement limitrophe');
    if (distance !== null) raisons.push(`À ${formaterDistance(distance)} à vol d’oiseau`);

    const groupe = estSecteur ? 'secteur' : idSecteur && e.statut === 'public' ? 'hors-secteur' : 'autres';
    resultats.push({ ecole: e, groupe, distance, raisons });
  }

  const rang = { secteur: 0, autres: 1, 'hors-secteur': 2 } as const;
  return resultats.sort((a, b) => {
    if (rang[a.groupe] !== rang[b.groupe]) return rang[a.groupe] - rang[b.groupe];
    if (a.distance !== null && b.distance !== null) return a.distance - b.distance;
    if (a.ecole.arrondissement !== b.ecole.arrondissement) {
      if (a.ecole.arrondissement === x.arrondissement) return -1;
      if (b.ecole.arrondissement === x.arrondissement) return 1;
    }
    return comparerNoms(a.ecole.nom, b.ecole.nom);
  });
}
