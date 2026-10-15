// Teorema de Green: circulación de un campo polinómico sobre la frontera (antihoraria) de un rectángulo o de la
// región entre y = x² e y = kx. Modo "teorema" (solo Green) o "definición" (integral de línea tramo a tramo y
// verificación con Green). Lógica pura.
import { fr, fVal, texF, fNeg, fSum, suma, p2, p2Tex, p2Dx, p2Dy, p2IntY, p2Sub, p2Eval, p2SubsY, p2Comp, uAdd, uMul, uNeg, uInt, uDer, uEval, uTex, parN } from './mate.js';

// Primitiva con x reemplazada por un número, sin calcular todavía.
const raw = (u, a) => suma(u.map((c, k) => [c, k === 0 ? '' : k === 1 ? parN(a) : `${parN(a)}^{${k}}`]));
const aligned = (filas) => `\\begin{aligned}${filas.join('\\\\')}\\end{aligned}`;

function green(rng) {
  const curvo = rng() < 0.5;
  const defn = rng() < 0.5;
  const pool = [[1, 0], [0, 1], [2, 0], [1, 1], [0, 2], ...(curvo ? [] : [[3, 0], [2, 1], [1, 2], [0, 3]])];
  const campo = () => p2(Array.from({ length: rng.ent(1, 3) }, () => [rng.nz(4), ...rng.elegir(pool)]));
  let P, Q, h;
  do { P = campo(); Q = campo(); h = p2Sub(p2Dx(Q), p2Dy(P)); } while (h.length === 0);

  let x0, x1, g1, g2, regTxt, regTex, desc, borde, tramos, pasosRegion;
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
    // parametrización natural de cada lado, recorrido antihorario
    tramos = [
      { nom: `lado inferior (y = ${c}), de izquierda a derecha`, ux: [fr(0), fr(1)], uy: [fr(c)], a: x0, b: x1 },
      { nom: `lado derecho (x = ${x1}), hacia arriba`, ux: [fr(x1)], uy: [fr(0), fr(1)], a: c, b: d },
      { nom: `lado superior (y = ${d}), de derecha a izquierda`, ux: [fr(0), fr(1)], uy: [fr(d)], a: x1, b: x0 },
      { nom: `lado izquierdo (x = ${x0}), hacia abajo`, ux: [fr(x0)], uy: [fr(0), fr(1)], a: d, b: c },
    ];
    desc = 'el rectángulo';
    pasosRegion = [];
  } else {
    const k = rng.ent(1, 3), kk = k === 1 ? '' : k;
    x0 = 0; x1 = k; g1 = [fr(0), fr(0), fr(1)]; g2 = [fr(0), fr(k)];
    regTxt = `la región R limitada por las curvas y = x² e y = ${kk}x`;
    regTex = `0\\le x\\le ${k},\\qquad x^{2}\\le y\\le ${kk}x`;
    borde = [
      { r: (t) => [t, t * t], dr: (t) => [1, 2 * t], t0: 0, t1: k },
      { r: (t) => [k - t, k * (k - t)], dr: () => [-1, -k], t0: 0, t1: k },
    ];
    tramos = [
      { nom: 'parábola y = x², de (0,0) a (' + k + ',' + k * k + ')', ux: [fr(0), fr(1)], uy: [fr(0), fr(0), fr(1)], a: 0, b: k },
      { nom: `recta y = ${kk}x, de vuelta de (${k},${k * k}) a (0,0)`, ux: [fr(0), fr(1)], uy: [fr(0), fr(k)], a: k, b: 0 },
    ];
    desc = 'la región';
    const medio = fr(k, 2);
    pasosRegion = [
      { txt: 'Para describir R necesito saber dónde se cortan las curvas. Igualo las dos expresiones de y:', tex: aligned([`x^{2}&=${kk}x`, `x^{2}-${kk}x&=0`, `x\\left(x-${k}\\right)&=0`]) },
      { txt: `Un producto es 0 si algún factor es 0: x = 0 o x = ${k}. Los puntos de corte son (0, 0) y (${k}, ${k * k}) (reemplazo cada x en cualquiera de las dos curvas).`, tex: `x=0\\ \\Rightarrow\\ (0,0),\\qquad x=${k}\\ \\Rightarrow\\ (${k},${k * k})` },
      { txt: `Entre 0 y ${k} tengo que saber cuál curva va arriba. Evalúo las dos en un punto intermedio, x = ${texF(medio)}:`, tex: `x^{2}=${texF(fr(k * k, 4))},\\qquad ${kk}x=${texF(fr(k * k, 2))}\\;\\Rightarrow\\;${texF(fr(k * k, 4))}<${texF(fr(k * k, 2))}` },
      { txt: `Entonces la parábola queda abajo y la recta arriba. Recorrida en sentido antihorario, C va por la parábola de izquierda a derecha y vuelve por la recta (la región queda siempre a la izquierda).`, tex: 'y=x^{2}\\ \\text{(abajo)},\\qquad y=' + kk + 'x\\ \\text{(arriba)}' },
    ];
  }
  const Qx = p2Dx(Q), Py = p2Dy(P);
  const H = p2IntY(h);
  const inner = uAdd(p2SubsY(H, g2), uNeg(p2SubsY(H, g1)));
  const I = uInt(inner);
  const valor = uAdd([uEval(I, x1)], uNeg([uEval(I, x0)]))[0];
  const lim = (u) => uTex(u, 'x');
  const campoTex = `\\vec F(x,y)=\\left(${p2Tex(P)},\\ ${p2Tex(Q)}\\right)`;

  // Por definición: ∫ P dx + Q dy sobre cada tramo
  let pasosDef = [], valoresTramo = [];
  if (defn) {
    tramos.forEach((tr, i) => {
      const dux = uDer(tr.ux), duy = uDer(tr.uy);
      const Pt = p2Comp(P, tr.ux, tr.uy), Qt = p2Comp(Q, tr.ux, tr.uy);
      const pi = uAdd(uMul(Pt, dux), uMul(Qt, duy)), Ip = uInt(pi);
      const Ib = uEval(Ip, tr.b), Ia = uEval(Ip, tr.a);
      const val = fSum(Ib, fNeg(Ia));
      valoresTramo.push(val);
      const n = i + 1;
      pasosDef.push(
        { txt: `Tramo C${n}: ${tr.nom}. Lo parametrizo (t recorre el tramo en el sentido positivo) y calculo los diferenciales:`, tex: `C_${n}:\\ x=${uTex(tr.ux, 't')},\\ y=${uTex(tr.uy, 't')},\\ t:\\ ${tr.a}\\to ${tr.b};\\qquad dx=${uTex(dux, 't')}\\,dt,\\ dy=${uTex(duy, 't')}\\,dt` },
        { txt: `Reemplazo x(t), y(t), dx y dy en P dx + Q dy (acá P y Q ya van evaluados sobre el tramo), y después multiplico y sumo:`, tex: aligned([
          `\\int_{C_${n}}P\\,dx+Q\\,dy&=\\int_{${tr.a}}^{${tr.b}}\\left[\\left(${uTex(Pt, 't')}\\right)\\left(${uTex(dux, 't')}\\right)+\\left(${uTex(Qt, 't')}\\right)\\left(${uTex(duy, 't')}\\right)\\right]dt`,
          `&=\\int_{${tr.a}}^{${tr.b}}\\left(${uTex(pi, 't')}\\right)dt`,
        ]) },
        { txt: 'Busco la primitiva y evalúo en los límites, en líneas separadas (valor en el extremo final menos valor en el inicial):', tex: aligned([
          `&=\\Big[${uTex(Ip, 't')}\\Big]_{${tr.a}}^{${tr.b}}`,
          `&=\\left(${texF(Ib)}\\right)-\\left(${texF(Ia)}\\right)`,
          `&=${texF(val)}`,
        ]) },
      );
    });
    pasosDef.push({ txt: 'La circulación por definición es la suma de las integrales de línea de los tramos:', tex: aligned([`\\oint_C\\vec F\\cdot d\\vec r&=${valoresTramo.map((v, i) => `\\int_{C_${i + 1}}`).join('+')}`, `&=${suma(valoresTramo.map((v) => [v, '']))}`, `&=${texF(valoresTramo.reduce((s, v) => fSum(s, v), fr(0)))}`]) });
  }
  const pasosGreen = [
    { txt: `${defn ? 'Ahora lo verifico con Green. ' : ''}Hipótesis: F = (P, Q) es de clase C¹ en todo el plano, C es cerrada, simple y está orientada en sentido antihorario (positivo). Entonces vale Green:`, tex: '\\oint_C P\\,dx+Q\\,dy=\\iint_R\\left(\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}\\right)dA' },
    { txt: 'Calculo las derivadas parciales y las resto:', tex: `\\frac{\\partial Q}{\\partial x}=${p2Tex(Qx)},\\qquad\\frac{\\partial P}{\\partial y}=${p2Tex(Py)}` },
    { txt: 'Resto (Q_x − P_y):', tex: `\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}=${p2Tex(h)}` },
    ...pasosRegion,
    { txt: `Describo ${desc} como región de tipo I (x entre dos constantes, y entre dos funciones de x):`, tex: regTex },
    { txt: 'Integro primero en y (x es constante). Primitiva y evaluación en líneas separadas:', tex: aligned([
      `\\int_{${lim(g1)}}^{${lim(g2)}}\\left(${p2Tex(h)}\\right)dy&=\\Big[${p2Tex(H)}\\Big]_{y=${lim(g1)}}^{y=${lim(g2)}}`,
      `&=\\left(${uTex(p2SubsY(H, g2), 'x')}\\right)-\\left(${uTex(p2SubsY(H, g1), 'x')}\\right)`,
      `&=${lim(inner)}`,
    ]) },
    { txt: 'Integro en x. Primitiva y evaluación en líneas separadas:', tex: aligned([
      `\\int_{${x0}}^{${x1}}\\left(${lim(inner)}\\right)dx&=\\Big[${lim(I)}\\Big]_{${x0}}^{${x1}}`,
      `&=\\left(${raw(I, x1)}\\right)-\\left(${raw(I, x0)}\\right)`,
      `&=\\left(${texF(uEval(I, x1))}\\right)-\\left(${texF(uEval(I, x0))}\\right)`,
      `&=${texF(valor)}`,
    ]) },
  ];
  return {
    enunciado: [
      { txt: defn
        ? `Calcular la circulación del campo F a lo largo de la frontera C de ${regTxt}, recorrida en sentido antihorario (positivo), de dos maneras: (a) por definición, parametrizando cada tramo; (b) con el teorema de Green. Graficar la región.`
        : `Calcular la circulación del campo F a lo largo de la frontera C de ${regTxt}, recorrida en sentido antihorario (positivo). Usar el teorema de Green. Graficar la región.`, tex: `${campoTex},\\qquad \\oint_C \\vec F\\cdot d\\vec r` },
    ],
    pasos: [...pasosDef, ...pasosGreen],
    resultado: { tex: `\\oint_C \\vec F\\cdot d\\vec r=${texF(valor)}` },
    verif: {
      P: (x, y) => p2Eval(P, x, y), Q: (x, y) => p2Eval(Q, x, y), borde, region: { x0, x1, y1: (x) => uEvalN(g1, x), y2: (x) => uEvalN(g2, x) }, valor: fVal(valor),
      defn, tramos: valoresTramo.map(fVal),
    },
  };
}
const uEvalN = (u, x) => u.reduce((s, c, k) => s + fVal(c) * x ** k, 0);

export const GENERADORES_GREEN = [{ id: 'green', nombre: 'Teorema de Green (circulación)', grupo: 'Integrales', generar: green }];
