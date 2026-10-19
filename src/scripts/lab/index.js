// Catálogo de generadores. generar(id, semilla) es determinista: misma semilla = mismo ejercicio.
import { crearRng } from './rng.js';
import { GENERADORES_EDO1 } from './edo1.js';
import { GENERADORES_EXACTA } from './exacta.js';
import { GENERADORES_EDO2 } from './edo2.js';
import { GENERADORES_GREEN } from './green.js';
import { GENERADORES_POLARES } from './polares.js';
import { GENERADORES_P1_DOMINIO } from './p1-dominio.js';
import { GENERADORES_P1_DIRECCIONAL } from './p1-direccional.js';
import { GENERADORES_P1_DIFERENCIAL } from './p1-diferencial.js';
import { GENERADORES_P1_EXTREMOS } from './p1-extremos.js';
import { GENERADORES_P1_LAGRANGE } from './p1-lagrange.js';
import { GENERADORES_P1_IMPLICITA } from './p1-implicita.js';
import { GENERADORES_P1_PLANO } from './p1-plano.js';

export const GENERADORES = [...GENERADORES_EDO1, ...GENERADORES_EXACTA, ...GENERADORES_EDO2, ...GENERADORES_GREEN, ...GENERADORES_POLARES,
  ...GENERADORES_P1_DOMINIO, ...GENERADORES_P1_DIRECCIONAL, ...GENERADORES_P1_DIFERENCIAL, ...GENERADORES_P1_EXTREMOS, ...GENERADORES_P1_LAGRANGE, ...GENERADORES_P1_IMPLICITA, ...GENERADORES_P1_PLANO];

export function generar(id, semilla) {
  const g = GENERADORES.find((x) => x.id === id);
  if (!g) throw new Error(`Generador desconocido: ${id}`);
  return { id, nombre: g.nombre, semilla, ...g.generar(crearRng(semilla)) };
}
