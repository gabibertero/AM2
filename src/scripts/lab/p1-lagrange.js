// Extremos condicionados (multiplicadores de Lagrange), aplicaciones tipo parcial: caja de superficie o de volumen dado (con y sin tapa),
// distancia de un punto a un plano, caja bajo un plano general o tangente (pide V o S), circunferencia con varios candidatos y
// dos problemas en el plano con hessiano orlado. Notación de cátedra: ligadura φ = 0, F = f − λφ, F'_x. Lógica pura.
import { fr, fSum, fMul, fVal, texF, suma } from './mate.js';
import { lineas, cases, fp, aprox, raiz } from './p1-comun.js';

const T = (txt, tex) => ({ txt, tex });
const lam = (c, cuerpo) => suma([[c, cuerpo]]); // c·cuerpo (con \cdot si hace falta)
const rest = (e, d) => (d === 0 ? e : `${e}${d < 0 ? '+' : '-'}${Math.abs(d)}`); // e − d
const mcm = (a, b) => { let m = a; while (m % b) m += a; return m; };
const FUNC = 'Armo la función de Lagrange F = f − λφ (con la ligadura ya escrita como φ = 0):';

// Argumentos de existencia del extremo (cada uno vale para su tipo de problema, no es un texto único).
const existeMaxCaja = (cota) => `Existe un máximo: V = xyz es continua y positiva en el interior (x, y, z > 0); ${cota}, así que V² = (xy)·(xz)·(yz) está acotado; y V tiende a 0 cuando alguna arista tiende a 0 o a ∞ (si una crece, las otras dos tienden a 0 porque los productos están acotados). Entonces V alcanza su máximo en el interior y, como el único candidato es este punto, es el máximo.`;
const existeMaxTriangulo = 'La parte del plano con x, y, z ≥ 0 es un triángulo cerrado y acotado; V es continua, vale 0 en el borde (alguna arista nula) y es positiva adentro. Entonces V alcanza su máximo en el interior y, como el único candidato es este punto, es el máximo.';
const existeMinCaja = 'Existe un mínimo: S es continua y positiva, y tiende a ∞ cuando alguna arista tiende a 0 o a ∞ (como xyz es fijo, (xy)·(yz)·(xz) = V₀² y algún producto de dos aristas, que aparece en S, crece sin límite). Entonces S alcanza su mínimo en el interior y, como el único candidato es este punto, es el mínimo.';

// Hessiano orlado para 2 variables y 1 restricción: >0 máximo, <0 mínimo.
function orlado(gx, gy, Lxx, Lxy, Lyy) {
  const m1 = gx * Lyy - Lxy * gy, m2 = gx * Lxy - Lxx * gy, det = -gx * m1 + gy * m2;
  return { det, lineas: [
    `\\bar H&=\\begin{vmatrix}0&${gx}&${gy}\\\\${gx}&${Lxx}&${Lxy}\\\\${gy}&${Lxy}&${Lyy}\\end{vmatrix}`,
    `&=0\\cdot ${fp(Lxx * Lyy - Lxy * Lxy)}-${fp(gx)}\\cdot ${fp(m1)}+${fp(gy)}\\cdot ${fp(m2)}`,
    `&=${det}`] };
}

function cajaTapa(rng) {
  const k = rng.ent(2, 6), S0 = 6 * k * k;
  const pasos = [
    T('Identifico la función a maximizar y la ligadura (las aristas x, y, z son positivas):', lineas([`f(x,y,z)&=xyz\\quad(\\text{volumen})`, `\\varphi(x,y,z)&=2xy+2xz+2yz-${S0}=0\\quad(\\text{superficie total }${S0})`])),
    T(FUNC, `F(x,y,z,\\lambda)=xyz-\\lambda\\left(2xy+2xz+2yz-${S0}\\right)`),
    T('Planteo ∇F = 0 (derivadas respecto de x, y, z, λ):', cases(["F'_x=yz-\\lambda\\left(2y+2z\\right)=0", "F'_y=xz-\\lambda\\left(2x+2z\\right)=0", "F'_z=xy-\\lambda\\left(2x+2y\\right)=0", `F'_{\\lambda}=-\\left(2xy+2xz+2yz-${S0}\\right)=0`])),
    T('Multiplico la 1ª ecuación por x, la 2ª por y y la 3ª por z: los tres primeros miembros pasan a ser xyz y los segundos quedan λ por algo.', lineas(['xyz&=\\lambda\\left(2xy+2xz\\right)', 'xyz&=\\lambda\\left(2xy+2yz\\right)', 'xyz&=\\lambda\\left(2xz+2yz\\right)'])),
    T('Si λ fuera 0 sería xyz = 0 (volumen nulo, no es el máximo), así que λ ≠ 0 y puedo igualar los paréntesis de la 1ª y la 2ª:', lineas(['2xy+2xz&=2xy+2yz', '2xz&=2yz', 'x&=y\\quad(z\\neq 0)'])),
    T('Igualo ahora los paréntesis de la 1ª y la 3ª:', lineas(['2xy+2xz&=2xz+2yz', '2xy&=2yz', 'x&=z\\quad(y\\neq 0)'])),
    T('Entonces x = y = z. Reemplazo en la ligadura:', lineas(['2x^{2}+2x^{2}+2x^{2}&=' + S0, `6x^{2}&=${S0}`, `x^{2}&=${k * k}`, `x&=${k}\\quad(x>0)`])),
    T('Calculo λ con la 1ª ecuación, con x = y = z = ' + k + ':', lineas([`yz&=\\lambda\\left(2y+2z\\right)`, `${k * k}&=\\lambda\\cdot ${4 * k}`, `\\lambda&=${texF(fr(k, 4))}`])),
    T('El candidato y su valor:', lineas([`\\left(x,y,z\\right)&=\\left(${k},\\ ${k},\\ ${k}\\right)`, `V&=${k}\\cdot ${k}\\cdot ${k}=${k ** 3}`])),
    T(existeMaxCaja(`como 2xy + 2xz + 2yz = ${S0}, cada producto xy, xz, yz es menor que ${S0 / 2}`), `\\text{Máximo: }V=${k ** 3}`),
  ];
  return {
    enunciado: [{ txt: `Una caja rectangular con tapa debe tener una superficie total de ${S0} cm². Usando multiplicadores de Lagrange, hallar las dimensiones que maximizan su volumen y el volumen máximo.`, tex: `V=xyz,\\qquad 2xy+2xz+2yz=${S0}` }],
    pasos,
    resultado: { tex: `x=y=z=${k}\\ \\text{cm},\\qquad V_{\\max}=${k ** 3}\\ \\text{cm}^{3}` },
    verif: { dim: 3, tipo: 'max', f: (x, y, z) => x * y * z, g: (x, y, z) => 2 * x * y + 2 * x * z + 2 * y * z, c: S0, cands: [{ p: [k, k, k], lam: k / 4, val: k ** 3 }], val: k ** 3,
      muestra: (r) => { const x = 0.1 + r() * 2 * k, y = 0.1 + r() * 2 * k, z = (S0 / 2 - x * y) / (x + y); return z > 0 ? [x, y, z] : null; } },
  };
}

