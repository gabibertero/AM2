// Plano tangente y recta normal a una superficie en un punto: z = f(x,y) (polinómica o raíz), F(x,y,z) = 0, o el plano tangente
// paralelo a un plano dado (punto desconocido). El vector normal es (f'_x, f'_y, −1) o ∇F(P). La recta se da en paramétricas y simétrica. Lógica pura.
import { fr, fSum, fMul, fVal, texF, suma } from './mate.js';
import { lineas, num, fac, p3, p3Tex, p3D, p3Ev, p3Fr, p3Sub, superficie } from './p1-comun.js';

const lin = (v, r) => (r === 0 ? v : `${v}${r < 0 ? '+' : '-'}${Math.abs(r)}`); // v − r
const par = (v, r) => (r === 0 ? v : `\\left(${lin(v, r)}\\right)`);
// Recta normal en forma simétrica; una componente nula deja esa coordenada constante (no se divide por 0).
function simetrica(P, n) {
  const v = ['x', 'y', 'z'], fijas = [], cocs = [];
  n.forEach((c, i) => (c.n === 0 ? fijas.push(`${v[i]}=${P[i]}`) : cocs.push(`\\frac{${lin(v[i], P[i])}}{${texF(c)}}`)));
  return [...fijas, ...(cocs.length > 1 ? [cocs.join('=')] : [])].join(',\\ ');
}
const NOTA_SIM = 'La recta normal en forma simétrica es (x − x₀)/n₁ = (y − y₀)/n₂ = (z − z₀)/n₃; si una componente del vector normal es 0, esa coordenada queda fija (x = x₀) y no se divide por 0.';
const rectaRes = (P, n) => `\\text{Recta normal: }&\\ \\left(x,y,z\\right)=\\left(${P.join(',\\ ')}\\right)+t\\left(${n.map(num).join(',\\ ')}\\right),\\quad ${simetrica(P, n)}`;

