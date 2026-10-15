// EDO de 1er orden: lineal (y = u·v, con PVI opcional) y Bernoulli (z = y^(1-n) y luego u·v). Lógica pura; coeficientes elegidos para dar números lindos.
// Cada generador devuelve { enunciado, pasos, resultado, verif }. verif.ec(x, y, y1, y2) debe dar 0 si y(x, ...C) es solución.
// Regla de redacción: cada paso dice qué se hace y por qué, y ningún "=" esconde dos operaciones.
import { suma, ex, fr, fNeg, fMul, fSum, texF, parN } from './mate.js';

const xp = (m) => (m === 0 ? '' : m === 1 ? 'x' : `x^{${m}}`); // cuerpo para suma(): '' = constante
const fx = (k) => `\\frac{${k}}{x}`;
const cte = (Cc, cuerpo) => (Cc === null ? [1, `C\\,${cuerpo}`] : [Cc, cuerpo]); // C simbólica o su valor (PVI)

function lineal(rng) {
  const tipo = rng.elegir(['pot', 'exp', 'gauss', 'expres']);
  const pvi = rng() < 0.4;
  const Cs = [-2, 1, 3];
  let enun, Pt, Qt, nota = '', planteo, vPasos, uPasos, yPasos, res, y, ec, dom, x0, val0;
  const t = rng.ent(1, 3);
  if (tipo === 'pot') {
    const k = rng.ent(1, 3), m = rng.ent(0, 3), s = m + k + 1, a = s * t;
    Pt = fx(k); Qt = suma([[a, xp(m)]]); x0 = 1; val0 = t;
    nota = ' Como P(x) no está definida en x = 0, trabajo en x > 0.';
    enun = `y'+${fx(k)}\\,y=${Qt}`;
    planteo = [`u'v+uv'+${fx(k)}\\,uv=${Qt}`, `u'v+u\\left(v'+${fx(k)}\\,v\\right)=${Qt}`];
    vPasos = [
      { txt: 'Elijo v para que el paréntesis valga 0: así la ecuación queda solo en u. Alcanza con una v particular (sin constante).', tex: `v'+${fx(k)}\\,v=0` },
      { txt: 'Separo variables (v′ = dv/dx): paso las v de un lado y las x del otro.', tex: `\\frac{dv}{dx}=-${fx(k)}\\,v\\;\\Rightarrow\\;\\frac{dv}{v}=-${fx(k)}\\,dx` },
      { txt: 'Integro cada miembro (sin constante):', tex: `\\int\\frac{dv}{v}=-${k === 1 ? '' : k}\\int\\frac{dx}{x}\\;\\Rightarrow\\;\\ln|v|=-${k === 1 ? '' : k}\\ln|x|` },
      { txt: 'Aplico exponencial. En x > 0 es |x| = x y e^{−k ln x} = x^{−k}:', tex: `v=x^{-${k}}` },
    ];
    uPasos = [
      { txt: 'Con el paréntesis en 0 queda u′·v = Q(x):', tex: `u'\\,x^{-${k}}=${Qt}` },
      { txt: 'Despejo u′ dividiendo por v (al dividir potencias de x se restan los exponentes):', tex: `u'=\\frac{${Qt}}{x^{-${k}}}=${suma([[a, xp(m + k)]])}` },
      { txt: 'Integro con la regla de la potencia, ∫xⁿ dx = xⁿ⁺¹/(n+1):', tex: `u=\\int ${suma([[a, xp(m + k)]])}\\,dx=\\frac{${a}}{${s}}\\,x^{${s}}+C` },
      { txt: `Simplifico el coeficiente: ${a}/${s} = ${t}.`, tex: `u=${suma([[t, xp(s)]])}+C` },
    ];
    yPasos = [
      { txt: 'Vuelvo a y = u·v:', tex: `y=\\left(${suma([[t, xp(s)]])}+C\\right)x^{-${k}}` },
      { txt: 'Distribuyo x^{−k} en cada término:', tex: `y=${suma([[t, xp(s)]])}\\,x^{-${k}}+C\\,x^{-${k}}` },
      { txt: `Al multiplicar potencias de x se suman los exponentes (${s} − ${k} = ${m + 1}):`, tex: `y=${suma([[t, xp(m + 1)]])}+C\\,x^{-${k}}` },
    ];
    res = (Cc) => `y=${suma([[t, xp(m + 1)], cte(Cc, `x^{-${k}}`)])}`;
    y = (x, C) => t * x ** (m + 1) + C * x ** -k;
    ec = (x, yy, y1) => y1 + (k / x) * yy - a * x ** m;
    dom = [0.5, 2];
    var evalA = `y(1)=${t}\\cdot 1^{${m + 1}}+C\\cdot 1^{-${k}}`, evalB = 'todas las potencias de 1 valen 1'; // eslint-disable-line no-var
  } else if (tipo === 'exp' || tipo === 'expres') {
    const k = rng.nz(3);
    let b;
    if (tipo === 'expres') b = -k; else do b = rng.ent(-3, 3); while (b + k === 0);
    const s = b + k, a = tipo === 'expres' ? rng.nz(3) : s * t;
    const lhs = suma([[1, "y'"], [k, 'y']]);
    const P = suma([[1, "v'"], [k, 'v']]);
    Pt = `${k}`; Qt = suma([[a, ex(b)]]); x0 = 0; val0 = tipo === 'expres' ? 0 : t;
    nota = tipo === 'expres' ? ' Ojo: acá el exponente de Q(x) es justo el opuesto al de v (b = −k).' : '';
    enun = `${lhs}=${Qt}`;
    planteo = [`u'v+uv'${k < 0 ? '' : '+'}${suma([[k, 'uv']])}=${Qt}`, `u'v+u\\left(${P}\\right)=${Qt}`];
    vPasos = [
      { txt: 'Elijo v para que el paréntesis valga 0: así la ecuación queda solo en u. Alcanza con una v particular (sin constante).', tex: `${P}=0` },
      { txt: 'Separo variables (v′ = dv/dx):', tex: `\\frac{dv}{dx}=${suma([[-k, 'v']])}\\;\\Rightarrow\\;\\frac{dv}{v}=${suma([[-k, '\\,dx']])}` },
      { txt: 'Integro cada miembro (sin constante):', tex: `\\int\\frac{dv}{v}=${suma([[-k, '\\int dx']])}\\;\\Rightarrow\\;\\ln|v|=${suma([[-k, 'x']])}` },
      { txt: 'Aplico exponencial:', tex: `v=${ex(-k)}` },
    ];
    if (tipo === 'exp') {
      uPasos = [
        { txt: 'Con el paréntesis en 0 queda u′·v = Q(x):', tex: `u'\\,${ex(-k)}=${Qt}` },
        { txt: 'Despejo u′ dividiendo por v (al dividir exponenciales se restan los exponentes):', tex: `u'=\\frac{${Qt}}{${ex(-k)}}=${suma([[a, ex(s)]])}` },
        { txt: 'Integro con ∫e^{sx} dx = e^{sx}/s:', tex: `u=\\int ${suma([[a, ex(s)]])}\\,dx=\\frac{${a}}{${s}}\\,${ex(s)}+C` },
        { txt: `Simplifico el coeficiente: ${a}/${s} = ${t}.`, tex: `u=${suma([[t, ex(s)]])}+C` },
      ];
      yPasos = [
        { txt: 'Vuelvo a y = u·v:', tex: `y=\\left(${suma([[t, ex(s)]])}+C\\right)${ex(-k)}` },
        { txt: 'Distribuyo la exponencial en cada término:', tex: `y=${suma([[t, ex(s)]])}\\,${ex(-k)}+C\\,${ex(-k)}` },
        { txt: `Al multiplicar exponenciales se suman los exponentes (${s} − ${k} = ${b}):`, tex: `y=${suma([[t, ex(b)]])}+C\\,${ex(-k)}` },
      ];
      res = (Cc) => `y=${suma([[t, ex(b)], cte(Cc, ex(-k))])}`;
      y = (x, C) => t * Math.exp(b * x) + C * Math.exp(-k * x);
      var evalA = `y(0)=${b === 0 ? t : `${t}\\,e^{${b}\\cdot 0}`}+C\\,e^{${-k}\\cdot 0}`, evalB = 'e⁰ = 1'; // eslint-disable-line no-var
    } else {
      uPasos = [
        { txt: 'Con el paréntesis en 0 queda u′·v = Q(x):', tex: `u'\\,${ex(-k)}=${Qt}` },
        { txt: 'Despejo u′ dividiendo por v. Los exponentes son iguales, así que la exponencial se cancela y u′ es constante:', tex: `u'=\\frac{${Qt}}{${ex(-k)}}=${a}` },
        { txt: 'Integro una constante (no aparece ninguna exponencial, por eso no hay que dividir por b + k, que vale 0):', tex: `u=\\int ${a}\\,dx=${suma([[a, 'x']])}+C` },
      ];
      yPasos = [
        { txt: 'Vuelvo a y = u·v:', tex: `y=\\left(${suma([[a, 'x']])}+C\\right)${ex(-k)}` },
        { txt: 'Distribuyo la exponencial en cada término (la solución lleva un factor x extra):', tex: `y=${suma([[a, `x\\,${ex(-k)}`], [1, `C\\,${ex(-k)}`]])}` },
      ];
      res = (Cc) => `y=${suma([[a, `x\\,${ex(-k)}`], cte(Cc, ex(-k))])}`;
      y = (x, C) => (a * x + C) * Math.exp(-k * x);
      var evalA = `y(0)=\\left(${a}\\cdot 0+C\\right)e^{${-k}\\cdot 0}`, evalB = 'e⁰ = 1'; // eslint-disable-line no-var
    }
    ec = (x, yy, y1) => y1 + k * yy - a * Math.exp(b * x);
    dom = [-1, 1];
  } else {
    const k = rng.ent(1, 3), a = 2 * k * t, kk = k === 1 ? '' : k;
    const e2 = `e^{${kk}x^{2}}`, em = `e^{-${kk}x^{2}}`;
    Pt = `${2 * k}x`; Qt = suma([[a, 'x']]); x0 = 0; val0 = t;
    enun = `y'+${2 * k}x\\,y=${Qt}`;
    planteo = [`u'v+uv'+${2 * k}x\\,uv=${Qt}`, `u'v+u\\left(v'+${2 * k}x\\,v\\right)=${Qt}`];
    vPasos = [
      { txt: 'Elijo v para que el paréntesis valga 0: así la ecuación queda solo en u. Alcanza con una v particular (sin constante).', tex: `v'+${2 * k}x\\,v=0` },
      { txt: 'Separo variables (v′ = dv/dx):', tex: `\\frac{dv}{dx}=-${2 * k}x\\,v\\;\\Rightarrow\\;\\frac{dv}{v}=-${2 * k}x\\,dx` },
      { txt: 'Integro cada miembro (sin constante); ∫x dx = x²/2:', tex: `\\int\\frac{dv}{v}=-${2 * k}\\int x\\,dx\\;\\Rightarrow\\;\\ln|v|=-${kk}x^{2}` },
      { txt: 'Aplico exponencial:', tex: `v=${em}` },
    ];
    uPasos = [
      { txt: 'Con el paréntesis en 0 queda u′·v = Q(x):', tex: `u'\\,${em}=${Qt}` },
      { txt: 'Despejo u′ dividiendo por v (dividir por e^{−g} es multiplicar por e^{g}):', tex: `u'=\\frac{${Qt}}{${em}}=${suma([[a, 'x']])}\\,${e2}` },
      { txt: 'Para integrar hago una sustitución: w es el exponente y dw aparece en el integrando (2k·x·dx = dw).', tex: `w=${kk}x^{2},\\qquad dw=${2 * k}x\\,dx` },
      { txt: `Reescribo el integrando: ${a}x dx = ${t}·(${2 * k}x dx) = ${t}·dw.`, tex: `u=\\int ${t === 1 ? '' : t}\\,e^{w}\\,dw` },
      { txt: 'Integro y vuelvo a x:', tex: `u=${suma([[t, 'e^{w}']])}+C=${suma([[t, e2]])}+C` },
    ];
    yPasos = [
      { txt: 'Vuelvo a y = u·v:', tex: `y=\\left(${suma([[t, e2]])}+C\\right)${em}` },
      { txt: 'Distribuyo la exponencial en cada término:', tex: `y=${suma([[t, `${e2}\\,${em}`]])}+C\\,${em}` },
      { txt: 'e^{g}·e^{−g} = e⁰ = 1:', tex: `y=${t}+C\\,${em}` },
    ];
    res = (Cc) => `y=${suma([[t, ''], cte(Cc, em)])}`;
    y = (x, C) => t + C * Math.exp(-k * x * x);
    ec = (x, yy, y1) => y1 + 2 * k * x * yy - a * x;
    dom = [-1, 1];
    var evalA = `y(0)=${t}+C\\,e^{-${kk}\\cdot 0^{2}}`, evalB = 'e⁰ = 1'; // eslint-disable-line no-var
  }
  const pasos = [
    { txt: `Reconozco la forma y′ + P(x)·y = Q(x): es lineal de 1.er orden (y e y′ aparecen a la primera potencia y sin multiplicarse entre sí).${nota}`, tex: `P(x)=${Pt},\\qquad Q(x)=${Qt}` },
    { txt: 'Planteo y = u·v (con dos incógnitas me queda libertad para elegir una). Por la regla del producto, y′ = u′v + uv′. Reemplazo en la ecuación:', tex: planteo[0] },
    { txt: 'Saco u factor común en los dos términos que la tienen:', tex: planteo[1] },
    ...vPasos, ...uPasos, ...yPasos,
  ];
  let C0, y0;
  if (pvi) {
    C0 = rng.nz(3); y0 = val0 + C0;
    pasos.push(
      { txt: `Uso la condición inicial y(${x0}) = ${y0}. Reemplazo x = ${x0} en la solución general:`, tex: evalA },
      { txt: `Simplifico (${evalB}):`, tex: `y(${x0})=${val0 === 0 ? '' : `${val0}+`}C` },
      { txt: 'Igualo al dato y despejo C:', tex: `\\begin{aligned}${val0 === 0 ? '' : `${val0}+`}C&=${y0}\\\\C&=${y0}${val0 === 0 ? '' : `-${parN(val0)}`}\\\\C&=${C0}\\end{aligned}` },
      { txt: 'Reemplazo C en la solución general:', tex: res(C0) },
    );
  }
  return {
    enunciado: [{ txt: pvi ? 'Resolver el problema de valores iniciales (usar y = u·v):' : 'Hallar la solución general de la ecuación diferencial lineal (usar y = u·v):', tex: pvi ? `${enun},\\qquad y(${x0})=${y0}` : enun }],
    pasos, resultado: { tex: pvi ? res(C0) : res(null) },
    verif: { orden: 1, dom, consts: Cs.map((C) => [C]), y, ec, pvi: pvi ? { x0, y0, C: C0 } : null, tipo },
  };
}

