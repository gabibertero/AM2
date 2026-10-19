# Estética — 1º parcial (Home, parciales P1, examen, machetes U1–U3, teoría, preguntero) — 2026-10-19 — 77/100

Capturas: `test-results/estetica-p1/` (`<pagina>-<d|m>-<light|dark>-fold|tN.png`; `pAopen-*`/`pBopen-*` = parcial con pista, pasos, solución y escaneos abiertos; `ex-*` = modo examen; `favicon-ampliado.png`). Build: `dist` (base /AM2/), preview en :4399. Mediciones: `medir-estetica.mjs` x 8 páginas x 390/1280 x claro/oscuro, más evaluate propio (táctil, h1→h3, largo de línea, imágenes sin dimensiones). Fuera de alcance: laboratorio.

Medido OK: 0 fallas de contraste según el script en las 32 combinaciones (salvo el crítico de abajo, que el script no detecta porque es un pseudo-elemento), 0 scroll horizontal de página en 390 en todas las páginas y temas (incluido modo examen), 1 h1 y 0 saltos de nivel, cuerpo 17px/1.6, 0 fuentes <13px, nav en 2 filas en celular (ya no se corta), título y theme-color en ambos temas, panel de examen en 390 compacto (1 línea, 63px). Mejoró mucho respecto de `E4-estetica.md` (70): KaTeX, figuras en celular, nav, sticky y acentos de unidad están resueltos.

| Bloque | Pts | Nota |
|---|---|---|
| Espaciado y ritmo | 15/20 | muchos paddings fuera de escala (ver M9), pero ritmo y gutter 16 correctos |
| Tipografía | 11/15 | línea 85–98 car. en machetes/teoría/parciales a 1280; rutas y nombres de archivo en pantalla |
| Color | 13/15 | paleta coherente, 1 crítico de contraste (pastilla verde) |
| Alineación | 7/10 | columna interna de machetes/teoría no llega al borde de su tarjeta; botón "Salir" se sale del padding |
| Home | 13/15 | primer pantallazo y CTA correctos; mapa con huecos y U10 huérfana |
| Celular | 7/10 | crítico de la pastilla; fórmulas display cortadas sin pista; enlaces de índice 18px |
| Consistencia | 8/10 | vocabulario de botones, etiquetas de comisión, emoji vs SVG |
| Detalles | 3/5 | favicon fino a 16px, imágenes sin dimensiones, ruta interna visible |

## Críticos
1. [Parcial P1 con figura en un paso · 390 · claro y oscuro] El aviso "← Deslizá para ver la figura completa →" (`::before` de `.ejercicio .capa:has(img[src*='.svg'])`, global.css línea ~296) hereda la regla `[data-paso]::before` (línea 250, el círculo numerado del paso): queda como una elipse sólida verde (`background rgb(15,107,69)` claro / `rgb(111,214,162)` oscuro, `border-radius:50%`, 28px de alto) con texto gris encima. Contraste medido: `#5f5a52` sobre `#0f6b45` = ~1.9:1 en claro; `#aaa59c` sobre `#6fd6a2` = ~1.6:1 en oscuro. Además el número del paso se pierde y el aviso pisa el rótulo "PASO · ELABORADO…" (`pAopen-m-light-t3.png`, `pAopen-m-dark-t4.png`, z1.png). Pasa en `p1-1h9-2025-07-rec` paso 5 y en todo paso/capa con SVG. Fix: scopear el selector del contador a `[data-paso]:not(.capa-fig)::before` o, mejor, resetear en el aviso (`.ejercicio .capa[data-paso]:has(img[src*='.svg'])::before{position:sticky;inset:auto;width:max-content;height:auto;border-radius:0;background:none;display:block;place-items:initial}`) y mover el contador a `::after`/`::marker`. Archivo: `src/styles/global.css` líneas 250 y 296.

