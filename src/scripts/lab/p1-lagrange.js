// Extremos condicionados (multiplicadores de Lagrange), aplicaciones tipo parcial: caja de superficie dada (con y sin tapa),
// distancia de un punto a un plano, volumen máximo bajo un plano, y dos problemas en el plano con hessiano orlado.
// Cada problema da F, sistema, candidato, valor y clasificación (geometría u orlado). Lógica pura.
import { fr, fSum, fMul, fVal, texF, suma } from './mate.js';
import { lineas, cases, fp, aprox } from './p1-comun.js';

const T = (txt, tex) => ({ txt, tex });
const lam = (c, cuerpo) => suma([[c, cuerpo]]); // c·cuerpo (con \cdot si hace falta)
const geomMax = (extra) => `El conjunto de puntos con x, y, z > 0 que cumplen la restricción es acotado, y V es continua y vale 0 cuando alguna arista tiende a 0 (V > 0 adentro)${extra}. Entonces V alcanza un máximo en el interior, y como el único candidato es este punto, ese es el máximo.`;

// Hessiano orlado para 2 variables y 1 restricción: >0 máximo, <0 mínimo.
function orlado(gx, gy, Lxx, Lxy, Lyy) {
  const m1 = gx * Lyy - Lxy * gy, m2 = gx * Lxy - Lxx * gy, det = -gx * m1 + gy * m2;
  return { det, lineas: [
    `\\bar H&=\\begin{vmatrix}0&${gx}&${gy}\\\\${gx}&${Lxx}&${Lxy}\\\\${gy}&${Lxy}&${Lyy}\\end{vmatrix}`,
    `&=0\\cdot ${fp(Lxx * Lyy - Lxy * Lxy)}-${fp(gx)}\\cdot ${fp(m1)}+${fp(gy)}\\cdot ${fp(m2)}`,
    `&=${det}`] };
}
const rest = (e, d) => (d === 0 ? e : `${e}${d < 0 ? '+' : '-'}${Math.abs(d)}`); // e − d

function cajaTapa(rng) {
  const k = rng.ent(2, 6), S0 = 6 * k * k;
  const pasos = [
    T('Identifico la función a maximizar y la restricción (las aristas x, y, z son positivas):', lineas([`f(x,y,z)&=xyz\\quad(\\text{volumen})`, `g(x,y,z)&=2xy+2xz+2yz=${S0}\\quad(\\text{superficie total})`])),
    T('Armo la función de Lagrange F = f − λ(g − constante):', `F(x,y,z,\\lambda)=xyz-\\lambda\\left(2xy+2xz+2yz-${S0}\\right)`),
    T('Planteo ∇F = 0 (derivadas respecto de x, y, z, λ):', cases(['F_x=yz-\\lambda\\left(2y+2z\\right)=0', 'F_y=xz-\\lambda\\left(2x+2z\\right)=0', 'F_z=xy-\\lambda\\left(2x+2y\\right)=0', `F_\\lambda=-\\left(2xy+2xz+2yz-${S0}\\right)=0`])),
    T('Multiplico la 1ª ecuación por x, la 2ª por y y la 3ª por z: los tres primeros miembros pasan a ser xyz y los segundos quedan λ por algo.', lineas(['xyz&=\\lambda\\left(2xy+2xz\\right)', 'xyz&=\\lambda\\left(2xy+2yz\\right)', 'xyz&=\\lambda\\left(2xz+2yz\\right)'])),
    T('Si λ fuera 0 sería xyz = 0 (volumen nulo, no es el máximo), así que λ ≠ 0 y puedo igualar los paréntesis de la 1ª y la 2ª:', lineas(['2xy+2xz&=2xy+2yz', '2xz&=2yz', 'x&=y\\quad(z\\neq 0)'])),
    T('Igualo ahora los paréntesis de la 1ª y la 3ª:', lineas(['2xy+2xz&=2xz+2yz', '2xy&=2yz', 'x&=z\\quad(y\\neq 0)'])),
    T('Entonces x = y = z. Reemplazo en la restricción:', lineas(['2x^{2}+2x^{2}+2x^{2}&=' + S0, `6x^{2}&=${S0}`, `x^{2}&=${k * k}`, `x&=${k}\\quad(x>0)`])),
    T('Calculo λ con la 1ª ecuación, con x = y = z = ' + k + ':', lineas([`yz&=\\lambda\\left(2y+2z\\right)`, `${k * k}&=\\lambda\\cdot ${4 * k}`, `\\lambda&=${texF(fr(k, 4))}`])),
    T('El candidato y su valor:', lineas([`\\left(x,y,z\\right)&=\\left(${k},\\ ${k},\\ ${k}\\right)`, `V&=${k}\\cdot ${k}\\cdot ${k}=${k ** 3}`])),
    T(geomMax(''), `\\text{Máximo: }V=${k ** 3}`),
  ];
  return {
    enunciado: [{ txt: `Una caja rectangular con tapa debe tener una superficie total de ${S0} cm². Usando multiplicadores de Lagrange, hallar las dimensiones que maximizan su volumen y el volumen máximo.`, tex: `V=xyz,\\qquad 2xy+2xz+2yz=${S0}` }],
    pasos,
    resultado: { tex: `x=y=z=${k}\\ \\text{cm},\\qquad V_{\\max}=${k ** 3}\\ \\text{cm}^{3}` },
    verif: { dim: 3, tipo: 'max', f: (x, y, z) => x * y * z, g: (x, y, z) => 2 * x * y + 2 * x * z + 2 * y * z, c: S0, cands: [{ p: [k, k, k], lam: k / 4 }], val: k ** 3,
      muestra: (r) => { const x = 0.1 + r() * 2 * k, y = 0.1 + r() * 2 * k, z = (S0 / 2 - x * y) / (x + y); return z > 0 ? [x, y, z] : null; } },
  };
}

