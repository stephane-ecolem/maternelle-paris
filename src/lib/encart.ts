import { ECOLES_M, type EcoleMEncart } from '../data/ecole-m.ts';
import { voisinage } from './adjacence.ts';

export function ecolesMPour(arrondissement: number): EcoleMEncart[] {
  return ECOLES_M.filter((e) =>
    e.arrondissement === null
      ? (e.afficherPour ?? []).includes(arrondissement)
      : voisinage(e.arrondissement).includes(arrondissement),
  );
}
