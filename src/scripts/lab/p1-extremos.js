// Extremos libres de f(x,y) con puntos críticos enteros: sistema ∇f = 0, puntos, hessiano H = f''_xx f''_yy − (f''_xy)² en cada uno,
// cota z₀ = f(P) y clasificación (máximo, mínimo, silla, o H = 0 con estudio directo). Familias: separable cúbica (raíces enteras por
// variable), f = ±(x³+y³−3axy) y cuártica a(x−r)⁴+b(y−s)⁴+e (H = 0 pero puede ser extremo). Lógica pura.
import { fr, fVal, suma } from './mate.js';
import { lineas, cases, num, fp, p3, p3Tex, p3D, p3Ev, p3Fr, p3Sub } from './p1-comun.js';

const lin = (v, r) => (r === 0 ? v : `${v}${r < 0 ? '+' : '-'}${Math.abs(r)}`); // v − r
const par = (v, r) => (r === 0 ? v : `\\left(${lin(v, r)}\\right)`);
const BIN4 = [1, 4, 6, 4, 1];

function extremos(rng) {
  const q = rng();
  const fam = q < 0.5 ? 'sep' : q < 0.82 ? 'fol' : 'cuart';
  let f, puntos, resolver, dbl = [], cu = null;
  if (fam === 'sep') {
    const a = rng.signo(), b = rng.signo();
    const rx = [rng.ent(-3, 3), rng.ent(-3, 3)], ry = [rng.ent(-3, 3), rng.ent(-3, 3)];
    if (rng() < 0.25) rx[1] = rx[0]; else if (rx[0] === rx[1]) rx[1] += 1;
    if (rng() < 0.2) ry[1] = ry[0]; else if (ry[0] === ry[1]) ry[1] += 1;
    if (rx[0] === rx[1] && ry[0] === ry[1] && rng() < 0.7) ry[1] += 1;
    const e = rng.ent(-4, 4);
    const coefs = (k, r) => [[2 * k, 3], [-3 * k * (r[0] + r[1]), 2], [6 * k * r[0] * r[1], 1]];
    f = p3([...coefs(a, rx).map(([c, n]) => [c, n, 0, 0]), ...coefs(b, ry).map(([c, n]) => [c, 0, n, 0]), [e, 0, 0, 0]]);
    const ux = [...new Set(rx)], uy = [...new Set(ry)];
    puntos = ux.flatMap((x) => uy.map((y) => [x, y]));
    const trin = (v, r, k) => {
      const s = r[0] + r[1], pr = r[0] * r[1], dbl = r[0] === r[1];
      if (dbl && r[0] === 0) return [
        { txt: `La ecuación de f'_${v}=0 es un monomio: ${6 * k}${v}² se anula solo si ${v}=0 (raíz doble).`, tex: lineas([`f'_${v}&=${6 * k}${v}^{2}`, `${v}&=0`]) },
      ];
      return [
        { txt: `La ecuación de f'_${v}=0 depende solo de ${v}. Saco factor común ${6 * k} y factorizo el trinomio buscando dos números que sumen ${s} y multipliquen ${pr}:`,
          tex: lineas([`f'_${v}&=${suma([[6 * k, `${v}^{2}`], [-6 * k * s, v], [6 * k * pr, '']])}`, `&=${6 * k}\\left(${suma([[1, `${v}^{2}`], [-s, v], [pr, '']])}\\right)`, `&=${6 * k}${dbl ? `${par(v, r[0])}^{2}` : `${par(v, r[0])}${par(v, r[1])}`}`]) },
        { txt: `Igualo a 0 (un producto es 0 si algún factor es 0)${dbl ? '; la raíz es doble' : ''}:`, tex: dbl ? `${v}=${r[0]}` : `${v}=${r[0]}\\quad\\text{o}\\quad ${v}=${r[1]}` },
      ];
    };
    resolver = [
      ...trin('x', rx, a), ...trin('y', ry, b),
      { txt: 'Los puntos críticos son todas las combinaciones de una solución en x con una solución en y:', tex: puntos.map(([x, y], i) => `P_{${i + 1}}=\\left(${x},\\ ${y}\\right)`).join(',\\quad ') },
    ];
    dbl = [rx[0] === rx[1] ? { k: a, r: rx[0] } : null, ry[0] === ry[1] ? { k: b, r: ry[0] } : null];
  } else if (fam === 'fol') {
    const a = rng.elegir([-3, -2, -1, 1, 2, 3]), l = rng.signo();
    f = p3([[l, 3, 0, 0], [l, 0, 3, 0], [-3 * l * a, 1, 1, 0]]);
    puntos = [[0, 0], [a, a]];
    const ye = suma([[fr(1, a), 'x^{2}']]);
    resolver = [
      { txt: `Divido cada ecuación por ${3 * l} (distinto de 0) para simplificar:`, tex: cases([`${suma([[1, 'x^{2}'], [-a, 'y']])}=0`, `${suma([[1, 'y^{2}'], [-a, 'x']])}=0`]) },
      { txt: `De la primera despejo y (se puede, porque a=${a} ≠ 0):`, tex: `y=${ye}` },
      { txt: 'Reemplazo en la segunda ecuación:', tex: lineas([`\\left(${ye}\\right)^{2}-${a < 0 ? `\\left(${a}\\right)` : a}x&=0`, `${suma([[fr(1, a * a), 'x^{4}'], [-a, 'x']])}&=0`]) },
      { txt: `${a * a === 1 ? 'Saco factor común x' : `Multiplico por ${a * a} para sacar el denominador y saco factor común x`}:`, tex: lineas([`${suma([[1, 'x^{4}'], [-(a ** 3), 'x']])}&=0`, `x\\left(${suma([[1, 'x^{3}'], [-(a ** 3), '']])}\\right)&=0`]) },
      { txt: `Un producto es 0 si algún factor es 0. Como x³ = ${a ** 3} tiene una única solución real (x = ${a}):`, tex: `x=0\\quad\\text{o}\\quad x=${a}` },
      { txt: 'Con y = x²/a obtengo la otra coordenada de cada punto crítico:', tex: puntos.map(([x, y], i) => `P_{${i + 1}}=\\left(${x},\\ ${y}\\right)`).join(',\\quad ') },
    ];
  } else { // cuártica: f = a(x−r)⁴ + b(y−s)⁴ + e, un solo punto crítico con H = 0
    const a = rng.elegir([-2, -1, 1, 2]), b = rng.elegir([-2, -1, 1, 2]), r = rng.ent(-2, 2), s = rng.ent(-2, 2), e = rng.ent(-4, 4);
    const cf = (k, c) => BIN4.map((bn, i) => [k * bn * (-c) ** (4 - i), i]);
    f = p3([...cf(a, r).map(([c, n]) => [c, n, 0, 0]), ...cf(b, s).map(([c, n]) => [c, 0, n, 0]), [e, 0, 0, 0]]);
    puntos = [[r, s]];
    cu = { a, b, r, s };
    resolver = [
      { txt: `Las derivadas parciales son la derivada de una potencia: f'_x = ${4 * a}${par('x', r)}³ y f'_y = ${4 * b}${par('y', s)}³. Cada una se anula solo cuando lo de adentro vale 0 (raíz triple):`, tex: cases([`${4 * a}${par('x', r)}^{3}=0\\ \\Rightarrow\\ x=${r}`, `${4 * b}${par('y', s)}^{3}=0\\ \\Rightarrow\\ y=${s}`]) },
      { txt: 'Hay un único punto crítico:', tex: `P_{1}=\\left(${r},\\ ${s}\\right)` },
    ];
  }
  const fx = p3D(f, 0), fy = p3D(f, 1), fxx = p3D(fx, 0), fxy = p3D(fx, 1), fyy = p3D(fy, 1);
  const real0 = (clase) => (clase !== 'dudoso' ? clase : cu ? (cu.a > 0 && cu.b > 0 ? 'mínimo' : cu.a < 0 && cu.b < 0 ? 'máximo' : 'silla') : 'silla');
  const cls = (P) => {
    const A = p3Fr(fxx, ...P, 0), B = p3Fr(fxy, ...P, 0), C = p3Fr(fyy, ...P, 0);
    const D = fVal(A) * fVal(C) - fVal(B) ** 2;
    const clase = D > 0 ? (A.n > 0 ? 'mínimo' : 'máximo') : D < 0 ? 'silla' : 'dudoso';
    return { A, B, C, D, clase, real: real0(clase) };
  };
  const Pz = (P) => [P[0], P[1], 0];
  const fval = (P) => p3Fr(f, ...P);
  const ptPasos = puntos.flatMap((P, i) => {
    const c = cls(P), [x, y] = P, k = i + 1;
    const base = { txt: `Punto P_${k}=(${x}, ${y}). Evalúo las segundas derivadas y el determinante H = f''_xx·f''_yy − (f''_xy)²:`, tex: lineas([
      `f''_{xx}(P_{${k}})&=${p3Sub(fxx, Pz(P))}`, `&=${num(c.A)}`, `f''_{yy}(P_{${k}})&=${p3Sub(fyy, Pz(P))}`, `&=${num(c.C)}`, `f''_{xy}(P_{${k}})&=${num(c.B)}`,
      `H(P_{${k}})&=${fp(c.A)}\\cdot ${fp(c.C)}-${fp(c.B)}^{2}`, `&=${c.D}`]) };
    const txtCl = c.clase === 'silla' ? `H < 0: P_${k} es un punto silla (no es extremo).`
      : c.clase === 'dudoso' ? 'H = 0: el criterio del hessiano no decide; hay que estudiar f directamente alrededor del punto.'
        : `H > 0 y f''_xx ${c.A.n > 0 ? '> 0' : '< 0'}: P_${k} es un ${c.clase} local.`;
    const out = [{ ...base, txt: `${base.txt} Resultado: ${txtCl}` }];
    if (c.clase === 'dudoso' && cu) {
      const { a: ca, b: cb, r, s } = cu;
      const mismo = real0('dudoso') !== 'silla';
      out.push({ txt: `Estudio la diferencia f(x,y) − f(P_${k}): son dos potencias cuartas, que no cambian de signo por sí solas. ${mismo ? `Como ${ca} y ${cb} tienen el mismo signo (${ca > 0 ? 'positivo' : 'negativo'}), la diferencia es ${ca > 0 ? '≥ 0' : '≤ 0'} en todo entorno y solo vale 0 en P_${k}` : `Como ${ca} y ${cb} tienen signo distinto, sobre la recta y = ${s} la diferencia tiene el signo de ${ca} y sobre la recta x = ${r} el de ${cb}`}.`,
        tex: lineas([`f(x,y)-f(P_{${k}})&=${suma([[ca, `${par('x', r)}^{4}`], [cb, `${par('y', s)}^{4}`]])}`, mismo ? `&${ca > 0 ? '\\geq' : '\\leq'}\\ 0\\ \\text{(solo vale 0 en }P_{${k}}\\text{)}` : '&\\gtrless 0\\ \\text{según el punto}']) });
      out.push({ txt: `Conclusión para P_${k}: ${mismo ? `es un ${real0('dudoso')} local (aunque H = 0)` : 'cambia de signo, no es máximo ni mínimo'}:`, tex: mismo ? `P_{${k}}\\ \\text{es un ${real0('dudoso')} local}` : `P_{${k}}\\ \\text{es un punto silla (degenerado)}` });
    } else if (c.clase === 'dudoso') {
      const enX = c.A.n === 0;
      const d = enX ? dbl[0] : dbl[1];
      const v = enX ? 'x' : 'y', otra = enX ? y : x;
      out.push({ txt: `Estudio f directamente sobre la recta ${enX ? `y=${y}` : `x=${x}`} que pasa por P_${k}. Como la derivada parcial en ${v} tiene una raíz doble, f'_${v} = ${6 * d.k}${par(v, d.r)}², e integrando se obtiene 2·${d.k > 0 ? d.k : `(${d.k})`}·${par(v, d.r)}³, entonces f(${enX ? `x,${y}` : `${x},y`}) − f(P_${k}) es un cubo, que cambia de signo al pasar por ${v}=${d.r}: en todo entorno hay puntos con f mayor y con f menor que f(P_${k}).`,
        tex: lineas([`f\\left(${enX ? `x,${otra}` : `${otra},y`}\\right)-f\\left(P_{${k}}\\right)&=${d.k > 0 ? '2' : '-2'}${par(v, d.r)}^{3}`, `&\\gtrless 0\\ \\text{según}\\ ${v}\\gtrless ${d.r}`]) });
      out.push({ txt: `Conclusión para P_${k}: cambia de signo, no es máximo ni mínimo:`, tex: `P_{${k}}\\ \\text{es un punto silla (degenerado)}` });
    }
    out.push({ txt: `La cota de P_${k} es el valor de f en el punto (también para sillas):`, tex: lineas([`z_{0}=f(P_{${k}})&=${p3Sub(f, Pz(P))}`, `&=${num(fval(P))}`]) });
    return out;
  });
  const pasos = [
    { txt: 'Los extremos libres están entre los puntos críticos (donde ∇f = 0, porque f es polinómica y tiene derivadas en todo ℝ²). Derivo:', tex: lineas([`f'_x&=${p3Tex(fx)}`, `f'_y&=${p3Tex(fy)}`]) },
    { txt: 'Igualo el gradiente a 0:', tex: cases([`${p3Tex(fx)}=0`, `${p3Tex(fy)}=0`]) },
    ...resolver,
    { txt: 'Para clasificar uso el hessiano. Calculo las derivadas segundas:', tex: lineas([`f''_{xx}&=${p3Tex(fxx)}`, `f''_{xy}&=${p3Tex(fxy)}`, `f''_{yy}&=${p3Tex(fyy)}`]) },
    { txt: "Criterio: con H = f''_xx·f''_yy − (f''_xy)² en el punto crítico, H > 0 y f''_xx > 0 es mínimo local; H > 0 y f''_xx < 0 es máximo local; H < 0 es punto silla; H = 0 no decide.", tex: "H=f''_{xx}f''_{yy}-\\left(f''_{xy}\\right)^{2}" },
    ...ptPasos,
  ];
  const clasifs = puntos.map((P) => cls(P));
  const nombre = (c) => (c.clase === 'dudoso' ? `${c.real === 'silla' ? 'punto silla' : `${c.real} local`} (H = 0, estudio directo)` : c.clase === 'silla' ? 'punto silla' : `${c.clase} local`);
  return {
    enunciado: [{ txt: 'Hallar los puntos críticos de la función y clasificarlos (máximo, mínimo local o punto silla), con la cota z₀ = f(P) de cada uno:', tex: `f(x,y)=${p3Tex(f)}` }],
    pasos,
    resultado: { tex: lineas(puntos.map(([x, y], i) => `P_{${i + 1}}=\\left(${x},\\ ${y}\\right):&\\ \\text{${nombre(clasifs[i])}},\\ z_{0}=${num(fval([x, y]))}`)) },
    verif: {
      E: fam, f: (x, y) => p3Ev(f, x, y), fx: (x, y) => p3Ev(fx, x, y), fy: (x, y) => p3Ev(fy, x, y),
      hess: (x, y) => [p3Ev(fxx, x, y), p3Ev(fxy, x, y), p3Ev(fyy, x, y)],
      puntos: puntos.map(([x, y], i) => ({ x, y, clase: clasifs[i].clase, real: clasifs[i].real, D: clasifs[i].D })),
    },
  };
}

export const GENERADORES_P1_EXTREMOS = [{ id: 'extremos', nombre: 'Extremos libres (hessiano)', grupo: 'Cálculo', instancia: 'p1', generar: extremos }];