## Mejoras (ordenadas por impacto visual)
1. [Parcial P1 · todos · ambos] Cada ejercicio repite el escaneo completo de la p.1 (899px de alto en 1280, 404px en 390), por ejercicio: `p1-1r3-2024-10-a` tiene 6 copias, página de 43.925px (53.054px en 390) y `p1-1h9-2025-07-rec` 22.122px. En el recorte se ve más de la mitad en blanco (`pAopen-d-light-t1.png`). Fix: recortar el escaneo al ejercicio (la solución ya lo hace con p2/p3…) o mostrar la p.1 una sola vez al principio del examen. Archivo: componente de escaneo + datos del parcial.
2. [Parcial P1 · 1280/390 · ambos] El aviso de discrepancia (tarjeta azul "oficial" con ⚠️ emoji) muestra una ruta interna: "Registrado en `docs/revision/p1-1h9-2025-discrepancias.md`" y se ve igual que un enunciado oficial (mismo azul, mismo borde) (`pAopen-d-light-t5.png`). Fix: capa propia ámbar (`--aviso`) con rótulo "AVISO · DISCREPANCIA CON EL ORIGINAL", ícono SVG en vez de emoji (también se ve el ⚠️ amarillo en el modo oscuro dentro de la solución) y sin ruta. Archivos: `src/pages/parciales/[id].astro`, global.css `.capa`.
3. [Machetes y Teoría · 1280 · ambos] Las tarjetas verdes miden 960px pero el contenido interno llega a ~800px (separadores `hr` terminan en x=987, tarjeta en 1119): ~130px de vacío a la derecha, mientras "En esta página" y las tablas de Teoría sí llegan a 1095 y el callout ámbar a 1002 (tres bordes derechos distintos en la misma tarjeta, `macA-d-light-t0.png`, `teoria-d-light-t0.png`). Largo de línea medido: 94–98 caracteres en machetes/teoría, 85 en ejercicios del parcial a 1280 (>80). Fix: `max-width:68ch` para párrafos/listas y tablas/callouts `max-width:none` dentro de una tarjeta de ancho completo, o tarjeta al ancho del texto. Archivo: `src/pages/machetes/[slug].astro`, `teoria/[slug].astro`, `.lectura`.
4. [Parciales (listado) · 1280 · ambos] Los chips de cabecera de tarjeta se parten en dos filas cuando el rótulo es largo ("1H9 · Tema Grupo 1", "1H10 · Tema B", "2S2 · Tema Tema B"), y el título queda ~31px más abajo que en las tarjetas vecinas (`parciales-d-light-t0.png`: 1H9 Grupo 1/2, 1H10 B, 2S2 B). Además: "Tema Tema B" duplicado, "Tema Grupo 1" (debería ser "Grupo 1"), fecha placeholder "xx/xx/2024" en "1H10 · B, 2024", y el heading "1º parcial· U1–U3" sin espacio antes del punto medio. Fix: normalizar el label a "<comisión> · <tema>" sin repetir "Tema"; `flex-wrap:nowrap` con el chip de estado a la derecha y `text-overflow`, o `grid-template-rows: subgrid`; mostrar "sin fecha" en lugar de xx/xx; `margin-left:.5ch` al rango. Archivos: `src/pages/parciales/index.astro`, datos de los parciales.
5. [Parcial P1 · 1280/390 · ambos] En la barra de pestañas de parciales la pestaña actual (`aria-current`) está fuera de la vista: es la 13ª de 33 y `scrollLeft=0` (medido `tabVisible:false` en ambos parciales). Las primeras 12 son del 2º parcial y el usuario del 1º no ve dónde está. Fix: `scrollIntoView({inline:'center'})` del `aria-current` al cargar, y filtrar la barra a la instancia del examen actual. Archivo: `src/pages/parciales/[id].astro`.
6. [Parcial P1 · 1280 · ambos] "Importante: …" se renderiza con 40px de sangría (borde izq. 436) mientras la línea de encabezado de arriba y las tarjetas empiezan en 396/397 (`pA-d-light-t0.png`). Es el `<blockquote>`/`ul` por defecto del enunciado. Fix: `margin-inline:0; padding-inline:0` o estilo de callout. Archivo: estilos de `.examen-cont`.
7. [Home · 1280 · ambos] Mapa de la materia: la grilla de 3 deja U10 sola en la última fila (7 tarjetas en 2º parcial) y las tarjetas con 2 enlaces (U6, U7, U10: sin Machetes/Ejercicios) tienen 40–60px de hueco antes de los enlaces mientras el resto tiene 4 (`home-d-dark-t1.png`). Fix: `margin-top:auto` en la barra de enlaces ya está, pero igualar a 4 columnas (U4–U10 en 4+3) o grilla 2×2 con celdas vacías deshabilitadas ("Machetes · pronto"). Archivo: `src/pages/index.astro`.
8. [Machete/Teoría · 390 · ambos] Fórmulas display largas se cortan dentro de su contenedor sin pista de scroll ni degradé: "D_f = {(x,y)∈ℝ² : todas las re…" en "Fórmulas clave" (`macA-m-dark-t1.png`) y "4x²+9y²<36" en el paso 3 (`pAopen-m-light-t3.png`). El patrón de figuras ya tiene degradé y aviso: reutilizarlo (`.katex-display{overflow-x:auto}` + `mask-image` en el borde derecho). También la lista numerada pierde ~60px de sangría + 16 de tarjeta + 20 de padding: texto en 270px (34–42 car.). Fix: `padding-left:1.25em` en `ol`/`ul` de `.lectura` y padding 16 en la tarjeta a ≤640px. Archivo: global.css `.lectura`.
9. [Todas · ambos · escala] Medido fuera de escala (±1px) por script, agrupado por causa: `button[data-ia-ir]` padding 6px (x532 en Preguntero), `td/th` 6/10px (Teoría, machetes), chips `.chip-u` padding-inline 14px, `blockquote.preg-enun` padding 14px, `div.ia` margin 9.6px, `textarea[data-ia-mia]` padding 10px, `li` 2px, `ul` padding-left 40px, `img` padding 6px de los escaneos. Fix: pasar a 4/8/12/16/24 (6→8, 10→8/12, 14→16, 9.6→8). Archivo: global.css.
10. [Parcial/Preguntero · ambos] Vocabulario y estilo de botones: "Ver solución completa" (gris con borde) en parciales vs "Mostrar respuesta modelo" (azul con borde, otro estilo) en Preguntero (`preg-d-light-t0.png`); el Preguntero tiene además 4 filas de chips de filtro (toda la materia / unidad / tipo / marca) que ocupan 280px en 1280 y ~440px en 390 antes de la primera pregunta. Fix: usar "Ver respuesta" y el mismo `.btn-sec`; agrupar filtros en `<details>`/una sola fila con scroll en celular. Archivos: `src/pages/preguntero/index.astro`, global.css.
11. [Preguntero · 1280/390 · ambos] Metadata interna visible: chip de 620px "cayó en P1 · 27/07/22 · tema de la foto 004, preg. 3 (1 pt); Cuestionario AM2_A 2025, n.º 10 (desarrollo)" y "Pregunta: 2026-08-28 foto 004; AM2_A 2025, p. 1". Teoría igual: "Fuente: 01-FUNCIONES DE VARIAS VARIABLES 2015 p.11" pegado al párrafo. Fix: chip corto "Cayó en P1 · 2022" con el detalle en `title`/`<details>`; "Fuente" como `.cita` en su propia línea (como ya hacen los ejercicios). Archivos: `preguntero/index.astro`, `teoria/[slug].astro`.
12. [Parcial P1 · 1280 · ambos · modo examen entregado] El botón "Salir del modo examen" termina en x=1103 y la tarjeta tiene su contenido hasta 1095 (se sale 8px del padding); hay ~48px de aire entre "Modo examen" y "Nota estimada" (`ex-d-light-4entregado.png`). Fix: `.ex-salir{margin-right:0}` / alinear en la fila del título, y tipografía de dato para la nota (`tabular-nums`, 2rem serif). Archivo: global.css `.examen-panel`.
13. [Todas · 390 · ambos · táctil] Enlaces del índice "En esta página" de machetes (x27) y teoría (x11) miden 18–19px de alto y se apilan a ~28px (sin 8px de separación); checkboxes del Preguntero (x172) 24px; "← Machetes" / "← Teoría" 18px. Fix: `padding-block:12px` (o `display:flex;min-height:44px`) en esos enlaces y `min-width/height:44px` en el área clicable (label) del checkbox. Archivo: global.css `.indice`, `.preg-*`.
14. [Parcial P1 · todos · imágenes] Los escaneos `p2.webp…p7.webp` y los `ej*.svg` no tienen `width`/`height` (6 en `p1-1h9-2025-07-rec`, 10 en `p1-1r3-2024-10-a`): salto de layout al cargar (CLS). Fix: `width`/`height` reales (1400×~1980) o `aspect-ratio`. Archivo: componente de escaneo/figura.
15. [Detalles · favicon] `favicon.svg` a 16px: el ∬ queda en trazo de ~1px, claro sobre azul, legible pero borroso (`favicon-ampliado.png`); `apple-touch-icon.png` 180px a sangre, correcto. Fix: engrosar el trazo del ∬ en el SVG (stroke ≥ 2/24) y agrandar el glifo a ~75% del cuadrado. Archivo: `public/favicon.svg`.
16. [Parciales y pasos · ambos] Rótulo repetido "PASO · ELABORADO PARA EL SITIO — NO OFICIAL" / "PISTA · ELABORADO…" en cada paso y pista (32 capas "elaborado" en `p1-1h9-2025-07-rec`), a 390 ocupa 2 líneas. Ya hay aviso global; dejar el rótulo completo en la 1ª capa y "PASO 3" / "PISTA 2" en las demás, manteniendo el color verde. Archivo: `[id].astro`.

