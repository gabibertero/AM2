# SPEC — Sitio de estudio AM II · 2º parcial

## Contexto
- Sitio personal de Gabi (UTN FRC, Ing. en Sistemas) para el 2º parcial de Análisis Matemático II. Lo usan Gabi y algunos amigos.
- Proyecto nuevo: no reutiliza ni modifica AGA, Legislación ni Física 2.
- Prioridad: 75 % práctica, 25 % teoría. Probablemente se rinda la parte práctica.
- Alcance: programa 2025, **U4 a U10 inclusive** (lo confirmó Gabi). Fourier (U11) queda fuera.
  - Los parciales prácticos reales solo tocan U4, U5, U8 y U9.
  - U6 y U10 se cubren con Monllor y se marcan "alcance tentativo — no apareció en parciales prácticos".
  - U7 (Computación numérica) no tiene material: va como "pendiente, sin material".
- Formato teórico según `../Links e Info.md` (nota de un compañero): 2 temas para elegir uno y desarrollar, 4 preguntas cortas y 3 de opción múltiple.
- PENDIENTE: Gabi tiene que contar cómo le tomaron el 1º parcial (formato, consignas, proporción teoría/práctica, criterios, tiempo). Hay que pedírselo antes de cerrar la teoría y cualquier sección de formato o evaluación.

## Fuentes (inventario completo en `docs/inventario/`)
Base: `../` (carpeta de la materia). Nunca modificar el material original.

| Fuente | Qué es | Uso |
|---|---|---|
| `parciales/2do-parcial/2° Parciales/*.pdf` (11) | Escaneos que subió el profe. p1 = enunciado impreso; p2+ = **resolución manuscrita del profe (oficial, según Gabi)** | Fuente oficial principal: una pestaña por examen |
| `parciales/2do-parcial/Modelo P2 teorico.pdf` | Modelo teórico oficial: 6 preguntas con respuesta | Teoría / formato teórico |
| `fotos-clase/` ~052–066 | Impresos "Segundo parcial práctico – Tema 1/2/3", sin fecha | Sección "Otros parciales de años anteriores" (delimitar primero) |
| `parciales/2do-parcial/2° Parciales.zip` | Duplicado exacto de la carpeta (SHA1 iguales) | No usar |
| `parciales/2do-parcial/Recuperatorio P2*.pdf` | **Resumen de alumno**, no examen. v2 ⊃ v1 | Apoyo teórico, no oficial |
| `teoria/Apuntes Ing. Monllor/05–11` | Bibliografía principal del programa. Única fuente completa de U6 y U10 | Teoría |
| `teoria/Teorico-practico Rocha-Giordano/11–15`, `practica/Guia practica (Ing. Aiassa)/` (2º y 3º parte), Venturini | Guías con resultados | Apoyo, convenciones |

Convenciones de la cátedra (de las fuentes; confirmar en cada uso):
- sentido positivo = antihorario;
- jacobiano en valor absoluto;
- rot = ∇×F por determinante;
- solución general = y_h + y_p;
- la EDO lineal se resuelve con y = u·v;
- en los enunciados aparece "Graficar!".

## Reglas de fidelidad (no negociables)
- Enunciados oficiales **tal cual** aparecen: redacción, símbolos, numeración, orden y errores (con [sic] solo en nota aparte). Se conserva cada versión (A/B).
- Lo ilegible se marca `pendiente de revisión` y se le pregunta a Gabi. Nunca se reconstruye por intuición.
- Cada ejercicio oficial lleva archivo de origen + página + número de ejercicio.
- Visualmente hay tres capas separadas:
  - **Oficial**: enunciado, escaneo, resolución del profe.
  - **Elaborado para el sitio**: pistas, pasos, machete, explicación.
  - **Simulacro generado — no oficial**: solo si Gabi lo pide.
- Cuando el recálculo (sympy) no coincide con la resolución del profe: se marca y se pregunta. No se corrige el original.
- Privacidad: el repo es público. Las imágenes de escaneos se publican **con el nombre del alumno, la firma y el legajo tapados**. Hay que revisar cada página publicada.

## Arquitectura
- **Astro** (salida estática) → GitHub Pages con la acción oficial. Base sugerida: `/AM2/`.
- Matemática con `remark-math` + `rehype-katex`, renderizada al construir.
- Exámenes como content collection: un `.mdx` por examen.
  - Frontmatter con esquema zod: id, comisión, fecha, tipo, tema, archivo fuente, páginas.
  - Componentes: `<Ejercicio id fuente pagina tema unidad machete>` con `<Enunciado>`, `<Pista>`, `<Paso>`, `<Solucion>`, `<Comprobacion>`, `<ResolucionOficial paginas>`.
- Teoría y machetes en `.mdx` por unidad o tipo de problema.
- Interacción con `<script>` vanilla en los componentes (sin framework UI): revelar pista o paso de a uno, estado pendiente / en curso / resuelto, filtros por tema.
- Progreso en `localStorage`, con prefijo `am2:v1:` y clave = id fijo de ejercicio (`<comision>-<fecha>#<n>`). Siempre con try/catch. Nunca se borra al actualizar. Botón "Reiniciar progreso" con confirmación en la propia página (no `confirm()`).
- Gráficos en SVG generados con matplotlib; el script queda en `figuras/src/`.
- Navegación: Inicio · Parciales oficiales · Teoría por unidad · Machetes · Simulacros generados (vacía hasta que se pida).
- Sin PWA, sin backend, sin cuentas.

## Verificación
- `npm run build` sin errores. El esquema falla si falta la fuente, la página o hay ids duplicados.
- Test de progreso: guardar estado → rebuild → el estado sigue.
- Recálculo de resultados con sympy (`tests/check_*.py`).
- E2E con Playwright en desktop y celular.
- Revisión con `ecc:code-reviewer` al cerrar cada etapa.