function cajaSinTapa(rng) {
  const t = rng.ent(1, 5), S0 = 12 * t * t;
  const pasos = [
    T('Identifico la función a maximizar y la ligadura (la caja no tiene tapa: base xy y cuatro paredes; x, y, z > 0):', lineas([`f(x,y,z)&=xyz\\quad(\\text{volumen})`, `\\varphi(x,y,z)&=xy+2xz+2yz-${S0}=0\\quad(\\text{superficie }${S0})`])),
    T(FUNC, `F(x,y,z,\\lambda)=xyz-\\lambda\\left(xy+2xz+2yz-${S0}\\right)`),
    T('Planteo ∇F = 0:', cases(["F'_x=yz-\\lambda\\left(y+2z\\right)=0", "F'_y=xz-\\lambda\\left(x+2z\\right)=0", "F'_z=xy-\\lambda\\left(2x+2y\\right)=0", `F'_{\\lambda}=-\\left(xy+2xz+2yz-${S0}\\right)=0`])),
    T('Multiplico la 1ª ecuación por x y la 2ª por y: los dos primeros miembros pasan a ser xyz.', lineas(['xyz&=\\lambda\\left(xy+2xz\\right)', 'xyz&=\\lambda\\left(xy+2yz\\right)'])),
    T('Si λ fuera 0 sería xyz = 0, que no es el máximo; entonces λ ≠ 0 y igualo los paréntesis:', lineas(['xy+2xz&=xy+2yz', '2xz&=2yz', 'x&=y\\quad(z\\neq 0)'])),
    T('Con x = y, la 3ª ecuación queda (xy = x²) y me da λ:', lineas([`x^{2}&=\\lambda\\left(2x+2x\\right)`, `x^{2}&=4x\\lambda`, `\\lambda&=\\frac{x}{4}\\quad(x\\neq 0)`])),
    T('Reemplazo λ = x/4 en la 1ª ecuación (con y = x) para hallar z:', lineas([`xz&=\\frac{x}{4}\\left(x+2z\\right)`, `4z&=x+2z\\quad(\\text{divido por }x)`, `2z&=x`])),
    T('Entonces x = y = 2z. Reemplazo en la ligadura:', lineas([`\\left(2z\\right)\\left(2z\\right)+2\\left(2z\\right)z+2\\left(2z\\right)z&=${S0}`, `4z^{2}+4z^{2}+4z^{2}&=${S0}`, `12z^{2}&=${S0}`, `z^{2}&=${t * t}`, `z&=${t}\\quad(z>0)`])),
    T('El candidato (x = y = 2z) y su valor:', lineas([`\\left(x,y,z\\right)&=\\left(${2 * t},\\ ${2 * t},\\ ${t}\\right)`, `V&=${2 * t}\\cdot ${2 * t}\\cdot ${t}=${4 * t ** 3}`])),
    T(existeMaxCaja(`como xy + 2xz + 2yz = ${S0}, cada producto xy, xz, yz es menor que ${S0}`), `\\text{Máximo: }V=${4 * t ** 3}`),
  ];
  return {
    enunciado: [{ txt: `Una caja rectangular sin tapa debe tener una superficie (base más cuatro paredes) de ${S0} cm². Usando multiplicadores de Lagrange, hallar las dimensiones que maximizan su volumen y el volumen máximo.`, tex: `V=xyz,\\qquad xy+2xz+2yz=${S0}` }],
    pasos,
    resultado: { tex: `x=y=${2 * t}\\ \\text{cm},\\ z=${t}\\ \\text{cm},\\qquad V_{\\max}=${4 * t ** 3}\\ \\text{cm}^{3}` },
    verif: { dim: 3, tipo: 'max', f: (x, y, z) => x * y * z, g: (x, y, z) => x * y + 2 * x * z + 2 * y * z, c: S0, cands: [{ p: [2 * t, 2 * t, t], lam: t / 2, val: 4 * t ** 3 }], val: 4 * t ** 3,
      muestra: (r) => { const x = 0.1 + r() * 4 * t, y = 0.1 + r() * 4 * t, z = (S0 - x * y) / (2 * (x + y)); return z > 0 ? [x, y, z] : null; } },
  };
}

