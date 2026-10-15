// Laboratorio: cada generador se verifica numéricamente con muchas semillas (sustituir la solución en la EDO,
// comparar Green por definición vs doble integral, polares vs integral cartesiana).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generar, GENERADORES } from '../src/scripts/lab/index.js';
import { suma } from '../src/scripts/lab/mate.js';
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
// Residuo de una EDO: ec(x, y, y', y'') con derivadas numéricas, normalizado por la escala de la propia solución
// (así soluciones de tamaño 1e-3 no esconden errores; el piso 1e-9 evita dividir por 0).
function residuoMax(v, C, y = (t) => v.y(t, ...C)) {
  let peor = 0;
  for (const x of puntos(v.dom)) {
    const [yy, y1, y2] = derivadas(y, x);
    peor = Math.max(peor, Math.abs(v.ec(x, yy, y1, y2)) / (Math.max(Math.abs(yy), Math.abs(y1), Math.abs(y2)) + 1e-9));
  }
  return peor;
}
// Perturba una solución con algo que no resuelve la EDO (escalado a su tamaño): el chequeo tiene que fallar.
const arruinar = (v, C) => {
  const [y, y1, y2] = derivadas((t) => v.y(t, ...C), (v.dom[0] + v.dom[1]) / 2);
  const esc = Math.max(Math.abs(y), Math.abs(y1), Math.abs(y2)) + 1e-9;
  return (t) => v.y(t, ...C) + 0.1 * esc * (Math.sin(5 * t) + 1.5);
};
// F(x,y) es constante a lo largo de la curva integral y' = -M/N (RK4); devuelve null si N se anula en el camino.
function variacionF(v, x0, y0, largo = 0.2, pasos = 100) {
  const f = (x, y) => -v.M(x, y) / v.N(x, y);
  let x = x0, y = y0;
  const h = largo / pasos;
  for (let i = 0; i < pasos; i++) {
    if (Math.abs(v.N(x, y)) < 0.3 || Math.abs(f(x, y)) > 3) return null; // zonas empinadas: RK4 pierde precisión
    const k1 = f(x, y), k2 = f(x + h / 2, y + (h * k1) / 2), k3 = f(x + h / 2, y + (h * k2) / 2), k4 = f(x + h, y + h * k3);
    y += (h * (k1 + 2 * k2 + 2 * k3 + k4)) / 6; x += h;
    if (!Number.isFinite(y) || Math.abs(y) > 50) return null;
  }
  return Math.abs(v.F(x, y) - v.F(x0, y0)) / (1 + Math.abs(v.F(x0, y0)));
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
      // Signos/productos mal pegados al evaluar (en TeX y en el texto explicativo).
      const MAL = /\+\s*[-−]|[-−]\s*[-−]|(?:·|\\cdot)\s*[-−]|\d\\left\(\s*[-−]?\d+(?:\.\d+)?\s*\\right\)|\d\(|\d\s+\d/;
      for (const t of [...e.enunciado, ...e.pasos, e.resultado].flatMap((o) => [o.tex, o.txt])) assert.ok(!t || !MAL.test(t), `semilla ${s}: producto/signo mal armado en "${t}"`);
      for (const p of e.pasos) assert.ok(p.txt && p.tex, `semilla ${s}: paso sin texto o sin fórmula`);
      assert.ok(!/\\sin(?![a-z])/.test(todo), `semilla ${s}: usar \\operatorname{sen}, no \\sin`);
      vistos.add(e.enunciado[0].tex);
    }
    assert.ok(vistos.size >= 3, 'poca variedad de enunciados');
  });
}

for (const id of ['lineal', 'bernoulli', 'homogenea2', 'nohomogenea']) {
  test(`${id}: la solución general verifica la EDO en varios puntos y constantes (${N} semillas)`, () => {
    for (const s of semillas) {
      const { verif: v } = generar(id, s);
      for (const C of v.consts) assert.ok(residuoMax(v, C) < 1e-4, `semilla ${s}, C=${C}: ${residuoMax(v, C)}`);
    }
  });
  test(`${id}: control negativo, una solución mal armada SÍ falla el chequeo`, () => {
    let fallan = 0;
    for (const s of semillas.slice(0, 100)) {
      const { verif: v } = generar(id, s);
      if (residuoMax(v, v.consts[0], arruinar(v, v.consts[0])) > 1e-4) fallan++;
    }
    assert.ok(fallan >= 95, `solo ${fallan}/100 detectados`);
  });
}

test('lineal: PVI cumple la condición inicial y salen los cuatro tipos, con y sin PVI', () => {
  const vistos = new Set();
  for (const s of semillas) {
    const { verif: v } = generar('lineal', s);
    vistos.add(`${v.tipo}-${!!v.pvi}`);
    if (v.pvi) {
      assert.ok(Math.abs(v.y(v.pvi.x0, v.pvi.C) - v.pvi.y0) < 1e-9, `semilla ${s}: y(x0) != y0`);
      assert.ok(residuoMax(v, [v.pvi.C]) < 1e-4, `semilla ${s}: solución particular`);
    }
  }
  assert.equal(vistos.size, 8, [...vistos].join());
});

