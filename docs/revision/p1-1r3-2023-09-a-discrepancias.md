# 1° Parcial 1R3 Grupo A (29/9/2023): resolución oficial vs recálculo (sympy)

`tests/check_p1-1r3-2023-09.py` pasa (cubre A y B). **Una discrepancia de resultado (ángulo, ej. 5) y una observación de lectura (ej. 4).**

| Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|
| 1 (p.2) | x²/4+y²>1 ∧ x²+y²/16<1 (dos piezas) | igual | coincide |
| 2 (p.3) | rectas → 0, parábolas 5a/(1+3a²) → ∄ límite | igual | coincide (no prueba la vertical) |
| 3 (p.4) | dV = 0,24π m³, E% = 6% | igual | coincide |
| 4 (p.5) | dy/dx = −2y/x → −2; dz/dx = −2z/(3x) → −2/3 | igual | coincide |
| 5 (pp.6–7) | ∂f/∂s = 2√2, ∇f = −i−3j, ‖∇f‖ = √10, **θ_máx = arctan(3)** | igual salvo θ = 251,57° | **DISCREPANCIA (θ)** |
| 6 (p.8) | (0,0) silla, (1,1) máx (H = 18x−9) | igual | coincide |
| 7 (p.9) | (1,4,9), d = 7√2 | igual | coincide |

## Ej. 5 — ángulo del gradiente
- El profe escribe θ_máx = arctan(−3/−1) = arctan(3) ≈ 71,57°. Pero el gradiente es (−1, −3): ambas componentes negativas, **3.er cuadrante**, θ = 180° + 71,57° = 251,57° (la consigna pide el ángulo "medido en el sentido antihorario" desde x⁺).
- El dibujo del profe apunta ∇z hacia abajo-izquierda (consistente con 251,57°) y marca θ_mín arriba (a 71,57°); lo que está mal es solo el valor escrito de θ_máx.
- En el MDX: se publica θ = 251,57° y ⚠️ en `<ResolucionOficial>`. **Pendiente de confirmar con la cátedra.**

## Ej. 4 — lectura de la consigna
- Es una sola ecuación con tres variables y los datos "y = f₁(x), z = f₂(x)". El profe calcula dy/dx = −F'ₓ/F'ᵧ (z fija) y dz/dx = −F'ₓ/F'_z (y fija). Se siguió esa lectura (la del formato de Rocha-Giordano, 7_Derivadas Func Implícitas.pdf, p. 3). Pendiente de revisión por si la cátedra espera otra interpretación.

## Notas
- Ej. 7: el profe escribe la función principal con raíz pero deriva como 2x−λ (equivale a usar d²); sin efecto en el resultado.
- Ej. 6: la hoja está escaneada con fondo gris; legible.
