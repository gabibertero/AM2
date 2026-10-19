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
      for (const p of e.pasos) assert.ok(p.txt && (p.tex || g.id === 'dominio'), `semilla ${s}: paso sin texto o sin fórmula`); // en dominio el cierre y el gráfico no repiten D_f
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

// ---------- Laboratorio del 1º parcial (U1–U3): cada generador contra el cálculo numérico ----------
const dif2 = (f, x, y, h = 1e-5) => [(f(x + h, y) - f(x - h, y)) / (2 * h), (f(x, y + h) - f(x, y - h)) / (2 * h)];
const dif3 = (F, x, y, z, h = 1e-5) => [(F(x + h, y, z) - F(x - h, y, z)) / (2 * h), (F(x, y + h, z) - F(x, y - h, z)) / (2 * h), (F(x, y, z + h) - F(x, y, z - h)) / (2 * h)];
function resolverZ(F, x, y, z0) {
  let z = z0;
  for (let i = 0; i < 60; i++) {
    const d = (F(x, y, z + 1e-7) - F(x, y, z - 1e-7)) / 2e-7, dz = F(x, y, z) / d;
    z -= dz;
    if (Math.abs(dz) < 1e-14) break;
  }
  return z;
}
const lattice = [];
for (let i = -12; i <= 12; i++) for (let j = -12; j <= 12; j++) lattice.push([i / 2, j / 2]);

test(`p1 instancia: los ocho generadores del 1º parcial están registrados con instancia 'p1'`, () => {
  const ids = GENERADORES.filter((g) => g.instancia === 'p1').map((g) => g.id).sort();
  assert.deepEqual(ids, ['dominio', 'diferencial', 'direccional', 'direccional3', 'extremos', 'implicita', 'lagrange', 'plano'].sort());
});

test(`dominio: f es real y finita exactamente donde valen las desigualdades (reticulado de ${lattice.length} puntos, bordes incluidos) (${N} semillas)`, () => {
  const tipos = new Set();
  for (const s of semillas) {
    const v = generar('dominio', s).verif;
    tipos.add(v.id);
    for (const [x, y] of lattice) {
      assert.equal(v.dom(x, y), Number.isFinite(v.f(x, y)), `semilla ${s}, (${x},${y}): dominio vs f finita`);
      v.conds.forEach((c, i) => assert.equal(c(x, y), v.resueltas[i](x, y), `semilla ${s}, cond ${i}, (${x},${y}): desigualdad despejada distinta de la original`));
    }
  }
  assert.equal(tipos.size, 14, [...tipos].join());
});

test('dominio: control negativo, tratar el borde de una condición estricta como incluido SÍ se detecta', () => {
  let probados = 0, fallan = 0;
  for (const s of semillas) {
    const e = generar('dominio', s), v = e.verif;
    if (['raiz', 'rp', 'asen', 'acos'].includes(v.id) || v.union) continue; // solo tienen ≥ / ≤: no hay borde excluido que equivocar
    probados++;
    const mal = (x, y) => v.conds.every((c, i) => c(x, y) || v.bordes[i](x, y));
    if (lattice.some(([x, y]) => mal(x, y) !== Number.isFinite(v.f(x, y)))) fallan++;
  }
  assert.ok(fallan >= 0.8 * probados, `solo ${fallan}/${probados} detectados`);
});

