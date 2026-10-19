# p1-2s2-2022-07 (2S2 Jul-22) — resolución oficial vs recálculo (sympy)

Verificación: `tests/check_p1-2s2-2022-07.py`. Resolución: escaneo del profe, pp. 2–8. Recálculo hecho con el enunciado **literal**.

| Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|
| 1 (p.2) | usa √(9−x²**+**y²) → hipérbola; Dom = {x²+y²>1 ∧ x²/9−y²/9<1} | enunciado: √(9−x²−y²) → corona 1<x²+y²<9 | **DISCREPANCIA** (enunciado vs resolución) |
| 2 (pp.3–4) | V=2π/3; dV=π/10; E%=15 % | igual | coincide |
| 2 (cont.) | Sup=√5·π; dS con factor 2π√5/5 en el último término; dSup y E%(Sup) = "…" | **S=π(1+√5)≈10,17 m²; dS=π(1+√5)/10≈1,02 m²; E%=10 %** | **DISCREPANCIA + inconcluso** |
| 3 (p.5) | ∂z/∂x=∂z/∂y=1/5 | igual; **pero M(1;1;1) no cumple la ecuación** (izq. 4, der. 0) | coincide; errata del enunciado no advertida |
| 4 (p.6) | −11√3/2; ∇z=−11j; ‖∇z‖=11; θ=−π/2 | igual | coincide |
| 5 (p.7) | (0,0) silla; (−1,1) mín, z=−1/6 | igual | coincide |
| 6 (p.8) | llega a x=21, y=21/2, z=63/2; distancia "…" | **x=6, y=3, z=9; d=3√14≈11,22** | **DISCREPANCIA + inconcluso** |

## Ej 1
Enunciado impreso: √(9−x²−y²). Resolución manuscrita: 9−x²+y² (hipérbola). No se corrige el original; el sitio resuelve el enunciado literal y muestra la corona. Pendiente de confirmar con la cátedra cuál es la errata.

## Ej 2, parte de superficie
- Sup = π·1² + π·1·√5 = π(1+√5); el escaneo escribe "√5·π".
- S'_r = 2π+π√5+π/√5, S'_h = 2π/√5 (coinciden con el planteo del escaneo). dS = S'_r·0,05 + S'_h·0,1 = 0,1π + 0,1π√5. En el último renglón el escaneo deja 2π√5/5·(5/100), pero ese aporte lleva 0,1=10/100 (debería ser 4π√5/5·5/100).
- Comprobación independiente: S es homogénea de grado 2 en (r,h), por lo que con 5 % en ambos el error relativo de primer orden es 2·5 % = 10 % (y V, de grado 3, da 15 %, como el escaneo).

## Ej 3
M(1;1;1): x²+y²+2/z² = 4 ≠ 0 = ln(xyz). El punto no pertenece a la superficie definida por la ecuación. Las derivadas −F'_x/F'_z, −F'_y/F'_z evaluadas en M dan 1/5 (igual que el escaneo). Pendiente de confirmar con la cátedra.

## Ej 6
El escaneo llega a "14/2·x = 42" (=7x=42) y escribe x=21; el valor correcto es x=6. El punto (21, 21/2, 63/2) ni siquiera está en el plano (2·21+21/2+3·63/2 = 147 ≠ 42). Distancia correcta: 42/√14 = 3√14.
