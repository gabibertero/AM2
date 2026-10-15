// EDO de 2.º orden a coeficientes constantes: homogénea (raíces distintas, iguales, complejas) y no homogénea por
// coeficientes indeterminados (con y sin resonancia, y con f = f₁ + f₂ por superposición). Se elige y_p primero y se
// calcula f = L[y_p]: todo entero. Coeficientes de y_p con A, B, D (no C, para no chocar con C₁, C₂).
import { suma, ex, SEN, unir, parN, prod } from './mate.js';

const ec2 = (b, c) => suma([[1, "y''"], [b, "y'"], [c, 'y']]);
const ang = (w) => (w === 1 ? 'x' : `${w}x`);
const cos = (w) => `\\cos ${ang(w)}`;
const sen = (w) => `${SEN} ${ang(w)}`;
const cases = (filas) => `\\begin{cases}${filas.map(([l, r]) => `${l}=${r}`).join('\\\\')}\\end{cases}`;
const aligned = (filas) => `\\begin{aligned}${filas.join('\\\\')}\\end{aligned}`;
const xj = (j) => (j === 0 ? '' : j === 1 ? 'x' : `x^{${j}}`);

// spec: {tipo:'distintas', r1, r2} | {tipo:'iguales', r} | {tipo:'complejas', al, be}
export function homogenea(spec) {
  const { tipo } = spec;
  let b, c, yhTex, yh, raices, paso5, paso6;
  if (tipo === 'distintas') {
    const { r1, r2 } = spec;
    b = -(r1 + r2); c = r1 * r2;
    yhTex = suma([[1, 'C_1' + ex(r1)], [1, 'C_2' + ex(r2)]]);
    yh = (x, c1, c2) => c1 * Math.exp(r1 * x) + c2 * Math.exp(r2 * x);
    raices = [r1, r2];
  } else if (tipo === 'iguales') {
    const { r } = spec;
    b = -2 * r; c = r * r;
    yhTex = r === 0 ? 'C_1+C_2x' : `\\left(C_1+C_2x\\right)${ex(r)}`;
    yh = (x, c1, c2) => (c1 + c2 * x) * Math.exp(r * x);
    raices = [r, r];
  } else {
    const { al, be } = spec;
    b = -2 * al; c = al * al + be * be;
    const par = `C_1${cos(be)}+C_2${sen(be)}`;
    yhTex = al === 0 ? par : `${ex(al)}\\left(${par}\\right)`;
    yh = (x, c1, c2) => Math.exp(al * x) * (c1 * Math.cos(be * x) + c2 * Math.sin(be * x));
    raices = [];
  }
  const disc = b * b - 4 * c, car = suma([[1, 'r^{2}'], [b, 'r'], [c, '']]);
  const sq = Math.sqrt(Math.abs(disc));
  if (tipo === 'distintas') {
    const [r1, r2] = raices;
    paso5 = { txt: 'Δ > 0: la fórmula da dos raíces reales distintas (√Δ es un número real). Calculo la raíz y las dos raíces (con el − queda la menor):', tex: aligned([
      `\\sqrt{\\Delta}&=\\sqrt{${disc}}=${sq}`,
      `r_1&=\\frac{${-b}-${sq}}{2}=\\frac{${-b - sq}}{2}=${r1}`,
      `r_2&=\\frac{${-b}+${sq}}{2}=\\frac{${-b + sq}}{2}=${r2}`,
    ]) };
    paso6 = { txt: 'Cada raíz da una solución e^{rx}; son independientes, así que la solución general es su combinación lineal:', tex: `y_h=${yhTex}` };
  } else if (tipo === 'iguales') {
    const r = raices[0];
    paso5 = { txt: 'Δ = 0: la fórmula da una sola raíz real, doble (el ± suma 0).', tex: aligned([`\\sqrt{\\Delta}&=0`, `r&=\\frac{${-b}\\pm 0}{2}=\\frac{${-b}}{2}=${r}`]) };
    paso6 = { txt: `Con raíz doble r = ${r}, e^{rx} es una solución, pero falta una segunda independiente: es x·e^{rx} (sale por reducción de orden). La general es su combinación lineal:`, tex: `y_h=${yhTex}` };
  } else {
    const { al, be } = spec;
    paso5 = { txt: 'Δ < 0: bajo la raíz hay un número negativo y aparece la unidad imaginaria, √(−Δ) = 2βi con √(−1) = i. La fórmula da dos raíces complejas conjugadas α ± βi:', tex: aligned([
      `\\sqrt{\\Delta}&=\\sqrt{${disc}}=\\sqrt{${-disc}}\\,\\sqrt{-1}=${2 * be}i`,
      `r&=\\frac{${-b}\\pm ${2 * be}i}{2}=\\frac{${-b}}{2}\\pm\\frac{${2 * be}}{2}i`,
      `r&=${al}\\pm ${be === 1 ? '' : be}i`,
    ]) };
    paso6 = { txt: 'Por la fórmula de Euler, e^{(α+βi)x} = e^{αx}(cos βx + i sen βx): la parte real y la imaginaria son dos soluciones reales independientes, e^{αx}cos βx y e^{αx}sen βx. La general es su combinación lineal:', tex: `y_h=${yhTex}` };
  }
  const pasos = [
    { txt: 'Busco soluciones de la forma y = e^{rx}, porque al derivar se repiten (y′ = r·e^{rx}, y″ = r²·e^{rx}). Reemplazo en la ecuación:', tex: `${suma([[1, 'r^{2}e^{rx}'], [b, 're^{rx}'], [c, 'e^{rx}']])}=0` },
    { txt: 'Saco factor común e^{rx}, que nunca vale 0: tiene que anularse el otro factor (ecuación característica):', tex: `e^{rx}\\left(${car}\\right)=0\\;\\Rightarrow\\;${car}=0` },
    { txt: 'Resuelvo con la fórmula resolvente. Para r² + br + c = 0 las raíces son r = (−b ± √Δ)/2, con Δ = b² − 4c. Calculo Δ:', tex: aligned([`\\Delta&=b^{2}-4c`, `\\Delta&=${parN(b)}^{2}-4\\cdot ${parN(c)}`, `\\Delta&=${b * b}-${parN(4 * c)}`, `\\Delta&=${disc}`]) },
    { txt: `El signo de Δ decide el caso: Δ > 0 dos raíces reales distintas; Δ = 0 una raíz real doble; Δ < 0 dos raíces complejas conjugadas. Acá Δ = ${disc}: ${disc > 0 ? 'positivo, dos raíces reales distintas' : disc === 0 ? 'cero, raíz real doble' : 'negativo, raíces complejas conjugadas'}.`, tex: `\\Delta=${disc}\\;${disc > 0 ? '>' : disc === 0 ? '=' : '<'}\\;0` },
    paso5, paso6,
  ];
  return { tipo, b, c, yhTex, yh, pasos, raices };
}

