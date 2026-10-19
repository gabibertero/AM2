# p1-1h9-2023-05 — discrepancias resolución oficial vs recálculo (sympy)

Resultado: **sin discrepancias de resultado**. `tests/check_p1-1h9-2023-05.py` confirma los valores manuscritos.

| Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|
| 1 (p.2) | 1 < x²+y² < 9 | 1 < x²+y² < 9 | coincide |
| 2 (p.3) | dV = 0,02π m³; E% = 3% | 0,02π m³; 3% | coincide en valor; errata de unidades (ver abajo) |
| 3 (p.4) | ∂z/∂s = −11√3/2; ∇z = −11 j; ‖∇z‖ = 11; θ = −π/2 | idem (θ = 270° ≡ −90°) | coincide |
| 4 (p.5) | (0,0) silla; (−1,1) mín | idem | coincide |

Observaciones (no afectan resultados):
- Ej 2: el escaneo cierra "dVol = 0,02π m ≡ 2π cm". Unidades mal: 0,02π es un volumen (m³) y 0,02π m³ = 20 000π cm³, no 2π. Probable lapsus de unidades; el E% = 3% no depende de eso.
- Ej 3: el enunciado pide el ángulo "medido en el sentido antihorario"; el profe da −π/2. Es el mismo sentido (270°), solo otra forma de expresarlo.
