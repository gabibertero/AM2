# Auditoría E6 — anteriores Y-T1 y Z-T1 (+ W-T1 2b) — como la cátedra

Estándar: `docs/estandar-soluciones.md`. Rúbrica igual que E1: Corrección 40, Método 20, Didáctica 30, Figuras 10 (solo el Ej1 tiene figura; Ej2 y Ej3 se normalizan sobre 90).
Rehice a mano cada cuenta (cada primitiva, cada coeficiente y cada comprobación) y miré las fotos del enunciado. No corrí los tests y no rendericé los SVG (solo conté líneas).

## Puntajes

| Examen | Ej1 | Ej2 | Ej3 | Promedio |
|---|---|---|---|---|
| anterior-y-t1 | 91 | 92 | 94 | **92** |
| anterior-z-t1 | 91 | 92 | 93 | **92** |

**Errores matemáticos: ninguno.** Verifiqué estos resultados:
- Y: V=4π; ln y−2√(x/y)=−2; y=sen x/2 + C/sen x; y_p=⅓cos3x ln|cos3x|+x sen3x.
- Z: y=x²−x−1; A=15/2 (16/3+13/6); x²/y³−1/y=3; z=x³−2x+Cx²; y_p=−3xe^{−2x}+x/2−5/4.

Las comprobaciones cierran y son independientes (cartesianas contra polares, trapecios, sustitución en la EDO).

## Lecturas de gráfico pendientes: ¿son razonables?

**Y Ej1: círculo de centro (0,2) y radio 2. Sí.**
- En la foto el círculo toca el eje x por abajo y la marca "4" está en su punto más alto.
- El diseño lo confirma: con r=4 senθ y z=1/y, el jacobiano cancela el r del denominador y la interna da exactamente 4. Es el ejercicio "polares que se simplifica" de la cátedra.
- Otras lecturas (centro en el origen, o centro en (0,4)) no calzan con la proporción del dibujo ni con una integral prolija.

**Z Ej1: región bajo las dos rectas y sobre la parábola, con vértices (−1,1), (1,3) y (2,1). Sí.**
- En la foto el sombreado cierra arriba en el cruce de las rectas, llega hasta el vértice de la parábola (bajo el eje x) y los otros cortes (3,5) y (−3,11) quedan afuera.
- El enunciado da p1=(−1,1), que es justo el corte de la parábola con y=x+2. Además (2,1) cumple ambas curvas (−2·2+5=1 y 4−2−1=1). Los datos están armados para esta región.

Arreglo (1 línea): en ambos pasos cambiar "(pendiente de revisión)" por "lectura confirmada: …" y agregar la evidencia de arriba (en Y la cancelación del r; en Z que p1 y (2,1) son esquinas). Sacar el `<Pendiente>` del Enunciado no se puede (no se toca), pero sí el rótulo del Paso.

## W-T1 2b: ¿y=−x también es solución?

**Sí, es correcto.**
- Con y=−x: y'=−1, xy'−y=−x+x=0 y √(x²−y²)=0. Cumple la EDO y y(1)=−1.
- Es la solución singular u=−1 que se pierde al dividir por √(1−u²). También existe u=+1 (y=x).
- No hay unicidad porque f(x,y)=y/x+√(1−(y/x)²) tiene ∂f/∂y no acotada en |u|=1. El teorema de existencia y unicidad de U8 no aplica en (1,−1).
- Hay incluso infinitas soluciones: sirve y=−x hasta cualquier x₀≥1 y de ahí en más −x cos(ln(x/x₀)).

**Hallazgo que baja puntos (−2).** La solución y=−x cos(ln x) solo vale en [1,e^π]. Para x<1 daría x sen(ln x)<0 igualado a una raíz ≥0, así que no es solución. A la izquierda de x=1 la única solución es y=−x. El MDX dice el dominio en un renglón, pero no que la solución no se extiende a x<1.

**Qué esperaría la cátedra.**
- Lo más probable es que el profe no pensara en la singular y espere y=−x cos(ln x), con C=−π/2.
- Una respuesta que además mencione y=−x y que se perdió u=±1 no pierde puntos, y es lo que un profe estricto valoraría.
- La frase del MDX "la respuesta esperada es la que sale de separar variables" afirma algo que no se sabe. Es una conjetura presentada como hecho.

