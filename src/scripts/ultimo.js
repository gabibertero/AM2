// Guarda el último ejercicio tocado (am2:v1:ultimo) para "Seguir donde dejaste" del Inicio.
const ej = (e) => e.target.closest?.('[data-ejercicio]');
const marcar = (e) => {
  const s = ej(e);
  if (!s) return;
  try {
    const tema = s.querySelector('[data-ia-tit]')?.textContent || '';
    const examen = document.querySelector('h1')?.textContent || '';
    localStorage.setItem('am2:v1:ultimo', JSON.stringify({ href: location.pathname + '#' + s.id, t: `Ejercicio ${s.id.replace('ej-', '')} · ${tema}${examen ? ' (' + examen + ')' : ''}` }));
  } catch { /* sin persistencia */ }
};
document.addEventListener('change', marcar);
document.addEventListener('click', marcar);
