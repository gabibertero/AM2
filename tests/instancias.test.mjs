import test from 'node:test';
import assert from 'node:assert/strict';
import { UNIDADES, instanciaDeUnidad, instanciaDeUnidades } from '../src/lib/sitio.js';

test('U1–U3 son p1 y U4–U10 son p2', () => {
  assert.equal(UNIDADES.length, 10);
  for (const { u } of UNIDADES) assert.equal(instanciaDeUnidad(u), ['U1', 'U2', 'U3'].includes(u) ? 'p1' : 'p2');
});
test('un examen es p1 solo si todas sus unidades lo son', () => {
  assert.equal(instanciaDeUnidades(['U1', 'U3']), 'p1');
  assert.equal(instanciaDeUnidades(['U3', 'U4']), 'p2');
  assert.equal(instanciaDeUnidades([]), 'p2');
});
