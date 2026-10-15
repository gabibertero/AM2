// EDO de 1er orden: lineal (y = u·v) y Bernoulli (z = y^(1-n) y luego u·v). Lógica pura; coeficientes elegidos para dar números lindos.
// Cada generador devuelve { enunciado, pasos, resultado, verif }. verif.ec(x, y, y1, y2) debe dar 0 si y(x, ...C) es solución.
import { suma, ex, fr } from './mate.js';

const xp = (m) => (m === 0 ? '' : m === 1 ? 'x' : `x^{${m}}`); // cuerpo para suma(): '' = constante
const fx = (k) => `\\frac{${k}}{x}`;

function lineal(rng) {
  const tipo = rng.elegir(['pot', 'exp', 'gauss']);
  let enun, pasos, y, ec, res, dom, Cs = [-2, 1, 3];
  if (tipo === 'pot') {
    const k = rng.ent(1, 3), m = rng.ent(0, 3), t = rng.ent(1, 3), s = m + k + 1, a = s * t;
    enun = `y'+${fx(k)}\\,y=${suma([[a, xp(m)]])}`;
    pasos = [
      { txt: 'Planteo y = u·v, con y′ = u′v + uv′. Reemplazo y agrupo:', tex: `u'v+u\\left(v'+${fx(k)}\\,v\\right)=${suma([[a, xp(m)]])}` },
      { txt: 'Elijo v tal que el paréntesis sea 0 (sin constante):', tex: `v'+${fx(k)}\\,v=0\\;\\Rightarrow\\;\\frac{dv}{v}=-${fx(k)}\\,dx\\;\\Rightarrow\\;\\ln|v|=-${k === 1 ? '' : k}\\ln|x|\\;\\Rightarrow\\;v=x^{-${k}}` },
      { txt: 'Queda u′·v = Q(x):', tex: `u'\\,x^{-${k}}=${suma([[a, xp(m)]])}\\;\\Rightarrow\\;u'=${suma([[a, xp(m + k)]])}` },
      { txt: 'Integro para hallar u:', tex: `u=\\int ${suma([[a, xp(m + k)]])}\\,dx=${suma([[t, xp(s)]])}+C` },
      { txt: 'Vuelvo a y = u·v:', tex: `y=\\left(${suma([[t, xp(s)]])}+C\\right)x^{-${k}}` },
    ];
    res = `y=${suma([[t, xp(m + 1)]])}+C\\,x^{-${k}}`;
    y = (x, C) => t * x ** (m + 1) + C * x ** -k;
    ec = (x, yy, y1) => y1 + (k / x) * yy - a * x ** m;
    dom = [0.5, 2];
  } else if (tipo === 'exp') {
    const k = rng.nz(3);
    let b; do b = rng.ent(-3, 3); while (b + k === 0);
    const t = rng.nz(3), s = b + k, a = s * t;
    const lhs = suma([[1, "y'"], [k, 'y']]);
    enun = `${lhs}=${suma([[a, ex(b)]])}`;
    pasos = [
      { txt: 'Planteo y = u·v, con y′ = u′v + uv′. Reemplazo y agrupo:', tex: `u'v+u\\left(${suma([[1, "v'"], [k, 'v']])}\\right)=${suma([[a, ex(b)]])}` },
      { txt: 'Elijo v tal que el paréntesis sea 0 (sin constante):', tex: `${suma([[1, "v'"], [k, 'v']])}=0\\;\\Rightarrow\\;\\frac{dv}{v}=${-k === 1 ? '' : -k}\\,dx\\;\\Rightarrow\\;v=${ex(-k)}` },
      { txt: 'Queda u′·v = Q(x):', tex: `u'\\,${ex(-k)}=${suma([[a, ex(b)]])}\\;\\Rightarrow\\;u'=${suma([[a, ex(s)]])}` },
      { txt: 'Integro para hallar u:', tex: `u=\\int ${suma([[a, ex(s)]])}\\,dx=${suma([[t, ex(s)]])}+C` },
      { txt: 'Vuelvo a y = u·v:', tex: `y=\\left(${suma([[t, ex(s)]])}+C\\right)${ex(-k)}` },
    ];
    res = `y=${suma([[t, ex(b)]])}+C\\,${ex(-k)}`;
    y = (x, C) => t * Math.exp(b * x) + C * Math.exp(-k * x);
    ec = (x, yy, y1) => y1 + k * yy - a * Math.exp(b * x);
    dom = [-1, 1];
  } else {
    const k = rng.ent(1, 3), t = rng.nz(3), a = 2 * k * t;
    const e2 = `e^{${k === 1 ? '' : k}x^{2}}`, em = `e^{-${k === 1 ? '' : k}x^{2}}`;
    enun = `y'+${2 * k}x\\,y=${suma([[a, 'x']])}`;
    pasos = [
      { txt: 'Planteo y = u·v, con y′ = u′v + uv′. Reemplazo y agrupo:', tex: `u'v+u\\left(v'+${2 * k}x\\,v\\right)=${suma([[a, 'x']])}` },
      { txt: 'Elijo v tal que el paréntesis sea 0 (sin constante):', tex: `v'+${2 * k}x\\,v=0\\;\\Rightarrow\\;\\frac{dv}{v}=-${2 * k}x\\,dx\\;\\Rightarrow\\;\\ln|v|=-${k === 1 ? '' : k}x^{2}\\;\\Rightarrow\\;v=${em}` },
      { txt: 'Queda u′·v = Q(x):', tex: `u'\\,${em}=${suma([[a, 'x']])}\\;\\Rightarrow\\;u'=${suma([[a, 'x']])}\\,${e2}` },
      { txt: 'Integro (sustitución w = ' + (k === 1 ? '' : k) + 'x²):', tex: `u=\\int ${suma([[a, 'x']])}\\,${e2}\\,dx=${suma([[t, e2]])}+C` },
      { txt: 'Vuelvo a y = u·v:', tex: `y=\\left(${suma([[t, e2]])}+C\\right)${em}` },
    ];
    res = `y=${t}+C\\,${em}`;
    y = (x, C) => t + C * Math.exp(-k * x * x);
    ec = (x, yy, y1) => y1 + 2 * k * x * yy - a * x;
    dom = [-1, 1];
  }
  return {
    enunciado: [{ txt: 'Hallar la solución general de la ecuación diferencial lineal (usar y = u·v):', tex: enun }],
    pasos, resultado: { tex: res },
    verif: { orden: 1, dom, consts: Cs.map((C) => [C]), y, ec },
  };
}

