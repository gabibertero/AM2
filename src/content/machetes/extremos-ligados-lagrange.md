---
slug: extremos-ligados-lagrange
titulo: "Extremos ligados: multiplicadores de Lagrange"
unidad: U3
orden: 21
ejerciciosOficiales: ["p1-1h9-2024-05#4", "p1-1h10-2024-b#4", "p1-1h10-2025-09#5", "p1-1r3-2024-10-a#6", "p1-1r3-2024-10-b#6", "p1-1r7-2025-10#5", "p1-2s2-2024-06-b#5", "p1-todas-2025-11-rec#4", "p1-1h9-2023-07-rec#5", "p1-2s2-2023-07#5", "p1-1r3-2023-09-a#7", "p1-1r3-2023-09-b#7"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/03-MAXIMOS Y MINIMOS 2015.pdf, p. 14-19 (método, Lagrange y Ej. 1-3)"
  - "AM2_A 2025.pdf, p. 1-2 (cuestionario, preguntas 46-47)"
  - "teoria/Teorico-practico Rocha-Giordano/10_Extremos.pdf, p. 1"
---

## Cómo reconocerlo
- "Hallar los extremos de $z=f(x,y)$ **sujeta a** $\varphi(x,y)=0$" / "con la condición...".
- Optimizar una cantidad sujeta a otra: **caja** de volumen dado con superficie mínima (o superficie dada con volumen máximo), **distancia** de un punto a un plano o recta, producto máximo con suma fija.
- "Encuentre los puntos críticos e indique si son máximos o mínimos" con una ecuación de ligadura.
- **Caja con un vértice en un plano** (el opuesto al origen) o "con 3 caras en los planos cartesianos": se maximiza $V=xyz$ sujeto al plano. Si el plano es el **plano tangente** a una superficie (1H9 May-24 #4), primero se calcula (ver el machete de plano tangente).
- "Determinar la **superficie total**" / "las dimensiones" / "el volumen": hay que devolver **lo que piden**, no solo los puntos.

## Qué necesitás antes
- $f$ y $\varphi$ de clase $C^1$ y $\nabla\varphi\ne\vec0$ en el punto (si se anula, el método puede fallar).
- La ligadura escrita como $\varphi(x,y)=0$ (pasar todo a un miembro).
- Hasta dos variables independientes se puede además despejar y reemplazar (método de variables ligadas), pero no siempre es posible.

## Pasos
1. **Plantear:** objetivo $f$ y ligadura $\varphi=0$. En problemas de texto: elegir variables, escribir qué se optimiza y qué se fija.
2. Armar $F(x,y,\lambda)=f+\lambda\,\varphi$ (**o** $f-\lambda\varphi$: la cátedra usa $F=f+\lambda\varphi$ en 2024 y $F=f-\lambda\varphi$ en 2025; los puntos son los mismos y solo cambia el signo de $\lambda$).
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

**Caja con un vértice en un plano, pidiendo la superficie** (Recup. Nov-25 #4): paralelepípedo de volumen máximo con 3 caras en los planos coordenados y un vértice en $6x+3y+2z=18$. $F=xyz-\lambda\,(6x+3y+2z-18)$:

$$yz=6\lambda,\qquad xz=3\lambda,\qquad xy=2\lambda$$

- Igualando $\lambda$: $\frac{yz}6=\frac{xz}3\Rightarrow y=2x$ (dividiendo por $z>0$) y $\frac{yz}6=\frac{xy}2\Rightarrow z=3x$ (dividiendo por $y>0$).
- En el plano: $6x+6x+6x=18$, $x=1$: dimensiones $(1,2,3)$, $V=6$.
- **Lo que piden es la superficie total** (las 6 caras, 3 pares iguales):

$$S=2(xy+yz+xz)=2(2+6+3)=22$$

- Con el plano tangente (1H9 May-24 #4: plano $2x+4y+z=21$, $F=xyz+\lambda(2x+4y+z-21)$) se llega a $y=\frac x2$, $z=2x$, dimensiones $\left(\frac72,\frac74,7\right)$ y $V=\frac{343}8$.

**Argumento de máximo/mínimo.** Dividir por una variable solo si es $>0$ ("dividiendo por $z>0$", porque las dimensiones de la caja son positivas). Como el volumen es $0$ en el borde del triángulo del plano ($x$, $y$ o $z$ nula) y positivo adentro, el único punto crítico interior es el **máximo**. En cambio, la distancia al origen de un **plano** no tiene máximo (crece sin límite): el único punto crítico es el **mínimo**.

**Caja con o sin tapa, superficie fija** (2S2 Jul-23 #5): caja **con tapa** de superficie $216\ \text{cm}^2$ y capacidad máxima. Ligadura $2(xy+yz+xz)=216$ (seis caras); resulta $x=y=z$, o sea $6x^2=216$: cubo de lado $6$ y $V=216\ \text{cm}^3$. Si fuera **sin tapa** la superficie es $xy+2xz+2yz$ (como en el ejemplo de Monllor de arriba).

**Distancia mínima del origen a un plano, eliminando $\lambda$** (aparece en 1H9 Jul-23 rec #5, 1R3 Sep-23 A #7 y 1H10 Sep-25 #5). Se minimiza $d^2=x^2+y^2+z^2$ (mismo punto que $d$). Plano $2x+3y+6z=49$, con $F=x^2+y^2+z^2-\lambda\,(2x+3y+6z-49)$:

$$2x=2\lambda,\qquad 2y=3\lambda,\qquad 2z=6\lambda$$

Despejando $\lambda$ de cada una e igualando queda $\frac x2=\frac y3=\frac z6$, o sea $x=\lambda$, $y=\frac32\lambda$, $z=3\lambda$: el punto es **múltiplo del vector normal** $(2,3,6)$. En el plano: $2\lambda+\frac92\lambda+18\lambda=49\Rightarrow\lambda=2$, punto $(2,3,6)$ y

$$d=\sqrt{4+9+36}=7$$

Idéntico a $\frac{|49|}{\sqrt{2^2+3^2+6^2}}=\frac{49}7=7$. (Mismo método: $x+4y+9z=98$ da $(1,4,9)$ y $d=\sqrt{98}=7\sqrt2$.) Devolver la **distancia** y no su cuadrado.

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

> **Elaborado para el sitio — verificar con la cátedra:** el sistema y la caja son de Monllor (p.14-19); el hessiano orlado no figura en las fuentes (resultado estándar, U3 sección 12) y la distancia al plano (primer ejemplo) es propia. Caja con plano/plano tangente, superficie total, caja con tapa y distancia con $\lambda$ eliminado vienen de parciales (1H9 May-24 #4, Recup. Nov-25 #4, 2S2 Jul-23 #5, 1H9 Jul-23 rec #5, 1R3 Sep-23 A #7), linkeados arriba; la clasificación de máximo/mínimo en la caja y el plano es el argumento de las resoluciones.
