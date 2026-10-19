// Dominio de f(x,y) con raíces, logaritmos y cocientes: desigualdades, curva borde en forma canónica, lado correcto (punto de prueba)
// y borde incluido/excluido. Incluye cociente o producto ≥ 0 / > 0 con el método de los dos casos S1 y S2 (D_f = S1 ∪ S2).
// El resultado es en desigualdades; `grafico` (funciones puras) le sirve a la UI para dibujar el dominio. Lógica pura.
import { fr, suma, texF } from './mate.js';
import { lineas } from './p1-comun.js';

const FLIP = { '\\geq': '\\leq', '\\leq': '\\geq', '>': '<', '<': '>', '\\neq': '\\neq' };
const OPJS = { '\\geq': (a, b) => a >= b, '\\leq': (a, b) => a <= b, '>': (a, b) => a > b, '<': (a, b) => a < b, '\\neq': (a, b) => a !== b };
const OPTXT = { '\\geq': '≥', '\\leq': '≤', '>': '>', '<': '<', '\\neq': '≠' };

// G(x,y) = c + σ·h(x,y), con h de una familia (recta, parábola, circunferencia, hipérbola, elipse) y c ≠ 0 (el origen no está en el borde).
// canon(w) da la curva h = w despejada (forma canónica) y cómo se lee.
function forma(rng, evitar = []) {
  for (;;) {
    const sigma = rng.signo(), t = rng.elegir(['lin', 'par', 'circ', 'hip', 'elip', 'circd']);
    const a = rng.nz(3), k = rng.elegir([2, 4]), ad = rng.nz(2), bd = rng.nz(2), rd = rng.elegir([2, 3]);
    const resta = (v, n) => (n > 0 ? `${v}-${n}` : `${v}+${-n}`);
    const T = {
      lin: { nombre: 'una recta', ts: [[a, 'x', '0', (x) => a * x], [1, 'y', '0', (x, y) => y]], canon: (w) => ({ tex: `y=${suma([[-a, 'x'], [w, '']])}`, txt: 'una recta (se despeja y)' }) },
      par: { nombre: 'una parábola', ts: [[1, 'x^{2}', '0^{2}', (x) => x * x], [-1, 'y', '0', (x, y) => -y]], canon: (w) => ({ tex: `y=${suma([[1, 'x^{2}'], [-w, '']])}`, txt: `una parábola con vértice en (0, ${-w}) y eje vertical` }) },
      circ: { nombre: 'una circunferencia con centro en el origen', ts: [[1, 'x^{2}', '0^{2}', (x) => x * x], [1, 'y^{2}', '0^{2}', (x, y) => y * y]], canon: (w) => ({ tex: `x^{2}+y^{2}=\\left(\\sqrt{${w}}\\right)^{2}`, txt: `una circunferencia de centro (0, 0) y radio √${w}` }) },
      hip: { nombre: 'una hipérbola', ts: [[1, 'xy', '0\\cdot 0', (x, y) => x * y]], canon: (w) => ({ tex: `y=\\frac{${w}}{x}`, txt: 'una hipérbola con asíntotas los ejes coordenados' }) },
      circd: { nombre: 'una circunferencia con centro desplazado (se completan cuadrados)', ts: [[1, 'x^{2}', '0^{2}', (x) => x * x], [1, 'y^{2}', '0^{2}', (x, y) => y * y], [-2 * ad, 'x', '0', (x) => x], [-2 * bd, 'y', '0', (x, y) => y]],
        canon: (w) => ({ tex: `\\left(${resta('x', ad)}\\right)^{2}+\\left(${resta('y', bd)}\\right)^{2}=${w + ad * ad + bd * bd}`, txt: `una circunferencia de centro (${ad}, ${bd}) y radio √${w + ad * ad + bd * bd} (completo cuadrados: sumo ${ad * ad} y ${bd * bd} en ambos miembros)` }) },
      elip: { nombre: 'una elipse con centro en el origen', ts: [[1, 'x^{2}', '0^{2}', (x) => x * x], [k, 'y^{2}', '0^{2}', (x, y) => k * y * y]], canon: (w) => ({ tex: `\\frac{x^{2}}{${w}}+\\frac{y^{2}}{${texF(fr(w, k))}}=1`, txt: `una elipse de semiejes √${w} (en x) y √(${texF(fr(w, k)).replace(/\\frac\{(\d+)\}\{(\d+)\}/, '$1/$2')}) (en y)` }) },
    }[t];
    const r = rng.ent(2, 4);
    const c = t === 'circd' ? sigma * (ad * ad + bd * bd - rd * rd) : t === 'circ' ? -sigma * r * r : t === 'elip' ? -sigma * rng.elegir([4, 8, 12, 16]) : rng.nz(4);
    if (evitar.includes(c)) continue; // G = 1 (ln G en el denominador) o G = ±1 (arcsen, arccos) también tienen que ser curvas propias, sin pasar por el origen
    const hf = (x, y) => T.ts.reduce((s, [kk, , , f]) => s + kk * f(x, y), 0);
    const h = suma(T.ts.map(([kk, b]) => [kk, b]));
    return {
      t, nombre: T.nombre, h, c, sigma, gf: (x, y) => c + sigma * hf(x, y),
      G: suma([...T.ts.map(([kk, b]) => [sigma * kk, b]), [c, '']]),
      G0: suma([...T.ts.map(([kk, , e]) => [sigma * kk, e]), [c, '']]),
      ineq: (op, v) => { const o = sigma < 0 ? FLIP[op] : op, w = sigma * (v - c); return { tex: `${h}${o}${w}`, w, borde: `${h}=${w}`, canon: T.canon(w), f: (x, y) => OPJS[o](hf(x, y), w) }; },
    };
  }
}

