// Integral doble / volumen sobre un disco o anillo con coordenadas polares (jacobiano r). Lógica pura.
import { fr, fSum, fMul, fVal, texF, texPi, suma } from './mate.js';

function polares(rng) {
  const anillo = rng() < 0.5;
  const r1 = anillo ? rng.ent(1, 2) : 0;
  const r2 = anillo ? r1 + rng.ent(1, 2) : rng.ent(1, 4);
  const tipo = rng.elegir(['parab', 'cono', 'gen', 'gen']);
  let al, p, q, ga;
  if (tipo === 'parab') [al, p, q, ga] = [r2 * r2, -1, -1, 0];
  else if (tipo === 'cono') [al, p, q, ga] = [r2, 0, 0, -1];
  else do { [al, p, q, ga] = [rng.ent(-2, 3), rng.ent(-3, 3), rng.ent(-3, 3), rng.ent(-2, 2)]; } while (!al && !p && !q && !ga);
  const f = suma([[al, ''], [p, 'x^{2}'], [q, 'y^{2}'], [ga, '\\sqrt{x^{2}+y^{2}}']]);
  const regTex = anillo ? `${r1 * r1}\\le x^{2}+y^{2}\\le ${r2 * r2}` : `x^{2}+y^{2}\\le ${r2 * r2}`;
  const regTxt = anillo ? 'el anillo' : 'el disco';
  const lr = `${r1}\\le r\\le ${r2},\\quad 0\\le\\theta\\le 2\\pi`;
  const trig = suma([[p, '\\cos^{2}\\theta'], [q, '\\sin^{2}\\theta']]);
  const pol = suma([[al, ''], [ga, 'r'], [p || q ? 1 : 0, `r^{2}\\left(${trig}\\right)`]]);
  const K1 = fSum(fMul(fr(al, 2), fr(r2 * r2 - r1 * r1)), fMul(fr(ga, 3), fr(r2 ** 3 - r1 ** 3)));
  const K2 = fr(r2 ** 4 - r1 ** 4, 4);
  const rad = suma([[K1, ''], [p || q ? K2 : 0, `\\left(${trig}\\right)`]]);
  const total = fSum(fMul(K1, fr(2)), fMul(K2, fr(p + q)));
  const volumen = tipo !== 'gen';
  return {
    enunciado: [
      volumen
        ? { txt: `Calcular el volumen del sólido que está sobre ${regTxt} D y bajo la superficie z = f(x, y). Graficar.`, tex: `D:\\ ${regTex},\\qquad z=${f}` }
        : { txt: `Calcular la integral doble sobre ${regTxt} D usando coordenadas polares. Graficar la región.`, tex: `\\iint_D\\left(${f}\\right)dA,\\qquad D:\\ ${regTex}` },
    ],
    pasos: [
      { txt: `La región es ${anillo ? 'un anillo' : 'un disco'} centrado en el origen; paso a polares x = r cosθ, y = r senθ. Jacobiano |J| = r, así que dA = r dr dθ.`, tex: lr },
      { txt: 'Escribo el integrando en polares (x² + y² = r²):', tex: `f(r\\cos\\theta,\\,r\\sin\\theta)=${pol}` },
      { txt: 'Planteo la integral iterada, sin olvidar el jacobiano r:', tex: `\\int_0^{2\\pi}\\!\\int_{${r1}}^{${r2}}\\left(${pol}\\right)r\\,dr\\,d\\theta` },
      { txt: 'Integro primero en r:', tex: `\\int_{${r1}}^{${r2}}\\left(${pol}\\right)r\\,dr=${rad}` },
      { txt: 'Integro en θ, con ∫₀²π cos²θ dθ = ∫₀²π sen²θ dθ = π:', tex: `\\int_0^{2\\pi}\\left(${rad}\\right)d\\theta=${texPi(total)}` },
    ],
    resultado: { tex: `${volumen ? 'V' : '\\iint_D f\\,dA'}=${texPi(total)}` },
    verif: { f: (x, y) => al + p * x * x + q * y * y + ga * Math.hypot(x, y), r1, r2, valor: Math.PI * fVal(total) },
  };
}

export const GENERADORES_POLARES = [{ id: 'polares', nombre: 'Integral doble en polares (disco o anillo)', grupo: 'Integrales', generar: polares }];
