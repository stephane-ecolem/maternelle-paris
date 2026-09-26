/**
 * Écoles École M pour l'encart éditeur. Noms, adresses et UAI à fournir.
 * Règle : une école parisienne apparaît pour son arrondissement et les
 * arrondissements limitrophes ; Clichy-Levallois uniquement pour le 17e.
 * Dans les tables, les écoles École M sont des écoles comme les autres
 * (repérées par leur UAI, champ ecoleM), sans aucun traitement d'ordre.
 */
export interface EcoleMEncart {
  nom: string;
  adresse: string;
  url?: string;
  uai?: string;
  /** Arrondissement parisien, ou null hors Paris. */
  arrondissement: number | null;
  /** Pour une école hors Paris : arrondissements où l'encart l'affiche. */
  afficherPour?: number[];
}

export const ECOLES_M: EcoleMEncart[] = [];