const ln = (g) => (g > 0 ? Math.log(g) : NaN); // ln(0) = −∞ no es un valor real: sin esto N/ln(0) daría 0
const RAIZ = 'La raíz cuadrada (en los reales) solo existe si el radicando es mayor o igual que 0.';
const LOG = 'El logaritmo solo está definido para argumentos estrictamente positivos.';
const DEN = 'El denominador no puede ser 0.';
const ARC = (n) => `La función ${n} solo está definida para argumentos entre −1 y 1: hacen falta las dos desigualdades −1 ≤ G ≤ 1 a la vez.`;
const TIPOS = {
  raiz: { n: 1, tex: (g) => `\\sqrt{${g[0]}}`, f: (g) => Math.sqrt(g[0]), cs: [[0, '\\geq', 0, RAIZ]] },
  ln: { n: 1, tex: (g) => `\\ln\\left(${g[0]}\\right)`, f: (g) => ln(g[0]), cs: [[0, '>', 0, LOG]] },
  coc: { n: 1, num: true, tex: (g, N) => `\\frac{${N}}{${g[0]}}`, f: (g, N) => N / g[0], cs: [[0, '\\neq', 0, DEN]] },
  rd: { n: 1, num: true, tex: (g, N) => `\\frac{${N}}{\\sqrt{${g[0]}}}`, f: (g, N) => N / Math.sqrt(g[0]), cs: [[0, '>', 0, 'La raíz pide radicando ≥ 0 y, como está en el denominador, la raíz no puede valer 0: queda radicando estrictamente positivo.']] },
  lnabs: { n: 1, tex: (g) => `\\ln\\left|${g[0]}\\right|`, f: (g) => Math.log(Math.abs(g[0])), cs: [[0, '\\neq', 0, 'El logaritmo pide argumento positivo; con valor absoluto, |G| > 0, o sea G ≠ 0.']] },
  asen: { n: 1, tex: (g) => `\\operatorname{arcsen}\\left(${g[0]}\\right)`, f: (g) => Math.asin(g[0]), cs: [[0, '\\geq', -1, ARC('arcsen')], [0, '\\leq', 1, ARC('arcsen')]] },
  acos: { n: 1, tex: (g) => `\\arccos\\left(${g[0]}\\right)`, f: (g) => Math.acos(g[0]), cs: [[0, '\\geq', -1, ARC('arccos')], [0, '\\leq', 1, ARC('arccos')]] },
  lnd: { n: 1, num: true, tex: (g, N) => `\\frac{${N}}{\\ln\\left(${g[0]}\\right)}`, f: (g, N) => N / ln(g[0]), cs: [[0, '>', 0, LOG], [0, '\\neq', 1, 'El denominador ln(G) no puede ser 0, y ln(G) = 0 exactamente cuando G = 1.']] },
  suma: { n: 2, tex: (g) => `\\sqrt{${g[0]}}+\\ln\\left(${g[1]}\\right)`, f: (g) => Math.sqrt(g[0]) + ln(g[1]), cs: [[0, '\\geq', 0, RAIZ], [1, '>', 0, LOG]] },
  rc: { n: 2, tex: (g) => `\\frac{\\sqrt{${g[0]}}}{${g[1]}}`, f: (g) => Math.sqrt(g[0]) / g[1], cs: [[0, '\\geq', 0, RAIZ], [1, '\\neq', 0, DEN]] },
  lc: { n: 2, tex: (g) => `\\frac{\\ln\\left(${g[0]}\\right)}{${g[1]}}`, f: (g) => ln(g[0]) / g[1], cs: [[0, '>', 0, LOG], [1, '\\neq', 0, DEN]] },
  // Cociente o producto con signo: los dos casos S1 (mismo signo, ambos "positivos") y S2 (ambos "negativos"). union = [ops de S1, ops de S2].
  rcoc: { n: 2, union: [['\\geq', '>'], ['\\leq', '<']], tex: (g) => `\\sqrt{\\frac{${g[0]}}{${g[1]}}}`, f: (g) => Math.sqrt(g[0] / g[1]),
    razon: 'La raíz pide que el cociente sea ≥ 0, y además el denominador no puede ser 0. Un cociente es ≥ 0 si numerador y denominador tienen el mismo signo (o el numerador es 0): dos casos.' },
  rp: { n: 2, union: [['\\geq', '\\geq'], ['\\leq', '\\leq']], tex: (g) => `\\sqrt{\\left(${g[0]}\\right)\\left(${g[1]}\\right)}`, f: (g) => Math.sqrt(g[0] * g[1]),
    razon: 'La raíz pide que el producto sea ≥ 0. Un producto es ≥ 0 si los dos factores tienen el mismo signo (o alguno es 0): dos casos.' },
  lnp: { n: 2, union: [['>', '>'], ['<', '<']], tex: (g) => `\\ln\\left[\\left(${g[0]}\\right)\\left(${g[1]}\\right)\\right]`, f: (g) => ln(g[0] * g[1]),
    razon: 'El logaritmo pide que el producto sea > 0. Un producto es > 0 si los dos factores tienen el mismo signo y ninguno es 0: dos casos.' },
};

