# 1R7 — discrepancias resolución oficial vs recálculo (sympy)

Resultado: **sin discrepancias de resultado**. `tests/check_1r7.py` confirma los 5 valores manuscritos.

| Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|
| 1 (p.2) | V = 32π/3 | 32π/3 (polares, cilíndricas y rebanadas en z) | coincide |
| 2 (p.3) | IT = 16/15 | 16/15 (cilíndricas y cartesianas) | coincide |
| 3 (p.4–5) | IC = 8 (C1=4, C2=4; Green 8) | 8 (C1=4, C2=4, Green 8) | coincide |
| 4 (p.6) | e^x + x ln y + y ln x + sen y = C | u_x=P y u_y=Q verificados | coincide |
| 5 (p.7) | y = C1 + C2e^{−x} + sen x − cos x + x | sustitución en la EDO da 0 | coincide |

Observaciones menores (no afectan resultados):
- Ej 2: el escaneo escribe las condiciones como "x ≥ 1−x²" y "x ≤ 2+y²" (errata evidente: son z) y dice "1º octante" donde el enunciado dice "1º cuadrante". Con x,y ≥ 0 y z ≥ 1−x² ≥ 0 son equivalentes.
- Ej 5: el profe llama C al coeficiente de x en y_p (choca con la notación C1, C2); en el sitio se usa D. Resultado idéntico.
- Ej 4: el profe arrastra una constante C_n que luego absorbe en C.
