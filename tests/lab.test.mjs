// Laboratorio: cada generador se verifica numéricamente con muchas semillas (sustituir la solución en la EDO,
// comparar Green por definición vs doble integral, polares vs integral cartesiana).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generar, GENERADORES } from '../src/scripts/lab/index.js';
import { crearRng, semillaValida } from '../src/scripts/lab/rng.js';

const N = 300;
const semillas = Array.from({ length: N }, (_, i) => i * 7919 + 1);
const cerca = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol * (1 + Math.abs(a) + Math.abs(b)), `${msg}: ${a} vs ${b}`);

function derivadas(y, x, h = 1e-3) {
  const f0 = y(x), fp = y(x + h), fm = y(x - h);
  return [f0, (fp - fm) / (2 * h), (fp - 2 * f0 + fm) / (h * h)];
}
const puntos = ([a, b], n = 7) => Array.from({ length: n }, (_, i) => a + ((b - a) * (i + 0.5)) / n);
function simpson(f, a, b, n = 200) {
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return (s * h) / 3;
}
// Residuo relativo de una EDO: ec(x, y, y', y'') evaluada con derivadas numéricas.
function residuoMax(v, C) {
  let peor = 0;
  for (const x of puntos(v.dom)) {
    const [y, y1, y2] = derivadas((t) => v.y(t, ...C), x);
    peor = Math.max(peor, Math.abs(v.ec(x, y, y1, y2)) / (1 + Math.abs(y) + Math.abs(y1) + Math.abs(y2)));
  }
  return peor;
}

test('rng: determinista, en rango y semillaValida', () => {
  const a = crearRng(42), b = crearRng(42), c = crearRng(43);
  const sa = Array.from({ length: 10 }, a), sb = Array.from({ length: 10 }, b), sc = Array.from({ length: 10 }, c);
  assert.deepEqual(sa, sb);
  assert.notDeepEqual(sa, sc);
  const r = crearRng(5);
  for (let i = 0; i < 1000; i++) { const n = r.ent(-3, 4); assert.ok(n >= -3 && n <= 4 && Number.isInteger(n)); assert.notEqual(r.nz(2), 0); }
  assert.equal(semillaValida('123'), 123);
  for (const mala of ['', '0', '-3', '1.5', 'abc', '1e3', '99999999999', null, undefined]) assert.equal(semillaValida(mala), null, String(mala));
});

for (const g of GENERADORES) {
  test(`${g.id}: misma semilla = mismo ejercicio, estructura completa y TeX sin basura (${N} semillas)`, () => {
    const vistos = new Set();
    for (const s of semillas) {
      const e = generar(g.id, s);
      assert.equal(JSON.stringify(e), JSON.stringify(generar(g.id, s)), `semilla ${s} no determinista`);
      assert.ok(e.enunciado.length > 0 && e.pasos.length >= 3 && e.resultado.tex, `semilla ${s} incompleta`);
      const todo = JSON.stringify([e.enunciado, e.pasos, e.resultado]);
      assert.ok(!/NaN|undefined|Infinity|null|\+-|--|\(\)|\{\}/.test(todo), `semilla ${s}: ${todo}`);
      for (const p of e.pasos) assert.ok(p.tex || p.txt);
      vistos.add(e.enunciado[0].tex);
    }
    assert.ok(vistos.size >= 3, 'poca variedad de enunciados');
  });
}

for (const id of ['lineal', 'bernoulli', 'homogenea2', 'nohomogenea']) {
  test(`${id}: la solución general verifica la EDO en varios puntos y constantes (${N} semillas)`, () => {
    for (const s of semillas) {
      const { verif: v } = generar(id, s);
      for (const C of v.consts) assert.ok(residuoMax(v, C) < 1e-4, `semilla ${s}, C=${C}`);
    }
  });
}

test('control negativo: una solución mal armada SÍ falla el chequeo', () => {
  let fallan = 0;
  for (const s of semillas.slice(0, 100)) {
    const { verif: v } = generar('nohomogenea', s);
    const mal = { ...v, y: (x, ...C) => v.y(x, ...C) + 0.5 * x * x + 1 };
    if (residuoMax(mal, v.consts[0]) > 1e-4) fallan++;
  }
  assert.ok(fallan >= 95, `solo ${fallan}/100 detectados`);
});

test('nohomogenea: cubre con y sin resonancia en polinomio, exponencial y trigonométrica', () => {
  const vistos = new Set();
  for (const s of semillas) {
    const e = generar('nohomogenea', s);
    const t = e.enunciado[0].tex;
    const forma = /\\cos|\\sin/.test(t.split('=').pop()) ? 'trig' : /e\^/.test(t.split('=').pop()) ? 'exp' : 'poli';
    vistos.add(`${forma}-${e.verif.res}`);
  }
  assert.equal(vistos.size, 6, [...vistos].join());
});

