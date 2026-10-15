# 1H9 (27/06/2026), Temas A y B: resolución oficial vs recálculo (sympy)

Resultado: **todos los resultados finales coinciden**. `tests/check_1h9.py` pasa. Una discrepancia en un intermedio (B1) y erratas menores.

| Tema | Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|---|
| A | 1 (p.2) | IT = 0 | 0 (parte radial 256/5, ∫cosθ = 0; otro orden y simetría) | coincide (errata menor) |
| A | 2 (p.3) | IC1 = 8/3, IC2 = 8/3, IC = 16/3 | igual; Green 2·Área = 2·8/3 | coincide |
| A | 3 (p.4) | ln(y) + 2y/x = C | derivada implícita recupera la EDO | coincide |
| A | 4 (p.5) | y = C1e^x + C2xe^x + ½x²e^x − x − 2 | A=½, B=−1, D=−2; sustitución y dsolve | coincide |
| B | 1 (p.2) | IT = 0 | 0 (parte radial 9/4, ∫sinθ = 0) | resultado coincide; **intermedio discrepa** |
| B | 2 (p.3–4) | IC1 = 20/3, IC2 = −4/3, IC = 16/3 | igual; Green 2·Área = 16/3 | coincide |
| B | 3 (p.5) | y = (−2e^{−x³} + C)e^{x³} | = −2 + Ce^{x³}; sustitución y separables | coincide |
| B | 4 (p.6) | y = C1e^x + C2xe^x − ½x²e^x + x + 1 | A=−½, B=1, D=1; sustitución y dsolve | coincide |

## Detalle
- **B1 (p.2), discrepancia de intermedio.** El profe escribe (lectura del manuscrito) el paréntesis radial como "3·3√3 − 3·3√3 = 0" y deduce IT = 0. Con r³(3−r²) = 3r³ − r⁵, la primitiva 3r⁴/4 − r⁶/6 evaluada en √3 da 27/4 − 9/2 = **9/4 ≠ 0**. El resultado final 0 es correcto pero por ∫₀^{2π} sinθ dθ = 0. Causa probable: errata al evaluar la primitiva. Pendiente de confirmar con la cátedra. En el MDX figura en la nota bajo la resolución oficial.
- **A1 (p.2), errata menor.** Tras evaluar la parte radial escribe "(256 − 1024/5)" y luego "256 |sen θ|"; el valor correcto del paréntesis es 256/5. El resultado final (0) no cambia.
- **A3 / B3:** el profe no escribe valor absoluto en el logaritmo y no menciona y = 0 (A3: solución perdida al dividir por u). Sin impacto en la respuesta pedida.
- **A4 / B4:** el profe llama C al término independiente de y_p; el sitio usa D (estándar: A, B, D).
- **A2 / B2:** las curvas son las mismas; el rotor Q_x − P_y = 2 en ambos temas, por eso IC = 16/3 en A y B.
- B2 (p.3 y p.4): el escaneo de la p.4 es el gráfico y el cálculo de intersecciones; el cálculo de integrales está en la p.3.