const specAzar = (rng, tipo = rng.elegir(['distintas', 'iguales', 'complejas'])) => {
  if (tipo === 'distintas') { const r1 = rng.ent(-4, 3); return { tipo, r1, r2: r1 + rng.ent(1, Math.min(4, 4 - r1)) }; }
  if (tipo === 'iguales') return { tipo, r: rng.nz(3) };
  return { tipo, al: rng.ent(-2, 2), be: rng.ent(1, 3) };
};

function homogenea2(rng) {
  const h = homogenea(specAzar(rng));
  return {
    enunciado: [{ txt: 'Hallar la solución general de la ecuación diferencial:', tex: `${ec2(h.b, h.c)}=0` }],
    pasos: h.pasos, resultado: { tex: `y=${h.yhTex}` },
    verif: { orden: 2, dom: [-1, 1], consts: [[1, 1], [2, -1], [-1, 3]], y: h.yh, ec: (x, y, y1, y2) => y2 + h.b * y1 + h.c * y, tipo: h.tipo },
  };
}

// ---- Partes de f (cada una con su y_p). h: homogénea ya elegida; la resonancia se deduce de h (multiplicidad). ----
const mult = (h, m) => h.raices.filter((r) => r === m).length;

// Resuelve el sistema triangular A, B, D (de x² hacia 1), una incógnita por paso, sin esconder operaciones.
function resolverTriangular(coef, p, V, nom) {
  const pasos = [], orden = [['A', 2], ['B', 1], ['D', 0]], resueltas = [];
  for (const [v, i] of orden) {
    const conocidas = resueltas.filter((u) => coef(u, i) !== 0);
    const lhs = `${coef(v, i)}\\,${nom(v)}`;
    const filas = [];
    if (conocidas.length) {
      const resto = conocidas.reduce((s, u) => s + coef(u, i) * V[u], 0);
      filas.push(`${lhs}+${conocidas.map((u) => prod(coef(u, i), V[u])).join('+')}&=${p[i]}`);
      filas.push(`${lhs}&=${p[i]}-${parN(resto)}`);
      filas.push(`${lhs}&=${p[i] - resto}`);
    } else filas.push(`${lhs}&=${p[i]}`);
    filas.push(`${nom(v)}&=\\frac{${p[i] - conocidas.reduce((s, u) => s + coef(u, i) * V[u], 0)}}{${coef(v, i)}}=${V[v]}`);
    pasos.push({ txt: i === 2 ? `De la ecuación de x² despejo ${nom(v)} (es la única que la tiene):` : `Reemplazo lo que ya tengo en la ecuación ${i === 1 ? 'de x' : 'de los términos independientes'} y despejo ${nom(v)}:`, tex: aligned(filas) });
    resueltas.push(v);
  }
  return pasos;
}