// Caja de volumen fijo con superficie mínima (el ejemplo central del machete), con y sin tapa.
function cajaVolumenFijo(rng) {
  const tapa = rng() < 0.5;
  const q = tapa ? rng.ent(2, 5) : rng.ent(1, 4), V0 = tapa ? q ** 3 : 4 * q ** 3;
  const S = tapa ? 2 : 1; // coeficiente de xy en la superficie
  const sup = tapa ? '2xy+2xz+2yz' : 'xy+2xz+2yz';
  const Smin = tapa ? 6 * q * q : 12 * q * q;
  const pasos = [
    T(`Identifico la función a minimizar (superficie ${tapa ? 'total, con tapa' : 'de una caja sin tapa: base más cuatro paredes'}) y la ligadura (el volumen es fijo; x, y, z > 0):`, lineas([`f(x,y,z)&=${sup}`, `\\varphi(x,y,z)&=xyz-${V0}=0`])),
    T(FUNC, `F(x,y,z,\\lambda)=${sup}-\\lambda\\left(xyz-${V0}\\right)`),
    T('Planteo ∇F = 0:', cases([`F'_x=${tapa ? '2y+2z' : 'y+2z'}-\\lambda yz=0`, `F'_y=${tapa ? '2x+2z' : 'x+2z'}-\\lambda xz=0`, `F'_z=${tapa ? '2x+2y' : '2x+2y'}-\\lambda xy=0`, `F'_{\\lambda}=-\\left(xyz-${V0}\\right)=0`])),
    T('Multiplico la 1ª ecuación por x, la 2ª por y y la 3ª por z: los tres segundos miembros pasan a ser λxyz.', lineas([`${S === 2 ? '2xy+2xz' : 'xy+2xz'}&=\\lambda xyz`, `${S === 2 ? '2xy+2yz' : 'xy+2yz'}&=\\lambda xyz`, `2xz+2yz&=\\lambda xyz`])),
    ...(tapa ? [
      T('Igualo la 1ª con la 2ª y la 1ª con la 3ª, y simplifico (las aristas son positivas):', lineas(['2xy+2xz&=2xy+2yz', '2xz&=2yz', 'x&=y\\quad(z\\neq 0)', '2xy+2xz&=2xz+2yz', '2xy&=2yz', 'x&=z\\quad(y\\neq 0)'])),
      T('Entonces x = y = z. Reemplazo en la ligadura:', lineas(['x^{3}&=' + V0, `x&=${q}`])),
      T('Calculo λ con la 1ª ecuación multiplicada por x:', lineas([`2xy+2xz&=\\lambda xyz`, `${4 * q * q}&=\\lambda\\cdot ${V0}`, `\\lambda&=${texF(fr(4, q))}`])),
    ] : [
      T('Igualo la 1ª con la 2ª, y la 1ª con la 3ª, simplificando (las aristas son positivas):', lineas(['xy+2xz&=xy+2yz', '2xz&=2yz', 'x&=y\\quad(z\\neq 0)', 'xy+2xz&=2xz+2yz', 'xy&=2yz', 'x&=2z\\quad(y\\neq 0)'])),
      T('Entonces x = y = 2z. Reemplazo en la ligadura:', lineas([`\\left(2z\\right)\\left(2z\\right)z&=${V0}`, `4z^{3}&=${V0}`, `z^{3}&=${q ** 3}`, `z&=${q}`])),
      T('Calculo λ con la 1ª ecuación multiplicada por x (x = y = ' + 2 * q + ', z = ' + q + '):', lineas([`xy+2xz&=\\lambda xyz`, `${8 * q * q}&=\\lambda\\cdot ${V0}`, `\\lambda&=${texF(fr(2, q))}`])),
    ]),
    T('El candidato y el valor de la superficie:', lineas(tapa
      ? [`\\left(x,y,z\\right)&=\\left(${q},\\ ${q},\\ ${q}\\right)`, `S&=2\\cdot ${q * q}+2\\cdot ${q * q}+2\\cdot ${q * q}=${Smin}`]
      : [`\\left(x,y,z\\right)&=\\left(${2 * q},\\ ${2 * q},\\ ${q}\\right)`, `S&=${4 * q * q}+${4 * q * q}+${4 * q * q}=${Smin}`])),
    T(existeMinCaja, `\\text{Mínimo: }S=${Smin}`),
  ];
  const p = tapa ? [q, q, q] : [2 * q, 2 * q, q];
  return {
    enunciado: [{ txt: `Se quiere construir una caja rectangular ${tapa ? 'con tapa' : 'sin tapa'} de volumen ${V0} cm³ con la menor cantidad de material. Con multiplicadores de Lagrange, hallar las dimensiones y la superficie mínima.`, tex: `S=${sup},\\qquad xyz=${V0}` }],
    pasos,
    resultado: { tex: `\\left(x,y,z\\right)=\\left(${p.join(',\\ ')}\\right)\\ \\text{cm},\\qquad S_{\\min}=${Smin}\\ \\text{cm}^{2}` },
    verif: { dim: 3, tipo: 'min', f: (x, y, z) => S * x * y + 2 * x * z + 2 * y * z, g: (x, y, z) => x * y * z, c: V0, cands: [{ p, lam: tapa ? 4 / q : 2 / q, val: Smin }], val: Smin,
      muestra: (r) => { const x = 0.2 + r() * 3 * q, y = 0.2 + r() * 3 * q; return [x, y, V0 / (x * y)]; } },
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
    T('Minimizar la distancia equivale a minimizar su cuadrado (la raíz es creciente), que es más cómodo de derivar. Identifico f y la ligadura φ = 0 (el plano):', lineas([`f(x,y,z)&=${ftex}\\quad(=d^{2})`, `\\varphi(x,y,z)&=${rest(plano, d0)}=0`])),
    T(FUNC, `F(x,y,z,\\lambda)=${ftex}-\\lambda\\left(${rest(plano, d0)}\\right)`),
    T('Planteo ∇F = 0:', cases([`F'_x=${Fi('x', x0, a)}`, `F'_y=${Fi('y', y0, b)}`, `F'_z=${Fi('z', z0, c)}`, `F'_{\\lambda}=-\\left(${rest(plano, d0)}\\right)=0`])),
    T('De las tres primeras ecuaciones despejo x, y, z en función de λ:', lineas([`x&=${xe}`, `y&=${ye}`, `z&=${ze}`])),
    T('Reemplazo en la ligadura:', lineas([`${suma([[a, `\\left(${xe}\\right)`], [b, `\\left(${ye}\\right)`], [c, `\\left(${ze}\\right)`]])}&=${d0}`, `${suma([[sumaP, ''], [fr(N, 2), '\\lambda']])}&=${d0}`, `${suma([[fr(N, 2), '\\lambda']])}&=${num0}`, `\\lambda&=${texF(fr(2 * num0, N))}`])),
    T('Con ese λ calculo el punto candidato Q:', lineas([`x&=${texF(Q[0])}`, `y&=${texF(Q[1])}`, `z&=${texF(Q[2])}`])),
    T(`La distancia es la raíz de f(Q) (el valor de f es d², no d); como Q − P₀ = (λ/2)·(${a}, ${b}, ${c}), queda:`, lineas([`d&=\\sqrt{\\left(${fp(fMul(t, fr(a)))}\\right)^{2}+\\left(${fp(fMul(t, fr(b)))}\\right)^{2}+\\left(${fp(fMul(t, fr(c)))}\\right)^{2}}`, `&=\\sqrt{${texF(d2)}}`, `&=\\frac{${Math.abs(num0)}}{\\sqrt{${N}}}`, `&\\approx ${aprox(dist, 4)}`])),
    T('Clasificación por geometría: la distancia al cuadrado es continua, crece sin límite al alejarse, y el plano es un conjunto cerrado y no vacío; por eso tiene un mínimo sobre el plano. Como el único candidato es Q, ahí está el mínimo (máximo no hay). El resultado que se pide es la distancia d, no su cuadrado.', `d_{\\min}=\\frac{${Math.abs(num0)}}{\\sqrt{${N}}}`),
  ];
  return {
    enunciado: [{ txt: `Hallar, con multiplicadores de Lagrange, el punto del plano dado más cercano a P₀=(${x0}, ${y0}, ${z0}) y la distancia de P₀ al plano:`, tex: `${plano}=${d0}` }],
    pasos,
    resultado: { tex: lineas([`Q&=\\left(${texF(Q[0])},\\ ${texF(Q[1])},\\ ${texF(Q[2])}\\right)`, `d&=\\frac{${Math.abs(num0)}}{\\sqrt{${N}}}\\approx ${aprox(dist, 4)}`]) },
    verif: { dim: 3, tipo: 'min', f: (x, y, z) => (x - x0) ** 2 + (y - y0) ** 2 + (z - z0) ** 2, g: (x, y, z) => a * x + b * y + c * z, c: d0, cands: [{ p: Q.map(fVal), lam: fVal(t) * 2, val: fVal(d2) }], val: fVal(d2),
      muestra: (r) => { const x = (r() - 0.5) * 16, y = (r() - 0.5) * 16; return [x, y, (d0 - a * x - b * y) / c]; } },
  };
}

