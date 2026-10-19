// Derivada direccional y gradiente: ∇f(P), versor u (por ángulo en radianes o grados, por vector, hacia otro punto o bisectriz), ∂f/∂u = ∇f·u
// (o por definición, con el límite en t → 0⁺), y dirección/módulo de máximo crecimiento, mínimo y direcciones de derivada nula,
// con el cuadrante correcto. f polinómica, exponencial o logarítmica. Notación de cátedra (f'_x, arctg). Lógica pura.
import { fr, fSum, fMul, fNeg, fVal, texF, suma, SEN, uTex, p2Comp } from './mate.js';
import { lineas, num, fp, fac, aprox, raiz, radTerms, radTex, radVal, radMul, p3, p3Tex, p3D, p3Ev, p3Fr, p3Sub, unirT } from './p1-comun.js';

const ex = (k, v) => (k === 1 ? `e^{${v}}` : k === -1 ? `e^{-${v}}` : `e^{${k}${v}}`);
// Plantillas: f, parciales generales, valores en P (exactos) y la sustitución visible. Con def, solo las que se resuelven a mano por definición.
function funcion(rng, def) {
  const tipo = def ? rng.elegir(['poli', 'poli', 'lxy']) : rng.elegir(['poli', 'poli', 'e1', 'e2', 'e3', 'l1', 'l2', 'l3', 'lrz', 'lxy']);
  const n = (v) => fac(v < 0, `${v}`);
  for (;;) {
    if (tipo === 'poli') {
      const pool = def ? [[2, 0], [0, 2], [1, 1], [1, 0], [0, 1], [2, 1], [1, 2]] : [[2, 1], [1, 2], [2, 0], [0, 2], [1, 1], [3, 0], [0, 3], [1, 0], [0, 1]], ms = [];
      const cuantos = def ? rng.ent(2, 3) : rng.ent(3, 4);
      while (ms.length < cuantos) { const m = rng.elegir(pool); if (!ms.some((t) => t.join() === m.join())) ms.push(m); }
      const p = p3(ms.map(([i, j]) => [rng.nz(3), i, j, 0])), P = [rng.nz(2), rng.nz(2), 0];
      const D = [p3D(p, 0), p3D(p, 1)];
      const g = D.map((d) => p3Fr(d, ...P));
      if (!g[0].n && !g[1].n) continue;
      return { ftex: p3Tex(p), fn: (x, y) => p3Ev(p, x, y), P, gen: D.map((d) => p3Tex(d)), sub: D.map((d) => p3Sub(d, P)), g, p2: p.map(([c, i, j]) => [c, i, j]) };
    }
    if (tipo === 'e1') { // x² e^{ky}, P = (x0, 0)
      const k = rng.nz(2), x0 = rng.nz(3), E = ex(k, 'y');
      return { ftex: `x^{2}${E}`, fn: (x, y) => x * x * Math.exp(k * y), P: [x0, 0], gen: [`2x${E}`, suma([[k, `x^{2}${E}`]])],
        sub: [`2\\cdot ${n(x0)}\\cdot e^{${k}\\cdot 0}`, suma([[k, `${n(x0)}^{2}e^{${k}\\cdot 0}`]])], g: [fr(2 * x0), fr(k * x0 * x0)], nota: 'e^0 = 1' };
    }
    if (tipo === 'e2') { // y e^{kx}, P = (0, y0)
      const k = rng.nz(2), y0 = rng.nz(3), E = ex(k, 'x');
      return { ftex: `y${E}`, fn: (x, y) => y * Math.exp(k * x), P: [0, y0], gen: [suma([[k, `y${E}`]]), E],
        sub: [suma([[k, `${n(y0)}e^{${k}\\cdot 0}`]]), `e^{${k}\\cdot 0}`], g: [fr(k * y0), fr(1)], nota: 'e^0 = 1' };
    }
    if (tipo === 'e3') { // (x+y) e^{xy}, P = (x0, 0)
      const x0 = rng.nz(3);
      return { ftex: '\\left(x+y\\right)e^{xy}', fn: (x, y) => (x + y) * Math.exp(x * y), P: [x0, 0], gen: ['\\left(1+y\\left(x+y\\right)\\right)e^{xy}', '\\left(1+x\\left(x+y\\right)\\right)e^{xy}'],
        sub: [`\\left(1+0\\cdot\\left(${x0}+0\\right)\\right)e^{${n(x0)}\\cdot 0}`, `\\left(1+${n(x0)}\\cdot\\left(${x0}+0\\right)\\right)e^{${n(x0)}\\cdot 0}`], g: [fr(1), fr(1 + x0 * x0)], nota: 'e^0 = 1' };
    }
    if (tipo === 'l1') {
      const x0 = rng.nz(3), y0 = rng.nz(3), s = x0 * x0 + y0 * y0;
      return { ftex: '\\ln\\left(x^{2}+y^{2}\\right)', fn: (x, y) => Math.log(x * x + y * y), P: [x0, y0], gen: ['\\frac{2x}{x^{2}+y^{2}}', '\\frac{2y}{x^{2}+y^{2}}'],
        sub: [`\\frac{2\\cdot ${n(x0)}}{${n(x0)}^{2}+${n(y0)}^{2}}`, `\\frac{2\\cdot ${n(y0)}}{${n(x0)}^{2}+${n(y0)}^{2}}`], g: [fr(2 * x0, s), fr(2 * y0, s)] };
    }
    if (tipo === 'l2') {
      const a = rng.nz(3), b = rng.nz(3), x0 = rng.nz(3), y0 = rng.nz(3), s = a * x0 + b * y0;
      if (s <= 0) continue;
      const L = suma([[a, 'x'], [b, 'y']]);
      return { ftex: `\\ln\\left(${L}\\right)`, fn: (x, y) => Math.log(a * x + b * y), P: [x0, y0], gen: [`\\frac{${a}}{${L}}`, `\\frac{${b}}{${L}}`],
        sub: [`\\frac{${a}}{${a}\\cdot ${n(x0)}+${n(b)}\\cdot ${n(y0)}}`, `\\frac{${b}}{${a}\\cdot ${n(x0)}+${n(b)}\\cdot ${n(y0)}}`], g: [fr(a, s), fr(b, s)] };
    }
    if (tipo === 'lrz') { // ln √(ax²+by²): conviene simplificar antes de derivar (si no, sale mal el factor ½)
      const a = rng.nz(4), b = rng.nz(4), x0 = rng.nz(2), y0 = rng.nz(2), R = a * x0 * x0 + b * y0 * y0;
      if (R <= 0) continue;
      const pr = p3([[a, 2, 0, 0], [b, 0, 2, 0]]), Rt = p3Tex(pr);
      return { ftex: `\\ln\\sqrt{${Rt}}`, fn: (x, y) => Math.log(Math.sqrt(a * x * x + b * y * y)), P: [x0, y0],
        simp: `\\frac{1}{2}\\ln\\left(${Rt}\\right)`, simpTxt: 'Antes de derivar simplifico: ln √A = ½·ln A (si derivara la raíz sin simplificar es fácil perder el factor ½).',
        gen: [`\\frac{${suma([[a, 'x']])}}{${Rt}}`, `\\frac{${suma([[b, 'y']])}}{${Rt}}`],
        sub: [`\\frac{${a}\\cdot ${n(x0)}}{${p3Sub(pr, [x0, y0, 0])}}`, `\\frac{${b}\\cdot ${n(y0)}}{${p3Sub(pr, [x0, y0, 0])}}`], g: [fr(a * x0, R), fr(b * y0, R)] };
    }
    if (tipo === 'lxy') { // ln(x/y) = ln x − ln y, con x, y > 0
      const x0 = rng.ent(1, 4), y0 = rng.ent(1, 4);
      return { ftex: '\\ln\\frac{x}{y}', fn: (x, y) => Math.log(x / y), P: [x0, y0], lxy: true,
        simp: '\\ln x-\\ln y', simpTxt: 'Antes de derivar uso la propiedad del logaritmo: ln(x/y) = ln x − ln y.',
        gen: ['\\frac{1}{x}', '-\\frac{1}{y}'], sub: [`\\frac{1}{${x0}}`, `-\\frac{1}{${y0}}`], g: [fr(1, x0), fr(-1, y0)] };
    }
    // l3: x ln y, P = (x0, 1)
    const x0 = rng.nz(3);
    return { ftex: 'x\\ln y', fn: (x, y) => x * Math.log(y), P: [x0, 1], gen: ['\\ln y', '\\frac{x}{y}'], sub: ['\\ln 1', `\\frac{${n(x0)}}{1}`], g: [fr(0), fr(x0)], nota: 'ln 1 = 0' };
  }
}

