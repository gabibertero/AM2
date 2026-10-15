// UI del preguntero (/preguntero/) y del simulacro (/preguntero/simulacro/). La lógica pura está en preguntero-logica.js.
// Marcas "la sé / dudosa / no la sé" en preg:<id> (prefijo del sitio vía progreso.js). Sin JS todo el contenido se ve.
import { leer, guardar } from './progreso.js';
import { mmss, minutosValidos } from './examen-logica.js';
import { armarSimulacro, corregirChoices, rngSemilla, letra, FORMATO } from './preguntero-logica.js';

const MARCAS = { sabe: '✓ La sé', dudosa: '? Dudosa', nose: '✗ No la sé' };
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
$$('[data-js]').forEach((e) => (e.hidden = false));
$$('[data-nojs]').forEach((e) => (e.hidden = true));

// ---- Choice: la lista numerada pasa a radios (sin JS queda la lista) ----
function armarOpciones(art) {
  const ol = $('[data-ops] ol', art);
  if (!ol) return;
  ol.className = 'op-lista';
  ol.setAttribute('role', 'radiogroup');
  ol.setAttribute('aria-label', 'Opciones');
  $$(':scope > li', ol).forEach((li, i) => {
    const label = document.createElement('label');
    label.className = 'op';
    const radio = Object.assign(document.createElement('input'), { type: 'radio', name: 'o-' + art.dataset.id, value: String(i + 1) });
    const l = Object.assign(document.createElement('strong'), { textContent: letra(i + 1) + ')' });
    const t = Object.assign(document.createElement('span'), { className: 'op-t' });
    t.append(...li.childNodes);
    label.append(radio, l, t);
    li.append(label);
  });
}
$$('[data-pregunta][data-tipo="choice"]').forEach(armarOpciones);

const elegida = (art) => $('input:checked', art)?.value ?? null;
function mostrarResultado(art, res) {
  const ok = Number(art.dataset.correcta);
  $$('.op', art).forEach((l, i) => { if (i + 1 === ok) l.dataset.res = 'ok'; else if (res === 'mal' && l.querySelector('input').checked) l.dataset.res = 'mal'; else delete l.dataset.res; });
  $('[data-fb]', art).textContent = res === 'ok' ? 'Correcta.' : `${res === 'mal' ? 'Incorrecta' : 'Sin responder'}. La correcta es la ${letra(ok)}.`;
}

// ---- Preguntero: filtros, marcas, corrección inmediata de choice ----
const lista = $$('[data-preguntero] [data-pregunta]');
if (lista.length) {
  const filtros = { instancia: 'todas', unidad: 'todas', tipo: 'todas', marca: 'todas' };
  const marcaDe = (art) => { const m = leer('preg:' + art.dataset.id); return MARCAS[m] ? m : ''; };

  const pintarMarca = (art) => {
    const m = marcaDe(art);
    if (m) art.dataset.estado = m; else delete art.dataset.estado;
    $$('[data-marca]', art).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.marca === m)));
    $('[data-estado-txt]', art).textContent = MARCAS[m] || '';
  };

  function aplicar(moverFoco = true) {
    let visibles = 0;
    lista.forEach((art) => {
      const m = marcaDe(art);
      const ok = (filtros.instancia === 'todas' || art.closest('[data-seccion]')?.dataset.instancia === filtros.instancia)
        && (filtros.unidad === 'todas' || art.dataset.unidad === filtros.unidad)
        && (filtros.tipo === 'todas' || art.dataset.tipo === filtros.tipo)
        && (filtros.marca === 'todas' || (filtros.marca === 'repasar' ? m === 'dudosa' || m === 'nose' : !m));
      art.hidden = !ok;
      if (ok) visibles++;
    });
    $$('[data-seccion]').forEach((s) => (s.hidden = !$('[data-pregunta]:not([hidden])', s)));
    $('[data-vacio]').hidden = visibles > 0;
    $$('[data-filtro]').forEach((b) => b.setAttribute('aria-pressed', String(filtros[b.dataset.filtro] === b.dataset.valor)));
    const n = (m) => lista.filter((a) => marcaDe(a) === m).length;
    const cont = $('[data-contador]');
    cont.textContent = `${n('sabe')} de ${lista.length} sabidas · ${n('dudosa')} dudosas · ${n('nose')} no sabidas · mostrando ${visibles}`;
    const f = document.activeElement; // si la tarjeta con el foco quedó oculta, no perder el foco
    if (moverFoco && f && f !== document.body && f.closest('[hidden]')) { cont.tabIndex = -1; cont.focus(); }
  }

  lista.forEach((art) => {
    pintarMarca(art);
    $$('[data-marca]', art).forEach((b) => (b.onclick = () => {
      guardar('preg:' + art.dataset.id, marcaDe(art) === b.dataset.marca ? '' : b.dataset.marca); // volver a tocar = desmarcar
      pintarMarca(art);
      aplicar();
    }));
    if (art.dataset.tipo === 'choice') art.addEventListener('change', () => {
      mostrarResultado(art, elegida(art) === art.dataset.correcta ? 'ok' : 'mal');
      $('[data-resp]', art).open = true;
    });
  });
  $$('[data-filtro]').forEach((b) => (b.onclick = () => { filtros[b.dataset.filtro] = b.dataset.valor; aplicar(); }));
  addEventListener('storage', () => { lista.forEach(pintarMarca); aplicar(); });
  aplicar(false);
}