const gradNum = (v) => dif2(v.f, ...v.P);
test(`direccional: gradiente, versor, D_u f = ∇f·u, máximo, mínimo y direcciones nulas (módulo y ángulo con cuadrante) contra diferencias finitas (${N} semillas)`, () => {
  let q = 0, defs = 0;
  for (const s of semillas) {
    const v = generar('direccional', s).verif, [x0, y0] = v.P;
    const g = gradNum(v);
    cerca(g[0], v.grad[0], 1e-6, `f_x semilla ${s}`); cerca(g[1], v.grad[1], 1e-6, `f_y semilla ${s}`);
    cerca(Math.hypot(...v.u), 1, 1e-12, `|u| semilla ${s}`);
    const h = 1e-5;
    cerca((v.f(x0 + h * v.u[0], y0 + h * v.u[1]) - v.f(x0 - h * v.u[0], y0 - h * v.u[1])) / (2 * h), v.duf, 1e-6, `D_u f semilla ${s}`);
    cerca(Math.hypot(...g), v.mod, 1e-6, `|∇f| semilla ${s}`);
    // la derivada direccional máxima sobre todas las direcciones está en theta y vale |∇f|
    const D = (t) => g[0] * Math.cos(t) + g[1] * Math.sin(t);
    cerca(D(v.theta), v.mod, 1e-6, `D en theta semilla ${s}`);
    cerca(D(v.thetaMin), -v.mod, 1e-6, `D en thetaMin semilla ${s}`); // mínimo = sentido opuesto
    assert.ok(v.thetaMin >= 0 && v.thetaMin < 2 * Math.PI, `semilla ${s}: thetaMin fuera de [0, 2π)`);
    assert.equal(v.nulas.length, 2);
    for (const t of v.nulas) { assert.ok(Math.abs(D(t)) < 1e-6 * (1 + v.mod), `semilla ${s}: derivada nula en ${t}`); assert.ok(t >= 0 && t < 2 * Math.PI); }
    cerca(Math.abs(Math.atan2(Math.sin(v.nulas[0] - v.nulas[1]), Math.cos(v.nulas[0] - v.nulas[1]))), Math.PI, 1e-9, `nulas opuestas semilla ${s}`);
    if (v.def) { defs++; cerca(v.limite, v.duf, 1e-12, `semilla ${s}: el límite por definición no da D_u f`); }
    let mejor = -Infinity, tm = 0;
    for (let k = 0; k < 3600; k++) { const t = (k * Math.PI) / 1800; if (D(t) > mejor) { mejor = D(t); tm = t; } }
    assert.ok(Math.abs(Math.atan2(Math.sin(tm - v.theta), Math.cos(tm - v.theta))) < 0.002, `semilla ${s}: ángulo de máximo crecimiento`);
    assert.ok(v.theta >= 0 && v.theta < 2 * Math.PI);
    if (g[0] < 0) { q++; assert.ok(Math.abs(D(Math.atan(g[1] / g[0])) - v.mod) > 1e-3, `semilla ${s}: arctan sin corregir cuadrante daría otra dirección`); }
  }
  assert.ok(q > 50, 'pocos gradientes con g_x < 0 (cuadrantes 2 y 3)');
  assert.ok(defs > 30, `pocos ejercicios por definición: ${defs}`);
});

test('direccional: control negativo, el sentido contrario o una derivada direccional mal calculada SÍ se detectan', () => {
  let fallan = 0;
  for (const s of semillas.slice(0, 100)) {
    const v = generar('direccional', s).verif, g = gradNum(v);
    const opuesta = g[0] * Math.cos(v.theta + Math.PI) + g[1] * Math.sin(v.theta + Math.PI);
    const mal = v.duf + 0.01 * (1 + Math.abs(v.duf));
    const [x0, y0] = v.P, h = 1e-5;
    const num0 = (v.f(x0 + h * v.u[0], y0 + h * v.u[1]) - v.f(x0 - h * v.u[0], y0 - h * v.u[1])) / (2 * h);
    if (Math.abs(opuesta - v.mod) > 1e-3 && Math.abs(num0 - mal) > 1e-3) fallan++;
  }
  assert.equal(fallan, 100);
});

test(`diferencial: dV coincide con las derivadas numéricas, con la variación real y con el error relativo/porcentual en los 5 modos (${N} semillas)`, () => {
  const figs = new Set();
  for (const s of semillas) {
    const { verif: v } = generar('diferencial', s);
    figs.add(v.modo === 'abs' || v.modo === 'signo' ? `${v.modo}-${v.id}-${v.mag}` : v.modo);
    const parc = v.vals.map((_, i) => { const a = [...v.vals], b = [...v.vals]; a[i] += 1e-5; b[i] -= 1e-5; return (v.f(a) - v.f(b)) / 2e-5; });
    parc.forEach((p, i) => cerca(p, v.parc[i], 1e-6, `parcial ${i} semilla ${s}`));
    // error máximo = suma de valores absolutos; con signo / material / aproximación = suma con signo
    const dF = parc.reduce((t, p, i) => t + (v.modo === 'abs' ? Math.abs(p * v.delta[i]) : p * v.delta[i]), 0);
    cerca(dF, v.dF, 1e-6, `dF semilla ${s} (${v.modo})`);
    if (v.modo === 'abs') assert.ok(v.delta.every((d) => d > 0));
    if (v.modo === 'signo') assert.ok(v.delta.some((d) => d > 0) && v.delta.some((d) => d < 0), `semilla ${s}: debe haber aumento y disminución`);
    if (v.rel != null) { cerca(dF / v.f(v.vals), v.rel, 1e-6, `relativo semilla ${s}`); cerca(100 * v.rel, v.pct, 1e-9, `porcentual semilla ${s}`); }
    // variación real (con las medidas cambiadas): coincide con dF salvo términos de 2º orden, medidos contra la escala Σ|p·δ|
    const real = v.f(v.vals.map((m, i) => m + v.delta[i])) - v.f(v.vals), escala = parc.reduce((t, p, i) => t + Math.abs(p * v.delta[i]), 0);
    assert.ok(Math.abs(real - dF) <= 0.12 * escala, `semilla ${s}: variación real ${real} vs dF ${dF}`);
    if (v.modo === 'aprox') assert.ok(Math.abs(v.f(v.vals.map((m, i) => m + v.delta[i])) - v.aprox) < 5e-3, `semilla ${s}: aproximación ${v.aprox}`);
    if (v.modo === 'tiro') assert.ok(v.delta[1] < 0.1, `semilla ${s}: dθ debe estar en radianes`); // 5° = 0,087 rad; en grados sería 5
  }
  for (const m of ['hueca', 'aprox', 'tiro']) assert.ok(figs.has(m), `falta el modo ${m}`);
  assert.ok([...figs].filter((f) => f.startsWith('abs-')).length >= 5 && [...figs].filter((f) => f.startsWith('signo-')).length >= 3, [...figs].join());
});

