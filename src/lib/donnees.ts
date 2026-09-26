import ecolesJson from '../data/ecoles.json';
import metaJson from '../data/meta.json';
import type { Ecole, MetaDonnees } from './types.ts';
import { comparerNoms } from './tri.ts';

export const ECOLES = ecolesJson as unknown as Ecole[];
export const META = metaJson as MetaDonnees;

export const ecolesDe = (arrondissement: number) =>
  ECOLES.filter((e) => e.arrondissement === arrondissement).sort((a, b) => comparerNoms(a.nom, b.nom));

export function formaterDate(iso: string | null): string {
  if (!iso) return 'à venir';
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}
