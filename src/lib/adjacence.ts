import table from '../data/adjacence.json';

/**
 * Arrondissements limitrophes, calculés à partir des polygones officiels des
 * arrondissements (scripts/adjacence.ts) puis validés à la main.
 * Tant que la table est vide, seul l'arrondissement lui-même est retourné.
 */
const ADJACENCE = table as Record<string, number[]>;

export function limitrophes(numero: number): number[] {
  return ADJACENCE[String(numero)] ?? [];
}

export function voisinage(numero: number): number[] {
  return [numero, ...limitrophes(numero)];
}
