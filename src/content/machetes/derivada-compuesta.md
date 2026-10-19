---
slug: derivada-compuesta
titulo: "Derivada de funciones compuestas (regla de la cadena y árbol)"
unidad: U2
orden: 17
ejerciciosOficiales: ["p1-1r3-2023-09-b#4"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/02-DERIVADAS Y DIFERENCIALES 2015.pdf, p. 19-21"
  - "U2 - Derivadas Compuestas e Implicitas.pdf, p. 1-25 (documento completo)"
  - "Demostraciones parcial 1.pdf, p. 4-5 (Demostración 4, cadena; como imagen)"
---

## Cómo reconocerlo
- "Sea $z=f(x,y)$ con $x=\varphi(u,v)$, $y=\psi(u,v)$. Hallar $\frac{\partial z}{\partial u}$ y $\frac{\partial z}{\partial v}$ **sin** reemplazar".
- $f$ aparece con una función genérica ($f$, $g$) y las intermedias dadas por fórmulas.
- Una sola variable independiente: $x=x(t)$, $y=y(t)$, pedir $\frac{dz}{dt}$.
- En el práctico (1R3 Sep-23 grupo B, ej. 4): "Calcular la derivada de la función compuesta $u=\dots$ siendo $y=\ln x$, $z=\dots$ para valores de $(x,y,z)=(1,1,1)$".
- En el teórico: "deduzca la fórmula de la derivada de la función compuesta de dos variables que dependen de $t$".

## Qué necesitás antes
- $f$, y las intermedias, con derivadas parciales **continuas** (diferenciables).
- Distinguir **variables intermedias** ($x,y$), **independientes** ($u,v,t$) y la función ($z$).

## Pasos
1. Dibujar el **árbol**: $z$ arriba; ramas a $x,y$ (rótulo $z'_x,z'_y$); de cada intermedia ramas a las independientes (rótulo $x'_u$, etc.).
2. Para derivar respecto de $u$: **multiplicar** las derivadas a lo largo de cada camino que termina en $u$ y **sumar** los caminos.
3. Calcular cada derivada parcial por separado y evaluar en el punto (si piden valor numérico: hallar antes $x,y$ en ese punto). **Excepción del profe:** si el enunciado da el punto completo $(x,y,z)$, él **reemplaza directo esos valores** en las parciales de $u$ y usa $x$ en las derivadas de las intermedias, aunque el punto no sea consistente con $y(x)$, $z(x)$ (ver el ejemplo).
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

**Tipo parcial** (1R3 Sep-23 B, ej. 4): $u=\dfrac{x^2}{y}+x\,y^2\ln(z^2)$ con $y=\ln x$, $z=x^2+3x-1$, en $(x,y,z)=(1,1,1)$.

$$\frac{du}{dx}=u'_x+u'_y\,\frac{dy}{dx}+u'_z\,\frac{dz}{dx}$$

- $u'_x=\dfrac{2x}{y}+y^2\ln(z^2)$ y $u'_y=-\dfrac{x^2}{y^2}+2xy\ln(z^2)$.
- $u'_z=xy^2\cdot\dfrac{2z}{z^2}=\dfrac{2xy^2}{z}$ (la derivada interna de $z^2$ es $2z$; con $\ln(z^2)=2\ln z$ da lo mismo).
- $\dfrac{dy}{dx}=\dfrac1x$ y $\dfrac{dz}{dx}=2x+3$.

Con $(1,1,1)$, $\ln1=0$ anula varios términos: $u'_x=2$, $u'_y=-1$, $u'_z=2$, $\frac{dy}{dx}=1$, $\frac{dz}{dx}=5$.

$$\frac{du}{dx}=2+(-1)\cdot1+2\cdot5=11$$

⚠️ El punto $(1,1,1)$ **no es consistente** con las intermedias: para $x=1$, $y=\ln1=0$ y $z=1+3-1=3$. El profe igual reemplaza los valores dados (resuelve así: $2+0-1+0+4+6=11$); es un dato del enunciado, no un error de resolución. Seguí al profe y no te trabes con eso.

## Errores frecuentes
- Olvidar un camino del árbol (faltan términos).
- Derivar $\ln(z^2)$ como $\frac1{z^2}$ (falta la derivada interna $2z$).
- Escribir $\partial$ donde corresponde $d$ en $\frac{dz}{dt}$: es el error más castigado del tema.
- En la variable doble ($x$ independiente e intermedia), tomar $\frac{\partial f}{\partial x}$ como si fuera $\frac{dz}{dx}$ y olvidar los otros términos.
- Evaluar las parciales de $f$ en $(u,v)$ en lugar de en $(x,y)$.
- Reemplazar todo y derivar de nuevo cuando el enunciado pide hacerlo con la regla (puede estar permitido, pero se usa para comprobar).

## Cómo comprobar el resultado
- Reemplazá $x(u,v)$, $y(u,v)$ en $z$ y derivá directo: tiene que coincidir.
- Contá que hay tantos sumandos como caminos del árbol.

> **Elaborado para el sitio — verificar con la cátedra:** la compuesta aparece como ejercicio propio en 1R3 Sep-23 grupo B (ej. 4, con resolución del profe, ejemplo "tipo parcial" de arriba); en el resto de los 1º parciales se usa dentro de implícitas, direccionales y Lagrange. Ejemplo con $\cos t,\sin t$ propio.