test('bernoulli: salen todos los n (positivos, negativos y fraccionarios) y el residuo no depende de la escala', () => {
  const ns = new Set();
  for (const s of semillas) ns.add(generar('bernoulli', s).verif.n);
  assert.deepEqual([...ns].sort((a, b) => a - b), [-2, -1, -0.5, 0.5, 2, 3]);
  // solución escalada por 1e-3 (error de las constantes enormes de antes): un error de la EDO sigue detectándose
  const { verif: v } = generar('bernoulli', 1);
  const chica = (t) => 1e-3 * v.y(t, ...v.consts[0]);
  assert.ok(residuoMax(v, v.consts[0], chica) > 1e-4, 'el residuo normalizado debe delatar una y que no es solución');
});

test('nohomogenea: cubre con y sin resonancia en polinomio, exponencial y trigonométrica, y la superposición de dos términos', () => {
  const vistos = new Set(), res = new Set();
  for (const s of semillas) {
    const { verif: v } = generar('nohomogenea', s);
    if (v.partes.length === 2) { vistos.add('doble'); continue; }
    vistos.add(`${v.partes[0].cat}-${v.partes[0].s > 0}`);
    res.add(`${v.partes[0].cat}-${v.partes[0].s}`);
  }
  assert.equal(vistos.size, 7, [...vistos].join());
  assert.ok(res.has('poli-2') && res.has('exp-2') && res.has('poli-1') && res.has('exp-1') && res.has('trig-1'), [...res].join());
});

test('homogenea2: salen raíces distintas, iguales y complejas', () => {
  const tipos = new Set();
  for (const s of semillas) tipos.add(generar('homogenea2', s).verif.tipo);
  assert.deepEqual([...tipos].sort(), ['complejas', 'distintas', 'iguales']);
});

test(`exacta: M_y = N_x, F_x = M, F_y = N, F constante sobre la curva integral y g'(y) solo de y (${N} semillas)`, () => {
  const h = 1e-4;
  let curvas = 0;
  const modos = new Set();
  for (const s of semillas) {
    const { verif: v } = generar('exacta', s);
    modos.add(v.noExacta ? 'noexacta' : v.modo);
    const grid = puntos(v.dom, 5);
    const Myc = (x, y) => (v.M(x, y + h) - v.M(x, y - h)) / (2 * h), Nxc = (x, y) => (v.N(x + h, y) - v.N(x - h, y)) / (2 * h);
    if (v.noExacta) {
      assert.ok(!v.exactaSim);
      assert.ok(grid.some((x) => grid.some((y) => Math.abs(Myc(x, y) - Nxc(x, y)) > 1e-3)), `semilla ${s}: parece exacta`);
      continue;
    }
    assert.ok(v.exactaSim && v.gpSoloY, `semilla ${s}`);
    for (const x of grid) for (const y of grid) {
      cerca((v.F(x + h, y) - v.F(x - h, y)) / (2 * h), v.M(x, y), 1e-6, `F_x semilla ${s}`);
      cerca((v.F(x, y + h) - v.F(x, y - h)) / (2 * h), v.N(x, y), 1e-6, `F_y semilla ${s}`);
      cerca(Myc(x, y), Nxc(x, y), 1e-6, `M_y=N_x semilla ${s}`);
    }
    for (const [x0, y0] of [[0.3, 0.4], [-0.5, 0.8], [0.6, -0.7]]) {
      const d = variacionF(v, x0, y0);
      if (d !== null) { curvas++; assert.ok(d < 1e-6, `semilla ${s}: F varía ${d} sobre la curva integral`); }
    }
  }
  assert.ok(curvas > 200, `solo ${curvas} curvas integrales verificadas`);
  assert.deepEqual([...modos].sort(), ['mixta', 'noexacta', 'poli']);
});

test('exacta: control negativo, un F equivocado SÍ falla F_x = M y F constante en la curva', () => {
  let fallan = 0, total = 0;
  for (const s of semillas.slice(0, 100)) {
    const { verif: v } = generar('exacta', s);
    if (v.noExacta) continue;
    total++;
    const mal = { ...v, F: (x, y) => v.F(x, y) + x * y * y };
    const h = 1e-4;
    const fx = Math.abs((mal.F(0.4 + h, 0.5) - mal.F(0.4 - h, 0.5)) / (2 * h) - v.M(0.4, 0.5));
    if (fx > 1e-3) fallan++;
  }
  assert.ok(fallan >= total - 2, `solo ${fallan}/${total} detectados`);
});

const linea = (v, t) => simpson((u) => { const [x, y] = t.r(u), [dx, dy] = t.dr(u); return v.P(x, y) * dx + v.Q(x, y) * dy; }, t.t0, t.t1, 200);

