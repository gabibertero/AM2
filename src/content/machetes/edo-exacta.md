---
slug: edo-exacta
titulo: "EDO exacta (y factor integrante)"
unidad: U8
orden: 9
ejerciciosOficiales: ["1r3-2025-11-14#4", "1r7-2025-11-11#4", "1v1-2025-11-13-a#4", "2s2-2025-11-07-a#4", "recup-1h10-2025-11-08#4", "recup-2025-11-20#3"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/08-ECUACIONES DIFERENCIALES 2015.pdf, p. 10-13"
  - "teoria/AM2 Resumen segundo parcial.pdf, p. 25-26"
  - "teoria/Apuntes Ing. Monllor/06-INTEGRALES CURVILINEAS 2015.pdf, p. 10-20 (función potencial)"
---

## Cómo reconocerlo
- Enunciado tipo "verificar si la EDO es exacta, y en ese caso resolverla": $P(x,y)\,dx+Q(x,y)\,dy=0$.
- Mezcla de términos en $x$ e $y$ (productos como $2x\cos 2y$, $y\sin x$, $\ln y+\dfrac yx$).
- A veces falta escribir el $dy$ en el original: se lee igual como $P\,dx+Q\,dy=0$.

## Qué necesitás antes
- $P,Q$ continuas y con derivadas parciales continuas.
- **Condición de exactitud:** $\dfrac{\partial P}{\partial y}=\dfrac{\partial Q}{\partial x}$.
- El enunciado puede pedir "desarrollo analítico como visto en clase, sin fórmula directa": desarrollá los pasos.

## Pasos
0. Si viene como $y'=-A/B$, pasar a $A\,dx+B\,dy=0$.
1. Identificar $P$ (lo que multiplica a $dx$) y $Q$ (lo que multiplica a $dy$).
2. **Verificar** $P_y=Q_x$ y escribirlo. Si no se cumple, **no es exacta**: ver factor integrante abajo.
3. Buscar $u(x,y)$ con $u_x=P$ y $u_y=Q$.
4. Integrar $P$ en $x$: $u=\int P\,dx+\varphi(y)$.
5. Derivar respecto de $y$ e igualar a $Q$: $\varphi'(y)=Q-\dfrac{\partial}{\partial y}\!\int P\,dx$.
6. Integrar $\varphi'$ para hallar $\varphi(y)$ (sin constante).
7. Solución general (implícita): $u(x,y)=C$.
8. Alternativa equivalente: empezar por $Q$ e integrar en $y$.

## Fórmulas clave
$$P\,dx+Q\,dy=0\ \text{ exacta }\Leftrightarrow\ \frac{\partial P}{\partial y}=\frac{\partial Q}{\partial x},\qquad u(x,y)=C,\ \ du=P\,dx+Q\,dy$$
- $u$: función potencial (la misma de campos conservativos, U5).
- $\varphi(y)$: "constante" de integración que puede depender de $y$.
- $C$: constante que indexa la familia de curvas solución.

**Factor integrante** (no figura en las fuentes relevadas): si $P_y\ne Q_x$, buscar $\mu$ tal que $\mu P\,dx+\mu Q\,dy=0$ sea exacta.
- Si $\dfrac{P_y-Q_x}{Q}$ depende solo de $x$: $\mu(x)=e^{\int\frac{P_y-Q_x}{Q}dx}$.
- Si $\dfrac{Q_x-P_y}{P}$ depende solo de $y$: $\mu(y)=e^{\int\frac{Q_x-P_y}{P}dy}$.

## Por qué funciona
$P\,dx+Q\,dy$ es el diferencial total $du=u_x\,dx+u_y\,dy$ exactamente cuando $u_{xy}=u_{yx}$, o sea $P_y=Q_x$. Entonces $du=0$ implica $u=$ constante. Es el mismo argumento que para la función potencial de un campo conservativo.

## Errores frecuentes
- Comparar mal: $P_y$ es la derivada de **$P$** respecto de $y$ (no de $Q$).
- Olvidar $\varphi(y)$ y poner solo la constante.
- Después de derivar $u$ respecto de $y$, no igualar a $Q$ (sino a $P$).
- Dejar términos con $x$ en $\varphi'(y)$: si queda $x$, hubo un error (o no es exacta).
- Escribir la solución sin la $=C$.
- Cometer errores en $\int \sin$ y $\int\cos$ con argumentos $2y$ (hay factores $\tfrac12$).

## Cómo comprobar el resultado
- Calculá $u_x$ y $u_y$: tienen que dar $P$ y $Q$.
- Derivá implícitamente $u(x,y)=C$: da $P+Q\,y'=0$.
- Con condición inicial, reemplazá y hallá $C$.
- Si preguntan teoría: la equivalencia requiere $P,Q$ con derivadas continuas en un dominio simplemente conexo.

> **Elaborado para el sitio — verificar con la cátedra:** el factor integrante no aparece en las fuentes relevadas ni en los parciales oficiales; las fórmulas son estándar y se incluyen por si la cátedra lo toma.
