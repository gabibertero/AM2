// Plano tangente y recta normal a una superficie en un punto: z = f(x,y) (polinómica o raíz) o F(x,y,z) = 0.
// El vector normal es (f_x, f_y, −1) o ∇F(P). Lógica pura.
import { fr, fSum, fMul, fVal, suma } from './mate.js';
import { lineas, num, fac, p3, p3Tex, p3D, p3Ev, p3Fr, p3Sub, superficie } from './p1-comun.js';

const lin = (v, r) => (r === 0 ? v : `${v}${r < 0 ? '+' : '-'}${Math.abs(r)}`); // v − r
const par = (v, r) => (r === 0 ? v : `\\left(${lin(v, r)}\\right)`);

function plano(rng) {
  let A, B, C, P, G, enun, pre;
  if (rng() < 0.5) { // z = f(x,y)
    const raiz = rng() < 0.25; let f, fx, fy, z0, x0, y0, ftex, gen, sub, extra = [], fn;
    if (raiz) {
      z0 = rng.ent(2, 4); x0 = rng.ent(-2, 2); y0 = rng.ent(-2, 2);
      const c = z0 * z0 - x0 * x0 - y0 * y0, rad = suma([[c, ''], [1, 'x^{2}'], [1, 'y^{2}']]);
      const rsub = suma([[c, ''], [1, `${fac(x0 < 0, x0)}^{2}`], [1, `${fac(y0 < 0, y0)}^{2}`]]);
      fx = fr(x0, z0); fy = fr(y0, z0);
      ftex = `\\sqrt{${rad}}`; fn = (x, y) => Math.sqrt(c + x * x + y * y);
      gen = [`\\frac{x}{\\sqrt{${rad}}}`, `\\frac{y}{\\sqrt{${rad}}}`];
      sub = [`\\frac{${fac(x0 < 0, x0)}}{\\sqrt{${rsub}}}`, `\\frac{${fac(y0 < 0, y0)}}{\\sqrt{${rsub}}}`];
      extra = [`\\frac{${x0}}{\\sqrt{${c + x0 * x0 + y0 * y0}}}`, `\\frac{${y0}}{\\sqrt{${c + x0 * x0 + y0 * y0}}}`];
      pre = [`f(${x0},${y0})&=\\sqrt{${rsub}}`, `&=\\sqrt{${z0 * z0}}`, `&=${z0}`];
    } else {
      const pool = [[2, 0], [0, 2], [1, 1], [3, 0], [0, 3], [1, 0], [0, 1], [2, 1], [1, 2]], ms = [];
      while (ms.length < 3) { const m = rng.elegir(pool); if (!ms.some((t) => t.join() === m.join())) ms.push(m); }
      f = p3([...ms.map(([i, j]) => [rng.nz(3), i, j, 0]), [rng.ent(-4, 4), 0, 0, 0]]);
      x0 = rng.nz(2); y0 = rng.nz(2);
      const D = [p3D(f, 0), p3D(f, 1)];
      fx = p3Fr(D[0], x0, y0); fy = p3Fr(D[1], x0, y0); z0 = p3Fr(f, x0, y0).n;
      ftex = p3Tex(f); fn = (x, y) => p3Ev(f, x, y);
      gen = D.map((d) => p3Tex(d)); sub = D.map((d) => p3Sub(d, [x0, y0, 0]));
      pre = [`f(${x0},${y0})&=${p3Sub(f, [x0, y0, 0])}`, `&=${z0}`];
    }
    const k = fSum(fr(z0), fSum(fMul(fx, fr(-x0)), fMul(fy, fr(-y0))));
    P = [x0, y0, z0]; A = fx; B = fy; C = fr(-1);
    const D = fSum(fMul(fx, fr(x0)), fSum(fMul(fy, fr(y0)), fr(-z0)));
    G = (x, y, z) => fn(x, y) - z;
    enun = { txt: `Hallar la ecuación del plano tangente y de la recta normal a la superficie en el punto de abscisa x=${x0} e y=${y0}:`, tex: `z=${ftex}` };
    const pasos = [
      { txt: `Calculo la altura del punto sobre la superficie, z₀ = f(${x0}, ${y0}):`, tex: lineas(pre) },
      { txt: 'Derivo f respecto de x y de y:', tex: lineas([`f_x&=${gen[0]}`, `f_y&=${gen[1]}`]) },
      { txt: 'Evalúo las derivadas en el punto (el plano tangente tiene pendientes f_x y f_y):', tex: lineas([`f_x(${x0},${y0})&=${sub[0]}`, ...(extra.length ? [`&=${extra[0]}`] : []), `&=${num(fx)}`, `f_y(${x0},${y0})&=${sub[1]}`, ...(extra.length ? [`&=${extra[1]}`] : []), `&=${num(fy)}`]) },
      { txt: 'La ecuación del plano tangente a z = f(x,y) en (x₀, y₀) es z − z₀ = f_x·(x − x₀) + f_y·(y − y₀). Reemplazo, distribuyo y junto términos:', tex: lineas([
        `${lin('z', z0)}&=${suma([[fx, par('x', x0)], [fy, par('y', y0)]])}`,
        `z&=${suma([[z0, ''], [fx, 'x'], [fMul(fx, fr(-x0)), ''], [fy, 'y'], [fMul(fy, fr(-y0)), '']])}`,
        `z&=${suma([[fx, 'x'], [fy, 'y'], [k, '']])}`]) },
      { txt: 'Como el plano es perpendicular a la normal, escribo la ecuación en forma implícita, con vector normal n = (f_x, f_y, −1) (es el gradiente de G(x,y,z) = f(x,y) − z, que es normal a la superficie G = 0):', tex: `${suma([[fx, 'x'], [fy, 'y'], [-1, 'z']])}=${num(D)}` },
      { txt: 'La recta normal pasa por el punto y tiene la dirección de n:', tex: lineas([`x&=${suma([[x0, ''], [fx, 't']])}`, `y&=${suma([[y0, ''], [fy, 't']])}`, `z&=${suma([[z0, ''], [-1, 't']])}`]) },
    ];
    return { enunciado: [enun], pasos, resultado: { tex: lineas([`\\text{Plano: }&\\ z=${suma([[fx, 'x'], [fy, 'y'], [k, '']])}`, `\\text{Recta normal: }&\\ \\left(x,y,z\\right)=\\left(${x0},\\ ${y0},\\ ${z0}\\right)+t\\left(${num(fx)},\\ ${num(fy)},\\ -1\\right)`]) }, verif: { P, n: [fVal(A), fVal(B), -1], D: fVal(D), G } };
  }
  // F(x,y,z) = 0
  const S = superficie(rng);
  P = S.P; const [x0, y0, z0] = P, [a, b, c] = S.val;
  const D = fSum(fMul(a, fr(x0)), fSum(fMul(b, fr(y0)), fMul(c, fr(z0))));
  const nom = ['x', 'y', 'z'];
  const pasos = [
    { txt: `Verifico que P=(${x0}, ${y0}, ${z0}) está en la superficie:`, tex: lineas([`F(P)&=${S.FPsub}`, '&=0']) },
    { txt: 'El gradiente de F es normal a la superficie de nivel F = 0 en cada punto donde no se anula. Calculo las derivadas parciales:', tex: lineas(nom.map((v, i) => `F_${v}&=${S.Gen[i]}`)) },
    { txt: 'Las evalúo en P (da el vector normal ∇F(P)):', tex: lineas(nom.flatMap((v, i) => [`F_${v}(P)&=${S.Sub[i]}`, `&=${num(S.val[i])}`])) },
    { txt: 'El plano tangente es F_x(P)·(x − x₀) + F_y(P)·(y − y₀) + F_z(P)·(z − z₀) = 0. Reemplazo, distribuyo y paso el término independiente:', tex: lineas([
      `${suma([[a, par('x', x0)], [b, par('y', y0)], [c, par('z', z0)]])}&=0`,
      `${suma([[a, 'x'], [fMul(a, fr(-x0)), ''], [b, 'y'], [fMul(b, fr(-y0)), ''], [c, 'z'], [fMul(c, fr(-z0)), '']])}&=0`,
      `${suma([[a, 'x'], [b, 'y'], [c, 'z']])}&=${num(D)}`]) },
    { txt: 'La recta normal pasa por P con dirección ∇F(P):', tex: lineas([`x&=${suma([[x0, ''], [a, 't']])}`, `y&=${suma([[y0, ''], [b, 't']])}`, `z&=${suma([[z0, ''], [c, 't']])}`]) },
  ];
  return {
    enunciado: [{ txt: `Hallar la ecuación del plano tangente y de la recta normal a la superficie en el punto P=(${x0}, ${y0}, ${z0}) (verificar antes que P pertenece a la superficie):`, tex: `${S.Ftex}=0` }],
    pasos,
    resultado: { tex: lineas([`\\text{Plano: }&\\ ${suma([[a, 'x'], [b, 'y'], [c, 'z']])}=${num(D)}`, `\\text{Recta normal: }&\\ \\left(x,y,z\\right)=\\left(${x0},\\ ${y0},\\ ${z0}\\right)+t\\left(${num(a)},\\ ${num(b)},\\ ${num(c)}\\right)`]) },
    verif: { P, n: S.val.map(fVal), D: fVal(D), G: S.Fn },
  };
}

export const GENERADORES_P1_PLANO = [{ id: 'plano', nombre: 'Plano tangente y recta normal', grupo: 'Cálculo', instancia: 'p1', generar: plano }];
