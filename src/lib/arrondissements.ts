export interface Arrondissement {
  numero: number;
  /** "1er", "2e", ... */
  ordinal: string;
  /** Segment d'URL stable : "1er-arrondissement" */
  slug: string;
  /** Codes postaux rattachés, y compris les codes techniques (75116 pour le 16e). */
  codesPostaux: string[];
  /** Mairie compétente. Paris Centre regroupe les quatre premiers arrondissements. */
  mairie: string;
}

const ordinal = (n: number) => (n === 1 ? '1er' : `${n}e`);

export const ARRONDISSEMENTS: Arrondissement[] = Array.from({ length: 20 }, (_, i) => {
  const numero = i + 1;
  const cp = `750${String(numero).padStart(2, '0')}`;
  return {
    numero,
    ordinal: ordinal(numero),
    slug: `${ordinal(numero)}-arrondissement`,
    codesPostaux: numero === 16 ? [cp, '75116'] : [cp],
    mairie: numero <= 4 ? 'Mairie de Paris Centre' : `Mairie du ${ordinal(numero)} arrondissement`,
  };
});

export const libelle = (a: Arrondissement) => `${a.ordinal} arrondissement`;

export function arrondissementDepuisCodePostal(cp: string): Arrondissement | undefined {
  const code = cp.trim();
  return ARRONDISSEMENTS.find((a) => a.codesPostaux.includes(code));
}

export const parSlug = (slug: string) => ARRONDISSEMENTS.find((a) => a.slug === slug);