function plano(rng) {
  const modo = rng.elegir(['zf', 'zf', 'F', 'paralelo']);
  if (modo === 'paralelo') return paralelo(rng);
  let A, B, C, P, G, enun, pre;
  if (modo === 'zf') { // z = f(x,y)
    const raiz = rng() < 0.25; let f, fx, fy, z0, x0, y0, ftex, gen, sub, extra = [], fn;
    if (raiz) {
      z0 = rng.ent(2, 4); x0 = rng.ent(-2, 2); y0 = rng.ent(-2, 2);
      const c = z0 * z0 - x0 * x0 - y0 * y0, rad = suma([[1, 'x^{2}'], [1, 'y^{2}'], [c, '']]);
      const rsub = suma([[1, `${fac(x0 < 0, x0)}^{2}`], [1, `${fac(y0 < 0, y0)}^{2}`], [c, '']]);
      fx = fr(x0, z0); fy = fr(y0, z0);
      ftex = `\\sqrt{${rad}}`; fn = (x, y) => Math.sqrt(c + x * x + y * y);
      gen = [`\\frac{x}{\\sqrt{${rad}}}`, `\\frac{y}{\\sqrt{${rad}}}`];
      sub = [`\\frac{${fac(x0 < 0, x0)}}{\\sqrt{${rsub}}}`, `\\frac{${fac(y0 < 0, y0)}}{\\sqrt{${rsub}}}`];
      extra = [`\\frac{${x0}}{\\sqrt{${z0 * z0}}}`, `\\frac{${y0}}{\\sqrt{${z0 * z0}}}`];
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
    const horiz = fx.n === 0 && fy.n === 0 ? " Como f'_x = f'_y = 0, el plano tangente es horizontal: z = z₀." : '';
    const nv = [fx, fy, fr(-1)];
    const pasos = [
      { txt: `Calculo la altura del punto sobre la superficie, z₀ = f(${x0}, ${y0}):`, tex: lineas(pre) },
      { txt: 'Derivo f respecto de x y de y:', tex: lineas([`f'_x&=${gen[0]}`, `f'_y&=${gen[1]}`]) },
      { txt: `Evalúo las derivadas en el punto (el plano tangente tiene pendientes f'_x y f'_y)${raiz ? '; como z₀ > 0, la raíz de z₀² es z₀' : ''}:`, tex: lineas([`f'_x(${x0},${y0})&=${sub[0]}`, ...(extra.length ? [`&=${extra[0]}`, ...(x0 !== 0 ? [`&=\\frac{${x0}}{${z0}}`] : [])] : []), `&=${num(fx)}`, `f'_y(${x0},${y0})&=${sub[1]}`, ...(extra.length ? [`&=${extra[1]}`, ...(y0 !== 0 ? [`&=\\frac{${y0}}{${z0}}`] : [])] : []), `&=${num(fy)}`]) },
      { txt: `La ecuación del plano tangente a z = f(x,y) en (x₀, y₀) es z − z₀ = f'_x·(x − x₀) + f'_y·(y − y₀). Reemplazo, distribuyo y junto términos.${horiz}`, tex: lineas([
        `${lin('z', z0)}&=${suma([[fx, par('x', x0)], [fy, par('y', y0)]])}`,
        `z&=${suma([[z0, ''], [fx, 'x'], [fMul(fx, fr(-x0)), ''], [fy, 'y'], [fMul(fy, fr(-y0)), '']])}`,
        `z&=${suma([[fx, 'x'], [fy, 'y'], [k, '']])}`]) },
      { txt: "Como el plano es perpendicular a la normal, escribo la ecuación en forma implícita, con vector normal n = (f'_x, f'_y, −1) (es el gradiente de G(x,y,z) = f(x,y) − z, que es normal a la superficie G = 0):", tex: `${suma([[fx, 'x'], [fy, 'y'], [-1, 'z']])}=${num(D)}` },
      { txt: `La recta normal pasa por el punto y tiene la dirección de n. ${NOTA_SIM}`, tex: lineas([`x&=${suma([[x0, ''], [fx, 't']])}`, `y&=${suma([[y0, ''], [fy, 't']])}`, `z&=${suma([[z0, ''], [-1, 't']])}`, `\\text{simétrica: }&\\ ${simetrica(P, nv)}`]) },
    ];
    return { enunciado: [enun], pasos, resultado: { tex: lineas([`\\text{Plano: }&\\ z=${suma([[fx, 'x'], [fy, 'y'], [k, '']])}`, rectaRes(P, nv)]) }, verif: { P, n: [fVal(A), fVal(B), -1], D: fVal(D), G } };
  }
  // F(x,y,z) = 0
  const S = superficie(rng);
  P = S.P; const [x0, y0, z0] = P, [a, b, c] = S.val;
  const D = fSum(fMul(a, fr(x0)), fSum(fMul(b, fr(y0)), fMul(c, fr(z0))));
  const nom = ['x', 'y', 'z'];
  const horiz = a.n === 0 && b.n === 0 ? " Como F'_x(P) = F'_y(P) = 0, el plano tangente es horizontal: z = z₀." : '';
  const pasos = [
    { txt: `Verifico que P=(${x0}, ${y0}, ${z0}) está en la superficie:`, tex: lineas([`F(P)&=${S.FPsub}`, '&=0']) },
    { txt: 'El gradiente de F es normal a la superficie de nivel F = 0 en cada punto donde no se anula. Calculo las derivadas parciales:', tex: lineas(nom.map((v, i) => `F'_${v}&=${S.Gen[i]}`)) },
    { txt: 'Las evalúo en P (da el vector normal ∇F(P)):', tex: lineas(nom.flatMap((v, i) => [`F'_${v}(P)&=${S.Sub[i]}`, `&=${num(S.val[i])}`])) },
    { txt: `El plano tangente es F'_x(P)·(x − x₀) + F'_y(P)·(y − y₀) + F'_z(P)·(z − z₀) = 0. Reemplazo, distribuyo y paso el término independiente.${horiz}`, tex: lineas([
      `${suma([[a, par('x', x0)], [b, par('y', y0)], [c, par('z', z0)]])}&=0`,
      `${suma([[a, 'x'], [fMul(a, fr(-x0)), ''], [b, 'y'], [fMul(b, fr(-y0)), ''], [c, 'z'], [fMul(c, fr(-z0)), '']])}&=0`,
      `${suma([[a, 'x'], [b, 'y'], [c, 'z']])}&=${num(D)}`]) },
    { txt: `La recta normal pasa por P con dirección ∇F(P). ${NOTA_SIM}`, tex: lineas([`x&=${suma([[x0, ''], [a, 't']])}`, `y&=${suma([[y0, ''], [b, 't']])}`, `z&=${suma([[z0, ''], [c, 't']])}`, `\\text{simétrica: }&\\ ${simetrica(P, S.val)}`]) },
  ];
  return {
    enunciado: [{ txt: `Hallar la ecuación del plano tangente y de la recta normal a la superficie en el punto P=(${x0}, ${y0}, ${z0}) (verificar antes que P pertenece a la superficie):`, tex: `${S.Ftex}=0` }],
    pasos,
    resultado: { tex: lineas([`\\text{Plano: }&\\ ${suma([[a, 'x'], [b, 'y'], [c, 'z']])}=${num(D)}`, rectaRes(P, S.val)]) },
    verif: { P, n: S.val.map(fVal), D: fVal(D), G: S.Fn },
  };
}

// Plano tangente paralelo a un plano dado: ∇F(M) múltiplo de (a, b, c), junto con M en la superficie. Superficie z = αx² + βy² + k₀.
function paralelo(rng) {
  const al = rng.nz(2), be = rng.nz(2), k0 = rng.ent(-4, 4), x0 = rng.nz(2), y0 = rng.nz(2), m = rng.elegir([1, 2, 3, -1, -2]);
  const z0 = al * x0 * x0 + be * y0 * y0 + k0, fx = 2 * al * x0, fy = 2 * be * y0;
  const [a, b, c] = [m * fx, m * fy, -m], d = a * x0 + b * y0 + c * z0 + rng.nz(5);
  const ftex = suma([[al, 'x^{2}'], [be, 'y^{2}'], [k0, '']]);
  const k = z0 - fx * x0 - fy * y0, D = fx * x0 + fy * y0 - z0;
  const dado = suma([[a, 'x'], [b, 'y'], [c, 'z']]);
  const pasos = [
    { txt: "Derivo f: el vector normal al plano tangente en (x, y) es n = (f'_x, f'_y, −1).", tex: lineas([`f'_x&=${suma([[2 * al, 'x']])}`, `f'_y&=${suma([[2 * be, 'y']])}`, `\\vec n&=\\left(${suma([[2 * al, 'x']])},\\ ${suma([[2 * be, 'y']])},\\ -1\\right)`]) },
    { txt: `Dos planos son paralelos si sus normales son proporcionales: n = k·(${a}, ${b}, ${c}). La tercera componente da k, y con ella las otras dos dan x e y:`, tex: lineas([`-1&=k\\cdot ${fac(c < 0, c)}\\ \\Rightarrow\\ k=${texF(fr(-1, c))}`, `${suma([[2 * al, 'x']])}&=${texF(fr(-a, c))}\\ \\Rightarrow\\ x=${x0}`, `${suma([[2 * be, 'y']])}&=${texF(fr(-b, c))}\\ \\Rightarrow\\ y=${y0}`]) },
    { txt: 'El punto de la superficie tiene esas coordenadas x, y; calculo z₀ con f (así el punto está en la superficie):', tex: lineas([`z_{0}&=f(${x0},${y0})`, `&=${suma([[al, `${fac(x0 < 0, x0)}^{2}`], [be, `${fac(y0 < 0, y0)}^{2}`], [k0, '']])}`, `&=${z0}`]) },
    { txt: `Plano tangente: con f'_x(${x0},${y0}) = ${fx} y f'_y(${x0},${y0}) = ${fy}${fx === 0 && fy === 0 ? ' (plano horizontal)' : ''}, uso z − z₀ = f\'_x·(x − x₀) + f\'_y·(y − y₀):`, tex: lineas([`${lin('z', z0)}&=${suma([[fx, par('x', x0)], [fy, par('y', y0)]])}`, `z&=${suma([[fx, 'x'], [fy, 'y'], [k, '']])}`]) },
    { txt: 'Recta normal y plano tangente en forma implícita (el plano ya queda paralelo al dado, con otro término independiente):', tex: lineas([`${suma([[fx, 'x'], [fy, 'y'], [-1, 'z']])}&=${D}`, rectaRes([x0, y0, z0], [fr(fx), fr(fy), fr(-1)])]) },
  ];
  return {
    enunciado: [{ txt: 'Hallar el punto de la superficie en el que el plano tangente es paralelo al plano dado, y escribir la ecuación del plano tangente y de la recta normal en ese punto:', tex: `z=${ftex},\\qquad ${dado}=${d}` }],
    pasos,
    resultado: { tex: lineas([`\\text{Punto: }&\\ \\left(${x0},\\ ${y0},\\ ${z0}\\right)`, `\\text{Plano: }&\\ z=${suma([[fx, 'x'], [fy, 'y'], [k, '']])}`, rectaRes([x0, y0, z0], [fr(fx), fr(fy), fr(-1)])]) },
    verif: { P: [x0, y0, z0], n: [fx, fy, -1], D, G: (x, y, z) => al * x * x + be * y * y + k0 - z, paralelo: [a, b, c] },
  };
}

export const GENERADORES_P1_PLANO = [{ id: 'plano', nombre: 'Plano tangente y recta normal', grupo: 'Cálculo', instancia: 'p1', generar: plano }];
