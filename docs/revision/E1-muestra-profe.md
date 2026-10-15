# Auditoría E1 (muestra) — 1V1-B y 2S2-A — como la cátedra

Estándar: `docs/estandar-soluciones.md`. Rúbrica por ejercicio igual que el piloto 1R3 (`1r3-profe.md`): Corrección 40, Método profe 20, Didáctica 30, Figuras 10 (Ej 4 y 5 sin figura: se normaliza sobre 90).
Revisé a mano cada paso y cada comprobación. No corrí los tests ni miré las figuras renderizadas (leí los scripts y los tamaños de los SVG). Compará con los escaneos solo vía `docs/revision/*-discrepancias.md`.

## Puntajes

| Examen | Ej1 | Ej2 | Ej3 | Ej4 | Ej5 | Promedio |
|---|---|---|---|---|---|---|
| 1V1-B (`1v1-2025-11-13-b.mdx`) | 91 | 88 | 90 | 92 | 93 | **91** |
| 2S2-A (`2s2-2025-11-07-a.mdx`) | 96 | 95 | 94 | 94 | 96 | **95** |

**Errores matemáticos: ninguno en los 10 ejercicios.** Verifiqué cada resultado intermedio y final (V=27π/2−18; IT=(3/5)(1−√2/2); IC=8/3; Bernoulli z=x³(6 ln x+C); y_p=x²/2−x+eˣ/2; V=32π; IT=512/15; IC=9 con IC1=3, IC2=6; u=x² sen y + y cos x; y_p=xe^{3x}−x−1/3). Las comprobaciones también cierran. La notación (antihorario +, u·v, A/B/D, y_h+y_p) es la de la cátedra.

## Hallazgos que bajan puntos

### 1V1-B
1. **Ej1–Ej5, bloque `<Solucion>`: falta el criterio Bien / A medias / Mal** (−3 por ejercicio). 2S2-A lo trae en los 5. Es una inconsistencia entre los dos exámenes. `1v1-2025-11-13-discrepancias.md` dice que se omitió a propósito porque la consigna no trae puntajes. Decisión pendiente de Gabi: o se agrega en 1V1 como "criterio orientativo, no oficial", o se saca de 2S2 (ver hallazgo 8).
2. **Ej3, Comprobación**: `∫₀^π(…)dt = 8/3` no muestra ninguna cuenta. Arreglo: escribir `P x'+Q y' = −2cos t sen t − 4 sen³t + 12 cos²t sen t`, primitivar cada término (0; −16/3; 8) y sumar. Hoy es un "creeme" y el test solo asierta el número.
3. **Ej3, Paso Green**: `2[x−x³/3]_{-1}^{1} = 2·4/3` esconde la evaluación en ±1. Arreglo: línea aparte (2/3 − (−2/3) = 4/3).
4. **Ej2, Comprobación**: la frase final es confusa y redundante: tras `…=3/5`, "⇒ IT = ⅓·9/5(1−√2/2)" repite el 3/5 como si recién saliera. Además el factor θ se reutiliza, así que solo es independiente en la parte (r,z). Arreglo: cerrar con "r–z da 3/5 y θ da 1−√2/2, producto = IT" y aclararlo.
5. **Ej2, Paso r**: `=9/2[…]_0^1 = 9/2(1/3−1/5) = 9/2·2/15` junta evaluar el límite y restar fracciones. Arreglo: poner `1/3−1/5 = 5/15−3/15 = 2/15` aparte.
6. **Ej1, Paso θ**: `18[−cosθ]_0^{π/2} = 18(0+1)` oculta el cambio de signo y la evaluación (−cos π/2 + cos 0). Arreglo: línea intermedia.
7. **Figuras 1v1-b/ej1–ej3**: leyendas con fontsize 10–11 (el estándar pide ≥ 12 pt). Los SVG miden 402–440 pt de ancho (no ~7,8 in = 562 pt) por el `bbox_inches="tight"`. En ej2 (elipsoide, semieje 3) no hay corte meridiano y el cubo 3D con `set_box_aspect(1,1,.9)` deforma 3:1, así que no se ve que el techo llega a z=3. Arreglo: agregar el corte r–z con z=3√(1−r²) (como en `2s2a/ej2`) y subir las leyendas a 12.
8. **`tests/check_1v1.py`**, asserts vacíos (el estándar los prohíbe): línea 94, `eq(X.subs(th,th), X)`; línea 136, `assert dsB is not None`. Además no hay `en()` del texto de la Comprobación del Ej3-B.