function tetraedro(rng) {
  const [p, q, s] = [rng.ent(1, 4), rng.ent(1, 4), rng.ent(1, 4)], [a, b, c] = [3 * p, 3 * q, 3 * s];
  const g = `\\frac{x}{${a}}+\\frac{y}{${b}}+\\frac{z}{${c}}`;
  const l = (k) => `\\frac{\\lambda}{${k}}`;
  const pasos = [
    T('Identifico la función a maximizar (volumen de la caja con un vértice en el origen y el opuesto en (x, y, z), con x, y, z > 0) y la ligadura:', lineas([`f(x,y,z)&=xyz`, `\\varphi(x,y,z)&=${g}-1=0`])),
    T(FUNC, `F(x,y,z,\\lambda)=xyz-\\lambda\\left(${g}-1\\right)`),
    T('Planteo ∇F = 0:', cases([`F'_x=yz-${l(a)}=0`, `F'_y=xz-${l(b)}=0`, `F'_z=xy-${l(c)}=0`, `F'_{\\lambda}=-\\left(${g}-1\\right)=0`])),
    T('De las tres primeras despejo λ:', lineas([`\\lambda&=${a}yz`, `\\lambda&=${b}xz`, `\\lambda&=${c}xy`])),
    T('Igualo las dos primeras y simplifico z (z ≠ 0), y luego la segunda con la tercera y simplifico x (x ≠ 0):', lineas([`${a}yz&=${b}xz`, `${a}y&=${b}x`, `y&=${suma([[fr(b, a), 'x']])}`, `${b}xz&=${c}xy`, `${b}z&=${c}y`, `z&=${suma([[fr(c, a), 'x']])}\\quad(\\text{usando }y=${suma([[fr(b, a), 'x']])})`])),
    T('Reemplazo y y z (en función de x) en la ligadura:', lineas([`\\frac{x}{${a}}+\\frac{${suma([[fr(b, a), 'x']])}}{${b}}+\\frac{${suma([[fr(c, a), 'x']])}}{${c}}&=1`, `\\frac{x}{${a}}+\\frac{x}{${a}}+\\frac{x}{${a}}&=1`, `\\frac{3x}{${a}}&=1`, `x&=${p}`])),
    T('Con x obtengo y, z y λ:', lineas([`y&=${texF(fr(b, a))}\\cdot ${p}=${q}`, `z&=${texF(fr(c, a))}\\cdot ${p}=${s}`, `\\lambda&=${a}\\cdot ${q}\\cdot ${s}=${a * q * s}`])),
    T('El candidato y su valor:', lineas([`\\left(x,y,z\\right)&=\\left(${p},\\ ${q},\\ ${s}\\right)`, `V&=${p}\\cdot ${q}\\cdot ${s}=${p * q * s}`])),
    T(existeMaxTriangulo, `\\text{Máximo: }V=${p * q * s}`),
  ];
  return {
    enunciado: [{ txt: 'Una caja con aristas paralelas a los ejes tiene un vértice en el origen y el vértice opuesto (x, y, z), con x, y, z > 0, sobre el plano dado. Hallar con Lagrange su volumen máximo:', tex: `${g}=1` }],
    pasos,
    resultado: { tex: `\\left(x,y,z\\right)=\\left(${p},\\ ${q},\\ ${s}\\right),\\qquad V_{\\max}=${p * q * s}` },
    verif: { dim: 3, tipo: 'max', f: (x, y, z) => x * y * z, g: (x, y, z) => x / a + y / b + z / c, c: 1, cands: [{ p: [p, q, s], lam: a * q * s, val: p * q * s }], val: p * q * s,
      muestra: (r) => { const x = r() * a, y = r() * b, z = c * (1 - x / a - y / b); return z > 0 ? [x, y, z] : null; } },
  };
}