## Lo que está bien (no romper)
Hero de Home con CTA "Empezar a practicar" a la vista en 1280 y 390, nav en 2 filas, panel de examen sticky compacto, acento único de unidades, figuras SVG con scroll propio en celular y texto legible en oscuro, escaneos con "dato personal oculto" rotulado, pistas con enlace a machete.

---

# Re-auditoría 2026-10-19 — tras 1aeadaa (estética P1) y 1e96809 (laboratorio) — 82/100

Capturas: `test-results/estetica-p1-v2/` (mismos nombres que antes más `lab-<tipo>-<d|m>-<light|dark>-tN.png`, un tipo por generador del 1º parcial con la solución abierta; `pAopen-*`/`pBopen-*` con todo desplegado). Si `test-results/` aparece vacío es porque `playwright test` lo limpia: copia de respaldo en `/private/tmp/claude-501/estetica/v2/`. Build de `dist` servido en :4411 (copia estática bajo `/AM2/`). Mediciones: `medir-estetica.mjs` x 11 páginas x 390/1280 x claro/oscuro (44 corridas) + evaluate propio (canvas, scroll de fórmulas, placeholders, imágenes, pestaña activa).

Medido OK: 0 fallas de contraste en las 44 combinaciones, 0 scroll horizontal de página en 390 (incluye laboratorio y modo examen, claro y oscuro), 0 desbordes (salvo el skip-link `a.saltar`, intencional), 0 objetivos táctiles <44px (salvo checkboxes del Preguntero), fuentes <13px solo en sub/superíndices KaTeX, favicon legible a 16px, foco visible 3px con offset 2px.

