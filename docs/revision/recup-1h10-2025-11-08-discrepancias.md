# Recuperatorio 1H10 (8/11/2025): resolución oficial vs recálculo (sympy)

Resultado: **1 discrepancia (ej 2)**. `tests/check_recup-1h10.py` pasa con el valor recalculado.

| Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|
| 1 (p.2) | V = 9π | 9π (polares, rebanadas, fórmula del cono) | coincide |
| 2 (p.3) | IT = 64π/21 | **512π/21** (cilíndricas, otro orden de integración y suma numérica 2D: 76,595) | **DISCREPA** |
| 3 (p.4–5) | IC1 = 5/6, IC2 = 1/6, IC = 1; Green = 1 | igual; también por descomposición del campo | coincide |
| 4 (p.6) | x³/3 + xy² − sen x − cos y = C | igual (u_x = P, u_y = Q) | coincide |
| 5 (p.7) | y = C1 eˣ + C2 x eˣ + x² eˣ | igual (sustitución, dsolve y variación de parámetros) | coincide |

## Ej 2: detalle
- Planteo oficial correcto: ∫dθ ∫ r² dr ∫_{r²}^{4} z dz.
- Al integrar en z queda r²(16/2 − r⁴/2) = 8r² − r⁶/2. El escaneo escribe ½∫(8r² − r⁶) dr; debería ser ½∫(16r² − r⁶) dr.
- Con ese factor perdido da ½(64/3 − 128/7) = 32/21 en lugar de ½(128/3 − 128/7) = 256/21. Entonces 2π·32/21 = 64π/21 (oficial) vs 2π·256/21 = 512π/21 (correcto).
- Causa probable: error de cuenta al sacar el factor ½ (16 → 8). Pendiente de confirmar con la cátedra. El MDX muestra el valor correcto y deja la nota ⚠️ debajo de la resolución oficial.