// Caja con 3 caras en los planos coordenados y un vértice sobre un plano αx+βy+γz=δ, que puede ser dado o ser el plano tangente
// a z = k − x² − y² (1H9 May-24 #4). Pide el volumen o la superficie total (Recup. Nov-25 #4).
function cajaPlano(rng) {
  const tangente = rng() < 0.4, pideS = !tangente && rng() < 0.7;
  let al, be, ga, de, previo = [], enunPlano;
  if (tangente) {
    const x0 = rng.ent(1, 2), y0 = rng.ent(1, 3), k = rng.ent(x0 * x0 + y0 * y0 + 2, 20), z0 = k - x0 * x0 - y0 * y0;
    [al, be, ga, de] = [2 * x0, 2 * y0, 1, k + x0 * x0 + y0 * y0];
    previo = [
      T(`Primero el plano tangente a z = f(x,y) en el punto (${x0}, ${y0}). Calculo la altura y las derivadas parciales:`, lineas([`f(${x0},${y0})&=${k}-${x0 * x0}-${y0 * y0}=${z0}`, "f'_x&=-2x\\quad\\Rightarrow\\quad f'_x(" + x0 + "," + y0 + ")=" + -2 * x0, "f'_y&=-2y\\quad\\Rightarrow\\quad f'_y(" + x0 + "," + y0 + ")=" + -2 * y0])),
      T("Reemplazo en z − z₀ = f'_x·(x − x₀) + f'_y·(y − y₀) y paso las variables a un miembro; esa es la ligadura:", lineas([`${rest('z', z0)}&=${suma([[-2 * x0, `\\left(${rest('x', x0)}\\right)`], [-2 * y0, `\\left(${rest('y', y0)}\\right)`]])}`, `${al}x+${be}y+z&=${de}`])),
    ];
    enunPlano = { txt: `Se considera el plano tangente a la superficie en el punto (${x0}, ${y0}). Entre las cajas con 3 caras en los planos coordenados y el vértice opuesto sobre ese plano, hallar las dimensiones y el volumen máximo.`, tex: `z=${k}-x^{2}-y^{2}` };
  } else {
    [al, be, ga] = [rng.ent(1, 6), rng.ent(1, 6), rng.ent(1, 6)];
    de = 3 * mcm(mcm(al, be), ga) * rng.ent(1, 3);
    enunPlano = { txt: `Un paralelepípedo tiene 3 caras en los planos coordenados y el vértice opuesto al origen sobre el plano dado, con x, y, z > 0. Hallar con Lagrange sus dimensiones y ${pideS ? 'su superficie total' : 'su volumen máximo'}.`, tex: `${suma([[al, 'x'], [be, 'y'], [ga, 'z']])}=${de}` };
  }
  const plano = suma([[al, 'x'], [be, 'y'], [ga, 'z']]);
  const s = fr(de, 3), X = fMul(s, fr(1, al)), Y = fMul(s, fr(1, be)), Z = fMul(s, fr(1, ga));
  const V = fMul(fMul(X, Y), Z), Sup = fMul(fr(2), fSum(fSum(fMul(X, Y), fMul(Y, Z)), fMul(X, Z)));
  const L = fMul(fMul(Y, Z), fr(1, al));
  const pasos = [
    ...previo,
    T('Identifico la función a maximizar y la ligadura (x, y, z > 0):', lineas([`f(x,y,z)&=xyz`, `\\varphi(x,y,z)&=${plano}-${de}=0`])),
    T(FUNC, `F(x,y,z,\\lambda)=xyz-\\lambda\\left(${plano}-${de}\\right)`),
    T('Planteo ∇F = 0:', cases([`F'_x=yz-${lam(al, '\\lambda')}=0`, `F'_y=xz-${lam(be, '\\lambda')}=0`, `F'_z=xy-${lam(ga, '\\lambda')}=0`, `F'_{\\lambda}=-\\left(${plano}-${de}\\right)=0`])),
    T('Despejo λ de las tres primeras e igualo de a dos, dividiendo por la variable que sobra (es positiva):', lineas([`\\frac{yz}{${al}}&=\\frac{xz}{${be}}\\ \\Rightarrow\\ ${lam(be, 'y')}=${lam(al, 'x')}\\quad(z>0)`, `\\frac{yz}{${al}}&=\\frac{xy}{${ga}}\\ \\Rightarrow\\ ${lam(ga, 'z')}=${lam(al, 'x')}\\quad(y>0)`])),
    T(`Entonces ${lam(al, 'x')} = ${lam(be, 'y')} = ${lam(ga, 'z')}. Reemplazo en la ligadura (los tres sumandos valen lo mismo):`, lineas([`${lam(al, 'x')}+${lam(al, 'x')}+${lam(al, 'x')}&=${de}`, `${lam(3 * al, 'x')}&=${de}`, `x&=${texF(X)}`])),
    T('Con x obtengo y, z y λ:', lineas([`y&=${texF(Y)}`, `z&=${texF(Z)}`, `\\lambda&=\\frac{yz}{${al}}=${texF(L)}`])),
    T('Las dimensiones y las magnitudes pedidas (la superficie total son seis caras, tres pares iguales):', lineas([`V&=xyz=${texF(V)}`, `S&=2\\left(xy+yz+xz\\right)=${texF(Sup)}`])),
    T(existeMaxTriangulo, pideS ? `\\text{Máximo: }V=${texF(V)}\\ \\Rightarrow\\ S=${texF(Sup)}` : `\\text{Máximo: }V=${texF(V)}`),
  ];
  const pv = [X, Y, Z].map(fVal);
  return {
    enunciado: [enunPlano],
    pasos,
    resultado: { tex: `\\left(x,y,z\\right)=\\left(${texF(X)},\\ ${texF(Y)},\\ ${texF(Z)}\\right),\\qquad ${pideS ? `S=${texF(Sup)}\\ \\left(V_{\\max}=${texF(V)}\\right)` : `V_{\\max}=${texF(V)}`}` },
    verif: { dim: 3, tipo: 'max', f: (x, y, z) => x * y * z, g: (x, y, z) => al * x + be * y + ga * z, c: de, cands: [{ p: pv, lam: fVal(L), val: fVal(V) }], val: fVal(V), sup: fVal(Sup),
      muestra: (r) => { const x = (r() * de) / al, y = (r() * de) / be, z = (de - al * x - be * y) / ga; return z > 0 ? [x, y, z] : null; } },
  };
}

