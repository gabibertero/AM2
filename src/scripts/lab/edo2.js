// EDO de 2.º orden a coeficientes constantes: homogénea (raíces distintas, iguales, complejas) y no homogénea por
// coeficientes indeterminados (con y sin resonancia). Se elige y_p primero y se calcula f = L[y_p]: todo entero.
import { suma, ex } from './mate.js';

const ec2 = (b, c) => suma([[1, "y''"], [b, "y'"], [c, 'y']]);
const ang = (w) => (w === 1 ? 'x' : `${w}x`);
const cos = (w) => `\\cos ${ang(w)}`;
const sen = (w) => `\\sin ${ang(w)}`;
const unir = (a, b) => (b.startsWith('-') ? a + b : `${a}+${b}`);
const cases = (filas) => `\\begin{cases}${filas.map(([l, r]) => `${l}`.concat('=', r)).join('\\\\')}\\end{cases}`;

// spec: {tipo:'distintas', r1, r2} | {tipo:'iguales', r} | {tipo:'complejas', al, be}
export function homogenea(spec) {
  const { tipo } = spec;
  let b, c, yhTex, yh, raices, disc;
  if (tipo === 'distintas') {
    const { r1, r2 } = spec;
    b = -(r1 + r2); c = r1 * r2;
    yhTex = suma([[1, 'C_1' + ex(r1)], [1, 'C_2' + ex(r2)]]);
    yh = (x, c1, c2) => c1 * Math.exp(r1 * x) + c2 * Math.exp(r2 * x);
    raices = `r_1=${r1},\\quad r_2=${r2}`;
  } else if (tipo === 'iguales') {
    const { r } = spec;
    b = -2 * r; c = r * r;
    yhTex = r === 0 ? 'C_1+C_2x' : `\\left(C_1+C_2x\\right)${ex(r)}`;
    yh = (x, c1, c2) => (c1 + c2 * x) * Math.exp(r * x);
    raices = `r_1=r_2=${r}`;
  } else {
    const { al, be } = spec;
    b = -2 * al; c = al * al + be * be;
    const par = `C_1${cos(be)}+C_2${sen(be)}`;
    yhTex = al === 0 ? par : `${ex(al)}\\left(${par}\\right)`;
    yh = (x, c1, c2) => Math.exp(al * x) * (c1 * Math.cos(be * x) + c2 * Math.sin(be * x));
    raices = `r=\\frac{${-b}\\pm\\sqrt{${b * b - 4 * c}}}{2}=\\frac{${-b}\\pm ${2 * be}i}{2}=${al === 0 ? '' : al}\\pm ${be === 1 ? '' : be}i`;
  }
  disc = b * b - 4 * c;
  const pasos = [
    { txt: 'Propongo y = e^{rx}: la ecuación característica es', tex: `${suma([[1, 'r^{2}'], [b, 'r'], [c, '']])}=0` },
    { txt: `Discriminante Δ = b² − 4c = ${disc}: ${disc > 0 ? 'positivo, dos raíces reales distintas' : disc === 0 ? 'cero, raíz real doble' : 'negativo, raíces complejas conjugadas'}.`, tex: raices },
    { txt: 'Solución de la homogénea:', tex: `y_h=${yhTex}` },
  ];
  return { tipo, b, c, yhTex, yh, pasos };
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
    verif: { orden: 2, dom: [-1, 1], consts: [[1, 1], [2, -1], [-1, 3]], y: h.yh, ec: (x, y, y1, y2) => y2 + h.b * y1 + h.c * y },
  };
}

