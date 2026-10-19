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
// Texto con notación: `$…$` y las derivadas con apóstrofo (f'_x, F'_z(P), g'_y = 0…) se pintan con KaTeX en línea; el resto es textContent.
const NOTACION = /\$([^$]+)\$|([A-Za-z]'{1,2}_[xyz12]{1,3}(?:\([^()]*\))?(?:\s?=\s?0\b)?)/g;
function texto(p, s) {
  let i = 0;
  for (const m of s.matchAll(NOTACION)) {
    if (m.index > i) p.append(s.slice(i, m.index));
    const span = el('span', 'lab-inl');
    katex.render(m[1] ?? m[2].replace(/_([xyz12]{2,3})/, '_{$1}'), span, { throwOnError: false });
    p.append(span);
    i = m.index + m[0].length;
  }
  if (i < s.length) p.append(s.slice(i));
}
function bloque(b) {
  const d = el('div', 'lab-bloque');
  if (b.txt) { const p = el('p'); texto(p, b.txt); d.append(p); }
  if (b.tex) {
    const m = el('div', 'lab-tex');
    katex.render(b.tex, m, { displayMode: true, throwOnError: false });
    d.append(m);
  }
  return d;
}
// Gráfico del dominio (si el generador lo da): región en color, curvas borde llenas (incluidas) o punteadas (excluidas), ejes numerados.
// Se dibuja en píxeles de dispositivo (devicePixelRatio) para que sea nítido; el CSS lo achica o centra.
function grafico(g) {
  const R = 6, L = 340, s = Math.min(3, Math.max(1, Math.round(window.devicePixelRatio || 1))), W = L * s, c = el('canvas', 'lab-graf');
  c.width = W; c.height = W;
  c.setAttribute('role', 'img');
  c.setAttribute('aria-label', 'Gráfico del dominio: región sombreada, borde lleno si está incluido y punteado si no. El detalle está escrito en los pasos.');
  const ctx = c.getContext('2d');
  if (!ctx) return c;
  const cs = getComputedStyle(document.documentElement);
  const acento = cs.getPropertyValue('--acento').trim() || '#2563eb', texto = cs.getPropertyValue('--texto').trim() || '#111';
  const xy = (i, j) => [((i + 0.5) / W) * 2 * R - R, R - ((j + 0.5) / W) * 2 * R];
  ctx.globalAlpha = 0.28; ctx.fillStyle = acento;
  for (let j = 0; j < W; j++) for (let i = 0; i < W; i++) { const [x, y] = xy(i, j); if (g.dom(x, y)) ctx.fillRect(i, j, 1, 1); }
  ctx.globalAlpha = 1; ctx.fillStyle = texto;
  ctx.fillRect(0, W / 2 - s / 2, W, s); ctx.fillRect(W / 2 - s / 2, 0, s, W); // ejes
  ctx.font = `${11 * s}px sans-serif`; ctx.textBaseline = 'top';
  for (let k = -R + 1; k < R; k++) {
    const p = ((k + R) / (2 * R)) * W;
    ctx.fillRect(p - s / 2, W / 2 - 3 * s, s, 6 * s); ctx.fillRect(W / 2 - 3 * s, p - s / 2, 6 * s, s);
    if (k && k % 3 === 0) { // números en ±3 (los extremos ±6 se dicen en el título)
      const t = String(k).replace('-', '\u2212');
      ctx.textAlign = 'center'; ctx.fillText(t, p, W / 2 + 5 * s);
      ctx.textAlign = 'left'; ctx.fillText(t, W / 2 + 6 * s, W - p - 6 * s);
    }
  }
  ctx.textAlign = 'right'; ctx.fillText('x', W - 3 * s, W / 2 + 5 * s);
  ctx.textAlign = 'left'; ctx.fillText('y', W / 2 + 6 * s, 3 * s);
  for (const cv of g.curvas) {
    const lado = (i, j) => { const [x, y] = xy(i, j); return cv.g(x, y) - cv.c > 0; };
    for (let j = 0; j < W - 1; j++) for (let i = 0; i < W - 1; i++) {
      if ((lado(i, j) !== lado(i + 1, j) || lado(i, j) !== lado(i, j + 1)) && (cv.incl || ((i + j) >> 2) % 2 === 0)) ctx.fillRect(i, j, 1.5 * s, 1.5 * s);
    }
  }
  return c;
}
const azar = (actual) => { let s; do s = 1 + Math.floor(Math.random() * 999999); while (s === actual); return s; };

export function iniciarLab(raiz) {
  const $ = (s) => raiz.querySelector(s);
  const selTipo = $('[data-tipo]'), inSemilla = $('[data-semilla]'), aviso = $('[data-aviso]');
  const btnVer = $('[data-ver]'), sol = $('[data-solucion]'), mia = $('[data-ia-mia]');
  const q = new URLSearchParams(location.search);
  let tipo = GENERADORES.some((g) => g.id === q.get('tipo')) ? q.get('tipo') : GENERADORES[0].id;
  let semilla = semillaValida(q.get('semilla')) ?? azar(0);

  for (const [i, nombre] of [['p1', '1º parcial (U1–U3)'], ['p2', '2º parcial (U4–U10)']]) {
    const gs = GENERADORES.filter((g) => (g.instancia ?? 'p2') === i);
    if (!gs.length) continue;
    const og = Object.assign(document.createElement('optgroup'), { label: nombre });
    for (const g of gs) og.append(Object.assign(el('option', '', g.nombre), { value: g.id }));
    selTipo.append(og);
  }

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
    if (e.grafico) sol.append(el('p', 'lab-res-t', 'Gráfico del dominio (x e y entre −6 y 6)'), grafico(e.grafico));
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
