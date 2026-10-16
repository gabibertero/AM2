# 1° Parcial 1R7 Oct-25 (7/10/2025): resolución oficial vs recálculo (sympy)

Resultado: **sin discrepancias de resultado**. `tests/check_p1-1r7-2025-10.py` pasa.

| Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|
| 1 (p.2) | x²/4 + y²/9 ≤ 1 ∧ −x² + y² < 1 ∧ 1 ≠ xy > 0 | igual | coincide |
| 2 (p.3) | V = 60π, dV = 3,6π m³, E% = 6% | igual (ΔV real 3,67248π) | coincide |
| 3 (p.4) | z'x = −9√2, z'y = 6√2, α = π/4, ∂z/∂s = −3, ‖∇z‖ = √234 ≈ 15,3, θ = 146,31° | igual | coincide |
| 4 (p.5) | (0,0) silla (H = −144), (2,1) mín (H = 432, z''xx = 12 > 0); verifica con z''yy = 48 | igual (z(2,1) = −11) | coincide |
| 5 (p.6) | (3,2,1), V = 6 m³ | igual (λ = 2) | coincide |

## Notas
- Enunciado ej. 5: dice "V = x.y.x" (errata evidente por "x.y.z"); el profe resuelve con V = xyz. Se anotó como pendiente de revisión sin cambiar el texto.
- Ej. 2: convención de la cátedra, el espesor de base y tapa cuenta como un único 2% de h (dh = 0,2) y el lateral como 2% de cada semieje; se sigue tal cual.
- Ej. 1: la escritura del profe del dominio coincide; en el gráfico final del escaneo no se distingue la curva xy = 1 excluida.
