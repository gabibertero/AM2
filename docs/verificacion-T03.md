# Verificación T03 — 2026-10-14

Resultado: 1 error

| # | id#n | Problema | Fuente dice | MDX dice | Corrección |
|---|---|---|---|---|---|
| 1 | `1v1-2025-11-13-a#2` | Término ilegible del enunciado marcado con placeholder en lugar de la transcripción o la marca de "pendiente de revisión" | Restricción `4x² + 4y² + z² = 4` (el escaneo muestra un término en z; la resolución oficial p. 3 despeja `z = 2√(1−r²)`, o sea z²) | `4x^2+4y^2+\text{[?]}=4` | Reemplazar `\text{[?]}` por `z^2`. Si se considera no legible, usar la marca "pendiente de revisión", no `[?]`. Confianza media-alta: el término z² está confirmado por la resolución, no por el trazo del enunciado |

## Dudas

- `1v1-2025-11-13-a` (cabecera y frontmatter): la cabecera de la página 1 no quedó verificada en esta pasada (el recorte cubrió sólo los ejercicios 1 a 3). Falta confirmar comisión 1V1, fecha 13/11/2025 y tema A contra el escaneo.
- `1v1-2025-11-13-a#4`: el MDX dice que "en el original falta dy" y transcribe `(\sin y+y\sin x)\,dx+(x\cos y-\cos x+3y^2-1)=0`. La resolución oficial (p. 6) escribe `...dy=0`. No pude confirmar en el enunciado si el dy falta. Revisar la página 1, zona del ejercicio 4, antes de dar la nota por cerrada.

## Cobertura

- Enunciados (p. 1) cotejados contra el escaneo: los 12 exámenes. Para 1v1-a, sólo ejercicios 1 a 3 en recorte, más el punto de Dudas anterior.
- Mapeo de `ResolucionOficial`: confirmado para los 12 exámenes. Cada ejercicio resuelto corresponde a la página indicada en el MDX. Las páginas se miraron en montaje a menor resolución; la identificación se hizo por número de ejercicio e integrando.
- Nombres de alumnos en MDX: ninguno (búsqueda de `mazz`, `luis`, `legajo`, `apellido`, `nombre` sin coincidencias).