// Texto de borde incluido / excluido según el operador de la condición (frases separadas para el alumno).
const bordeTxt = (op) => (op === '\\geq' || op === '\\leq' ? `La desigualdad es no estricta (${OPTXT[op]}): los puntos de la curva SÍ cumplen, el borde queda incluido (se dibuja con línea llena).`
  : op === '\\neq' ? 'La condición es "distinto de" (≠): los puntos de la curva NO cumplen, se sacan del dominio (curva punteada).'
    : `La desigualdad es estricta (${OPTXT[op]}): los puntos de la curva NO cumplen, el borde queda excluido (curva punteada).`);

function armar(rng) {
  const id = rng.elegir(Object.keys(TIPOS));
  const T = TIPOS[id];
  const gs = [];
  do {
    gs.length = 0;
    for (let i = 0; i < T.n; i++) gs.push(forma(rng, id === 'lnd' ? [1] : id === 'asen' || id === 'acos' ? [1, -1] : []));
  } while (T.n === 2 && gs[0].t === gs[1].t);
  const a = rng.nz(2), b = rng.nz(2);
  const N = suma([[a, 'x'], [b, 'y']]), Nf = (x, y) => a * x + b * y;
  const ftex = T.tex(gs.map((g) => g.G), N);
  const f = (x, y) => T.f(gs.map((g) => g.gf(x, y)), Nf(x, y));
  // condiciones atómicas: [índice de G, operador, valor, motivo]; en los tipos con unión son las 4 de S1 y S2
  const cs = T.union ? T.union.flatMap((ops) => ops.map((op, k) => [k, op, 0, ''])) : T.cs;
  const res = cs.map(([k, op, v, motivo]) => ({ g: gs[k], k, op, v, motivo, r: gs[k].ineq(op, v) }));
  const cumple = (x, y) => (T.union ? (res[0].r.f(x, y) && res[1].r.f(x, y)) || (res[2].r.f(x, y) && res[3].r.f(x, y)) : res.every((c) => c.r.f(x, y)));
  return { id, T, gs, N, ftex, f, res, cumple };
}

