---
slug: curvilinea-por-definicion
titulo: "Integral curvilínea por definición"
unidad: U5
orden: 3
ejerciciosOficiales: ["1h10-2026-10-31-a#3", "1r3-2025-11-14#3", "1r7-2025-11-11#3", "1v1-2025-11-13-a#3", "1v1-2025-11-13-b#3", "2s2-2025-11-07-a#3", "2s2-2025-11-07-b#3", "1h9-2026-06-27-a#2", "1h9-2026-06-27-b#2", "recup-1h9-2025-07-05#2", "recup-1h10-2025-11-08#3", "recup-2025-11-20#2"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/06-INTEGRALES CURVILINEAS 2015.pdf, p. 2-5"
  - "teoria/Teorico-practico Rocha-Giordano/13_Integrales curvilíneas.pdf, p. 1"
  - "teoria/AM2 Resumen segundo parcial.pdf, p. 15-17"
  - "parciales/2do-parcial/2026-10-31-1H10-A.png, p. 1 (enunciado aportado por Gabi; resolución elaborada para el sitio)"
---
> **Prioridad alta.** Si dice «por definición», tenés que integrar el campo sobre **cada tramo**. Green sirve después como verificación, si la consigna lo pide.

## Cómo reconocerlo

Te dan un campo $F(x,y)=P(x,y)\,i+Q(x,y)\,j$ y una trayectoria. $P$ es lo que acompaña a $i$; $Q$, lo que acompaña a $j$.

**Parametrizar** significa escribir las coordenadas de un punto de la curva usando una sola letra, por ejemplo $t$: $x=x(t)$, $y=y(t)$.

## Pasos cortos

1. Copiá $P$ y $Q$ por separado.
2. Hallá los puntos donde se cortan las curvas. Reemplazá una ecuación en la otra.
3. Verificá cada punto en las dos ecuaciones originales.
4. Dibujá qué tramo va de un punto al otro y cuál vuelve.
5. Respetá el sentido indicado. En sentido antihorario, la región queda a tu **izquierda** al caminar por el borde.
6. Si no indican sentido, **declará tu elección**: «adopto orientación antihoraria». El valor cambia de signo si se recorre al revés.
7. En cada tramo elegí $x=t$ o $y=t$, según la ecuación más simple.
8. Derivá ambas coordenadas: $dx=x'(t)dt$, $dy=y'(t)dt$.
9. Reemplazá **todas** las $x$ e $y$ de $P$ y $Q$ por sus expresiones en $t$.
10. Formá $P(x(t),y(t))x'(t)+Q(x(t),y(t))y'(t)$.
11. Integrá entre el valor de $t$ al **salir** y al **llegar**. Pueden estar en orden descendente.
12. Sumá los resultados de todos los tramos.

$$I_C=\sum_{\rm tramos}\int_{t_{\rm salida}}^{t_{\rm llegada}}\big[P(x(t),y(t))x'(t)+Q(x(t),y(t))y'(t)\big]dt.$$

## Ejemplo del parcial del 31/10

**Ejercicio 3:** $F=(x-y,x+y)$, con $y=x$ y $x=y^2-2$.

La foto **no especifica orientación**. Para este ejemplo elegimos antihoraria y lo escribimos antes de calcular.

1. En la recta, $x=y$. Sustituí en la parábola: $y=y^2-2$.
2. Pasá todo a un lado: $y^2-y-2=0=(y-2)(y+1)$.
3. Sale $y=2$ o $y=-1$. Como $x=y$, los puntos son $A=(-1,-1)$ y $B=(2,2)$.
4. Entre esos valores de $y$, la parábola $x=y^2-2$ está a la izquierda y la recta $x=y$ a la derecha.
5. Para dejar la región a la izquierda, **subí por la recta** de $A$ a $B$ y **bajá por la parábola** de $B$ a $A$.

**Tramo 1: recta, de $A$ a $B$.**

6. Elegí $x=t$, $y=t$, con $-1\le t\le2$.
7. Derivá: $dx=dt$, $dy=dt$.
8. Sustituí: $P=t-t=0$, $Q=t+t=2t$.

$$I_1=\int_{-1}^{2}(0+2t)dt=[t^2]_{-1}^{2}=4-1=3.$$

**Tramo 2: parábola, de $B$ a $A$.**

9. Elegí $y=t$, $x=t^2-2$. Esta vez $t$ va **de $2$ a $-1$**.
10. Derivá: $dx=2t\,dt$, $dy=dt$.
11. Sustituí: $P=t^2-t-2$, $Q=t^2+t-2$.
12. Multiplicá por los diferenciales y sumá:

$$(t^2-t-2)2t+(t^2+t-2)=2t^3-t^2-3t-2.$$

13. Integrá y evaluá:

$$I_2=\int_2^{-1}(2t^3-t^2-3t-2)dt=\left[\frac{t^4}{2}-\frac{t^3}{3}-\frac{3t^2}{2}-2t\right]_2^{-1}=\frac43-\left(-\frac{14}{3}\right)=6.$$

14. Sumá: $I_C=3+6$.

$$\boxed{I_C=9\quad\text{en sentido antihorario}}$$

En sentido horario, el resultado es $-9$.

## Si aparece otra curva

- Recta de $A=(a,b)$ a $B=(c,d)$: $x=a+(c-a)t$, $y=b+(d-b)t$, de $0$ a $1$.
- Circunferencia de radio $R$: $x=R\cos t$, $y=R\sin t$. Los ángulos de los puntos inicial y final fijan los límites.
- Elipse: $x=a\cos t$, $y=b\sin t$. Derivá las dos coordenadas antes de reemplazar.
- Si ya dan $x(t)$ e $y(t)$, como una cicloide, usalas directamente: no inventes otra parametrización.

## Comprobá y evitá estos errores

- El [machete de Green](../teorema-de-green/) verifica el mismo ejemplo y da $9$.
- Al terminar un tramo tenés que estar en el punto donde empieza el siguiente.
- No copies $dy=dx$ en la parábola: acá $dx=2t\,dt$ y $dy=dt$.
- No inviertas solo los límites sin reconocer que cambia el signo.
- **Prueba sin mirar:** escribí la tabla «tramo, coordenadas, salida, llegada, $dx$, $dy$» antes de integrar.