const ANGULOS = [ // [texto de θ en radianes, coseno [s, c], seno [s, c], grados]
  ['\\frac{\\pi}{6}', [3, fr(1, 2)], [1, fr(1, 2)], 30], ['\\frac{\\pi}{4}', [2, fr(1, 2)], [2, fr(1, 2)], 45], ['\\frac{\\pi}{3}', [1, fr(1, 2)], [3, fr(1, 2)], 60],
  ['\\frac{2\\pi}{3}', [1, fr(-1, 2)], [3, fr(1, 2)], 120], ['\\frac{3\\pi}{4}', [2, fr(-1, 2)], [2, fr(1, 2)], 135], ['\\frac{5\\pi}{6}', [3, fr(-1, 2)], [1, fr(1, 2)], 150],
  ['\\frac{5\\pi}{3}', [1, fr(1, 2)], [3, fr(-1, 2)], 300], ['\\frac{7\\pi}{4}', [2, fr(1, 2)], [2, fr(-1, 2)], 315], ['\\frac{7\\pi}{6}', [3, fr(-1, 2)], [1, fr(-1, 2)], 210],
];
const VECTORES = [[3, 4], [-3, 4], [5, -12], [1, 1], [1, -2], [2, 1], [-1, 3], [2, 3], [-2, -2], [4, -3], [-1, -1], [3, -1], [0, 2], [-5, 0]];
const VEC_RACIONALES = [[3, 4], [-3, 4], [5, -12], [4, -3]]; // módulo entero: u racional, para el cálculo por definición
const BISECTRIZ = { 1: [1, 1], 2: [-1, 1], 3: [-1, -1], 4: [1, -1] };
const cuad = (gx, gy) => (gx > 0 && gy > 0 ? '1º' : gx < 0 && gy > 0 ? '2º' : gx < 0 && gy < 0 ? '3º' : '4º');
// Ángulo en grados: exacto si es entero, aproximado si no (devuelve el miembro derecho con su signo = o ≈).
const dg = (x) => { const r = Math.round(x * 1e9) / 1e9; return Number.isInteger(r) ? `=${r}^{\\circ}` : `\\approx ${aprox(x)}^{\\circ}`; };
const mod360 = (x) => ((Math.round(x * 1e9) / 1e9) % 360 + 360) % 360;

