---
slug: derivada-direccional-y-gradiente
titulo: "Derivada direccional y gradiente (máximo crecimiento, ángulos)"
unidad: U2
orden: 18
ejerciciosOficiales: ["p1-1h9-2025-05-g1#2", "p1-1h9-2025-05-g2#2", "p1-1h9-2025-07-rec#2", "p1-1h9-2024-05#3", "p1-1h10-2024-b#2", "p1-1h10-2025-09#3", "p1-1r3-2024-10-a#4", "p1-1r3-2024-10-b#4", "p1-1r7-2025-10#3", "p1-2s2-2025-06-b#3", "p1-2s2-2024-06-b#3", "p1-todas-2025-11-rec#3", "p1-1h9-2023-05#3", "p1-1h10-2023-10-rec#3", "p1-1h9-2023-07-rec#3", "p1-2s2-2023-07#3", "p1-1r3-2023-09-a#5", "p1-1r3-2023-09-b#5"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/02-DERIVADAS Y DIFERENCIALES 2015.pdf, p. 31-39"
  - "U2- Derivada Direccional.pdf, p. 1-22"
  - "Ejercicios Direccionales .pdf, p. 1-3 (ejercicios resueltos, manuscrito de Gabi)"
  - "foto de método de WhatsApp w19 (pasos 1-9 de la derivada direccional) y w12, docs/inventario/P1-B-fotos.md"
---

## Cómo reconocerlo
- "Calcular la derivada direccional de $z=f(x,y)$ en $P$ en la dirección de $\vec v$ / del ángulo $\alpha$ / hacia el punto $Q$".
- "¿En qué dirección crece más rápido?", "dirección de máximo crecimiento / de mínimo", "direcciones en las que la derivada es **nula**".
- "Hallar $\theta_{\max},\theta_{\min}$ y los ángulos de derivada nula."
- "Por definición" (si la función es partida o hay un punto raro).

## Qué necesitás antes
- $f$ con derivadas parciales **continuas** en un entorno de $P$ (para usar el gradiente).
- Dirección dada por: un ángulo $\alpha$ (desde $+x$), un vector $\vec v$, o dos puntos ($\vec v=\overrightarrow{P_1P_2}$).
- El versor, no el vector: $\vec v_n=\vec v/|\vec v|$.

## Pasos
1. Calcular $f'_x$ y $f'_y$ y **evaluarlas en $P$**: $\nabla f(P)=(f'_x,f'_y)$.
2. **Normalizar** la dirección: $\vec v_n=\dfrac{(h,k)}{\sqrt{h^2+k^2}}$ (o $(\cos\alpha,\sin\alpha)$).
3. $\dfrac{\partial z}{\partial S}=\nabla f(P)\cdot\vec v_n$.
4. **Máximo crecimiento:** dirección de $\nabla f(P)$; valor máximo $|\nabla f(P)|$. **Mínimo:** sentido opuesto, valor $-|\nabla f|$. **Nula:** las dos perpendiculares a $\nabla f$.
5. **Ángulos** ($\theta=\operatorname{arctg}\frac{f'_y}{f'_x}$, corrigiendo cuadrante): $\theta_{\min}=\theta_{\max}+180^\circ$; nulos $\theta_{\max}\pm90^\circ$.
6. Por **definición** (si piden o si no hay derivadas): límite en la dirección.
7. **Graficar el gradiente en $P$** (casi siempre lo piden): plano $xy$ con ejes graduados, $\nabla f(P)$ **saliendo de $P$** y **a escala** (si es largo, dibujarlo a $\frac12$ o similar y aclararlo), con el ángulo $\theta$ marcado desde $+x$. Marcar además la dirección de **máximo** (el gradiente), la de **mínimo** (opuesta) y las **dos nulas** (perpendiculares, sobre la recta tangente a la curva de nivel). Ej.: $\nabla f=(6,-5)$ en $P(1,1)$ a escala $\frac12$ llega a $(4;\,-1{,}5)$.
8. **Simplificar antes de derivar:** $\ln\sqrt{u}=\tfrac12\ln u$ y $\ln\frac xy=\ln x-\ln y$ ahorran cuentas.

**Cuadrantes** ($h$ = componente en $x$, $k$ = en $y$):

| Signo | Cuadrante | $\alpha$ |
|---|---|---|
| $h>0,\ k\ge0$ | 1º | $\operatorname{arctg}\frac kh$ |
| $h<0$ | 2º o 3º | $\operatorname{arctg}\frac kh+180^\circ$ |
| $h>0,\ k<0$ | 4º | $\operatorname{arctg}\frac kh+360^\circ$ |
| $h=0$ | eje $y$ | $90^\circ$ si $k>0$; $270^\circ$ si $k<0$ |

## Fórmulas clave

$$\frac{\partial z}{\partial S}=f'_x\cos\alpha+f'_y\sin\alpha=\nabla f(P)\cdot\vec v_n=|\nabla f|\cos\omega$$

$$\text{Por definición: }\ \frac{\partial z}{\partial S}=\lim_{h\to0^+}\frac{f(x+h\cos\alpha,\ y+h\sin\alpha)-f(x,y)}{h}$$

$$\text{3 variables: }\ \frac{\partial u}{\partial S}=\nabla f\cdot(\cos\alpha,\cos\beta,\cos\gamma)$$
- $\omega$: ángulo entre $\nabla f$ y $\vec v_n$. Máxima si $\omega=0$, mínima si $\omega=180^\circ$, nula si $\omega=90^\circ$.
- $\nabla f(P)$ es **perpendicular a la curva de nivel** por $P$ (y la derivada es nula sobre su tangente).

## Por qué funciona
Del incremento total, dividido por $\Delta S$ con $\Delta x/\Delta S=\cos\alpha$ y $\Delta y/\Delta S=\sin\alpha$, el límite es $f'_x\cos\alpha+f'_y\sin\alpha$, que es el producto escalar de $\nabla f$ con el versor. Como $\nabla f\cdot\vec v_n=|\nabla f|\cos\omega$, es máxima cuando $\omega=0$.

## Ejemplo resuelto
$f=x^2y$ en $P(1,2)$ _(propio, verificado a mano)_: $f'_x=2xy=4$, $f'_y=x^2=1$, entonces $\nabla f(P)=(4,1)$.
- **Dirección $\vec v=(3,-4)$:** $|\vec v|=5$, $\vec v_n=(\tfrac35,-\tfrac45)$, $\dfrac{\partial z}{\partial S}=\tfrac{12}5-\tfrac45=\tfrac85$.
- **Máximo crecimiento:** dirección $(4,1)$, $\theta_{\max}=\operatorname{arctg}\tfrac14\approx14{,}04^\circ$ (1º cuadrante), valor $\sqrt{17}\approx4{,}12$.
- **Mínimo:** $\theta_{\min}\approx194{,}04^\circ$, valor $-\sqrt{17}$. **Nula:** $\approx104{,}04^\circ$ y $284{,}04^\circ$.
- **Con cuadrante:** si fuera $\nabla f=(-2,3)$, $\operatorname{arctg}(-1{,}5)=-56{,}31^\circ$ y $\theta=123{,}69^\circ$ (2º cuadrante).

**Por definición** (cátedra permite): $f=xy$ en $(1,2)$, $\alpha=45^\circ$: $\dfrac{(1+hc)(2+hc)-2}{h}=3c+hc^2\to3c=\dfrac{3\sqrt2}2$ con $c=\frac{\sqrt2}2$; coincide con $\nabla f\cdot\vec v_n=(2,1)\cdot(c,c)$.

**Por definición con logaritmos** (2S2 Jul-23 #3; mismo tipo con $P(2,1)$ en 1H9 Jul-23 rec #3): $f=\ln\frac xy$, $P(1,2)$, "dirección y sentido creciente de la bisectriz del 2º cuadrante", o sea $\alpha=135^\circ$ y $\vec v_n=\left(-\frac{\sqrt2}{2},\frac{\sqrt2}{2}\right)$. Con $f(P)=-\ln2$:

$$f(P+t\vec v_n)-f(P)=\ln\Big(1-\tfrac{\sqrt2}{2}t\Big)-\ln\Big(1+\tfrac{\sqrt2}{4}t\Big)$$

Se usa el límite notable $\displaystyle\lim_{t\to0}\frac{\ln(1+at)}{t}=a$ en cada término:

$$\frac{\partial f}{\partial s}=-\frac{\sqrt2}{2}-\frac{\sqrt2}{4}=-\frac{3\sqrt2}{4}\approx-1{,}06$$

Control con las parciales ($f'_x=1$, $f'_y=-\frac12$): $1\cdot\left(-\frac{\sqrt2}2\right)-\frac12\cdot\frac{\sqrt2}2$, mismo valor. ⚠️ El profe resolvió ese inciso con la fórmula de las parciales aunque la consigna decía "por definición"; el resultado es el mismo, pero conviene hacer el límite si lo piden. Gradiente: $\nabla f=(1,-\frac12)$, $|\nabla f|=\frac{\sqrt5}2$, $\theta=\operatorname{arctg}(-\frac12)\approx-26{,}57^\circ$ (4º cuadrante).

**Simplificar el logaritmo** (Recup. Nov-25 #3): $f=\ln\sqrt{5x^2-4y^2}=\tfrac12\ln(5x^2-4y^2)$, entonces $f'_x=\dfrac{5x}{5x^2-4y^2}$ y $f'_y=\dfrac{-4y}{5x^2-4y^2}$. En $P(4,5)$ el denominador vale $-20$: $\nabla f=(-1,1)$, nulas en $45^\circ$ y $225^\circ$, máximo $\sqrt2$. ⚠️ Estrictamente $P$ no está en el dominio (radicando $-20<0$); el profe deriva igual de forma **formal**.

**Ejemplo 3D con vector $\overrightarrow{MN}$ y cosenos directores** (2S2 Jun-24 #3): $u=z^3-x^2y$, $M(1,6,2)$, $N(4,10,14)$.
- $\overrightarrow{MN}=(3,4,12)$, $|\overrightarrow{MN}|=13$, cosenos directores $\left(\frac3{13},\frac4{13},\frac{12}{13}\right)$.
- $\nabla u=(-2xy,\,-x^2,\,3z^2)$ en $M$ da $(-12,-1,12)$.

$$\frac{\partial u}{\partial s}=\frac{-12\cdot3-1\cdot4+12\cdot12}{13}=\frac{104}{13}=8$$

- Módulo: $|\nabla u|=\sqrt{144+1+144}=17$. Cosenos directores del gradiente: $-\frac{12}{17},\,-\frac1{17},\,\frac{12}{17}$.
- **Verificar con la propiedad del gradiente:** $\cos\varphi=\hat\nabla\cdot\hat s=-\frac{12}{17}\cdot\frac3{13}-\frac1{17}\cdot\frac4{13}+\frac{12}{17}\cdot\frac{12}{13}=\frac8{17}$, y entonces:

$$|\nabla u|\cos\varphi=17\cdot\frac8{17}=8$$

Coincide ($\varphi\approx61{,}9^\circ$). El profe no desarrolla este inciso c; esta verificación es elaborada para el sitio.

Caso sin parciales: $f=\sqrt{x^2+y^2}$ en el origen vale $\lim_{h\to0^+}\frac{h}{h}=1$ en **toda** dirección, pero no existen $f'_x,f'_y$: ahí el gradiente no sirve y hay que ir por definición.

## Errores frecuentes
- **No normalizar** $\vec v$ (error clásico: da un múltiplo de la respuesta).
- Evaluar el gradiente sin reemplazar el punto, o con el punto equivocado.
- Calcular $\operatorname{arctg}$ sin corregir el **cuadrante** (la calculadora solo da entre $-90^\circ$ y $90^\circ$).
- Confundir el máximo ($\nabla f$) con el valor máximo ($|\nabla f|$): una es dirección, el otro es número.
- Direcciones nulas: son **dos**, perpendiculares a $\nabla f$.
- Dirección dada por dos puntos: usar $\overrightarrow{P_1P_2}$ y no $\overrightarrow{P_2P_1}$.
- Mezclar grados y radianes.
- Si $\nabla f(P)=\vec 0$: la derivada es nula en toda dirección y no hay dirección de máximo.
- Pedir "por definición" y resolver con $f'_x\cos\alpha+f'_y\sin\alpha$ (da el mismo número, pero no es lo que piden).
- Bisectriz del 2º cuadrante: es $135^\circ$ (creciente en $y$), no $-45^\circ$.
- Gradiente sin graficar, sin escala, sin el ángulo o sin las cuatro direcciones (máx, mín y las dos nulas).
- Derivar $\ln\sqrt{u}$ sin simplificar antes: error de factor $\frac12$ más fácil.

## Cómo comprobar el resultado
- $|\vec v_n|=1$.
- Con $\vec v_n=\nabla f/|\nabla f|$ el producto da $|\nabla f|$; con la perpendicular da $0$.
- $\partial z/\partial S$ cae siempre en $[-|\nabla f|,\,|\nabla f|]$.
- Con $\alpha=0^\circ$ da $f'_x$ y con $\alpha=90^\circ$ da $f'_y$.

> **Elaborado para el sitio — verificar con la cátedra:** la tabla de cuadrantes y las propiedades siguen U2 Derivada Direccional p.10-19; el ejemplo con $x^2y$ y los casos por definición con $xy$ y $\sqrt{x^2+y^2}$ son propios. Los de logaritmo, 3D y $\ln\sqrt{\ }$ son de parciales (2S2 Jul-23, 2S2 Jun-24, Recup. Nov-25) y están linkeados.