function partePoli(h, rng, suf) {
  const { b, c } = h, s = mult(h, 0);
  const A = rng.nz(3), B = rng.ent(-3, 3), D = rng.ent(-3, 3), V = { A, B, D };
  const nom = (v) => v + suf, yp = suf ? `y_{p${suf}}` : 'y_p';
  const pot = { D: s, B: s + 1, A: s + 2 };
  const coef = (v, i) => { const j = pot[v]; return (i === j - 2 ? j * (j - 1) : 0) + (i === j - 1 ? b * j : 0) + (i === j ? c : 0); };
  const p = [0, 1, 2].map((i) => ['A', 'B', 'D'].reduce((acc, v) => acc + coef(v, i) * V[v], 0));
  const ypTex = suma([[A, xj(s + 2)], [B, xj(s + 1)], [D, xj(s)]]);
  const forma = ['f(x) es un polinomio de grado 2 y 0 no es raíz de la característica (c ≠ 0): no hay resonancia, s = 0. Propongo un polinomio completo del mismo grado:',
    'f(x) es un polinomio de grado 2, pero r = 0 es raíz simple de la característica (c = 0, b ≠ 0): hay resonancia, multiplico por x^s con s = 1:',
    'f(x) es un polinomio de grado 2, pero r = 0 es raíz doble de la característica (b = c = 0): hay resonancia, multiplico por x^s con s = 2:'][s];
  const completo = `${nom('A')}x^{2}+${nom('B')}x+${nom('D')}`;
  const pasos = [
    { txt: forma, tex: s === 0 ? `${yp}=${completo}` : `${yp}=${xj(s)}\\left(${completo}\\right)=${nom('A')}${xj(s + 2)}+${nom('B')}${xj(s + 1)}+${nom('D')}${xj(s)}` },
    { txt: 'Derivo dos veces (regla de la potencia en cada término):', tex: `${yp}'=${suma([[s + 2, `${nom('A')}${xj(s + 1)}`], [s + 1, `${nom('B')}${xj(s)}`], [s, `${nom('D')}${xj(s - 1)}`]])},\\qquad ${yp}''=${suma([[(s + 2) * (s + 1), `${nom('A')}${xj(s)}`], [(s + 1) * s, `${nom('B')}${xj(s - 1)}`], [s * (s - 1), `${nom('D')}${xj(s - 2)}`]])}` },
    { txt: 'Sustituyo y_p, y_p′ e y_p″ en la ecuación y agrupo por potencias de x:', tex: [2, 1, 0].map((i) => `\\left(${suma([['A', 'B', 'D'].map((v) => [coef(v, i), nom(v)])].flat())}\\right)${xj(i)}`).join('+') + `=${suma([[p[2], 'x^{2}'], [p[1], 'x'], [p[0], '']])}` },
    { txt: 'Dos polinomios son iguales si coinciden los coeficientes de cada potencia: igualo y obtengo un sistema (triangular: arranco por x²).', tex: cases([2, 1, 0].map((i) => [`${xj(i) || '1'}:\\ ${suma(['A', 'B', 'D'].map((v) => [coef(v, i), nom(v)]))}`, p[i]])) },
    ...resolverTriangular(coef, p, V, nom),
    { txt: 'Reemplazo en la forma propuesta:', tex: `${nom('A')}=${A},\\quad ${nom('B')}=${B},\\quad ${nom('D')}=${D}\\;\\Rightarrow\\;${yp}=${ypTex}` },
  ];
  return { cat: 'poli', s, fTex: suma([[p[2], 'x^{2}'], [p[1], 'x'], [p[0], '']]), fn: (x) => p[2] * x * x + p[1] * x + p[0], ypTex, ypFn: (x) => A * x ** (s + 2) + B * x ** (s + 1) + D * x ** s, pasos };
}

