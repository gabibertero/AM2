---
slug: derivada-implicita
titulo: "Derivada de funciones implícitas (una ecuación y sistemas)"
unidad: U2
orden: 16
ejerciciosOficiales: ["p1-1r3-2024-10-a#3", "p1-1r3-2024-10-b#3", "p1-1r3-2023-09-a#4"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/02-DERIVADAS Y DIFERENCIALES 2015.pdf, p. 22-30"
  - "U2 - Derivadas Compuestas e Implicitas.pdf, p. 1-25 (documento completo)"
  - "Ejercicios Funciones Implícitas .pdf, p. 1-6 (fórmulas y ejercicios resueltos, manuscrito de Gabi)"
  - "foto de método de WhatsApp w18 (implícita de sen(3x²−xy+z)+e^(y−x²+z)=0), docs/inventario/P1-B-fotos.md"
---

## Cómo reconocerlo
- "Hallar $\dfrac{dy}{dx}$ / $\dfrac{\partial z}{\partial x}$ y $\dfrac{\partial z}{\partial y}$ en el punto..., sabiendo que la ecuación $F(x,y,z)=0$ define a $z=f(x,y)$".
- No se puede (o no conviene) despejar la variable.
- Dos ecuaciones y tres o cuatro variables: "las ecuaciones definen $y(x)$ y $z(x)$" (sistema).
- **Una** ecuación con tres letras y "siendo $y=f_1(x)$, $z=f_2(x)$": piden $\frac{dy}{dx}$ y $\frac{dz}{dx}$ (1R3 Sep-23 A, ej. 4). Se calculan **por separado**: $\frac{dy}{dx}$ con $z$ fija y $\frac{dz}{dx}$ con $y$ fija.

## Qué necesitás antes
- $F\in C^1$ cerca del punto, $F(P_0)=0$ y la derivada respecto de la variable **dependiente** $\ne0$ ($F'_y\ne0$ o $F'_z\ne0$). El resultado vale **localmente**.
- Sistema: el **jacobiano** respecto de las variables dependientes debe ser $\ne0$.
- Comprobar que el punto **cumple** la ecuación (suele pedir verificarlo para encontrar el tercer valor). Ojo: en el ejemplo trigonométrico de la cátedra de abajo el punto **no** está en la superficie y se usa de forma **formal** (se evalúan las fórmulas igual).

## Pasos
1. Pasar todo a un miembro: $F(x,y,z)=0$.
2. Decidir quién es la **dependiente** (la que "define" el enunciado).
3. Calcular $F'_x,F'_y,F'_z$ **por separado** (las otras variables son constantes) y evaluarlas en el punto.
4. Aplicar el cociente con **signo menos**.
5. Sistema: derivar ambas ecuaciones respecto de la variable independiente (con la cadena) y resolver el sistema lineal 2×2, o usar jacobianos.

## Fórmulas clave

$$g(x,y)=0:\quad \frac{dy}{dx}=-\frac{g'_x}{g'_y}$$

$$F(x,y,z)=0:\quad \frac{\partial z}{\partial x}=-\frac{F'_x}{F'_z},\ \ \frac{\partial z}{\partial y}=-\frac{F'_y}{F'_z}$$

**Sistema** $g_1(x,y,z)=0,\ g_2(x,y,z)=0$ define $y(x),z(x)$:

$$\frac{dy}{dx}=-\frac{\dfrac{\partial(g_1,g_2)}{\partial(x,z)}}{\dfrac{\partial(g_1,g_2)}{\partial(y,z)}}$$

$$\frac{dz}{dx}=-\frac{\dfrac{\partial(g_1,g_2)}{\partial(y,x)}}{\dfrac{\partial(g_1,g_2)}{\partial(y,z)}}$$
- $\dfrac{\partial(g_1,g_2)}{\partial(y,z)}=\begin{vmatrix}g'_{1y}&g'_{1z}\\g'_{2y}&g'_{2z}\end{vmatrix}$: filas = funciones, columnas = variables.
- Con dos ecuaciones y cuatro variables ($u(x,y)$, $v(x,y)$): mismo esquema con el jacobiano en $(u,v)$ abajo.

## Por qué funciona
Si $y=f(x)$ cumple $g(x,f(x))=0$, derivando con la cadena: $g'_x+g'_y\,y'=0$, y se despeja $y'$. En el sistema se derivan ambas ecuaciones y queda un sistema lineal resuelto por Cramer.

## Ejemplo resuelto
$\sin(3x^2-xy+z)+e^{\,y-x^2+z}=0$ en $(1,2,-1)$, $z=f(x,y)$ _(ejemplo de la cátedra, uso formal, verificado a mano)_.
- ⚠️ **El punto no pertenece a la superficie:** los dos argumentos valen $0$ ($3-2-1=0$ y $2-1-1=0$), pero entonces $F(1,2,-1)=\sin0+e^0=1\ne0$. La cátedra lo usa **formalmente**: evalúa las derivadas en ese punto como si estuviera en la superficie. En un ejercicio real el punto sí tiene que cumplir $F=0$.
- $F'_x=\cos0\,(6x-y)+e^0(-2x)=4-2=2$; $F'_y=\cos0\,(-x)+e^0=0$; $F'_z=\cos0+e^0=2$.

$$\frac{\partial z}{\partial x}=-\frac22=-1,\qquad \frac{\partial z}{\partial y}=-\frac02=0$$

**Una ecuación, dos derivadas** (1R3 Sep-23 A, ej. 4; el punto sí está en la superficie): $\arctan(x^2yz^3)=\dfrac\pi4$ en $M(1,1,1)$ ($\arctan1=\frac\pi4$), $y=f_1(x)$, $z=f_2(x)$. Con $F=\arctan(x^2yz^3)-\frac\pi4$ y $u=x^2yz^3$, las tres parciales llevan el mismo factor $\frac1{1+u^2}$, que se **cancela** en los cocientes:

$$F'_x=\frac{2xyz^3}{1+u^2},\qquad F'_y=\frac{x^2z^3}{1+u^2},\qquad F'_z=\frac{3x^2yz^2}{1+u^2}$$

$$\frac{dy}{dx}=-\frac{F'_x}{F'_y}=-\frac{2y}{x}=-2\quad(z\text{ fija})$$

$$\frac{dz}{dx}=-\frac{F'_x}{F'_z}=-\frac{2z}{3x}=-\frac23\quad(y\text{ fija})$$

Chequeo: la ecuación equivale a $x^2yz^3=1$; despejando $y=\dfrac1{x^2z^3}$ y derivando con $z$ fija: $-\dfrac{2}{x^3z^3}=-2$ en $M$.

**Sistema**, $x^2+y^2+z^2=6$ y $x+y+z=0$ definen $y(x),z(x)$ _(propio)_: derivando, $x+y\,y'+z\,z'=0$ y $1+y'+z'=0$; entonces $\dfrac{dy}{dx}=\dfrac{z-x}{y-z}$ y $\dfrac{dz}{dx}=\dfrac{x-y}{y-z}$ (coincide con el cociente de jacobianos).

El profe suele **dejar el resultado como cociente de determinantes** (sin desarrollar ni simplificar más, salvo que pidan el valor en un punto). Acá, con $g_1=x^2+y^2+z^2-6$ y $g_2=x+y+z$:

$$\frac{dy}{dx}=-\frac{\begin{vmatrix}2x&2z\\1&1\end{vmatrix}}{\begin{vmatrix}2y&2z\\1&1\end{vmatrix}}$$

$$\frac{dz}{dx}=-\frac{\begin{vmatrix}2y&2x\\1&1\end{vmatrix}}{\begin{vmatrix}2y&2z\\1&1\end{vmatrix}}$$

Desarrollados dan $-\frac{2x-2z}{2y-2z}=\frac{z-x}{y-z}$ y $-\frac{2y-2x}{2y-2z}=\frac{x-y}{y-z}$, los mismos de arriba.

## Errores frecuentes
- Olvidar el **signo menos**.
- Cociente invertido: la dependiente va **abajo**.
- Al calcular $F'_x$, tratar a $z$ como función de $x$: en $F'_x$ las otras variables son **constantes** (la dependencia ya la recoge el cociente).
- Evaluar mal en el punto, o no verificar que el punto pertenece a la superficie (salvo el uso formal de la cátedra aclarado arriba).
- Con una ecuación y $y=f_1(x)$, $z=f_2(x)$: mezclar cuál variable queda fija ($\frac{dy}{dx}$ con $z$ fija; $\frac{dz}{dx}$ con $y$ fija).
- Derivar el $\arctan$ "de más": el factor $\frac1{1+u^2}$ se cancela y no hace falta evaluarlo.
- En sistemas, intercambiar columnas del jacobiano (cambia el signo).
- No notar que el denominador se anula ($F'_z=0$): no se puede aplicar.

## Cómo comprobar el resultado
- Si se puede despejar, derivá directo y compará.
- Con $F=0$: $dF=F'_x\,dx+F'_y\,dy+F'_z\,dz=0$ debe dar el mismo cociente.
- Sistema: reemplazá $y'$, $z'$ en las dos ecuaciones derivadas y verificá que se cumplen.

> **Elaborado para el sitio — verificar con la cátedra:** el ejemplo del sistema con la esfera es propio; fórmulas y ejemplo trigonométrico (uso formal: el punto no está en la superficie) son de la cátedra (U2 Compuestas e Implícitas y foto w18); el ejemplo del arcotangente es el ej. 4 de 1R3 Sep-23 A con la lectura del profe (una variable dependiente por vez).
