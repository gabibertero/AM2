# 1V1 (13/11/2025, temas A y B) — resolución oficial vs recálculo (sympy)

`tests/check_1v1.py` (verde) recalcula todo. **Sin discrepancias de resultado** en los 10 ejercicios.

| Tema | Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|---|
| A | 1 (p.2) | V = 4(π − 4/3) | 4π − 16/3 | coincide |
| A | 2 (p.3) | IT = 2√2/15 | 2√2/15 | coincide |
| A | 3 (p.4–5) | IC = −4 (C1 = −2, C2 = −2); Green sin terminar | −4 por definición y por Green polar | coincide (el profe corta Green en la p.5) |
| A | 4 (p.6) | x sen y − y cos x + y³ − y = C | u_x=P, u_y=Q | coincide |
| A | 5 (p.7) | y = C1 sen x + C2 cos x + (x/2) sen x − (x/2) cos x | sustitución en la EDO = 0 | coincide |
| B | 1 (p.2) | V = 18(3π/4 − 1) = 27π/2 − 18 | igual | coincide |
| B | 2 (p.3) | IT = −3/5 (√2/2 − 1) | 3/5 (1 − √2/2) | coincide |
| B | 3 (p.4–5) | IC = 8/3 (C1 = 8/3, C2 = 0; Green 8/3) | igual | coincide |
| B | 4 (p.6) | y^{3/2} = [ln(x⁶) + C] x³ | z = x³(6 ln x + C), verificado en la EDO | coincide |
| B | 5 (p.7) | y = C1 + C2 e^{−x} + (x/2 − 1)x + ½ e^x | sustitución en la EDO = 0 | coincide |

## Observaciones (no afectan resultados)
- **A ej3, IC1**: el profe usa x como parámetro con y = +√(2−x²) y x de 1 a −1, pero el arco antihorario de A(1,−1) a B(−1,1) pasa por (√2, 0) (incluye un tramo con y < 0). Funciona porque sobre la circunferencia P dx + Q dy = (4x − 2x³ + 3x²) dx depende solo de x; el sitio lo explica y lo comprueba con la parametrización por θ (da −2).
- **A ej3, Green**: la consigna pide solo plantear; el profe lo deja sin terminar (p.5, "= …"). El sitio lo resuelve: −4, igual que por definición.
- **A ej5 / B ej5 (notación)**: el profe usa C para un coeficiente de y_p (B ej5) y nombra C1, C2 en otro orden (A ej5); el sitio usa A, B, D para coeficientes (convención de la cátedra en este sitio).
- **B ej4**: el profe escribe ln(x⁶) = 6 ln x, y la forma implícita; el sitio agrega el dominio x > 0 (por ln x) y y > 0 (por √y).
- **A ej2 (enunciado)**: trazo manuscrito sobre la z² del impreso; la lectura 4x²+4y²+z²=4 está confirmada por la resolución del profe (z = 2√(1−r²)).
- **A ej4**: al enunciado le falta "dy"; el profe lo agrega (p.6).
- Consigna de corrección: "todos los ejercicios resueltos, o al menos 2 con planteo y desarrollo consistente"; no trae puntajes ni criterio explícito para gráficos, por eso el sitio no incluye puntos ni Bien/A medias/Mal.
