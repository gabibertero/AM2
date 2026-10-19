# 1° Parcial 1R3 Grupo B (29/9/2023): resolución oficial vs recálculo (sympy)

`tests/check_p1-1r3-2023-09.py` pasa (cubre A y B). **Una discrepancia de resultado (ej. 5) y una inconsistencia del enunciado (ej. 4).**

| Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|
| 1 (p.2) | x²+y²/4<1 ∧ −1−x ≤ y ≤ 1−x | igual | coincide |
| 2 (p.3) | factoriza (y−x)(y+1) → límite −1/2; haz y=m(x−1)−1 → −1/2 | igual | coincide |
| 3 (p.4) | dV = −0,02 m³ (20 lts), E% = −1% | igual | coincide |
| 4 (p.5) | du/dx = 11 en (1,1,1) | igual | coincide (**punto no está sobre la curva**) |
| 5 (p.6) | ∂f/∂s = −11√2/2; **∇ = 6i − 9/2 j, ‖∇‖ = 15/2, θ = arctan(−3/4)** | ∇ = 6i − 5j, ‖∇‖ = √61, θ = arctan(−5/6) ≈ −39,81° | **DISCREPANCIA (∇f)** |
| 6 (p.7) | (0,1) silla, (0,−1) máx, (1,1) mín, (1,−1) silla | igual | coincide |
| 7 (p.8) | mín en (0,1), z = 0 | igual (λ = 1) | coincide |

## Ej. 5 — componente y del gradiente
- Parciales: fₓ(P) = 5 + 3 − 2 = 6 y f_y(P) = −1 − 3 − 1 = **−5**. La derivada direccional del profe usa −5 y da −11√2/2 (con −9/2 daría −21√2/4).
- En la línea del gradiente el escaneo escribe 6i − "(5 tachado) 9/2" j, y de ahí ‖∇z‖ = √(36+81/4) = 15/2 y θ = arctan(−3/4). Con f_y = −5: ‖∇f‖ = √61 ≈ 7,81 y θ = arctan(−5/6) ≈ −39,81°.
- Causa probable: arrastre de un valor de otra versión del ejercicio (la hoja trae tachones en esta parte).
- En el MDX: se publica ∇f = 6i − 5j y ⚠️ en `<ResolucionOficial>`. **Pendiente de confirmar con la cátedra.**

## Ej. 4 — datos del enunciado
- (x, y, z) = (1, 1, 1) no está sobre y = ln x, z = x²+3x−1: en x = 1 resulta y = 0 (x²/y no definida) y z = 3. La cátedra (y el profe en el escaneo) evalúa las parciales con los valores dados y y' = 1/x, z' = 2x+3 en x = 1 → 2 + (−1)(1) + 2·5 = 11. Se siguió esa lectura; se avisa en el MDX. **Pendiente de revisión.**

## Notas
- Ej. 2: la factorización exige y ≠ −1 (puntos fuera del dominio de f); el haz de rectas solo verifica.