// Versor de la dirección pedida y los pasos que lo calculan.
function direccion(rng, def, [x0, y0]) {
  const nrm = (v) => fac(v < 0, `${v}`);
  const modo = def ? rng.elegir(['vector', 'punto']) : rng.elegir(['rad', 'grados', 'vector', 'punto', 'bisectriz']);
  if (modo === 'rad' || modo === 'grados') {
    const [tt, c, s, gr] = rng.elegir(ANGULOS), ang = modo === 'rad' ? tt : `${gr}^{\\circ}`;
    const ux = radTerms([c]), uy = radTerms([s]);
    return { ux, uy, enun: { txt: `Dirección: la que forma el ángulo θ con el semieje positivo de las x${modo === 'grados' ? ' (en grados)' : ''}.`, tex: `\\theta=${ang}` },
      pasos: [{ txt: 'La dirección está dada por un ángulo θ, así que el versor es u = (cos θ, sen θ) (ya tiene módulo 1, porque cos²θ + sen²θ = 1):',
        tex: lineas([`\\vec u&=\\left(\\cos\\theta,\\ ${SEN}\\theta\\right)`, `&=\\left(\\cos ${ang},\\ ${SEN}${ang}\\right)`, `&=\\left(${radTex(ux)},\\ ${radTex(uy)}\\right)`]) }] };
  }
  const normaliza = (a, b, previo) => {
    const [k, s] = raiz(a * a + b * b);
    const ux = radTerms([[s, fr(a, k * s)]]), uy = radTerms([[s, fr(b, k * s)]]);
    const M = radTex([[s, fr(k)]]), crudo = `\\sqrt{${a * a + b * b}}`;
    const fracc = (c) => (c === 0 ? '0' : `\\frac{${c}}{${M}}`);
    const racio = (c) => `\\frac{${c}\\sqrt{${s}}}{${k * s}}`;
    return { ux, uy, pasos: [
      { txt: `${previo}El vector v no tiene módulo 1, así que lo normalizo: u = v / ‖v‖. Primero calculo ‖v‖:`,
        tex: lineas([`\\left\\|\\vec v\\right\\|&=\\sqrt{${nrm(a)}^{2}+${nrm(b)}^{2}}`, `&=\\sqrt{${a * a}+${b * b}}`, `&=${crudo}`, ...(M !== crudo ? [`&=${M}`] : [])]) },
      { txt: `Divido cada componente de v por su módulo${s > 1 ? ' y racionalizo (a/(k√s) = a√s/(k·s), multiplicando arriba y abajo por √s)' : ''}:`,
        tex: lineas([`\\vec u&=\\frac{\\vec v}{\\left\\|\\vec v\\right\\|}`, `&=\\left(${fracc(a)},\\ ${fracc(b)}\\right)`, ...(s > 1 ? [`&=\\left(${a === 0 ? '0' : racio(a)},\\ ${b === 0 ? '0' : racio(b)}\\right)`] : []), `&=\\left(${radTex(ux)},\\ ${radTex(uy)}\\right)`]) }] };
  };
  if (modo === 'vector') {
    const [a, b] = rng.elegir(def ? VEC_RACIONALES : VECTORES), r = normaliza(a, b, '');
    return { ux: r.ux, uy: r.uy, enun: { txt: 'Dirección: la del vector v.', tex: `\\vec v=\\left(${a},\\ ${b}\\right)` }, pasos: r.pasos };
  }
  if (modo === 'punto') {
    const [a, b] = rng.elegir(def ? VEC_RACIONALES : VECTORES), Q = [x0 + a, y0 + b], r = normaliza(a, b, '');
    return { ux: r.ux, uy: r.uy, enun: { txt: 'Dirección: la que va de P hacia el punto Q.', tex: `Q=\\left(${Q[0]},\\ ${Q[1]}\\right)` },
      pasos: [{ txt: 'La dirección va de P a Q, o sea la del vector v = Q − P:', tex: `\\vec v=Q-P=\\left(${Q[0]}-${fp(x0)},\\ ${Q[1]}-${fp(y0)}\\right)=\\left(${a},\\ ${b}\\right)` }, ...r.pasos] };
  }
  const cu = rng.ent(1, 4), [a, b] = BISECTRIZ[cu], r = normaliza(a, b, `La bisectriz del ${cu}º cuadrante forma ${[45, 135, 225, 315][cu - 1]}° con el semieje positivo de las x y tiene la dirección de v = (${a}, ${b}). `);
  return { ux: r.ux, uy: r.uy, enun: { txt: `Dirección: la de la bisectriz del ${cu}º cuadrante.`, tex: `\\vec v=\\left(${a},\\ ${b}\\right)` }, pasos: r.pasos };
}