test('diferencial: control negativo, omitir un término o el valor absoluto SÍ se detecta frente a la variación real', () => {
  let fallan = 0, total = 0;
  for (const s of semillas.slice(0, 200)) {
    const { verif: v } = generar('diferencial', s);
    if (v.modo !== 'abs' && v.modo !== 'signo') continue;
    total++;
    const real = v.f(v.vals.map((m, i) => m + v.delta[i])) - v.f(v.vals), escala = v.parc.reduce((t, p, i) => t + Math.abs(p * v.delta[i]), 0);
    const sinUltimo = v.parc.slice(0, -1).reduce((t, p, i) => t + p * v.delta[i], 0);
    if (Math.abs(real - sinUltimo) > 0.12 * escala) fallan++;
    if (v.modo === 'signo') assert.ok(Math.abs(real - v.dF) <= 0.12 * escala); // y con signo NO coincide con el máximo absoluto
  }
  assert.ok(fallan >= 0.9 * total, `solo ${fallan}/${total} detectados`);
});

test('diferencial: con signo la variación puede ser negativa y distinta del error máximo (valor absoluto)', () => {
  let neg = 0;
  for (const s of semillas) { const { verif: v } = generar('diferencial', s); if (v.modo === 'signo' && v.dF < 0) neg++; }
  assert.ok(neg > 5, `solo ${neg} variaciones negativas`);
});

// Clasificación observada de un punto crítico por muestreo en una circunferencia chica.
function observada(v, x, y, rho = 0.05) {
  let pos = 0, neg = 0;
  for (let k = 0; k < 72; k++) {
    const d = v.f(x + rho * Math.cos((k * Math.PI) / 36), y + rho * Math.sin((k * Math.PI) / 36)) - v.f(x, y);
    if (d > 1e-12) pos++; else if (d < -1e-12) neg++;
  }
  return pos && neg ? 'silla' : pos ? 'mínimo' : neg ? 'máximo' : 'plano';
}
test(`extremos: ∇f = 0 en cada punto, no faltan puntos críticos enteros, H correcta y la clasificación coincide con el muestreo (${N} semillas)`, () => {
  const clases = new Set(), fams = new Set();
  for (const s of semillas) {
    const { verif: v } = generar('extremos', s);
    fams.add(v.E);
    const hall = new Set(v.puntos.map((p) => `${p.x},${p.y}`));
    for (const p of v.puntos) {
      const g = dif2(v.f, p.x, p.y, 1e-3);
      assert.ok(Math.abs(g[0]) < 1e-5 && Math.abs(g[1]) < 1e-5, `semilla ${s}: ∇f(${p.x},${p.y}) = ${g}`);
      assert.equal(v.fx(p.x, p.y), 0); assert.equal(v.fy(p.x, p.y), 0);
      const h = 1e-3, [fxx, fxy, fyy] = v.hess(p.x, p.y);
      cerca((v.f(p.x + h, p.y) - 2 * v.f(p.x, p.y) + v.f(p.x - h, p.y)) / (h * h), fxx, 1e-4, `f_xx semilla ${s}`);
      cerca((v.f(p.x, p.y + h) - 2 * v.f(p.x, p.y) + v.f(p.x, p.y - h)) / (h * h), fyy, 1e-4, `f_yy semilla ${s}`);
      cerca((v.f(p.x + h, p.y + h) - v.f(p.x + h, p.y - h) - v.f(p.x - h, p.y + h) + v.f(p.x - h, p.y - h)) / (4 * h * h), fxy, 1e-4, `f_xy semilla ${s}`);
      cerca(p.D, fxx * fyy - fxy * fxy, 1e-9, `D semilla ${s}`);
      assert.equal(observada(v, p.x, p.y), p.real, `semilla ${s}: (${p.x},${p.y}) ${p.clase}`);
      clases.add(p.clase);
    }
    for (let x = -9; x <= 9; x++) for (let y = -9; y <= 9; y++) if (v.fx(x, y) === 0 && v.fy(x, y) === 0) assert.ok(hall.has(`${x},${y}`), `semilla ${s}: falta el punto crítico (${x},${y})`);
  }
  assert.deepEqual([...clases].sort(), ['dudoso', 'máximo', 'mínimo', 'silla']);
  assert.deepEqual([...fams].sort(), ['cuart', 'fol', 'sep']);
});

