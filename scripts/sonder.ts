/**
 * Jalon 1 : lecture du schéma réel des jeux de données, sans aucun mapping.
 * Usage : node --experimental-strip-types scripts/sonder.ts
 */
const SOURCES = [
  { nom: 'Annuaire de l\'éducation', base: 'https://data.education.gouv.fr/api/explore/v2.1', dataset: 'fr-en-annuaire-education' },
  { nom: 'Secteurs scolaires maternelles', base: 'https://opendata.paris.fr/api/explore/v2.1', dataset: 'secteurs-scolaires-maternelles' },
  { nom: 'Établissements maternelles Ville de Paris', base: 'https://opendata.paris.fr/api/explore/v2.1', dataset: 'etablissements-scolaires-maternelles' },
  { nom: 'Arrondissements', base: 'https://opendata.paris.fr/api/explore/v2.1', dataset: 'arrondissements' },
];
const RECHERCHES = [
  { nom: 'Secteurs scolaires maternelles', base: 'https://opendata.paris.fr/api/explore/v2.1', q: 'secteurs scolaires maternelles' },
  { nom: 'Arrondissements', base: 'https://opendata.paris.fr/api/explore/v2.1', q: 'arrondissements' },
];

async function json(url: string) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
}

async function schema(base: string, dataset: string) {
  const meta = await json(`${base}/catalog/datasets/${dataset}`);
  const exemple = await json(`${base}/catalog/datasets/${dataset}/records?limit=1`);
  console.log(`\n== ${dataset}`);
  console.log('Titre :', meta.metas?.default?.title, '| licence :', meta.metas?.default?.license, '| modifié :', meta.metas?.default?.modified);
  console.log('Total enregistrements :', exemple.total_count);
  for (const f of meta.fields ?? []) console.log(`  ${f.name}\t${f.type}\t${f.label ?? ''}`);
  console.log('Exemple :', JSON.stringify(exemple.results?.[0], null, 2).slice(0, 4000));
}

for (const s of SOURCES) await schema(s.base, s.dataset);
for (const r of RECHERCHES) {
  const res = await json(`${r.base}/catalog/datasets?where=${encodeURIComponent(`search("${r.q}")`)}&limit=10`);
  console.log(`\n## Recherche "${r.q}" :`);
  for (const d of res.results ?? []) console.log(`  ${d.dataset_id}\t${d.metas?.default?.title}`);
}
export {};
