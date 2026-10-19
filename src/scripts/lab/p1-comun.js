// Utilidades compartidas por los generadores del 1º parcial: TeX, radicales simples y polinomios en x, y, z. Lógica pura.
import { fr, fSum, fMul, fVal, texF, suma, unir } from './mate.js';

export const lineas = (ls) => `\\begin{aligned}${ls.join('\\\\')}\\end{aligned}`;
export const cases = (ls) => `\\begin{cases}${ls.join('\\\\')}\\end{cases}`;
// Fracción como decimal (coma) si es exacto en <= 4 cifras; si no, \frac.
export function num(f0) {
  const f = fr(f0);
  if (f.d === 1) return `${f.n}`;
  for (let e = 1; e <= 4; e++) {
    if ((10 ** e) % f.d) continue;
    const s = String((Math.abs(f.n) * 10 ** e) / f.d).padStart(e + 1, '0');
    return `${f.n < 0 ? '-' : ''}${s.slice(0, -e)}{,}${s.slice(-e)}`;
  }
  return texF(f);
}
export const aprox = (x, k = 2) => `${x < -(10 ** -k) / 2 ? '-' : ''}${Math.abs(x).toFixed(k).replace('.', '{,}')}`;
export const fac = (neg, tex) => (neg ? `\\left(${tex}\\right)` : tex); // paréntesis si es negativo
export const fp = (f0) => { const f = fr(f0); return fac(f.n < 0, num(f)); };

// Radicales: lista de [s, coef] = coef·√s (s libre de cuadrados).
export function raiz(n) { let k = 1, s = n; for (let d = 2; d * d <= s; d++) while (s % (d * d) === 0) { s /= d * d; k *= d; } return [k, s]; }
export const radTerms = (ts) => {
  const m = new Map();
  for (const [s, c] of ts) m.set(s, fSum(m.get(s) ?? fr(0), c));
  return [...m].filter(([, c]) => c.n !== 0).sort((a, b) => a[0] - b[0]);
};
export const radTex = (ts) => suma(ts.map(([s, c]) => [c, s === 1 ? '' : `\\sqrt{${s}}`]));
export const radVal = (ts) => ts.reduce((a, [s, c]) => a + fVal(c) * Math.sqrt(s), 0);
export const radMul = (ts, c) => ts.map(([s, k]) => [s, fMul(k, fr(c))]);

// Polinomio en x, y, z: [[coef(fr), i, j, k]]. Variables renombrables (vn) para otras figuras.
const cuerpo3 = (i, j, k, vn) => [i, j, k].map((e, n) => (e ? (e === 1 ? vn[n] : `${vn[n]}^{${e}}`) : '')).join('');
export function p3(ts) {
  const m = new Map();
  for (const [c, i, j, k] of ts) { const key = `${i},${j},${k}`; m.set(key, fSum(m.get(key) ?? fr(0), fr(c))); }
  return [...m].filter(([, c]) => c.n !== 0).map(([key, c]) => [c, ...key.split(',').map(Number)])
    .sort((a, b) => b[1] + b[2] + b[3] - a[1] - a[2] - a[3] || b[1] - a[1] || b[2] - a[2]);
}
export const p3Tex = (p, vn = ['x', 'y', 'z']) => suma(p.map(([c, i, j, k]) => [c, cuerpo3(i, j, k, vn)]));
export const p3D = (p, v) => p3(p.filter((t) => t[v + 1] > 0).map((t) => { const e = t.slice(1); e[v]--; return [fMul(t[0], fr(t[v + 1])), ...e]; }));
export const p3Ev = (p, x, y, z = 0) => p.reduce((s, [c, i, j, k]) => s + fVal(c) * x ** i * y ** j * z ** k, 0);
export const p3Fr = (p, x, y, z = 0) => p.reduce((s, [c, i, j, k]) => fSum(s, fMul(c, fr(x ** i * y ** j * z ** k))), fr(0));
// Sustitución visible: cada variable por su valor (entre paréntesis si es negativo), productos con \cdot.
export function p3Sub(p, P) {
  let s = '';
  for (const [c, i, j, k] of p) {
    const f = [[P[0], i], [P[1], j], [P[2], k]].filter(([, e]) => e > 0).map(([v, e]) => fac(v < 0, `${v}`) + (e > 1 ? `^{${e}}` : ''));
    const a = fr(Math.abs(c.n), c.d);
    const cuerpo = [...(a.n === 1 && a.d === 1 && f.length ? [] : [texF(a)]), ...f].join('\\cdot ');
    s += (c.n < 0 ? '-' : s ? '+' : '') + cuerpo;
  }
  return s || '0';
}
export const unirT = (a, b) => unir(a === '0' ? '' : a, b === '0' ? '' : b) || '0';