// Pasos de la derivada direccional por definición: lím_{t→0⁺} [f(P+tu) − f(P)] / t. Solo con u racional.
function porDefinicion(F, u, [x0, y0]) {
  const [ux, uy] = u;
  const cab = { txt: `Por definición, la derivada direccional es un límite con t → 0⁺. El punto P + t·u es (${x0} ${ux.n < 0 ? '−' : '+'} ${texTxt(fr(Math.abs(ux.n), ux.d))}·t, ${y0} ${uy.n < 0 ? '−' : '+'} ${texTxt(fr(Math.abs(uy.n), uy.d))}·t):`,
    tex: `\\frac{\\partial f}{\\partial\\vec u}(P)=\\lim_{t\\to 0^{+}}\\frac{f(P+t\\vec u)-f(P)}{t}` };
  if (F.lxy) {
    const a1 = fMul(ux, fr(1, x0)), a2 = fMul(uy, fr(1, y0)), un = (al) => suma([[1, ''], [al, 't']]);
    return { lim: fVal(fSum(a1, fNeg(a2))), pasos: [cab,
      { txt: 'Armo la diferencia y separo el logaritmo del cociente en una resta; saco x₀ e y₀ de adentro de cada logaritmo:', tex: lineas([
        `f(P+t\\vec u)-f(P)&=\\ln\\frac{${suma([[x0, ''], [ux, 't']])}}{${suma([[y0, ''], [uy, 't']])}}-\\ln\\frac{${x0}}{${y0}}`,
        `&=\\ln\\left(${suma([[x0, ''], [ux, 't']])}\\right)-\\ln ${x0}-\\ln\\left(${suma([[y0, ''], [uy, 't']])}\\right)+\\ln ${y0}`,
        `&=\\ln\\left(${un(a1)}\\right)-\\ln\\left(${un(a2)}\\right)`]) },
      { txt: 'Divido por t y uso el límite notable ln(1 + αt)/t → α cuando t → 0:', tex: lineas([
        `\\frac{\\partial f}{\\partial\\vec u}(P)&=\\lim_{t\\to 0^{+}}\\left[\\frac{\\ln\\left(${un(a1)}\\right)}{t}-\\frac{\\ln\\left(${un(a2)}\\right)}{t}\\right]`,
        `&=${texF(a1)}-${fp(a2)}`, `&=${texF(fSum(a1, fNeg(a2)))}`]) }] };
  }
  const gt = p2Comp(F.p2, [fr(x0), ux], [fr(y0), uy]), c1 = gt[1] ?? fr(0), resto = gt.slice(1);
  return { lim: fVal(c1), pasos: [cab,
    { txt: 'Reemplazo x e y por las coordenadas de P + t·u en f, desarrollo y junto los términos en t:', tex: lineas([`f(P+t\\vec u)&=f\\left(${suma([[x0, ''], [ux, 't']])},\\ ${suma([[y0, ''], [uy, 't']])}\\right)`, `&=${uTex(gt, 't')}`, `f(P)&=${texF(gt[0])}`]) },
    { txt: 'Resto f(P) (se va el término independiente) y divido por t (cada término que queda tiene un factor t):', tex: lineas([`f(P+t\\vec u)-f(P)&=${uTex([fr(0), ...resto], 't')}`, `\\frac{f(P+t\\vec u)-f(P)}{t}&=${uTex(resto, 't')}`]) },
    { txt: 'Paso al límite con t → 0⁺: los términos que todavía tienen t se anulan y queda el coeficiente de t:', tex: `\\frac{\\partial f}{\\partial\\vec u}(P)=\\lim_{t\\to 0^{+}}\\left(${uTex(resto, 't')}\\right)=${texF(c1)}` }] };
}
const texTxt = (f) => (f.d === 1 ? `${f.n}` : `${f.n}/${f.d}`);