### 2S2-A
9. **Ej1–Ej5, `<Solucion>`, "Cómo se evalúa (la cátedra pide…)"**: la cátedra no publica criterios (lo dice la propia nota de discrepancias de 1V1: sin puntos ni Bien/A medias/Mal). Las viñetas son una estimación del sitio presentada como si fueran de la cátedra (−1). Arreglo: titularlo "Criterio orientativo (estimado, no oficial)".
10. **Ej3, Comprobación**: usa la fórmula `|a|(x₂−x₁)³/6`, que no es de la teoría de la cátedra, y solo valida el lado Green (el 2 y el área). No contrasta la suma por definición, aunque el texto dice lo contrario. Arreglo: o la derivan (`∫(−x−x²+2)dx = 9/2`, ya está en el Paso), o la comprobación es el cálculo de IC por el camino contrario, p. ej. parametrizar la parábola con t=x y verificar IC2=6 con una primitiva distinta.
11. **Ej3, evaluaciones**: `x=−2: 8−8/3−6−4 = −14/3` y `7/6+10/3 = 27/6` juntan dos operaciones (enteros más fracción; denominador común). Arreglo: una línea más cada uno.
12. **Ej4, Pista 1**: "¿Podría ser el diferencial total de alguna función u(x,y)?" ya nombra el concepto de la EDO exacta. La P1 solo debe orientar a reconocer. Arreglo: "¿qué relación hay entre lo que multiplica a dx y lo que multiplica a dy?" (sin decir "diferencial total").
13. **Ej1, Comprobación**: "bajo techo − bajo piso" sigue siendo el mismo método en polares, es independiente solo a medias. Arreglo: sumar la verificación en cilíndricas triple (`∫∫∫ r dz dr dθ`) o por capas, que el test ya calcula (`V3`).
14. **Línea "*Solución elaborada — no oficial, verificada con sympy.*"** solo está en 2S2-A (5 veces) y no en 1V1-B ni en el piloto. El estándar ya cubre el "no oficial" con los componentes. Arreglo: dejarla en todos o en ninguno.
15. **Figuras 2s2a/ej1–ej3**: leyendas 3D con fontsize 11 (< 12). El resto cumple (561,6 pt de ancho, perspectiva + corte con ejes graduados, texto 12 pt).

## Lo que está bien (no tocar)
- Escalera de pistas: P2 siempre nombra el método y linkea el machete; P3 arma el planteo sin dar el resultado, en los 10 ejercicios (única excepción: hallazgo 12).
- Pasos con Qué / Por qué / Cómo reconocerlo; justifican jacobiano, techo/piso, octante, resonancia, sentido de recorrido y dominio en Bernoulli.
- "Ojo con" en cada `<Solucion>`; `<ResolucionOficial>` separada; las comprobaciones no citan al profe.
- Ej5 de ambos (resonancia con x, sistema de coeficientes) y Ej4 de 2S2 (dos caminos de comprobación) son de nivel del piloto o mejores.

## Para llegar a ≥ 90 en todo
1V1-B ya promedia 91, pero Ej2 (88) y Ej3 (90) quedan justos. Con los hallazgos 1, 2, 4 y 7 sube a ~94. 2S2-A ya está sobre 94; con 9, 10 y 12 queda en ~96.
