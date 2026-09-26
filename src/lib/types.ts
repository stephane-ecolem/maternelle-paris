import type { Position } from './geo.ts';

/**
 * Modèle interne d'une école, indépendant des noms de champs des sources.
 * Le mapping source -> modèle vit dans scripts/ et ne sera écrit qu'après
 * lecture du schéma réel des jeux de données.
 */
export interface Ecole {
  /** Identifiant stable : UAI, ou identifiant manuel préfixé "MAN-" pour les écoles absentes de l'annuaire. */
  id: string;
  nom: string;
  adresse: string;
  codePostal: string;
  arrondissement: number;
  /** Libellé du type d'établissement (maternelle, primaire), tel que publié. */
  typeEtablissement: string;
  statut: 'public' | 'privé';
  /** null pour le public ou quand la source ne le précise pas. */
  contrat: 'sous contrat' | 'hors contrat' | null;
  telephone: string | null;
  site: string | null;
  position: Position | null;
  origine: 'annuaire' | 'manuelle';
  enrichissement: Enrichissement | null;
  ecoleM: boolean;
}

export interface Enrichissement {
  langues: string[] | null;
  pedagogie: string | null;
  ageMinMois: number | null;
  admissionsContinues: boolean | null;
  sourceUrl: string;
  dateReleve: string;
  confiance: 'explicite' | 'à vérifier';
}

export interface MetaDonnees {
  /** Dates ISO d'extraction, affichées sur chaque page. null tant que rien n'est extrait. */
  annuaire: string | null;
  secteurs: string | null;
  enrichissement: string | null;
}