test('extremos: control negativo, cambiar máximo por mínimo SÍ falla el muestreo', () => {
  let total = 0, fallan = 0;
  for (const s of semillas.slice(0, 100)) {
    const { verif: v } = generar('extremos', s);
    for (const p of v.puntos) { total++; const falso = p.real === 'mínimo' ? 'máximo' : p.real === 'máximo' ? 'mínimo' : 'mínimo'; if (observada(v, p.x, p.y) !== falso) fallan++; }
  }
  assert.equal(fallan, total);
});

test(`lagrange: el candidato cumple la restricción y ∇f = λ∇g, el valor es el óptimo frente a miles de puntos factibles y el orlado concuerda (${N} semillas)`, () => {
  const tipos = new Set();
  for (const s of semillas) {
    const e = generar('lagrange', s), v = e.verif;
    tipos.add(e.enunciado[0].txt.slice(0, 70));
    const gr = (F, p) => (v.dim === 3 ? dif3(F, ...p) : dif2(F, ...p));
    for (const { p, lam, val } of v.cands) {
      cerca(v.g(...p), v.c, 1e-9, `restricción semilla ${s}`);
      cerca(v.f(...p), val, 1e-9, `valor del candidato semilla ${s}`);
      const gf = gr(v.f, p), gg = gr(v.g, p);
      gf.forEach((c, i) => cerca(c, lam * gg[i], 1e-6, `∇f=λ∇g (${i}) semilla ${s}`));
    }
    const r = crearRng(s + 99991);
    let n = 0;
    for (let i = 0; i < 6000 && n < 2000; i++) {
      const p = v.muestra(r);
      if (!p) continue;
      n++;
      cerca(v.g(...p), v.c, 1e-9, `muestra factible semilla ${s}`);
      const fp = v.f(...p), tol = 1e-9 * (1 + Math.abs(v.val));
      if (v.tipo !== 'min') assert.ok(fp <= (v.tipo === 'max' ? v.val : v.max) + tol, `semilla ${s}: f(${p}) = ${fp} supera al máximo`);
      if (v.tipo !== 'max') assert.ok(fp >= (v.tipo === 'min' ? v.val : v.min) - tol, `semilla ${s}: f(${p}) = ${fp} está por debajo del mínimo`);
    }
    assert.ok(n >= 500, `semilla ${s}: pocas muestras factibles`);
    if (v.orlado !== undefined) assert.ok(v.tipo === 'max' ? v.orlado > 0 : v.orlado < 0, `semilla ${s}: signo del orlado`);
    if (v.sup !== undefined) { const [x, y, z] = v.cands[0].p; cerca(2 * (x * y + y * z + x * z), v.sup, 1e-9, `superficie semilla ${s}`); }
    if (v.tipo === 'ambos') { // el máximo y el mínimo son los extremos de los valores de los candidatos
      assert.equal(v.max, Math.max(...v.cands.map((c) => c.val))); assert.equal(v.min, Math.min(...v.cands.map((c) => c.val)));
      assert.ok(v.cands.length === 4 && v.max > v.min, `semilla ${s}: debe haber 4 candidatos y valores distintos`);
    }
  }
  assert.ok(tipos.size >= 9, [...tipos].join('|'));
});