| Bloque | Antes | Ahora | Nota |
|---|---|---|---|
| Espaciado y ritmo | 15 | 15 | paddings fuera de escala siguen (M9 sin tocar) y el laboratorio suma los suyos |
| Tipografía | 11 | 12 | líneas de machetes/teoría ya en 65–75 car.; quedan "f'_x" en texto plano y solución del lab a ~95 car. |
| Color | 13 | 14 | crítico resuelto; placeholder 4,3:1 |
| Alineación | 7 | 7 | tarjeta más angosta que el índice; "Salir" se sale del padding |
| Home | 13 | 14 | CTA y progreso en el primer pantallazo; U10 huérfana |
| Celular | 7 | 8 | táctiles y avisos resueltos; fórmulas display cortadas sin pista |
| Consistencia | 8 | 8 | vocabulario del Preguntero igual |
| Detalles | 3 | 4 | favicon mejorado; imágenes sin dimensiones |

## Verificado como arreglado
- **Crítico (aviso de figura en el paso)**: ya no hay elipse verde; "← Deslizá para ver la figura completa →" es texto de una línea en la misma tinta del paso y el círculo numerado queda intacto (`pAopen-m-light-t3.png`, `pAopen-m-dark-t4.png`). Sin sobreposición con el rótulo.
- M4 (parciales listado): chips en una sola fila, "Grupo 1" y "B" normalizados, "sin fecha" en lugar de xx/xx, "1º parcial · U1–U3" con espacio.
- M5 (pestaña actual visible): la pestaña `aria-current` (563–648) cae dentro de la barra (255–1120).
- M6 ("Importante" sangrado): alineado con el borde del enunciado (x=396).
- M13 (táctil): índices y enlaces "←" ya >=44px; 0 grupos en 390 salvo checkboxes.
- M15 (favicon): trazo del ∬ más grueso, claro a 16 y 32 px (`favicon-ampliado.png`); apple-touch 180 correcto.
- Home: la tarjeta de cuenta regresiva/progreso/"seguir donde dejaste" sube al primer pantallazo con estado vacío amable.
- Laboratorio: 0 scroll horizontal, tema oscuro bien (el lienzo del gráfico toma fondo azul pizarra con curva blanca), foco, `aria-label` en el canvas, botones 44px.

## Hallazgos que quedan (ordenados por impacto)
Sin críticos nuevos ni pendientes.

