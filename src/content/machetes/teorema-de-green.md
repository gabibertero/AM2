---
slug: teorema-de-green
titulo: "Teorema de Green"
unidad: U5
orden: 4
ejerciciosOficiales: ["1r3-2025-11-14#3", "1r7-2025-11-11#3", "1v1-2025-11-13-a#3", "1v1-2025-11-13-b#3", "2s2-2025-11-07-a#3", "2s2-2025-11-07-b#3", "recup-1h10-2025-11-08#3", "modelo-teorico#1"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/06-INTEGRALES CURVILINEAS 2015.pdf, p. 6-10 (Green: p. 9)"
  - "teoria/Teorico-practico Rocha-Giordano/13_Integrales curvilíneas.pdf, p. 3"
  - "teoria/AM2 Resumen segundo parcial.pdf, p. 18-19"
  - "parciales/2do-parcial/Modelo P2 teorico.pdf, p. 1 (enunciado de la pregunta)"
---

## Cómo reconocerlo
- "Verificar el cálculo aplicando la fórmula de Green" o "realizar planteo y desarrollo por Teorema de Green (en cartesianas / en polares)".
- Curva cerrada (dos o más tramos) que encierra una región $D$ del plano.
- Aparece junto con la integral curvilínea por definición: una sirve de control de la otra.

## Qué necesitás antes
- $L$ curva **cerrada, simple, suave a trozos**, orientada **antihorario** (positiva).
- $P,Q$ continuas con derivadas parciales continuas en $D$ y en su borde.
- $D$ la región encerrada por $L$ (sin "agujeros" no encerrados por la curva).
- Si el sentido es horario, hay que cambiar el signo del resultado.

## Pasos
1. Identificar $P$ y $Q$ ($F=P\,\vec i+Q\,\vec j$).
2. Calcular $\dfrac{\partial Q}{\partial x}$ y $\dfrac{\partial P}{\partial y}$ y restar: $Q_x-P_y$.
3. **Graficar $D$** e identificar las intersecciones de las curvas.
4. Elegir sistema:
   - **Cartesianas:** $a\le x\le b,\ f_{inf}(x)\le y\le f_{sup}(x)$ (o al revés con $x(y)$).
   - **Polares:** si $D$ es círculo/sector/anillo; reemplazar $x=r\cos\theta$, $y=r\sin\theta$ en $Q_x-P_y$ y agregar el factor $r$.
5. Integrar la doble integral.
6. Comparar con el valor por definición.

## Fórmulas clave
$$\oint_L P\,dx+Q\,dy=\iint_D\Big(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\Big)\,dx\,dy$$

$$\text{En polares: } \iint_D \big(Q_x-P_y\big)\big|_{x=r\cos\theta,\ y=r\sin\theta}\; r\,dr\,d\theta$$
- $Q_x-P_y$: "circulación por unidad de área" (rotacional escalar de $F$).
- $D$: región plana encerrada por $L$.
- Sentido horario: $\oint_L=\iint_D(P_y-Q_x)\,dx\,dy$ (Monllor 06 p. 9).
- Área de $D$: con $Q_x-P_y=1$, p. ej. $\text{Área}=\tfrac12\oint_L(x\,dy-y\,dx)$ (Rocha 13 p. 2). Para la elipse da $\pi ab$.

## Por qué funciona
Se demuestra para regiones tipo I y II: $-\iint P_y\,dA$ se reduce con el teorema fundamental del cálculo a una integral de $P\,dx$ sobre el borde, y $\iint Q_x\,dA$ a una de $Q\,dy$. Sumar ambas da la fórmula. Para $D$ cualquiera se parte en regiones de ese tipo.

## Errores frecuentes
- Aplicar Green a una curva **no cerrada** (o sin cerrarla con otro tramo).
- Usar $P_y-Q_x$ en lugar de $Q_x-P_y$ (signo).
- Recorrido horario y no cambiar el signo.
- Olvidar el factor $r$ en polares, o no reescribir $Q_x-P_y$ en $r,\theta$.
- Límites mal ordenados: la curva "de arriba" menos la "de abajo".
- Error de signo en las derivadas: $P_y$ es derivar $P$ respecto de $y$ (no $x$).
- **Región no tipo I** respecto de la variable elegida (o curvas que se cruzan fuera de $[a,b]$): el esquema "arriba menos abajo" falla. Dibujá la región completa (puede extenderse a $x<0$ aunque las curvas se corten en $x\ge0$, como en 1h9-2026-06-27-a#2), y o bien **partila** en regiones tipo I, o integrá primero en $dx$ (tipo II: $y_1\le y\le y_2$, $x_{izq}(y)\le x\le x_{der}(y)$).
- Semicírculo (p. ej. $x^2+y^2=2$ con $y=-x$ en 1v1-a#3): hay dos semicírculos posibles; dibujá y fijá $\theta$ según el sentido antihorario de la trayectoria completa; si el enunciado es ambiguo, declaralo.
- Si dan "sin necesidad de obtener el resultado final", alcanza con dejar la integral doble **bien planteada** (integrando y límites).

## Cómo comprobar el resultado
- Debe coincidir con la integral curvilínea por definición.
- Si $Q_x=P_y$ en todo $D$, la integral cerrada da $0$ (verificá).
- Si $Q_x-P_y>0$ en todo $D$, el resultado es positivo con recorrido antihorario.
- Chequeá que $D$ de tu gráfico sea la región encerrada (no su complemento).
- Curva abierta: cerrala con un tramo auxiliar y restá su integral (opcional: los parciales no lo piden).

> **Elaborado para el sitio — verificar con la cátedra:** Enunciado y signos siguen a Monllor 06 p. 9. El comentario de "área" y la verificación por signo son elaborados: verificar con la cátedra.
