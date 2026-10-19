# 1° Parcial 2S2 (7/7/2023): resolución oficial vs recálculo (sympy)

`tests/check_p1-2s2-2023-07.py` pasa. **Una discrepancia de resultado (ej. 5), una de método (ej. 3), una resolución incompleta (ej. 4) y una errata de copia (ej. 1).**

| Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|
| 1 (p.2) | x²/4+y²/9 ≤ 1 ∧ x²+y² > 1 (el conjunto final dice y²/**3**) | igual con y²/9 | coincide (errata de copia) |
| 2 (p.3) | dV = 1,08 cm³ (3%), dD = 0,07 cm (1%) | igual | coincide |
| 3 (p.4) | ∂f/∂s = −3√2/4 (por fórmula), ∇f = i − j/2, ‖∇f‖ = √5/2, θ = arctan(−1/2) | igual | coincide en resultados; **método distinto al pedido** |
| 4 (p.5) | PC (3/2,0), (3/2,−2); H = 0 → "Incertidumbre" | igual; incremento: ninguno es extremo | coincide hasta H = 0; el escaneo no clasifica |
| 5 (p.6) | **x = y = z = 6√2, V = 432√2 cm³** | x = y = z = 6, V = 216 cm³ | **DISCREPANCIA** |

## Ej. 5 — falta el factor 2 de la superficie
- El profe plantea correctamente 2(xy+yz+xz) = 216 y x = y = z, pero al reemplazar escribe x·x + x·x + x·x = 216 (pierde el 2): 3x² = 216, x² = 72, x = 6√2, V = 432√2.
- Con el 2: 6x² = 216, x = 6, V = 216 cm³. Control: un cubo de lado 6 tiene superficie 6·36 = 216 cm² (el de lado 6√2 tiene 432 cm²).
- En el MDX: se publica el recálculo y ⚠️ en `<ResolucionOficial>`. **Pendiente de confirmar con la cátedra.**

## Ej. 3 — método
- La consigna dice "usando la definición". El escaneo usa ∂f/∂s = fₓ cos α + f_y sin α. Mismo resultado. En el MDX el inciso (a) se resuelve por definición (límite con ln(1+at)/t → a) y la fórmula queda como comprobación.

## Ej. 4 — resolución incompleta
- Con H = 0 en ambos puntos el escaneo termina en "Incertidumbre". La clasificación (no son extremos: el incremento cambia de signo; además z'ₓ = (2x−3)² ≥ 0 hace a z estrictamente creciente en x) es elaborada para el sitio y está marcada así en el MDX.

## Ej. 1 — errata
- El conjunto final del escaneo escribe y²/3 en lugar de y²/9; el dibujo marca el vértice (0, 3) y las cuentas usan 9.