// ---- Simulacro ----
const lSim = $('[data-sim-lista]');
if (lSim) {
  const pool = $$('[data-pool] [data-pregunta]');
  const selInst = $('[data-instancia-sel]');
  const delPool = () => pool.filter((a) => !selInst || selInst.value === 'todas' || a.closest('[data-instancia]')?.dataset.instancia === selInst.value);
  $('[data-pool]').hidden = true;
  const reloj = $('[data-reloj]'), res = $('[data-sim-res]'), info = $('[data-sim-info]');
  const bArmar = $('[data-armar]'), bEntregar = $('[data-entregar]');
  let timer = null;
  const parar = () => { clearInterval(timer); timer = null; };
  const ROTULO = { tema: ['Temas a desarrollar', 'Tema'], corta: ['Preguntas cortas', 'Corta'], choice: ['Multiple choice', 'Choice'] };

  bArmar.onclick = () => {
    parar();
    reloj.hidden = true; reloj.removeAttribute('data-fin'); res.hidden = true; res.textContent = '';
    lSim.replaceChildren(); lSim.dataset.fase = 'resolviendo';
    const param = Number(new URLSearchParams(location.search).get('semilla')); // ?semilla=N repite un simulacro
    const semilla = Number.isInteger(param) && param > 0 ? param : 1 + Math.floor(Math.random() * 2 ** 31);
    const sel = armarSimulacro(delPool().map((a) => ({ id: a.dataset.id, tipo: a.dataset.tipo })), rngSemilla(semilla), FORMATO);
    const porId = new Map(pool.map((a) => [a.dataset.id, a]));
    let k = 0;
    for (const tipo of Object.keys(FORMATO)) {
      if (!sel[tipo].length) continue;
      const sec = Object.assign(document.createElement('section'), { className: 'sim-grupo' });
      const h = document.createElement('h2');
      h.textContent = tipo === 'tema' ? `${ROTULO.tema[0]} (elegí 1 de ${sel.tema.length})` : ROTULO[tipo][0];
      sec.append(h);
      sel[tipo].forEach((id, i) => {
        const c = porId.get(id).cloneNode(true);
        ['id', 'data-id', 'data-pregunta', 'hidden', 'data-estado'].forEach((a) => c.removeAttribute(a));
        $('.preg-acc', c)?.remove(); $('[data-estado-txt]', c)?.remove();
        $$('textarea', c).forEach((t) => { t.value = ''; t.textContent = ''; });
        $$('details[open]', c).forEach((d) => d.removeAttribute('open'));
        $$('input[type=radio]', c).forEach((r) => { r.name = 'sim-' + k; r.checked = false; });
        c.dataset.sim = String(k++);
        const tit = $('.preg-tit', c);
        tit.textContent = `${ROTULO[tipo][1]} ${i + 1}. ${tit.textContent}`;
        sec.append(c);
      });
      lSim.append(sec);
    }
    info.textContent = `Simulacro armado (semilla ${semilla}). ${delPool().length ? 'Respondé y entregá.' : 'Todavía no hay preguntas cargadas.'}`;
    bEntregar.hidden = !lSim.children.length;
    if (document.querySelector('[data-crono]').checked) {
      const min = minutosValidos($('[data-minutos]').value);
      $('[data-minutos]').value = min;
      const fin = Date.now() + min * 60000; // por reloj, no por ticks: no se atrasa en segundo plano
      reloj.hidden = false;
      const tic = () => {
        const resto = Math.ceil((fin - Date.now()) / 1000);
        reloj.textContent = mmss(Math.max(resto, 0));
        if (resto <= 0) { parar(); reloj.dataset.fin = ''; info.textContent = 'Se terminó el tiempo del simulacro.'; }
      };
      tic(); timer = setInterval(tic, 1000);
    }
    lSim.firstElementChild?.scrollIntoView({ block: 'nearest' });
  };

  bEntregar.onclick = () => {
    parar();
    lSim.dataset.fase = 'entregado';
    bEntregar.hidden = true;
    const choices = $$('[data-tipo="choice"]', lSim);
    const nota = corregirChoices(
      Object.fromEntries(choices.map((a) => [a.dataset.sim, elegida(a)])),
      Object.fromEntries(choices.map((a) => [a.dataset.sim, a.dataset.correcta])),
    );
    choices.forEach((a) => { mostrarResultado(a, nota.detalle[a.dataset.sim]); $$('input', a).forEach((r) => (r.disabled = true)); });
    $$('[data-resp]', lSim).forEach((d) => (d.open = true));
    res.textContent = choices.length ? `Multiple choice: ${nota.aciertos} de ${nota.total} correctas. Los temas y las cortas se comparan con la respuesta modelo o se corrigen con IA.` : 'Entregado. Compará con las respuestas modelo o corregí con IA.';
    res.hidden = false;
    res.focus();
  };
}
