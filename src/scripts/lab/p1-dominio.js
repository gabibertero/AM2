// Dominio de f(x,y) con raíces, logaritmos y cocientes: desigualdades, curva borde, lado correcto (punto de prueba)
// y borde incluido/excluido. Solo enunciado, pasos y resultado en desigualdades. Lógica pura.
import { suma } from './mate.js';
import { lineas } from './p1-comun.js';

const FLIP = { '\\geq': '\\leq', '>': '<', '\\neq': '\\neq' };
const OPJS = { '\\geq': (a, b) => a >= b, '\\leq': (a, b) => a <= b, '>': (a, b) => a > b, '<': (a, b) => a < b, '\\neq': (a, b) => a !== b };

// G(x,y) = c + σ·h(x,y), con h de una familia (recta, parábola, circunferencia, hipérbola) y c ≠ 0 (el origen no está en el borde).
function forma(rng) {
  for (;;) {
    const sigma = rng.signo(), t = rng.elegir(['lin', 'par', 'circ', 'hip']);
    const a = rng.nz(3);
    const T = {
      lin: { nombre: 'una recta', ts: [[a, 'x', '0', (x) => a * x], [1, 'y', '0', (x, y) => y]] },
      par: { nombre: 'una parábola', ts: [[1, 'x^{2}', '0^{2}', (x) => x * x], [-1, 'y', '0', (x, y) => -y]] },
      circ: { nombre: 'una circunferencia con centro en el origen', ts: [[1, 'x^{2}', '0^{2}', (x) => x * x], [1, 'y^{2}', '0^{2}', (x, y) => y * y]] },
      hip: { nombre: 'una hipérbola', ts: [[1, 'xy', '0\\cdot 0', (x, y) => x * y]] },
    }[t];
    const r = rng.ent(2, 4);
    const c = t === 'circ' ? -sigma * r * r : rng.nz(4);
    if (c === 1) continue; // G = 1 también tiene que ser una curva propia
    const hf = (x, y) => T.ts.reduce((s, [k, , , f]) => s + k * f(x, y), 0);
    const h = suma(T.ts.map(([k, b]) => [k, b]));
    return {
      t, nombre: T.nombre, h, c, sigma, gf: (x, y) => c + sigma * hf(x, y),
      G: suma([[c, ''], ...T.ts.map(([k, b]) => [sigma * k, b])]),
      G0: suma([[c, ''], ...T.ts.map(([k, , e]) => [sigma * k, e])]),
      ineq: (op, v) => { const o = sigma < 0 ? FLIP[op] : op, w = sigma * (v - c); return { tex: `${h}${o}${w}`, w, borde: `${h}=${w}`, f: (x, y) => OPJS[o](hf(x, y), w) }; },
    };
  }
}

const ln = (g) => (g > 0 ? Math.log(g) : NaN); // ln(0) = −∞ no es un valor real: sin esto N/ln(0) daría 0
const RAIZ = 'La raíz cuadrada (en los reales) solo existe si el radicando es mayor o igual que 0.';
const LOG = 'El logaritmo solo está definido para argumentos estrictamente positivos.';
const DEN = 'El denominador no puede ser 0.';
const TIPOS = {
  raiz: { n: 1, tex: (g) => `\\sqrt{${g[0]}}`, f: (g) => Math.sqrt(g[0]), cs: [[0, '\\geq', 0, RAIZ]] },
  ln: { n: 1, tex: (g) => `\\ln\\left(${g[0]}\\right)`, f: (g) => ln(g[0]), cs: [[0, '>', 0, LOG]] },
  coc: { n: 1, num: true, tex: (g, N) => `\\frac{${N}}{${g[0]}}`, f: (g, N) => N / g[0], cs: [[0, '\\neq', 0, DEN]] },
  rd: { n: 1, num: true, tex: (g, N) => `\\frac{${N}}{\\sqrt{${g[0]}}}`, f: (g, N) => N / Math.sqrt(g[0]), cs: [[0, '>', 0, 'La raíz pide radicando ≥ 0 y, como está en el denominador, la raíz no puede valer 0: queda radicando estrictamente positivo.']] },
  lnd: { n: 1, num: true, tex: (g, N) => `\\frac{${N}}{\\ln\\left(${g[0]}\\right)}`, f: (g, N) => N / ln(g[0]), cs: [[0, '>', 0, LOG], [0, '\\neq', 1, 'El denominador ln(G) no puede ser 0, y ln(G) = 0 exactamente cuando G = 1.']] },
  suma: { n: 2, tex: (g) => `\\sqrt{${g[0]}}+\\ln\\left(${g[1]}\\right)`, f: (g) => Math.sqrt(g[0]) + ln(g[1]), cs: [[0, '\\geq', 0, RAIZ], [1, '>', 0, LOG]] },
  rc: { n: 2, tex: (g) => `\\frac{\\sqrt{${g[0]}}}{${g[1]}}`, f: (g) => Math.sqrt(g[0]) / g[1], cs: [[0, '\\geq', 0, RAIZ], [1, '\\neq', 0, DEN]] },
  lc: { n: 2, tex: (g) => `\\frac{\\ln\\left(${g[0]}\\right)}{${g[1]}}`, f: (g) => ln(g[0]) / g[1], cs: [[0, '>', 0, LOG], [1, '\\neq', 0, DEN]] },
};

