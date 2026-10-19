// Derivada implícita: z = z(x,y) definida por F(x,y,z) = 0 cerca de un punto P de la superficie.
// z_x = −F_x/F_z, z_y = −F_y/F_z, con el teorema de la función implícita (F_z(P) ≠ 0). Lógica pura.
import { fr, fVal } from './mate.js';
import { lineas, num, superficie } from './p1-comun.js';

function implicita(rng) {
  const S = superficie(rng), [x0, y0, z0] = S.P, [Fx, Fy, Fz] = S.val;
  const zx = fr(-Fx.n * Fz.d, Fx.d * Fz.n), zy = fr(-Fy.n * Fz.d, Fy.d * Fz.n);
  const nom = ['x', 'y', 'z'];
  const frac = (t, d) => `-\\frac{${num(t)}}{${num(d)}}`;
  const pasos = [
    { txt: `Verifico que el punto P=(${x0}, ${y0}, ${z0}) pertenece a la superficie, reemplazando en F:`, tex: lineas([`F(P)&=${S.FPsub}`, '&=0']) },
    { txt: 'Calculo las derivadas parciales de F respecto de cada variable (z se trata como una variable más, todavía no es función de x e y):', tex: lineas(nom.map((v, i) => `F_${v}&=${S.Gen[i]}`)) },
    { txt: 'Las evalúo en P:', tex: lineas(nom.flatMap((v, i) => [`F_${v}(P)&=${S.Sub[i]}`, `&=${num(S.val[i])}`])) },
    { txt: `F es de clase C¹ cerca de P, F(P) = 0 y F_z(P) = ${num(Fz)} ≠ 0. Por el teorema de la función implícita, la ecuación F(x,y,z) = 0 define z = z(x,y) en un entorno de (${x0}, ${y0}), con z(${x0}, ${y0}) = ${z0}.`, tex: `F_z(P)=${num(Fz)}\\neq 0` },
    { txt: 'Derivo F(x, y, z(x,y)) = 0 respecto de x con la regla de la cadena (y es constante, z depende de x), y lo mismo respecto de y; después despejo (F_z ≠ 0):', tex: lineas(['F_x+F_z\\,z_x&=0', 'z_x&=-\\frac{F_x}{F_z}', 'F_y+F_z\\,z_y&=0', 'z_y&=-\\frac{F_y}{F_z}']) },
    { txt: 'Reemplazo los valores de las derivadas en P:', tex: lineas([`z_x(${x0},${y0})&=${frac(Fx, Fz)}`, ...(frac(Fx, Fz) === num(zx) ? [] : [`&=${num(zx)}`]), `z_y(${x0},${y0})&=${frac(Fy, Fz)}`, ...(frac(Fy, Fz) === num(zy) ? [] : [`&=${num(zy)}`])]) },
  ];
  return {
    enunciado: [{ txt: `La ecuación define implícitamente a z como función de x e y cerca del punto P=(${x0}, ${y0}, ${z0}). Verificar que P cumple la ecuación y calcular las derivadas parciales de z en (${x0}, ${y0}):`, tex: `${S.Ftex}=0` }],
    pasos,
    resultado: { tex: lineas([`z_x(${x0},${y0})&=${num(zx)}`, `z_y(${x0},${y0})&=${num(zy)}`]) },
    verif: { F: S.Fn, P: S.P, zx: fVal(zx), zy: fVal(zy), val: S.val.map(fVal) },
  };
}

export const GENERADORES_P1_IMPLICITA = [{ id: 'implicita', nombre: 'Derivada implícita z(x,y)', grupo: 'Cálculo', instancia: 'p1', generar: implicita }];