function dominio(rng) {
  let A;
  for (;;) { // el dominio no puede quedar vacío ni reducirse a casi nada (por ejemplo x² + y² ≤ 4 junto con x + y ≥ 6)
    A = armar(rng);
    let n = 0;
    for (let i = -32; i <= 32; i++) for (let j = -32; j <= 32; j++) if (A.cumple(i / 4, j / 4) && Number.isFinite(A.f(i / 4, j / 4))) n++;
    if (n >= 8) break;
  }
  const { id, T, gs, ftex, f, res } = A;
  const pasos = [];
  const dtex = (i) => `\\left\\{(x,y)\\in\\mathbb{R}^{2}:\\ ${i}\\right\\}`;
  const frontera = (g, n, v, op, extra) => {
    const vtxt = String(v), rr = g.ineq(op, v);
    pasos.push({ txt: `Frontera ${extra}: se obtiene cambiando la desigualdad por una igualdad (G = ${vtxt}) y despejando; queda ${rr.canon.txt}. ${bordeTxt(op)}`, tex: lineas([`${g.G}&=${vtxt}`, `${rr.borde.replace('=', '&=')}`, `&\\Leftrightarrow\\ ${rr.canon.tex}`]) });
  };
  const origen = (g, op, v, n) => {
    const vtxt = String(v);
    pasos.push({ txt: `Para saber de qué lado de la curva está la región pruebo el origen (0, 0), que no está sobre la curva porque $G(0,0)\\neq ${vtxt}$:`, tex: lineas([`G(0,0)&=${g.G0}`, `&=${g.c}`]) });
    const ok = OPJS[op](g.c, v);
    pasos.push({ txt: `Como ${g.c} ${OPTXT[op]} ${vtxt} es ${ok ? 'verdadero' : 'falso'}, el origen ${ok ? 'SÍ' : 'NO'} cumple: la región es el lado de la curva ${ok ? 'que contiene al origen' : 'opuesto al que contiene al origen'}. En desigualdades:`, tex: g.ineq(op, v).tex });
  };
  let domTex;
  if (T.union) {
    const [g0, g1] = gs, [o1, o2] = T.union;
    pasos.push({ txt: `${T.razon} Escribo los dos casos con G₁ = ${g0.G} y G₂ = ${g1.G}:`, tex: lineas([`S_{1}&:\\ G_{1}${o1[0]}0\\ \\text{y}\\ G_{2}${o1[1]}0`, `S_{2}&:\\ G_{1}${o2[0]}0\\ \\text{y}\\ G_{2}${o2[1]}0`]) });
    [[g0, 1, o1[0]], [g1, 2, o1[1]]].forEach(([g, n, op]) => { frontera(g, n, 0, op, `de G${n === 1 ? '₁' : '₂'}`); origen(g, op, 0, n); });
    const casos = [[res[0], res[1], 1], [res[2], res[3], 2]];
    for (const [r1, r2, n] of casos) pasos.push({ txt: `Caso S${n === 1 ? '₁' : '₂'}: el lado de G₁ y el lado de G₂ a la vez (intersección). ${n === 2 ? 'Cada desigualdad es la contraria a la del caso S₁, o sea la región del otro lado de cada curva.' : ''}`, tex: `S_{${n}}=${dtex(`${r1.r.tex},\\ ${r2.r.tex}`)}` });
    domTex = `D_{f}=S_{1}\\cup S_{2}`;
    pasos.push({ txt: 'El dominio es la unión de los dos casos (cualquiera de los dos sirve), no la intersección. El borde de una curva pertenece al dominio solo si la desigualdad es no estricta y se cumple en ese punto.' });
    pasos.push({ txt: 'Gráfico: se dibujan las dos curvas (llenas si el borde está incluido, punteadas si no) y se sombrean las dos regiones, la que contiene al origen según cada curva y la opuesta; el dominio queda formado por S₁ y S₂ juntas.' });
  } else {
    res.forEach((c, i) => {
      const n = i + 1;
      pasos.push({ txt: `Condición ${n}: ${c.motivo} Entonces hace falta:`, tex: `${c.g.G}${c.op}${c.v}` });
      frontera(c.g, n, c.v, c.op, `de la condición ${n}`);
      if (c.op === '\\neq') return;
      origen(c.g, c.op, c.v, n);
    });
    const dom = res.map((c) => c.r.tex);
    domTex = `D_{f}=${dtex(dom.join(',\\ '))}`;
    pasos.push({ txt: res.length > 1 ? 'El dominio es el conjunto de puntos que cumplen todas las condiciones a la vez (intersección). El borde de una condición solo pertenece al dominio si esa condición lo incluye y las demás también se cumplen allí. Queda escrito en el resultado.' : 'Esa única condición describe el dominio; queda escrito como conjunto en el resultado.' });
    pasos.push({ txt: 'Gráfico: se dibujan las curvas borde (llenas si están incluidas, punteadas si no) y se sombrea la región que cumple todo lo anterior.' });
  }
  const conds = res.map((c) => (x, y) => OPJS[c.op](c.g.gf(x, y), c.v));
  const vistas = new Set(), curvas = [];
  for (const c of res) if (!vistas.has(`${c.k}-${c.v}`)) { vistas.add(`${c.k}-${c.v}`); curvas.push({ g: c.g.gf, c: c.v, incl: c.op === '\\geq' || c.op === '\\leq' }); }
  const grafico = { dom: (x, y) => A.cumple(x, y) && Number.isFinite(f(x, y)), curvas };
  return {
    enunciado: [{ txt: 'Determinar gráfica y analíticamente el dominio de la función, escribiéndolo con desigualdades e indicando si el borde pertenece o no al dominio:', tex: `f(x,y)=${ftex}` }],
    pasos,
    resultado: { txt: res.length > 1 ? (T.union ? 'Unión de las dos regiones S₁ y S₂; cada curva borde está incluida (≥, ≤) o excluida (>, <, ≠) según su desigualdad.' : 'Intersección de las regiones; cada curva borde está incluida (≥) o excluida (>, ≠) según su desigualdad.') : '', tex: T.union ? lineas([`S_{1}&=${dtex(`${res[0].r.tex},\\ ${res[1].r.tex}`)}`, `S_{2}&=${dtex(`${res[2].r.tex},\\ ${res[3].r.tex}`)}`, domTex.replace('D_{f}', 'D_{f}&')]) : domTex },
    grafico,
    verif: { bordes: res.map((c) => (x, y) => c.g.gf(x, y) === c.v), f, dom: (x, y) => A.cumple(x, y), resueltas: res.map((c) => (x, y) => c.r.f(x, y)), conds, id, union: !!T.union },
  };
}
export const GENERADORES_P1_DOMINIO = [{ id: 'dominio', nombre: 'Dominio de f(x,y)', grupo: 'Cálculo', instancia: 'p1', generar: dominio }];
