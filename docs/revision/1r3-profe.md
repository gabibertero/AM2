# Revisión "profe" — piloto 1R3 (14/11/2025)

Archivo auditado: `src/content/parciales/1r3-2025-11-14.mdx`. Revisé cada paso a mano, corrí `tests/check_1r3.py` (OK), y comparé contra las páginas 1–7 del escaneo y las 3 figuras (render con qlmanage; el recorte lateral de mis miniaturas es del render, el SVG mide 720×331 pt y está completo).

## Puntajes

| Ej | Corrección (40) | Método profe (20) | Didáctica (30) | Figuras (10) | Total |
|---|---|---|---|---|---|
| 1 Volumen polares | 40 | 20 | 25 | 7 | **92** |
| 2 Integral triple | 40 | 20 | 23 | 8 | **91** |
| 3 Curvilínea + Green | 40 | 20 | 26 | 9 | **95** |
| 4 EDO exacta | 40 | 20 | 24 | n/a | **93** (84/90) |
| 5 EDO 2º orden | 40 | 20 | 22 | n/a | **91** (82/90) |

Ej 4 y 5 no llevan figura: se normalizó sobre 90.

## Errores matemáticos

**Ninguno.** Verificados paso a paso (límites, jacobiano r, derivadas parciales, constantes, sentido de C1/C2, forma de y_p, sistema B/C). Todos los valores intermedios coinciden con el manuscrito del profe: 8/3 sen θ + 16/3; 8r²−2r⁴ → 128/15; C1 = 4, C2 = 2/5; Green 3y → 22/5; u = x²cos2y − e^{3x}/3 + 6y²; A=2, B=−1/2, C=1/2. Los enunciados coinciden con la p.1 del escaneo (único detalle: "Graficar!" va entre comillas, el original es subrayado/itálica; irrelevante).

## Errores / defectos menores (archivo `1r3-2025-11-14.mdx`)

