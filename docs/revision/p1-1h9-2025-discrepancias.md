# 1º parcial 1H9 2025 (G1, G2, recuperatorio): resolución manuscrita (atribuida al profesor) vs recálculo

`tests/check_p1-1h9-2025.py` recalcula todo con sympy. Resultados numéricos: coinciden en los 9 ejercicios. Una discrepancia de contenido y un par de lecturas dudosas.

| Examen | Ej | Escaneo | sympy / recálculo | Estado |
|---|---|---|---|---|
| rec (p.2) | 1 dominio | `-x³ ≤ y ≤ x³ ∧ x²/9+y²/4<1 ∧ x≠0` (solo lóbulo x>0; el gráfico verde también) | `|y| ≤ |x|³ ∧ x²/9+y²/4<1 ∧ x≠0`: hay también un lóbulo x<0 (p. ej. (−1/2; 0,01) da z real y no cumple la desigualdad del profe, que para x<0 es vacía) | ⚠️ pendiente de confirmar con la cátedra. Causa probable: multiplicar por x³ sin invertir el sentido con x<0 |
| rec (p.3) | 2 | `y'(3)=−6+5 = 1`(?) | −1, coherente con tgα=−1, α=−45° que el profe escribe a continuación | lectura dudosa del signo, resultado coincide |
| g1 (p.3–4) | 2 | toma α=3π/4, "es aceptable cualquiera de los 2 α" | con 7π/4 el valor sería −3/2 | no es error; aclarado en el MDX |
| g1, g2, rec | resto | — | coincide (dominios, derivadas parciales, direccional, gradiente, módulos, ángulos, puntos críticos, hessiano, clasificación) | coincide |

Observaciones menores: en G1 ej.3 y rec ej.3 el profe decide mín/máx con z''yy (o z''xx); es equivalente cuando H>0. En G2 ej.2 y rec ej.2 usa la regla del cociente; el sitio simplifica antes, mismo resultado.
