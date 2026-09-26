/**
 * Préfixes génériques ignorés pour le tri alphabétique, afin qu'aucune école
 * ne remonte en tête du seul fait de son intitulé ("École ...", "Groupe scolaire ...").
 */
const PREFIXES = [
  'groupe scolaire',
  'ecole maternelle privee',
  'ecole maternelle publique',
  'ecole maternelle',
  'ecole primaire privee',
  'ecole primaire publique',
  'ecole primaire',
  'ecole elementaire',
  'ecole privee',
  'ecole',
  'maternelle',
  'cours',
];

const ARTICLES = /^(l'|la |le |les |du |de la |des |de |d')/;

export function normaliser(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[’`]/g, "'")
    .replace(/[^a-z0-9' ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function cleDeTri(nom: string): string {
  let s = normaliser(nom);
  for (const p of PREFIXES) {
    if (s === p) break;
    if (s.startsWith(p + ' ')) {
      s = s.slice(p.length + 1);
      break;
    }
  }
  return s.replace(ARTICLES, '').trim() || normaliser(nom);
}

export function comparerNoms(a: string, b: string): number {
  return cleDeTri(a).localeCompare(cleDeTri(b), 'fr', { numeric: true });
}
