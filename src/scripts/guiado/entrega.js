import { checkExpression } from './validar.js';

const section = document.querySelector('[data-entrega-parcial]');
if (section) iniciarEntrega(section);

function iniciarEntrega(section) {
  const form = section.querySelector('[data-entrega-form]');
  const fields = [...form.querySelectorAll('[data-resultado-esperado]')];
  const summary = section.querySelector('[data-entrega-resumen]');
  const saveStatus = section.querySelector('[data-entrega-guardado]');
  const key = 'am2:v1:entrega:' + section.dataset.entregaParcial;

  try {
    const saved = JSON.parse(localStorage.getItem(key));
    for (const field of fields) {
      if (typeof saved?.[field.name] === 'string') field.value = saved[field.name].slice(0, 360);
    }
  } catch {
    // Un guardado anterior dañado no impide entregar.
  }

  form.addEventListener('input', event => {
    const changed = event.target.closest('[data-resultado-esperado]');
    if (!changed) return;
    changed.closest('.entrega-campo').querySelector('[data-entrega-resultado]').hidden = true;
    summary.textContent = '';
    try {
      const values = Object.fromEntries(fields.map(field => [field.name, field.value]));
      localStorage.setItem(key, JSON.stringify(values));
    } catch {
      saveStatus.textContent = 'Podés comprobar tus resultados en esta pestaña. El navegador no permite guardarlos.';
    }
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    // En el simulacro la entrega también termina el cronómetro y habilita la autocorrección.
    document.querySelector('[data-examen-panel][data-fase="corriendo"] [data-ex="entregar"]')?.click();
    const counts = { correct: 0, incorrect: 0, unsupported: 0, empty: 0 };
    for (const field of fields) {
      const expected = field.dataset.resultadoEsperado;
      const value = field.value.trim();
      const result = value ? checkExpression(value, expected) : { status: 'empty', message: 'Sin respuesta.' };
      const output = field.closest('.entrega-campo').querySelector('[data-entrega-resultado]');
      counts[result.status]++;
      output.dataset.result = result.status;
      output.textContent = {
        correct: 'Coincide.',
        incorrect: 'Revisá este resultado. Volvé al planteo y comprobá los pasos intermedios.',
        unsupported: 'No pude verificar esta forma. ' + result.message,
        empty: 'Sin respuesta.',
      }[result.status];
      output.hidden = false;
    }
    summary.textContent = [
      counts.correct + ' coinciden',
      counts.incorrect + ' para revisar',
      counts.unsupported + ' sin verificar',
      counts.empty + ' sin respuesta',
    ].join(' · ') + '.';
    summary.focus();
  });

  section.hidden = false;
}