function nohomogenea(rng) {
  const cat = rng.elegir(['poli', 'exp', 'trig']);
  const res = rng() < 0.5;
  const hasta = (ok) => { for (;;) { const h = homogenea(specAzar(rng)); if (ok(h)) return h; } };
  let h, f, fn, ypTex, ypFn, forma, pasosYp;
  if (cat === 'poli') {
    let A, B, D, p2, p1, p0;
    if (!res) {
      h = hasta((x) => x.c !== 0);
      A = rng.nz(3); B = rng.ent(-3, 3); D = rng.ent(-3, 3);
      const { b, c } = h;
      [p2, p1, p0] = [c * A, c * B + 2 * b * A, c * D + b * B + 2 * A];
      ypTex = suma([[A, 'x^{2}'], [B, 'x'], [D, '']]);
      ypFn = (x) => A * x * x + B * x + D;
      forma = 'f(x) es un polinomio de grado 2 y 0 no es raíz de la característica (no hay resonancia): s = 0.';
      pasosYp = [
        { txt: forma, tex: 'y_p=Ax^{2}+Bx+D' },
        { txt: 'Derivo:', tex: "y_p'=2Ax+B,\\qquad y_p''=2A" },
        { txt: 'Sustituyo en la ecuación e igualo coeficientes de cada potencia de x:', tex: cases([['x^{2}:\\ ' + suma([[c, 'A']]), p2], ['x:\\ ' + suma([[2 * b, 'A'], [c, 'B']]), p1], ['1:\\ ' + suma([[2, 'A'], [b, 'B'], [c, 'D']]), p0]]) },
      ];
    } else {
      const r2 = rng.nz(3);
      h = homogenea({ tipo: 'distintas', r1: Math.min(0, r2), r2: Math.max(0, r2) });
      A = rng.nz(2); B = rng.ent(-3, 3); D = rng.ent(-3, 3);
      const { b } = h;
      [p2, p1, p0] = [3 * b * A, 6 * A + 2 * b * B, 2 * B + b * D];
      ypTex = suma([[A, 'x^{3}'], [B, 'x^{2}'], [D, 'x']]);
      ypFn = (x) => A * x ** 3 + B * x * x + D * x;
      pasosYp = [
        { txt: 'f(x) es un polinomio de grado 2, pero r = 0 es raíz de la característica (resonancia): multiplico por x^s con s = 1.', tex: 'y_p=x\\left(Ax^{2}+Bx+D\\right)=Ax^{3}+Bx^{2}+Dx' },
        { txt: 'Derivo:', tex: "y_p'=3Ax^{2}+2Bx+D,\\qquad y_p''=6Ax+2B" },
        { txt: 'Sustituyo en la ecuación (c = 0) e igualo coeficientes:', tex: cases([['x^{2}:\\ ' + suma([[3 * b, 'A']]), p2], ['x:\\ ' + suma([[6, 'A'], [2 * b, 'B']]), p1], ['1:\\ ' + suma([[2, 'B'], [b, 'D']]), p0]]) },
      ];
    }
    f = suma([[p2, 'x^{2}'], [p1, 'x'], [p0, '']]);
    fn = (x) => p2 * x * x + p1 * x + p0;
    pasosYp.push({ txt: 'Resuelvo el sistema:', tex: `A=${A},\\quad B=${B},\\quad D=${D}` });
  } else if (cat === 'exp') {
    let m, A, k;
    if (!res) {
      m = rng.elegir([-2, -1, 1, 2, 3]);
      h = hasta((x) => m * m + x.b * m + x.c !== 0);
      A = rng.nz(3);
      k = A * (m * m + h.b * m + h.c);
      ypTex = suma([[A, 'e^{' + (m === 1 ? '' : m === -1 ? '-' : m) + 'x}']]);
      ypFn = (x) => A * Math.exp(m * x);
      pasosYp = [
        { txt: `f(x) es una exponencial e^{${m}x} y ${m} no es raíz de la característica: s = 0.`, tex: `y_p=A${ex(m)}` },
        { txt: 'Derivo:', tex: `y_p'=${suma([[m, 'A']])}${ex(m)},\\qquad y_p''=${suma([[m * m, 'A']])}${ex(m)}` },
        { txt: 'Sustituyo y saco factor común:', tex: `\\left(${m * m}${m * h.b < 0 ? '' : '+'}${m * h.b}${h.c < 0 ? '' : '+'}${h.c}\\right)A${ex(m)}=${suma([[k, ex(m)]])}\\;\\Rightarrow\\;${suma([[m * m + h.b * m + h.c, 'A']])}=${k}` },
      ];
    } else {
      const doble = rng() < 0.4;
      const sp = doble ? { tipo: 'iguales', r: rng.nz(3) } : (() => { for (;;) { const s = specAzar(rng, 'distintas'); if (s.r1 !== 0 || s.r2 !== 0) return s; } })();
      h = homogenea(sp);
      m = doble ? sp.r : rng.elegir([sp.r1, sp.r2].filter((r) => r !== 0));
      A = rng.nz(3);
      if (doble) {
        k = 2 * A;
        ypTex = suma([[A, 'x^{2}' + ex(m)]]);
        ypFn = (x) => A * x * x * Math.exp(m * x);
        pasosYp = [
          { txt: `f(x) es e^{${m}x} y ${m} es raíz doble de la característica (resonancia): s = 2.`, tex: `y_p=Ax^{2}${ex(m)}` },
          { txt: 'Derivo:', tex: `y_p'=A\\left(${suma([[2, 'x'], [m, 'x^{2}']])}\\right)${ex(m)},\\qquad y_p''=A\\left(${suma([[2, ''], [4 * m, 'x'], [m * m, 'x^{2}']])}\\right)${ex(m)}` },
          { txt: 'Sustituyo: los términos con x y x² se cancelan (m es raíz doble) y queda', tex: `${suma([[2, 'A']])}${ex(m)}=${suma([[k, ex(m)]])}\\;\\Rightarrow\\;2A=${k}` },
        ];
      } else {
        k = A * (2 * m + h.b);
        ypTex = suma([[A, 'x' + ex(m)]]);
        ypFn = (x) => A * x * Math.exp(m * x);
        pasosYp = [
          { txt: `f(x) es e^{${m}x} y ${m} es raíz simple de la característica (resonancia): s = 1.`, tex: `y_p=Ax${ex(m)}` },
          { txt: 'Derivo:', tex: `y_p'=A\\left(${suma([[1, ''], [m, 'x']])}\\right)${ex(m)},\\qquad y_p''=A\\left(${suma([[2 * m, ''], [m * m, 'x']])}\\right)${ex(m)}` },
          { txt: 'Sustituyo: el término con x se cancela (m es raíz) y queda', tex: `${suma([[2 * m + h.b, 'A']])}${ex(m)}=${suma([[k, ex(m)]])}\\;\\Rightarrow\\;${suma([[2 * m + h.b, 'A']])}=${k}` },
        ];
      }
    }
    f = suma([[k, ex(m)]]);
    fn = (x) => k * Math.exp(m * x);
    pasosYp.push({ txt: 'Resuelvo:', tex: `A=${A}` });
  } else {
    const w = rng.ent(1, 3);
    let A, B;
    do { A = rng.ent(-3, 3); B = rng.ent(-3, 3); } while (A === 0 && B === 0);
    let P, Q;
    if (!res) {
      h = hasta((x) => !(x.b === 0 && x.c === w * w));
      const { b, c } = h, d = c - w * w;
      [P, Q] = [d * A + b * w * B, -b * w * A + d * B];
      ypTex = suma([[A, cos(w)], [B, sen(w)]]);
      ypFn = (x) => A * Math.cos(w * x) + B * Math.sin(w * x);
      pasosYp = [
        { txt: `f(x) combina cos ${ang(w)} y sen ${ang(w)}, y ±${w}i no son raíces de la característica: s = 0.`, tex: `y_p=A${cos(w)}+B${sen(w)}` },
        { txt: 'Derivo:', tex: `y_p'=${suma([[-w, 'A' + sen(w)], [w, 'B' + cos(w)]])},\\qquad y_p''=${suma([[-w * w, 'A' + cos(w)], [-w * w, 'B' + sen(w)]])}` },
        { txt: 'Sustituyo e igualo los coeficientes de cos y de sen:', tex: cases([[`${cos(w)}:\\ ` + suma([[d, 'A'], [b * w, 'B']]), P], [`${sen(w)}:\\ ` + suma([[-b * w, 'A'], [d, 'B']]), Q]]) },
      ];
    } else {
      h = homogenea({ tipo: 'complejas', al: 0, be: w });
      [P, Q] = [2 * w * B, -2 * w * A];
      ypTex = `x\\left(${suma([[A, cos(w)], [B, sen(w)]])}\\right)`;
      ypFn = (x) => x * (A * Math.cos(w * x) + B * Math.sin(w * x));
      pasosYp = [
        { txt: `f(x) combina cos ${ang(w)} y sen ${ang(w)}, y las raíces son ±${w}i (resonancia): s = 1.`, tex: `y_p=x\\left(A${cos(w)}+B${sen(w)}\\right)` },
        { txt: 'Derivo:', tex: `y_p'=A${cos(w)}+B${sen(w)}+x\\left(${suma([[-w, 'A' + sen(w)], [w, 'B' + cos(w)]])}\\right)` },
        { txt: '', tex: `y_p''=2\\left(${suma([[-w, 'A' + sen(w)], [w, 'B' + cos(w)]])}\\right)${w * w === 1 ? '-' : `-${w * w}`}x\\left(A${cos(w)}+B${sen(w)}\\right)` },
        { txt: 'Sustituyo: los términos con x se cancelan y quedan los de cos y sen:', tex: cases([[`${cos(w)}:\\ ` + suma([[2 * w, 'B']]), P], [`${sen(w)}:\\ ` + suma([[-2 * w, 'A']]), Q]]) },
      ];
    }
    f = suma([[P, cos(w)], [Q, sen(w)]]);
    fn = (x) => P * Math.cos(w * x) + Q * Math.sin(w * x);
    pasosYp.push({ txt: 'Resuelvo el sistema:', tex: `A=${A},\\quad B=${B}` });
  }
  const { b, c } = h;
  const pasos = [
    ...h.pasos,
    ...pasosYp.filter((p) => p.txt || p.tex),
    { txt: 'Solución general: y = y_h + y_p.', tex: `y=${unir(h.yhTex, ypTex)}` },
  ];
  return {
    enunciado: [{ txt: 'Hallar la solución general por coeficientes indeterminados:', tex: `${ec2(b, c)}=${f}` }],
    pasos, resultado: { tex: `y=${unir(h.yhTex, ypTex)}` },
    verif: { orden: 2, dom: [-0.8, 0.8], consts: [[1, 1], [2, -1], [-1, 3]], y: (x, c1, c2) => h.yh(x, c1, c2) + ypFn(x), ec: (x, y, y1, y2) => y2 + b * y1 + c * y - fn(x), res },
  };
}

export const GENERADORES_EDO2 = [
  { id: 'homogenea2', nombre: 'EDO de 2.º orden homogénea (coef. constantes)', grupo: 'EDO', generar: homogenea2 },
  { id: 'nohomogenea', nombre: 'EDO de 2.º orden no homogénea (coef. indeterminados)', grupo: 'EDO', generar: nohomogenea },
];
