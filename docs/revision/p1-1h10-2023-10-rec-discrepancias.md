# p1-1h10-2023-10-rec — discrepancias resolución oficial vs recálculo (sympy)

| Ej | Escaneo (profe) | sympy | Estado |
|---|---|---|---|
| 1 (p.2) | x²/4+y² > 1 ∧ xy > 0 ∧ x²+y²/4 < 1 | x²/4+y² ≠ 1 ∧ xy > 0 ∧ x²+y²/4 < 1 | **discrepancia** (módulo) |
| 2 (p.3) | dV = 0,18π m³; E% = 3% | idem | coincide |
| 3 (p.4) | z'x = 8/3; z'y = −21/4; ∂z/∂s = 95√2/24; θ = arctan(−63/32) | idem | coincide; errata en el módulo |
| 4 (p.5) | (2,1) mín; (−2,−1) máx; (1,2) y (−1,−2) sillas | idem | coincide |

Detalle:
- Ej 1: el enunciado trae ln|x²/4 + y² − 1| (módulo legible en el original). El profe lo resuelve como si no hubiera módulo (exige el argumento > 0, "Ext. a elipse") y por eso grafica solo la parte de afuera de la elipse x²/4+y²=1. Con el módulo solo hay que excluir la curva (argumento ≠ 0): el dominio también incluye la parte de adentro (dentro de x²+y²/4 < 1, en el 1.º y 3.º cuadrante). Pendiente de confirmar con la cátedra si el módulo era un descuido del enunciado.
- Ej 3: el módulo se escribe √(64/9 + 4?2/16): el numerador se lee 442 o 441; el correcto es (21/4)² = 441/16 (‖∇z‖ = √4993/12 ≈ 5,89). Además, el enunciado pide el gráfico con máximo, mínimo y nulos y la hoja del profe no lo trae.
