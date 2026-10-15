import { test } from 'node:test';
import assert from 'node:assert/strict';
import { armarSimulacro, corregirChoices, rngSemilla, mezclar, FORMATO, letra } from '../src/scripts/preguntero-logica.js';

const pool = (t, c, h) => [
  ...Array.from({ length: t }, (_, i) => ({ id: `t${i}`, tipo: 'tema' })),
  ...Array.from({ length: c }, (_, i) => ({ id: `c${i}`, tipo: 'corta' })),
  ...Array.from({ length: h }, (_, i) => ({ id: `h${i}`, tipo: 'choice' })),
];

test('simulacro 2+4+3, sin repetidos, del tipo correcto, para muchas semillas', () => {
  for (let s = 1; s <= 300; s++) {
    const r = armarSimulacro(pool(7, 20, 15), rngSemilla(s));
    assert.deepEqual([r.tema.length, r.corta.length, r.choice.length], [2, 4, 3]);
    for (const [tipo, ids] of Object.entries(r)) {
      assert.equal(new Set(ids).size, ids.length);
      assert.ok(ids.every((id) => id[0] === { tema: 't', corta: 'c', choice: 'h' }[tipo]));
    }
  }
});

test('misma semilla, mismo simulacro; semillas distintas varían', () => {
  const p = pool(7, 20, 15);
  assert.deepEqual(armarSimulacro(p, rngSemilla(42)), armarSimulacro(p, rngSemilla(42)));
  const distintos = new Set(Array.from({ length: 50 }, (_, s) => JSON.stringify(armarSimulacro(p, rngSemilla(s)))));
  assert.ok(distintos.size > 40);
});

test('pool chico o vacío: trae las que haya, sin romper', () => {
  assert.deepEqual(armarSimulacro(pool(1, 0, 2), rngSemilla(1)).tema.length, 1);
  assert.deepEqual(armarSimulacro(pool(1, 0, 2), rngSemilla(1)).corta, []);
  assert.deepEqual(armarSimulacro([], rngSemilla(1)), { tema: [], corta: [], choice: [] });
  assert.deepEqual(FORMATO, { tema: 2, corta: 4, choice: 3 });
});

test('mezclar es una permutación y no toca la entrada', () => {
  const orig = [1, 2, 3, 4, 5, 6];
  for (let s = 0; s < 100; s++) assert.deepEqual(mezclar(orig, rngSemilla(s)).sort(), orig);
  assert.deepEqual(orig, [1, 2, 3, 4, 5, 6]);
});

test('corregirChoices: ok, mal y en blanco', () => {
  const r = corregirChoices({ a: 2, b: 1, c: null }, { a: 2, b: 3, c: 1, d: 4 });
  assert.equal(r.aciertos, 1);
  assert.equal(r.total, 4);
  assert.deepEqual(r.detalle, { a: 'ok', b: 'mal', c: 'blanco', d: 'blanco' });
  assert.equal(corregirChoices({ a: '2' }, { a: 2 }).aciertos, 1); // valor de radio llega como string
  assert.equal(corregirChoices({}, {}).total, 0);
});

test('letra de la opción', () => {
  assert.equal(letra(1), 'a');
  assert.equal(letra(4), 'd');
});
