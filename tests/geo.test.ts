import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contient, distanceMetres, type Geometrie } from '../src/lib/geo.ts';

const carre: Geometrie = { type: 'Polygon', coordinates: [[[0, 0], [2, 0], [2, 2], [0, 2], [0, 0]], [[0.5, 0.5], [1, 0.5], [1, 1], [0.5, 1], [0.5, 0.5]]] };

test('appartenance au polygone, trous compris', () => {
  assert.equal(contient(carre, [1.5, 1.5]), true);
  assert.equal(contient(carre, [0.75, 0.75]), false);
  assert.equal(contient(carre, [3, 3]), false);
});

test('distance haversine plausible', () => {
  // Notre-Dame -> Tour Eiffel : environ 4,1 km
  const d = distanceMetres([2.3499, 48.853], [2.2945, 48.8584]);
  assert.ok(d > 4000 && d < 4200, String(d));
});
