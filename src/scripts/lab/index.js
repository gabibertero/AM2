// Catálogo de generadores. generar(id, semilla) es determinista: misma semilla = mismo ejercicio.
import { crearRng } from './rng.js';
import { GENERADORES_EDO1 } from './edo1.js';
import { GENERADORES_EXACTA } from './exacta.js';
import { GENERADORES_EDO2 } from './edo2.js';
import { GENERADORES_GREEN } from './green.js';
import { GENERADORES_POLARES } from './polares.js';

export const GENERADORES = [...GENERADORES_EDO1, ...GENERADORES_EXACTA, ...GENERADORES_EDO2, ...GENERADORES_GREEN, ...GENERADORES_POLARES];

export function generar(id, semilla) {
  const g = GENERADORES.find((x) => x.id === id);
  if (!g) throw new Error(`Generador desconocido: ${id}`);
  return { id, nombre: g.nombre, semilla, ...g.generar(crearRng(semilla)) };
}
