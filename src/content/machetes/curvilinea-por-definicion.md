---
slug: curvilinea-por-definicion
titulo: "Integral curvilínea por definición"
unidad: U5
orden: 3
ejerciciosOficiales: ["1r3-2025-11-14#3", "1r7-2025-11-11#3", "1v1-2025-11-13-a#3", "1v1-2025-11-13-b#3", "2s2-2025-11-07-a#3", "2s2-2025-11-07-b#3", "1h9-2026-06-27-a#2", "1h9-2026-06-27-b#2", "recup-1h9-2025-07-05#2", "recup-1h10-2025-11-08#3", "recup-2025-11-20#2"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/06-INTEGRALES CURVILINEAS 2015.pdf, p. 2-5"
  - "teoria/Teorico-practico Rocha-Giordano/13_Integrales curvilíneas.pdf, p. 1"
  - "teoria/AM2 Resumen segundo parcial.pdf, p. 15-17"
---

## Cómo reconocerlo
- "Calcular la integral curvilínea por la trayectoria cerrada recorrida en sentido antihorario (+)" o "calcular **por definición**".
- Trayectoria dada por dos o más curvas ($C_1$, $C_2$, parábolas, rectas, circunferencia) que se cortan y encierran una región.
- "Trabajo realizado por el campo" a lo largo de una curva paramétrica (cicloide en recup-2025-11-20).

## Qué necesitás antes
- Campo $F=(P,Q)=P\,\vec i+Q\,\vec j$ continuo sobre la curva.
- Curva suave **a trozos**: se integra tramo por tramo y se suma.
- **Sentido positivo = antihorario** (convención de la cátedra). Sin indicación, se toma el antihorario.
- Puntos de intersección de las curvas: son los extremos de cada tramo.

## Pasos
1. **Graficar** las curvas y hallar las intersecciones (igualar y resolver). Si las ecuaciones son simétricas (p. ej. $y=x^2-x$ y $x=y^2-y$), restalas: queda $(x-y)(x+y)=0$ y se factoriza fácil. Verificá cada punto en **las dos** ecuaciones.
2. Marcar con flechas el recorrido antihorario. **Regla general:** al recorrer la curva, la región encerrada queda **a la izquierda**. Con esto se orienta cualquier tramo, sea $y=f(x)$ o $x=g(y)$.
3. **Parametrizar cada tramo** respetando esa dirección:
   - $y=f(x)$: $x=t,\ y=f(t)$. Si la región queda **arriba** del tramo, $x$ crece; si queda **abajo**, $x$ decrece (con región entre dos curvas: la inferior va de izquierda a derecha, la superior al revés).
   - $x=g(y)$: $y=t,\ x=g(t)$. Si la región queda a la izquierda del tramo, $y$ **sube**; si queda a su derecha, $y$ **baja**. Ojo: una rama $x=g(y)$ no es "la de arriba" ni "la de abajo": decidí con el gráfico.
   - Circunferencia $x^2+y^2=R^2$: $x=R\cos t,\ y=R\sin t$. Los límites de $t$ salen de los ángulos de los extremos del arco (ej.: puntos $(1,1)$ y $(-1,1)$ en radio $\sqrt2$: $t$ de $\pi/4$ a $3\pi/4$). Alternativa válida: usar $y=\sqrt{R^2-x^2}$ como tramo $y=f(x)$.
   - Elipse $\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$: $x=a\cos t,\ y=b\sin t$, $t\in[0,2\pi]$ (completa) o el arco que corresponda; para la circunferencia es $a=b=R$.
   - Semicírculo / sector: los extremos del arco dan $t_1,t_2$ (los ángulos de los puntos); el tramo recto que cierra se parametriza aparte.
   - Recta: $x=x_0+(x_1-x_0)t,\ y=y_0+(y_1-y_0)t$, $0\le t\le1$ (de $A$ a $B$).
4. Calcular $dx=x'(t)dt$, $dy=y'(t)dt$ y sustituir en $P\,dx+Q\,dy$.
5. Integrar en $t$ cada tramo.
6. **Sumar los tramos.**

## Fórmulas clave
$$\oint_C P\,dx+Q\,dy=\sum_i\int_{t_i}^{t_f}\Big[P(x(t),y(t))\,x'(t)+Q(x(t),y(t))\,y'(t)\Big]dt$$
- $P\,dx+Q\,dy=F\cdot d\vec r$: trabajo de la fuerza $F$ a lo largo de la curva.
- $x'(t),\,y'(t)$: derivadas de la parametrización (vector tangente).
- Si $C$ es $y=f(x)$: $\int_a^b[P(x,f)+Q(x,f)\,f'(x)]\,dx$.
- Invertir el sentido cambia el signo; partir la curva en puntos intermedios no cambia el valor.

## Por qué funciona
La integral curvilínea es el límite de sumas $\sum F(A_i)\cdot\Delta\vec s_i$ (trabajo por cada pedacito de arco). Al parametrizar, cada $\Delta\vec s$ se vuelve $\vec r'(t)\,dt$ y todo queda como una integral definida común.

## Errores frecuentes
- Recorrer algún tramo al revés (el cierre de la curva debe ser antihorario).
- Olvidar el $dy=f'(x)\,dx$ (o el $dx$ si la curva es $x=g(y)$).
- Poner los límites de $t$ al revés en el tramo de arriba (debe ir de derecha a izquierda).
- Usar mal las intersecciones: verificalas en **las dos** ecuaciones.
- Perder el signo del tramo recorrido hacia atrás.
- "Trayectoria superior" en un enunciado significa el arco superior de la circunferencia: ubicá bien los extremos.
- Dejar sin sumar algún tramo (o contarlo dos veces).

## Cómo comprobar el resultado
- Hacelo también por **Green** (machete siguiente): deben dar igual.
- Si $F$ es conservativo ($Q_x=P_y$), la cerrada da $0$.
- Cuidado: una integral cerrada nula no prueba que $F$ sea conservativo. Calculá $Q_x-P_y$ para decidir.
- Revisá signo y orientación en el gráfico (antihorario deja la región a la izquierda).

> **Elaborado para el sitio — verificar con la cátedra:** la regla "región a la izquierda" es consecuencia del sentido antihorario y no figura textual en las fuentes; las parametrizaciones de elipse y arcos son estándar.
