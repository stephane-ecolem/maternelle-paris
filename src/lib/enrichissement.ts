import type { Ecole, Enrichissement } from './types.ts';

/** Colonnes attendues dans data/enrichissement.csv (voir data/README.md). */
export const COLONNES_ENRICHISSEMENT = [
  'id', 'origine', 'nom', 'adresse', 'code_postal', 'statut', 'contrat',
  'langues', 'pedagogie', 'age_min_mois', 'admissions_continues',
  'source_url', 'date_releve', 'confiance',
] as const;

export const NON_RENSEIGNE = 'non renseigné';

const vide = (v: string | undefined) => v === undefined || v.trim() === '';

function booleen(v: string | undefined): boolean | null {
  if (vide(v)) return null;
  const s = v!.trim().toLowerCase();
  if (['oui', 'true', '1'].includes(s)) return true;
  if (['non', 'false', '0'].includes(s)) return false;
  throw new Error(`Valeur booléenne illisible : "${v}"`);
}

export function lireEnrichissement(ligne: Record<string, string>): Enrichissement {
  if (vide(ligne.source_url)) throw new Error(`Ligne ${ligne.id} : source_url obligatoire`);
  if (vide(ligne.date_releve)) throw new Error(`Ligne ${ligne.id} : date_releve obligatoire`);
  const confiance = ligne.confiance?.trim();
  if (confiance !== 'explicite' && confiance !== 'à vérifier') {
    throw new Error(`Ligne ${ligne.id} : confiance doit valoir "explicite" ou "à vérifier"`);
  }
  const age = vide(ligne.age_min_mois) ? null : Number(ligne.age_min_mois);
  if (age !== null && !Number.isInteger(age)) throw new Error(`Ligne ${ligne.id} : age_min_mois non entier`);
  return {
    langues: vide(ligne.langues) ? null : ligne.langues.split(';').map((s) => s.trim()).filter(Boolean),
    pedagogie: vide(ligne.pedagogie) ? null : ligne.pedagogie.trim(),
    ageMinMois: age,
    admissionsContinues: booleen(ligne.admissions_continues),
    sourceUrl: ligne.source_url.trim(),
    dateReleve: ligne.date_releve.trim(),
    confiance,
  };
}

/**
 * Jointure sur l'identifiant stable. Une école sans ligne d'enrichissement garde
 * enrichissement = null : l'affichage montre alors "non renseigné", jamais une
 * valeur par défaut.
 */
export function joindre(ecoles: Ecole[], lignes: Record<string, string>[]): { ecoles: Ecole[]; orphelines: string[] } {
  const parId = new Map(lignes.filter((l) => l.origine !== 'manuelle').map((l) => [l.id.trim(), l]));
  const orphelines = [...parId.keys()].filter((id) => !ecoles.some((e) => e.id === id));
  return {
    ecoles: ecoles.map((e) => {
      const l = parId.get(e.id);
      return l ? { ...e, enrichissement: lireEnrichissement(l) } : e;
    }),
    orphelines,
  };
}

export const afficher = (v: string | number | null | undefined): string =>
  v === null || v === undefined || v === '' ? NON_RENSEIGNE : String(v);

export function afficherAge(mois: number | null | undefined): string {
  if (mois === null || mois === undefined) return NON_RENSEIGNE;
  const ans = Math.floor(mois / 12);
  const reste = mois % 12;
  return reste ? `${ans} ans ${reste} mois` : `${ans} ans`;
}