Arreglos (1 línea cada uno):
- Cambiar "la respuesta esperada es…" por "la respuesta más probable de la cátedra es… (estimación); conviene mencionar y=−x".
- Agregar un Paso "Se perdió u=±1 (y=±x): y=−x cumple la EDO y y(1)=−1; la solución de separar variables es la que se despega de y=−x en x=1".
- Agregar en la Comprobación la sustitución de y=−x.
- Agregar al criterio "Bien" la mención de la solución singular como bonus.

## Hallazgos que bajan puntos

### Y-T1
1. **Ej1, Paso del integrando ("Ojo")**: dice "en polares el integrando queda acotado". Es falso: 1/senθ no es acotado en θ=0 y θ=π (−2). Arreglo: "1/senθ no es acotado en θ=0,π, pero la interna da 4 (constante); como z≥0 la integral impropia converge".
2. **Ej1, Comprobación**: `∫cos²t dt = π/4` sin cuenta (−1). Arreglo: línea aparte `∫cos²t = [t/2+sen2t/4]₀^{π/2} = π/4`.
3. **Ej1, Pista 1**: "distancias al origen y ángulos" ya nombra las polares. La P1 solo debe orientar a reconocer (−1). Arreglo: "¿qué forma tiene la región y qué te dice el 4 de su tamaño?".
4. **Ej2b, Comprobación**: "Despejando, con y√y/√(xy)=y/√x" junta dos operaciones (−1). Arreglo: una línea para pasar el denominador y otra para simplificar.
5. **Ej2 y Ej3, Pistas 1** (Ej2: "¿qué pasa con y/x si lo usás como nueva variable?"; Ej3: "¿…lo que copiaría una solución de prueba?"): sugieren el método de resolución, no solo el tipo de ecuación (−1). Arreglo: quitar la mención a la variable nueva y a la solución de prueba.
6. **Figura ej1**: el SVG tiene ~34 600 líneas (superficie 1/y en 3D con muchos polígonos). Pesa en el celular (−1). Arreglo: bajar la resolución de la malla o rasterizar a WebP solo el panel 3D. No pude verificar el texto ≥12 pt porque no rendericé.

### Z-T1
7. **Ej1, evaluaciones**: `1/3+1−3 = −5/3`, `−8/3−2+12 = 22/3` y `−1/3−1/2+6 = 31/6` juntan enteros con fracciones y denominador común (−2). El estándar prohíbe que un `=` esconda más de una operación. Arreglo: una línea más en cada uno (`−1/3−1/2+6 = −2/6−3/6+36/6 = 31/6`).
8. **Ej1, Comprobación**: `(8/3−2−2) − (−1/3−1/2+1) = −4/3 − 1/6` no muestra el valor de la segunda evaluación ni el denominador común (−1). Arreglo: `−1/3−1/2+1 = −2/6−3/6+6/6 = 1/6` y `−8/6−1/6 = −9/6`.
9. **Ej2, Pista 1 de b)** ("¿Y si dividís por una potencia de y?") dice el truco de Bernoulli. **Ej3, Pista 1** ("Compará la exponencial… con las de la homogénea") adelanta la resonancia (−1 cada una). Arreglo: dejar solo "¿qué término impide que sea lineal?" y "¿qué forma tiene el lado derecho?".
10. **Ej2a, "Cómo reconocerlo"**: "no hay ni una y ni una x 'sola' que se pueda separar" es confuso (−1). Arreglo: "no se separa en variables ni es lineal en y; M_y=N_x lo confirma".

### Ambos
11. La línea "*Solución elaborada — no oficial, verificada con sympy.*" está en estos MDX y no en 1V1-B. Es la misma inconsistencia de E1 (hallazgo 14). Arreglo: unificar en todo el sitio.
12. No se corrió nada de `tests/check_anterior-{y,z}-t1.py`. Hay que correrlos antes de dar por cerrado.

## Lo que está bien (no tocar)
- Los "Ojo con" son específicos y correctos (resonancia que da 0=3, signo de u'=−tan, techo que cambia en x=1).
- El criterio Bien / A medias / Mal está rotulado "estimado, no oficial". Es honesto.
- Las comprobaciones son independientes. La de Z Ej2b (sustituir z en la original) y la de Y Ej1 (cartesianas con y=4sen²t) son de nivel piloto.
- Las lecturas de gráfico ya están marcadas como lectura y no como dato.

## Para llegar a ≥ 90 en todo
Ya están en 92. Con los hallazgos 1, 7 y los dos arreglos de W-2b suben a ~95.