function bernoulli(rng) {
  const tipo = rng.elegir(['pot', 'const2', 'const3']);
  let enun, pasos, res, y, ec, dom, Cs;
  if (tipo === 'pot') {
    const k = rng.ent(1, 2), m = rng.ent(k, k + 2), t = rng.ent(1, 3), a = (m - k + 1) * t;
    const q = suma([[a, xp(m)]]);
    enun = `y'+${fx(k)}\\,y=${q}\\,y^{2}`;
    const zsol = suma([[1, `C${xp(k)}`], [-t, xp(m + 1)]]);
    pasos = [
      { txt: 'Es de Bernoulli, y′ + P(x)·y = Q(x)·yⁿ, con n = 2.', tex: `P(x)=${fx(k)},\\quad Q(x)=${q},\\quad n=2` },
      { txt: 'Divido por y² y hago z = y¹⁻ⁿ = y⁻¹, con z′ = −y⁻²·y′:', tex: `y^{-2}y'+${fx(k)}\\,y^{-1}=${q}\\;\\Rightarrow\\;-z'+${fx(k)}\\,z=${q}` },
      { txt: 'Queda una lineal en z:', tex: `z'-${fx(k)}\\,z=${suma([[-a, xp(m)]])}` },
      { txt: 'La resuelvo con z = u·v. Primero v:', tex: `v'-${fx(k)}\\,v=0\\;\\Rightarrow\\;v=${xp(k)}` },
      { txt: 'Después u:', tex: `u'\\,${xp(k)}=${suma([[-a, xp(m)]])}\\;\\Rightarrow\\;u'=${suma([[-a, xp(m - k)]])}\\;\\Rightarrow\\;u=${suma([[-t, xp(m - k + 1)]])}+C` },
      { txt: 'Entonces z = u·v:', tex: `z=${zsol}` },
      { txt: 'Deshago el cambio, y = 1/z:', tex: `y=\\frac{1}{${zsol}}` },
    ];
    res = `y=\\dfrac{1}{${zsol}}`;
    y = (x, C) => 1 / (C * x ** k - t * x ** (m + 1));
    ec = (x, yy, y1) => y1 + (k / x) * yy - a * x ** m * yy * yy;
    dom = [1, 2]; Cs = [500, -500];
  } else {
    const n = tipo === 'const2' ? 2 : 3;
    const k = n === 2 ? rng.nz(3) : rng.ent(1, 3), t = rng.ent(1, 3), a = k * t;
    const lhs = suma([[1, "y'"], [k, 'y']]);
    const cz = n === 2 ? k : 2 * k; // z' - cz·z = -(n-1)·a
    const zsol = `${t}+C${ex(cz)}`;
    const mult = n === 2 ? 1 : 2;
    enun = `${lhs}=${suma([[a, `y^{${n}}`]])}`;
    pasos = [
      { txt: `Es de Bernoulli, y′ + P(x)·y = Q(x)·yⁿ, con n = ${n}.`, tex: `P(x)=${k},\\quad Q(x)=${a},\\quad n=${n}` },
      { txt: `Divido por y${n === 2 ? '²' : '³'} y hago z = y¹⁻ⁿ = y⁻${n === 2 ? '¹' : '²'}, con z′ = ${n === 2 ? '−' : '−2·'}y⁻${n === 2 ? '²' : '³'}·y′:`,
        tex: `${suma([[1, `y^{-${n}}y'`], [k, `y^{${1 - n}}`]])}=${a}\\;\\Rightarrow\\;${suma([[n === 2 ? -1 : fr(-1, 2), "z'"], [k, 'z']])}=${a}` },
      { txt: 'Queda una lineal en z:', tex: `z'${cz < 0 ? '+' : '-'}${Math.abs(cz) === 1 ? '' : Math.abs(cz)}z=${-mult * a}` },
      { txt: 'La resuelvo con z = u·v. Primero v:', tex: `v'${cz < 0 ? '+' : '-'}${Math.abs(cz) === 1 ? '' : Math.abs(cz)}v=0\\;\\Rightarrow\\;v=${ex(cz)}` },
      { txt: 'Después u:', tex: `u'\\,${ex(cz)}=${-mult * a}\\;\\Rightarrow\\;u'=${suma([[-mult * a, ex(-cz)]])}\\;\\Rightarrow\\;u=${suma([[t, ex(-cz)]])}+C` },
      { txt: 'Entonces z = u·v:', tex: `z=${zsol}` },
      { txt: n === 2 ? 'Deshago el cambio, y = 1/z:' : 'Deshago el cambio, y⁻² = z:', tex: n === 2 ? `y=\\frac{1}{${zsol}}` : `y^{-2}=${zsol}\\;\\Rightarrow\\;y=\\pm\\frac{1}{\\sqrt{${zsol}}}` },
    ];
    res = n === 2 ? `y=\\dfrac{1}{${zsol}}` : `y=\\dfrac{1}{\\sqrt{${zsol}}}\\ \\text{(o su opuesta)}`;
    y = n === 2 ? (x, C) => 1 / (t + C * Math.exp(k * x)) : (x, C) => 1 / Math.sqrt(t + C * Math.exp(2 * k * x));
    ec = (x, yy, y1) => y1 + k * yy - a * yy ** n;
    dom = [-1, 1]; Cs = [0.5, 2];
  }
  return {
    enunciado: [{ txt: 'Hallar la solución general de la ecuación de Bernoulli:', tex: enun }],
    pasos, resultado: { tex: res },
    verif: { orden: 1, dom, consts: Cs.map((C) => [C]), y, ec },
  };
}

export const GENERADORES_EDO1 = [
  { id: 'lineal', nombre: 'EDO lineal de 1.er orden (y = u·v)', grupo: 'EDO', generar: lineal },
  { id: 'bernoulli', nombre: 'EDO de Bernoulli', grupo: 'EDO', generar: bernoulli },
];