// f = ax + by² sobre x² + y² = r² (machete): hay que dividir con cuidado, revisar y = 0 y comparar 4 candidatos (máximo y mínimo).
function circunferencia(rng) {
  const b = rng.nz(2), x0 = rng.nz(2), a = 2 * b * x0, r = rng.ent(Math.abs(x0) + 1, 4), d = r * r - x0 * x0, [kd, sd] = raiz(d);
  const yv = `${kd === 1 && sd > 1 ? '' : kd}${sd === 1 ? '' : `\\sqrt{${sd}}`}`;
  const ftex = suma([[a, 'x'], [b, 'y^{2}']]);
  const cand = [[r, 0], [-r, 0], [x0, kd * Math.sqrt(sd)], [x0, -kd * Math.sqrt(sd)]];
  const vals = [a * r, -a * r, b * (r * r + x0 * x0), b * (r * r + x0 * x0)];
  const vmax = Math.max(...vals), vmin = Math.min(...vals);
  const pt = [`\\left(${r},\\ 0\\right)`, `\\left(${-r},\\ 0\\right)`, `\\left(${x0},\\ ${yv}\\right)`, `\\left(${x0},\\ -${yv}\\right)`];
  const max = vals.indexOf(vmax), min = vals.indexOf(vmin);
  const pasos = [
    T('Identifico la función y la ligadura:', lineas([`f(x,y)&=${ftex}`, `\\varphi(x,y)&=x^{2}+y^{2}-${r * r}=0`])),
    T(FUNC, `F(x,y,\\lambda)=${ftex}-\\lambda\\left(x^{2}+y^{2}-${r * r}\\right)`),
    T('Planteo ∇F = 0:', cases([`F'_x=${a}-2\\lambda x=0`, `F'_y=${lam(2 * b, 'y')}-2\\lambda y=0`, `F'_{\\lambda}=-\\left(x^{2}+y^{2}-${r * r}\\right)=0`])),
    T('En la 2ª ecuación NO divido por y (podría ser 0): saco factor común y, y un producto es 0 si algún factor lo es:', lineas([`${lam(2 * b, 'y')}-2\\lambda y&=0`, `2y\\left(${b}-\\lambda\\right)&=0`, `y&=0\\quad\\text{o}\\quad\\lambda=${b}`])),
    T('Rama y = 0: la ligadura da x² = ' + r * r + ', o sea x = ±' + r + ':', lineas([`x^{2}+0^{2}&=${r * r}`, `x&=\\pm ${r}`, `P_{1}&=\\left(${r},\\ 0\\right),\\ P_{2}=\\left(${-r},\\ 0\\right)`])),
    T(`Rama λ = ${b}: la 1ª ecuación da x, y con ese x la ligadura da y:`, lineas([`${a}-2\\cdot ${fp(b)}\\cdot x&=0`, `x&=${x0}`, `${x0 * x0}+y^{2}&=${r * r}`, `y^{2}&=${d}`, `y&=\\pm ${yv}`, `P_{3}&=\\left(${x0},\\ ${yv}\\right),\\ P_{4}=\\left(${x0},\\ -${yv}\\right)`])),
    T('Evalúo f en los cuatro candidatos:', lineas([`f(P_{1})&=${a}\\cdot ${r}+${fp(b)}\\cdot 0=${vals[0]}`, `f(P_{2})&=${a}\\cdot ${fp(-r)}+${fp(b)}\\cdot 0=${vals[1]}`, `f(P_{3})&=f(P_{4})=${a}\\cdot ${fp(x0)}+${fp(b)}\\cdot ${d}=${vals[2]}`])),
    T('La curva φ = 0 es cerrada y acotada y f es continua, así que (Weierstrass) tiene máximo y mínimo, y están entre los candidatos. Comparo los valores: el mayor es el máximo y el menor es el mínimo.', lineas([`f_{\\max}&=${vmax}\\ \\text{en}\\ ${max >= 2 ? 'P_{3}\\text{ y }P_{4}' : `P_{${max + 1}}`}`, `f_{\\min}&=${vmin}\\ \\text{en}\\ ${min >= 2 ? 'P_{3}\\text{ y }P_{4}' : `P_{${min + 1}}`}`])),
  ];
  return {
    enunciado: [{ txt: `Hallar con multiplicadores de Lagrange el máximo y el mínimo de f sobre la circunferencia, indicando en qué puntos se alcanzan.`, tex: `f(x,y)=${ftex},\\qquad x^{2}+y^{2}=${r * r}` }],
    pasos,
    resultado: { tex: lineas([`f_{\\max}&=${vmax}\\ \\text{en}\\ ${max >= 2 ? `${pt[2]}\\text{ y }${pt[3]}` : pt[max]}`, `f_{\\min}&=${vmin}\\ \\text{en}\\ ${min >= 2 ? `${pt[2]}\\text{ y }${pt[3]}` : pt[min]}`]) },
    verif: { dim: 2, tipo: 'ambos', f: (x, y) => a * x + b * y * y, g: (x, y) => x * x + y * y, c: r * r, max: vmax, min: vmin, val: vmax,
      cands: cand.map((p, i) => ({ p, lam: i === 0 ? a / (2 * r) : i === 1 ? -a / (2 * r) : b, val: vals[i] })),
      muestra: (rn) => { const t = rn() * 2 * Math.PI; return [r * Math.cos(t), r * Math.sin(t)]; } },
  };
}

