---
slug: derivada-compuesta
titulo: "Derivada de funciones compuestas (regla de la cadena y árbol)"
unidad: U2
orden: 17
ejerciciosOficiales: []
fuentes:
  - "teoria/Apuntes Ing. Monllor/02-DERIVADAS Y DIFERENCIALES 2015.pdf, p. 19-21"
  - "U2 - Derivadas Compuestas e Implicitas.pdf, p. 1-25 (documento completo)"
  - "Demostraciones parcial 1.pdf, p. 4-5 (Demostración 4, cadena; como imagen)"
---

## Cómo reconocerlo
- "Sea $z=f(x,y)$ con $x=\varphi(u,v)$, $y=\psi(u,v)$. Hallar $\frac{\partial z}{\partial u}$ y $\frac{\partial z}{\partial v}$ **sin** reemplazar".
- $f$ aparece con una función genérica ($f$, $g$) y las intermedias dadas por fórmulas.
- Una sola variable independiente: $x=x(t)$, $y=y(t)$, pedir $\frac{dz}{dt}$.
- En el teórico: "deduzca la fórmula de la derivada de la función compuesta de dos variables que dependen de $t$".

## Qué necesitás antes
- $f$, y las intermedias, con derivadas parciales **continuas** (diferenciables).
- Distinguir **variables intermedias** ($x,y$), **independientes** ($u,v,t$) y la función ($z$).

## Pasos
1. Dibujar el **árbol**: $z$ arriba; ramas a $x,y$ (rótulo $z'_x,z'_y$); de cada intermedia ramas a las independientes (rótulo $x'_u$, etc.).
2. Para derivar respecto de $u$: **multiplicar** las derivadas a lo largo de cada camino que termina en $u$ y **sumar** los caminos.
3. Calcular cada derivada parcial por separado y evaluar en el punto (si piden valor numérico: hallar antes $x,y$ en ese punto).
4. Si la función es de una sola independiente, usar $d$ (total) para $\frac{dz}{dt}$ y $\partial$ para las parciales de $f$.

## Fórmulas clave

$$\frac{\partial z}{\partial u}=\frac{\partial z}{\partial x}\frac{\partial x}{\partial u}+\frac{\partial z}{\partial y}\frac{\partial y}{\partial u},\qquad \frac{\partial z}{\partial v}=\frac{\partial z}{\partial x}\frac{\partial x}{\partial v}+\frac{\partial z}{\partial y}\frac{\partial y}{\partial v}$$

$$\frac{dz}{dt}=\frac{\partial z}{\partial x}\frac{dx}{dt}+\frac{\partial z}{\partial y}\frac{dy}{dt}$$
- **Variable a la vez independiente e intermedia:** $z=f(x,y,w)$ con $y=g_1(x)$, $w=g_2(x)$:

$$\frac{dz}{dx}=\frac{\partial f}{\partial x}+\frac{\partial f}{\partial y}\frac{dy}{dx}+\frac{\partial f}{\partial w}\frac{dw}{dx}$$
- Caso general: $\dfrac{\partial z}{\partial x_i}=\sum_j\dfrac{\partial z}{\partial y_j}\dfrac{\partial y_j}{\partial x_i}$.

## Por qué funciona
Se incrementa $u$ con $v$ fija; $x$ e $y$ reciben $\Delta_ux,\Delta_uy$ y, por diferenciabilidad, $\Delta z=z'_x\Delta_ux+z'_y\Delta_uy+\varepsilon_1\Delta_ux+\varepsilon_2\Delta_uy$. Se divide por $\Delta u$ y se pasa al límite: los $\varepsilon_i\to0$ porque $x,y$ son continuas.

## Ejemplo resuelto
$z=x^2y$ con $x=u+v$, $y=uv$ _(ejemplo de la teoría, verificado)_.
- $z'_x=2xy$, $z'_y=x^2$; $x'_u=1$, $y'_u=v$; $x'_v=1$, $y'_v=u$.

$$\frac{\partial z}{\partial u}=2xy\cdot1+x^2\cdot v=2(u+v)uv+(u+v)^2v,\qquad \frac{\partial z}{\partial v}=2xy+x^2u$$

Chequeo en $(u,v)=(1,1)$: $x=2$, $y=1$, ambas dan $4+4=8$; derivando $z=(u+v)^2uv$ directo da $8$ también.

Una independiente: $z=x^2+xy$, $x=\cos t$, $y=\sin t$ _(propio)_: $\dfrac{dz}{dt}=(2x+y)(-\sin t)+x\cos t$; en $t=0$ ($x=1,y=0$): $2\cdot0+1=1$, igual que derivando $z=\cos^2t+\cos t\sin t$ directo: $z'=-\sin2t+\cos2t$, que en $t=0$ vale $1$.

## Errores frecuentes
- Olvidar un camino del árbol (faltan términos).
- Escribir $\partial$ donde corresponde $d$ en $\frac{dz}{dt}$: es el error más castigado del tema.
- En la variable doble ($x$ independiente e intermedia), tomar $\frac{\partial f}{\partial x}$ como si fuera $\frac{dz}{dx}$ y olvidar los otros términos.
- Evaluar las parciales de $f$ en $(u,v)$ en lugar de en $(x,y)$.
- Reemplazar todo y derivar de nuevo cuando el enunciado pide hacerlo con la regla (puede estar permitido, pero se usa para comprobar).

## Cómo comprobar el resultado
- Reemplazá $x(u,v)$, $y(u,v)$ en $z$ y derivá directo: tiene que coincidir.
- Contá que hay tantos sumandos como caminos del árbol.

> **Elaborado para el sitio — verificar con la cátedra:** en los 1º parciales prácticos relevados no aparece un ejercicio de compuestas puro; la regla se usa dentro de implícitas, direccionales y Lagrange. Ejemplo con $\cos t,\sin t$ propio.
