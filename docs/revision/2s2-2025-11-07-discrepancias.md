# 2S2 (07/11/2025), Temas A y B: resolución oficial vs recálculo (sympy)

Resultado: **sin discrepancias de resultado** en los 10 ejercicios. `tests/check_2s2a.py` y `tests/check_2s2b.py` pasan.

| Tema | Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|---|
| A | 1 (p.2) | V = 32π | 32π (polares, cilíndricas y bajo-techo − bajo-piso) | coincide |
| A | 2 (p.3) | IT = 512/15 | 512/15 (cilíndricas, cartesianas y orden r-primero) | coincide |
| A | 3 (p.4–5) | IC = 9 (Green 9; IC1=3, IC2=6) | 9 (IC1=3, IC2=6, Green 9) | coincide |
| A | 4 (p.6) | x² sen y + y cos x = C | u_x=P y u_y=Q verificados | coincide |
| A | 5 (p.7) | y = C1e^{3x}+C2e^{-2x}+xe^{3x}−x−1/3 | sustitución y dsolve | coincide |
| B | 1 (p.2) | V = 28/15 | 28/15 (dos órdenes y triple) | coincide |
| B | 2 (p.3) | IT = 17π/12 | 17π/12 (z-r y r-z) | coincide |
| B | 3 (p.4–5) | IC = −32/3 (I1=−64/3, I2=32/3; Green −32/3) | igual | coincide |
| B | 4 (p.6) | y³ = x³(−3/x + C) | sustitución en la original | coincide |
| B | 5 (p.7) | y = C1+C2e^{2x}+xe^{2x}−x | sustitución y dsolve | coincide |

Observaciones (no afectan resultados):
- A3 y B3: el profe presenta primero Green (p.4) y después la definición (p.5), al revés que el enunciado de A (a: definición, b: Green). El sitio sigue el orden del enunciado.
- A3 (p.4): el profe llama "Dxy" a la región y escribe la raíz $x_1=1$, $x_2=-2$; en la definición usa los mismos límites que el sitio ($C_1$ de 1 a −2).
- A2 (p.3): el profe agrega en el dibujo "√8" como corte del paraboloide con el eje; es solo referencia, la intersección relevante es r = 2.
- B1 (p.2): el profe escribe "(2+y−1)" y simplifica a (y+1), igual que el sitio.
- B2 (p.3): **lectura del enunciado.** "x²+y²+z² ≥ 4" admite también z ≤ −√(4−r²), que no está acotada por abajo; el profe (y el sitio) toman el casquete superior de la esfera como piso. Marcado como pendiente de revisión en el MDX.
- B3: duda menor del enunciado entre "=" y "−x²" en C1; se leyó y = −x² + 4, y el profe (p.5) resuelve con esa lectura (C1: y = −x²+4, dy = −2x dx).
- B4 (p.6): errata sin consecuencia en el manuscrito: tacha una línea intermedia con "y²" de más; la solución final es la misma.
- No se consultó la página de teoría de la cátedra para citar notación (no se hizo en esta pasada): la notación usada es la del estándar (u·v, A/B/D, antihorario +, rot = ∇×F).
