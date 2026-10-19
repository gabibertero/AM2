---
slug: limites-dobles
titulo: "Límites dobles (sucesivos, radiales y curvas)"
unidad: U1
orden: 14
ejerciciosOficiales: ["p1-1r3-2023-09-a#2", "p1-1r3-2023-09-b#2"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/01-FUNCIONES DE VARIAS VARIABLES 2015.pdf, p. 11-15 (Ej. 1-7)"
  - "AM2_A 2025.pdf, p. 1-2 (cuestionario, preguntas 13-18)"
---

## Cómo reconocerlo
- "Calcule $\displaystyle\lim_{(x,y)\to(x_0,y_0)}f(x,y)$" o "demuestre que no existe".
- Al reemplazar queda una indeterminación $\tfrac00$ que no se puede simplificar.
- En el teórico: "¿cuándo es necesario y para qué calcula límites sucesivos, radiales y a lo largo de una curva?" (27/07/22).
- En el práctico (1R3 Sep-23): "Si arroja indeterminación, probar solo con métodos de **haz de rectas y parabólico**" (grupo A) o "intentar levantar la indeterminación **factorizando**… y verificar por el método del **haz de rectas**" (grupo B).
- Vocabulario: **haz de rectas** = todas las rectas por el punto, $y-y_0=m(x-x_0)$ (radiales); **haz parabólico** = $y=a\,x^2$ (curvas).

## Qué necesitás antes
- $P_0$ **punto de acumulación** del dominio; los puntos que se prueban deben pertenecer al dominio.
- Hay infinitas formas de acercarse a $P_0$: las trayectorias sirven para **probar que NO existe**, nunca para probar que existe.

## Pasos
1. **Reemplazar** $(x_0,y_0)$. Si da un número, ese es el límite.
2. Si da indeterminación: **simplificar**, factorear (agrupando de a pares) o usar límites notables (p. ej. $\frac{\sin 3xy}{3xy}\to1$). Si al factorear sale un número, **ese es el límite**: la factorización lo **demuestra** y el haz de rectas solo lo **verifica** (si piden verificarlo, hacerlo igual).
3. Si no se salva, buscar que **no exista**:
   - **Sucesivos:** $L_1=\lim_{x\to x_0}\big[\lim_{y\to y_0}f\big]$ y $L_2=\lim_{y\to y_0}\big[\lim_{x\to x_0}f\big]$. Si $L_1\ne L_2$: no existe.
   - **Radiales:** $y-y_0=m(x-x_0)$; si el resultado depende de $m$: no existe. **Estudiar aparte la vertical** $x=x_0$.
   - **Curvas:** si los anteriores coinciden, probar $y=kx^2$, $y=kx^3$, etc.
4. Si todas dan lo mismo, **no se puede concluir** con trayectorias: acotar o usar la definición $\varepsilon$-$\delta$ para probar que existe.

## Fórmulas clave

$$L_1=\lim_{x\to x_0}\Big[\lim_{y\to y_0}f(x,y)\Big],\qquad L_2=\lim_{y\to y_0}\Big[\lim_{x\to x_0}f(x,y)\Big]$$

$$\text{Radiales: } y=y_0+m(x-x_0)\ \Rightarrow\ \lim_{x\to x_0}f\big(x,\,y_0+m(x-x_0)\big)$$
- Si dos trayectorias dan valores distintos, o por una el límite no existe: **el límite doble no existe**.
- Sucesivos iguales **no** garantizan existencia.

## Ejemplo resuelto
$\displaystyle\lim_{(x,y)\to(0,0)}\frac{x^2y}{x^4+y^2}$ _(tipo Monllor Ej. 7, verificado a mano)_.
- Reemplazo: $\tfrac00$.
- Sucesivos: $\lim_{y\to0}f=\frac{0}{x^4}=0$ y luego $0$; $\lim_{x\to0}f=0$. Ambos $0$.
- Radiales $y=mx$: $\dfrac{mx^3}{x^4+m^2x^2}=\dfrac{mx}{x^2+m^2}\to0$ (y la vertical $x=0$ da $0$). Todos $0$.
- Parábola $y=x^2$: $\dfrac{x^4}{x^4+x^4}=\dfrac12\ne0$.

Dos trayectorias con valores distintos: **el límite no existe**.

Ejemplo de existencia: $\dfrac{x^2y}{x^2+y^2}$ cumple $\Big|\dfrac{x^2y}{x^2+y^2}\Big|\le|y|\to0$, entonces el límite es $0$ (se acota, no se prueba con trayectorias).

**Levantar por factorización y verificar con el haz** (1R3 Sep-23 grupo B, ej. 2): $\displaystyle\lim_{(x,y)\to(1,-1)}\frac{y+1}{y^2-x+y-xy}$.
- Reemplazo: $\tfrac00$. Agrupo el denominador de a pares:

$$y^2-x+y-xy=y\,(y+1)-x\,(1+y)=(y+1)(y-x)$$

- Cancelo $(y+1)$ (en los puntos de la función $y\ne-1$):

$$\lim_{(x,y)\to(1,-1)}\frac{1}{y-x}=\frac{1}{-1-1}=-\frac12$$

- **Verificación con el haz** $y=m(x-1)-1$, con $x\to1$:

$$\lim_{x\to1}\frac{1}{m(x-1)-1-x}=\frac{1}{-2}=-\frac12$$

No depende de $m$; la vertical $x=1$ da $\frac{y+1}{y^2-1}=\frac1{y-1}\to-\frac12$. El profe aclara que el haz "no es necesario" si ya factorizó.

**Haz de rectas y haz parabólico** (1R3 Sep-23 grupo A, ej. 2): $\displaystyle\lim_{(x,y)\to(0,0)}\frac{5x^2y}{x^4+3y^2}$.
- Rectas $y=mx$: $\dfrac{5mx}{x^2+3m^2}\to0$ (también $m=0$ y la vertical $x=0$ dan $0$).
- Parábolas $y=ax^2$:

$$\frac{5x^2\cdot ax^2}{x^4+3a^2x^4}=\frac{5a}{1+3a^2}$$

Depende de $a$ (con $a=1$ da $\frac54\ne0$): **el límite no existe**.

## Errores frecuentes
- Concluir "existe" porque los sucesivos (o los radiales) dieron lo mismo.
- Olvidar la recta vertical $x=x_0$ en los radiales.
- Usar trayectorias que **salen del dominio**.
- Calcular un límite sucesivo y presentarlo como límite doble.
- Con $y=mx$ dividir por $m$ sin ver el caso $m=0$.
- Confundir $\lim_{(x,y)\to(0,0)}$ (a la vez) con dos límites uno detrás del otro.
- Creer que el haz de rectas **demuestra** un límite: solo lo verifica (lo demuestra la factorización o una acotación).
- Factorizar mal: arriba el factor es $(y+1)(y-x)$, no $(y+1)(y+x)$.

## Cómo comprobar el resultado
- Si decís "no existe", mostrá **dos** caminos concretos con los dos valores.
- Si decís "existe", tiene que haber reemplazo directo, simplificación, límite notable o una acotación; las trayectorias no alcanzan.
- Verificá la parábola reemplazando otro $k$ (el resultado cambia con $k$ en los ejemplos típicos).

> **Elaborado para el sitio — verificar con la cátedra:** el límite aparece en el práctico de 1R3 Sep-23 (grupos A y B, ejercicio 2, con resolución del profe) y se evalúa también en el teórico. La acotación del ejemplo de existencia es estándar de Análisis.
