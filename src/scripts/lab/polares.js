// Integral doble / volumen sobre un disco o anillo (completo, mitad superior o primer cuadrante) con coordenadas polares
// (jacobiano r). Integrandos: constante, y, x², y², √(x²+y²). Lógica pura.
import { fr, fSum, fMul, fVal, fNeg, texF, texPi, suma, unir, parN, SEN } from './mate.js';

const aligned = (filas) => `\\begin{aligned}${filas.join('\\\\')}\\end{aligned}`;
const SECTORES = {
  full: { dpi: 2, sTheta: 0, cos1: 1, txt: '', tex: '' },
  semi: { dpi: 1, sTheta: 2, cos1: -1, txt: 'la mitad superior (y ≥ 0) ', tex: ',\\ y\\ge 0' },
  cuarto: { dpi: 0.5, sTheta: 1, cos1: 0, txt: 'la porción del primer cuadrante (x ≥ 0, y ≥ 0) ', tex: ',\\ x\\ge 0,\\ y\\ge 0' },
};

function polares(rng) {
  const anillo = rng() < 0.5;
  const sector = rng.elegir(['full', 'full', 'semi', 'cuarto']);
  const S = SECTORES[sector];
  const r1 = anillo ? rng.ent(1, 2) : 0;
  const r2 = anillo ? r1 + rng.ent(1, 2) : rng.ent(1, 4);
  const tipo = rng.elegir(['parab', 'cono', 'plano', 'gen', 'gen']);
  let al, p = 0, q = 0, ga = 0, e = 0;
  if (tipo === 'parab') [al, p, q] = [r2 * r2, -1, -1];
  else if (tipo === 'cono') [al, ga] = [r2, -1];
  else if (tipo === 'plano') [al, e] = [sector === 'full' ? r2 + rng.ent(0, 2) : rng.ent(1, 3), 1]; // z = y + c, c ≥ r2 para que z ≥ 0
  else do { [al, p, q, ga] = [rng.ent(-2, 3), rng.ent(-3, 3), rng.ent(-3, 3), rng.ent(-2, 2)]; } while (!al && !p && !q && !ga);
  const f = suma([[al, ''], [e, 'y'], [p, 'x^{2}'], [q, 'y^{2}'], [ga, '\\sqrt{x^{2}+y^{2}}']]);
  const quad = p !== 0 || q !== 0, igual = p === q; // p = q: se simplifica con sen²+cos²=1
  const th1 = texPi(fr(S.dpi * 2, 2));
  const regTex = `${anillo ? `${r1 * r1}\\le x^{2}+y^{2}\\le ${r2 * r2}` : `x^{2}+y^{2}\\le ${r2 * r2}`}${S.tex}`;
  const regTxt = sector === 'full' ? `el ${anillo ? 'anillo' : 'disco'}` : `${S.txt}del ${anillo ? 'anillo' : 'disco'}`;
  const lr = `${r1}\\le r\\le ${r2},\\qquad 0\\le\\theta\\le ${th1}`;
  const cos2 = '\\cos^{2}\\theta', sen2 = `${SEN}^{2}\\theta`, senT = `${SEN}\\theta`;
  const trig = suma([[p, cos2], [q, sen2]]);
  // integrando en polares
  const pol = suma([[al, ''], [ga, 'r'], [e, `r\\,${senT}`], [igual ? p : 0, 'r^{2}'], [!igual && quad ? 1 : 0, `r^{2}\\left(${trig}\\right)`]]);
  // ∫ (pol)·r dr
  const cuarta = igual ? (p ? [fr(p, 4), 'r^{4}'] : [0, '']) : [fr(1, 4), `r^{4}\\left(${trig}\\right)`];
  const integ = [[al, 'r'], [ga, 'r^{2}'], [e, `r^{2}${senT}`], igual ? (p ? [p, 'r^{3}'] : [0, '']) : quad ? [1, `r^{3}\\left(${trig}\\right)`] : [0, '']];
  const prim = (R) => (R === 0 ? '0' : suma([[fr(al, 2), `${R}^{2}`], [fr(ga, 3), `${R}^{3}`], [fr(e, 3), `${R}^{3}${senT}`], [cuarta[0], `${R}^{4}${igual ? '' : `\\left(${trig}\\right)`}`]]));
  const primSimb = suma([[fr(al, 2), 'r^{2}'], [fr(ga, 3), 'r^{3}'], [fr(e, 3), `r^{3}${senT}`], cuarta]);
  const sumR = (R) => suma([[fSum(fr(al * R * R, 2), fSum(fr(ga * R ** 3, 3), igual && p ? fr(p * R ** 4, 4) : fr(0))), ''], [fr(e * R ** 3, 3), senT], [!igual && quad ? fr(R ** 4, 4) : 0, `\\left(${trig}\\right)`]]);
  const pr = (R) => fr(R * R * R * R);
  const K1 = fSum(fMul(fr(al, 2), fr(r2 * r2 - r1 * r1)), fMul(fr(ga, 3), fr(r2 ** 3 - r1 ** 3)));
  const Ke = fMul(fr(e, 3), fr(r2 ** 3 - r1 ** 3));
  const K2 = fMul(fr(1, 4), fSum(pr(r2), fNeg(pr(r1))));
  const Kc = igual ? fSum(K1, fMul(fr(p), K2)) : K1;
  const rad = suma([[Kc, ''], [Ke, senT], [igual || !quad ? 0 : K2, `\\left(${trig}\\right)`]]);
  const dpi = fr(S.dpi * 2, 2); // Δθ/π
  const mitad = fMul(dpi, fr(1, 2)); // ∫cos² = ∫sen² = Δθ/2
  const totPi = fSum(fMul(Kc, dpi), igual || !quad ? fr(0) : fMul(fMul(K2, fr(p + q)), mitad));
  const totC = fMul(Ke, fr(S.sTheta));
  const totTex = unir(totPi.n === 0 && totC.n !== 0 ? '' : texPi(totPi), totC.n === 0 ? '' : texF(totC)) || '0';
  const volumen = tipo !== 'gen';
  const pasos = [
    { txt: `La región es ${anillo ? 'un anillo' : 'un disco'} centrado en el origen${sector === 'full' ? '' : ' recortado'}: conviene pasar a polares, porque x² + y² = r² y los círculos pasan a ser r = constante. Describo la región: r va de ${r1} a ${r2} (r es una distancia, así que r ≥ 0)${sector === 'semi' ? ' y, como y ≥ 0, sen θ ≥ 0, o sea θ va de 0 a π' : sector === 'cuarto' ? ' y, como x ≥ 0 e y ≥ 0, θ va de 0 a π/2' : ' y θ da toda la vuelta, de 0 a 2π'}.`, tex: lr },
    { txt: 'El cambio de variables a polares es:', tex: `x=r\\cos\\theta,\\qquad y=r\\,${senT}` },
    { txt: 'El jacobiano es el determinante de las derivadas parciales de (x, y) respecto de (r, θ):', tex: aligned([
      `J&=\\begin{vmatrix}\\frac{\\partial x}{\\partial r}&\\frac{\\partial x}{\\partial\\theta}\\\\[2pt]\\frac{\\partial y}{\\partial r}&\\frac{\\partial y}{\\partial\\theta}\\end{vmatrix}=\\begin{vmatrix}\\cos\\theta&-r\\,${senT}\\\\${senT}&r\\cos\\theta\\end{vmatrix}`,
      `&=r\\cos^{2}\\theta+r\\,${SEN}^{2}\\theta`,
      `&=r\\left(\\cos^{2}\\theta+${SEN}^{2}\\theta\\right)`,
      `&=r\\cdot 1=r`,
    ]) },
    { txt: 'Como r ≥ 0, el valor absoluto del jacobiano es |J| = r. Entonces dA = r dr dθ (el factor r no se puede olvidar).', tex: 'dA=|J|\\,dr\\,d\\theta=r\\,dr\\,d\\theta' },
  ];
  if (ga) pasos.push({ txt: 'Paso la raíz a polares: x² + y² = r² y, como r ≥ 0, √(r²) = r (sin valor absoluto).', tex: '\\sqrt{x^{2}+y^{2}}=\\sqrt{r^{2}}=r' });
  if (e) pasos.push({ txt: 'La variable y se reemplaza directamente por r·sen θ:', tex: `y=r\\,${senT}` });
  if (quad && igual) {
    pasos.push({ txt: `Paso los términos cuadráticos a polares (x² = r²cos²θ, y² = r²sen²θ). Como los dos coeficientes son iguales (${p}), saco factor común y uso cos²θ + sen²θ = 1:`, tex: aligned([
      `${suma([[p, 'x^{2}'], [p, 'y^{2}']])}&=${suma([[p, `r^{2}${cos2}`], [p, `r^{2}${sen2}`]])}`,
      `&=${p === 1 ? '' : p === -1 ? '-' : `${p}`}r^{2}\\left(${cos2}+${sen2}\\right)`,
      `&=${suma([[p, 'r^{2}']])}`,
    ]) });
  } else if (quad) {
    pasos.push({ txt: 'Paso los términos cuadráticos a polares (x² = r²cos²θ, y² = r²sen²θ) y saco r² factor común (los coeficientes son distintos, así que no se simplifica):', tex: aligned([
      `${suma([[p, 'x^{2}'], [q, 'y^{2}']])}&=${suma([[p, `r^{2}${cos2}`], [q, `r^{2}${sen2}`]])}`,
      `&=r^{2}\\left(${trig}\\right)`,
    ]) });
  }
  pasos.push(
    { txt: 'Reúno el integrando en polares:', tex: `f(r\\cos\\theta,\\,r\\,${senT})=${pol}` },
    { txt: 'Planteo la integral iterada: los límites son constantes, así que puedo integrar primero en r. Multiplico por el jacobiano r:', tex: `\\int_0^{${th1}}\\!\\int_{${r1}}^{${r2}}\\left(${pol}\\right)r\\,dr\\,d\\theta` },
    { txt: 'Distribuyo la r del jacobiano (θ se trata como constante al integrar en r):', tex: `\\int_{${r1}}^{${r2}}\\left(${suma(integ)}\\right)dr` },
    { txt: 'Busco la primitiva en r (regla de la potencia) y evalúo en los límites, en líneas separadas:', tex: aligned([
      `&=\\Big[${primSimb}\\Big]_{${r1}}^{${r2}}`,
      `&=\\left(${prim(r2)}\\right)-\\left(${prim(r1)}\\right)`,
      `&=\\left(${suma([[fr(al * r2 * r2, 2), ''], [fr(ga * r2 ** 3, 3), ''], [fr(e * r2 ** 3, 3), senT], igual ? [p ? fr(p * r2 ** 4, 4) : 0, ''] : quad ? [fr(r2 ** 4, 4), `\\left(${trig}\\right)`] : [0, '']])}\\right)-\\left(${suma([[fr(al * r1 * r1, 2), ''], [fr(ga * r1 ** 3, 3), ''], [fr(e * r1 ** 3, 3), senT], igual ? [p ? fr(p * r1 ** 4, 4) : 0, ''] : quad ? [fr(r1 ** 4, 4), `\\left(${trig}\\right)`] : [0, '']])}\\right)`,
      `&=\\left(${sumR(r2)}\\right)-\\left(${sumR(r1)}\\right)`,
      `&=${rad}`,
    ]) },
  );
  if (quad && !igual) {
    pasos.push(
      { txt: 'Para integrar cos²θ y sen²θ uso las identidades del ángulo doble:', tex: `${cos2}=\\frac{1+\\cos 2\\theta}{2},\\qquad ${sen2}=\\frac{1-\\cos 2\\theta}{2}` },
      { txt: `Integro cada una entre 0 y ${th1}. El seno de 2θ en los extremos vale 0 (múltiplos de π), así que solo queda θ/2:`, tex: aligned([
        `\\int_0^{${th1}}${cos2}\\,d\\theta&=\\left[\\frac{\\theta}{2}+\\frac{${SEN}\\,2\\theta}{4}\\right]_0^{${th1}}`,
        `&=\\left(\\frac{${th1}}{2}+\\frac{${SEN}\\left(2\\cdot ${th1}\\right)}{4}\\right)-\\left(0+\\frac{${SEN}\\,0}{4}\\right)`,
        `&=\\frac{${th1}}{2}+0-0=${texPi(mitad)}`,
        `\\int_0^{${th1}}${sen2}\\,d\\theta&=\\left[\\frac{\\theta}{2}-\\frac{${SEN}\\,2\\theta}{4}\\right]_0^{${th1}}=${texPi(mitad)}`,
      ]) },
    );
  }
  if (e) {
    pasos.push({ txt: 'La integral de sen θ en el intervalo (evalúo el coseno en los extremos, en líneas separadas):', tex: aligned([
      `\\int_0^{${th1}}${senT}\\,d\\theta&=\\Big[-\\cos\\theta\\Big]_0^{${th1}}`,
      `&=-\\cos\\left(${th1}\\right)-\\left(-\\cos 0\\right)`,
      `&=-${parN(S.cos1)}+1`,
      `&=${S.sTheta}`,
    ]) });
  }
  const tTerm = [Kc.n !== 0 ? `${texF(Kc)}\\cdot ${th1}` : '', Ke.n !== 0 ? `${texF(Ke)}\\cdot ${S.sTheta}` : '', igual || !quad ? '' : `${texF(K2)}\\left(${parN(p)}\\cdot ${texPi(mitad)}+${parN(q)}\\cdot ${texPi(mitad)}\\right)`].filter(Boolean);
  pasos.push({ txt: `Integro en θ entre 0 y ${th1}: la constante se integra como constante × longitud del intervalo, y reemplazo las integrales que calculé:`, tex: aligned([`\\int_0^{${th1}}\\left(${rad}\\right)d\\theta&=${tTerm.join('+').replaceAll('+-', '-') || '0'}`, `&=${totTex}`]) });
  void fVal;
  return {
    enunciado: [
      volumen
        ? { txt: `Calcular el volumen del sólido que está sobre ${regTxt} D y bajo la superficie z = f(x, y). Graficar.`, tex: `D:\\ ${regTex},\\qquad z=${f}` }
        : { txt: `Calcular la integral doble sobre ${regTxt} D usando coordenadas polares. Graficar la región.`, tex: `\\iint_D\\left(${f}\\right)dA,\\qquad D:\\ ${regTex}` },
    ],
    pasos,
    resultado: { tex: `${volumen ? 'V' : '\\iint_D f\\,dA'}=${totTex}` },
    verif: { f: (x, y) => al + e * y + p * x * x + q * y * y + ga * Math.hypot(x, y), r1, r2, sector, valor: Math.PI * fVal(totPi) + fVal(totC), tipo },
  };
}

export const GENERADORES_POLARES = [{ id: 'polares', nombre: 'Integral doble en polares (disco, anillo o sector)', grupo: 'Integrales', generar: polares }];