test('lagrange: control negativo, un candidato desplazado SÍ viola ∇f = λ∇g', () => {
  let fallan = 0;
  for (const s of semillas.slice(0, 100)) {
    const { verif: v } = generar('lagrange', s);
    const { p, lam } = v.cands[0], q = p.map((c, i) => c * (1.1 + 0.05 * i));
    const gr = (F, pp) => (v.dim === 3 ? dif3(F, ...pp) : dif2(F, ...pp));
    const gf = gr(v.f, q), gg = gr(v.g, q);
    if (gf.some((c, i) => Math.abs(c - lam * gg[i]) > 1e-3 * (1 + Math.abs(c)))) fallan++;
  }
  assert.ok(fallan >= 95, `solo ${fallan}/100 detectados`);
});

test(`implícita: F(P) = 0 y z_x, z_y coinciden con diferencias sobre la superficie F = 0 (Newton en z) (${N} semillas)`, () => {
  const h = 1e-5;
  for (const s of semillas) {
    const { verif: v } = generar('implicita', s), [x0, y0, z0] = v.P;
    if (v.modo !== 'sup') continue;
    assert.ok(Math.abs(v.F(x0, y0, z0)) < 1e-12, `F(P) semilla ${s}`);
    const Z = (x, y) => resolverZ(v.F, x, y, z0);
    cerca(Z(x0, y0), z0, 1e-10, `z(P) semilla ${s}`);
    cerca((Z(x0 + h, y0) - Z(x0 - h, y0)) / (2 * h), v.zx, 1e-5, `z_x semilla ${s}`);
    cerca((Z(x0, y0 + h) - Z(x0, y0 - h)) / (2 * h), v.zy, 1e-5, `z_y semilla ${s}`);
  }
});

test('implícita: control negativo, el signo cambiado (+F_x/F_z) SÍ se detecta', () => {
  let fallan = 0, total = 0;
  for (const s of semillas.slice(0, 100)) {
    const { verif: v } = generar('implicita', s), [x0, y0, z0] = v.P, h = 1e-4;
    if (v.modo !== 'sup') continue;
    total++;
    const zx = (resolverZ(v.F, x0 + h, y0, z0) - resolverZ(v.F, x0 - h, y0, z0)) / (2 * h), zy = (resolverZ(v.F, x0, y0 + h, z0) - resolverZ(v.F, x0, y0 - h, z0)) / (2 * h);
    if (Math.abs(zx + v.zx) > 1e-3 || Math.abs(zy + v.zy) > 1e-3) fallan++;
  }
  assert.ok(total > 20 && fallan >= 0.9 * total, `solo ${fallan}/${total} detectados`);
});

// Resuelve f(t) = 0 con Newton desde t0 (una variable) o el sistema 2x2 (y, z) con jacobiano numérico.
const newton1 = (fn, t0) => { let t = t0; for (let i = 0; i < 60; i++) { const d = (fn(t + 1e-7) - fn(t - 1e-7)) / 2e-7, dt = fn(t) / d; t -= dt; if (Math.abs(dt) < 1e-14) break; } return t; };
function newton2(g1, g2, x, y0, z0) {
  let y = y0, z = z0;
  for (let i = 0; i < 60; i++) {
    const e = 1e-7, a = (g1(x, y + e, z) - g1(x, y - e, z)) / (2 * e), b = (g1(x, y, z + e) - g1(x, y, z - e)) / (2 * e);
    const c = (g2(x, y + e, z) - g2(x, y - e, z)) / (2 * e), d = (g2(x, y, z + e) - g2(x, y, z - e)) / (2 * e), det = a * d - b * c;
    const f1 = g1(x, y, z), f2 = g2(x, y, z), dy = (d * f1 - b * f2) / det, dz = (a * f2 - c * f1) / det;
    y -= dy; z -= dz;
    if (Math.abs(dy) + Math.abs(dz) < 1e-14) break;
  }
  return [y, z];
}
test(`implícita: dy/dx de g(x,y)=0, de una ecuación con y(x), z(x) (con arctg) y de un sistema coinciden con diferencias finitas (${N} semillas)`, () => {
  const h = 1e-5, modos = new Set();
  for (const s of semillas) {
    const { verif: v } = generar('implicita', s), [x0, y0, z0] = v.P;
    modos.add(v.modo);
    if (v.modo === 'curva') {
      assert.ok(Math.abs(v.F(x0, y0)) < 1e-12, `g(P) semilla ${s}`);
      const Y = (x) => newton1((y) => v.F(x, y), y0);
      cerca((Y(x0 + h) - Y(x0 - h)) / (2 * h), v.dydx, 1e-5, `dy/dx semilla ${s}`);
    } else if (v.modo === 'yz' || v.modo === 'arctg') {
      assert.ok(Math.abs(v.F(x0, y0, z0)) < 1e-12, `F(P) semilla ${s}`);
      const Y = (x) => newton1((y) => v.F(x, y, z0), y0), Z = (x) => newton1((z) => v.F(x, y0, z), z0);
      cerca((Y(x0 + h) - Y(x0 - h)) / (2 * h), v.dydx, 1e-5, `dy/dx (z fija) semilla ${s} ${v.modo}`);
      cerca((Z(x0 + h) - Z(x0 - h)) / (2 * h), v.dzdx, 1e-5, `dz/dx (y fija) semilla ${s} ${v.modo}`);
    } else if (v.modo === 'sistema') {
      assert.ok(Math.abs(v.g1(x0, y0, z0)) < 1e-12 && Math.abs(v.g2(x0, y0, z0)) < 1e-12, `P en las dos ecuaciones semilla ${s}`);
      assert.notEqual(v.den, 0);
      const [yp, zp] = newton2(v.g1, v.g2, x0 + h, y0, z0), [ym, zm] = newton2(v.g1, v.g2, x0 - h, y0, z0);
      cerca((yp - ym) / (2 * h), v.dydx, 1e-5, `dy/dx semilla ${s}`);
      cerca((zp - zm) / (2 * h), v.dzdx, 1e-5, `dz/dx semilla ${s}`);
    }
  }
  assert.deepEqual([...modos].sort(), ['arctg', 'cero', 'curva', 'sistema', 'sup', 'yz']);
});

