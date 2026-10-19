// Derivada direccional y gradiente: ∇f(P), versor u (por ángulo o por vector), D_u f = ∇f·u, y dirección/módulo de máximo
// crecimiento con el cuadrante correcto. f polinómica, exponencial o logarítmica. Lógica pura.
import { fr, fSum, fMul, fVal, texF, suma, SEN } from './mate.js';
import { lineas, num, fp, fac, aprox, raiz, radTerms, radTex, radVal, radMul, p3, p3Tex, p3D, p3Ev, p3Fr, p3Sub, unirT } from './p1-comun.js';

const ex = (k, v) => (k === 1 ? `e^{${v}}` : k === -1 ? `e^{-${v}}` : `e^{${k}${v}}`);
// Plantillas: f, parciales generales, valores en P (exactos) y la sustitución visible.
function funcion(rng) {
  const tipo = rng.elegir(['poli', 'poli', 'e1', 'e2', 'e3', 'l1', 'l2', 'l3']);
  const n = (v) => fac(v < 0, `${v}`);
  for (;;) {
    if (tipo === 'poli') {
      const pool = [[2, 1], [1, 2], [2, 0], [0, 2], [1, 1], [3, 0], [0, 3], [1, 0], [0, 1]], ms = [];
      while (ms.length < rng.ent(3, 4)) { const m = rng.elegir(pool); if (!ms.some((t) => t.join() === m.join())) ms.push(m); }
      const p = p3(ms.map(([i, j]) => [rng.nz(3), i, j, 0])), P = [rng.nz(2), rng.nz(2), 0];
      const D = [p3D(p, 0), p3D(p, 1)];
      const g = D.map((d) => p3Fr(d, ...P));
      if (!g[0].n && !g[1].n) continue;
      return { ftex: p3Tex(p), fn: (x, y) => p3Ev(p, x, y), P, gen: D.map((d) => p3Tex(d)), sub: D.map((d) => p3Sub(d, P)), g, dom: () => true };
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
    // l3: x ln y, P = (x0, 1)
    const x0 = rng.nz(3);
    return { ftex: 'x\\ln y', fn: (x, y) => x * Math.log(y), P: [x0, 1], gen: ['\\ln y', '\\frac{x}{y}'], sub: ['\\ln 1', `\\frac{${n(x0)}}{1}`], g: [fr(0), fr(x0)], nota: 'ln 1 = 0' };
  }
}

const ANGULOS = [ // [texto de θ, coseno [s, c], seno [s, c]]
  ['\\frac{\\pi}{6}', [3, fr(1, 2)], [1, fr(1, 2)]], ['\\frac{\\pi}{4}', [2, fr(1, 2)], [2, fr(1, 2)]], ['\\frac{\\pi}{3}', [1, fr(1, 2)], [3, fr(1, 2)]],
  ['\\frac{2\\pi}{3}', [1, fr(-1, 2)], [3, fr(1, 2)]], ['\\frac{3\\pi}{4}', [2, fr(-1, 2)], [2, fr(1, 2)]], ['\\frac{5\\pi}{6}', [3, fr(-1, 2)], [1, fr(1, 2)]],
  ['\\frac{5\\pi}{3}', [1, fr(1, 2)], [3, fr(-1, 2)]], ['\\frac{7\\pi}{4}', [2, fr(1, 2)], [2, fr(-1, 2)]], ['\\frac{7\\pi}{6}', [3, fr(-1, 2)], [1, fr(-1, 2)]],
];
const VECTORES = [[3, 4], [-3, 4], [5, -12], [1, 1], [1, -2], [2, 1], [-1, 3], [2, 3], [-2, -2], [4, -3], [-1, -1], [3, -1], [0, 2], [-5, 0]];
const cuad = (gx, gy) => (gx > 0 && gy > 0 ? '1º' : gx < 0 && gy > 0 ? '2º' : gx < 0 && gy < 0 ? '3º' : '4º');

function direccional(rng) {
  const F = funcion(rng), [x0, y0] = F.P;
  const [gx, gy] = F.g;
  // Dirección
  const porAngulo = rng() < 0.5;
  let ux, uy, dirEnun, pasoU, pasoU2;
  const nrm = (v) => fac(v < 0, `${v}`);
  if (porAngulo) {
    const [tt, c, s] = rng.elegir(ANGULOS);
    ux = radTerms([c]); uy = radTerms([s]);
    dirEnun = { txt: 'Dirección: la que forma el ángulo θ con el semieje positivo de las x.', tex: `\\theta=${tt}` };
    pasoU = { txt: 'La dirección está dada por un ángulo θ, así que el versor es u = (cos θ, sen θ) (ya tiene módulo 1, porque cos²θ + sen²θ = 1):',
      tex: lineas([`\\vec u&=\\left(\\cos\\theta,\\ ${SEN}\\theta\\right)`, `&=\\left(\\cos ${tt},\\ ${SEN}${tt}\\right)`, `&=\\left(${radTex(ux)},\\ ${radTex(uy)}\\right)`]) };
  } else {
    const [a, b] = rng.elegir(VECTORES);
    const [k, s] = raiz(a * a + b * b);
    ux = radTerms([[s, fr(a, k * s)]]); uy = radTerms([[s, fr(b, k * s)]]);
    dirEnun = { txt: 'Dirección: la del vector v.', tex: `\\vec v=\\left(${a},\\ ${b}\\right)` };
    const M = radTex([[s, fr(k)]]), crudo = `\\sqrt{${a * a + b * b}}`;
    pasoU = { txt: 'El vector v no tiene módulo 1, así que lo normalizo: u = v / ‖v‖. Primero calculo ‖v‖:',
      tex: lineas([`\\left\\|\\vec v\\right\\|&=\\sqrt{${nrm(a)}^{2}+${nrm(b)}^{2}}`, `&=\\sqrt{${a * a}+${b * b}}`, `&=${crudo}`, ...(M !== crudo ? [`&=${M}`] : [])]) };
    pasoU2 = { txt: 'Divido cada componente de v por su módulo (racionalizo si hace falta):', tex: lineas([`\\vec u&=\\frac{\\vec v}{\\left\\|\\vec v\\right\\|}`, `&=\\left(\\frac{${a}}{${M}},\\ \\frac{${b}}{${M}}\\right)`, `&=\\left(${radTex(ux)},\\ ${radTex(uy)}\\right)`]) };
  }
  // D_u f = gx ux + gy uy
  const dTerms = radTerms([...radMul(ux, gx), ...radMul(uy, gy)]);
  const Duf = radVal(dTerms);
  const uxN = radVal(ux), uyN = radVal(uy);
  const tU = (r) => { const t = radTex(r); return fac(radVal(r) < 0, t); };
  const prods = unirT(radTex(radMul(ux, gx)), radTex(radMul(uy, gy)));
  const lnU = lineas([
    '\\frac{\\partial f}{\\partial\\vec u}(P)&=\\nabla f(P)\\cdot\\vec u',
    `&=${fp(gx)}\\cdot ${tU(ux)}+${fp(gy)}\\cdot ${tU(uy)}`,
    `&=${prods}`,
    ...(radTex(dTerms) !== prods ? [`&=${radTex(dTerms)}`] : []),
  ]);
  // máximo crecimiento
  const q = fSum(fMul(gx, gx), fMul(gy, gy)); // gx²+gy²
  const [kN, sN] = raiz(q.n * q.d); // √(n/d) = √(n d)/d
  const mod = radTerms([[sN, fr(kN, q.d)]]);
  const modN = radVal(mod);
  const dirMax = [radTerms([[sN, fMul(gx, fr(q.d, kN * sN))]]), radTerms([[sN, fMul(gy, fr(q.d, kN * sN))]])];
  const zeroX = gx.n === 0, zeroY = gy.n === 0;
  let th, quadro;
  if (zeroX) { th = gy.n > 0 ? 90 : 270; quadro = `sobre el semieje ${gy.n > 0 ? 'positivo de las y' : 'negativo de las y'}`; }
  else if (zeroY) { th = gx.n > 0 ? 0 : 180; quadro = `sobre el semieje ${gx.n > 0 ? 'positivo de las x' : 'negativo de las x'}`; }
  else { const t0 = (Math.atan2(gy.n * gx.d, gx.n * gy.d) * 180) / Math.PI; th = (t0 + 360) % 360; quadro = `en el ${cuad(gx.n, gy.n)} cuadrante`; }
  const rz = zeroX || zeroY ? null : fMul(gy, fr(gx.d, gx.n)), razon = rz;
  const t0n = razon ? (Math.atan(fVal(rz)) * 180) / Math.PI : 0;
  const corr = !razon ? 0 : gx.n < 0 ? 180 : gy.n < 0 ? 360 : 0;
  const cuadLineas = !razon
    ? [`\\theta&=${th}^{\\circ}`]
    : [`\\theta_{0}&=\\arctan\\left(\\frac{g_y}{g_x}\\right)`, `&=\\arctan\\left(${texF(rz)}\\right)`, `&\\approx ${aprox(t0n)}^{\\circ}`, ...(corr ? [`\\theta&=\\theta_{0}+${corr}^{\\circ}\\approx ${aprox(th)}^{\\circ}`] : [`\\theta&=\\theta_{0}\\approx ${aprox(th)}^{\\circ}`])];
  const cuadTxt = !razon
    ? `El gradiente está ${quadro}; el ángulo es directo.`
    : `Como g_x ${gx.n > 0 ? '>' : '<'} 0 y g_y ${gy.n > 0 ? '>' : '<'} 0, el gradiente apunta ${quadro}. El arctan solo devuelve ángulos entre −90° y 90° (1º y 4º cuadrante)${corr === 180 ? ', por eso al estar en el 2º o 3º cuadrante hay que sumar 180°' : corr === 360 ? ', por eso un ángulo negativo en el 4º cuadrante se expresa sumando 360°' : ', y acá coincide con el cuadrante buscado'}.`;
  const grad = (t) => `\\nabla f(P)=\\left(${t[0]},\\ ${t[1]}\\right)`;
  const modLineas = [
    `\\left\\|\\nabla f(P)\\right\\|&=\\sqrt{\\left(${num(gx)}\\right)^{2}+\\left(${num(gy)}\\right)^{2}}`,
    `&=\\sqrt{${texF(fMul(gx, gx))}+${texF(fMul(gy, gy))}}`,
    `&=\\sqrt{${texF(q)}}`,
    ...(radTex(mod) !== `\\sqrt{${texF(q)}}` ? [`&=${radTex(mod)}`] : []),
  ];
  const pasos = [
    { txt: 'Calculo las derivadas parciales de f (f es de clase C¹ en un entorno de P, por lo tanto es diferenciable y el gradiente sirve para todo lo que sigue):', tex: lineas([`f_x(x,y)&=${F.gen[0]}`, `f_y(x,y)&=${F.gen[1]}`]) },
    { txt: `Evalúo las derivadas en P=(${x0},${y0})${F.nota ? ` (recordar que ${F.nota})` : ''}:`, tex: lineas([`f_x(P)&=${F.sub[0]}`, `&=${num(gx)}`, `f_y(P)&=${F.sub[1]}`, `&=${num(gy)}`]) },
    { txt: 'El gradiente en P junta las dos derivadas parciales:', tex: grad([num(gx), num(gy)]) },
    pasoU,
  ];
  if (pasoU2) pasos.push(pasoU2);
  pasos.push(
    { txt: 'Como f es diferenciable en P, la derivada direccional es el producto escalar del gradiente con el versor u:', tex: lnU },
    { txt: 'Dirección de máximo crecimiento: D_u f(P) = ‖∇f(P)‖ cos φ, donde φ es el ángulo entre u y ∇f(P); es máxima (cos φ = 1) cuando u tiene la dirección y sentido del gradiente, y ese máximo vale ‖∇f(P)‖. Calculo el módulo del gradiente:', tex: lineas(modLineas) },
    { txt: 'El versor de máximo crecimiento es el gradiente dividido por su módulo:', tex: lineas([`\\vec u_{\\max}&=\\frac{\\nabla f(P)}{\\left\\|\\nabla f(P)\\right\\|}`, `&=\\left(${radTex(dirMax[0])},\\ ${radTex(dirMax[1])}\\right)`]) },
    { txt: `Para dar el sentido hay que ver el cuadrante. ${cuadTxt}`, tex: lineas(cuadLineas) },
  );
  return {
    enunciado: [{ txt: `Sea f(x,y) como se indica y el punto P=(${x0},${y0}). Calcular la derivada direccional de f en P según la dirección dada, y hallar la dirección (con su ángulo) y el módulo del máximo crecimiento de f en P.`, tex: `f(x,y)=${F.ftex}` }, dirEnun],
    pasos,
    resultado: { txt: 'Derivada direccional, gradiente y máximo crecimiento:', tex: lineas([`D_{\\vec u}f(P)&=${radTex(dTerms)}\\approx ${aprox(Duf, 4)}`, grad([num(gx), num(gy)]).replace('=', '&='), `\\text{máx. crecimiento: }\\vec u_{\\max}&=\\left(${radTex(dirMax[0])},\\ ${radTex(dirMax[1])}\\right),\\ \\theta\\approx ${aprox(th)}^{\\circ},\\ \\left\\|\\nabla f\\right\\|=${radTex(mod)}\\approx ${aprox(modN, 4)}`]) },
    verif: { f: F.fn, P: [x0, y0], grad: [fVal(gx), fVal(gy)], u: [uxN, uyN], duf: Duf, mod: modN, theta: (th * Math.PI) / 180 },
  };
}

export const GENERADORES_P1_DIRECCIONAL = [{ id: 'direccional', nombre: 'Gradiente y derivada direccional', grupo: 'Cálculo', instancia: 'p1', generar: direccional }];
