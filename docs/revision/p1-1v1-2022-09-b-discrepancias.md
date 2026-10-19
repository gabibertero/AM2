# p1-1v1-2022-09-b (1V1 Sep-22, Grupo B) — resolución oficial vs recálculo (sympy)

Verificación: `tests/check_p1-1v1-2022-09-b.py`. Resolución: escaneo del profe, pp. 2–5.

| Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|
| 1 (p.2) | Dom = {−x<y<4−x ∧ x²+y²<16} | igual | coincide |
| 2 (p.3) | V=7π; dV=0,08π m³; E%=8/7%≈1,14% | V=7π; **dV=17π/150≈0,1133π m³≈0,356 m³; E%=34/21%≈1,62%** | **DISCREPANCIA** |
| 3 (p.4) | ∂u/∂s=24; ∇u=28i+4j−6k; ‖∇u‖=√836≈29; cosenos 28,4,−6 /√836 | igual | coincide |
| 4 (p.5) | (1/5,3/5,1); d=√35/5≈1,2 | igual | coincide |

## Ej 2 — suma de los tres aportes
El escaneo plantea bien dV = π/3·7·0,01 + π/3·15·0,01 + π/3·12·0,01, pero suma 7+15+12 = **24** (escribe π/3·24·0,01 = 8·0,01π). La suma es **34**. Resultado correcto: dV = 34π/300 = 17π/150 m³, E% = (17π/150)/(7π)·100 = 34/21 % ≈ 1,62 %. El incremento exacto (R=2,01; r=1,01; H=3,01) da ΔV≈0,3579 m³ y 1,63 %, consistente con 1,62 % y lejos de 1,14 %. Causa probable: error de suma. Pendiente de confirmar con la cátedra.