function parteExp(h, rng, suf, m) {
  const { b, c } = h, s = mult(h, m), A = rng.nz(3);
  const nm = 'A' + suf, yp = suf ? `y_{p${suf}}` : 'y_p', E = ex(m);
  const k = [A * (m * m + b * m + c), A * (2 * m + b), 2 * A][s];
  const ypTex = [suma([[A, E]]), suma([[A, `x${E}`]]), suma([[A, `x^{2}${E}`]])][s];
  const pasos = [], resto = [];
  if (s === 0) {
    pasos.push(
      { txt: `f(x) es una exponencial e^{${m}x} y ${m} no es raíz de la característica: no hay resonancia, s = 0. Propongo la misma forma:`, tex: `${yp}=${nm}${E}` },
      { txt: 'Derivo (la derivada de e^{mx} es m·e^{mx}):', tex: `${yp}'=${suma([[m, nm]])}${E},\\qquad ${yp}''=${suma([[m * m, nm]])}${E}` },
      { txt: 'Sustituyo en la ecuación:', tex: `${suma([[m * m, `${nm}${E}`], [b * m, `${nm}${E}`], [c, `${nm}${E}`]])}=${suma([[k, E]])}` },
      { txt: 'Saco factor común A·e^{mx} y evalúo el paréntesis, que es el polinomio característico en m:', tex: aligned([`\\left(${suma([[m * m, ''], [b * m, ''], [c, '']])}\\right)${nm}${E}&=${suma([[k, E]])}`, `\\left(${m * m + b * m + c}\\right)${nm}${E}&=${suma([[k, E]])}`]) },
    );
    resto.push({ txt: 'Divido ambos miembros por e^{mx} (nunca es 0) y despejo:', tex: aligned([`${suma([[m * m + b * m + c, nm]])}&=${k}`, `${nm}&=\\frac{${k}}{${m * m + b * m + c}}=${A}`]) });
  } else if (s === 1) {
    pasos.push(
      { txt: `f(x) es e^{${m}x} y ${m} es raíz simple de la característica: hay resonancia, multiplico por x^s con s = 1:`, tex: `${yp}=${nm}x${E}` },
      { txt: 'Derivo con la regla del producto:', tex: `${yp}'=${nm}\\left(${suma([[1, ''], [m, 'x']])}\\right)${E},\\qquad ${yp}''=${nm}\\left(${suma([[2 * m, ''], [m * m, 'x']])}\\right)${E}` },
      { txt: 'Sustituyo en la ecuación y saco factor común A·e^{mx}, agrupando por potencias de x:', tex: `${nm}${E}\\left[x\\left(${suma([[m * m, ''], [b * m, ''], [c, '']])}\\right)+\\left(${suma([[2 * m, ''], [b, '']])}\\right)\\right]=${suma([[k, E]])}` },
      { txt: `El paréntesis que multiplica a x es el polinomio característico evaluado en la raíz ${m}: vale 0 (por eso se cancela el término con x). Queda:`, tex: aligned([`x\\cdot 0+\\left(${suma([[2 * m, ''], [b, '']])}\\right)&=\\left(${2 * m + b}\\right)`, `\\left(${2 * m + b}\\right)${nm}${E}&=${suma([[k, E]])}`]) },
    );
    resto.push({ txt: 'Divido por e^{mx} y despejo:', tex: aligned([`${suma([[2 * m + b, nm]])}&=${k}`, `${nm}&=\\frac{${k}}{${2 * m + b}}=${A}`]) });
  } else {
    pasos.push(
      { txt: `f(x) es e^{${m}x} y ${m} es raíz doble de la característica: hay resonancia, multiplico por x^s con s = 2:`, tex: `${yp}=${nm}x^{2}${E}` },
      { txt: 'Derivo con la regla del producto:', tex: `${yp}'=${nm}\\left(${suma([[2, 'x'], [m, 'x^{2}']])}\\right)${E},\\qquad ${yp}''=${nm}\\left(${suma([[2, ''], [4 * m, 'x'], [m * m, 'x^{2}']])}\\right)${E}` },
      { txt: 'Sustituyo en la ecuación y agrupo por potencias de x, sacando factor común A·e^{mx}:', tex: `${nm}${E}\\left[x^{2}\\left(${suma([[m * m, ''], [b * m, ''], [c, '']])}\\right)+x\\left(${suma([[4 * m, ''], [2 * b, '']])}\\right)+2\\right]=${suma([[k, E]])}` },
      { txt: `Evalúo los paréntesis: el de x² es el polinomio característico en la raíz ${m} (vale 0) y el de x vale 0 porque ${m} es raíz doble (b = ${-2 * m}). Se cancelan los términos en x² y en x:`, tex: aligned([`x^{2}\\left(${m * m + b * m + c}\\right)+x\\left(${4 * m + 2 * b}\\right)+2&=0+0+2`, `${nm}${E}\\cdot 2&=${suma([[k, E]])}`]) },
    );
    resto.push({ txt: 'Divido por e^{mx} y despejo:', tex: aligned([`${suma([[2, nm]])}&=${k}`, `${nm}&=\\frac{${k}}{2}=${A}`]) });
  }
  pasos.push(...resto, { txt: 'Reemplazo en la forma propuesta:', tex: `${nm}=${A}\\;\\Rightarrow\\;${yp}=${ypTex}` });
  return { cat: 'exp', s, fTex: suma([[k, E]]), fn: (x) => k * Math.exp(m * x), ypTex, ypFn: (x) => A * x ** s * Math.exp(m * x), pasos };
}