test('homogenea2: salen raíces distintas, iguales y complejas', () => {
  const tipos = new Set();
  for (const s of semillas) {
    const p = generar('homogenea2', s).pasos[1].txt;
    tipos.add(/distintas/.test(p) ? 'd' : /doble/.test(p) ? 'i' : 'c');
  }
  assert.equal(tipos.size, 3);
});

test(`exacta: M_y = N_x, F_x = M, F_y = N y g'(y) depende solo de y (${N} semillas)`, () => {
  const h = 1e-4;
  for (const s of semillas) {
    const { verif: v } = generar('exacta', s);
    assert.ok(v.exactaSim && v.gpSoloY, `semilla ${s}`);
    for (const x of puntos(v.dom, 5)) for (const y of puntos(v.dom, 5)) {
      cerca((v.F(x + h, y) - v.F(x - h, y)) / (2 * h), v.M(x, y), 1e-6, `F_x semilla ${s}`);
      cerca((v.F(x, y + h) - v.F(x, y - h)) / (2 * h), v.N(x, y), 1e-6, `F_y semilla ${s}`);
      cerca((v.M(x, y + h) - v.M(x, y - h)) / (2 * h), (v.N(x + h, y) - v.N(x - h, y)) / (2 * h), 1e-6, `M_y=N_x semilla ${s}`);
    }
    // F es constante a lo largo de la curva integral: dF/dx + F_y·y' = 0 con y' = -M/N
    const x = 0.7, y = 0.4;
    if (Math.abs(v.N(x, y)) > 0.1) cerca(v.M(x, y) + v.N(x, y) * (-v.M(x, y) / v.N(x, y)), 0, 1e-9, 'curva integral');
  }
});

test(`green: circulación por definición = doble integral numérica = respuesta, y la frontera es antihoraria (${N} semillas)`, () => {
  const h = 1e-4;
  for (const s of semillas) {
    const { verif: v } = generar('green', s);
    // por definición: suma de integrales de línea ∫ P dx + Q dy sobre cada tramo
    let linea = 0, area2 = 0;
    for (const t of v.borde) {
      linea += simpson((u) => { const [x, y] = t.r(u), [dx, dy] = t.dr(u); return v.P(x, y) * dx + v.Q(x, y) * dy; }, t.t0, t.t1, 200);
      area2 += simpson((u) => { const [x, y] = t.r(u), [dx, dy] = t.dr(u); return x * dy - y * dx; }, t.t0, t.t1, 200);
    }
    assert.ok(area2 > 0, `semilla ${s}: frontera horaria`);
    // doble integral de Q_x - P_y por diferencias finitas
    const { x0, x1, y1, y2 } = v.region;
    const dbl = simpson((x) => simpson((y) => (v.Q(x + h, y) - v.Q(x - h, y)) / (2 * h) - (v.P(x, y + h) - v.P(x, y - h)) / (2 * h), y1(x), y2(x), 40), x0, x1, 60);
    cerca(linea, v.valor, 1e-6, `línea semilla ${s}`);
    cerca(dbl, v.valor, 1e-5, `doble semilla ${s}`);
  }
});

test(`polares: coincide con la integral doble cartesiana numérica, disco y anillo (${N} semillas)`, () => {
  const tipos = new Set();
  for (const s of semillas) {
    const { verif: v } = generar('polares', s);
    tipos.add(v.r1 > 0 ? 'anillo' : 'disco');
    const n = 400;
    let tot = 0, abs = 0;
    for (let i = 0; i < n; i++) {
      const x = -v.r2 + ((i + 0.5) * 2 * v.r2) / n;
      const s2 = Math.sqrt(Math.max(0, v.r2 * v.r2 - x * x));
      const t = x * x < v.r1 * v.r1 ? Math.sqrt(v.r1 * v.r1 - x * x) : null;
      const col = (a, b) => simpson((y) => v.f(x, y), a, b, 40);
      const w = (2 * v.r2) / n;
      tot += (t === null ? col(-s2, s2) : col(-s2, -t) + col(t, s2)) * w;
      abs += (t === null ? simpson((y) => Math.abs(v.f(x, y)), -s2, s2, 40) : 0) * w;
    }
    cerca(tot, v.valor, 2e-3 * (1 + abs), `semilla ${s}`);
  }
  assert.equal(tipos.size, 2);
});
