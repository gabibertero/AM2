// Diferencial total y propagación de errores. Cinco modos: error máximo con % (valores absolutos), variación con signo ("aumenta/disminuye"),
// material de una pieza hueca (espesores), aproximación numérica f(P+dP) ≈ f(P)+f'_x dx+f'_y dy y ángulo en radianes (tiro oblicuo).
// Notación de cátedra: V'_r, e_máx, e_rel, e_%. Todo exacto con fracciones. Lógica pura.
import { fr, fSum, fMul, fVal, texF, texPi, suma, SEN } from './mate.js';
import { lineas, num, aprox, p3, p3Tex, p3D, p3Ev, p3Fr, p3Sub } from './p1-comun.js';

const FIG = {
  cil: { nombre: 'un cilindro', vn: ['r', 'h'], medidas: ['el radio r', 'la altura h'], rango: [[5, 10, 12, 15, 20], [10, 20, 25, 30]], V: [[1, 2, 1, 0]], S: [[2, 2, 0, 0], [2, 1, 1, 0]], pi: true },
  cono: { nombre: 'un cono', vn: ['r', 'h'], medidas: ['el radio r', 'la altura h'], rango: [[5, 10, 12, 15], [10, 15, 20, 30]], V: [[fr(1, 3), 2, 1, 0]], pi: true },
  caja: { nombre: 'una caja (paralelepípedo)', vn: ['a', 'b', 'c'], medidas: ['el largo a', 'el ancho b', 'el alto c'], rango: [[10, 20, 30, 40], [10, 20, 25, 50], [5, 10, 15, 20]], V: [[1, 1, 1, 1]], S: [[2, 1, 1, 0], [2, 0, 1, 1], [2, 1, 0, 1]], pi: false },
};
const dx = (n) => `d${n}`;
const sgn = (f) => (f.n < 0 ? '-' : '+');