test(`green: circulación por definición = doble integral numérica = respuesta, tramos exactos, y la frontera es antihoraria (${N} semillas)`, () => {
  const h = 1e-4;
  const modos = new Set();
  for (const s of semillas) {
    const { verif: v } = generar('green', s);
    modos.add(v.defn);
    let total = 0, area2 = 0;
    v.borde.forEach((t, i) => {
      const lt = linea(v, t);
      total += lt;
      area2 += simpson((u) => { const [x, y] = t.r(u), [dx, dy] = t.dr(u); return x * dy - y * dx; }, t.t0, t.t1, 200);
      if (v.defn) cerca(lt, v.tramos[i], 1e-6, `tramo ${i + 1} semilla ${s}`);
    });
    assert.ok(area2 > 0, `semilla ${s}: frontera horaria`);
    if (v.defn) assert.equal(v.tramos.length, v.borde.length);
    const { x0, x1, y1, y2 } = v.region;
    const dbl = simpson((x) => simpson((y) => (v.Q(x + h, y) - v.Q(x - h, y)) / (2 * h) - (v.P(x, y + h) - v.P(x, y - h)) / (2 * h), y1(x), y2(x), 40), x0, x1, 60);
    cerca(total, v.valor, 1e-6, `línea semilla ${s}`);
    cerca(dbl, v.valor, 1e-5, `doble semilla ${s}`);
    if (v.defn) cerca(v.tramos.reduce((a, b) => a + b, 0), v.valor, 1e-9, `suma de tramos semilla ${s}`);
  }
  assert.equal(modos.size, 2);
});

test('green: control negativo, un valor mal calculado SÍ se detecta', () => {
  let fallan = 0;
  for (const s of semillas.slice(0, 100)) {
    const { verif: v } = generar('green', s);
    const lineaTot = v.borde.reduce((a, t) => a + linea(v, t), 0);
    if (Math.abs(lineaTot - (v.valor + 1)) > 1e-6 * (1 + Math.abs(v.valor))) fallan++;
  }
  assert.equal(fallan, 100);
});

// Integral doble cartesiana (columnas con Simpson + punto medio) sobre disco/anillo, entera, mitad superior o primer cuadrante.
function cartesiana(v) {
  const n = 500, a = v.sector === 'cuarto' ? 0 : -v.r2, w = (v.r2 - a) / n;
  let tot = 0, abs = 0;
  for (let i = 0; i < n; i++) {
    const x = a + (i + 0.5) * w;
    const s2 = Math.sqrt(Math.max(0, v.r2 * v.r2 - x * x));
    const t = x * x < v.r1 * v.r1 ? Math.sqrt(v.r1 * v.r1 - x * x) : null;
    let tramos = t === null ? [[-s2, s2]] : [[-s2, -t], [t, s2]];
    if (v.sector !== 'full') tramos = tramos.map(([p, q]) => [Math.max(p, 0), q]).filter(([p, q]) => q > p);
    for (const [p, q] of tramos) {
      tot += simpson((y) => v.f(x, y), p, q, 40) * w;
      abs += simpson((y) => Math.abs(v.f(x, y)), p, q, 40) * w;
    }
  }
  return { tot, abs };
}

test(`polares: coincide con la integral doble cartesiana numérica (disco, anillo, mitad, cuadrante) (${N} semillas)`, () => {
  const tipos = new Set();
  let peor = 0;
  for (const s of semillas) {
    const { verif: v } = generar('polares', s);
    tipos.add(`${v.r1 > 0 ? 'anillo' : 'disco'}-${v.sector}`);
    const { tot, abs } = cartesiana(v);
    // tolerancia lineal: 2e-3 de la escala (1 + ∬|f|); antes se multiplicaba dos veces y no detectaba nada
    const err = Math.abs(tot - v.valor) / (1 + abs);
    peor = Math.max(peor, err);
    assert.ok(err <= 2e-3, `semilla ${s} (${v.tipo}): ${tot} vs ${v.valor}`);
  }
  assert.equal(tipos.size, 6, [...tipos].join());
  assert.ok(peor > 0, 'el chequeo no puede ser tautológico');
});

test('polares: control negativo, un valor erróneo (2% de la escala) SÍ se detecta', () => {
  let fallan = 0;
  for (const s of semillas.slice(0, 100)) {
    const { verif: v } = generar('polares', s);
    const { tot, abs } = cartesiana(v);
    if (Math.abs(tot - (v.valor + 0.02 * (1 + abs))) / (1 + abs) > 2e-3) fallan++;
  }
  assert.equal(fallan, 100);
});

test('suma: coeficiente por cuerpo que empieza con dígito o paréntesis lleva \\cdot (no 3·2 -> 32)', () => {
  assert.equal(suma([[3, '2']]), '3\\cdot 2');
  assert.equal(suma([[3, '2^{2}'], [-4, '']]), '3\\cdot 2^{2}-4');
  assert.equal(suma([[3, '\\left(-2\\right)']]), '3\\cdot \\left(-2\\right)');
  assert.equal(suma([[3, 'x'], [-1, 'y'], [5, '']]), '3x-y+5'); // sin falsos positivos
  assert.equal(suma([[12, 'x^{2}']]), '12x^{2}');
});
