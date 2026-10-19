# 1° Parcial 1R3 (B) Oct-24 (4/10/2024): resolución oficial vs recálculo (sympy)

`tests/check_p1-1r3-2024-10.py` pasa (cubre A y B). **Sin discrepancias de resultado.**

| Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|
| 1 (p.2) | x²/9 − y²/4 < 1 ∧ \|x\| ≤ 5 ∧ x²+y² > 1 | igual | coincide |
| 2 (p.3) | V = 1000√3 cm³, dV = 60√3 ≈ 103,92 cm³, E% = 6% | igual (ΔV exacto = 61,208√3 ≈ 106,0) | coincide |
| 3 (p.4) | planteo −J(f,g/x,z)/J(f,g/y,z), seis derivadas y dos determinantes | igual; numerador = −y·Q1, denominador = −x·Q2 | coincide |
| 4 (p.5) | ∂z/∂s = 21/5, ∇z = 3i+3j, ‖∇z‖ = 3√2, θ = 45° | igual | coincide (4c no resuelto aparte) |
| 5 (p.6) | (0,1) silla (H = −4), (±1/2, 1) mín (H = 8, z''yy = 2) | igual (z = −1 y −9/8) | coincide |
| 6 (p.7) | Q(1,2), d = 2√5 ≈ 4,47 | igual (λ = 4) | coincide |

## Notas
- Ej. 4: el inciso c no tiene desarrollo aparte en el escaneo (coincide con el inventario). Se resolvió para el sitio como ∇z·s° = ‖∇z‖cos ω, ω = θ − α = −8,13°.
- Ej. 6: el profe escribe F con la raíz √((x+1)²+(y+2)²) pero deriva el radicando (equivale a minimizar d²); no cambia el resultado.
- Ej. 3: el escaneo deja el cociente sin desarrollar; la forma factorizada que figura en el MDX es del sitio.
- Consistencia A/B: ambas versiones son del mismo tipo (dominio, diferencial, implícita, direccional con inciso de propiedad del gradiente, extremos, Lagrange); la errata del ej. 2 de la versión A no aparece en la B.
