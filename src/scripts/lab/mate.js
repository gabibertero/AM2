// Álgebra mínima exacta (fracciones, polinomios en x e y) y armado de TeX para los generadores. Sin DOM.
const mcd = (a, b) => (b ? mcd(b, a % b) : Math.abs(a));
export const fr = (n, d = 1) => {
  if (typeof n === 'object') return n;
  const g = mcd(n, d) || 1;
  const s = d < 0 ? -1 : 1;
  return { n: (s * n) / g, d: (s * d) / g };
};
export const fSum = (a, b) => fr(a.n * b.d + b.n * a.d, a.d * b.d);
export const fMul = (a, b) => fr(a.n * b.n, a.d * b.d);
export const fNeg = (a) => fr(-a.n, a.d);
export const fVal = (a) => a.n / a.d;
export const fCero = (a) => a.n === 0;
export const texF = (a) => (a.d === 1 ? `${a.n}` : `${a.n < 0 ? '-' : ''}\\frac{${Math.abs(a.n)}}{${a.d}}`);

// Suma de términos [coef, cuerpoTeX]; cuerpo '' = término independiente. Omite ceros y coeficientes 1.
export function suma(terminos) {
  let s = '';
  for (const [c0, cuerpo] of terminos) {
    const c = fr(c0);
    if (c.n === 0) continue;
    const a = fr(Math.abs(c.n), c.d);
    const m = cuerpo === '' ? texF(a) : a.n === 1 && a.d === 1 ? cuerpo : texF(a) + cuerpo;
    s += (c.n < 0 ? '-' : s ? '+' : '') + m;
  }
  return s || '0';
}
// e^{bx} (b=0 -> '' para usar como constante en suma); ex(b,'x').
export const ex = (b, v = 'x') => (b === 0 ? '' : b === 1 ? `e^{${v}}` : b === -1 ? `e^{-${v}}` : `e^{${b}${v}}`);
export const paren = (s) => `\\left(${s}\\right)`;
// "+3", "-3" para encadenar; con 1 omite el número si hay cuerpo.
export const sg = (n) => (n < 0 ? `-${-n}` : `+${n}`);
export const texPi = (f) => (f.n === 0 ? '0' : f.d === 1 ? `${f.n === 1 ? '' : f.n === -1 ? '-' : f.n}\\pi` : `${f.n < 0 ? '-' : ''}\\frac{${Math.abs(f.n) === 1 ? '' : Math.abs(f.n)}\\pi}{${f.d}}`);

// Polinomio univariado: arreglo de fracciones, índice = grado.
export const uLimpio = (u) => { const r = u.map(fr); while (r.length > 1 && r[r.length - 1].n === 0) r.pop(); return r; };
export const uTex = (u, v = 'x') => suma(u.map((c, k) => [c, k === 0 ? '' : k === 1 ? v : `${v}^{${k}}`]));
export const uAdd = (a, b) => uLimpio(Array.from({ length: Math.max(a.length, b.length) }, (_, k) => fSum(a[k] ?? fr(0), b[k] ?? fr(0))));
export const uNeg = (a) => a.map(fNeg);
export const uMul = (a, b) => {
  const r = Array.from({ length: a.length + b.length - 1 }, () => fr(0));
  a.forEach((x, i) => b.forEach((y, j) => { r[i + j] = fSum(r[i + j], fMul(x, y)); }));
  return uLimpio(r);
};
export const uPot = (a, n) => { let r = [fr(1)]; for (let i = 0; i < n; i++) r = uMul(r, a); return r; };
export const uInt = (u) => uLimpio([fr(0), ...u.map((c, k) => fMul(c, fr(1, k + 1)))]);
export const uEval = (u, x) => u.reduce((s, c, k) => fSum(s, fMul(c, fr(x ** k))), fr(0));
export const uEvalNum = (u, x) => u.reduce((s, c, k) => s + fVal(c) * x ** k, 0);

// Polinomio bivariado: arreglo de [coef(fr), i, j] = coef·x^i·y^j, combinado y sin ceros.
export function p2(terminos) {
  const m = new Map();
  for (const [c, i, j] of terminos) {
    const k = `${i},${j}`;
    m.set(k, fSum(m.get(k) ?? fr(0), fr(c)));
  }
  return [...m].filter(([, c]) => c.n !== 0).map(([k, c]) => [c, ...k.split(',').map(Number)])
    .sort((a, b) => b[1] + b[2] - a[1] - a[2] || b[1] - a[1]);
}
const cuerpo2 = (i, j) => (i ? (i === 1 ? 'x' : `x^{${i}}`) : '') + (j ? (j === 1 ? 'y' : `y^{${j}}`) : '');
export const p2Tex = (p) => suma(p.map(([c, i, j]) => [c, cuerpo2(i, j)]));
export const p2Dx = (p) => p2(p.filter(([, i]) => i > 0).map(([c, i, j]) => [fMul(c, fr(i)), i - 1, j]));
export const p2Dy = (p) => p2(p.filter(([, , j]) => j > 0).map(([c, i, j]) => [fMul(c, fr(j)), i, j - 1]));
export const p2IntX = (p) => p2(p.map(([c, i, j]) => [fMul(c, fr(1, i + 1)), i + 1, j]));
export const p2IntY = (p) => p2(p.map(([c, i, j]) => [fMul(c, fr(1, j + 1)), i, j + 1]));
export const p2Add = (a, b) => p2([...a, ...b]);
export const p2Sub = (a, b) => p2([...a, ...b.map(([c, i, j]) => [fNeg(c), i, j])]);
export const p2Eval = (p, x, y) => p.reduce((s, [c, i, j]) => s + fVal(c) * x ** i * y ** j, 0);
// Sustituye y por un polinomio en x (arreglo univariado) -> univariado en x.
export const p2SubsY = (p, uy) => p.reduce((s, [c, i, j]) => uAdd(s, uMul([...Array(i).fill(fr(0)), c], uPot(uy, j))), [fr(0)]);
// Sustituye x e y por constantes -> fracción.
export const p2Const = (p, x, y) => p.reduce((s, [c, i, j]) => fSum(s, fMul(c, fr(x ** i * y ** j))), fr(0));
