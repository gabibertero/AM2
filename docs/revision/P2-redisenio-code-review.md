# Revisión independiente de código · P2 2026

Fecha: 4/11/2026. Procedimiento: agente `code-reviewer` de ECC. Auditor distinto de quienes implementaron. Sonnet no está disponible en este entorno; revisión con el modelo actual.

## Alcance

Diff y contexto de Layout, Inicio, Parciales, Machetes, Ejercicio, panel examen, registro de aprendizaje, lista de errores, orden cronológico y CSS. También archivos nuevos sin seguimiento. No se modificó implementación durante la revisión. Matemática y fidelidad tienen auditoría independiente propia.

## Hallazgos iniciales

### MEDIUM · La nota se descarta si todavía no se eligió autonomía

Archivo: `src/scripts/estudio.js:4` y manejador de `input` en línea 17 de la versión inicial.

Caso reproducido con Chromium: escribir «Me trabe con el radio» en el campo de dificultad del primer ejercicio antes de elegir estado. Se guarda `{"estado":"","nota":"Me trabe con el radio"}`. Al recargar, `registro()` rechaza estado vacío y el campo queda vacío. Validar estado y nota de forma independiente para preservar lo escrito.

### MEDIUM · Los enlaces de Mis errores apuntan a un ancla inexistente

Archivo: `src/pages/errores/index.astro:8–10` de la versión inicial.

El analizador de atributos solo acepta valores entre comillas, pero los MDX usan `numero={1}`. `a.numero` queda indefinido. Reproducción en Chromium: primer enlace del nuevo parcial apunta a `/AM2/parciales/1h10-2026-10-31-a/#ej-undefined` y el encabezado queda sin número. Derivar el número del ID estable o aceptar el atributo numérico entre llaves.

## Verificaciones adicionales

- Cinco ejercicios del parcial nuevo renderizados.
- Pasos/soluciones/pistas, autonomía y enlaces al machete ocultos durante examen activo: 0 visibles.
- Sin errores JavaScript en el recorrido probado.
- Datos de notas se presentan con `textContent`, no como HTML.
- Nuevo registro con prefijo `am2:v1:` separado del progreso previo.
- Fecha del encabezado usada para orden cronológico descendente y variante separada.
- Foto original nueva no referenciada como imagen pública; no se fabrica resolución oficial.

## Estado

Los dos hallazgos fueron corregidos por el implementador y verificados nuevamente con Chromium sobre el sitio servido: la nota escrita sin estado persiste tras recargar y el enlace del primer ejercicio apunta a `#ej-1`. Sin hallazgos abiertos en el alcance revisado.

**Veredicto: APPROVE.** No quedan problemas HIGH o CRITICAL; los dos MEDIUM iniciales están resueltos.

| Severidad | Cantidad inicial |
|---|---:|
| CRITICAL | 0 |
| HIGH | 0 |
| MEDIUM | 2, ambos corregidos |
| LOW | 0 |
