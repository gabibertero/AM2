# Auditoría independiente de matemática y fidelidad · práctico P2

Fecha: 04/11/2026. Revisor distinto del autor de las soluciones y los machetes.

## Alcance

- Inspección visual directa de la foto del parcial 1H10, Tema A, 31/10/2026 aportada por Gabi.
- Comparación con `src/content/parciales/1h10-2026-10-31-a.mdx`: cinco consignas, ecuaciones y condiciones impresas.
- Revisión de las doce guías P2 de `src/content/machetes/`: volumen; triple; curvilínea; Green; separables; homogénea EDO1; lineal; Bernoulli; exacta; homogénea EDO2; coeficientes indeterminados; variación de parámetros.
- Revisión del tratamiento de métodos, constantes y dominios, con foco en alguien que empieza desde cero.

## Resultados matemáticos

| Ejercicio | Resultado verificado | Comprobación independiente |
|---|---|---|
| 1 · volumen | 125π/2 | Discos horizontales: área 5πz, integrada entre 0 y 5 |
| 2 · triple | 16π/3 | Integración esférica del cono superior, además de los dos órdenes cilíndricos del test |
| 3 · curvilínea | +9 antihoraria; −9 horaria | Recta: 3; parábola de regreso: 6; Green: 2 por el área 9/2 |
| 4 · EDO1 | y=(1+x²)[ln(1+x²)+C] | Factor integrante 1/(1+x²), sustitución en la ecuación original: residuo cero |
| 5 · EDO2 | y=(C₁+C₂x+x²)eˣ+1 | Sustitución con constantes arbitrarias; particular produce 2eˣ+1 |

El cono del ejercicio 2 está correctamente interpretado como el cuerpo acotado cerrado por la hoja superior y la tapa z=2. La hoja inferior con esa tapa no encierra un segundo sólido acotado.

La foto no indica orientación en el ejercicio 3. La transcripción conserva esa ausencia; la solución declara la elección antihoraria y explica el cambio de signo. No se presenta la orientación elegida como parte del enunciado oficial.

La EDO1 está desarrollada por y=u·v, con regla del producto, separación para v e integración para u. No se limita a aplicar una fórmula final. La EDO2 desarrolla la raíz doble y la particular resonante con x²eˣ, conservando ambas constantes de la solución general.

En las guías se comprobaron además el potencial de la exacta, el cambio de Bernoulli y sus restricciones reales, la solución y=0 perdida por división en la homogénea de junio, los tres casos de raíces de EDO2 y el ejemplo de variación de parámetros. No se encontraron errores de matemática.

## Fidelidad y privacidad

- Se contrastaron los cinco enunciados con la foto. Las expresiones impresas coinciden; la anotación manuscrita «lineal» no se incorporó al enunciado.
- Se detectó «adjuntando» donde la foto imprime «adjuntado» en las indicaciones inferiores. El literal ya fue corregido y se verificó en el MDX.
- Se deja explícito que el Tema B y la resolución del profesor no fueron recibidos. Las soluciones nuevas se distinguen como elaboradas para estudiar.
- El MDX no contiene `ResolucionOficial` ni un enlace a escaneo público nuevo. La foto fuente queda fuera del repositorio público. No se transcriben nombres, legajos ni firmas.

## Claridad para principiantes

Los pasos definen qué son y', parametrizar, piso/techo, jacobiano, homogénea/particular y resonancia en el momento de usarlos. Las guías diferencian una solución seguida con ayuda de una reconstruida sin mirar y proponen controles de planteo antes del cálculo.

Se sugirió añadir un dibujo propio de la región recta/parábola con flechas para acompañar «Dibujá qué queda a cada lado»; también serían útiles cortes meridianos de los cuerpos de los ejercicios 1 y 2. Es una mejora didáctica, no una falla de los cálculos. Se informó al agente principal para su integración visual.

Se detectó «declarará tu elección» en el machete de curvilínea: ya está corregido a «declará tu elección».

## Verificación ejecutada

- `python3 tests/check_1h10_2026.py`: aprobado.
- Cálculos SymPy independientes adicionales: volumen por discos, triple en esféricas, ambos tramos orientados, residual EDO1, particular EDO2 y ejemplos de exacta/Bernoulli/variación: aprobados.

**Dictamen:** aprobado en matemática y fidelidad. Sin errores críticos o altos detectados. El diseño y su comportamiento real en navegador corresponden a la revisión visual separada.
