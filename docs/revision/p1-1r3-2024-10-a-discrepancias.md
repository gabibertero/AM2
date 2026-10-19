# 1° Parcial 1R3 (A) Oct-24 (4/10/2024): resolución oficial vs recálculo (sympy)

`tests/check_p1-1r3-2024-10.py` pasa (cubre A y B). **Una discrepancia de resultado (ej. 2) y una errata de transcripción (ej. 3).**

| Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|
| 1 (p.2) | x²+y²<4 ∧ −1−x ≤ y ≤ 1−x ∧ x²+y²/4>1 | igual | coincide |
| 2 (p.3) | dV = 0,34 m³, E% = 3,4% | dV = −0,2 m³, E% = −2% | **DISCREPANCIA** |
| 3 (p.4) | planteo −J(f,g/y,x)/J(f,g/y,z) sin simplificar | igual (denominador = 2yz(9xy²−8xyz²+3z⁴)) | coincide (errata g'y abajo) |
| 4 (p.5) | ∂z/∂s = −13√2/2, ∇z = 8i+21j, ‖∇z‖ = √505, θ ≈ 69,15° | igual | coincide (4c no resuelto aparte) |
| 5 (p.6) | (0,0) silla (H = −9), (3/2, 9/4) mín (H = 9, z''yy = 2) | igual (z = 53/16 en el mín) | coincide |
| 6 (p.7) | (1/3, 1, 4/3), V = 4/9 | igual (λ = 4/3) | coincide |

## Ej. 2 — resultado distinto
- Enunciado: los lados de la base aumentan 2% c/u y la altura **disminuye 30 cm**.
- El profe plantea correctamente dA = 0,04 m, dB = 0,06 m, dH = −0,3 m y las derivadas 5, 10/3, 2.
- En la cuenta escribe el tercer sumando como "2·3·3/100" (es decir usa dH = −0,03 m = 3 cm) y obtiene (60 + 60 − 18)/300 = 102/300 = 0,34, E% = 3,4%.
- Con dH = −0,3 m: 0,2 + 0,2 − 0,6 = **−0,2 m³** y E% = **−2%** (ΔV exacto = −0,2202 m³; diferencial logarítmico 0,02 + 0,02 − 0,06 = −0,02).
- Además el escaneo anota "dV = 0,34 m (+)": falta el cubo de la unidad.
- En el MDX: se publica el recálculo (−0,2 m³) como solución elaborada y ⚠️ en `<ResolucionOficial>`. **Pendiente de confirmar con la cátedra.** No se tocó el original.

## Ej. 3 — errata de copia
- Determinante del denominador: el profe escribe g'y = −2xy + 3z² (abajo) y −4xy + 3z² (arriba). La derivada correcta es −4xy + 3z² (g = 2x − 2xy² + 3yz²). Sin efecto sobre el planteo (el parcial dice que lo importante es plantear y derivar).

## Notas
- Ej. 4: el inciso c no está resuelto en el escaneo (confirma el inventario). Se resolvió para el sitio como ∇z·s° = ‖∇z‖cos ω con ω = θ − α = 114,15°.
- Ej. 5: el profe copia la función como "… − 5" (enunciado: "+ 5"); no interviene en las derivadas.
