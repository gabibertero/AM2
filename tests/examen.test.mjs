import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mmss, notaEstimada, minutosValidos } from '../src/scripts/examen-logica.js';

test('nota: 100 con todo bien, 0 sin corregir, 50 a medias', () => {
  assert.equal(notaEstimada([1, 1, 1, 1]), 100);
  assert.equal(notaEstimada([]), 0);
  assert.equal(notaEstimada([0.5, 0.5, 0.5, 0.5]), 50);
  assert.equal(notaEstimada([1, 0.5], 2), 75);
  assert.equal(notaEstimada([1], 4), 25); // los sin corregir cuentan 0
});

test('nota: propiedad con muchas combinaciones aleatorias (acotada y monótona)', () => {
  let s = 12345;
  const rnd = () => (s = (s * 1664525 + 1013904223) % 2 ** 32) / 2 ** 32;
  for (let i = 0; i < 500; i++) {
    const n = 1 + Math.floor(rnd() * 6);
    const notas = Array.from({ length: n }, () => [0, 0.5, 1][Math.floor(rnd() * 3)]);
    const x = notaEstimada(notas);
    assert.ok(x >= 0 && x <= 100);
    const mejor = notas.map((v) => (v < 1 ? v + 0.5 > 1 ? 1 : v + 0.5 : v));
    assert.ok(notaEstimada(mejor) >= x);
  }
});

test('mmss y minutos válidos', () => {
  assert.equal(mmss(7200), '120:00');
  assert.equal(mmss(65), '01:05');
  assert.equal(mmss(-5), '-00:05');
  assert.equal(minutosValidos(''), 120);
  assert.equal(minutosValidos('abc'), 120);
  assert.equal(minutosValidos('0'), 1);
  assert.equal(minutosValidos('9999'), 600);
  assert.equal(minutosValidos('45'), 45);
});
