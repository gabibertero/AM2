// Lógica pura del simulacro teórico (sin DOM, RNG inyectable; testeada en tests/preguntero.test.mjs).
export const FORMATO = { tema: 2, corta: 4, choice: 3 }; // formato del teórico: 2 temas (se elige 1) + 4 cortas + 3 choice

// mulberry32: RNG determinista a partir de una semilla entera.
export function rngSemilla(semilla) {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Fisher-Yates sobre una copia.
export function mezclar(lista, rng = Math.random) {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// pool: [{id, tipo}] -> {tema: [id], corta: [id], choice: [id]}. Sin repetir; si faltan, trae las que haya.
export function armarSimulacro(pool, rng = Math.random, formato = FORMATO) {
  return Object.fromEntries(Object.entries(formato).map(([tipo, n]) => [
    tipo,
    mezclar(pool.filter((p) => p.tipo === tipo), rng).slice(0, n).map((p) => p.id),
  ]));
}

// respuestas {id: n|null}, correctas {id: n} (opciones numeradas desde 1). El total son las choice del simulacro.
export function corregirChoices(respuestas, correctas) {
  const detalle = {};
  let aciertos = 0;
  for (const [id, ok] of Object.entries(correctas)) {
    const r = Number(respuestas[id]);
    detalle[id] = !r ? 'blanco' : r === Number(ok) ? 'ok' : 'mal';
    if (detalle[id] === 'ok') aciertos++;
  }
  return { aciertos, total: Object.keys(correctas).length, detalle };
}

export const letra = (n) => 'abcdefghij'[n - 1] ?? '?';
