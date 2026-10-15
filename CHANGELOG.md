# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [2.0.0] - 2026-10-15

### Agregado
- Los 11 parciales oficiales resueltos: pistas, pasos, comprobación, criterio estimado y resolución oficial escaneada con datos tapados. Cada uno verificado con un script de sympy.
- 8 exámenes de años anteriores resueltos y verificados.
- Modo examen con cronómetro, pausa y autocalificación (Bien / A medias / Mal).
- Corrección con IA: prompt listo para Claude, ChatGPT o Gemini.
- Preguntero teórico U4–U10 (84 preguntas), simulacro de 2 temas + 4 cortas + 3 de opción múltiple.
- Teoría U4–U10 con figuras, en el estilo de la cátedra.
- Laboratorio con 7 generadores con semilla (EDO de 1º y 2º orden, exacta, Bernoulli, Green, polares).
- Home con cuenta regresiva al 2º parcial (31/10), progreso y "seguir donde dejaste".
- Tests: 38 E2E con Playwright y 41 unitarios con `node --test`.
- Plantillas de issues, `CONTRIBUTING.md` y este changelog.

### Cambiado
- Rediseño visual: paleta, tipografía, íconos, tema claro/oscuro y nav en celular.
- README rehecho.

### Corregido
- Una sola versión de KaTeX (fórmulas rotas en todo el sitio).
- Hallazgos de las auditorías de `profe`, `estetica` y `ecc:code-reviewer`.

## [1.0.0] - 2026-10-14

### Agregado
- Base del sitio con Astro, MDX y KaTeX; progreso local por ejercicio.
- 12 exámenes transcriptos (11 parciales + modelo teórico) con escaneos con datos tapados.
- Piloto resuelto del parcial 1R3 y estándar de soluciones.
- 8 exámenes de años anteriores, 12 machetes y borrador de teoría U4–U10.
- Deploy en GitHub Pages con Actions.
