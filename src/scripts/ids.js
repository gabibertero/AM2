// Ids de los <Ejercicio id="..."> de un .mdx (compartido con scripts/check-ids.mjs).
export const idsDeEjercicios = (texto) => [...texto.matchAll(/<Ejercicio\b[^>]*?\bid="([^"]+)"/g)].map((m) => m[1]);
