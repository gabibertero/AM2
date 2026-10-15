// EDO M dx + N dy = 0: exacta (se arma desde una F(x,y), así M = F_x y N = F_y cumplen M_y = N_x) o NO exacta
// (se perturba N para que M_y ≠ N_x). F puede llevar polinomios, y·e^{ax}, x·cos(by) y sen/cos(by). Lógica pura.
import { suma, ex, SEN, unir, p2, p2Tex, p2Dx, p2Dy, p2IntX, p2IntY, p2Add, p2Sub, p2Eval } from './mate.js';

const ang = (b) => (b === 1 ? 'y' : `${b}y`);

// Parte no polinómica de F. Cada una da F, F_x, F_y (TeX y función), y su derivada cruzada.
function extras(rng, e) {
  const x = { F: '', Mt: '', Nt: '', Ft: '', Fn: () => 0, Mn: () => 0, Nn: () => 0, Myt: '', Nxt: '' };
  if (e === 'e') {
    const a = rng.elegir([-2, -1, 1, 2]), al = rng.nz(2), body = `y\\,${ex(a)}`;
    Object.assign(x, { F: suma([[al, body]]), Mt: suma([[al * a, body]]), Nt: suma([[al, ex(a)]]), Ft: suma([[al, body]]),
      Fn: (px, py) => al * py * Math.exp(a * px), Mn: (px, py) => al * a * py * Math.exp(a * px), Nn: (px) => al * Math.exp(a * px),
      Myt: suma([[al * a, ex(a)]]), Nxt: suma([[al * a, ex(a)]]), Ay: suma([[al, ex(a)]]), tipo: 'e^{ax}' });
  } else if (e === 'c') {
    const b = rng.ent(1, 2), g = rng.nz(2), cy = `\\cos(${ang(b)})`, sy = `${SEN}(${ang(b)})`;
    Object.assign(x, { F: suma([[g, `x${cy}`]]), Mt: suma([[g, cy]]), Nt: suma([[-g * b, `x${sy}`]]), Ft: suma([[g, `x${cy}`]]),
      Fn: (px, py) => g * px * Math.cos(b * py), Mn: (px, py) => g * Math.cos(b * py), Nn: (px, py) => -g * b * px * Math.sin(b * py),
      Myt: suma([[-g * b, sy]]), Nxt: suma([[-g * b, sy]]), Ay: suma([[-g * b, `x${sy}`]]), tipo: 'cos(by)' });
  }
  return x;
}
// Término que depende solo de y: β sen(by) o β cos(by).
function soloY(rng) {
  const b = rng.ent(1, 3), be = rng.nz(3), sen = rng() < 0.5;
  return sen
    ? { F: suma([[be, `${SEN}(${ang(b)})`]]), N: suma([[be * b, `\\cos(${ang(b)})`]]), Fn: (y) => be * Math.sin(b * y), Nn: (y) => be * b * Math.cos(b * y), int: `\\int ${suma([[be * b, `\\cos(${ang(b)})`]])}\\,dy` }
    : { F: suma([[be, `\\cos(${ang(b)})`]]), N: suma([[-be * b, `${SEN}(${ang(b)})`]]), Fn: (y) => be * Math.cos(b * y), Nn: (y) => -be * b * Math.sin(b * y), int: `\\int ${suma([[-be * b, `${SEN}(${ang(b)})`]])}\\,dy` };
}

