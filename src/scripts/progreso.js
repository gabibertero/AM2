// Script único del sitio: estado de ejercicios, pistas/pasos, progreso y reinicio.
// localStorage puede fallar (modo privado, bloqueado): todo va en try/catch y sigue andando en memoria.
const P = 'am2:v1:';
const leer = (k) => { try { return localStorage.getItem(P + k); } catch { return null; } };
const guardar = (k, v) => { try { localStorage.setItem(P + k, v); } catch { /* sin persistencia */ } };

function iniciarEjercicio(ej) {
  const id = ej.dataset.id;
  const pistas = [...ej.querySelectorAll('[data-pista]')];
  const pasos = [...ej.querySelectorAll('[data-paso]')];
  const soluciones = [...ej.querySelectorAll('[data-solucion]')];
  const botones = {};
  ej.querySelectorAll('[data-accion]').forEach((b) => (botones[b.dataset.accion] = b));

  let vista = { p: 0, s: 0, full: false };
  try { vista = { ...vista, ...JSON.parse(leer('vista:' + id)) }; } catch { /* valor corrupto: se ignora */ }

  function pintar() {
    pistas.forEach((e, i) => (e.hidden = !(vista.full || i < vista.p)));
    pasos.forEach((e, i) => (e.hidden = !(vista.full || i < vista.s)));
    soluciones.forEach((e) => (e.hidden = !vista.full));
    botones.pista.disabled = vista.full || vista.p >= pistas.length;
    botones.paso.disabled = vista.full || vista.s >= pasos.length;
    botones.solucion.disabled = vista.full;
    guardar('vista:' + id, JSON.stringify(vista));
  }
  botones.pista.onclick = () => { vista.p++; pintar(); };
  botones.paso.onclick = () => { vista.s++; pintar(); };
  botones.solucion.onclick = () => { vista.full = true; pintar(); };
  botones.ocultar.onclick = () => { vista = { p: 0, s: 0, full: false }; pintar(); };

  const radios = ej.querySelectorAll('input[type=radio]');
  const estado = leer('estado:' + id);
  radios.forEach((r) => {
    r.checked = r.value === (estado || 'pendiente');
    r.onchange = () => guardar('estado:' + id, r.value);
  });
  pintar();
}
document.querySelectorAll('[data-ejercicio]').forEach(iniciarEjercicio);

// Progreso X/Y por examen (lista de ids en data-ids).
document.querySelectorAll('[data-progreso]').forEach((el) => {
  const ids = el.dataset.ids.split(',').filter(Boolean);
  const hechos = ids.filter((id) => leer('estado:' + id) === 'resuelto').length;
  el.textContent = `${hechos}/${ids.length} resueltos`;
});

// Reiniciar progreso: confirmación en la página, borra solo claves am2:v1:
const pedir = document.querySelector('[data-reiniciar]');
if (pedir) {
  const panel = document.querySelector('[data-confirmar]');
  const msg = document.querySelector('[data-resultado]');
  pedir.onclick = () => { panel.hidden = false; panel.querySelector('[data-si]').focus(); };
  panel.querySelector('[data-no]').onclick = () => { panel.hidden = true; pedir.focus(); };
  panel.querySelector('[data-si]').onclick = () => {
    try {
      Object.keys(localStorage).filter((k) => k.startsWith(P)).forEach((k) => localStorage.removeItem(k));
      msg.textContent = 'Progreso borrado.';
    } catch {
      msg.textContent = 'No se pudo acceder al almacenamiento del navegador.';
    }
    panel.hidden = true;
  };
}
