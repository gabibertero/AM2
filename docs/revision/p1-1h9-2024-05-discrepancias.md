# 1° Parcial 1H9 May-24 (11/05/2024): resolución oficial vs recálculo (sympy)

`tests/check_p1-1h9-2024-05.py` pasa. **Una discrepancia (ángulo del gradiente, ej. 3).**

| Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|
| 1 (pp.2–3) | cociente ≥ 0 en dos casos; gráfico consolidado con a, 2a, 3a | igual (cortes elipse–hipérbola en (±3a/√5; ±4a/√5)) | coincide |
| 2 (p.4) | V = 160π, dV = 25,6π cm³ | igual (ΔV exacto = 26,984π) | coincide |
| 3 (p.5) | ∂z/∂s = −3/2 − √3/4, ∇z = −√3 i + (√3/2) j, ‖∇z‖ = √15/2, θ = 5π/6 (150°) | θ = π − arctan(1/2) ≈ 153,43° | **DISCREPANCIA (solo θ)** |
| 4 (p.6) | plano 2x+4y+z = 21, (7/2, 7/4, 7), V = 343/8 ≈ 42,8 | igual (V = 42,875) | coincide (≈ 42,8 truncado) |

## Ej. 3 — ángulo del gradiente
- El profe escribe θ = arctan((√3/2)/(−√3)) = arctan(−1/2) y concluye θ = 5π/6 (150°).
- tan(150°) = −√3/3 ≈ −0,577 ≠ −1/2. El ángulo correcto es 180° − 26,565° = 153,435° (2.º cuadrante, ya que z'x < 0 y z'y > 0).
- Efecto: las direcciones de mínimo (333,43°) y nulos (63,43° y 243,43°) también corren 3,43° respecto de lo que se deduce de 150°. El módulo y la direccional no cambian.
- En el MDX: se publica 153,43° y ⚠️ en `<ResolucionOficial>`. **Pendiente de confirmar con la cátedra.**

## Notas
- Ej. 1: el enunciado dice "a: numero real" (se transcribió tal cual). El profe asume a ≠ 0; el caso a = 0 (dominio |y| > 2|x|) se agregó en el sitio.
- Ej. 2: se toman 8 cm y 10 cm como medidas del hueco interior y los espesores como incrementos (lectura del profe); dh = 0,1 + 0,5 (tapa + fondo).
- Ej. 4: el profe escribe F = F.ppal + λ·F.condic (otras veces la cátedra usa −λ); mismo resultado.
