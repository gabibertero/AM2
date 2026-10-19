// Derivada implícita, cinco formas: z(x,y) de F(x,y,z)=0; dy/dx de g(x,y)=0; una ecuación con tres letras y "y = f₁(x), z = f₂(x)"
// (cada derivada con la otra variable fija, también con arctg donde el factor 1/(1+u²) se cancela); y sistema de dos ecuaciones con
// jacobianos (filas = funciones, columnas = variables). Se pide siempre F(P) = 0 y la derivada de la variable dependiente ≠ 0. Lógica pura.
import { fr, fSum, fMul, fNeg, fVal, texF, suma } from './mate.js';
import { lineas, num, superficie, p3, p3Tex, p3D, p3Ev, p3Fr, p3Sub } from './p1-comun.js';

const par = (f) => (f.n < 0 ? `\\left(${num(f)}\\right)` : num(f));
const frac = (t, d) => (t.n === 0 ? '0' : `-\\frac{${par(t)}}{${par(d)}}`); // el signo menos y el del numerador a la vista
const cociente = (nombre, t, d, v) => [`${nombre}&=${frac(t, d)}`, ...(frac(t, d) === num(v) ? [] : [`&=${num(v)}`])];

// F'_z(P) = 0: la hipótesis del teorema falla y no se puede derivar z(x,y) con el cociente −F'_x/F'_z.
function sinTeorema(S) {
  const [x0, y0, z0] = S.P, nom = ['x', 'y', 'z'];
  return {
    enunciado: [{ txt: `Analizar si la ecuación define implícitamente a z como función de x e y cerca del punto P=(${x0}, ${y0}, ${z0}) (verificar antes que P cumple la ecuación). Si se puede, calcular las derivadas parciales de z en (${x0}, ${y0}); si no, explicar por qué:`, tex: `${S.Ftex}=0` }],
    pasos: [
      { txt: `Verifico que el punto P=(${x0}, ${y0}, ${z0}) pertenece a la superficie, reemplazando en F:`, tex: lineas([`F(P)&=${S.FPsub}`, '&=0']) },
      { txt: 'Calculo las derivadas parciales de F respecto de cada variable (z se trata como una variable más):', tex: lineas(nom.map((v, i) => `F'_${v}&=${S.Gen[i]}`)) },
      { txt: 'Las evalúo en P:', tex: lineas(nom.flatMap((v, i) => [`F'_${v}(P)&=${S.Sub[i]}`, `&=${num(S.val[i])}`])) },
      { txt: "El teorema de la función implícita pide F'_z(P) ≠ 0 para poder despejar z = z(x,y) cerca de P. Acá F'_z(P) = 0, así que NO se puede aplicar el teorema en P: no se puede asegurar que la ecuación defina a z como función de x e y en un entorno de P, y no vale usar z'_x = −F'_x/F'_z (dividiría por 0). Eso no prueba que z(x,y) no exista, solo que este teorema no lo garantiza.", tex: "F'_z(P)=0" },
    ],
    resultado: { txt: 'No se puede aplicar el teorema de la función implícita en P:', tex: "F'_z(P)=0\ \Rightarrow\ \text{no se garantiza }z=z(x,y)" },
    verif: { modo: 'cero', F: S.Fn, P: S.P, val: S.val.map(fVal) },
  };
}

