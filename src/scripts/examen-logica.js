// Lógica pura del modo examen (sin DOM, testeada en tests/examen.test.mjs).
export const mmss = (s) => {
  const r = Math.round(s), a = Math.abs(r);
  return `${r < 0 ? '-' : ''}${String(Math.floor(a / 60)).padStart(2, '0')}:${String(a % 60).padStart(2, '0')}`;
};
export const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
// Minutos válidos 1–600; vacío o basura → 120.
export const minutosValidos = (v) => { const n = parseInt(v, 10); return Number.isNaN(n) ? 120 : Math.max(1, Math.min(600, n)); };
// notas: array con 1 | 0.5 | 0 o undefined (sin autocorregir = 0). Peso igual por ejercicio, sobre 100.
export function notaEstimada(notas, cantidad = notas.length) {
  if (!cantidad) return 0;
  const suma = Array.from({ length: cantidad }, (_, i) => notas[i] ?? 0).reduce((s, n) => s + n, 0);
  return Math.round((suma / cantidad) * 1000) / 10;
}
