// Modo examen: oculta ayudas/soluciones (CSS por body[data-examen]), cronómetro, entrega y autocorrección.
// Fases: reposo → listo → corriendo → entregado. Sin JS el panel sigue hidden y la página muestra todo.
// Solo escribe la clave examen:<id> (último intento); no toca estado: ni vista: del progreso.
import { leer, guardar } from './progreso.js';
import { mmss, fmt, minutosValidos, notaEstimada } from './examen-logica.js';

const panel = document.querySelector('[data-examen-panel]');
if (panel) iniciar(panel);

function iniciar(panel) {
  const q = (n) => panel.querySelector(`[data-ex="${n}"]`);
  const clave = 'examen:' + panel.dataset.examenId;
  const ejercicios = [...document.querySelectorAll('[data-ejercicio]')];

  let fase = 'reposo', total = 0, restante = 0, fin = 0, pausado = false, reloj = null, avisado = false;
  const notas = new Map(); // ejercicio -> 0 | 0.5 | 1

  function ultimo() {
    try {
      const u = JSON.parse(leer(clave));
      q('ultimo').textContent = typeof u.nota === 'number' ? `Último intento: ${fmt(u.nota)}/100 (${mmss(typeof u.usado === 'number' ? u.usado : 0)}).` : '';
    } catch { q('ultimo').textContent = ''; }
  }

  function calcular() {
    const nota = notaEstimada(ejercicios.map((e) => notas.get(e)));
    q('nota').textContent = fmt(nota);
    const marcados = ejercicios.filter((e) => notas.has(e)).length;
    q('detalle').textContent = marcados < ejercicios.length ? `Sin autocorregir: ${ejercicios.length - marcados} (cuentan 0).` : '';
    // No pisar el último intento con un 0 si se entregó sin autocorregir nada.
    if (marcados) guardar(clave, JSON.stringify({ nota, usado: Math.round(total - restante) }));
  }

  function pintarFase() {
    panel.dataset.fase = fase;
    panel.querySelectorAll('[data-en]').forEach((el) => (el.hidden = !el.dataset.en.split(' ').includes(fase)));
    if (fase === 'reposo') delete document.body.dataset.examen;
    else document.body.dataset.examen = fase === 'entregado' ? 'entregado' : 'activo';
    ejercicios.forEach((e) => (e.querySelector('[data-autocorr]').hidden = fase !== 'entregado'));
    if (fase !== 'corriendo') { q('aviso').hidden = true; q('conf').hidden = true; }
  }

  function tic() {
    if (pausado) return;
    restante = (fin - Date.now()) / 1000;
    q('reloj').textContent = mmss(restante);
    if (restante <= 0 && !avisado) { avisado = true; q('aviso').hidden = false; }
  }
  const parar = () => { clearInterval(reloj); reloj = null; };

  q('abrir').onclick = () => { fase = 'listo'; pintarFase(); q('minutos').focus(); };
  q('empezar').onclick = () => {
    const min = minutosValidos(q('minutos').value);
    q('minutos').value = min; // refleja el valor corregido
    total = restante = min * 60; fin = Date.now() + total * 1000;
    pausado = false; avisado = false;
    fase = 'corriendo'; pintarFase(); tic();
    reloj = setInterval(tic, 250);
    q('pausa').textContent = 'Pausar';
    panel.querySelector('h2').focus();
  };
  q('pausa').onclick = () => {
    pausado = !pausado;
    if (!pausado) fin = Date.now() + restante * 1000;
    q('pausa').textContent = pausado ? 'Reanudar' : 'Pausar';
  };
  q('entregar').onclick = () => {
    tic(); parar(); fase = 'entregado'; pintarFase();
    q('usado').textContent = mmss(total - restante);
    calcular();
    panel.querySelector('h2').focus();
  };
  const conf = q('conf');
  q('salir').onclick = () => {
    if (fase === 'corriendo') { conf.hidden = false; q('conf-no').focus(); return; } // un toque errado no tira el intento
    salir();
  };
  q('conf-no').onclick = () => { conf.hidden = true; q('salir').focus(); };
  q('conf-si').onclick = salir;
  function salir() {
    conf.hidden = true;
    parar(); notas.clear();
    ejercicios.forEach((e) => e.querySelectorAll('[data-nota]').forEach((b) => b.setAttribute('aria-pressed', 'false')));
    fase = 'reposo'; pintarFase(); ultimo(); q('abrir').focus();
  }

  ejercicios.forEach((e) => {
    const botones = [...e.querySelectorAll('[data-nota]')];
    botones.forEach((b) => (b.onclick = () => {
      notas.set(e, Number(b.dataset.nota));
      botones.forEach((o) => o.setAttribute('aria-pressed', o === b));
      calcular();
    }));
  });

  // Recargar o salir en medio del examen pierde el reloj: el navegador pide confirmar.
  addEventListener('beforeunload', (ev) => { if (fase === 'corriendo') ev.preventDefault(); });

  panel.hidden = false;
  ultimo();
  pintarFase();
}
