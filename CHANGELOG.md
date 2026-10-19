# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [3.0.0] - 2026-10-19

### Agregado
- Segunda instancia: 1º parcial (U1–U3), con los 20 parciales resueltos y verificados con sympy (pistas, pasos, comprobación, escaneos con datos personales tapados).
- Avisos de discrepancia con el profe en los ejercicios donde sympy no coincide con la resolución de cátedra.
- Machete enlazado en la pista 2 de cada ejercicio del 1º; 9 machetes nuevos (21 en total) con figuras.
- Teoría U1–U3 y preguntero U1–U3 (49 preguntas; 133 en total).
- Laboratorio del 1º con 8 generadores: dominio (con gráfico de la región), derivada direccional en 2D y 3D, diferencial, extremos, Lagrange, implícita y plano tangente.
- Home con las dos instancias y mapa de la materia por unidad.
- Tests: 76 E2E (incluido el recorrido del 1º parcial) y 78 unitarios.

### Cambiado
- El sitio funciona sin JS: parciales, pistas, pasos y teoría se leen sin script.
- Estética del 1º parcial y del laboratorio según las auditorías de `estetica` y `profe`.
- README con las dos instancias, capturas nuevas y banner actualizado.

### Corregido
- Fórmulas `$$` consecutivas que se renderizaban en línea.
- Chips largos que desbordaban en celular.
- Hallazgos de `profe` (teoría, preguntero, machetes, laboratorio), `ecc:code-reviewer` y `tester`.

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