function cajaSinTapa(rng) {
  const t = rng.ent(1, 5), S0 = 12 * t * t;
  const pasos = [
    T('Identifico la función a maximizar y la restricción (la caja no tiene tapa: base xy y cuatro paredes; x, y, z > 0):', lineas([`f(x,y,z)&=xyz\\quad(\\text{volumen})`, `g(x,y,z)&=xy+2xz+2yz=${S0}\\quad(\\text{superficie})`])),
    T('Armo la función de Lagrange F = f − λ(g − constante):', `F(x,y,z,\\lambda)=xyz-\\lambda\\left(xy+2xz+2yz-${S0}\\right)`),
    T('Planteo ∇F = 0:', cases(['F_x=yz-\\lambda\\left(y+2z\\right)=0', 'F_y=xz-\\lambda\\left(x+2z\\right)=0', 'F_z=xy-\\lambda\\left(2x+2y\\right)=0', `F_\\lambda=-\\left(xy+2xz+2yz-${S0}\\right)=0`])),
    T('Multiplico la 1ª ecuación por x y la 2ª por y: los dos primeros miembros pasan a ser xyz.', lineas(['xyz&=\\lambda\\left(xy+2xz\\right)', 'xyz&=\\lambda\\left(xy+2yz\\right)'])),
    T('Si λ fuera 0 sería xyz = 0, que no es el máximo; entonces λ ≠ 0 y igualo los paréntesis:', lineas(['xy+2xz&=xy+2yz', '2xz&=2yz', 'x&=y\\quad(z\\neq 0)'])),
    T('Con x = y, la 3ª ecuación queda (xy = x²) y me da λ:', lineas([`x^{2}&=\\lambda\\left(2x+2x\\right)`, `x^{2}&=4x\\lambda`, `\\lambda&=\\frac{x}{4}\\quad(x\\neq 0)`])),
    T('Reemplazo λ = x/4 en la 1ª ecuación (con y = x) para hallar z:', lineas([`xz&=\\frac{x}{4}\\left(x+2z\\right)`, `4z&=x+2z\\quad(\\text{divido por }x)`, `2z&=x`])),
    T('Entonces x = y = 2z. Reemplazo en la restricción:', lineas([`\\left(2z\\right)\\left(2z\\right)+2\\left(2z\\right)z+2\\left(2z\\right)z&=${S0}`, `4z^{2}+4z^{2}+4z^{2}&=${S0}`, `12z^{2}&=${S0}`, `z^{2}&=${t * t}`, `z&=${t}\\quad(z>0)`])),
    T('El candidato (x = y = 2z) y su valor:', lineas([`\\left(x,y,z\\right)&=\\left(${2 * t},\\ ${2 * t},\\ ${t}\\right)`, `V&=${2 * t}\\cdot ${2 * t}\\cdot ${t}=${4 * t ** 3}`])),
    T(geomMax(''), `\\text{Máximo: }V=${4 * t ** 3}`),
  ];
  return {
    enunciado: [{ txt: `Una caja rectangular sin tapa debe tener una superficie (base más cuatro paredes) de ${S0} cm². Usando multiplicadores de Lagrange, hallar las dimensiones que maximizan su volumen y el volumen máximo.`, tex: `V=xyz,\\qquad xy+2xz+2yz=${S0}` }],
    pasos,
    resultado: { tex: `x=y=${2 * t}\\ \\text{cm},\\ z=${t}\\ \\text{cm},\\qquad V_{\\max}=${4 * t ** 3}\\ \\text{cm}^{3}` },
    verif: { dim: 3, tipo: 'max', f: (x, y, z) => x * y * z, g: (x, y, z) => x * y + 2 * x * z + 2 * y * z, c: S0, cands: [{ p: [2 * t, 2 * t, t], lam: t / 2 }], val: 4 * t ** 3,
      muestra: (r) => { const x = 0.1 + r() * 4 * t, y = 0.1 + r() * 4 * t, z = (S0 - x * y) / (2 * (x + y)); return z > 0 ? [x, y, z] : null; } },
  };
}

