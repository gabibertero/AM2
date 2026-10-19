// Diferencial total y propagación de errores: V o S de cilindro, cono o caja con medidas y error porcentual.
// dV = Σ |V_i|·|Δx_i| (error absoluto máximo), error relativo |dV|/V y porcentual. Todo exacto con fracciones. Lógica pura.
import { fr, fSum, fMul, fVal, texF, texPi, suma } from './mate.js';
import { lineas, num, aprox, p3, p3Tex, p3D, p3Fr, p3Sub } from './p1-comun.js';

const FIG = {
  cil: { nombre: 'un cilindro', vn: ['r', 'h'], medidas: ['el radio r', 'la altura h'], rango: [[5, 10, 12, 15, 20], [10, 20, 25, 30]], V: [[1, 2, 1, 0]], S: [[2, 2, 0, 0], [2, 1, 1, 0]], pi: true },
  cono: { nombre: 'un cono', vn: ['r', 'h'], medidas: ['el radio r', 'la altura h'], rango: [[5, 10, 12, 15], [10, 15, 20, 30]], V: [[fr(1, 3), 2, 1, 0]], pi: true },
  caja: { nombre: 'una caja (paralelepípedo)', vn: ['a', 'b', 'c'], medidas: ['el largo a', 'el ancho b', 'el alto c'], rango: [[10, 20, 30, 40], [10, 20, 25, 50], [5, 10, 15, 20]], V: [[1, 1, 1, 1]], S: [[2, 1, 1, 0], [2, 0, 1, 1], [2, 1, 0, 1]], pi: false },
};
const dx = (n) => `d${n}`;