function superficieZ(rng) {
  const S = superficie(rng, rng() < 0.2), [x0, y0, z0] = S.P, [Fx, Fy, Fz] = S.val;
  if (Fz.n === 0) return sinTeorema(S);
  const zx = fr(-Fx.n * Fz.d, Fx.d * Fz.n), zy = fr(-Fy.n * Fz.d, Fy.d * Fz.n);
  const nom = ['x', 'y', 'z'];
  const pasos = [
    { txt: `Verifico que el punto P=(${x0}, ${y0}, ${z0}) pertenece a la superficie, reemplazando en F:`, tex: lineas([`F(P)&=${S.FPsub}`, '&=0']) },
    { txt: 'Calculo las derivadas parciales de F respecto de cada variable (z se trata como una variable más, todavía no es función de x e y):', tex: lineas(nom.map((v, i) => `F'_${v}&=${S.Gen[i]}`)) },
    { txt: 'Las evalúo en P:', tex: lineas(nom.flatMap((v, i) => [`F'_${v}(P)&=${S.Sub[i]}`, `&=${num(S.val[i])}`])) },
    { txt: `F es de clase C¹ cerca de P, F(P) = 0 y F'_z(P) = ${num(Fz)} ≠ 0. Por el teorema de la función implícita, la ecuación F(x,y,z) = 0 define z = z(x,y) en un entorno de (${x0}, ${y0}), con z(${x0}, ${y0}) = ${z0}.`, tex: `F'_z(P)=${num(Fz)}\\neq 0` },
    { txt: "Derivo F(x, y, z(x,y)) = 0 respecto de x con la regla de la cadena (y es constante, z depende de x), y lo mismo respecto de y; después despejo (F'_z ≠ 0):", tex: lineas(["F'_x+F'_z\\,z'_x&=0", "z'_x&=-\\frac{F'_x}{F'_z}", "F'_y+F'_z\\,z'_y&=0", "z'_y&=-\\frac{F'_y}{F'_z}"]) },
    { txt: 'Reemplazo los valores de las derivadas en P:', tex: lineas([...cociente(`z'_x(${x0},${y0})`, Fx, Fz, zx), ...cociente(`z'_y(${x0},${y0})`, Fy, Fz, zy)]) },
    { txt: 'Control: F(P) = 0 se cumple, y con dF = F\'_x dx + F\'_y dy + F\'_z dz = 0 sale el mismo cociente.', tex: `dz=${suma([[zx, "\\,dx"], [zy, "\\,dy"]])}` },
  ];
  return {
    enunciado: [{ txt: `La ecuación define implícitamente a z como función de x e y cerca del punto P=(${x0}, ${y0}, ${z0}). Verificar que P cumple la ecuación y calcular las derivadas parciales de z en (${x0}, ${y0}):`, tex: `${S.Ftex}=0` }],
    pasos,
    resultado: { tex: lineas([`z'_x(${x0},${y0})&=${num(zx)}`, `z'_y(${x0},${y0})&=${num(zy)}`]) },
    verif: { modo: 'sup', F: S.Fn, P: S.P, zx: fVal(zx), zy: fVal(zy), val: S.val.map(fVal) },
  };
}

// g(x,y) = 0 define y = y(x): dy/dx = −g'_x/g'_y.
function curva(rng) {
  const POOL = [[2, 0], [0, 2], [1, 1], [3, 0], [0, 3], [2, 1], [1, 2], [1, 0], [0, 1]];
  for (;;) {
    const ms = [];
    while (ms.length < 3) { const m = rng.elegir(POOL); if (!ms.some((t) => t.join() === m.join())) ms.push(m); }
    const P = [rng.nz(2), rng.nz(2), 0];
    let g = p3(ms.map(([i, j]) => [rng.nz(3), i, j, 0]));
    g = p3([...g, [fNeg(p3Fr(g, ...P)), 0, 0, 0]]);
    const gx = p3D(g, 0), gy = p3D(g, 1), a = p3Fr(gx, ...P), b = p3Fr(gy, ...P);
    if (b.n === 0 || !g.some((t) => t[2] > 0)) continue;
    const dy = fr(-a.n * b.d, a.d * b.n), [x0, y0] = P;
    const pasos = [
      { txt: `Verifico que P=(${x0}, ${y0}) cumple la ecuación:`, tex: lineas([`g(P)&=${p3Sub(g, P)}`, '&=0']) },
      { txt: 'Calculo las derivadas parciales de g (y se trata como una variable más, todavía no es función de x):', tex: lineas([`g'_x&=${p3Tex(gx)}`, `g'_y&=${p3Tex(gy)}`]) },
      { txt: 'Las evalúo en P:', tex: lineas([`g'_x(P)&=${p3Sub(gx, P)}`, `&=${num(a)}`, `g'_y(P)&=${p3Sub(gy, P)}`, `&=${num(b)}`]) },
      { txt: `g es de clase C¹ cerca de P, g(P) = 0 y g'_y(P) = ${num(b)} ≠ 0. Por el teorema de la función implícita, la ecuación define y = y(x) en un entorno de x = ${x0}. Derivo g(x, y(x)) = 0 con la regla de la cadena y despejo:`, tex: lineas(["g'_x+g'_y\\,y'&=0", "y'&=-\\frac{g'_x}{g'_y}"]) },
      { txt: 'Reemplazo los valores en P:', tex: lineas(cociente(`y'(${x0})`, a, b, dy)) },
    ];
    return {
      enunciado: [{ txt: `La ecuación define implícitamente a y como función de x cerca del punto P=(${x0}, ${y0}). Verificar que P cumple la ecuación y calcular dy/dx en x=${x0}:`, tex: `${p3Tex(g)}=0` }],
      pasos,
      resultado: { tex: `\\frac{dy}{dx}\\left(${x0}\\right)=${num(dy)}` },
      verif: { modo: 'curva', F: (x, y) => p3Ev(g, x, y), P: [x0, y0], dydx: fVal(dy) },
    };
  }
}

