---
slug: teorema-de-green
titulo: "Teorema de Green"
unidad: U5
orden: 4
ejerciciosOficiales: ["1h10-2026-10-31-a#3", "1r3-2025-11-14#3", "1r7-2025-11-11#3", "1v1-2025-11-13-a#3", "1v1-2025-11-13-b#3", "2s2-2025-11-07-a#3", "2s2-2025-11-07-b#3", "recup-1h10-2025-11-08#3"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/06-INTEGRALES CURVILINEAS 2015.pdf, p. 6-10 (Green: p. 9)"
  - "teoria/Teorico-practico Rocha-Giordano/13_Integrales curvilíneas.pdf, p. 3"
  - "teoria/AM2 Resumen segundo parcial.pdf, p. 18-19"
  - "parciales/2do-parcial/Modelo P2 teorico.pdf, p. 1 (enunciado de la pregunta)"
  - "parciales/2do-parcial/2026-10-31-1H10-A.png, p. 1 (enunciado aportado por Gabi; resolución elaborada para el sitio)"
---
> **Para verificar una curvilínea cerrada.** Si el ejercicio pide definición **y** Green, entregá ambos cálculos. Este machete explica cómo usar la fórmula, sin demostraciones.

## Cómo reconocerlo

Dice «verificar por Green» o «calcular aplicando Green». La curva tiene que estar cerrada. Para usar este procedimiento, el campo y sus derivadas deben ser continuos en toda la región y su borde; los campos polinómicos de estos ejemplos lo cumplen.

## Pasos cortos

1. Separá $P$ y $Q$ del campo $F=(P,Q)$.
2. Derivá $Q$ respecto de $x$: escribí $Q_x$. Durante esa derivada, $y$ es constante.
3. Derivá $P$ respecto de $y$: escribí $P_y$. Durante esa derivada, $x$ es constante.
4. Restá **$Q_x-P_y$**, en ese orden.
5. Reutilizá el dibujo y las intersecciones de la curvilínea.
6. Describí la región por franjas. Si las curvas vienen como $x=f(y)$, suele convenir integrar primero en $x$.
7. Escribí el límite izquierdo y el derecho de cada franja. Después, los valores inferior y superior de $y$.
8. Integrá la expresión del paso 4 sobre esa región.
9. Si el recorrido es horario, cambiá el signo.
10. Compará con la suma de tramos por definición.

$$\oint_C P\,dx+Q\,dy=\iint_D(Q_x-P_y)\,dA\qquad\text{(sentido antihorario)}.$$

## Ejemplo del parcial del 31/10

**Ejercicio 3:** $P=x-y$, $Q=x+y$, entre la recta $x=y$ y la parábola $x=y^2-2$. Adoptamos sentido antihorario porque la foto no especifica orientación.

1. Derivá $Q=x+y$ en $x$: $Q_x=1$.
2. Derivá $P=x-y$ en $y$: $P_y=-1$.
3. Restá: $Q_x-P_y=1-(-1)=2$.
4. Las intersecciones son $(-1,-1)$ y $(2,2)$: $-1\le y\le2$.
5. A la izquierda está $x=y^2-2$; a la derecha, $x=y$.
6. Escribí primero los límites de $x$ y después los de $y$:

$$I=\int_{-1}^{2}\int_{y^2-2}^{y}2\,dx\,dy.$$

7. Integrá en $x$: la primitiva de $2$ es $2x$.

$$[2x]_{y^2-2}^{y}=2y-2(y^2-2)=2y-2y^2+4.$$

8. Integrá en $y$:

$$I=\left[y^2-\frac{2y^3}{3}+4y\right]_{-1}^{2}=\frac{20}{3}-\left(-\frac73\right)=\boxed{9}.$$

La [cuenta por definición](../curvilinea-por-definicion/) da $3+6=9$: coinciden. En sentido horario, ambas dan $-9$.

## Si conviene usar polares

1. Cambiá $x=r\cos\theta$ e $y=r\sin\theta$ en $Q_x-P_y$.
2. Multiplicá por el jacobiano $r$.
3. Fijá radio y ángulos de la región encerrada.
4. Integrá $(Q_x-P_y)r$ en $dr\,d\theta$.

## Comprobá y evitá estos errores

- No es $P_y-Q_x$: esa resta cambia el signo.
- No apliques Green a un arco abierto como si ya encerrara una región.
- En este ejemplo, el integrando es $2$: la integral debe ser dos veces el área, no el área sola.
- El orden $dx\,dy$ exige límites de $x$ adentro y de $y$ afuera.
- Una integral cerrada igual a cero no alcanza para afirmar que el campo es conservativo.
- **Prueba sin mirar:** obtené las dos derivadas y señalá «izquierda» y «derecha» en un dibujo.
