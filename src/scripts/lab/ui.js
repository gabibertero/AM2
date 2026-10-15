// UI del laboratorio: elige generador y semilla (?tipo=…&semilla=N), dibuja enunciado, pasos y resultado con KaTeX.
// Todo el texto va por textContent; el TeX lo arma lógica propia (nada del usuario) y lo pinta katex.render.
import katex from 'katex';
import { GENERADORES, generar } from './index.js';
import { semillaValida } from './rng.js';

const el = (tag, clase, texto) => {
  const n = document.createElement(tag);
  if (clase) n.className = clase;
  if (texto) n.textContent = texto;
  return n;
};
function bloque(b) {
  const d = el('div', 'lab-bloque');
  if (b.txt) d.append(el('p', '', b.txt));
  if (b.tex) {
    const m = el('div', 'lab-tex');
    katex.render(b.tex, m, { displayMode: true, throwOnError: false });
    d.append(m);
  }
  return d;
}
const azar = (actual) => { let s; do s = 1 + Math.floor(Math.random() * 999999); while (s === actual); return s; };

export function iniciarLab(raiz) {
  const $ = (s) => raiz.querySelector(s);
  const selTipo = $('[data-tipo]'), inSemilla = $('[data-semilla]'), aviso = $('[data-aviso]');
  const btnVer = $('[data-ver]'), sol = $('[data-solucion]'), mia = $('[data-ia-mia]');
  const q = new URLSearchParams(location.search);
  let tipo = GENERADORES.some((g) => g.id === q.get('tipo')) ? q.get('tipo') : GENERADORES[0].id;
  let semilla = semillaValida(q.get('semilla')) ?? azar(0);

  for (const g of GENERADORES) selTipo.append(Object.assign(el('option', '', g.nombre), { value: g.id }));

  let ultimo = { tipo, semilla }; // último ejercicio que se generó bien
  function mostrar() {
    let e;
    try { e = generar(tipo, semilla); } catch (err) {
      ({ tipo, semilla } = ultimo); // si falla, los controles vuelven al ejercicio que se está viendo
      selTipo.value = tipo; inSemilla.value = semilla;
      aviso.textContent = 'No se pudo generar este ejercicio. Probá con otro.';
      return;
    }
    ultimo = { tipo, semilla };
    selTipo.value = tipo;
    inSemilla.value = semilla;
    aviso.textContent = '';
    $('[data-titulo]').textContent = e.nombre;
    const enun = $('[data-enunciado]');
    enun.replaceChildren(...e.enunciado.map(bloque));
    const ol = el('ol');
    for (const p of e.pasos) { const li = el('li'); li.append(bloque(p)); ol.append(li); }
    const res = el('div', 'lab-res');
    res.append(el('p', 'lab-res-t', 'Resultado'), bloque(e.resultado));
    sol.replaceChildren(el('h3', '', 'Solución elaborada (no oficial)'), ol, res);
    sol.hidden = true;
    btnVer.setAttribute('aria-expanded', 'false');
    btnVer.textContent = 'Ver solución';
    if (mia) mia.value = '';
    const u = new URL(location.href);
    u.searchParams.set('tipo', tipo);
    u.searchParams.set('semilla', semilla);
    history.replaceState(null, '', u);
  }

  selTipo.addEventListener('change', () => { tipo = selTipo.value; mostrar(); });
  $('[data-otro]').addEventListener('click', () => { semilla = azar(semilla); mostrar(); });
  btnVer.addEventListener('click', () => {
    sol.hidden = !sol.hidden;
    btnVer.setAttribute('aria-expanded', String(!sol.hidden));
    btnVer.textContent = sol.hidden ? 'Ver solución' : 'Ocultar solución';
  });
  $('[data-cargar]').addEventListener('submit', (ev) => {
    ev.preventDefault();
    const s = semillaValida(inSemilla.value);
    if (s === null) { aviso.textContent = 'La semilla tiene que ser un entero entre 1 y 2147483647.'; return; }
    semilla = s;
    mostrar();
  });
  raiz.hidden = false;
  mostrar();
}