function productoRecta(rng) {
  const [a, b, k] = [rng.ent(1, 4), rng.ent(1, 4), rng.ent(1, 4)], c0 = 2 * a * b * k;
  const O = orlado(a, b, 0, 1, 0);
  const g = suma([[a, 'x'], [b, 'y']]);
  const pasos = [
    T('Identifico la función a maximizar y la ligadura (x, y > 0):', lineas([`f(x,y)&=xy`, `\\varphi(x,y)&=${g}-${c0}=0`])),
    T(FUNC, `F(x,y,\\lambda)=xy-\\lambda\\left(${g}-${c0}\\right)`),
    T('Planteo ∇F = 0:', cases([`F'_x=y-${lam(a, '\\lambda')}=0`, `F'_y=x-${lam(b, '\\lambda')}=0`, `F'_{\\lambda}=-\\left(${g}-${c0}\\right)=0`])),
    T('De las dos primeras despejo y y x en función de λ:', lineas([`y&=${lam(a, '\\lambda')}`, `x&=${lam(b, '\\lambda')}`])),
    T('Reemplazo en la ligadura:', lineas([`${suma([[a, `\\left(${lam(b, '\\lambda')}\\right)`], [b, `\\left(${lam(a, '\\lambda')}\\right)`]])}&=${c0}`, `${lam(2 * a * b, '\\lambda')}&=${c0}`, `\\lambda&=${k}`])),
    T('Candidato y valor:', lineas([`x&=${b}\\cdot ${k}=${b * k}`, `y&=${a}\\cdot ${k}=${a * k}`, `f&=${b * k}\\cdot ${a * k}=${a * b * k * k}`])),
    T("Derivadas segundas de F respecto de x e y (para el orlado), y derivadas de φ:", lineas(["F''_{xx}&=0", "F''_{xy}&=1", "F''_{yy}&=0", `\\varphi'_x&=${a}`, `\\varphi'_y&=${b}`])),
    T('Clasifico con el hessiano orlado (2 variables, 1 ligadura): primera fila y columna con ceros y las derivadas de φ, y el resto con las derivadas segundas de F. Determinante positivo = máximo condicionado; negativo = mínimo.', lineas(O.lineas)),
    T(`Como el determinante es ${O.det} > 0, el candidato es un máximo condicionado. Control por geometría: xy vale 0 en los extremos de la recta (x = 0 o y = 0) y es positivo adentro, así que el máximo está en el interior.`, `f_{\\max}=${a * b * k * k}`),
  ];
  return {
    enunciado: [{ txt: 'Hallar con multiplicadores de Lagrange el máximo del producto xy (x, y > 0) sobre la recta dada, y clasificarlo con el hessiano orlado:', tex: `f=xy,\\qquad ${g}=${c0}` }],
    pasos,
    resultado: { tex: `\\left(x,y\\right)=\\left(${b * k},\\ ${a * k}\\right),\\qquad f_{\\max}=${a * b * k * k}` },
    verif: { dim: 2, tipo: 'max', orlado: O.det, f: (x, y) => x * y, g: (x, y) => a * x + b * y, c: c0, cands: [{ p: [b * k, a * k], lam: k, val: a * b * k * k }], val: a * b * k * k,
      muestra: (r) => { const x = r() * c0 / a, y = (c0 - a * x) / b; return y > 0 ? [x, y] : null; } },
  };
}