// Modos "error máximo con %" (valores absolutos) y "variación con signo" sobre cilindro, cono o caja (V o S).
function generico(rng, conSigno) {
  const id = rng.elegir(['cil', 'cil', 'cono', 'caja', 'caja']);
  const F = FIG[id];
  const mag = F.S && (id === 'cil' ? rng() < 0.5 : rng() < 0.4) ? 'S' : 'V';
  const p = p3(F[mag].map(([c, i, j, k]) => [c, i, j, k]));
  const nv = F.vn.length, vn = F.vn;
  const m = F.rango.map((r) => rng.elegir(r));
  const igual = !conSigno && rng() < 0.6, e0 = rng.elegir([1, 2, 3, 5]);
  const e = Array.from({ length: nv }, () => (igual ? e0 : rng.elegir([1, 2, 3, 5])));
  const s = Array.from({ length: nv }, () => (conSigno ? rng.signo() : 1));
  if (conSigno && s.every((x) => x === s[0])) s[nv - 1] = -s[0]; // que haya aumentos y disminuciones
  const P = [m[0], m[1], nv > 2 ? m[2] : 0];
  const Pf = F.pi;
  const PI = Pf ? '\\pi' : '';
  const pt = (q, v) => suma(q.map(([c, i, j, k]) => [c, `${PI ? `${PI} ` : ''}${p3Tex([[1, i, j, k]], v)}`]));
  const ptSub = (q) => (Pf ? `\\pi\\cdot ${q.length > 1 ? `\\left(${p3Sub(q, P)}\\right)` : p3Sub(q, P)}` : p3Sub(q, P));
  const coef = (f) => (Pf ? texPi(f) : texF(f));
  const D = Array.from({ length: nv }, (_, i) => p3D(p, i));
  const parc = D.map((q) => p3Fr(q, ...P)); // coeficiente de π (o valor)
  const delta = m.slice(0, nv).map((mm, i) => fr(s[i] * mm * e[i], 100)); // con signo
  const terms = parc.map((c, i) => fMul(c, delta[i]));
  const total = conSigno ? terms.reduce((t, x) => fSum(t, x), fr(0)) : terms.reduce((t, x) => fSum(t, fr(Math.abs(x.n), x.d)), fr(0));
  const V0 = p3Fr(p, ...P);
  const ratio = fMul(total, fr(V0.d, V0.n));
  const unid = `\\text{cm}^{${mag === 'V' ? 3 : 2}}`;
  const val = (f) => fVal(f) * (Pf ? Math.PI : 1);
  const L = mag; // V o S
  const Lp = vn.map((n) => `${L}'_{${n}}`);
  const dTotal = `d${L}&=${vn.map((n, i) => `${Lp[i]}\\,${dx(n)}`).join('+')}`;
  const absEnun = vn.map((n, i) => `\\left|${Lp[i]}\\right|\\left|${dx(n)}\\right|`).join('+');
  const medTxt = vn.map((n, i) => `${F.medidas[i]} = ${m[i]} cm`).join(', ');
  const cambio = vn.map((n, i) => `${F.medidas[i]} ${s[i] > 0 ? 'aumenta' : 'disminuye'} ${e[i]}%`).join(', ');
  const errTxt = igual ? `con un error de a lo sumo ${e0}% en cada medida` : `con errores de a lo sumo ${vn.map((n, i) => `${e[i]}% en ${n}`).join(', ')}`;
  const formula = pt(p, vn);
  const nueva = P.slice(0, nv).map((mm, i) => mm + fVal(delta[i]));
  const exacta = (Pf ? Math.PI : 1) * (p3Ev(p, nueva[0], nueva[1], nueva[2] ?? 0) - fVal(V0));
  const pasos = [
    { txt: `Escribo la fórmula de ${mag === 'V' ? 'el volumen' : 'la superficie total'} en función de las medidas:`, tex: `${L}\\left(${vn.join(',')}\\right)=${formula}` },
    conSigno
      ? { txt: `Una pequeña variación de las medidas produce una variación de ${L} que se aproxima con la diferencial total (es válida porque ${L} es un polinomio, de clase C¹). Acá cada d${vn.join(', d')} lleva su signo (positivo si la medida aumenta, negativo si disminuye) y el resultado también:`, tex: lineas([dTotal]) }
      : { txt: `Una pequeña variación de las medidas produce una variación de ${L} que se aproxima con la diferencial total (es válida porque ${L} es un polinomio, de clase C¹). El error máximo se obtiene sumando el valor absoluto de cada término, porque los errores de cada medida pueden sumarse todos en el mismo sentido (|${vn.map((n) => dx(n)).join('|, |')}| son los errores de las medidas):`, tex: lineas([dTotal, `e_{\\max}&\\approx\\left|d${L}\\right|\\leq ${absEnun}`]) },
    { txt: 'Derivo respecto de cada medida:', tex: lineas(vn.map((n, i) => `${Lp[i]}&=\\frac{\\partial ${L}}{\\partial ${n}}=${pt(D[i], vn)}`)) },
    { txt: `Evalúo las derivadas en las medidas (${medTxt}):`, tex: lineas(vn.flatMap((n, i) => [`${Lp[i]}&=${ptSub(D[i])}`, `&=${coef(parc[i])}`])) },
    conSigno
      ? { txt: 'Cada medida cambia un porcentaje de su valor: d(medida) = ±e/100 · medida, con + si aumenta y − si disminuye:', tex: lineas(vn.flatMap((n, i) => [`${dx(n)}&=${s[i] > 0 ? '+' : '-'}\\frac{${e[i]}}{100}\\cdot ${m[i]}`, `&=${num(delta[i])}`])) }
      : { txt: 'El error de una medida con error porcentual e% es |d(medida)| = e/100 · medida:', tex: lineas(vn.flatMap((n, i) => [`\\left|${dx(n)}\\right|&=\\frac{${e[i]}}{100}\\cdot ${m[i]}`, `&=${num(delta[i])}`])) },
    conSigno
      ? { txt: `Calculo d${L} sumando los términos con su signo:`, tex: lineas([
        `d${L}&=${vn.map((n, i) => `\\left(${coef(parc[i])}\\right)\\cdot\\left(${num(delta[i])}\\right)`).join('+')}`,
        `&=${terms.map(coef).reduce((a, x) => (x.startsWith('-') ? `${a}${x}` : `${a}+${x}`))}`,
        `&=${coef(total)}\\ ${unid}`,
        `&\\approx ${aprox(val(total), 2)}\\ ${unid}`]) }
      : { txt: `Calculo el error absoluto máximo e_máx ≈ |d${L}| (cada término con valor absoluto):`, tex: lineas([
        `e_{\\max}&\\approx ${vn.map((n, i) => `\\left|${coef(parc[i])}\\right|\\cdot\\left|${num(delta[i])}\\right|`).join('+')}`,
        `&=${terms.map((x) => coef(fr(Math.abs(x.n), x.d))).join('+')}`,
        `&=${coef(total)}\\ ${unid}`,
        `&\\approx ${aprox(val(total), 2)}\\ ${unid}`]) },
    { txt: `Calculo ${mag === 'V' ? 'el volumen' : 'la superficie'} con las medidas, para comparar:`, tex: lineas([`${L}&=${ptSub(p)}`, `&=${coef(V0)}\\ ${unid}`]) },
    conSigno
      ? { txt: `La variación relativa es el cociente entre d${L} y ${L} (el π, si aparece, se simplifica); la porcentual es la relativa por 100. El signo ${total.n < 0 ? 'negativo indica que la magnitud disminuye' : 'positivo indica que la magnitud aumenta'}:`, tex: lineas([
        `e_{\\text{rel}}&=\\frac{d${L}}{${L}}`, `&=\\frac{${coef(total)}}{${coef(V0)}}`, `&=${texF(ratio)}`, `&\\approx ${aprox(fVal(ratio), 4)}`,
        `e_{\\%}&=e_{\\text{rel}}\\cdot 100\\%`, `&\\approx ${aprox(fVal(ratio) * 100, 2)}\\%`]) }
      : { txt: 'El error relativo es el cociente entre el error absoluto y el valor de la magnitud (el π, si aparece, se simplifica); el porcentual es el relativo por 100:', tex: lineas([
        `e_{\\text{rel}}&=\\frac{e_{\\max}}{${L}}`, `&=\\frac{${coef(total)}}{${coef(V0)}}`, `&=${texF(ratio)}`, `&\\approx ${aprox(fVal(ratio), 4)}`,
        `e_{\\%}&=e_{\\text{rel}}\\cdot 100\\%`, `&\\approx ${aprox(fVal(ratio) * 100, 2)}\\%`]) },
    { txt: `Control (opcional): calculo la variación exacta Δ${L} con las medidas ${conSigno ? 'ya modificadas' : 'todas aumentadas en su error'} y veo que queda cerca de ${conSigno ? `d${L}` : 'e_máx'}:`, tex: lineas([`\\Delta ${L}&=${L}\\left(${nueva.map((x) => num(fr(Math.round(x * 1000), 1000))).join(',\\ ')}\\right)-${L}\\left(${vn.map((n, i) => m[i]).join(',\\ ')}\\right)`, `&\\approx ${aprox(exacta, 2)}\\ ${unid}`]) },
  ];
  const resTxt = conSigno
    ? [`d${L}&=${coef(total)}\\ ${unid}\\approx ${aprox(val(total), 2)}\\ ${unid}`, `e_{\\text{rel}}&=${texF(ratio)}\\approx ${aprox(fVal(ratio), 4)}`, `e_{\\%}&\\approx ${aprox(fVal(ratio) * 100, 2)}\\%`]
    : [`e_{\\max}&=${coef(total)}\\ ${unid}\\approx ${aprox(val(total), 2)}\\ ${unid}`, `e_{\\text{rel}}&=${texF(ratio)}\\approx ${aprox(fVal(ratio), 4)}`, `e_{\\%}&\\approx ${aprox(fVal(ratio) * 100, 2)}\\%`];
  return {
    enunciado: [conSigno
      ? { txt: `Se tiene ${F.nombre} con ${medTxt}. Las medidas cambian: ${cambio}. Usando la diferencial total, hallar la variación d${L} de ${mag === 'V' ? 'el volumen' : 'la superficie total'} (con su signo, en ${mag === 'V' ? 'cm³' : 'cm²'}) y la variación porcentual.`, tex: `${L}=${formula}` }
      : { txt: `Se mide ${F.nombre}: ${medTxt}, ${errTxt}. Usando la diferencial total, hallar el error absoluto máximo, el error relativo y el error porcentual al calcular ${mag === 'V' ? 'el volumen' : 'la superficie total'} (en ${mag === 'V' ? 'cm³' : 'cm²'}).`, tex: `${L}=${formula}` }],
    pasos,
    resultado: { tex: lineas(resTxt) },
    verif: { f: (v) => val(p3Fr(p, v[0], v[1], v[2] ?? 0)), vals: m.slice(0, nv), delta: delta.map(fVal), dF: val(total), rel: fVal(ratio), pct: fVal(ratio) * 100, parc: parc.map(val), mag, id, modo: conSigno ? 'signo' : 'abs' },
  };
}