test('implícita: control negativo, el cociente con el jacobiano al revés o sin el signo menos SÍ se detecta', () => {
  let fallan = 0, total = 0;
  for (const s of semillas.slice(0, 200)) {
    const { verif: v } = generar('implicita', s), [x0, y0, z0] = v.P, h = 1e-5;
    if (v.modo !== 'sistema') continue;
    total++;
    const [yp, zp] = newton2(v.g1, v.g2, x0 + h, y0, z0), [ym, zm] = newton2(v.g1, v.g2, x0 - h, y0, z0);
    const num1 = (yp - ym) / (2 * h), num2 = (zp - zm) / (2 * h);
    if ((Math.abs(num1 + v.dydx) > 1e-3 || v.dydx === 0) && (Math.abs(num2 + v.dzdx) > 1e-3 || v.dzdx === 0)) fallan++;
  }
  assert.ok(total > 20 && fallan >= 0.8 * total, `solo ${fallan}/${total} detectados`);
});

test(`plano: el punto está en el plano, n = ∇ numérico, la superficie se despega del plano como h² y el tangente paralelo tiene la normal proporcional (${N} semillas)`, () => {
  const h = 1e-4;
  let par = 0;
  for (const s of semillas) {
    const { verif: v } = generar('plano', s), [x0, y0, z0] = v.P;
    assert.ok(Math.abs(v.G(x0, y0, z0)) < 1e-12, `P en la superficie semilla ${s}`);
    cerca(v.n[0] * x0 + v.n[1] * y0 + v.n[2] * z0, v.D, 1e-12, `P en el plano semilla ${s}`);
    dif3(v.G, x0, y0, z0).forEach((c, i) => cerca(c, v.n[i], 1e-5, `n[${i}] semilla ${s}`));
    for (const [dx, dy] of [[1, 0], [0, 1], [1, 1], [1, -1]]) {
      const x = x0 + h * dx, y = y0 + h * dy, z = resolverZ(v.G, x, y, z0);
      assert.ok(Math.abs(v.n[0] * x + v.n[1] * y + v.n[2] * z - v.D) < 1e-5, `semilla ${s}: residuo ${v.n[0] * x + v.n[1] * y + v.n[2] * z - v.D}`);
    }
    if (v.paralelo) { // la normal del plano tangente es múltiplo de la del plano dado (producto vectorial nulo) y el plano dado NO es el tangente
      par++;
      const [a, b, c] = v.paralelo, [p, q, r] = v.n;
      assert.ok([q * c - r * b, r * a - p * c, p * b - q * a].every((w) => Math.abs(w) < 1e-9), `semilla ${s}: normales no paralelas`);
    }
  }
  assert.ok(par > 30, `pocos ejercicios con plano paralelo: ${par}`);
});

test('plano: control negativo, un plano con la normal equivocada SÍ se despega de la superficie', () => {
  let fallan = 0;
  const h = 1e-4;
  for (const s of semillas.slice(0, 100)) {
    const { verif: v } = generar('plano', s), [x0, y0, z0] = v.P, n = [v.n[0] + 1, v.n[1], v.n[2]];
    const x = x0 + h, z = resolverZ(v.G, x, y0, z0);
    if (Math.abs(n[0] * x + n[1] * y0 + n[2] * z - (n[0] * x0 + n[1] * y0 + n[2] * z0)) > 1e-5) fallan++;
  }
  assert.equal(fallan, 100);
});