function distanciaHiperbola(rng) {
  const m = rng.ent(1, 4), O = orlado(m, m, 2, -2, 2), O2 = orlado(-m, -m, 2, -2, 2);
  const pasos = [
    T('Identifico la función a minimizar (cuadrado de la distancia al origen) y la ligadura:', lineas([`f(x,y)&=x^{2}+y^{2}`, `\\varphi(x,y)&=xy-${m * m}=0`])),
    T(FUNC, `F(x,y,\\lambda)=x^{2}+y^{2}-\\lambda\\left(xy-${m * m}\\right)`),
    T('Planteo ∇F = 0:', cases(["F'_x=2x-\\lambda y=0", "F'_y=2y-\\lambda x=0", `F'_{\\lambda}=-\\left(xy-${m * m}\\right)=0`])),
    T('Multiplico la 1ª por x y la 2ª por y: las dos dan λxy a un lado, y xy = ' + m * m + ' ≠ 0 por la ligadura. Igualo los segundos miembros para quitar λ:', lineas(['2x^{2}&=\\lambda xy', '2y^{2}&=\\lambda xy', '2x^{2}&=2y^{2}', 'x^{2}&=y^{2}'])),
    T('Entonces y = x o y = −x. Pruebo cada caso en la ligadura xy = ' + m * m + ':', lineas([`\\text{Si }y=x:\\ x^{2}&=${m * m}\\ \\Rightarrow\\ x=${m}\\ \\text{o}\\ x=${-m}`, `\\text{Si }y=-x:\\ -x^{2}&=${m * m}\\ \\Rightarrow\\ \\text{sin solución real}`])),
    T('Los candidatos y λ (de la 1ª ecuación: 2x = λy con y = x da λ = 2):', lineas([`P_{1}&=\\left(${m},\\ ${m}\\right)`, `P_{2}&=\\left(${-m},\\ ${-m}\\right)`, `\\lambda&=2`])),
    T('Valor de f en cada candidato:', lineas([`f(P_{1})&=${m}^{2}+${m}^{2}=${2 * m * m}`, `f(P_{2})&=\\left(${-m}\\right)^{2}+\\left(${-m}\\right)^{2}=${2 * m * m}`])),
    T("Derivadas para el orlado: φ'_x = y, φ'_y = x; F''_xx = 2, F''_xy = −λ = −2, F''_yy = 2. En P₁:", lineas(O.lineas)),
    T("En P₂ las entradas φ'_x = φ'_y = " + -m + ' cambian de signo y el determinante da lo mismo:', lineas(O2.lineas)),
    T(`Como el determinante es ${O.det} < 0 en ambos, los dos candidatos son mínimos condicionados.`, `f_{\\min}=${2 * m * m}`),
  ];
  return {
    enunciado: [{ txt: 'Hallar con multiplicadores de Lagrange los puntos de la hipérbola xy = m² más cercanos al origen (minimizar x² + y²) y clasificarlos con el hessiano orlado:', tex: `xy=${m * m}` }],
    pasos,
    resultado: { tex: `P_{1}=\\left(${m},\\ ${m}\\right),\\ P_{2}=\\left(${-m},\\ ${-m}\\right),\\qquad f_{\\min}=${2 * m * m}` },
    verif: { dim: 2, tipo: 'min', orlado: O.det, f: (x, y) => x * x + y * y, g: (x, y) => x * y, c: m * m, cands: [{ p: [m, m], lam: 2, val: 2 * m * m }, { p: [-m, -m], lam: 2, val: 2 * m * m }], val: 2 * m * m,
      muestra: (r) => { const x = (r() - 0.5) * 12; return Math.abs(x) < 0.05 ? null : [x, (m * m) / x]; } },
  };
}

function lagrange(rng) {
  const e = rng.elegir([cajaTapa, cajaSinTapa, cajaVolumenFijo, distanciaPlano, tetraedro, cajaPlano, circunferencia, productoRecta, distanciaHiperbola]);
  return e(rng);
}

export const GENERADORES_P1_LAGRANGE = [{ id: 'lagrange', nombre: 'Lagrange (extremos condicionados)', grupo: 'Cálculo', instancia: 'p1', generar: lagrange }];