1. [Laboratorio · 390 y 1280 · ambos] El generador (lo único interactivo de la página) arranca en y≈990 en 390 y y≈810 en 1280: antes hay dos listas de tipos (7 + 7 ítems, 580px en desktop) que repiten el contenido del `<select>`. En 390 el primer pantallazo es solo texto y lista (`lab-direccional-m-light-t0.png`). Fix: generador arriba (después del h1) y la lista de tipos dentro de `<details>` o eliminarla (la hace redundante el `<select>` agrupado). Archivo: `src/components/LabGeneradores.astro`.
2. [Laboratorio · gráfico del dominio · ambos] El canvas mide 322x322 en una solución de 880px (queda a la izquierda con 570px vacíos), sin números en los ejes ni rótulo de la región (solo marcas y "x, y entre −6 y 6" en el texto) (`lab-dominio-d-light-t1.png`). Además es 320x320 de resolución fija: se ve borroso con `devicePixelRatio` 2–3 (celular, y se escala 320→286 en 390). Fix: canvas `width = 320*dpr` con `style` 320px, numerar los ejes en −6/−3/3/6 y centrarlo (`margin-inline:auto`) o ponerlo junto a "Resultado". Archivo: `src/scripts/lab/ui.js` (línea ~25), `.lab-graf` en `LabGeneradores.astro`.
3. [Laboratorio · soluciones · 1280/390] El último paso ("Gráfico: …") y "Resultado" repiten la misma fórmula D_f que el paso anterior: tres veces el mismo bloque en `lab-dominio-d-light-t1.png`. Fix: quitar la fórmula del paso del gráfico o del bloque "Resultado". Archivo: `src/scripts/lab/p1-dominio.js`.
4. [Laboratorio · soluciones · ambos] Notación mezclada: en texto plano aparecen "f'_x=0", "f'_y=0", "ln √A = ½ln A", "v = (1, −1)", "G(0,0)" (guion bajo visible, `lab-extremos-m-light-t1.png`) y, a su lado, la misma notación en KaTeX. Fix: pasar a `$…$` toda la notación de las frases de los pasos. Archivos: `src/scripts/lab/p1-extremos.js`, `p1-direccional.js` (frases `txt`), `p1-dominio.js`.
5. [Machetes y Teoría · 1280 · ambos] La tarjeta verde llega a x=933 y "En esta página" a x=1119 (960 vs 770 de ancho): ~190px de hueco a la derecha y dos bordes derechos distintos en el mismo bloque (`macA-d-light-t0.png`, `teoria-d-light-t0.png`). Arreglaron el largo de línea (≈70 car.) pero no la caja. Fix: `.indice{max-width:770px}` o tarjeta al 100% con texto `max-width:68ch`. Archivo: `src/pages/machetes/[slug].astro`, `teoria/[slug].astro`.
6. [Machetes, Teoría, Lab, Parciales · 390 · ambos] Fórmulas display más anchas que su caja (246px visibles, contenido 258–415px) hacen scroll interno sin pista: "D_f = {(x,y)∈ℝ² : todas las re…" en "Fórmulas clave" (`macA-m-dark-t1.png`), "x²+y²=(…", "D_f={(x,y)∈ℝ²: x²+y²" en el lab (`lab-dominio-m-dark-t1.png`), el `f(x,y)` del enunciado cortado en "…− 36" (`lab-extremos-m-light-t1.png`) y "36−4x²−9y²>0 ⇒ 4x²+" en el paso 3. Se leen como texto cortado. Fix: reusar el degradé de borde derecho del patrón de figuras (`.katex-display{overflow-x:auto; mask-image:linear-gradient(90deg,#000 calc(100% - 24px),transparent)}`) o `font-size:.9em` en ≤480px. Archivo: `src/styles/global.css` (`.lectura`), `LabGeneradores.astro` (`.lab-tex`).
7. [Preguntero · 1280/390 · ambos] Sin cambios: botón "Mostrar respuesta modelo" (azul con borde) vs "Ver solución completa" (gris) de parciales y "Ver solución" del lab; cuatro filas de chips de filtro (280px en 1280); metadata interna en el chip de 620px ("cayó en P1 · 27/07/22 · tema de la foto 004, preg. 3 (1 pt); Cuestionario AM2_A 2025, n.º 10") y "Pregunta: 2026-08-28 foto 004; AM2_A 2025, p. 1" (`preg-d-light-t0.png`). Fix: unificar a "Ver solución" con `.btn-sec`; chip corto "Cayó en P1 · 2022" con el detalle en `title`; filtros en una fila con scroll o `<details>`. Archivo: `src/pages/preguntero/index.astro`.
8. [Home · 1280 · ambos] El mapa del 2º parcial sigue con U10 sola en la última fila y 40–60px de hueco en las tarjetas con solo 2 enlaces (U6, U7, U10, `home-d-dark-t1.png`); "Ecuaciones en derivadas parciales" llega a 4px del borde de la tarjeta de U10. Fix: 4 columnas en ≥1100px o enlaces deshabilitados "Machetes · pronto" para igualar alturas; `padding-inline:24px` o `text-wrap:balance` en el título. Archivo: `src/pages/index.astro`/`HomeMapa.astro`.
9. [Espaciado · todas · escala] Sin cambios (M9) y con el laboratorio sumado: `button[data-ia-ir]` padding 6px, `td/th` 6/10px, `li` 2px, `ul/ol` 40px, `blockquote.preg-enun` 14px, `div.ia` 9.6px, `textarea[data-ia-mia]` 10px, `h2` 14.4px en machetes/teoría, `nav.toc` 18px, `.caja` 18/14px y nuevos `.lab-ej` 18/20px (14px en celular), `.lab-enun` margin 6/14px, `ul.lab-lista` 20.4px. Fix: pasar a 4/8/12/16/24 (6→8, 10→8/12, 14→16, 18→16, 20→24, 9.6→8, 6→4 en margins). Archivos: `src/styles/global.css`, `LabGeneradores.astro`.
10. [Parcial P1 · 1280 · ambos · modo examen] "Salir del modo examen" termina en x=1103 y el contenido de la tarjeta en 1095 (se sale 8px del padding); 48px de aire entre el título y "Nota estimada" (`ex-d-light-4entregado.png`). Fix: `.ex-salir{margin-right:0}`, alinear en la fila del título y `tabular-nums` en la nota. Archivo: `src/styles/global.css` (`.examen-panel`).
11. [Parcial P1 · 1280/390 · ambos] Con "Ver enunciado original escaneado" abierto, cada ejercicio vuelve a cargar la p.1 completa (584x826 px en 1280, 286x404 en 390; 3 copias en `p1-1h9-2025-07-rec` y 6+ en `p1-1r3-2024-10-a`) y la mitad es hoja en blanco. Está plegado por defecto, así que bajó de impacto. Los `ej*.svg` siguen sin `width/height` (los `.webp` sí). Fix: recortar al ejercicio o mostrar la p.1 una sola vez; agregar `width/height` a los SVG. Archivo: `Ejercicio.astro`.
12. [Parcial P1 · 390 · ambos] El rótulo "PASO · ELABORADO PARA EL SITIO — NO OFICIAL" / "PISTA · …" se repite en cada paso y pista y a 390 ocupa 2 líneas (M16 sin tocar); además los pasos anidan tarjeta+riel+sangría y dejan ~270px de texto (30–35 car.). Fix: rótulo completo solo en la primera capa y "PASO 3" en las demás; `padding-left:12px` en el riel a ≤480px. Archivo: `src/components/Paso.astro`, `Pista.astro`, global.css.
13. [Lab/Preguntero/Parciales · ambos] Placeholder del textarea "Escribila como en el examen…" `rgb(117,117,117)` sobre `rgb(250,248,244)` = ~4,3:1 (<4,5); chips de "Ocultar todo" en gris más claro. Fix: `::placeholder{color:#6b6b6b}` (≥4,8:1) y análogo en oscuro. Archivo: global.css (`textarea[data-ia-mia]`).
14. [Preguntero · 390 · táctil] 172 checkboxes de 24x24px (`input`), sin cambios. Fix: `min-width/height:44px` en el `label` clicable. Archivo: `preguntero/index.astro`.
15. [Parciales listado y títulos · ambos · detalle] "1° Parcial Práctico" (símbolo de grado) en los títulos vs "1º parcial" (ordinal) en los encabezados de sección, y la etiqueta de comisión "todas" en minúscula (`parciales-d-light-t0.png`). Fix: usar siempre "º" y "Todas". Archivo: datos de parciales / `parciales/index.astro`.
16. [Machetes/Teoría · 1280 · ambos] "Fuente: 01-FUNCIONES DE VARIAS VARIABLES 2015 p.11" sigue pegado al párrafo como nombre de archivo (`teoria-d-light-t0.png`); la tabla "Tipo / f: ℝⁿ→ℝᵐ" parte el encabezado en 3 líneas mientras la 4.ª columna sobra. Fix: `.cita` en su propia línea con título legible; `min-width` en esa columna. Archivo: `teoria/[slug].astro`.

