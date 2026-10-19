# Discrepancias — 1° Parcial 2S2 Jun-24, Tema B (`p1-2s2-2024-06-b`)

Fuente: `1° Parcial 2S2 Jun-24.pdf`. Resolución manuscrita a lápiz atribuida al profesor. No se corrigió el original.

| Ej | Qué dice el escaneo | Qué da sympy | Causa probable |
|---|---|---|---|
| 2 | $E\%\simeq-0{,}28\%$ | $-\frac27\%=-0{,}2857\%\approx-0{,}29\%$ | Truncado en lugar de redondeado (el valor exacto $-\frac27\%$ coincide) |
| 3 | No desarrolla el inciso c (verificar con la propiedad del gradiente) | $\cos\varphi=\frac8{17}$, $17\cdot\frac8{17}=8$ | Omisión; el sitio lo resuelve aparte |
| 4 | $H(x,y)=-36xy$ (y evalúa con $-36$) | $H=4x\cdot(-8y)=-32xy$ | Errata de cuenta; los signos de $H$ y la clasificación no cambian |
| 4 bis | Agrega $z=\frac23x^3-18x+\frac43y^3-16y$ (no figura en el enunciado) y afirma "desarrollo y resultados idénticos al original" | Mismos puntos críticos, pero $H=32xy$: mínimo $(3,2)$, máximo $(-3,-2)$, sillas $(3,-2)$ y $(-3,2)$ (clasificación distinta) | "Idéntico" probablemente refiere al procedimiento |

Ej. 1 y 5: coinciden con el recálculo.
