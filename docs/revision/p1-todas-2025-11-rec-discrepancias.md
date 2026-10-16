# Recuperatorio 1° Parcial Nov-25 (20/11/2025): resolución oficial vs recálculo (sympy)

Resultado: **1 discrepancia de cuenta (ej 2)**, **1 observación sobre el enunciado (ej 3)** y **1 detalle gráfico (ej 1)**. `tests/check_p1-todas-2025-11-rec.py` pasa con los valores recalculados.

| Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|
| 1 (p.2) | condiciones iguales; captura GeoGebra con circunferencia discontinua | iguales; circunferencia **incluida** (≤ 9) | coincide en lo analítico; ver detalle |
| 2 (p.3) | dH = 5/2 + 125π/60 ≈ 9 m; E%(H) ≈ 14,4%; dR = 5; E%(R) = 2% | dH = **5/4** + 25π/12 ≈ 7,8 m; E%(H) ≈ 12,5%; dR = 5; E%(R) = 2% | **DISCREPA** en H |
| 3 (p.4) | f'x = −1, f'y = 1; α = 45° y 225°; ∇f = −i + j; ‖∇f‖ = √2; θ = 135° | igual | coincide (con observación) |
| 4 (p.5) | (1,2,3); S = 22 m² | igual | coincide |

## Ej 2: detalle
- Planteo oficial correcto: dH = (v0 sin²θ/g)·dv0 + (v0² sinθ cosθ/g)·dθ, con dv0 = 1/2 y dθ = π/60.
- Primer término: H'_{v0} = 50·(1/2)/10 = 5/2, y hay que multiplicarlo por dv0 = 1/2, o sea **5/4**. El escaneo escribe 5/2 (parece que no se multiplicó por dv0 = 1/2). El segundo término, 125·π/60 = 25π/12 ≈ 6,54, y todo el cálculo de R coinciden.
- Comprobación independiente: incremento exacto con v0 = 50,5 y θ = 48°: ΔH ≈ 7,92 m. El diferencial recalculado (7,79) está a 1,6%; el del escaneo (9,05) a 14%.
- El MDX muestra el valor recalculado y deja la nota ⚠️ bajo el ejercicio. Pendiente de confirmar con la cátedra.

## Ej 3: observación sobre el enunciado
- En P(4,5): 5x² − 4y² = 80 − 100 = −20 < 0, así que ln√(5x²−4y²) **no está definida en P** (raíz de un negativo). La resolución oficial deriva formalmente con f = ½ ln(5x² − 4y²), que da las mismas parciales que ½ ln|5x² − 4y²| (esta sí definida en P). Se siguió esa lectura y se anotó como "pendiente de revisión" en el MDX. No cambia ningún resultado.

## Ej 1: detalle gráfico
- El desarrollo escrito dice x² + y² ≤ 9 (borde incluido, por la raíz del numerador), pero la captura de GeoGebra pegada muestra la circunferencia **discontinua** (x² + y² < 9) y no marca los ejes excluidos (x ≠ 0, y ≠ 0). El gráfico del sitio sigue el desarrollo escrito.