function distanciaPlano(rng) {
  let a, b, c, P0, d0, N, num0;
  do {
    [a, b, c] = [rng.ent(-3, 3), rng.ent(-3, 3), rng.nz(3)];
    P0 = [rng.ent(-4, 4), rng.ent(-4, 4), rng.ent(-4, 4)];
    d0 = a * P0[0] + b * P0[1] + c * P0[2] + rng.nz(6);
    N = a * a + b * b + c * c; num0 = d0 - (a * P0[0] + b * P0[1] + c * P0[2]);
  } while (N < 2);
  const [x0, y0, z0] = P0;
  const t = fr(num0, N), Q = [fSum(fr(x0), fMul(t, fr(a))), fSum(fr(y0), fMul(t, fr(b))), fSum(fr(z0), fMul(t, fr(c)))];
  const d2 = fMul(fMul(t, t), fr(N)), dist = Math.abs(num0) / Math.sqrt(N);
  const plano = suma([[a, 'x'], [b, 'y'], [c, 'z']]);
  const fq = (v, p0) => (p0 === 0 ? `${v}^{2}` : `\\left(${v}${p0 < 0 ? '+' : '-'}${Math.abs(p0)}\\right)^{2}`);
  const ftex = `${fq('x', x0)}+${fq('y', y0)}+${fq('z', z0)}`;
  const dd = (v, p0) => (p0 === 0 ? '2' + v : `2\\left(${v}${p0 < 0 ? '+' : '-'}${Math.abs(p0)}\\right)`);
  const Fi = (v, p0, k) => `${dd(v, p0)}${k === 0 ? '' : (-k < 0 ? '-' : '+') + (Math.abs(k) === 1 ? '' : Math.abs(k)) + '\\lambda'}=0`;
  const despeje = (v, p0, k) => suma([[p0, ''], [fr(k, 2), '\\lambda']]);
  const xe = despeje('x', x0, a), ye = despeje('y', y0, b), ze = despeje('z', z0, c);
  const sumaP = a * x0 + b * y0 + c * z0;
  const pasos = [
    T('Minimizar la distancia equivale a minimizar su cuadrado (la raíz es creciente), que es más cómodo de derivar. Identifico f y la restricción g (el plano):', lineas([`f(x,y,z)&=${ftex}\\quad(=d^{2})`, `g(x,y,z)&=${plano}=${d0}`])),
    T('Armo la función de Lagrange F = f − λ(g − constante):', `F(x,y,z,\\lambda)=${ftex}-\\lambda\\left(${rest(plano, d0)}\\right)`),
    T('Planteo ∇F = 0:', cases([`F_x=${Fi('x', x0, a)}`, `F_y=${Fi('y', y0, b)}`, `F_z=${Fi('z', z0, c)}`, `F_\\lambda=-\\left(${rest(plano, d0)}\\right)=0`])),
    T('De las tres primeras ecuaciones despejo x, y, z en función de λ:', lineas([`x&=${xe}`, `y&=${ye}`, `z&=${ze}`])),
    T('Reemplazo en la restricción:', lineas([`${suma([[a, `\\left(${xe}\\right)`], [b, `\\left(${ye}\\right)`], [c, `\\left(${ze}\\right)`]])}&=${d0}`, `${suma([[sumaP, ''], [fr(N, 2), '\\lambda']])}&=${d0}`, `${suma([[fr(N, 2), '\\lambda']])}&=${num0}`, `\\lambda&=${texF(fr(2 * num0, N))}`])),
    T('Con ese λ calculo el punto candidato Q:', lineas([`x&=${texF(Q[0])}`, `y&=${texF(Q[1])}`, `z&=${texF(Q[2])}`])),
    T(`La distancia es la raíz de f(Q); como Q − P₀ = (λ/2)·(${a}, ${b}, ${c}), queda:`, lineas([`d&=\\sqrt{\\left(${fp(fMul(t, fr(a)))}\\right)^{2}+\\left(${fp(fMul(t, fr(b)))}\\right)^{2}+\\left(${fp(fMul(t, fr(c)))}\\right)^{2}}`, `&=\\sqrt{${texF(d2)}}`, `&=\\frac{${Math.abs(num0)}}{\\sqrt{${N}}}`, `&\\approx ${aprox(dist, 4)}`])),
    T('Clasificación por geometría: la distancia al cuadrado es continua, crece sin límite al alejarse, y el plano es un conjunto cerrado y no vacío; por eso tiene un mínimo sobre el plano. Como el único candidato es Q, ahí está el mínimo (máximo no hay).', `d_{\\min}=\\frac{${Math.abs(num0)}}{\\sqrt{${N}}}`),
  ];
  return {
    enunciado: [{ txt: `Hallar, con multiplicadores de Lagrange, el punto del plano dado más cercano a P₀=(${x0}, ${y0}, ${z0}) y la distancia de P₀ al plano:`, tex: `${plano}=${d0}` }],
    pasos,
    resultado: { tex: lineas([`Q&=\\left(${texF(Q[0])},\\ ${texF(Q[1])},\\ ${texF(Q[2])}\\right)`, `d&=\\frac{${Math.abs(num0)}}{\\sqrt{${N}}}\\approx ${aprox(dist, 4)}`]) },
    verif: { dim: 3, tipo: 'min', f: (x, y, z) => (x - x0) ** 2 + (y - y0) ** 2 + (z - z0) ** 2, g: (x, y, z) => a * x + b * y + c * z, c: d0, cands: [{ p: Q.map(fVal), lam: fVal(t) * 2 }], val: fVal(d2),
      muestra: (r) => { const x = (r() - 0.5) * 16, y = (r() - 0.5) * 16; return [x, y, (d0 - a * x - b * y) / c]; } },
  };
}