function direccional(rng) {
  const def = rng() < 0.2;
  const F = funcion(rng, def), [x0, y0] = F.P;
  const [gx, gy] = F.g;
  const D = direccion(rng, def, F.P);
  const { ux, uy } = D;
  const defn = def ? porDefinicion(F, [ux[0] ? ux[0][1] : fr(0), uy[0] ? uy[0][1] : fr(0)], F.P) : null;
  // D_u f = gx ux + gy uy
  const dTerms = radTerms([...radMul(ux, gx), ...radMul(uy, gy)]);
  const Duf = radVal(dTerms);
  const uxN = radVal(ux), uyN = radVal(uy);
  const tU = (r) => { const t = radTex(r); return fac(radVal(r) < 0, t); };
  const prods = unirT(radTex(radMul(ux, gx)), radTex(radMul(uy, gy)));
  const dU = '\\frac{\\partial f}{\\partial\\vec u}';
  const lnU = lineas([
    `${dU}(P)&=\\nabla f(P)\\cdot\\vec u`,
    `&=${fp(gx)}\\cdot ${tU(ux)}+${fp(gy)}\\cdot ${tU(uy)}`,
    `&=${prods}`,
    ...(radTex(dTerms) !== prods ? [`&=${radTex(dTerms)}`] : []),
  ]);
  // máximo crecimiento
  const q = fSum(fMul(gx, gx), fMul(gy, gy)); // gx²+gy²
  const [kN, sN] = raiz(q.n * q.d); // √(n/d) = √(n d)/d
  const mod = radTerms([[sN, fr(kN, q.d)]]);
  const modN = radVal(mod);
  const vers = (cx, cy) => [radTerms([[sN, fMul(cx, fr(q.d, kN * sN))]]), radTerms([[sN, fMul(cy, fr(q.d, kN * sN))]])];
  const dirMax = vers(gx, gy), dirNul = vers(fNeg(gy), gx);
  const zeroX = gx.n === 0, zeroY = gy.n === 0;
  let th, quadro;
  if (zeroX) { th = gy.n > 0 ? 90 : 270; quadro = `sobre el semieje ${gy.n > 0 ? 'positivo de las y' : 'negativo de las y'}`; }
  else if (zeroY) { th = gx.n > 0 ? 0 : 180; quadro = `sobre el semieje ${gx.n > 0 ? 'positivo de las x' : 'negativo de las x'}`; }
  else { const t0 = (Math.atan2(gy.n * gx.d, gx.n * gy.d) * 180) / Math.PI; th = mod360(t0); quadro = `en el ${cuad(gx.n, gy.n)} cuadrante`; }
  const rz = zeroX || zeroY ? null : fMul(gy, fr(gx.d, gx.n));
  const t0n = rz ? (Math.atan(fVal(rz)) * 180) / Math.PI : 0;
  const corr = !rz ? 0 : gx.n < 0 ? 180 : gy.n < 0 ? 360 : 0;
  const cuadLineas = !rz
    ? [`\\theta_{\\max}&${dg(th)}`]
    : [`\\theta_{0}&=\\operatorname{arctg}\\left(\\frac{f'_y(P)}{f'_x(P)}\\right)`, `&=\\operatorname{arctg}\\left(${texF(rz)}\\right)`, `&${dg(t0n)}`, ...(corr ? [`\\theta_{\\max}&=\\theta_{0}+${corr}^{\\circ}${dg(th)}`] : [`\\theta_{\\max}&=\\theta_{0}${dg(th)}`])];
  const cuadTxt = !rz
    ? `El gradiente está ${quadro}; el ángulo es directo.`
    : `Como f'_x(P) ${gx.n > 0 ? '>' : '<'} 0 y f'_y(P) ${gy.n > 0 ? '>' : '<'} 0, el gradiente apunta ${quadro}. La arctg solo devuelve ángulos entre −90° y 90° (1º y 4º cuadrante)${corr === 180 ? ', por eso al estar en el 2º o 3º cuadrante hay que sumar 180°' : corr === 360 ? ', por eso un ángulo negativo en el 4º cuadrante se expresa sumando 360°' : ', y acá coincide con el cuadrante buscado'}.`;
  const thMin = mod360(th + 180), thN1 = mod360(th + 90), thN2 = mod360(th + 270);
  const grad = (t) => `\\nabla f(P)=\\left(${t[0]},\\ ${t[1]}\\right)`;
  const modLineas = [
    `\\left\\|\\nabla f(P)\\right\\|&=\\sqrt{\\left(${num(gx)}\\right)^{2}+\\left(${num(gy)}\\right)^{2}}`,
    `&=\\sqrt{${texF(fMul(gx, gx))}+${texF(fMul(gy, gy))}}`,
    `&=\\sqrt{${texF(q)}}`,
    ...(radTex(mod) !== `\\sqrt{${texF(q)}}` ? [`&=${radTex(mod)}`] : []),
  ];
  const neg = (r) => radTex(radMul(r, -1));
  const parVers = (v) => `\\left(${radTex(v[0])},\\ ${radTex(v[1])}\\right)`;
  const pasos = [
    { txt: 'Calculo las derivadas parciales de f (f es de clase C¹ en un entorno de P, por lo tanto es diferenciable y el gradiente sirve para todo lo que sigue):', tex: lineas([...(F.simp ? [`f(x,y)&=${F.ftex}`, `&=${F.simp}`] : []), `f'_x(x,y)&=${F.gen[0]}`, `f'_y(x,y)&=${F.gen[1]}`]) },
    { txt: `${F.simpTxt ? `${F.simpTxt} ` : ''}Evalúo las derivadas en P=(${x0},${y0})${F.nota ? ` (recordar que ${F.nota})` : ''}:`, tex: lineas([`f'_x(P)&=${F.sub[0]}`, `&=${num(gx)}`, `f'_y(P)&=${F.sub[1]}`, `&=${num(gy)}`]) },
    { txt: 'El gradiente en P junta las dos derivadas parciales:', tex: grad([num(gx), num(gy)]) },
    ...D.pasos,
    ...(def ? [...defn.pasos,
      { txt: 'Control con las parciales: como f es diferenciable en P, el mismo valor sale como producto escalar del gradiente con el versor u:', tex: lnU }] : [
      { txt: 'Como f es diferenciable en P, la derivada direccional es el producto escalar del gradiente con el versor u:', tex: lnU }]),
    { txt: 'Dirección de máximo crecimiento: ∂f/∂u(P) = ‖∇f(P)‖ cos φ, donde φ es el ángulo entre u y ∇f(P); es máxima (cos φ = 1) cuando u tiene la dirección y sentido del gradiente, y ese máximo vale ‖∇f(P)‖. Calculo el módulo del gradiente:', tex: lineas(modLineas) },
    { txt: 'El versor de máximo crecimiento es el gradiente dividido por su módulo:', tex: lineas([`\\vec u_{\\max}&=\\frac{\\nabla f(P)}{\\left\\|\\nabla f(P)\\right\\|}`, `&=${parVers(dirMax)}`]) },
    { txt: `Para dar el sentido hay que ver el cuadrante. ${cuadTxt}`, tex: lineas(cuadLineas) },
    { txt: 'Mínimo crecimiento: es el sentido opuesto (cos φ = −1), con valor −‖∇f(P)‖, y el ángulo se corre 180°:', tex: lineas([`\\vec u_{\\min}&=-\\vec u_{\\max}=\\left(${neg(dirMax[0])},\\ ${neg(dirMax[1])}\\right)`, `\\frac{\\partial f}{\\partial\\vec u_{\\min}}(P)&=-\\left\\|\\nabla f(P)\\right\\|=-${radTex(mod)}`, `\\theta_{\\min}&=\\theta_{\\max}+180^{\\circ}${dg(thMin)}`]) },
    { txt: 'Derivada nula: ∇f(P)·u = 0 cuando u es perpendicular al gradiente (cos φ = 0). Hay dos direcciones, θmax ± 90°; el versor es (−f\'_y, f\'_x)/‖∇f‖ y su opuesto. (El gráfico, con ∇f(P) saliendo de P y estas cuatro direcciones, se hace aparte.)', tex: lineas([`\\vec u_{0}&=\\frac{\\left(-f'_y(P),\\ f'_x(P)\\right)}{\\left\\|\\nabla f(P)\\right\\|}=${parVers(dirNul)}`, `\\vec u_{0}'&=-\\vec u_{0}=\\left(${neg(dirNul[0])},\\ ${neg(dirNul[1])}\\right)`, `\\theta_{0}'&=\\theta_{\\max}+90^{\\circ}${dg(thN1)}`, `\\theta_{0}''&=\\theta_{\\max}-90^{\\circ}${dg(thN2)}`]) },
  ];
  return {
    enunciado: [{ txt: `Sea f(x,y) como se indica y el punto P=(${x0},${y0}). Calcular la derivada direccional de f en P según la dirección dada${def ? ', POR DEFINICIÓN (con el límite)' : ''}, y hallar la dirección (con su ángulo) y el módulo del máximo crecimiento, el ángulo de mínimo crecimiento y los ángulos de derivada nula.`, tex: `f(x,y)=${F.ftex}` }, D.enun],
    pasos,
    resultado: { txt: 'Derivada direccional, gradiente, máximo y mínimo crecimiento y direcciones de derivada nula:', tex: lineas([`${dU}(P)&=${radTex(dTerms)}\\approx ${aprox(Duf, 4)}`, grad([num(gx), num(gy)]).replace('=', '&='), `\\text{máx.: }\\vec u_{\\max}&=${parVers(dirMax)},\\ \\theta_{\\max}${dg(th)},\\ \\left\\|\\nabla f\\right\\|=${radTex(mod)}\\approx ${aprox(modN, 4)}`, `\\text{mín.: }\\theta_{\\min}&${dg(thMin)},\\ ${dU}=-${radTex(mod)}`, `\\text{nula: }\\theta&${dg(thN1)}\\ \\text{y}\\ \\theta${dg(thN2)}`]) },
    verif: { f: F.fn, P: [x0, y0], grad: [fVal(gx), fVal(gy)], u: [uxN, uyN], duf: Duf, mod: modN, theta: (th * Math.PI) / 180, thetaMin: (thMin * Math.PI) / 180, limite: defn?.lim, nulas: [(thN1 * Math.PI) / 180, (thN2 * Math.PI) / 180], def },
  };
}

export const GENERADORES_P1_DIRECCIONAL = [{ id: 'direccional', nombre: 'Gradiente y derivada direccional', grupo: 'Cálculo', instancia: 'p1', generar: direccional }];