function exacta(rng) {
  const modo = rng.elegir(['poli', 'mixta', 'mixta', 'noexacta']);
  const terms = [[rng.nz(4), ...rng.elegir([[1, 1], [2, 1], [1, 2]])], [rng.nz(4), 0, rng.ent(1, 3)]];
  if (rng() < 0.7) terms.push([rng.nz(4), rng.ent(1, 3), 0]);
  const F = p2(terms);
  const mixta = modo !== 'poli';
  const E = extras(rng, mixta ? rng.elegir(['', 'e', 'c']) : '');
  const Y = mixta ? soloY(rng) : null;
  const Mp = p2Dx(F);
  let Np = p2Dy(F);
  let noex = false;
  if (modo === 'noexacta') { // agrego a N un término con x: N_x cambia y M_y no
    const N0 = Np;
    do Np = p2Add(N0, p2([[rng.nz(3), rng.ent(1, 2), rng.ent(0, 2)]])); while (p2Tex(p2Dx(Np)) === p2Tex(p2Dy(Mp)));
    noex = true;
  }
  const Mt = unir(p2Tex(Mp) === '0' ? '' : p2Tex(Mp), E.Mt);
  const Nt = unir(unir(p2Tex(Np) === '0' ? '' : p2Tex(Np), E.Nt), Y ? Y.N : '');
  const Myp = p2Dy(Mp), Nxp = p2Dx(Np);
  const Mytex = unir(p2Tex(Myp) === '0' ? '' : p2Tex(Myp), E.Myt) || '0';
  const Nxtex = unir(p2Tex(Nxp) === '0' ? '' : p2Tex(Nxp), E.Nxt) || '0';
  const enun = { txt: noex ? 'Decidir si la ecuación es exacta y, si lo es, hallar su solución general:' : 'Verificar que la ecuación es exacta y hallar su solución general:', tex: `\\left(${Mt}\\right)dx+\\left(${Nt}\\right)dy=0` };
  const pasosExacta = [
    { txt: 'Identifico M (lo que multiplica a dx) y N (lo que multiplica a dy):', tex: `M=${Mt},\\qquad N=${Nt}` },
    { txt: 'Una ecuación M dx + N dy = 0 es exacta si M_y = N_x (es la condición para que (M, N) sea un campo gradiente). Derivo M respecto de y y N respecto de x:', tex: `\\frac{\\partial M}{\\partial y}=${Mytex},\\qquad\\frac{\\partial N}{\\partial x}=${Nxtex}` },
  ];
  if (noex) {
    pasosExacta.push(
      { txt: 'Las dos derivadas son distintas: no se cumple M_y = N_x.', tex: `\\frac{\\partial M}{\\partial y}\\neq\\frac{\\partial N}{\\partial x}` },
      { txt: 'Conclusión: la ecuación NO es exacta, no existe F con F_x = M y F_y = N, y el método de F(x,y) = C no se puede aplicar tal cual. (Habría que buscar un factor integrante μ(x) o μ(y) que la vuelva exacta.)', tex: `M\\,dx+N\\,dy=0\\ \\text{no es exacta}` },
    );
    return {
      enunciado: [enun], pasos: pasosExacta, resultado: { tex: `\\frac{\\partial M}{\\partial y}\\neq\\frac{\\partial N}{\\partial x}\\;\\Rightarrow\\;\\text{no es exacta}` },
      verif: { dom: [-1.5, 1.5], noExacta: true, M: (x, y) => p2Eval(Mp, x, y) + E.Mn(x, y), N: (x, y) => p2Eval(Np, x, y) + E.Nn(x, y) + (Y ? Y.Nn(y) : 0), exactaSim: false, gpSoloY: true },
    };
  }
  const A = p2IntX(Mp), Ay = p2Dy(A);
  const gp = p2Sub(Np, Ay); // solo depende de y
  const g = p2IntY(gp);
  const Fres = p2Add(A, g);
  const Atex = unir(p2Tex(A) === '0' ? '' : p2Tex(A), E.Ft) || '0';
  const Aytex = unir(p2Tex(Ay) === '0' ? '' : p2Tex(Ay), E.Ay ?? '') || '0';
  const gptex = unir(p2Tex(gp) === '0' ? '' : p2Tex(gp), Y ? Y.N : '') || '0';
  const gtex = unir(p2Tex(g) === '0' ? '' : p2Tex(g), Y ? Y.F : '') || '0';
  const Ftex = unir(unir(p2Tex(Fres) === '0' ? '' : p2Tex(Fres), E.F), Y ? Y.F : '');
  const pasos = [
    ...pasosExacta,
    { txt: 'Son iguales: es exacta. Entonces existe F con F_x = M y F_y = N, y las soluciones son las curvas F(x,y) = C.', tex: `M_y=N_x=${Mytex}\\;\\Rightarrow\\;\\exists\\,F:\\ F_x=M,\\ F_y=N` },
    { txt: 'Hallo F integrando M respecto de x (la "constante" de integración puede depender de y, por eso la llamo g(y)):', tex: `F(x,y)=\\int M\\,dx=${Atex}+g(y)` },
    { txt: 'Derivo ese F respecto de y (llamo A a la parte que no es g, así F_y = A_y + g′(y)):', tex: `F_y=${Aytex}+g'(y)` },
    { txt: 'Igualo con N, porque tiene que ser F_y = N:', tex: `${Aytex}+g'(y)=${Nt}` },
    { txt: 'Despejo g′(y) (resto A_y de los dos lados):', tex: `g'(y)=N-A_y=\\left(${Nt}\\right)-\\left(${Aytex}\\right)` },
    { txt: 'Los términos que tienen x se cancelan (tiene que pasar: g depende solo de y, y si no se cancelaran habría un error). Queda:', tex: `g'(y)=${gptex}` },
    { txt: 'Integro respecto de y (sin constante, ya va a aparecer en F = C):', tex: `g(y)=\\int\\left(${gptex}\\right)dy=${gtex}` },
    { txt: 'Reemplazo g en F; la solución general es F(x,y) = C:', tex: `${Ftex}=C` },
  ];
  return {
    enunciado: [enun], pasos, resultado: { tex: `${Ftex}=C` },
    verif: {
      dom: [-1.5, 1.5],
      F: (x, y) => p2Eval(Fres, x, y) + E.Fn(x, y) + (Y ? Y.Fn(y) : 0),
      M: (x, y) => p2Eval(Mp, x, y) + E.Mn(x, y),
      N: (x, y) => p2Eval(Np, x, y) + E.Nn(x, y) + (Y ? Y.Nn(y) : 0),
      gpSoloY: gp.every(([, i]) => i === 0), exactaSim: p2Tex(Myp) === p2Tex(Nxp), noExacta: false, modo,
    },
  };
}

export const GENERADORES_EXACTA = [{ id: 'exacta', nombre: 'EDO exacta', grupo: 'EDO', generar: exacta }];
