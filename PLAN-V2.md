# PLAN v2 — Sitio AM II · 2º parcial

Plan del 2026-10-15. Parcial en menos de 2 semanas: primero lo que más rinde para el parcial (práctica resuelta y modo examen), después lo estético.
Cada etapa = 1 sesión (o 1 ejecución programada), con un commit al cerrar su auditoría. Al final de cada etapa: tildar acá y en TASKS.md.

## Punto de partida (v1)
- 12 parciales oficiales transcriptos (+ modelo teórico) · **solo 1R3 resuelto** (piloto aprobado por Gabi el 2026-10-15 → estándar en `docs/estandar-soluciones.md`).
- 8 exámenes de años anteriores transcriptos, sin resolver.
- 12 machetes · teoría U4–U10 en borrador · rediseño visual hecho (f55a126).
- Le falta respecto de la skill / AGA: modo examen, preguntero, laboratorio, corrección con IA, Home con cuenta regresiva, progreso y "seguir donde dejaste".

## Datos nuevos de Gabi (2026-10-15)
- 1º parcial teórico: gradiente (propiedades, desarrollo, gráfico), diferencial total (definición y desarrollo), máximos relativos (Taylor en 2 variables → hessiano).
  → **Estilo de la cátedra: definición + propiedades + desarrollo + gráfico.** Las preguntas y los criterios del preguntero siguen ese estilo.
- Formato del 2º teórico (nota de `../Links e Info.md`): 2 temas a desarrollar (elegir 1) + 4 preguntas cortas + 3 de multiple choice.
- Temas que ya tomó: Green, solución general de la EDO lineal, jacobiano ("factor necesario"), derivada de un campo vectorial, divergencia (qué representa), rotacional, dominio de una función vectorial, EDO de 2º orden con raíces iguales.

## Etapas

### E1 ✅ · Contenido: resolver los parciales oficiales — PRIORIDAD 1
- 10 parciales prácticos oficiales sin resolver → **resolvedor** en 4 tandas de ≤3 (parciales repartidos, sin pisar archivos).
  - Tanda 1: 1R7, 1V1-A, 1V1-B · Tanda 2: 2S2-A, 2S2-B, recup 2025-11-20 · Tanda 3: 1H9-A, 1H9-B, recup 1H10 · Tanda 4: recup 1H9 2025-07-05.
- Cada uno: pasos con su porqué, `tests/check_<id>.py` con asserts sympy, figuras con matplotlib, criterios Bien / A medias / Mal, resolución oficial al lado.
- Si sympy no coincide con el profe: se marca y queda en "Pendientes para Gabi" (no se corrige el original).
- Auditoría: **profe** sobre 1 por tanda (≥90) + todos los `check_*.py` en verde + `npm run build`.
- Commit al cerrar cada tanda.

### E2 ✅ · Modo examen + corrección con IA — PRIORIDAD 1
- **web**: modo examen por parcial (cronómetro, solo enunciados, después autocorrección por criterios y la nota). Se reusan los componentes de la plantilla de la skill (`IA.astro`, `Pregunta.astro`), adaptados.
- Botón "Corregir con IA" (Claude · ChatGPT · Gemini) en cada ejercicio y pregunta, con el enunciado y la resolución en el prompt.
- Progreso: se mantiene `am2:v1:` (no se borra nada de lo guardado).
- Auditoría: **ecc:code-reviewer** + **tester** (desktop y 390 px, sin JS, localStorage roto).

### E3 ✅ · Teoría: preguntero con el formato real — PRIORIDAD 2
- **resolvedor/redactor**: preguntero U4–U10 en 3 modos: tema a desarrollar (con guía de qué tiene que tener: definición, propiedades, desarrollo, gráfico), pregunta corta, multiple choice.
- Fuentes: Modelo P2 teórico, temas de la nota de Links, Monllor 05–11.
- Simulacro teórico armado con el formato 2 + 4 + 3.
- Cerrar el borrador de teoría U4–U10 (T08) con el estilo de la cátedra. U6/U10 siguen como tentativos y U7 sin material.
- Auditoría: **profe** (muestra) + **verificador** (fórmulas).

### E4 ✅ · Home v2 y estética — PRIORIDAD 2
- **disenador**: Home con cuenta regresiva al parcial, mapa por unidad (U4–U10, con lo que entra en la práctica marcado), progreso global, "seguir donde dejaste", accesos al modo examen y al preguntero. Revisar el favicon y el tema claro/oscuro.
- **estetica** ≥90 (máx. 2 vueltas) · capturas del Home (desktop y 390 px, claro y oscuro) para que Gabi las vea.

### E5 ✅ · Laboratorio — PRIORIDAD 3 (si da el tiempo antes del parcial)
- **web**: generadores con semilla para EDO lineal, Bernoulli, exacta, 2º orden con coeficientes constantes (raíces distintas, iguales y complejas), Green, integrales dobles y triples con cambio de coordenadas. Pasos en notación de la cátedra.
- Lógica pura testeada con `node --test` y muchas semillas. Auditoría: **profe** (notación) + **ecc:code-reviewer** + **estetica**.

### E6 ✅ · Anteriores + revisión + publicar
- **resolvedor**: los 8 exámenes de años anteriores (2–3 tandas), si da el tiempo.
- Revisión: **ecc:code-reviewer** + **tester** (suite completa + online) + **estetica** (sitio entero).
- **readme** rehace el README (badge y sección "Hecho con Claude"), push a `main` y verificación online (todo 200).

## Orden sugerido
| Día | Etapa |
|---|---|
| 1 | E1 tandas 1–2 |
| 2 | E1 tandas 3–4 |
| 3 | E2 |
| 4 | E3 |
| 5 | E4 (Gabi mira capturas) |
| 6–7 | E5 y E6 según lo que falte |

## Reglas para ejecución sin supervisión
- Una etapa por ejecución. Si algo necesita una decisión de Gabi: se anota en "Pendientes para Gabi" y se sigue con lo que no depende de eso; nunca se inventa.
- Commit local al cerrar cada auditoría. **Push solo si Gabi lo autoriza acá:** [ ] sí, push automático.
- Si el build o los tests quedan en rojo después de 2 intentos: se para, se deja el informe y no se commitea.
- Modelos: sonnet para construir, haiku para verificar. Nada de Opus.

## Pendientes para Gabi
- ~~Fecha del parcial~~: 31/10, recuperatorio 7/11 (cargadas).
- ~~Push~~: autorizado por Gabi.
- Confirmar con la cátedra: 1H10 ej 2 (profe 64π/21, recálculo 512π/21); 1H9 B1 (errata en la parte radial); 2S2-B ej 2 (casquete superior) y ej 3 (lectura de C₁); lecturas de gráfico de W y X.
- Licencia del repo (README dice "pendiente").
- Settings de GitHub: descripción, topics y social preview (docs/readme/social.png).