function dominio(rng) {
  const id = rng.elegir(Object.keys(TIPOS));
  const T = TIPOS[id];
  const gs = [];
  do {
    gs.length = 0;
    for (let i = 0; i < T.n; i++) gs.push(forma(rng));
  } while (T.n === 2 && gs[0].t === gs[1].t);
  const a = rng.nz(2), b = rng.nz(2);
  const N = suma([[a, 'x'], [b, 'y']]), Nf = (x, y) => a * x + b * y;
  const gtex = gs.map((g) => g.G);
  const ftex = T.tex(gtex, N);
  const f = (x, y) => T.f(gs.map((g) => g.gf(x, y)), Nf(x, y));
  const res = T.cs.map(([k, op, v, motivo]) => ({ g: gs[k], op, v, motivo, r: gs[k].ineq(op, v) }));
  const pasos = [];
  res.forEach((c, i) => {
    const n = i + 1, g = c.g, vtxt = c.v === 1 ? '1' : '0';
    pasos.push({ txt: `Condición ${n}: ${c.motivo} Entonces hace falta:`, tex: `${g.G}${c.op}${vtxt}` });
    const incl = c.op === '\\geq';
    pasos.push({ txt: `Frontera de la condición ${n}: se obtiene cambiando la desigualdad por una igualdad. Es la curva G = ${vtxt}; despejando, queda ${g.nombre}. ${incl ? 'La desigualdad es no estricta (≥): los puntos de la curva SÍ cumplen, el borde queda incluido.' : 'La condición es estricta o de distinto: los puntos de la curva NO cumplen, el borde queda excluido (se dibujaría punteado).'}`, tex: lineas([`${g.G}&=${vtxt}`, `${c.r.borde.replace('=', '&=')}`]) });
    if (c.op === '\\neq') return;
    pasos.push({ txt: `Para saber de qué lado de la curva está la región pruebo el origen (0, 0), que no está sobre la curva porque G(0,0) ≠ ${vtxt}:`, tex: lineas([`G(0,0)&=${g.G0}`, `&=${g.c}`]) });
    const cumple = c.op === '\\geq' ? g.c >= 0 : g.c > 0;
    pasos.push({ txt: `Como ${g.c}${c.op === '\\geq' ? '≥' : '>'}0 es ${cumple ? 'verdadero' : 'falso'}, el origen ${cumple ? 'SÍ' : 'NO'} cumple: la región es el lado de la curva ${cumple ? 'que contiene al origen' : 'opuesto al que contiene al origen'}. En desigualdades:`, tex: c.r.tex });
  });
  const dom = res.map((c) => c.r.tex);
  const domTex = `\\operatorname{Dom}f=\\left\\{(x,y)\\in\\mathbb{R}^{2}:\\ ${dom.join(',\\ ')}\\right\\}`;
  if (res.length > 1) pasos.push({ txt: 'El dominio es el conjunto de puntos que cumplen todas las condiciones a la vez (intersección). El borde de una condición solo pertenece al dominio si esa condición lo incluye y las demás también se cumplen allí.', tex: domTex });
  else pasos.push({ txt: 'Esa única condición describe el dominio. Lo escribo como conjunto:', tex: domTex });
  return {
    enunciado: [{ txt: 'Hallar y describir con desigualdades el dominio de la función, indicando si el borde pertenece o no al dominio:', tex: `f(x,y)=${ftex}` }],
    pasos,
    resultado: { txt: res.length > 1 ? 'Intersección de las regiones; cada curva borde está incluida (≥) o excluida (>, ≠) según su desigualdad.' : '', tex: domTex },
    verif: { bordes: res.map((c) => (x, y) => c.g.gf(x, y) === c.v), f, dom: (x, y) => res.every((c) => OPJS[c.op](c.g.gf(x, y), c.v)), resueltas: res.map((c) => (x, y) => c.r.f(x, y)), conds: res.map((c) => (x, y) => OPJS[c.op](c.g.gf(x, y), c.v)), id },
  };
}
export const GENERADORES_P1_DOMINIO = [{ id: 'dominio', nombre: 'Dominio de f(x,y)', grupo: 'Cálculo', instancia: 'p1', generar: dominio }];