// Exponentes n de Bernoulli posibles para coeficientes constantes y la cuenta de y = z^(1/m), m = 1 - n.
const N_CONST = [fr(2), fr(3), fr(-1), fr(-2), fr(1, 2), fr(-1, 2)];
const volver = {
  '2/1': { eq: 'y^{-1}=z', y: '\\frac{1}{z}', txt: 'Deshago el cambio: z = y⁻¹, así que y es la inversa de z.', ec: 'y=\\frac{1}{z}' },
  '3/1': { eq: 'y^{-2}=z', y: '\\pm\\frac{1}{\\sqrt{z}}', txt: 'Deshago el cambio: z = y⁻², o sea y² = 1/z. Al sacar raíz cuadrada aparece el ±.', ec: 'y^{2}=\\frac{1}{z}\\;\\Rightarrow\\;y=\\pm\\frac{1}{\\sqrt{z}}' },
  '-1/1': { eq: 'y^{2}=z', y: '\\pm\\sqrt{z}', txt: 'Deshago el cambio: z = y², y al sacar raíz cuadrada aparece el ± (queda definida donde z > 0).', ec: 'y^{2}=z\\;\\Rightarrow\\;y=\\pm\\sqrt{z}' },
  '-2/1': { eq: 'y^{3}=z', y: '\\sqrt[3]{z}', txt: 'Deshago el cambio: z = y³. La raíz cúbica es única en los reales, por eso no hay ±.', ec: 'y^{3}=z\\;\\Rightarrow\\;y=\\sqrt[3]{z}' },
  '1/2': { eq: '\\sqrt{y}=z', y: 'z^{2}', txt: 'Deshago el cambio: z = √y, así que elevo al cuadrado (vale con z ≥ 0).', ec: '\\sqrt{y}=z\\;\\Rightarrow\\;y=z^{2}' },
  '-1/2': { eq: 'y^{3/2}=z', y: 'z^{2/3}', txt: 'Deshago el cambio: z = y^{3/2}; elevo a la 2/3 (vale con z > 0).', ec: 'y^{3/2}=z\\;\\Rightarrow\\;y=z^{2/3}' },
};

