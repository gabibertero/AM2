import { curso } from '../scripts/guiado/curso.js';
import { anteriores } from '../scripts/guiado/anteriores.js';

export const controlesGuiados = new Map([...curso, ...anteriores].map(exercise => [exercise.id, exercise]));

const finalesEnRevision = new Set(['recup-1h10-2025-11-08#2', '2s2-2025-11-07-b#2']);

export function resultadosDelParcial(examId) {
  return [...controlesGuiados.values()]
    .filter(exercise => exercise.id.split('#')[0] === examId)
    .map(exercise => {
      const [, numero] = exercise.id.split('#');
      if (finalesEnRevision.has(exercise.id)) {
        return { numero, title: exercise.title, fields: [], warning: exercise.warning };
      }
      const fields = exercise.id === '1h10-2026-10-31-a#3'
        ? [exercise.steps.find(step => step.id === 'suma-tramos').fields[0], exercise.steps.at(-1).fields.at(-1)]
        : exercise.steps.at(-1).fields;
      return { numero, title: exercise.title, fields };
    });
}