1. **Ej 1, Paso "integrar en r" (l.82)**: la cuenta de evaluar `+0 − (0+0+8/3)` salta; no se explica de dónde sale el signo + en `+⅓(4−r²)^{3/2}` (el menos del integrando × el menos de la primitiva). El texto de la l.80 da `−⅓(...)` y después el corchete usa `+⅓`: el alumno ve un cambio de signo sin explicación. Corrección: agregar "como el integrando lleva un `−r√(4−r²)`, el signo se invierte: queda `+⅓(4−r²)^{3/2}`".
2. **Ej 1, Paso 2 (l.66)**: se afirma que D es todo el círculo r ≤ 2 sin justificar que la esfera no recorta la base. Corrección: una línea: "la esfera tiene radio 2, igual al cilindro: en r=2 el piso vale 0, no hay recorte adicional".
3. **Ej 2, Paso 3 (l.154)**: no se justifica `√(x²+y²)=r` (vale porque r ≥ 0). Corrección: agregarlo.
4. **Ej 2, Comprobación (l.185)**: es solo un orden de magnitud y su razonamiento ("más ancho cerca del centro, donde r es chico") es vago y no prueba nada (cualquier valor entre 0 y 100,5 pasaría). Corrección: comprobación real, p. ej. hacer r y z en otro orden, o el cociente exacto 16/15 como "r medio ponderado" y decir que está entre 0 y 2.
5. **Ej 5, notación (Pista 3, l.367; Pasos l.381–403)**: el coeficiente `C` de y_p choca con las constantes `C1, C2` y con la `C` de la general. Corrección: usar `A, B, D` (o `K`).
6. **Ej 5, Paso "reemplazar" (l.394–396)**: salta de y_p'' y y_p' directo a la suma agrupada. El alumno que no domina no ve cómo se junta. Corrección: mostrar `y_p''` y `2y_p'` sumados término a término y marcar que el lado derecho no tiene seno (coeficiente 0).
7. **Ej 5, Paso "igualar coeficientes" (l.403)**: resuelve el sistema sin mostrar cómo (sumar ecuaciones: −8C=−4, o 8B=−4 como el profe). Corrección: una línea.
8. **Ej 5, Paso "proponer y_p" (l.379)**: debería decir explícitamente "2 y ±2i no son raíces de la característica (0 y −2), por eso no multiplicamos por x"; hoy lo dice con "no aparecen en y_h", correcto pero menos transferible a los casos con resonancia.
9. **Ej 4, Paso "integrar P" (l.314)**: no explica que `∫e^{3x}dx = e^{3x}/3` (factor 1/3 de la regla de la cadena inversa); es el error típico del alumno. Y el Paso 2 dice "si no se cumple, este método no sirve" sin decir qué hacer (factor integrante / otro método).
10. **Ej 4, Pista 1 (l.283)**: puntuación rota ("...exacta: Machete: ..."). Además "x e y mezcladas" no ayuda a reconocer la forma.
11. **Ej 3, Paso 2 (l.233)**: falta explicar por qué x de 1 a −1 (sentido antihorario sobre el arco superior); está en la Pista 3 pero el Paso no lo retoma. Un alumno que saltea pistas lo pierde.
12. **Comprobaciones (todas)**: terminan con "Coincide con la resolución oficial". Mezcla verificación propia con lo oficial; la comparación con el profe debería vivir solo en `<ResolucionOficial>`. Ej 1 y 3 comprueban por otro método (bien); Ej 4 y 5 solo re-derivan.
13. **`tests/check_1r3.py`**: solo verifica con `en_mdx` el resultado final; los valores intermedios del MDX (8/3 sen θ+16/3, 128/15, 53,6, 33,5, B y C, 16π/3) no están asertados, y en Ej 5 el último assert (`is not None`) es vacío. Si alguien edita un paso intermedio, el test no lo detecta.

## Figuras

- **ej1.svg**: correcta (z=y+4 arriba, semicircunferencia abajo, paredes y=±2, círculo r≤2). Útil pero es solo un corte 2D: el profe dibuja la perspectiva y el alumno no ve el sólido "cilindro con un hueco semiesférico". La leyenda del panel izquierdo tapa parte de la recta roja (arriba). Falta marcar que el hueco es la semiesfera que se resta.
- **ej2.svg**: correcta (parábolas, cruce en r=±2, z=1, círculo r≤2). El eje "r" con valores negativos es raro (explicado en el rótulo, bien). La etiqueta "r = 2, z = 1" queda pegada al borde. Útil.
- **ej3.svg**: la mejor: región D sombreada, flechas de sentido, puntos (±1,1), leyenda con intervalos de x. Coincide con el croquis del profe.
- Todos: texto chico al escalar a ancho de celular (720 pt de ancho nativo). Conviene fuente ≥ 12 pt y figuras de ~560 pt de ancho.

## Separación oficial / elaborado

Bien resuelta: `<Enunciado>` (capa "oficial — tal cual") textualmente fiel al escaneo, y `<ResolucionOficial>` aparte con archivo y página. Lo elaborado (Pista/Paso/Solucion/Comprobacion) no toca los enunciados. Único cabo suelto: punto 12 (comprobaciones que citan al profe).

## Fidelidad al método del profe

Total: polares y sustitución t=4−r² (ej1), cilíndricas con r² y límites r²−3…5−r² (ej2), parametrización con x y signos de límites 1→−1 (ej3, igual al profe), Green con 3y y región x²≤y≤√(2−x²) (ej3b), integración de P y φ(y) (ej4), y_h, y_p con A, B, C (ej5). El profe no verifica la hipótesis de Green ni la resonancia; el piloto lo hace explícito: es una mejora, no una desviación. La resolución del profe tiene una errata ("2x²+2y²=84", debe ser 8), bien registrada en `1r3-discrepancias.md`.

## Mejoras del ESTÁNDAR para los otros ~50 ejercicios

1. **Una escalera de pistas estricta**: P1 = solo cómo reconocer el tipo (sin nombrar el método ni el machete), P2 = método + qué plantear, P3 = el planteo casi hecho (límites/forma de y_p). Hoy la P1 ya nombra el método y linkea el machete. El machete debería aparecer recién en P2.
2. **Cada paso con tres cosas fijas**: Qué / Por qué / "Cómo lo reconozco la próxima", y sin saltos algebraicos: toda evaluación en límites, cambio de signo, suma de ecuaciones y agrupación de términos se escribe en una línea intermedia. Regla: ningún `=` debe esconder más de una operación.
3. **Comprobación independiente y no oficial**: cada ejercicio cierra con un chequeo por otro camino (otro orden de integración, Green vs definición, derivar la solución, sustituir en la EDO) o una cota; nunca "coincide con la oficial". Ese cruce vive solo en `<ResolucionOficial>`.
4. **Tests con intermedios**: `check_*.py` debe asertar cada valor intermedio que aparece en el MDX (no solo el resultado final) y no usar asserts vacíos.
5. **Figuras**: siempre una vista que muestre el sólido/región completo (perspectiva simple para volúmenes, además del corte), rotular qué se resta, fuente ≥ 12 pt, leyenda fuera del área dibujada, y ancho adaptado a celular.
6. **Notación sin choques**: no reutilizar C para coeficientes y constantes; fijar convención (A,B,D para coeficientes; C1,C2 para constantes).
7. **Advertir el error típico** de cada tipo (p. ej. factor 1/3 de e^{3x}, olvidar el jacobiano r, orientación de la curva) en una línea "Ojo con".