// Una ecuación con tres letras: y = f₁(x) con z constante, z = f₂(x) con y constante (polinómica/ln/exp, o arctg con 1/(1+u²) que se cancela).
function unaEcuacion(rng) {
  if (rng() < 0.35) return arctg(rng);
  let S;
  do S = superficie(rng); while (S.val[1].n === 0);
  const [x0, y0, z0] = S.P, [Fx, Fy, Fz] = S.val;
  const dy = fr(-Fx.n * Fy.d, Fx.d * Fy.n), dz = fr(-Fx.n * Fz.d, Fx.d * Fz.n);
  const nom = ['x', 'y', 'z'];
  const pasos = [
    { txt: `Verifico que P=(${x0}, ${y0}, ${z0}) cumple la ecuación:`, tex: lineas([`F(P)&=${S.FPsub}`, '&=0']) },
    { txt: 'Calculo las tres derivadas parciales de F (en cada una las otras dos variables son constantes):', tex: lineas(nom.map((v, i) => `F'_${v}&=${S.Gen[i]}`)) },
    { txt: 'Las evalúo en P:', tex: lineas(nom.flatMap((v, i) => [`F'_${v}(P)&=${S.Sub[i]}`, `&=${num(S.val[i])}`])) },
    { txt: "Se calculan por separado: para dy/dx la variable z queda fija (se deriva F(x, y(x), z) = 0), y para dz/dx la variable y queda fija. Con la regla de la cadena y despejando (F'_y ≠ 0 y F'_z ≠ 0):", tex: lineas(["F'_x+F'_y\\,y'&=0\\ \\Rightarrow\\ \\frac{dy}{dx}=-\\frac{F'_x}{F'_y}\\quad(z\\text{ fija})", "F'_x+F'_z\\,z'&=0\\ \\Rightarrow\\ \\frac{dz}{dx}=-\\frac{F'_x}{F'_z}\\quad(y\\text{ fija})"]) },
    { txt: 'Reemplazo los valores en P:', tex: lineas([...cociente('\\frac{dy}{dx}', Fx, Fy, dy), ...cociente('\\frac{dz}{dx}', Fx, Fz, dz)]) },
  ];
  return {
    enunciado: [{ txt: `La ecuación vincula x, y, z cerca de P=(${x0}, ${y0}, ${z0}). Siendo y = f₁(x) (con z constante) y z = f₂(x) (con y constante), calcular dy/dx y dz/dx en P:`, tex: `${S.Ftex}=0` }],
    pasos,
    resultado: { tex: lineas([`\\frac{dy}{dx}&=${num(dy)}`, `\\frac{dz}{dx}&=${num(dz)}`]) },
    verif: { modo: 'yz', F: S.Fn, P: S.P, dydx: fVal(dy), dzdx: fVal(dz) },
  };
}