function parteTrig(h, rng, suf, w) {
  const { b, c } = h, res = b === 0 && c === w * w, s = res ? 1 : 0;
  let A, B;
  do { A = rng.ent(-3, 3); B = rng.ent(-3, 3); } while (A === 0 && B === 0);
  const nA = 'A' + suf, nB = 'B' + suf, yp = suf ? `y_{p${suf}}` : 'y_p';
  const ypTex = res ? `x\\left(${suma([[A, cos(w)], [B, sen(w)]])}\\right)` : suma([[A, cos(w)], [B, sen(w)]]);
  const pasos = [];
  let P, Q;
  if (!res) {
    const d = c - w * w;
    [P, Q] = [d * A + b * w * B, -b * w * A + d * B];
    pasos.push(
      { txt: `f(x) combina cos ${ang(w)} y sen ${ang(w)}, y ±${w}i no son raíces de la característica: no hay resonancia, s = 0. Propongo las dos funciones con coeficientes distintos (aunque f tenga una sola):`, tex: `${yp}=${nA}${cos(w)}+${nB}${sen(w)}` },
      { txt: 'Derivo dos veces (cada derivada pasa de cos a −sen y de sen a cos, y sale el factor ' + w + '):', tex: `${yp}'=${suma([[-w, nA + sen(w)], [w, nB + cos(w)]])},\\qquad ${yp}''=${suma([[-w * w, nA + cos(w)], [-w * w, nB + sen(w)]])}` },
      { txt: 'Sustituyo en la ecuación y agrupo los términos en cos y en sen:', tex: `\\left(${suma([[c - w * w, nA], [b * w, nB]])}\\right)${cos(w)}+\\left(${suma([[-b * w, nA], [c - w * w, nB]])}\\right)${sen(w)}=${suma([[P, cos(w)], [Q, sen(w)]])}` },
      { txt: 'Igualo los coeficientes de cos y de sen (dos funciones independientes):', tex: cases([[`${cos(w)}:\\ ${suma([[d, nA], [b * w, nB]])}`, P], [`${sen(w)}:\\ ${suma([[-b * w, nA], [d, nB]])}`, Q]]) },
    );
    if (b === 0) {
      pasos.push({ txt: `Como b = 0 las ecuaciones quedan separadas: despejo ${nA} y ${nB} dividiendo por ${d}:`, tex: aligned([`${nA}&=\\frac{${P}}{${d}}=${A}`, `${nB}&=\\frac{${Q}}{${d}}=${B}`]) });
    } else {
      const bw = b * w, det = d * d + bw * bw;
      pasos.push(
        { txt: `Resuelvo por eliminación. Para sacar ${nB}: multiplico la 1.ª ecuación por ${d} y la 2.ª por ${bw} (así los coeficientes de ${nB} quedan iguales) y las resto:`, tex: aligned([
          `${d}\\cdot(1):\\quad ${suma([[d * d, nA], [d * bw, nB]])}&=${d * P}`,
          `${bw}\\cdot(2):\\quad ${suma([[-bw * bw, nA], [d * bw, nB]])}&=${bw * Q}`,
          `(1)-(2):\\quad ${suma([[d * d + bw * bw, nA]])}&=${d * P - bw * Q}`,
        ]) },
        { txt: `Despejo ${nA}, y con ese valor voy a la 1.ª ecuación para sacar ${nB}:`, tex: aligned([
          `${nA}&=\\frac{${d * P - bw * Q}}{${det}}=${A}`,
          `${suma([[bw, nB]])}&=${P}-${prod(d, A)}`,
          `${suma([[bw, nB]])}&=${P - d * A}`,
          `${nB}&=\\frac{${P - d * A}}{${bw}}=${B}`,
        ]) },
      );
    }
  } else {
    [P, Q] = [2 * w * B, -2 * w * A];
    const dd = suma([[-w, nA + sen(w)], [w, nB + cos(w)]]);
    pasos.push(
      { txt: `f(x) combina cos ${ang(w)} y sen ${ang(w)}, y las raíces son ±${w}i: hay resonancia, multiplico por x^s con s = 1:`, tex: `${yp}=x\\left(${nA}${cos(w)}+${nB}${sen(w)}\\right)` },
      { txt: 'Derivo con la regla del producto (primera derivada):', tex: `${yp}'=${nA}${cos(w)}+${nB}${sen(w)}+x\\left(${dd}\\right)` },
      { txt: 'Derivo otra vez: sale 2 veces la derivada del paréntesis, más x por su segunda derivada (que es −' + w * w + ' veces el paréntesis):', tex: `${yp}''=2\\left(${dd}\\right)-${w * w === 1 ? '' : w * w}x\\left(${nA}${cos(w)}+${nB}${sen(w)}\\right)` },
      { txt: `Sustituyo en y″ + ${w * w}y (acá b = 0 y c = ${w * w}). Los términos con x se cancelan: −${w * w}x(...) + ${w * w}·x(...) = 0. Quedan los de cos y sen:`, tex: `2\\left(${dd}\\right)=${suma([[P, cos(w)], [Q, sen(w)]])}` },
      { txt: 'Igualo los coeficientes de cos y de sen:', tex: cases([[`${cos(w)}:\\ ${suma([[2 * w, nB]])}`, P], [`${sen(w)}:\\ ${suma([[-2 * w, nA]])}`, Q]]) },
      { txt: `Despejo ${nA} y ${nB}:`, tex: aligned([`${nB}&=\\frac{${P}}{${2 * w}}=${B}`, `${nA}&=\\frac{${Q}}{${-2 * w}}=${A}`]) },
    );
  }
  pasos.push({ txt: 'Reemplazo en la forma propuesta:', tex: `${nA}=${A},\\ ${nB}=${B}\\;\\Rightarrow\\;${yp}=${ypTex}` });
  return { cat: 'trig', s, fTex: suma([[P, cos(w)], [Q, sen(w)]]), fn: (x) => P * Math.cos(w * x) + Q * Math.sin(w * x), ypTex, ypFn: (x) => x ** s * (A * Math.cos(w * x) + B * Math.sin(w * x)), pasos };
}