test(`p1: todo el TeX de los generadores del 1º parcial compila en KaTeX sin errores (${N} semillas)`, async () => {
  const katex = (await import('katex')).default;
  for (const g of GENERADORES.filter((x) => x.instancia === 'p1')) {
    for (const s of semillas) {
      const e = generar(g.id, s);
      for (const o of [...e.enunciado, ...e.pasos, e.resultado]) if (o.tex) assert.doesNotThrow(() => katex.renderToString(o.tex, { throwOnError: true, strict: 'error' }), `${g.id} semilla ${s}: ${o.tex}`);
    }
  }
});

test('p1: notación de cátedra unificada (f\'_x, F\'_x, arctg, H, D_f, e_máx) y sin restos de la notación vieja', () => {
  for (const g of GENERADORES.filter((x) => x.instancia === 'p1')) {
    for (const s of semillas) {
      const e = generar(g.id, s), todo = [...e.enunciado, ...e.pasos, e.resultado].flatMap((o) => [o.tex, o.txt]).filter(Boolean).join('\n');
      assert.ok(!/(?<![\\\w'])[fF]_\{?[xyz]\b|\\arctan|arctan\(|\\operatorname\{Dom\}|\\varepsilon|z_x\b|z_y\b/.test(todo), `${g.id} semilla ${s}: notación vieja en ${todo.match(/(?<![\\\w'])[fF]_\{?[xyz]\b|\\arctan|\\operatorname\{Dom\}|\\varepsilon|z_x\b|z_y\b/)?.[0]}`);
    }
  }
});

test('lagrange: la justificación de existencia no dice "acotado" para las cajas y hay ejercicios con 4 candidatos y con volumen fijo', () => {
  let cajas = 0, circ = 0, vfijo = 0;
  for (const s of semillas) {
    const e = generar('lagrange', s), todo = e.pasos.map((p) => p.txt).join(' ');
    if (/caja rectangular con/.test(e.enunciado[0].txt) && /máxim/.test(e.enunciado[0].txt)) { cajas++; assert.ok(!/conjunto de puntos .* es acotado/.test(todo), `semilla ${s}`); assert.ok(/tiende a 0 o a ∞/.test(todo)); }
    if (e.verif.tipo === 'ambos') circ++;
    if (/menor cantidad de material/.test(e.enunciado[0].txt)) vfijo++;
  }
  assert.ok(cajas > 20 && circ > 20 && vfijo > 20, `${cajas} ${circ} ${vfijo}`);
});

test('dominio: en los tipos con producto/cociente el dominio es la UNIÓN S1 ∪ S2 y nunca queda vacío', () => {
  let uni = 0;
  for (const s of semillas) {
    const v = generar('dominio', s).verif;
    let n = 0;
    for (const [x, y] of lattice) if (v.dom(x, y)) n++;
    assert.ok(n >= 1, `semilla ${s}: dominio vacío en el reticulado`);
    if (v.union) {
      uni++;
      const [a, b, c, d] = v.conds;
      // hay puntos en S1 sin estar en S2 y viceversa (si fuera una intersección faltarían)
      assert.ok(lattice.every(([x, y]) => v.dom(x, y) === ((a(x, y) && b(x, y)) || (c(x, y) && d(x, y)))), `semilla ${s}`);
    }
  }
  assert.ok(uni > 40, `pocos con unión: ${uni}`);
});

test(`direccional3: ∇f, versor unitario, D_u f = ∇f·u, máximo y mínimo contra diferencias finitas en 3 variables (${N} semillas)`, () => {
  const modos = new Set();
  for (const s of semillas) {
    const e = generar('direccional3', s), v = e.verif, [x0, y0, z0] = v.P, h = 1e-5;
    modos.add(/\\alpha=/.test(e.enunciado[1].tex) ? 'angulos' : 'vector');
    const g = [0, 1, 2].map((i) => { const d = [0, 0, 0]; d[i] = h; return (v.f(x0 + d[0], y0 + d[1], z0 + d[2]) - v.f(x0 - d[0], y0 - d[1], z0 - d[2])) / (2 * h); });
    g.forEach((gi, i) => cerca(gi, v.grad[i], 1e-6, `f_${i} semilla ${s}`));
    cerca(Math.hypot(...v.u), 1, 1e-12, `|u| semilla ${s}`);
    cerca((v.f(x0 + h * v.u[0], y0 + h * v.u[1], z0 + h * v.u[2]) - v.f(x0 - h * v.u[0], y0 - h * v.u[1], z0 - h * v.u[2])) / (2 * h), v.duf, 1e-6, `D_u f semilla ${s}`);
    cerca(Math.hypot(...g), v.mod, 1e-6, `|∇f| semilla ${s}`);
    cerca(Math.hypot(...v.dirMax), 1, 1e-12, `|u_max| semilla ${s}`);
    v.dirMax.forEach((c, i) => cerca(c * v.mod, v.grad[i], 1e-9, `u_max = ∇f/|∇f| semilla ${s}`));
    assert.ok(v.duf <= v.mod + 1e-9 && v.duf >= -v.mod - 1e-9, `semilla ${s}: |D_u f| no puede superar |∇f|`);
    assert.ok(!/NaN|undefined/.test(JSON.stringify(e)), `semilla ${s}`);
  }
  assert.deepEqual([...modos].sort(), ['angulos', 'vector']);
});

test('direccional: hay puntos no amables (arctg y raíz sin exponencial en 0 ni ln 1) con gradiente exacto', () => {
  let atg = 0, rz = 0;
  for (const s of semillas) {
    const e = generar('direccional', s), f = e.enunciado[0].tex;
    if (/arctg/.test(f)) atg++;
    if (/^f\(x,y\)=\\sqrt\{x\^\{2\}\+y\^\{2\}\}$/.test(f)) rz++;
  }
  assert.ok(atg > 5 && rz > 10, `${atg} ${rz}`);
});

test('implícita: aparece sen(z−z₀) y el caso F\'_z(P)=0 dice que NO se puede aplicar el teorema (y F_z es 0 de verdad)', () => {
  let ceros = 0, sen = 0;
  for (const s of semillas) {
    const e = generar('implicita', s), v = e.verif;
    if (/operatorname\{sen\}/.test(e.enunciado[0].tex)) sen++;
    if (v.modo !== 'cero') continue;
    ceros++;
    const [x0, y0, z0] = v.P, h = 1e-5;
    assert.ok(Math.abs(v.F(x0, y0, z0)) < 1e-12, `F(P) semilla ${s}`);
    cerca((v.F(x0, y0, z0 + h) - v.F(x0, y0, z0 - h)) / (2 * h), 0, 1e-6, `F_z(P) = 0 semilla ${s}`);
    assert.equal(v.val[2], 0);
    assert.ok(/NO se puede aplicar el teorema/.test(e.pasos.map((p) => p.txt).join(' ')) && /no se garantiza/.test(e.resultado.tex), `semilla ${s}`);
  }
  assert.ok(ceros > 10 && sen > 8, `${ceros} ${sen}`);
});

test('dominio: hay cónica de centro desplazado (completa cuadrados), arcsen/arccos con −1 ≤ G ≤ 1 y ln|G|; D_f no se repite en los pasos', () => {
  let circd = 0;
  const vistos = new Set();
  for (const s of semillas) {
    const e = generar('dominio', s), todo = e.pasos.map((p) => p.txt).join(' ');
    vistos.add(e.verif.id);
    if (/completo cuadrados/.test(todo)) { circd++; assert.ok(/\\left\(x[-+]\d+\\right\)\^\{2\}/.test(e.pasos.map((p) => p.tex).join(' ')), `semilla ${s}`); }
    if (e.verif.id === 'asen' || e.verif.id === 'acos') assert.ok(/entre −1 y 1/.test(todo) && e.resultado.tex.split('\\\\').length >= 1, `semilla ${s}`);
    assert.ok(!e.pasos.some((p) => /D_\{f\}/.test(p.tex ?? '')), `semilla ${s}: D_f repetido en los pasos`);
    assert.equal((e.resultado.tex.match(/D_\{f\}/g) ?? []).length, 1, `semilla ${s}`);
  }
  assert.ok(circd > 30, `pocas circunferencias desplazadas: ${circd}`);
  for (const id of ['asen', 'acos', 'lnabs']) assert.ok(vistos.has(id), id);
});

test('lagrange: cuando se pide la superficie total el enunciado dice que la caja es de volumen máximo', () => {
  let n = 0;
  for (const s of semillas) {
    const t = generar('lagrange', s).enunciado[0].txt;
    if (/superficie total/.test(t)) { n++; assert.ok(/volumen máximo/.test(t), `semilla ${s}: ${t}`); }
  }
  assert.ok(n > 5);
});