// Reemplaza z por su expresión; entre paréntesis solo si z lleva exponente.
const sub = (y, z) => y.replace('z^', `\\left(${z}\\right)^`).replaceAll('z', z);
const py = (e) => (e === '1' ? 'y' : `y^{${e}}`);

function bernoulli(rng) {
  const tipo = rng.elegir(['pot', 'const', 'const', 'const']);
  const t = rng.ent(1, 3);
  const pasos = [];
  let enun, zsol, ycampo, res, y, ec, dom, Cs, n;
  if (tipo === 'const') {
    n = rng.elegir(N_CONST);
    const m = fSum(fr(1), fNeg(n));
    const k = m.d === 2 ? 2 * rng.signo() : rng.nz(2);
    const a = k * t, c = fMul(m, fr(k)).n, d = c * t;
    const nt = texF(n), mt = texF(m), invm = fr(m.d, m.n);
    const yn = `y^{${nt}}`, ymn = py(texF(fNeg(n))), ym = py(mt);
    const zz = (cz) => suma([[1, "z'"], [cz, 'z']]);
    enun = `${suma([[1, "y'"], [k, 'y']])}=${suma([[a, yn]])}`;
    const vn = volver[`${n.n}/${n.d}`];
    pasos.push(
      { txt: 'Reconozco la forma y′ + P(x)·y = Q(x)·yⁿ: es de Bernoulli, con n distinto de 0 y de 1 (si no, sería lineal).', tex: `P(x)=${k},\\quad Q(x)=${a},\\quad n=${nt}` },
      n.n > 0
        ? { txt: 'Primero una advertencia: con n > 0, y ≡ 0 es solución (0 = 0). Voy a dividir por yⁿ, así que la perdería: la anoto aparte.', tex: `y\\equiv 0\\ \\text{es solución; de acá en más } y\\neq 0` }
        : { txt: 'Con n < 0, yⁿ no está definida en y = 0. Voy a dividir por yⁿ, así que trabajo con y ≠ 0.', tex: 'y\\neq 0' },
      { txt: 'Divido toda la ecuación por yⁿ para que en cada término quede una sola potencia de y:', tex: `${suma([[1, `${ymn}y'`], [k, ym]])}=${a}` },
      { txt: 'Hago el cambio z = y^{1−n}. Por la regla de la cadena, z′ = (1−n)·y^{−n}·y′ (porque (1−n) − 1 = −n):', tex: `z=${ym},\\qquad z'=${mt}\\,${ymn}y'` },
      { txt: 'Despejo el término que aparece en la ecuación, y^{−n}·y′:', tex: `${ymn}y'=${suma([[invm, "z'"]])}` },
      { txt: 'Reemplazo en la ecuación (y^{1−n} es z):', tex: `${suma([[invm, "z'"], [k, 'z']])}=${a}` },
      { txt: `Multiplico toda la ecuación por ${mt} para que z′ quede sin coeficiente (${mt}·${texF(invm)} = 1):`, tex: `${mt}\\left(${suma([[invm, "z'"], [k, 'z']])}\\right)=${mt}\\cdot ${parN(a)}` },
      { txt: `Queda una lineal en z, con P = ${c} y Q = ${d}:`, tex: `${zz(c)}=${d}` },
      { txt: 'La resuelvo con z = u·v (z′ = u′v + uv′). Reemplazo y saco u factor común:', tex: `u'v+u\\left(${suma([[1, "v'"], [c, 'v']])}\\right)=${d}` },
      { txt: 'Elijo v con el paréntesis en 0 y separo variables:', tex: `${suma([[1, "v'"], [c, 'v']])}=0\\;\\Rightarrow\\;\\frac{dv}{v}=${suma([[-c, '\\,dx']])}` },
      { txt: 'Integro (sin constante) y aplico exponencial:', tex: `\\ln|v|=${suma([[-c, 'x']])}\\;\\Rightarrow\\;v=${ex(-c)}` },
      { txt: 'Con el paréntesis en 0 queda u′·v = Q; despejo u′ (al dividir exponenciales se restan los exponentes):', tex: `u'\\,${ex(-c)}=${d}\\;\\Rightarrow\\;u'=${suma([[d, ex(c)]])}` },
      { txt: 'Integro con ∫e^{cx} dx = e^{cx}/c:', tex: `u=\\int ${suma([[d, ex(c)]])}\\,dx=\\frac{${d}}{${c}}\\,${ex(c)}+C` },
      { txt: `Simplifico el coeficiente: ${d}/${c} = ${t}.`, tex: `u=${suma([[t, ex(c)]])}+C` },
      { txt: 'Vuelvo a z = u·v y distribuyo:', tex: `z=\\left(${suma([[t, ex(c)]])}+C\\right)${ex(-c)}=${suma([[t, `${ex(c)}\\,${ex(-c)}`]])}+C\\,${ex(-c)}` },
      { txt: 'e^{g}·e^{−g} = 1:', tex: `z=${t}+C\\,${ex(-c)}` },
      { txt: vn.txt, tex: vn.ec },
      { txt: 'Reemplazo z por su expresión:', tex: `y=${sub(vn.y, `${t}+C\\,${ex(-c)}`)}` },
    );
    ycampo = `y=${sub(vn.y, `${t}+C\\,${ex(-c)}`)}`;
    res = n.n > 0 ? `${ycampo}\\quad\\text{y además } y\\equiv 0` : ycampo;
    const zf = (x, C) => t + C * Math.exp(-c * x);
    y = (x, C) => zf(x, C) ** (m.d / m.n);
    ec = (x, yy, y1) => y1 + k * yy - a * yy ** (n.n / n.d);
    dom = [-0.6, 0.6]; Cs = [0.5, 2];
  } else {
    // P(x) = k/x, Q(x) = q·x^μ, n = 2 o n = -1: z' + (m·k/x)·z = m·q·x^μ
    n = rng.elegir([fr(2), fr(-1)]);
    const m = fSum(fr(1), fNeg(n)).n, k = rng.ent(1, 2), e = -m * k, ck = m * k;
    const mu = rng.ent(Math.max(0, e), Math.max(0, e) + 2), s = mu - e + 1, q = s * t, U = m * t;
    const nt = texF(n), yn = `y^{${nt}}`, ymn = py(`${-n.n}`), ym = py(`${m}`);
    const Qt = suma([[q, xp(mu)]]);
    const vn = volver[`${n.n}/${n.d}`];
    const zl = `z'${ck < 0 ? '-' : '+'}\\frac{${Math.abs(ck)}}{x}\\,z`;
    zsol = suma([[U, xp(mu + 1)], [1, `C${xp(e)}`]]);
    enun = `y'+${fx(k)}\\,y=${Qt}\\,${yn}`;
    pasos.push(
      { txt: 'Reconozco la forma y′ + P(x)·y = Q(x)·yⁿ: es de Bernoulli, con n distinto de 0 y de 1.', tex: `P(x)=${fx(k)},\\quad Q(x)=${Qt},\\quad n=${nt}` },
      n.n > 0
        ? { txt: 'Con n > 0, y ≡ 0 es solución. Voy a dividir por yⁿ, así que la perdería: la anoto aparte. Además P no está definida en x = 0: trabajo en x > 0.', tex: 'y\\equiv 0\\ \\text{es solución; de acá en más } y\\neq 0,\\ x>0' }
        : { txt: 'Con n < 0, yⁿ no está definida en y = 0. Trabajo con y ≠ 0 y, como P no está definida en x = 0, con x > 0.', tex: 'y\\neq 0,\\quad x>0' },
      { txt: 'Divido toda la ecuación por yⁿ:', tex: `${ymn}y'+${fx(k)}\\,${ym}=${Qt}` },
      { txt: 'Hago el cambio z = y^{1−n}. Por la regla de la cadena, z′ = (1−n)·y^{−n}·y′:', tex: `z=${ym},\\qquad z'=${m}\\,${ymn}y'` },
      { txt: 'Reemplazo (y^{−n}·y′ = z′/(1−n)):', tex: `${m === -1 ? '-' : '\\frac{1}{2}'}z'+${fx(k)}\\,z=${Qt}` },
      { txt: `Multiplico toda la ecuación por ${m} para dejar z′ sin coeficiente:`, tex: `${m}\\left(${m === -1 ? '-' : '\\frac{1}{2}'}z'+${fx(k)}\\,z\\right)=${m}\\cdot\\left(${Qt}\\right)` },
      { txt: 'Queda una lineal en z:', tex: `${zl}=${suma([[m * q, xp(mu)]])}` },
      { txt: 'La resuelvo con z = u·v. Reemplazo y saco u factor común:', tex: `u'v+u\\left(v'${ck < 0 ? '-' : '+'}\\frac{${Math.abs(ck)}}{x}\\,v\\right)=${suma([[m * q, xp(mu)]])}` },
      { txt: 'Elijo v con el paréntesis en 0 y separo variables:', tex: `v'${ck < 0 ? '-' : '+'}\\frac{${Math.abs(ck)}}{x}\\,v=0\\;\\Rightarrow\\;\\frac{dv}{v}=${ck < 0 ? '' : '-'}\\frac{${Math.abs(ck)}}{x}\\,dx` },
      { txt: 'Integro (sin constante) y aplico exponencial (x > 0):', tex: `\\ln|v|=${suma([[e, '\\ln x']])}\\;\\Rightarrow\\;v=${xp(e)}` },
      { txt: 'Con el paréntesis en 0 queda u′·v = Q; despejo u′ (al dividir potencias se restan los exponentes):', tex: `u'\\,${xp(e)}=${suma([[m * q, xp(mu)]])}\\;\\Rightarrow\\;u'=${suma([[m * q, xp(mu - e)]])}` },
      { txt: 'Integro con la regla de la potencia:', tex: `u=\\int ${suma([[m * q, xp(mu - e)]])}\\,dx=\\frac{${m * q}}{${s}}\\,x^{${s}}+C` },
      { txt: `Simplifico el coeficiente: ${m * q}/${s} = ${U}.`, tex: `u=${suma([[U, xp(s)]])}+C` },
      { txt: 'Vuelvo a z = u·v y distribuyo:', tex: `z=\\left(${suma([[U, xp(s)]])}+C\\right)${xp(e)}=${suma([[U, `${xp(s)}${xp(e)}`]])}+C${xp(e)}` },
      { txt: `Sumo los exponentes (${s} ${e < 0 ? '−' : '+'} ${Math.abs(e)} = ${mu + 1}):`, tex: `z=${zsol}` },
      { txt: vn.txt, tex: vn.ec },
      { txt: 'Reemplazo z por su expresión:', tex: `y=${sub(vn.y, zsol)}` },
    );
    ycampo = `y=${sub(vn.y, zsol)}`;
    res = n.n > 0 ? `${ycampo}\\quad\\text{y además } y\\equiv 0` : ycampo;
    // z > 0 (n = -1) o z < 0 (n = 2) en todo el dominio: C elegida para que y sea de orden 1 y no se anule nunca
    const Cs0 = n.n > 0 ? [-1, -2] : [1, 2];
    const zf = (x, C) => U * x ** (mu + 1) + C * x ** e;
    y = n.n > 0 ? (x, C) => 1 / zf(x, C) : (x, C) => Math.sqrt(zf(x, C));
    ec = (x, yy, y1) => y1 + (k / x) * yy - q * x ** mu * yy ** n.n;
    dom = [1, 1.5]; Cs = Cs0;
  }
  return {
    enunciado: [{ txt: 'Hallar la solución general de la ecuación de Bernoulli:', tex: enun }],
    pasos, resultado: { tex: res },
    verif: { orden: 1, dom, consts: Cs.map((C) => [C]), y, ec, n: n.n / n.d, tipo },
  };
}

export const GENERADORES_EDO1 = [
  { id: 'lineal', nombre: 'EDO lineal de 1.er orden (y = u·v)', grupo: 'EDO', generar: lineal },
  { id: 'bernoulli', nombre: 'EDO de Bernoulli', grupo: 'EDO', generar: bernoulli },
];
