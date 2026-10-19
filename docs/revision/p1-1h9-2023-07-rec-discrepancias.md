# p1-1h9-2023-07-rec — discrepancias resolución oficial vs recálculo (sympy)

Nota de archivo: "1° Parcial 1H9 Jul-23.pdf" es en realidad un **Recuperatorio** (08/07/2023).

| Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|
| 1 (p.2) | x²/9 − y²/4 ≤ 1 ∧ x²+y² > 4 (copia 36 − 4x² + 9y²) | idem con esa lectura | coincide con la lectura de la oficial; **signo del enunciado ilegible → pendiente** |
| 2 (p.3) | dV = 2,16 cm³ (6%); dD = 0,14 cm (2%) | idem | coincide |
| 3 (p.4) | −3√2/4; ∇z = ½ i − j; √5/2; θ = arctan(−2) | idem | coincide en valores; **no usa la definición** (el enunciado la exige) |
| 4 (p.5) | 7 puntos críticos | **9** puntos críticos | **discrepancia** |
| 5 (p.6) | (2,3,6); d = 7 | idem | coincide |

Detalle:
- Ej 1: el cuarto signo del enunciado impreso está tachado/sobrescrito en el escaneo de p.1. No se reconstruyó. La resolución oficial lee "+9y²". Pendiente de confirmar con la cátedra.
- Ej 3: el inciso a pide "usando la definición"; el profe aplica la fórmula z'x·cosα + z'y·senα. El resultado es el mismo (verificado también por el límite en el test).
- Ej 4: el enunciado dice "los 5 puntos críticos"; la función z = x⁴+y⁴−x²−y²−1 tiene 9 (x, y ∈ {0, ±√2/2}). El profe lista 7: omite (√2/2, √2/2) y (−√2/2, −√2/2), ambos mínimos (H = 16). Clasificación de los 7 listados: correcta. Causa probable: salteó dos combinaciones de signos al armar los pares.
- Ej 5: el profe escribe F = √(x²+y²+z²) − λ(…) pero deriva como si fuera x²+y²+z² (F'x = 2x − 2λ). Mismo punto y misma distancia.