const pw = (v, e) => (e === 0 ? '' : e === 1 ? v : `${v}^{${e}}`);
function arctg(rng) {
  const e = [rng.ent(1, 3), rng.ent(1, 3), rng.ent(1, 3)];
  const cand = [];
  for (const s of [[1, 1, 1], [-1, 1, 1], [1, -1, 1], [1, 1, -1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1], [-1, -1, -1]]) if (s.reduce((p, v, i) => p * v ** e[i], 1) === 1) cand.push(s);
  const P = rng.elegir(cand);
  const u = `${pw('x', e[0])}${pw('y', e[1])}${pw('z', e[2])}`;
  const der = (i) => { const q = [...e]; q[i]--; return `${e[i] === 1 ? '' : e[i]}${pw('x', q[0])}${pw('y', q[1])}${pw('z', q[2])}` || '1'; };
  const dnum = [0, 1, 2].map((i) => der(i));
  const dyv = fr(-e[0] * P[1], e[1] * P[0]), dzv = fr(-e[0] * P[2], e[2] * P[0]);
  const [x0, y0, z0] = P;
  const pasos = [
    { txt: `Verifico que P=(${x0}, ${y0}, ${z0}) cumple la ecuación: lo de adentro de la arctg vale 1 en P y arctg 1 = π/4.`, tex: lineas([`F(P)&=\\operatorname{arctg}\\left(1\\right)-\\frac{\\pi}{4}`, '&=0']) },
    { txt: 'Llamo u = x^a y^b z^c a lo de adentro de la arctg. Las tres derivadas parciales de F llevan el mismo factor 1/(1 + u²):', tex: lineas([`u&=${u}`, `F'_x&=\\frac{${dnum[0]}}{1+u^{2}}`, `F'_y&=\\frac{${dnum[1]}}{1+u^{2}}`, `F'_z&=\\frac{${dnum[2]}}{1+u^{2}}`]) },
    { txt: "Para dy/dx (z fija) y dz/dx (y fija) hay que hacer los cocientes −F'_x/F'_y y −F'_x/F'_z: el factor común 1/(1 + u²) se cancela y no hace falta evaluarlo.", tex: lineas([`\\frac{dy}{dx}&=-\\frac{F'_x}{F'_y}=-\\frac{${dnum[0]}}{${dnum[1]}}`, `\\frac{dz}{dx}&=-\\frac{F'_x}{F'_z}=-\\frac{${dnum[0]}}{${dnum[2]}}`]) },
    { txt: `Simplifico los cocientes (se van las potencias comunes) y reemplazo P:`, tex: lineas([`\\frac{dy}{dx}&=-${e[0] === e[1] ? '' : `\\frac{${e[0]}}{${e[1]}}\\cdot `}\\frac{y}{x}=${texF(dyv)}`, `\\frac{dz}{dx}&=-${e[0] === e[2] ? '' : `\\frac{${e[0]}}{${e[2]}}\\cdot `}\\frac{z}{x}=${texF(dzv)}`]) },
  ];
  return {
    enunciado: [{ txt: `La ecuación vincula x, y, z cerca de P=(${x0}, ${y0}, ${z0}). Siendo y = f₁(x) (con z constante) y z = f₂(x) (con y constante), calcular dy/dx y dz/dx en P:`, tex: `\\operatorname{arctg}\\left(${u}\\right)=\\frac{\\pi}{4}` }],
    pasos,
    resultado: { tex: lineas([`\\frac{dy}{dx}&=${texF(dyv)}`, `\\frac{dz}{dx}&=${texF(dzv)}`]) },
    verif: { modo: 'arctg', F: (x, y, z) => Math.atan(x ** e[0] * y ** e[1] * z ** e[2]) - Math.PI / 4, P, dydx: fVal(dyv), dzdx: fVal(dzv) },
  };
}

