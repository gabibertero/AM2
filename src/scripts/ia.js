// Botón "… con IA ▾" (components/IA.astro): toma el contexto de la tarjeta [data-ia-ctx], copia el prompt
// y abre la IA elegida con el prompt cargado. Delegado en document: anda también en los clones del simulacro.
import { leer, guardar } from './progreso.js';
// Materia fija de este sitio.
const materia = { largo: 'Análisis Matemático II', facultad: 'UTN FRC', carrera: 'Ingeniería en Sistemas' };
import { promptParaDestino, urlDestino, DESTINOS } from './ia-prompt.js';

// KaTeX duplica la fórmula (MathML + HTML): se reemplaza por su TeX para que el prompt quede limpio.
function texto(el) {
  if (!el) return '';
  const c = el.cloneNode(true);
  // .katex-display contiene un .katex: se reemplaza el externo con $$…$$ y el interno ya no existe.
  c.querySelectorAll('.katex-display, .katex').forEach((k) => {
    if (!c.contains(k)) return;
    const tex = k.querySelector('annotation[encoding="application/x-tex"]')?.textContent;
    const d = k.classList.contains('katex-display');
    k.replaceWith(tex ? (d ? `$$${tex}$$` : `$${tex}$`) : k.textContent);
  });
  c.querySelectorAll('[data-ia], .sr-only, .rotulo').forEach((x) => x.remove()); // sr-only: avisos para lector de pantalla, no contenido
  // textContent pega los bloques ("voluntad.De ahí"): cortes de línea en bloques, viñetas en ítems, " | " entre celdas.
  c.querySelectorAll('li').forEach((x) => x.prepend('- '));
  c.querySelectorAll('td, th').forEach((x) => x.append(' | '));
  c.querySelectorAll('br').forEach((x) => x.replaceWith('\n'));
  c.querySelectorAll('p, li, tr, h1, h2, h3, h4, h5, h6, blockquote, div, dt, dd, label, legend').forEach((x) => x.append('\n'));
  return c.textContent.replace(/[ \t]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim();
}

async function copiar(t) {
  try { await navigator.clipboard.writeText(t); return true; } catch { /* sin permiso: fallback */ }
  const ta = Object.assign(document.createElement('textarea'), { value: t });
  ta.style.cssText = 'position:fixed;opacity:0';
  document.body.append(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch { /* nada */ }
  ta.remove();
  return ok;
}

// Respuesta modelo tomada del DOM (aunque esté oculta): pasos y soluciones elaborados; sin escaneos ni "pendiente de revisión".
function modeloDe(ctx) {
  const m = ctx.querySelector('[data-ia-modelo]');
  if (m) return texto(m);
  return [...ctx.querySelectorAll('[data-paso], [data-solucion]:not(.oficial)')]
    .filter((e) => !e.querySelector('.pendiente'))
    .map(texto).filter(Boolean).join('\n');
}

const claveMia = (box) => box.closest('[data-ia-ctx]')?.dataset.id && 'ia:mia:' + box.closest('[data-ia-ctx]').dataset.id;

document.querySelectorAll('[data-ia]').forEach((box) => {
  box.querySelectorAll('[data-ia-js], .ia-mia[hidden]').forEach((e) => (e.hidden = false)); // sin JS el menú no sirve
  const ta = box.querySelector('[data-ia-mia]');
  const k = claveMia(box);
  if (ta && k) ta.value = leer(k) || '';
});

// Borrador de "Tu respuesta" guardado por pregunta (no en los clones del simulacro, que no tienen data-id).
document.addEventListener('input', (e) => {
  const ta = e.target.closest?.('[data-ia-mia]');
  const k = ta && claveMia(ta);
  if (k) guardar(k, ta.value);
});

document.addEventListener('click', (e) => {
  const b = e.target.closest?.('[data-ia-ir]');
  if (!b) return;
  const box = b.closest('[data-ia]');
  const ctx = box.closest('[data-ia-ctx]') || box.parentElement;
  const mia = box.querySelector('[data-ia-mia]')?.value || '';
  const dest = b.dataset.iaIr;
  const prompt = promptParaDestino(dest, {
    materia,
    tema: texto(ctx.querySelector('[data-ia-tit]')),
    enunciado: texto(ctx.querySelector('[data-ia-enun]')),
    modelo: modeloDe(ctx),
    mia: box.dataset.ia === 'corregir' ? mia : '',
  });
  const destino = urlDestino(dest, prompt);
  const copiado = copiar(prompt); // primero copiar, así el portapapeles ya está listo al abrir la pestaña
  if (destino) { // antes de cualquier await: si no, el navegador lo bloquea
    const a = Object.assign(document.createElement('a'), { href: destino.url, target: '_blank', rel: 'noopener noreferrer' });
    document.body.append(a); a.click(); a.remove();
  }
  const aviso = box.querySelector('[data-ia-aviso]');
  const tipo = box.dataset.ia === 'corregir' && mia.trim() ? 'corrección' : 'explicación';
  aviso.textContent = ''; // vaciar y reasignar: el lector vuelve a anunciar el mismo texto
  copiado.then((ok) => requestAnimationFrame(() => {
    const nombre = DESTINOS[dest]?.nombre;
    aviso.textContent = !destino
      ? (ok ? 'Prompt copiado. Pegalo en la IA que quieras.' : 'No se pudo copiar: tu navegador lo bloqueó.')
      : destino.pegar
        ? `Abriendo ${nombre}: pegá el prompt (⌘V / Ctrl+V) y enviá.${ok ? ' Si no se abrió, el prompt quedó copiado.' : ' No se pudo copiar automáticamente.'}`
        : `Abriendo ${nombre} con el pedido de ${tipo}. Si no se abrió, ${ok ? 'el prompt quedó copiado: pegalo.' : 'permití las ventanas emergentes.'} El pedido viaja en la URL y queda en tu historial.`;
  }));
  const menu = b.closest('details');
  menu?.removeAttribute('open');
  menu?.querySelector('summary')?.focus(); // el foco no se pierde al cerrar el menú
});

// Un solo menú abierto a la vez; Escape o clic afuera lo cierran y devuelven el foco.
document.addEventListener('toggle', (e) => {
  if (e.target.matches?.('details.ia-menu[open]')) document.querySelectorAll('details.ia-menu[open]').forEach((d) => d !== e.target && d.removeAttribute('open'));
}, true);
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const d = document.querySelector('details.ia-menu[open]');
  if (d) { d.removeAttribute('open'); d.querySelector('summary')?.focus(); }
});
document.addEventListener('click', (e) => {
  document.querySelectorAll('details.ia-menu[open]').forEach((d) => { if (!d.contains(e.target)) d.removeAttribute('open'); });
});