// Material de una pieza hueca (1H9 May-24 #2): diámetro → radio y espesores de pared, fondo y tapa (cada uno una sola vez).
function hueca(rng) {
  const Dm = rng.elegir([6, 8, 10, 12]), r = Dm / 2, h = rng.elegir([10, 12, 15, 20]);
  const w = rng.elegir([1, 2, 3]), fo = rng.elegir([2, 5]), ta = rng.elegir([1, 2]);
  const dr = fr(w, 10), dh = fr(fo + ta, 10);
  const Vr = 2 * r * h, Vh = r * r; // coeficientes de π
  const total = fSum(fMul(fr(Vr), dr), fMul(fr(Vh), dh));
  const R1 = fSum(fr(r), dr), H1 = fSum(fr(h), dh);
  const ext = fMul(fMul(R1, R1), H1), exacta = fSum(ext, fr(-r * r * h));
  const val = (f) => fVal(f) * Math.PI;
  const pasos = [
    { txt: `Paso el diámetro a radio y los espesores a cm. Las medidas del hueco son r = ${Dm}/2 = ${r} cm y h = ${h} cm. La pared lateral suma ${w} mm al radio (una vez); el fondo y la tapa suman ${fo} mm y ${ta} mm a la altura (cada espesor una sola vez):`, tex: lineas([`dr&=${w}\\ \\text{mm}=${num(dr)}\\ \\text{cm}`, `dh&=${fo}\\ \\text{mm}+${ta}\\ \\text{mm}=${fo + ta}\\ \\text{mm}=${num(dh)}\\ \\text{cm}`]) },
    { txt: 'La fórmula es la del volumen del hueco. El material que se agrega al hacer las paredes es la variación dV (acá los incrementos son positivos: son espesores, no errores con ±):', tex: lineas(['V(r,h)&=\\pi r^{2}h', "dV&=V'_r\\,dr+V'_h\\,dh"]) },
    { txt: 'Derivo y evalúo en r y h:', tex: lineas(["V'_r&=2\\pi rh", `&=2\\pi\\cdot ${r}\\cdot ${h}=${Vr}\\pi`, "V'_h&=\\pi r^{2}", `&=\\pi\\cdot ${r}^{2}=${Vh}\\pi`]) },
    { txt: 'Reemplazo en dV:', tex: lineas([`dV&=${Vr}\\pi\\cdot ${num(dr)}+${Vh}\\pi\\cdot ${num(dh)}`, `&=${texPi(total)}\\ \\text{cm}^{3}`, `&\\approx ${aprox(val(total), 2)}\\ \\text{cm}^{3}`]) },
    { txt: `Ojo: ese es el material, no el volumen del hueco, que es π r² h = ${r * r * h}π cm³. Control por capas (volumen exterior menos interior), que da un valor cercano porque los espesores son chicos:`, tex: lineas([`V_{\\text{ext}}-V_{\\text{int}}&=\\pi\\left(${num(R1)}\\right)^{2}\\left(${num(H1)}\\right)-\\pi\\cdot ${r}^{2}\\cdot ${h}`, `&=${texPi(exacta)}\\ \\text{cm}^{3}\\approx ${aprox(val(exacta), 2)}\\ \\text{cm}^{3}`]) },
  ];
  return {
    enunciado: [{ txt: `Un recipiente cilíndrico tiene ${Dm} cm de diámetro interior y ${h} cm de altura interior. La pared lateral tiene ${w} mm de espesor, el fondo ${fo} mm y la tapa ${ta} mm. Usando la diferencial, calcular aproximadamente el volumen de material que se usa.`, tex: 'V=\\pi r^{2}h' }],
    pasos,
    resultado: { tex: lineas([`dV&=${texPi(total)}\\ \\text{cm}^{3}\\approx ${aprox(val(total), 2)}\\ \\text{cm}^{3}`]) },
    verif: { f: (v) => Math.PI * v[0] * v[0] * v[1], vals: [r, h], delta: [fVal(dr), fVal(dh)], dF: val(total), rel: null, pct: null, parc: [Vr * Math.PI, Vh * Math.PI], mag: 'V', id: 'hueca', modo: 'hueca' },
  };
}

