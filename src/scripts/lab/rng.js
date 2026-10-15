// Generador pseudoaleatorio con semilla (mulberry32). Misma semilla = misma secuencia.
export function crearRng(semilla) {
  let a = (Number(semilla) >>> 0) || 1;
  const f = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  f(); // descarta la primera salida: semillas vecinas quedan mejor mezcladas
  f.ent = (lo, hi) => lo + Math.floor(f() * (hi - lo + 1));
  f.elegir = (arr) => arr[f.ent(0, arr.length - 1)];
  f.signo = () => (f() < 0.5 ? -1 : 1);
  // entero distinto de 0 en [-m, m]
  f.nz = (m) => f.signo() * f.ent(1, m);
  return f;
}

// "123" -> 123; cualquier otra cosa (vacío, 0, negativo, decimal, texto) -> null.
export function semillaValida(s) {
  const t = String(s ?? '').trim();
  if (!/^\d{1,10}$/.test(t)) return null;
  const n = Number(t);
  return n >= 1 && n <= 2147483647 ? n : null;
}
