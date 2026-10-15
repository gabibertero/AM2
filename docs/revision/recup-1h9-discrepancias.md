# Recuperatorio 1H9 — discrepancias resolución oficial vs recálculo (sympy)

Resultado: **sin discrepancias de resultado**. `tests/check_recup-1h9.py` confirma los 3 valores manuscritos.

| Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|
| 1 (p.2) | V = 2π | 2π (polares, cilíndricas, rebanadas) | coincide |
| 2 (p.3) | IC1 = 70/3, IC2 = −70/3, IC = 0 | igual; Green ∬(2x+1)dA = 0 | coincide |
| 3 (p.4) | y⁴ = (½e^{8x} + C)e^{−8x} | ≡ y⁴ = ½ + Ce^{−8x}; sustitución en la EDO da 0 | coincide |

Observaciones menores:
- Ej 2: el profe aclara que IC = 0 aunque el campo no es conservativo (Q_x − P_y = 2x+1 ≠ 0). Correcto.
- Ej 2: el enunciado dice "funciones lineales" pero una es parábola (ya anotado en el MDX).
- Ej 3: el profe usa "factor 4y³" para multiplicar, equivalente a multiplicar por y³ y luego por 4.
