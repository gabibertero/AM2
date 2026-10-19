# Discrepancias — 1° Parcial 1H10 (B) 2024 (`p1-1h10-2024-b`)

Fuente: `1° Parcial 1H10 (B) 2024.pdf`. Resolución manuscrita atribuida al profesor. No se corrigió el original.

| Ej | Qué dice el escaneo | Qué da sympy | Causa probable |
|---|---|---|---|
| 2 (enunciado) | p. 3 resuelve $z=2\sqrt{5x^2-y^2}-3\frac yx-\ln(xy)^2$ | El enunciado impreso es $2\sqrt{x^2-y^2}+3\frac yx-\ln(x\cdot y)^2$: en $P(1,1)$ el radicando es $0$ (parciales no existen) y hacia $135^\circ$ sale del dominio | Enunciado con errata (probablemente $5x^2$ y signo del segundo término); el profe resolvió otra función |
| 2 (resultado) | $\partial z/\partial s=-2\sqrt2$, $\nabla z=5\vec i+\vec j$, $\lVert\nabla z\rVert=\sqrt{26}$, $\theta=\arctan\frac15$ | Con la función que resuelve el propio profe: $z'_x(P)=6$, $z'_y(P)=-6$, $\nabla z=6\vec i-6\vec j$, $\partial z/\partial s=-6\sqrt2$, $\lVert\nabla z\rVert=6\sqrt2$, $\theta=-45^\circ$ | El escaneo usa $\frac{3y}{x^2}-\frac{2xy}{x^2y^2}$ como si fuera $z'_y$ (es parte de $z'_x$) y no deriva respecto de $y$; $z'_x$ queda solo con $\frac{10x}{\sqrt{5x^2-y^2}}=5$ |
| 2 (lectura) | $\ln(xy)^2$ derivado como $\ln(x^2y^2)$ | Se adoptó la misma lectura | Con $(\ln xy)^2$ el término daría $0$ en $P$ |

Ej. 1, 3 y 4: coinciden con el recálculo.