## Lo que está bien (no romper)
Aviso de figura ahora discreto y sin círculo, pestaña activa visible, favicon más grueso, Home con CTA y progreso en el primer pantallazo, listado de parciales ordenado, laboratorio sin scroll horizontal y con foco/tema oscuro bien resueltos, panel de examen compacto en 390.

Para llegar a ≥90: resolver 1, 5, 6, 7 y 9 (≈ +8), y 2–4 y 8 (≈ +3) lleva a ~92.

---

# Auditoría final 2026-10-19 — tras beadde0 (estética 2ª vuelta) y cb79822 (laboratorio) — 87/100

Capturas: `/private/tmp/claude-501/estetica/final/` (313 PNG; `home|parciales|pA|pB|machetes|macA|macB|teoria|teoria2|teoria3|preg-<d|m>-<light|dark>-fold|tN`, `ex-*` 4 pasos del modo examen, `lab-<dominio|direccional3|implicita>-…-tN`, `favicon-16/32/180`, `zoom-*`) y mediciones JSON en `final/m/` (`medir-estetica.mjs` x 10 páginas x 390/1280 x claro/oscuro = 40 corridas) más evaluate propio (placeholder, h1/saltos, header sticky, imágenes). Build de `dist` servido en :4399 bajo `/AM2/`.

Medido OK en las 40 corridas: 0 fallas de contraste, 0 scroll horizontal de página, 0 desbordes (salvo `a.saltar`, intencional), 0 objetivos táctiles <44px (salvo un `button[data-filtro]` de 42x44 en el Preguntero), fuentes <13px solo en sub/superíndices KaTeX, 1 h1 y 0 saltos de jerarquía por página, `title` y description en todas, placeholder 6,3–6,5:1 en ambos temas, favicon + apple-touch + theme-color claro/oscuro. Sin críticos.

