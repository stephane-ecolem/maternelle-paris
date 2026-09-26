import { test } from 'node:test';
import assert from 'node:assert/strict';
import { construireShortlist } from '../src/lib/shortlist.ts';
import type { Ecole } from '../src/lib/types.ts';
import type { Secteur } from '../src/lib/shortlist.ts';

// Écoles fictives de test, jamais publiées.
const ecole = (id: string, arr: number, statut: Ecole['statut'], lon: number, extra: Partial<Ecole> = {}): Ecole => ({
  id, nom: `Test ${id}`, adresse: 'rue test', codePostal: `750${String(arr).padStart(2, '0')}`, arrondissement: arr,
  typeEtablissement: 'maternelle', statut, contrat: statut === 'public' ? null : 'hors contrat', telephone: null, site: null,
  position: [lon, 0], origine: 'annuaire', enrichissement: null, ecoleM: false, ...extra,
});
const secteur: Secteur = { idEcole: 'SECT', geometrie: { type: 'Polygon', coordinates: [[[-1, -1], [1, -1], [1, 1], [-1, 1], [-1, -1]]] } };

test("ordre : secteur, puis autres par distance, puis publiques hors secteur", () => {
  const ecoles = [
    ecole('PUB-PROCHE', 11, 'public', 0.001),
    ecole('PRIV-LOIN', 11, 'privé', 0.02),
    ecole('SECT', 11, 'public', 0.01),
    ecole('PRIV-PROCHE', 11, 'privé', 0.002),
    ecole('HORS-ZONE', 7, 'privé', 0.0001),
  ];
  const r = construireShortlist({ ecoles, arrondissement: 11, voisinage: [11, 3], position: [0, 0], secteurs: [secteur], critere: 'indifferent' });
  assert.deepEqual(r.map((x) => x.ecole.id), ['SECT', 'PRIV-PROCHE', 'PRIV-LOIN', 'PUB-PROCHE']);
});

test("École M n'a aucun traitement d'ordre et respecte le voisinage", () => {
  const ecoles = [ecole('M', 11, 'privé', 0.05, { ecoleM: true, nom: 'École M' }), ecole('A', 11, 'privé', 0.01), ecole('M2', 15, 'privé', 0.0, { ecoleM: true })];
  const r = construireShortlist({ ecoles, arrondissement: 11, voisinage: [11], position: [0, 0], secteurs: [], critere: 'indifferent' });
  assert.deepEqual(r.map((x) => x.ecole.id), ['A', 'M']);
});

test("critère 2 ans : rien n'est déduit sans âge relevé", () => {
  const ecoles = [ecole('PUB', 11, 'public', 0.01), ecole('PRIV', 11, 'privé', 0.02, { enrichissement: { langues: null, pedagogie: null, ageMinMois: 24, admissionsContinues: null, sourceUrl: 'https://exemple.test', dateReleve: '2026-09-01', confiance: 'explicite' } })];
  const r = construireShortlist({ ecoles, arrondissement: 11, voisinage: [11], position: [0, 0], secteurs: [], critere: '2ans' });
  assert.deepEqual(r.map((x) => x.ecole.id), ['PRIV']);
});
