# P1 — Informe del tester (recorrido de la estudiante apurada)

Fecha: 2026-10-19. Build: 80 páginas. Servidor: `astro preview`.

## Conteos
- `npm test` (Playwright, desktop + celular + horizontal 844x390): 70 pasan, 1 falla (nuevo, bug real B1). Antes de mis tests: 48/48.
- `npm run test:unit`: 72/72.
- Test nuevo: `tests/p1-recorrido.spec.mjs` (23 casos: 22 pasan, 1 falla a propósito).
- Chequeo estático de todo el build (`href`/`src`/anclas, 3.547 referencias): 0 rotas.
- axe no está instalado (no hay `@axe-core/*`); la a11y se cubrió con chequeos propios (un h1, main/nav/header, lang, alt, labels, nombres, ids duplicados) en todas las páginas P1 y machetes P1: sin hallazgos.

## Severidad: bloqueante 0 · alto 0 · medio 1 · bajo 3

### MEDIO
**B1. Sin JS, el parcial no muestra pistas/pasos/soluciones y deja 4 botones muertos por ejercicio.**
- Pasos: abrir `parciales/p1-1h9-2025-05-g1/` con JavaScript desactivado (390px).
- Esperado: el contenido de ayuda visible (o al menos sin botones inútiles).
- Obtenido: `[data-pista]` 0 visibles de 9, `[data-solucion]` 0 de 12, y 12 botones visibles ("Ver pista", "Siguiente paso", "Ver solución completa", "Ocultar todo") que no hacen nada. Pasa igual en `parciales/1r3-2025-11-14/` (20 botones) y en cualquier página con `<Ejercicio>`; los radios de estado también quedan sin efecto.
- Causa probable: `src/components/Pista.astro` (y Paso/Solucion) llevan `hidden` fijo y `Ejercicio.astro` renderiza `.acciones` sin esconderlo sin JS (el panel de examen sí usa `hidden`). Arreglo sugerido: mostrar `.acciones` solo con JS (`[data-js]`) y quitar `hidden` por defecto de las ayudas, que el JS esconda.
- Test que lo cubre: `tests/p1-recorrido.spec.mjs` › "sin JS: parcial P1..." (queda fallando). El test viejo `examen.spec.mjs` "sin JS se ve todo" solo mira el h1 y el panel, por eso no lo detectaba.

### BAJO
- **B2.** No hay selector de tema: claro/oscuro sigue solo al sistema (`prefers-color-scheme`). Cambiarlo en medio del examen no rompe nada (probado). Solo avisar si Gabi esperaba un botón.
- **B3.** El chip "Machete: X" de la cabecera de `Ejercicio.astro` (línea 27) enlaza a `machetes/` (índice), no al machete concreto. El link específico solo está dentro de la pista 2 (ese sí funciona y al volver la pista sigue abierta).
- **B4.** Pestaña de higiene: `.astro/preview N.json`, `.astro/content-modules 2.mjs` y `.git/index 6/7/8` son copias tipo iCloud. No van a git (`.astro` está en `.gitignore`), pero hay que borrarlas a mano. `git status` sin `node_modules`/`test-results`; pendientes de commitear: `.DS_Store` (sin ignorar), `AGENTS.md`, los 3 informes `P1-*.md` y el test nuevo.

## Qué se probó y anduvo
- Home → 1º parcial → parcial → pista 2 → machete → volver (desktop y 390px): ok, sin errores de consola ni `.katex-error`, sin scroll horizontal.
- Modo examen en un parcial P1 (reloj con `page.clock`: 02:00 → 01:30, pausa congela, doble click en Entregar, nota 50 con Bien/A medias/Mal, `aria-pressed`, recarga muestra "Último intento 50/100", salir restaura): ok en ambos tamaños. Cambio de esquema claro/oscuro y giro a 844x390 en medio del examen: ok.
- Laboratorio P1 (dominio, direccional, diferencial, extremos, lagrange, implícita, plano) x 6 semillas (1, 2, 7, 99, 31337, 2147483647) x desktop/390/844x390: solución abre, 0 `katex-error`, sin scroll horizontal, "otro" cambia la URL y esa URL abre el mismo ejercicio en otra sesión. Gráfico del dominio: canvas pintado, dentro de pantalla, con `role=img`.
- Entradas raras: `?tipo=<script>`, `semilla` 0, negativa, decimal, `1e3`, gigante, `%00`; en la caja: `−3/2`, `2√5`, `1,5`, vacío, `alert(1)`, HTML; "Tu respuesta" con `<img onerror>`: sin diálogos ni pageerror.
- IA (lab y parcial P1): el prompt trae la consigna, el modelo y la respuesta, sin `undefined`.
- Preguntero P1 (U1–U3) y teoría u01–u03: filtros, "✓ La sé" persiste tras recargar, teoría sin errores KaTeX.
- "Seguir donde dejaste" y progreso persisten entre recargas; el enlace vuelve a `#ej-1`. Valores corruptos o de otro origen (`javascript:`, `https://evil`) no se muestran.
- `localStorage` roto (getter que tira): Home, parcial, preguntero, laboratorio, teoría, simulacro y flujo de examen completo sin pageerror.
- Teclado: Tab recorre el parcial con indicador de foco visible; filtros del preguntero con `aria-pressed`.
- Imágenes de los 20 parciales P1: todas dan 200, `image/*` y tamaño razonable.

## Privacidad de imágenes nuevas (`docs/revision/privacidad-escaneos-p1.md`)
Revisé yo mismo (miniaturas legibles) la página 1 de los 20 exámenes completa y las 99 páginas de resolución. No hay nombre, legajo, firma, nota ni puntaje legibles; los datos de la cabecera están tapados con caja gris. Restos sin texto (rayas rojas, marcas de lápiz en el margen, un "a" y cuentas sueltas al pie de `p1-1h9-2025-05-g1/p1`) no identifican a nadie. Sin hallazgos. Límite: miniaturas ~350px por página; texto fino de margen no verificado a tamaño completo (la auditoría original sí lo hizo a ~1400 px).

## No cubierto
- Los `python3 tests/check_*.py` no los corrí (piden material de `../`); la matemática del laboratorio la cubren los 72 tests unitarios.
- Online (`verificar-online.sh`): no me pasaron URL.
- axe real: no instalado.