| Bloque | Antes | Ahora | Nota |
|---|---|---|---|
| Espaciado y ritmo | 15 | 16 | aire bueno; siguen valores fuera de escala (ver 2) |
| Tipografía | 12 | 13 | notación del laboratorio ya en KaTeX; quedan fórmulas cortadas en 390 y "∂f/∂u = ‖∇f‖ cos φ" en texto plano |
| Color | 14 | 15 | placeholder resuelto; tema oscuro del lab y del gráfico bien |
| Alineación | 7 | 7 | la caja de machetes/teoría y "Salir" siguen sin alinear |
| Home | 14 | 14 | sin cambios: U10 huérfana |
| Celular | 8 | 9 | checkboxes eliminados, header estático de 149px (no tapa), fórmulas con fade; falta que no se corten |
| Consistencia | 8 | 9 | "Ver solución" unificado, chip de procedencia corto, filtros en una fila con scroll en 390 |
| Detalles | 4 | 4 | SVG `ej*` sin `width/height` |

## Resuelto desde la re-auditoría (no romper)
Generador del laboratorio arriba del todo y sin listas duplicadas (`lab-dominio-m-light-t0.png`: select, semilla y ejercicio en el primer pantallazo); gráfico del dominio centrado y nítido (canvas 340, `devicePixelRatio`); la fórmula de D_f ya no se repite tres veces; notación `f'_x`, `F'_y`, `G(0,0)` en KaTeX; placeholder ≥6:1; 0 checkboxes de 24px; Preguntero con "Ver solución" y chip "Cayó en P1 · 27/07/22"; `.katex-display` con degradé de borde derecho (mask-image) en 390.

## Lo que queda (ordenado por impacto)
1. [Machetes y Teoría · 1280 · ambos] Sin cambios (M5): tarjeta verde y "En esta página" llegan a x=933 y el h1 a x=1015 (macA: "Dominio de funciones de dos variables (con / gráfico)" se pasa de la caja y parte "gráfico" solo en la 2ª línea); ~190px de hueco a la derecha y tres bordes derechos distintos. En Teoría el chip "U1" va a la izquierda del h1 y en Machetes arriba (`macA-d-light-t0.png`, `teoria-d-dark-t0.png`). Fix: `max-width:770px` también al h1/cabecera o `h1{text-wrap:balance; max-width:20ch}`; chip siempre arriba del h1. Archivo: `src/styles/global.css` (`.lectura`/`.indice`), `machetes/[slug].astro`, `teoria/[slug].astro`.
2. [Espaciado · todas · escala] Sigue M9: `div.ia` 9.6px, `span.chip-u` 2/14px, `p.meta` margin-bottom 6.4px, `h1` 10.6px, `ul.tabs` padding-bottom 6px, `img` padding 6px, `.lab-enun` 6/14px, `ul.lab-lista` padding-left 20.4px, `blockquote.preg-enun` 9.6px, `ul/ol` 21.3px y 40px, `p` 6.8px. Fix: 9.6→8 o 12, 14→12/16, 6→8, 6.4→8, 10.6→12, 20.4/21.3→24, 6.8→8. Archivos: `src/styles/global.css`, `src/components/LabGeneradores.astro`.
3. [Home · 1280 · ambos] Mapa del 2º parcial: U10 sola en la 3.ª fila y alturas dispares (U6 y U7 con ~100px de aire entre lista y enlaces, `home-d-dark-t1.png`). Fix: `grid-template-columns:repeat(4,1fr)` en ≥1100px (7 unidades → 4+3) o `align-self:stretch` con los enlaces anclados abajo (`margin-top:auto`). Archivo: `src/pages/index.astro` / `HomeMapa.astro`.
4. [Machetes, Teoría, Laboratorio, Parciales · 390 · ambos] Las fórmulas display siguen más anchas que su caja (284 visibles / 338–456 de contenido): `D_f = {(x,y)∈ℝ² : todas las re…`, `(N≥0 ∧ D>0) ∨ (N≤0 ∧ D<` (`zoom-formulas-m.png`), `f(x,y)=√(−x²−y²+2x+4y−1` del enunciado y `…=(` / `…≠ 0` en pasos del lab (`lab-dominio-m-dark-t1.png`). El degradé de 24px avisa poco. Fix: `font-size:.85em` en `.katex-display` a ≤480px y degradé de 40px; en pasos del lab partir con `\\` o `aligned` las fórmulas de >1 línea. Archivos: `global.css` (`.katex-display`), `src/scripts/lab/p1-dominio.js`, `p1-extremos.js`.
5. [Parcial P1 · 1280 · modo examen] "Salir del modo examen" termina en x=1103 y el contenido de la tarjeta en 1095 (8px de más, `ex-d-light-4entregado.png`); 48px de aire entre "Modo examen" y "Nota estimada". Fix: `.examen-panel[data-fase='entregado'] .ex-salir{right:var(--s-24)}` y reducir el gap del panel a 24. Archivo: `src/styles/global.css` líneas ~322–340.
6. [Parcial P1 · 390 · ambos] Rótulo "PASO · ELABORADO PARA EL SITIO — NO OFICIAL" / "PISTA · …" repetido en cada paso (2 líneas) y columna de texto de ~30 caracteres por anidado de tarjeta+riel+sangría (también en las soluciones del lab: 22–28 car., `lab-dominio-m-dark-t1.png`). Fix: rótulo completo solo en la primera capa y "Paso 3" en el resto; `padding-inline:12px` en el riel a ≤480px y `.lab-sol ol{padding-left:20px}`. Archivos: `Paso.astro`, `Pista.astro`, `LabGeneradores.astro`.
7. [Parciales listado y títulos · ambos] Sigue "1° Parcial Práctico" (grado) frente a "1º parcial" (ordinal), también en el filtro del Preguntero ("1° parcial (U1–U3)"), y el chip de comisión "todas" en minúscula (`parciales-d-light-t0.png`). Fix: "º" y "Todas". Archivos: datos de parciales / `parciales/index.astro`, `preguntero/index.astro`.
8. [Laboratorio · dominio · ambos] El gráfico (340px) solo numera ±3 y no rotula la región (`lab-dominio-d-light-t1.png`); una de las rectas punteadas se ve cortada contra el borde. Fix: marcas en −6/−3/3/6 y leyenda "región sombreada = dominio". Archivo: `src/scripts/lab/ui.js`.
9. [Teoría · 1280 · ambos] La tabla "Tipo / f: ℝⁿ→ℝᵐ" sigue partiendo el encabezado en 3 líneas y "Fuente: 01-FUNCIONES DE VARIAS VARIABLES 2015 p.11" sigue pegada al párrafo como nombre de archivo (`teoria-d-dark-t0.png`). Fix: `th{white-space:nowrap}` en esa columna y `.cita` en su propia línea. Archivo: `teoria/[slug].astro`.
10. [Parcial P1 · ambos · detalle] `ej*.svg` (3 en `p1-1h9-2025-07-rec`) sin `width/height` (riesgo de salto de layout). Fix: agregar dimensiones. Archivo: `src/components/Ejercicio.astro`.