function tetraedro(rng) {
  const [p, q, s] = [rng.ent(1, 4), rng.ent(1, 4), rng.ent(1, 4)], [a, b, c] = [3 * p, 3 * q, 3 * s];
  const g = `\\frac{x}{${a}}+\\frac{y}{${b}}+\\frac{z}{${c}}`;
  const l = (k) => `\\frac{\\lambda}{${k}}`;
  const pasos = [
    T('Identifico la función a maximizar (volumen de la caja con un vértice en el origen y el opuesto en (x, y, z), con x, y, z > 0) y la restricción:', lineas([`f(x,y,z)&=xyz`, `g(x,y,z)&=${g}=1`])),
    T('Armo la función de Lagrange F = f − λ(g − constante):', `F(x,y,z,\\lambda)=xyz-\\lambda\\left(${g}-1\\right)`),
    T('Planteo ∇F = 0:', cases([`F_x=yz-${l(a)}=0`, `F_y=xz-${l(b)}=0`, `F_z=xy-${l(c)}=0`, `F_\\lambda=-\\left(${g}-1\\right)=0`])),
    T('De las tres primeras despejo λ:', lineas([`\\lambda&=${a}yz`, `\\lambda&=${b}xz`, `\\lambda&=${c}xy`])),
    T('Igualo las dos primeras y simplifico z (z ≠ 0), y luego la segunda con la tercera y simplifico x (x ≠ 0):', lineas([`${a}yz&=${b}xz`, `${a}y&=${b}x`, `y&=${suma([[fr(b, a), 'x']])}`, `${b}xz&=${c}xy`, `${b}z&=${c}y`, `z&=${suma([[fr(c, a), 'x']])}\\quad(\\text{usando }y=${suma([[fr(b, a), 'x']])})`])),
    T('Reemplazo y y z (en función de x) en la restricción:', lineas([`\\frac{x}{${a}}+\\frac{${suma([[fr(b, a), 'x']])}}{${b}}+\\frac{${suma([[fr(c, a), 'x']])}}{${c}}&=1`, `\\frac{x}{${a}}+\\frac{x}{${a}}+\\frac{x}{${a}}&=1`, `\\frac{3x}{${a}}&=1`, `x&=${p}`])),
    T('Con x obtengo y, z y λ:', lineas([`y&=${texF(fr(b, a))}\\cdot ${p}=${q}`, `z&=${texF(fr(c, a))}\\cdot ${p}=${s}`, `\\lambda&=${a}\\cdot ${q}\\cdot ${s}=${a * q * s}`])),
    T('El candidato y su valor:', lineas([`\\left(x,y,z\\right)&=\\left(${p},\\ ${q},\\ ${s}\\right)`, `V&=${p}\\cdot ${q}\\cdot ${s}=${p * q * s}`])),
    T(geomMax(' (en las caras del tetraedro la arista z, x o y se anula)'), `\\text{Máximo: }V=${p * q * s}`),
  ];
  return {
    enunciado: [{ txt: 'Una caja con aristas paralelas a los ejes tiene un vértice en el origen y el vértice opuesto (x, y, z), con x, y, z > 0, sobre el plano dado. Hallar con Lagrange su volumen máximo:', tex: `${g}=1` }],
    pasos,
    resultado: { tex: `\\left(x,y,z\\right)=\\left(${p},\\ ${q},\\ ${s}\\right),\\qquad V_{\\max}=${p * q * s}` },
    verif: { dim: 3, tipo: 'max', f: (x, y, z) => x * y * z, g: (x, y, z) => x / a + y / b + z / c, c: 1, cands: [{ p: [p, q, s], lam: a * q * s }], val: p * q * s,
      muestra: (r) => { const x = r() * a, y = r() * b, z = c * (1 - x / a - y / b); return z > 0 ? [x, y, z] : null; } },
  };
}