// Aproximar un valor: f(P+dP) ≈ f(P) + f'_x dx + f'_y dy, con f(P) exacto.
function aproximar(rng) {
  const raiz = rng() < 0.55;
  const [x0, y0] = raiz ? rng.elegir([[3, 4], [4, 3], [6, 8], [8, 6], [5, 12], [12, 5]]) : (() => { const k = rng.elegir([1, 2, 4, 5]); return [k, k]; })();
  const ix = rng.nz(4), iy = rng.nz(4); // incrementos en centésimas
  const ddx = fr(ix, 100), ddy = fr(iy, 100);
  const X = fSum(fr(x0), ddx), Y = fSum(fr(y0), ddy);
  const r5 = raiz ? Math.hypot(x0, y0) : 0; // hipotenusa entera
  const fx = raiz ? fr(x0, r5) : fr(1, x0), fy = raiz ? fr(y0, r5) : fr(-1, y0), f0 = raiz ? fr(r5) : fr(0);
  const lin = fSum(fMul(fx, ddx), fMul(fy, ddy)), aprx = fSum(f0, lin);
  const fn = raiz ? (x, y) => Math.hypot(x, y) : (x, y) => Math.log(x / y);
  const ftex = raiz ? '\\sqrt{x^{2}+y^{2}}' : '\\ln\\frac{x}{y}';
  const enun = raiz ? `\\sqrt{\\left(${num(X)}\\right)^{2}+\\left(${num(Y)}\\right)^{2}}` : `\\ln\\frac{${num(X)}}{${num(Y)}}`;
  const pasos = [
    { txt: `Elijo f y un punto base P=(${x0}, ${y0}) donde f se calcule exacto, cerca del punto pedido; los incrementos son las diferencias (con signo):`, tex: lineas([`f(x,y)&=${ftex}`, `dx&=${num(X)}-${x0}=${num(ddx)}`, `dy&=${num(Y)}-${y0}=${num(ddy)}`]) },
    { txt: 'Derivo f:', tex: lineas(raiz ? ["f'_x&=\\frac{x}{\\sqrt{x^{2}+y^{2}}}", "f'_y&=\\frac{y}{\\sqrt{x^{2}+y^{2}}}"] : ["f'_x&=\\frac{1}{x}", "f'_y&=-\\frac{1}{y}"]) },
    { txt: 'Evalúo f y las derivadas en P:', tex: lineas(raiz
      ? [`f(P)&=\\sqrt{${x0}^{2}+${y0}^{2}}=${r5}`, `f'_x(P)&=\\frac{${x0}}{${r5}}=${texF(fx)}`, `f'_y(P)&=\\frac{${y0}}{${r5}}=${texF(fy)}`]
      : [`f(P)&=\\ln\\frac{${x0}}{${y0}}=\\ln 1=0`, `f'_x(P)&=\\frac{1}{${x0}}`, `f'_y(P)&=-\\frac{1}{${y0}}`]) },
    { txt: 'Aplico f(P + dP) ≈ f(P) + f\'_x·dx + f\'_y·dy:', tex: lineas([`f(P+dP)&\\approx ${texF(f0)}+${fp0(fx)}\\cdot ${fp0(ddx)}+${fp0(fy)}\\cdot ${fp0(ddy)}`, `&=${num(f0)}${lin.n < 0 ? '' : '+'}${num(lin)}`, `&=${num(aprx)}\\approx ${aprox(fVal(aprx), 5)}`]) },
    { txt: 'Control con la calculadora (el valor exacto queda muy cerca de la aproximación, la diferencia es de segundo orden):', tex: `${enun}\\approx ${aprox(fn(fVal(X), fVal(Y)), 5)}` },
  ];
  return {
    enunciado: [{ txt: 'Calcular aproximadamente, usando la diferencial de una función de dos variables:', tex: enun }],
    pasos,
    resultado: { tex: `${enun}\\approx ${num(aprx)}\\approx ${aprox(fVal(aprx), 5)}` },
    verif: { f: (v) => fn(v[0], v[1]), vals: [x0, y0], delta: [fVal(ddx), fVal(ddy)], dF: fVal(lin), rel: null, pct: null, parc: [fVal(fx), fVal(fy)], mag: 'f', id: raiz ? 'raiz' : 'ln', modo: 'aprox', aprox: fVal(aprx) },
  };
}
const fp0 = (f) => (f.n < 0 ? `\\left(${num(f)}\\right)` : num(f));