function diferencial(rng) {
  const id = rng.elegir(['cil', 'cil', 'cono', 'caja', 'caja']);
  const F = FIG[id];
  const mag = F.S && (id === 'cil' ? rng() < 0.5 : rng() < 0.4) ? 'S' : 'V';
  const p = p3(F[mag].map(([c, i, j, k]) => [c, i, j, k]));
  const nv = F.vn.length, vn = F.vn;
  const m = F.rango.map((r) => rng.elegir(r));
  const igual = rng() < 0.6, e0 = rng.elegir([1, 2, 3, 5]);
  const e = Array.from({ length: nv }, () => (igual ? e0 : rng.elegir([1, 2, 3, 5])));
  const P = [m[0], m[1], nv > 2 ? m[2] : 0];
  const Pf = F.pi;
  const PI = Pf ? '\\pi' : '';
  const pt = (q, v) => suma(q.map(([c, i, j, k]) => [c, `${PI ? `${PI} ` : ''}${p3Tex([[1, i, j, k]], v)}`]));
  const ptSub = (q) => (Pf ? `\\pi\\cdot ${q.length > 1 ? `\\left(${p3Sub(q, P)}\\right)` : p3Sub(q, P)}` : p3Sub(q, P));
  const coef = (f) => (Pf ? texPi(f) : texF(f));
  const D = Array.from({ length: nv }, (_, i) => p3D(p, i));
  const parc = D.map((q) => p3Fr(q, ...P)); // coeficiente de π (o valor)
  const delta = m.slice(0, nv).map((mm, i) => fr(mm * e[i], 100));
  const terms = parc.map((c, i) => fMul(c, delta[i]));
  const total = terms.reduce((s, t) => fSum(s, t), fr(0));
  const V0 = p3Fr(p, ...P);
  const ratio = fMul(total, fr(V0.d, V0.n));
  const unid = `\\text{cm}^{${mag === 'V' ? 3 : 2}}`;
  const ver = P.slice(0, nv);
  const val = (f) => fVal(f) * (Pf ? Math.PI : 1);
  const L = mag; // V o S
  const sufX = vn.map((n) => `${L}_{${n}}`);
  const dTotal = `d${L}&=${vn.map((n, i) => `${sufX[i]}\\,${dx(n)}`).join('+')}`;
  const absEnun = vn.map((n, i) => `\\left|${sufX[i]}\\right|\\left|\\Delta ${n}\\right|`).join('+');
  const medTxt = vn.map((n, i) => `${F.medidas[i]} = ${m[i]} cm`).join(', ');
  const errTxt = igual ? `con un error de a lo sumo ${e0}% en cada medida` : `con errores de a lo sumo ${vn.map((n, i) => `${e[i]}% en ${n}`).join(', ')}`;
  const formula = pt(p, vn);
  const pasos = [
    { txt: `Escribo la fórmula de ${mag === 'V' ? 'el volumen' : 'la superficie total'} en función de las medidas:`, tex: `${L}\\left(${vn.join(',')}\\right)=${formula}` },
    { txt: `Una pequeña variación de las medidas produce una variación de ${L} que se aproxima con la diferencial total (es válida porque ${L} es un polinomio, de clase C¹). El error máximo se obtiene sumando el valor absoluto de cada término, porque los errores de cada medida pueden sumarse todos en el mismo sentido:`, tex: lineas([dTotal, `\\left|d${L}\\right|&\\leq ${absEnun}`]) },
    { txt: 'Derivo respecto de cada medida:', tex: lineas(vn.map((n, i) => `${sufX[i]}&=\\frac{\\partial ${L}}{\\partial ${n}}=${pt(D[i], vn)}`)) },
    { txt: `Evalúo las derivadas en las medidas (${medTxt}):`, tex: lineas(vn.flatMap((n, i) => [`${sufX[i]}&=${ptSub(D[i])}`, `&=${coef(parc[i])}`])) },
    { txt: 'El error de una medida con error porcentual e% es |Δ| = e/100 · medida:', tex: lineas(vn.flatMap((n, i) => [`\\left|\\Delta ${n}\\right|&=\\frac{${e[i]}}{100}\\cdot ${m[i]}`, `&=${num(delta[i])}`])) },
    { txt: `Calculo el error absoluto máximo |d${L}| (cada término con valor absoluto):`, tex: lineas([
      `\\left|d${L}\\right|&\\leq ${vn.map((n, i) => `\\left|${coef(parc[i])}\\right|\\cdot\\left|${num(delta[i])}\\right|`).join('+')}`,
      `&=${terms.map(coef).join('+')}`,
      `&=${coef(total)}\\ ${unid}`,
      `&\\approx ${aprox(val(total), 2)}\\ ${unid}`]) },
    { txt: `Calculo ${mag === 'V' ? 'el volumen' : 'la superficie'} con las medidas, para comparar:`, tex: lineas([`${L}&=${ptSub(p)}`, `&=${coef(V0)}\\ ${unid}`]) },
    { txt: 'El error relativo es el cociente entre el error absoluto y el valor de la magnitud (el π, si aparece, se simplifica); el porcentual es el relativo por 100:', tex: lineas([
      `\\varepsilon_{r}&=\\frac{\\left|d${L}\\right|}{${L}}`,
      `&=\\frac{${coef(total)}}{${coef(V0)}}`,
      `&=${texF(ratio)}`,
      `&\\approx ${aprox(fVal(ratio), 4)}`,
      `\\varepsilon_{\\%}&=\\varepsilon_{r}\\cdot 100\\%`,
      `&\\approx ${aprox(fVal(ratio) * 100, 2)}\\%`]) },
  ];
  return {
    enunciado: [{ txt: `Se mide ${F.nombre}: ${medTxt}, ${errTxt}. Usando la diferencial total, hallar el error absoluto máximo, el error relativo y el error porcentual al calcular ${mag === 'V' ? 'el volumen' : 'la superficie total'} (en ${mag === 'V' ? 'cm³' : 'cm²'}).`, tex: `${L}=${formula}` }],
    pasos,
    resultado: { tex: lineas([`\\left|d${L}\\right|&=${coef(total)}\\ ${unid}\\approx ${aprox(val(total), 2)}\\ ${unid}`, `\\varepsilon_{r}&=${texF(ratio)}\\approx ${aprox(fVal(ratio), 4)}`, `\\varepsilon_{\\%}&\\approx ${aprox(fVal(ratio) * 100, 2)}\\%`]) },
    verif: { f: (v) => val(p3Fr(p, v[0], v[1], v[2] ?? 0)) , vals: m.slice(0, nv), delta: delta.map(fVal), dF: val(total), rel: fVal(ratio), pct: fVal(ratio) * 100, parc: parc.map(val), mag, id },
  };
}

export const GENERADORES_P1_DIFERENCIAL = [{ id: 'diferencial', nombre: 'Diferencial y errores', grupo: 'Cálculo', instancia: 'p1', generar: diferencial }];