function productoRecta(rng) {
  const [a, b, k] = [rng.ent(1, 4), rng.ent(1, 4), rng.ent(1, 4)], c0 = 2 * a * b * k;
  const O = orlado(a, b, 0, 1, 0);
  const g = suma([[a, 'x'], [b, 'y']]);
  const pasos = [
    T('Identifico la función a maximizar y la restricción (x, y > 0):', lineas([`f(x,y)&=xy`, `g(x,y)&=${g}=${c0}`])),
    T('Armo la función de Lagrange F = f − λ(g − constante):', `F(x,y,\\lambda)=xy-\\lambda\\left(${g}-${c0}\\right)`),
    T('Planteo ∇F = 0:', cases([`F_x=y-${lam(a, '\\lambda')}=0`, `F_y=x-${lam(b, '\\lambda')}=0`, `F_\\lambda=-\\left(${g}-${c0}\\right)=0`])),
    T('De las dos primeras despejo y y x en función de λ:', lineas([`y&=${lam(a, '\\lambda')}`, `x&=${lam(b, '\\lambda')}`])),
    T('Reemplazo en la restricción:', lineas([`${suma([[a, `\\left(${lam(b, '\\lambda')}\\right)`], [b, `\\left(${lam(a, '\\lambda')}\\right)`]])}&=${c0}`, `${lam(2 * a * b, '\\lambda')}&=${c0}`, `\\lambda&=${k}`])),
    T('Candidato y valor:', lineas([`x&=${b}\\cdot ${k}=${b * k}`, `y&=${a}\\cdot ${k}=${a * k}`, `f&=${b * k}\\cdot ${a * k}=${a * b * k * k}`])),
    T('Derivadas segundas de F respecto de x e y (para el orlado), y derivadas de g:', lineas(['F_{xx}&=0', 'F_{xy}&=1', 'F_{yy}&=0', `g_x&=${a}`, `g_y&=${b}`])),
    T('Clasifico con el hessiano orlado (2 variables, 1 restricción): primera fila y columna con ceros y las derivadas de g, y el resto con las derivadas segundas de F. Determinante positivo = máximo condicionado; negativo = mínimo.', lineas(O.lineas)),
    T(`Como el determinante es ${O.det} > 0, el candidato es un máximo condicionado.`, `f_{\\max}=${a * b * k * k}`),
  ];
  return {
    enunciado: [{ txt: 'Hallar con multiplicadores de Lagrange el máximo del producto xy (x, y > 0) sobre la recta dada, y clasificarlo con el hessiano orlado:', tex: `f=xy,\\qquad ${g}=${c0}` }],
    pasos,
    resultado: { tex: `\\left(x,y\\right)=\\left(${b * k},\\ ${a * k}\\right),\\qquad f_{\\max}=${a * b * k * k}` },
    verif: { dim: 2, tipo: 'max', orlado: O.det, f: (x, y) => x * y, g: (x, y) => a * x + b * y, c: c0, cands: [{ p: [b * k, a * k], lam: k }], val: a * b * k * k,
      muestra: (r) => { const x = r() * c0 / a, y = (c0 - a * x) / b; return y > 0 ? [x, y] : null; } },
  };
}