// Ángulo en radianes (Recup. Nov-25 #2): H = v₀² sen²θ / (2g) con θ = 45° ± k°. d(θ) = kπ/180, no k.
function tiro(rng) {
  const v0 = rng.elegir([20, 30, 40, 50, 60]), e = rng.elegir([1, 2, 3]), k = rng.elegir([1, 2, 3, 5]), g = 10;
  const A = fr(v0, 2 * g), B = fr(v0 * v0, 2 * g); // H'_v0 y H'_θ en θ = 45°
  const dv = fr(v0 * e, 100), dth = fr(k, 180); // dθ en múltiplos de π
  const al = fMul(A, dv), be = fMul(B, dth), H0 = fr(v0 * v0, 4 * g);
  const total = al.n * 1 / al.d + (be.n / be.d) * Math.PI;
  const rel = total / fVal(H0);
  const th = Math.PI / 4;
  const pasos = [
    { txt: `Datos: v₀ = ${v0} m/s, θ = 45° = π/4 rad, g = ${g} m/s². Los errores son dv₀ = ${e}% de v₀ y dθ = ${k}° (hay que pasarlo a radianes: ${k}° = ${k}π/180 rad; usar ${k} directamente daría un resultado absurdo).`, tex: lineas([`dv_{0}&=\\frac{${e}}{100}\\cdot ${v0}=${num(dv)}`, `d\\theta&=${k}^{\\circ}=${texPi(dth)}\\ \\text{rad}`]) },
    { txt: 'La altura máxima y su diferencial total (los errores pueden sumarse en el mismo sentido):', tex: lineas([`H(v_{0},\\theta)&=\\frac{v_{0}^{2}\\,${SEN}^{2}\\theta}{2g}`, "e_{\\max}&\\approx\\left|H'_{v_{0}}\\right|\\left|dv_{0}\\right|+\\left|H'_{\\theta}\\right|\\left|d\\theta\\right|"]) },
    { txt: 'Derivo respecto de v₀ y de θ:', tex: lineas([`H'_{v_{0}}&=\\frac{v_{0}\\,${SEN}^{2}\\theta}{g}`, `H'_{\\theta}&=\\frac{v_{0}^{2}\\,${SEN}\\theta\\cos\\theta}{g}`]) },
    { txt: `Evalúo en θ = 45° (sen²45° = 1/2 y sen45°·cos45° = 1/2):`, tex: lineas([`H'_{v_{0}}&=\\frac{${v0}\\cdot\\frac{1}{2}}{${g}}=${texF(A)}`, `H'_{\\theta}&=\\frac{${v0}^{2}\\cdot\\frac{1}{2}}{${g}}=${texF(B)}`]) },
    { txt: 'Calculo el error absoluto máximo (el término del ángulo queda con π):', tex: lineas([`e_{\\max}&=${texF(A)}\\cdot ${num(dv)}+${texF(B)}\\cdot ${texPi(dth)}`, `&=${texF(al)}+${texPi(be)}`, `&\\approx ${aprox(total, 3)}\\ \\text{m}`]) },
    { txt: 'La altura con los valores medidos y los errores relativo y porcentual:', tex: lineas([`H&=\\frac{${v0}^{2}\\cdot\\frac{1}{2}}{2\\cdot ${g}}=${texF(H0)}\\ \\text{m}`, `e_{\\text{rel}}&=\\frac{e_{\\max}}{H}\\approx ${aprox(rel, 4)}`, `e_{\\%}&\\approx ${aprox(rel * 100, 2)}\\%`]) },
  ];
  return {
    enunciado: [{ txt: `Un proyectil se lanza con velocidad v₀ = ${v0} m/s y ángulo θ = 45° (g = ${g} m/s²). Si v₀ tiene un error del ${e}% y θ un error de ${k}°, hallar con la diferencial el error absoluto máximo, el relativo y el porcentual de la altura máxima.`, tex: `H=\\frac{v_{0}^{2}\\,${SEN}^{2}\\theta}{2g}` }],
    pasos,
    resultado: { tex: lineas([`e_{\\max}&=${texF(al)}+${texPi(be)}\\approx ${aprox(total, 3)}\\ \\text{m}`, `e_{\\text{rel}}&\\approx ${aprox(rel, 4)}`, `e_{\\%}&\\approx ${aprox(rel * 100, 2)}\\%`]) },
    verif: { f: (v) => (v[0] * v[0] * Math.sin(v[1]) ** 2) / (2 * g), vals: [v0, th], delta: [fVal(dv), fVal(dth) * Math.PI], dF: total, rel, pct: rel * 100, parc: [fVal(A), fVal(B)], mag: 'H', id: 'tiro', modo: 'tiro' },
  };
}

function diferencial(rng) {
  return rng.elegir([() => generico(rng, false), () => generico(rng, false), () => generico(rng, true), () => hueca(rng), () => aproximar(rng), () => tiro(rng)])();
}

export const GENERADORES_P1_DIFERENCIAL = [{ id: 'diferencial', nombre: 'Diferencial y errores', grupo: 'Cálculo', instancia: 'p1', generar: diferencial }];
