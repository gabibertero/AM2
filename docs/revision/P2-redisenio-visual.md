# Revisión visual y comprensión · práctico P2

Fecha: 04/11/2026. Revisor independiente del constructor. Aplicada la guía `design:design-critique`.

## Resultado

**Aprobado visualmente. Las tres recomendaciones iniciales y el ajuste posterior de figuras móviles quedaron resueltos y revalidados.** No detecté bloqueos críticos. La revisión evalúa la versión servida localmente durante esta auditoría; no sustituye la auditoría matemática ni la revisión de código, realizadas por otros agentes.

## Evidencia

- Inspección visual de Home en 1440 px y 390 px.
- Navegador Chromium real con Playwright: parcial nuevo, machetes de volumen y EDO2, 390 × 844 px, claro y oscuro.
- Capturas propias en `/tmp/am2-review-*.png`, incluyendo recortes de viewport para leer enunciado, primer paso y receta EDO2.
- Las tres páginas muestreadas dieron `document.documentElement.scrollWidth = innerWidth = 390`; no hay desbordamiento global.
- Texto de desarrollo muestreado en móvil: unos 15–15,5 px con interlineado amplio. Los rótulos de fuente y metadatos son más pequeños y están subordinados al ejercicio.

## Primera impresión y jerarquía

La acción principal es reconocible: el parcial reciente se destaca en una tarjeta cálida sobre superficie neutra. La barra lateral tinta separa navegación y contenido. La portada habla directamente a un estudiante que empieza de cero, y el plan divide el trabajo en bloques con duración.

En celular, la navegación se transforma en cuatro accesos visibles. Se mantienen márgenes, fórmulas y botones. El modo oscuro conserva diferencias entre navegación, superficie de trabajo y tarjeta de inicio.

## Hallazgos

| Prioridad | Hallazgo concreto | Recomendación |
|---|---|---|
| Media | La portada asigna el ejercicio 5 para empezar, pero el bloque no enlaza al ejercicio y el único CTA abre el encabezado del parcial. Un principiante debe localizarlo solo. | Enlazar cada bloque práctico directamente al ejercicio o machete correspondiente. |
| Media | En el ejercicio 1, la aclaración impresa «(Integral doble o triple)» queda dentro de una única fórmula larga. En 390 px la parte derecha se recorta en el contenedor desplazable sin una señal clara. | Separar la aclaración textual de la ecuación, conservando el literal, o añadir aviso de desplazamiento local visible. |
| Baja | En la receta EDO2, «Hallá y_h con la ecuación característica» presupone una operación que aún no aprendió. El ejemplo posterior sí la desarrolla. | Enlazar ese paso con el machete de homogéneas o añadir un recordatorio breve de cómo formar la característica. |

Las tres observaciones se comunicaron al constructor. No edité implementación.

## Lo que funciona para comprender

- El enunciado oficial y las explicaciones tienen color y rótulo distintos.
- «Siguiente paso» revela una operación corta, con cálculo y motivo; los controles quedan al alcance después del paso.
- Las pistas y las soluciones empiezan cerradas, permitiendo un intento propio.
- El registro «con ayuda / repetir / solo» evita confundir leer una respuesta con resolver.
- Los machetes enlazan el tipo de problema con un ejemplo específico del parcial del curso.
- La navegación principal omite teoría y preguntero; el recorrido visible se concentra en el práctico.
- Los controles de ayuda inspeccionados tienen tamaño táctil adecuado; los enlaces de índice son más compactos, pero legibles.

## Límites de la auditoría

No se realizó certificación formal de accesibilidad ni estudio con el usuario final. La conclusión de comprensión es una evaluación heurística desde cero. Se recomienda validar la primera receta con Gabi al estudiar: si no puede reproducir el primer planteo, dividir esa operación un paso más.

## Revalidación del build final

Las tres recomendaciones originales fueron implementadas y verificadas en navegador: enlaces desde el plan al ejercicio (hoy apunta al #ej-5), aclaración textual separada de KaTeX y enlace al machete de homogéneas.

Las nuevas figuras didácticas están correctamente rotuladas, con texto alternativo y flechas útiles. La primera revalidación detectó un problema adicional en móvil al revelarlas: el estilo heredado de SVG fuerza 560 px y provoca ancho de documento 645 px en viewport 390 px. Se comunicó al constructor para contener el desplazamiento dentro de la figura o adaptar esas imágenes. Este punto queda pendiente de comprobar tras su corrección.

### Cierre de la revalidación

**Todos los hallazgos cerrados.** El build corregido contiene cada SVG en un área desplazable propia, muestra «Deslizá el dibujo para verlo completo» y conserva enlace al tamaño completo. Repetí la prueba revelando las tres figuras: volumen, cono y curva cargan correctamente; `scrollWidth` del documento permanece en 390 px, igual al viewport; `scrollX` es 0. La imagen permanece a tamaño legible y solo se desplaza dentro de su caja. Confirmé visualmente la figura de curva ya contenida.

No quedan correcciones visuales bloqueantes conocidas en el recorrido muestreado.
