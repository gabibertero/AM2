# PLAN P1 — Migrar el 1º parcial (U1–U3) al sitio

Plan del 2026-10-15. En paralelo con el estudio del 2º parcial (31/10), sin romper nada de lo del 2º.

## Decisiones de Gabi (2026-10-15)
- Rinde solo el **parcial práctico** para promocionar la práctica. En **diciembre** rinde el **final de toda la materia** (U1–U10): la teoría de U1–U3 también hace falta.
- **Un sitio, dos instancias**: 1º parcial (U1–U3) · 2º parcial (U4–U10). Home con mapa por instancia; cada sección filtra por instancia; mismo modo examen, IA, preguntero y laboratorio.
- Entra todo: parciales oficiales resueltos, teoría + preguntero U1–U3, machetes U1–U3, laboratorio U1–U3.
- **Commit y push por etapa** (autorizado).

## Unidades (programa 2025)
- U1 Funciones de varias variables: dominio, representación, incrementos, límites y continuidad.
- U2 Derivadas y diferenciales: parciales, sucesivas, incremento y diferencial, compuestas, implícitas, direccional, gradiente, plano tangente y normal.
- U3 Máximos y mínimos: Taylor, extremos (hessiano), ligados (Lagrange).
- Estilo del 1º teórico (Gabi): gradiente (propiedades, desarrollo, gráfico), diferencial total, máximos relativos con Taylor → hessiano.

## Fuentes (`../`)
- `parciales/1er-parcial/Practicos de otros años/` — 20 PDFs (2022–2025, comisiones 1H9, 1H10, 1R3, 1R7, 1V1, 2S2, recuperatorios).
- `parciales/1er-parcial/Modelos de 1er parcial practico.pdf`.
- `parciales/1er-parcial/WhatsApp Image 2026-09-06 *.jpeg` — 21 fotos sin abrir.
- `fotos-clase/` ~001–032 — exámenes de 1º parcial impresos y resoluciones manuscritas.
- Teoría: `U1.pdf`, `U1- Diapositivas.pdf`, `U2 - *.pdf` (4), Monllor 01–03, `teoria/Resumen teorico primer parcial am2.pdf`, `teoria/AM2 Resumen primer parcial.pdf`, `teoria/Demostraciones parcial 1.pdf`, Guía Aiassa 1º parte, `Ejercicios Direccionales .pdf`, `Ejercicios Funciones Implícitas .pdf`.

## Etapas (commit + push al cerrar cada una)
- [ ] **P1-A Inventario** — `inventariador` ×2: los 20 PDFs y el modelo, y aparte las fotos de WhatsApp, las fotos de clase y las fuentes de teoría. Salida: `docs/inventario/P1-*.md`.
- [ ] **P1-B Instancias** — `web`: campo `instancia` (`p1` | `p2`, default `p2`) en las colecciones; Home con mapa por instancia; filtros en parciales, anteriores, machetes, teoría, preguntero y laboratorio; rutas sin romper URLs actuales. Audita `ecc:code-reviewer` + `tester`.
- [ ] **P1-C Parciales** — transcripción fiel (`verificador`) + resolución con el estándar aprobado (`resolvedor`, tandas de ≤3, sympy). Prioridad: 2025 → 2024 → 2023 → 2022. Audita `profe` (muestra).
- [ ] **P1-D Teoría + preguntero + machetes U1–U3** — `redactor`; audita `profe` + `verificador`; figuras `graficos`.
- [ ] **P1-E Laboratorio U1–U3** — `web`: extremos con hessiano, Lagrange, direccional y gradiente, plano tangente, derivada implícita y compuesta, dominio. Audita `profe` + `ecc:code-reviewer`.
- [ ] **P1-F Revisión** — `estetica` + `tester` (recorrido completo) + README (`readme`).

## Pendientes para Gabi