function distanciaHiperbola(rng) {
  const m = rng.ent(1, 4), O = orlado(m, m, 2, -2, 2);
  const pasos = [
    T('Identifico la función a minimizar (cuadrado de la distancia al origen) y la restricción:', lineas([`f(x,y)&=x^{2}+y^{2}`, `g(x,y)&=xy=${m * m}`])),
    T('Armo la función de Lagrange F = f − λ(g − constante):', `F(x,y,\\lambda)=x^{2}+y^{2}-\\lambda\\left(xy-${m * m}\\right)`),
    T('Planteo ∇F = 0:', cases(['F_x=2x-\\lambda y=0', 'F_y=2y-\\lambda x=0', `F_\\lambda=-\\left(xy-${m * m}\\right)=0`])),
    T('Multiplico la 1ª por x y la 2ª por y: las dos dan λxy a un lado, y xy = ' + m * m + ' ≠ 0 por la restricción. Igualo los segundos miembros para quitar λ:', lineas(['2x^{2}&=\\lambda xy', '2y^{2}&=\\lambda xy', '2x^{2}&=2y^{2}', 'x^{2}&=y^{2}'])),
    T('Entonces y = x o y = −x. Pruebo cada caso en la restricción xy = ' + m * m + ':', lineas([`\\text{Si }y=x:\\ x^{2}&=${m * m}\\ \\Rightarrow\\ x=${m}\\ \\text{o}\\ x=${-m}`, `\\text{Si }y=-x:\\ -x^{2}&=${m * m}\\ \\Rightarrow\\ \\text{sin solución real}`])),
    T('Los candidatos y λ (de la 1ª ecuación: 2x = λy con y = x da λ = 2):', lineas([`P_{1}&=\\left(${m},\\ ${m}\\right)`, `P_{2}&=\\left(${-m},\\ ${-m}\\right)`, `\\lambda&=2`])),
    T('Valor de f en cada candidato:', lineas([`f(P_{1})&=${m}^{2}+${m}^{2}=${2 * m * m}`, `f(P_{2})&=\\left(${-m}\\right)^{2}+\\left(${-m}\\right)^{2}=${2 * m * m}`])),
    T('Derivadas para el orlado: g_x = y, g_y = x; F_xx = 2, F_xy = −λ = −2, F_yy = 2. En P₁ (y también en P₂) vale:', lineas(O.lineas)),
    T(`Como el determinante es ${O.det} < 0, ambos candidatos son mínimos condicionados (por simetría P₂ da lo mismo).`, `f_{\\min}=${2 * m * m}`),
  ];
  return {
    enunciado: [{ txt: 'Hallar con multiplicadores de Lagrange los puntos de la hipérbola xy = m² más cercanos al origen (minimizar x² + y²) y clasificarlos con el hessiano orlado:', tex: `xy=${m * m}` }],
    pasos,
    resultado: { tex: `P_{1}=\\left(${m},\\ ${m}\\right),\\ P_{2}=\\left(${-m},\\ ${-m}\\right),\\qquad f_{\\min}=${2 * m * m}` },
    verif: { dim: 2, tipo: 'min', orlado: O.det, f: (x, y) => x * x + y * y, g: (x, y) => x * y, c: m * m, cands: [{ p: [m, m], lam: 2 }, { p: [-m, -m], lam: 2 }], val: 2 * m * m,
      muestra: (r) => { const x = (r() - 0.5) * 12; return Math.abs(x) < 0.05 ? null : [x, (m * m) / x]; } },
  };
}

function lagrange(rng) {
  const e = rng.elegir([cajaTapa, cajaSinTapa, distanciaPlano, tetraedro, productoRecta, distanciaHiperbola]);
  return e(rng);
}

export const GENERADORES_P1_LAGRANGE = [{ id: 'lagrange', nombre: 'Lagrange (extremos condicionados)', grupo: 'Cálculo', instancia: 'p1', generar: lagrange }];
