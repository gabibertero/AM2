# Recuperatorio 20/11/2025: resolución oficial vs recálculo (sympy)

Resultado: **sin discrepancias de resultado**. `tests/check_recup-2025-11-20.py` pasa.

| Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|
| 1 (p.2) | IT = 15/8 (π/2 − 1) = 15(π−2)/16 | igual (esféricas, y comprobación por simetría + cilíndricas) | coincide |
| 2 (p.3) | IC = 2π² | 2π² (definición y función potencial) | coincide |
| 3 (p.4–6) | x³ + 2xy² = C (homogénea, Bernoulli y exacta) | igual; derivación implícita y Bernoulli y² = −x²/2 + K/x dan lo mismo | coincide |
| 4 (p.7) | yp = 2x²eˣ + 2x² + 8x + 20 | igual (sustitución y dsolve) | coincide |

Observaciones (no afectan resultados):
- Ej 2: el profe escribe "trayectoria cerrada (+)" y usa el sentido de θ creciente; el arco de cicloide no es cerrado. Se anotó como pendiente de revisión en el MDX.
- Ej 4: el profe nombra los coeficientes A, B, C, D; el sitio usa A, B, D, E (C queda para C₁, C₂).
- Ej 3 (p.4): el profe llama "grado 2" a la homogeneidad; no cambia nada.
