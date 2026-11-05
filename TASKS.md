# TASKS — una por sesión; al terminar: marcar [x], anotar en Notas y recomendar /clear

- [x] T01 Base: Astro + MDX + KaTeX, esquema de exámenes, componentes Ejercicio/Pista/Paso, progreso localStorage, layout y navegación, Inicio, README, workflow de Pages, test de progreso. Contenido: solo un examen de prueba (1R3) con enunciado transcripto.
- [x] T02 Recortes de enunciados (p1) con datos personales tapados + revisión de privacidad de cada página escaneada que se publique.
- [x] T03 Transcripción de los 11 exámenes a MDX desde docs/inventario (verificador contra imagen).
- [ ] T04 Piloto: 1R3 resuelto completo (pistas, pasos, comprobación, gráficos, resolución oficial) → aprobación de Gabi.
- [ ] T05 Resto de exámenes resueltos.
- [x] T06 Machetes por tipo de problema.
- [x] T07 Delimitar y transcribir impresos "Tema 1/2/3" de fotos-clase.
- [ ] T08 Teoría U4–U10 (antes: pedir a Gabi cómo fue el 1º parcial).
- [ ] T09 Revisión final: code-reviewer, E2E desktop/celular, README de publicación.
- [x] V2 — etapas E1–E6 en `PLAN-V2.md` (reemplaza T05, T08 y T09). Hecha el 2026-10-15.

- [x] P2-2026 — Rediseño práctico desde cero + parcial 31/10/2026 + machetes cortos + organización local. Plan aprobado el 04/11/2026.

- [x] LAB-GUIADO — Parciales P2 con controles intermedios, ayudas, intentos y comprobación local. Plan aprobado el 04/11/2026.

## Notas
- T01 (2026-10-14): Astro 7.3.8 + MDX + KaTeX 0.19 (markdown.processor unified por Astro 7). Progreso: am2:v1:estado:<id> y am2:v1:vista:<id>. check-ids corre en build. 8 tests Playwright OK. Code review aplicado (88d914e). Falta: crear repo GitHub AM2 y push; Pages → Source: GitHub Actions.
- T02: 75 escaneos webp (6,8 MB) con datos tapados; auditoría privacidad 75/75 sin datos visibles (docs/revision/privacidad-escaneos.md).
- T03: 12 exámenes, 56 ejercicios; verificador 11/12 OK, el 12º (z² en 1v1-a#2) corregido.
- T04: piloto 1R3 resuelto, auditado por profe (91–95) y mejorado; estándar en docs/estandar-soluciones.md. ESPERA aprobación de Gabi antes de T05.
- T06: 12 machetes, auditoría profe 89,5 + correcciones.
- T07: lectura hecha (docs/inventario/E-fotos-parciales-viejos.md): 4 exámenes × Tema 1/2, sin fecha; falta integrarlos con fotos tapadas.
- T07: 8 exámenes de años anteriores (24 ej.) integrados en /anteriores/, verificados 0 errores; fotos sin datos personales.
- T08: BORRADOR teoría U4–U10 (U6/U10 tentativos, U7 sin material). No cerrar hasta que Gabi cuente cómo fue el 1º parcial. Monllor 11 p.11: ejemplos de armónicas incorrectos (anotado).
- Privacidad: limpiar_fondo en 8 páginas con reverso transparentado.
- V2 (2026-10-15): 11 parciales + 8 anteriores resueltos (17 checks sympy), modo examen + IA, preguntero 84 preguntas (profe 96) + simulacro 2+4+3, teoría U4–U10 con 9 figuras (profe 93), laboratorio 7 generadores (profe 89, formato corregido), Home con cuenta regresiva 31/10 y recup 7/11. Estética 70→83→85 + vuelta 3 (crítico resuelto; sin re-auditar). Fix global: fórmulas $$ de un renglón salían en línea. Pendiente cátedra: 1H10 ej2 (profe 64π/21 vs 512π/21), 1H9 B1, 2S2-B ej2/ej3, lecturas de gráfico W/X.

- P2-2026 (2026-11-04): rediseño tinta/mandarina centrado en práctico, plan diario con enlaces directos, 12 parciales P2 en orden cronológico, nuevo 1H10 A del31/10 con5 soluciones y3 figuras propias, 12 machetes cortos desde cero, autonomía y notas locales sin borrar progreso previo. Carpeta:14 movimientos con SHA256 y manifiesto reversible. Auditorías independientes matemática, ECC código, visual y privacidad aprobadas; corregidas persistencia de nota sin estado, anclas de reintento y overflow de figuras. Build82páginas, 79 unitarias,5 verificaciones simbólicas del nuevo examen,7 pruebas P2 y checks generales de82páginas. Foto íntegra solo local; no se agregó teoría. Servidor local en http://localhost:4321/AM2/. No se hizo commit ni publicación.

- LAB-GUIADO (2026-11-05): 12 parciales P2, 55 ejercicios y 322 pasos comprobables. Laboratorio con pistas e intentos guardados. Ayuda paso a paso y entrega de resultados al pie de cada parcial. Llaves escaladas a los renglones. Build de 83 páginas, 96 pruebas unitarias y 41 pruebas en navegador aprobadas.
