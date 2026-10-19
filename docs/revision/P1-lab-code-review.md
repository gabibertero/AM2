# Revisión de código: laboratorio U1-U3 (commit 66fa8c3)

Alcance: `src/scripts/lab/p1-*.js`, `index.js`, `tests/lab.test.mjs`. `npm run test:lab`: 50/50 OK.

Comprobaciones extra (scripts descartables, nada del repo tocado):
- 7 generadores x 5000 semillas consecutivas: ninguna excepción, ningún `NaN`/`Infinity`/`undefined`/`[object`/`+-`/llaves desbalanceadas en enunciado, pasos ni resultado.
- 7 generadores x 3000 semillas, 213.864 fórmulas por `katex.renderToString` con `throwOnError:true` y `strict:'error'`: 0 errores.

Resumen: CRÍTICO 0, ALTO 0, MEDIO 1, BAJO 3. Se puede mergear.

## CRÍTICO
Ninguno.

## ALTO
Ninguno.

## MEDIO
1. `tests/lab.test.mjs:9` - los tests validan la matemática con 300 semillas (`i*7919+1`) pero ninguno renderiza el TeX con KaTeX. `ui.js:18` usa `throwOnError:false`, así que un TeX inválido se vería como texto rojo sin que falle nada. Hoy 0 errores (verificado), pero nada lo protege a futuro.
   Fix: un test que recorra enunciado/pasos/resultado de los 7 generadores p1 con `katex.renderToString(tex, { throwOnError: true, strict: 'error' })`.

## BAJO
1. `src/scripts/lab/p1-direccional.js:108` - `razon = rz` es un alias sin razón de ser. Fix: usar `rz` y borrar `razon`.
2. `src/scripts/lab/p1-dominio.js:22` - `if (c === 1) continue` descarta c=1 también cuando la condición es `> 0` o `≥ 0`, donde G=0 es la curva y c=1 no molesta. Solo reduce variedad. Fix: aplicarlo solo a los tipos con `v === 1` (`lnd`).
3. Cosmética de pasos (no es error): `\frac{0}{2}` en el versor con v=(0,2) o (-5,0) (`p1-direccional.js:83`, semilla 20) y `-\frac{0}{1}` en implícita (`p1-implicita.js:17`, semilla 3). Fix: pasar por `num()` o mostrar `0` directo.

## Puntos del pedido sin hallazgos
- localStorage / prefijo `am2:v1:`: el commit no toca estado; todo es lógica pura. `progreso.js` ya usa try/catch y `am2:v1:`, y el reinicio borra solo esas claves.
- XSS: `ui.js` pinta texto con `textContent` y el TeX con `katex.render`. El TeX sale de los generadores y no del usuario. Lo único externo es `?tipo=` y `?semilla=`, y ambos se validan (`GENERADORES.some`, `semillaValida`).
- Accesibilidad: `ui.js` no cambió en el commit; `aria-expanded` del botón de solución se mantiene.
- Consistencia con el lab del 2º parcial: misma forma `{ id, nombre, grupo, instancia, generar }` y `verif`. Líneas largas (hasta 478 caracteres) en línea con `polares.js` (503).
- Riesgo de bucles `for(;;)`/`do-while` sin salida: no se observó ninguno en 5000 semillas por generador.