// Superficie F(x,y,z)=0 con un punto P que la cumple y F_z(P) ≠ 0. Parte polinómica + opcional c·ln z (z0=1) o c·e^{y−z} (y0=z0).
const POOL = [[2, 0, 0], [0, 2, 0], [0, 0, 2], [1, 1, 0], [1, 0, 1], [0, 1, 1], [2, 0, 1], [0, 2, 1], [1, 1, 1], [0, 1, 2], [1, 0, 2], [0, 0, 3], [1, 0, 0], [0, 1, 0], [0, 0, 1]];
export function superficie(rng) {
  for (;;) {
    const tipo = rng.elegir(['poli', 'poli', 'lnz', 'expyz']);
    const z0 = tipo === 'lnz' ? 1 : rng.nz(2);
    const P = [rng.nz(2), tipo === 'expyz' ? z0 : rng.nz(2), z0];
    const ms = [];
    while (ms.length < (tipo === 'poli' ? 3 : 2)) { const m = rng.elegir(POOL); if (!ms.some((t) => t.join() === m.join())) ms.push(m); }
    let poly = p3(ms.map((m) => [rng.nz(3), ...m]));
    const c = tipo === 'poli' ? 0 : rng.nz(3);
    const espVal = tipo === 'expyz' ? c : 0;
    poly = p3([...poly, [-(fVal(p3Fr(poly, ...P)) + espVal), 0, 0, 0]]);
    const D = [0, 1, 2].map((v) => p3D(poly, v));
    const val = [p3Fr(D[0], ...P), fSum(p3Fr(D[1], ...P), fr(tipo === 'expyz' ? c : 0)), fSum(p3Fr(D[2], ...P), fr(tipo === 'lnz' ? c : tipo === 'expyz' ? -c : 0))];
    if (val[2].n === 0 || val.every((v) => v.n === 0)) continue;
    const ev = (y, z) => (tipo === 'expyz' ? `e^{${fac(y < 0, y)}-${fac(z < 0, z)}}` : '');
    const gen = [p3Tex(D[0]), p3Tex(D[1]), p3Tex(D[2])];
    const sub = [p3Sub(D[0], P), p3Sub(D[1], P), p3Sub(D[2], P)];
    const lnz = tipo === 'lnz', ex = tipo === 'expyz';
    const Ftex = unirT(p3Tex(poly), lnz ? suma([[c, '\\ln z']]) : ex ? suma([[c, 'e^{y-z}']]) : '0');
    const Gen = [gen[0], ex ? unirT(gen[1], suma([[c, 'e^{y-z}']])) : gen[1], lnz ? unirT(gen[2], `${c < 0 ? '-' : ''}\\frac{${Math.abs(c)}}{z}`) : ex ? unirT(gen[2], suma([[-c, 'e^{y-z}']])) : gen[2]];
    const Sub = [sub[0], ex ? unirT(sub[1], suma([[c, ev(P[1], P[2])]])) : sub[1], lnz ? unirT(sub[2], `${c < 0 ? '-' : ''}\\frac{${Math.abs(c)}}{${P[2]}}`) : ex ? unirT(sub[2], suma([[-c, ev(P[1], P[2])]])) : sub[2]];
    const Fn = (x, y, z) => p3Ev(poly, x, y, z) + (lnz ? c * Math.log(z) : ex ? c * Math.exp(y - z) : 0);
    return { P, Fn, Ftex, Gen, Sub, val, FPsub: unirT(p3Sub(poly, P), lnz ? suma([[c, `\\ln ${P[2]}`]]) : ex ? suma([[c, ev(P[1], P[2])]]) : '0'), tipo };
  }
}
