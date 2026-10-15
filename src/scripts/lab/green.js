// Teorema de Green: circulación de un campo polinómico sobre la frontera (antihoraria) de un rectángulo o de la
// región entre y = x² e y = kx. Lógica pura.
import { fr, fVal, texF, fNeg, p2, p2Tex, p2Dx, p2Dy, p2IntY, p2Sub, p2Eval, p2SubsY, uAdd, uNeg, uInt, uEval, uTex } from './mate.js';

function green(rng) {
  const curvo = rng() < 0.5;
  const pool = [[1, 0], [0, 1], [2, 0], [1, 1], [0, 2], ...(curvo ? [] : [[3, 0], [2, 1], [1, 2], [0, 3]])];
  const campo = () => p2(Array.from({ length: rng.ent(1, 3) }, () => [rng.nz(4), ...rng.elegir(pool)]));
  let P, Q, h;
  do { P = campo(); Q = campo(); h = p2Sub(p2Dx(Q), p2Dy(P)); } while (h.length === 0);

  let x0, x1, g1, g2, regTxt, regTex, desc, borde;
  if (!curvo) {
    x0 = rng.ent(-2, 1); x1 = x0 + rng.ent(1, 3);
    const c = rng.ent(-2, 1), d = c + rng.ent(1, 3);
    g1 = [fr(c)]; g2 = [fr(d)];
    regTxt = `el rectángulo R de vértices (${x0},${c}), (${x1},${c}), (${x1},${d}) y (${x0},${d})`;
    regTex = `${x0}\\le x\\le ${x1},\\qquad ${c}\\le y\\le ${d}`;
    const w = x1 - x0, hh = d - c;
    borde = [
      { r: (t) => [x0 + w * t, c], dr: () => [w, 0], t0: 0, t1: 1 },
      { r: (t) => [x1, c + hh * t], dr: () => [0, hh], t0: 0, t1: 1 },
      { r: (t) => [x1 - w * t, d], dr: () => [-w, 0], t0: 0, t1: 1 },
      { r: (t) => [x0, d - hh * t], dr: () => [0, -hh], t0: 0, t1: 1 },
    ];
    desc = 'rectángulo';
  } else {
    const k = rng.ent(1, 3);
    x0 = 0; x1 = k; g1 = [fr(0), fr(0), fr(1)]; g2 = [fr(0), fr(k)];
    regTxt = `la región R limitada por las curvas y = x² e y = ${k === 1 ? '' : k}x`;
    regTex = `0\\le x\\le ${k},\\qquad x^{2}\\le y\\le ${k === 1 ? '' : k}x`;
    borde = [
      { r: (t) => [t, t * t], dr: (t) => [1, 2 * t], t0: 0, t1: k },
      { r: (t) => [k - t, k * (k - t)], dr: () => [-1, -k], t0: 0, t1: k },
    ];
    desc = 'región';
  }
  const Qx = p2Dx(Q), Py = p2Dy(P);
  const H = p2IntY(h);
  const inner = uAdd(p2SubsY(H, g2), uNeg(p2SubsY(H, g1)));
  const I = uInt(inner);
  const valor = uAdd([uEval(I, x1)], uNeg([uEval(I, x0)]))[0];
  const lim = (u) => uTex(u, 'x');
  const campoTex = `\\vec F(x,y)=\\left(${p2Tex(P)},\\ ${p2Tex(Q)}\\right)`;
  return {
    enunciado: [
      { txt: `Calcular la circulación del campo F a lo largo de la frontera C de ${regTxt}, recorrida en sentido antihorario (positivo). Usar el teorema de Green. Graficar la región.`, tex: `${campoTex},\\qquad \\oint_C \\vec F\\cdot d\\vec r` },
    ],
    pasos: [
      { txt: 'Hipótesis: F = (P, Q) es de clase C¹ en todo el plano, C es cerrada, simple y está orientada en sentido antihorario (positivo). Vale Green:', tex: '\\oint_C P\\,dx+Q\\,dy=\\iint_R\\left(\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}\\right)dA' },
      { txt: 'Calculo las derivadas parciales:', tex: `\\frac{\\partial Q}{\\partial x}=${p2Tex(Qx)},\\qquad\\frac{\\partial P}{\\partial y}=${p2Tex(Py)}\\;\\Rightarrow\\;\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}=${p2Tex(h)}` },
      { txt: `Describo el ${desc} como región de tipo I:`, tex: regTex },
      { txt: 'Integro primero en y:', tex: `\\int_{${lim(g1)}}^{${lim(g2)}}\\left(${p2Tex(h)}\\right)dy=\\Big[${p2Tex(H)}\\Big]_{${lim(g1)}}^{${lim(g2)}}=${lim(inner)}` },
      { txt: 'Integro en x:', tex: `\\int_{${x0}}^{${x1}}\\left(${lim(inner)}\\right)dx=\\Big[${lim(I)}\\Big]_{${x0}}^{${x1}}=${texF(valor)}` },
    ],
    resultado: { tex: `\\oint_C \\vec F\\cdot d\\vec r=${texF(valor)}` },
    verif: { P: (x, y) => p2Eval(P, x, y), Q: (x, y) => p2Eval(Q, x, y), borde, region: { x0, x1, y1: (x) => uEvalN(g1, x), y2: (x) => uEvalN(g2, x) }, valor: fVal(valor) },
  };
}
const uEvalN = (u, x) => u.reduce((s, c, k) => s + fVal(c) * x ** k, 0);

export const GENERADORES_GREEN = [{ id: 'green', nombre: 'Teorema de Green (circulación)', grupo: 'Integrales', generar: green }];
