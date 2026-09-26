import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lireCsv } from '../src/lib/csv.ts';
import { lireEnrichissement, afficher, afficherAge } from '../src/lib/enrichissement.ts';

test('lecture CSV avec guillemets', () => {
  const l = lireCsv('id,langues\n"A1","anglais; français"\n');
  assert.deepEqual(l, [{ id: 'A1', langues: 'anglais; français' }]);
});

test('source et confiance obligatoires', () => {
  assert.throws(() => lireEnrichissement({ id: 'A', source_url: '', date_releve: '2026-01-01', confiance: 'explicite' }));
  assert.throws(() => lireEnrichissement({ id: 'A', source_url: 'https://x', date_releve: '2026-01-01', confiance: 'oui' }));
});

test('valeurs absentes affichées "non renseigné"', () => {
  const e = lireEnrichissement({ id: 'A', source_url: 'https://x', date_releve: '2026-01-01', confiance: 'explicite', langues: '', age_min_mois: '' });
  assert.equal(e.langues, null);
  assert.equal(afficher(e.pedagogie), 'non renseigné');
  assert.equal(afficherAge(e.ageMinMois), 'non renseigné');
  assert.equal(afficherAge(30), '2 ans 6 mois');
});
