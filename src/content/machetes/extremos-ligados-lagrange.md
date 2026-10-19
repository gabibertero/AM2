---
slug: extremos-ligados-lagrange
titulo: "Extremos ligados: multiplicadores de Lagrange"
unidad: U3
orden: 21
ejerciciosOficiales: ["p1-1h9-2024-05#4", "p1-1h10-2024-b#4", "p1-1h10-2025-09#5", "p1-1r3-2024-10-a#6", "p1-1r3-2024-10-b#6", "p1-1r7-2025-10#5", "p1-2s2-2024-06-b#5", "p1-todas-2025-11-rec#4"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/03-MAXIMOS Y MINIMOS 2015.pdf, p. 14-19 (método, Lagrange y Ej. 1-3)"
  - "AM2_A 2025.pdf, p. 1-2 (cuestionario, preguntas 46-47)"
  - "teoria/Teorico-practico Rocha-Giordano/10_Extremos.pdf, p. 1"
---

## Cómo reconocerlo
- "Hallar los extremos de $z=f(x,y)$ **sujeta a** $\varphi(x,y)=0$" / "con la condición...".
- Optimizar una cantidad sujeta a otra: **caja** de volumen dado con superficie mínima (o superficie dada con volumen máximo), **distancia** de un punto a un plano o recta, producto máximo con suma fija.
- "Encuentre los puntos críticos e indique si son máximos o mínimos" con una ecuación de ligadura.

## Qué necesitás antes
- $f$ y $\varphi$ de clase $C^1$ y $\nabla\varphi\ne\vec0$ en el punto (si se anula, el método puede fallar).
- La ligadura escrita como $\varphi(x,y)=0$ (pasar todo a un miembro).
- Hasta dos variables independientes se puede además despejar y reemplazar (método de variables ligadas), pero no siempre es posible.

## Pasos
1. **Plantear:** objetivo $f$ y ligadura $\varphi=0$. En problemas de texto: elegir variables, escribir qué se optimiza y qué se fija.
2. Armar $F(x,y,\lambda)=f+\lambda\,\varphi$.
3. Igualar a cero: $F'_x=0$, $F'_y=0$, $F'_\lambda=\varphi=0$ (tres ecuaciones, tres incógnitas).
4. **Resolver**: despejar $\lambda$ de dos ecuaciones y igualar (o dividir), siempre revisando los casos en que se anula una variable.
5. Evaluar $f$ en cada candidato.
6. **Clasificar:** (a) comparando los valores de $f$ cuando la curva es cerrada y acotada; (b) por el **carácter del problema** (la caja mínima existe); (c) con el hessiano orlado, o con $d^2F$ sobre $d\varphi=0$.

## Fórmulas clave

$$F(x,y,\lambda)=f(x,y)+\lambda\,\varphi(x,y)\qquad F'_x=0,\ F'_y=0,\ \varphi=0$$

$$\nabla f=-\lambda\,\nabla\varphi\quad\text{(los gradientes son paralelos en el candidato)}$$

$$\overline H=\begin{vmatrix}0&\varphi'_x&\varphi'_y\\\varphi'_x&F''_{xx}&F''_{xy}\\\varphi'_y&F''_{xy}&F''_{yy}\end{vmatrix}:\ \ \overline H>0\ \text{máximo},\ \ \overline H<0\ \text{mínimo}$$
- $\lambda$: incógnita auxiliar, se descarta al final.
- Tres variables y una ligadura: $F=f+\lambda\varphi$ con 4 ecuaciones (las tres parciales y $\varphi=0$).
- Aplicaciones típicas:
  - **Distancia punto-plano/recta:** minimizar el cuadrado de la distancia $d^2=(x-x_0)^2+(y-y_0)^2+(z-z_0)^2$ sujeto al plano (la raíz no cambia dónde está el mínimo).
  - **Caja:** $V=xyz$ y superficie $S$; fijar una y optimizar la otra.
  - **Volumen máximo:** producto con suma fija da todas las partes iguales.

## Por qué funciona
En un extremo ligado la curva de nivel de $f$ es **tangente** a la curva $\varphi=0$, por lo que $\nabla f\parallel\nabla\varphi$ y existe $\lambda$ con $\nabla f+\lambda\nabla\varphi=\vec0$. Derivando $f(x,y(x))$ y $\varphi(x,y(x))=0$ con la cadena e igualando $\frac{dy}{dx}$ se llega al sistema.

## Ejemplo resuelto
**Caja sin tapa** de volumen $32\ \text{cm}^3$ con superficie mínima (Monllor Ej.1, verificado): $f=xy+2xz+2yz$, $\varphi=xyz-32$.
- $F'_x=y+2z+\lambda yz=0$, $F'_y=x+2z+\lambda xz=0$, $F'_z=2x+2y+\lambda xy=0$.
- De las dos primeras: $x(y+2z)=y(x+2z)\Rightarrow x=y$. De la tercera con $\lambda=-\frac{y+2z}{yz}$: $x=2z$.
- Con $xyz=32$: $4z^2\cdot z=32\Rightarrow z=2$, $x=y=4$. Superficie mínima: $16+16+16=48\ \text{cm}^2$.

**Distancia origen-plano** $x+y+z=3$ _(propio)_: minimizar $x^2+y^2+z^2$; $2x+\lambda=2y+\lambda=2z+\lambda=0\Rightarrow x=y=z=1$, $d=\sqrt3$, igual que $\frac{|{-3}|}{\sqrt3}$.

**Con clasificación** (cátedra, verificado): $z=2x+y^2$ sujeta a $x^2+y^2=4$. $F'_x=2+2\lambda x$, $F'_y=2y(1+\lambda)$. Si $y=0$: $(\pm2,0)$ con $f=\pm4$; si $\lambda=-1$: $x=1$, $y=\pm\sqrt3$ con $f=5$. Máximo $5$ en $(1,\pm\sqrt3)$, mínimo $-4$ en $(-2,0)$; $(2,0)$ es mínimo local de valor $4$.

## Errores frecuentes
- Dividir por una variable que puede ser $0$ y perder candidatos (revisar $y=0$, como arriba).
- Olvidar la ecuación de la ligadura entre las que se resuelven.
- Plantear mal el signo de $\lambda$ (no afecta los puntos, sí el valor de $\lambda$).
- No evaluar $f$ en **todos** los candidatos.
- No escribir la ligadura como $=0$ (cambia el signo de $\lambda$, no los puntos).
- Dar solo los puntos del plano $xy$ sin la cota $z=f$ cuando la piden.
- Clasificar sin argumento (escribir "es mínimo" sin comparar valores, carácter del problema u orlado).

## Cómo comprobar el resultado
- Los puntos cumplen $\varphi=0$.
- $\nabla f$ y $\nabla\varphi$ son paralelos en cada candidato.
- Compará $f$ con un punto cercano de la curva $\varphi=0$: si es mayor en ambos lados, mínimo.
- En el ejemplo de la caja: $x\,y\,z=4\cdot4\cdot2=32$ y $S=48$.

> **Elaborado para el sitio — verificar con la cátedra:** el sistema y la caja son de Monllor (p.14-19); el hessiano orlado no figura en las fuentes (resultado estándar, U3 sección 12) y la distancia al plano es propia.
