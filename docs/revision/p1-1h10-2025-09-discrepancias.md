# 1° Parcial 1H10 Sep-25 (27/09/2025): resolución oficial vs recálculo (sympy)

Resultado: **sin discrepancias** en los ejercicios 2–5; el **ejercicio 1 no tiene resolución oficial** (quedó sin resolver en el PDF). `tests/check_p1-1h10-2025-09.py` pasa.

| Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|
| 1 (p.1) | sin resolver | Dom: x² − y² > 1 ∧ x² + 4y² ≠ 4 ∧ y ≠ 0 | resolución elaborada (no oficial) |
| 2 (p.2) | V = 6, dV = 0,18 m³, E% = 3% | igual (ΔV real 0,181806) | coincide |
| 3 (p.3) | z'x = 4e, z'y = 3e, ∂z/∂s = e(2 + 3√3/2) ≈ 12,5, ∇z = 4e i + 3e j, ‖∇z‖ = 5e, θ ≈ 37° | igual | coincide |
| 4 (p.4) | (1,1) mín, (1,−3) silla, (−1,1) silla, (−1,−3) máx; H = 36x(y+1) | igual (z = −7, 25, −3, 29) | coincide |
| 5 (p.5) | x = 49/46 ≈ 1,0652, y = 3,1956, z = 6,3913, d ≈ 7,2246 | d = 49/√46 ≈ 7,2246 | coincide |

## Notas
- El enunciado del ej. 1 (p.1) está desenfocado; se leyó con módulos dentro del ln y del log (anotado como "pendiente de revisión" en el MDX).
- El inventario P1-A anota "(=7)" junto a la distancia del ej. 5; el escaneo dice ≈ 7,2246 (49/√46 = 7,2246), no 7. Sin consecuencia.
