# 1° Parcial 2S2 Tema B Jun-25 (27/06/2025): resolución oficial vs recálculo (sympy)

Resultado: **sin discrepancias**. `tests/check_p1-2s2-2025-06-b.py` pasa.

| Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|
| 1 (p.2) | −x < y < 4 − x ∧ x² + y² > 16 | igual | coincide |
| 2 (p.3) | V = 1000π, dV = −10π cm³ (≈ −31,4), E% = −1% | igual (ΔV real −10,099π ≈ −31,73) | coincide |
| 3 (p.4) | ∂z/∂s = −48/√17 ≈ −11,64, ∇z = −4i + 11j, ‖∇z‖ = √137, θ ≈ 110° | igual (θ = 109,98°) | coincide |
| 4 (p.5) | (1,1) mín, (−3,−1) máx, (1,−1) y (−3,1) sillas; H = 6y(6x+6) | igual (z = −17, 19, −13, 15) | coincide |
