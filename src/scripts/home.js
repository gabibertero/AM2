// Inicio: cuenta regresiva y "Seguir donde dejaste". Solo lee localStorage (am2:v1:); sin JS el Inicio se ve igual.
const $ = (s) => document.querySelector(s);
const base = import.meta.env.BASE_URL;

// Fecha aaaa-mm-dd en hora local; días de calendario.
const cd = $('[data-cuenta]');
const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(cd?.dataset.fecha || '');
if (m) {
  const hoy = new Date();
  const n = Math.round((new Date(+m[1], +m[2] - 1, +m[3]) - new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())) / 864e5);
  $('[data-dias]').textContent = n > 0 ? n : n === 0 ? '¡Hoy!' : '—';
  $('[data-dias-txt]').textContent = n > 1 ? 'días para el 2º parcial' : n === 1 ? 'día para el 2º parcial' : n === 0 ? 'es el 2º parcial' : 'el 2º parcial ya pasó';
}

try {
  const u = JSON.parse(localStorage.getItem('am2:v1:ultimo'));
  const url = new URL(u.href, location.origin);
  if (url.origin === location.origin && url.pathname.startsWith(base)) {
    const a = $('[data-seguir]');
    a.href = url.pathname + url.hash;
    $('[data-seguir-t]').textContent = String(u.t).slice(0, 80);
    a.hidden = false;
    $('[data-seguir-vacio]').hidden = true;
  }
} catch { /* nada guardado */ }