## Lo que está bien (no romper)
Primer pantallazo del laboratorio y del Home (CTA + cuenta regresiva + progreso en 390 y 1280), tema oscuro completo (lab, tarjetas, gráfico), Preguntero y listado de parciales ordenados, header estático y compacto en celular, foco/hover y favicon.

Para llegar a ≥90 alcanza con 1, 2, 3 y 5 (≈ +3) y 4 y 6 (≈ +2).

---

# Confirmación 2026-10-19 — tras ea73820 — 89/100

Capturas: `/private/tmp/claude-501/estetica/confirmacion/` (home, pA, machetes, macA/macB, teoria/teoria2, `ex-*`, `lab-*`); mediciones en `confirmacion/m/` (20 corridas: Home, parcial P1, machete, teoría y laboratorio x 390/1280 x claro/oscuro).

| Punto | Estado | Medido |
|---|---|---|
| 1. Machetes/Teoría 1280 | OK | h1, lectura y tarjeta terminan todos en x=930 (antes 933/1015); chip "U1" arriba del h1 en ambas |
| 2. Escala de espaciado | no re-medido (fuera del alcance 1–5) | — |
| 3. Home 1280 | OK | mapa 4+3 sin U10 huérfana; enlaces anclados abajo y alineados por fila |
| 4. Fórmulas display 390 | PARCIAL | `.katex-display` a 14.45px con degradé, pero siguen cortadas en machete (`D_f={(x,y)∈ℝ²: todas las re…` 284/388px y `A·B>0 ⇔ …` 284/385px) y en 1 fórmula del lab (286/323); los pasos del lab ya parten con aligned y caben |
| 5. Modo examen 1280 | OK | "Salir" termina en x=1095 con padding 24 de la tarjeta (1120) |

Sin regresiones: 0 fallas de contraste, 0 scroll horizontal (390 y 1280, claro y oscuro), único desborde `a.saltar` intencional. Sin críticos.

Puntaje: alineación 7→9, Home 14→15, resto igual (tipografía 13 y celular 9 por el punto 4) = **89/100**. Para 90: partir con `\\`/`aligned` las 3 fórmulas anchas citadas (machete dominio, lab dominio) o `font-size:.75em` a ≤480px.
