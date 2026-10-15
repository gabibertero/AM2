// EDO exacta M dx + N dy = 0, armada desde una F(x,y) polinómica (así M = F_x y N = F_y cumplen M_y = N_x). Lógica pura.
import { p2, p2Tex, p2Dx, p2Dy, p2IntX, p2IntY, p2Add, p2Sub, p2Eval } from './mate.js';

function exacta(rng) {
  const terms = [[rng.nz(4), ...rng.elegir([[1, 1], [2, 1], [1, 2]])], [rng.nz(4), 0, rng.ent(1, 3)]];
  if (rng() < 0.7) terms.push([rng.nz(4), rng.ent(1, 3), 0]);
  const F = p2(terms);
  const M = p2Dx(F), N = p2Dy(F);
  const My = p2Dy(M), Nx = p2Dx(N);
  const A = p2IntX(M), Ay = p2Dy(A);
  const gp = p2Sub(N, Ay); // solo depende de y
  const g = p2IntY(gp);
  const Fres = p2Add(A, g);
  const ec = `\\left(${p2Tex(M)}\\right)dx+\\left(${p2Tex(N)}\\right)dy=0`;
  return {
    enunciado: [{ txt: 'Verificar que la ecuación es exacta y hallar su solución general:', tex: ec }],
    pasos: [
      { txt: 'Con M dx + N dy = 0, la ecuación es exacta si ∂M/∂y = ∂N/∂x:', tex: `\\frac{\\partial M}{\\partial y}=${p2Tex(My)},\\qquad\\frac{\\partial N}{\\partial x}=${p2Tex(Nx)}` },
      { txt: 'Son iguales: es exacta, existe F con F_x = M y F_y = N. Integro M respecto de x (la "constante" depende de y):', tex: `F(x,y)=\\int M\\,dx=${p2Tex(A)}+g(y)` },
      { txt: 'Derivo respecto de y e igualo a N:', tex: `F_y=${p2Tex(Ay)}+g'(y)=${p2Tex(N)}\\;\\Rightarrow\\;g'(y)=${p2Tex(gp)}` },
      { txt: 'Integro (sin constante):', tex: `g(y)=${p2Tex(g)}` },
      { txt: 'La solución general es F(x,y) = C:', tex: `${p2Tex(Fres)}=C` },
    ],
    resultado: { tex: `${p2Tex(Fres)}=C` },
    verif: { dom: [-1.5, 1.5], F: (x, y) => p2Eval(Fres, x, y), M: (x, y) => p2Eval(M, x, y), N: (x, y) => p2Eval(N, x, y), gpSoloY: gp.every(([, i]) => i === 0), exactaSim: p2Tex(My) === p2Tex(Nx) },
  };
}

export const GENERADORES_EXACTA = [{ id: 'exacta', nombre: 'EDO exacta', grupo: 'EDO', generar: exacta }];