// Sistema g1 = 0, g2 = 0 que define y(x), z(x): dy/dx = −∂(g1,g2)/∂(x,z) / ∂(g1,g2)/∂(y,z), dz/dx = −∂(g1,g2)/∂(y,x) / ∂(g1,g2)/∂(y,z).
function sistema(rng) {
  const POOL = [[2, 0, 0], [0, 2, 0], [0, 0, 2], [1, 1, 0], [1, 0, 1], [0, 1, 1], [1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 1]];
  for (;;) {
    const P = [rng.nz(2), rng.nz(2), rng.nz(2)];
    const mk = (n) => {
      const ms = [];
      while (ms.length < n) { const m = rng.elegir(POOL); if (!ms.some((t) => t.join() === m.join())) ms.push(m); }
      const q = p3(ms.map((m) => [rng.nz(3), ...m]));
      return p3([...q, [fNeg(p3Fr(q, ...P)), 0, 0, 0]]);
    };
    const g = [mk(3), mk(rng.ent(2, 3))];
    const J = g.map((q) => [0, 1, 2].map((v) => p3Fr(p3D(q, v), ...P)));
    const det = (c1, c2) => fSum(fMul(J[0][c1], J[1][c2]), fNeg(fMul(J[0][c2], J[1][c1])));
    const Den = det(1, 2), Ny = det(0, 2), Nz = det(1, 0);
    if (Den.n === 0 || (Ny.n === 0 && Nz.n === 0)) continue;
    const dy = fr(-Ny.n * Den.d, Ny.d * Den.n), dz = fr(-Nz.n * Den.d, Nz.d * Den.n);
    const [x0, y0, z0] = P;
    const D = [[0, 1, 2].map((v) => p3Tex(p3D(g[0], v))), [0, 1, 2].map((v) => p3Tex(p3D(g[1], v)))];
    const mat = (c1, c2) => `\\begin{vmatrix}${J[0][c1].n === 0 ? 0 : num(J[0][c1])}&${num(J[0][c2])}\\\\${num(J[1][c1])}&${num(J[1][c2])}\\end{vmatrix}`;
    const jac = (a, b) => `\\frac{\\partial\\left(g_{1},g_{2}\\right)}{\\partial\\left(${a},${b}\\right)}`;
    const nm = ['x', 'y', 'z'];
    const pasos = [
      { txt: `Verifico que P=(${x0}, ${y0}, ${z0}) cumple las dos ecuaciones:`, tex: lineas([`g_{1}(P)&=${p3Sub(g[0], P)}=0`, `g_{2}(P)&=${p3Sub(g[1], P)}=0`]) },
      { txt: "Calculo las derivadas parciales de g₁ y g₂ respecto de x, y, z:", tex: lineas([0, 1].flatMap((k) => nm.map((v, i) => `g'_{${k + 1}${v}}&=${D[k][i]}`))) },
      { txt: 'Las evalúo en P y armo la matriz jacobiana (filas = funciones g₁ y g₂, columnas = variables x, y, z):', tex: `\\begin{pmatrix}${num(J[0][0])}&${num(J[0][1])}&${num(J[0][2])}\\\\${num(J[1][0])}&${num(J[1][1])}&${num(J[1][2])}\\end{pmatrix}` },
      { txt: `El jacobiano respecto de las variables dependientes y, z es ∂(g₁,g₂)/∂(y,z) = ${num(Den)} ≠ 0, así que por el teorema de la función implícita para sistemas el sistema define y = y(x), z = z(x) cerca de P. Derivo ambas ecuaciones respecto de x (regla de la cadena) y queda un sistema lineal en y' y z', que se resuelve con Cramer. El denominador es siempre ∂(g₁,g₂)/∂(y,z):`, tex: lineas([`g'_{1x}+g'_{1y}\\,y'+g'_{1z}\\,z'&=0`, `g'_{2x}+g'_{2y}\\,y'+g'_{2z}\\,z'&=0`, `\\frac{dy}{dx}&=-\\frac{${jac('x', 'z')}}{${jac('y', 'z')}}`, `\\frac{dz}{dx}&=-\\frac{${jac('y', 'x')}}{${jac('y', 'z')}}`]) },
      { txt: 'Calculo los tres determinantes en P (cada uno con las columnas en el orden que indica el jacobiano):', tex: lineas([`${jac('y', 'z')}&=${mat(1, 2)}=${num(Den)}`, `${jac('x', 'z')}&=${mat(0, 2)}=${num(Ny)}`, `${jac('y', 'x')}&=${mat(1, 0)}=${num(Nz)}`]) },
      { txt: 'Reemplazo en los cocientes:', tex: lineas([...cociente('\\frac{dy}{dx}', Ny, Den, dy), ...cociente('\\frac{dz}{dx}', Nz, Den, dz)]) },
    ];
    return {
      enunciado: [{ txt: `El sistema define y = y(x) y z = z(x) cerca del punto P=(${x0}, ${y0}, ${z0}). Verificar que P cumple las dos ecuaciones y calcular dy/dx y dz/dx en P (usando jacobianos):`, tex: `\\begin{cases}${p3Tex(g[0])}=0\\\\${p3Tex(g[1])}=0\\end{cases}` }],
      pasos,
      resultado: { tex: lineas([`\\frac{dy}{dx}&=${num(dy)}`, `\\frac{dz}{dx}&=${num(dz)}`]) },
      verif: { modo: 'sistema', g1: (x, y, z) => p3Ev(g[0], x, y, z), g2: (x, y, z) => p3Ev(g[1], x, y, z), P, dydx: fVal(dy), dzdx: fVal(dz), den: fVal(Den) },
    };
  }
}

function implicita(rng) {
  return rng.elegir([superficieZ, superficieZ, curva, unaEcuacion, sistema, sistema])(rng);
}

export const GENERADORES_P1_IMPLICITA = [{ id: 'implicita', nombre: 'Derivada implícita', grupo: 'Cálculo', instancia: 'p1', generar: implicita }];