function nohomogenea(rng) {
  const cat = rng.elegir(['poli', 'exp', 'trig']);
  const res = rng() < 0.5;
  const doble = rng() < 0.35;
  const hasta = (ok) => { for (;;) { const h = homogenea(specAzar(rng)); if (ok(h)) return h; } };
  const EXPS = [-2, -1, 1, 2, 3];
  let h, m, w;
  if (cat === 'poli') {
    if (!res) h = hasta((x) => x.c !== 0);
    else if (rng() < 0.3) h = homogenea({ tipo: 'iguales', r: 0 });
    else { const r2 = rng.nz(3); h = homogenea({ tipo: 'distintas', r1: Math.min(0, r2), r2: Math.max(0, r2) }); }
  } else if (cat === 'exp') {
    if (!res) { m = rng.elegir(EXPS); h = hasta((x) => m * m + x.b * m + x.c !== 0); } else {
      const doblada = rng() < 0.4;
      const sp = doblada ? { tipo: 'iguales', r: rng.nz(3) } : (() => { for (;;) { const s = specAzar(rng, 'distintas'); if (s.r1 !== 0 || s.r2 !== 0) return s; } })();
      h = homogenea(sp);
      m = doblada ? sp.r : rng.elegir([sp.r1, sp.r2].filter((r) => r !== 0));
    }
  } else {
    w = rng.ent(1, 3);
    h = res ? homogenea({ tipo: 'complejas', al: 0, be: w }) : hasta((x) => !(x.b === 0 && x.c === w * w));
  }
  const construir = (k, suf) => (k === 'poli' ? partePoli(h, rng, suf) : k === 'exp' ? parteExp(h, rng, suf, k === cat ? m : rng.elegir(EXPS)) : parteTrig(h, rng, suf, k === cat ? w : rng.ent(1, 3)));
  const partes = [];
  if (doble) {
    const otra = rng.elegir(['poli', 'exp', 'trig'].filter((k) => k !== cat));
    partes.push(construir(cat, '_1'), construir(otra, '_2'));
  } else partes.push(construir(cat, ''));
  const { b, c } = h;
  const fTex = partes.reduce((a, p) => unir(a, p.fTex), '');
  const ypTex = partes.reduce((a, p) => unir(a, p.ypTex), '');
  const sol = `y=${unir(h.yhTex, ypTex)}`;
  let pasosYp;
  if (doble) {
    const [p1, p2] = partes;
    pasosYp = [
      { txt: 'f tiene dos términos distintos. Como la ecuación es lineal, vale la superposición: busco y_p = y_p₁ + y_p₂, donde y_p₁ resuelve la ecuación con el primer término de f y y_p₂ con el segundo (cada una con su propia forma y sus propios coeficientes A, B, D).', tex: `L[y]=y''${b < 0 ? '' : '+'}${suma([[b, "y'"], [c, 'y']])}=f_1+f_2` },
      { txt: 'Parte 1: busco y_p₁ para el primer término de f.', tex: `y''${b < 0 ? '' : '+'}${suma([[b, "y'"], [c, 'y']])}=${p1.fTex}` },
      ...p1.pasos,
      { txt: 'Parte 2: busco y_p₂ para el segundo término de f.', tex: `y''${b < 0 ? '' : '+'}${suma([[b, "y'"], [c, 'y']])}=${p2.fTex}` },
      ...p2.pasos,
      { txt: 'Sumo las dos soluciones particulares (superposición):', tex: `y_p=y_{p_1}+y_{p_2}=${ypTex}` },
    ];
  } else pasosYp = partes[0].pasos;
  const pasos = [
    ...h.pasos,
    ...pasosYp,
    { txt: 'La solución general de la no homogénea es y = y_h + y_p:', tex: sol },
  ];
  return {
    enunciado: [{ txt: 'Hallar la solución general por coeficientes indeterminados:', tex: `${ec2(b, c)}=${fTex}` }],
    pasos, resultado: { tex: sol },
    verif: {
      orden: 2, dom: [-0.8, 0.8], consts: [[1, 1], [2, -1], [-1, 3]],
      y: (x, c1, c2) => h.yh(x, c1, c2) + partes.reduce((s, p) => s + p.ypFn(x), 0),
      ec: (x, y, y1, y2) => y2 + b * y1 + c * y - partes.reduce((s, p) => s + p.fn(x), 0),
      partes: partes.map((p) => ({ cat: p.cat, s: p.s })),
    },
  };
}

export const GENERADORES_EDO2 = [
  { id: 'homogenea2', nombre: 'EDO de 2.º orden homogénea (coef. constantes)', grupo: 'EDO', generar: homogenea2 },
  { id: 'nohomogenea', nombre: 'EDO de 2.º orden no homogénea (coef. indeterminados)', grupo: 'EDO', generar: nohomogenea },
];
