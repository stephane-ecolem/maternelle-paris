import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cleDeTri, comparerNoms } from '../src/lib/tri.ts';

test('les préfixes génériques sont ignorés', () => {
  assert.equal(cleDeTri('École maternelle Bernoulli'), 'bernoulli');
  assert.equal(cleDeTri('Groupe scolaire des Lilas'), 'lilas');
  assert.equal(cleDeTri('ECOLE M'), 'm');
});

test("un nom commençant par École ne passe pas devant", () => {
  const noms = ['École Zola', 'Arago', 'École maternelle Buffon'].sort(comparerNoms);
  assert.deepEqual(noms, ['Arago', 'École maternelle Buffon', 'École Zola']);
});
