# 1R3 — discrepancias resolución oficial vs recálculo (sympy)

Resultado: **sin discrepancias de resultado**. `tests/check_1r3.py` confirma los 5 valores manuscritos.

| Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|
| 1 (p.2) | V = 32π/3 | 32π/3 (polares y cilíndricas) | coincide |
| 2 (p.3) | IT = 256π/15 | 256π/15 | coincide |
| 3 (p.4–5) | IC = 22/5 (C1=4, C2=2/5; Green 22/5) | 22/5 (C1=4, C2=2/5, Green 22/5) | coincide |
| 4 (p.6) | x²cos(2y) − e^{3x}/3 + 6y² = C | u_x=P y u_y=Q verificados | coincide |
| 5 (p.7) | y = C1 + C2e^{−2x} + 2e^{2x} − ½sen2x + ½cos2x | sustitución en la EDO da 0 | coincide |

Observaciones menores (no afectan resultados):
- Ej 2: el escaneo parece decir "2x²+2y²=84"; el valor correcto es 8 (→ r=2, que es lo que usa el profe). Probable trazo del "8" leído como "84".
- Ej 3: el enunciado pide en (b) "sin necesidad de obtener el resultado final"; el profe igual lo calcula (22/5).
