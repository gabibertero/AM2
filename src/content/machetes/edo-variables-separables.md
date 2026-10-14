---
slug: edo-variables-separables
titulo: "EDO de variables separables"
unidad: U8
orden: 5
ejerciciosOficiales: []
fuentes:
  - "teoria/Apuntes Ing. Monllor/08-ECUACIONES DIFERENCIALES 2015.pdf, p. 3"
  - "teoria/Teorico-practico Rocha-Giordano/14_Ecuaciones Diferenciales de Primer Orden.pdf, p. 1"
  - "teoria/AM2 Resumen segundo parcial.pdf, p. 21"
---

> Este tipo no aparece como ejercicio de los parciales prácticos oficiales relevados. Se usa como **paso interno** de homogéneas, lineales ($y=u\cdot v$) y Bernoulli.

## Cómo reconocerlo
- Se puede escribir $f(x)\,dx+g(y)\,dy=0$: cada variable queda de su lado.
- Forma típica: $y'=h(x)\,k(y)$ (producto de una función de $x$ por una de $y$).

## Qué necesitás antes
- $f$ y $g$ continuas e integrables en el intervalo de trabajo.
- Saber las integrales inmediatas (sin tabla en el parcial).
- Si dividís por $k(y)$, controlá aparte los $y$ con $k(y)=0$.

## Pasos
1. Pasar $y'=\dfrac{dy}{dx}$ y agrupar: todo lo de $y$ con $dy$, todo lo de $x$ con $dx$.
2. Integrar ambos miembros.
3. Juntar las constantes en una sola, $C$.
4. Si hay condición inicial $y(x_0)=y_0$, reemplazar y despejar $C$ (solución particular).
5. Despejar $y$ si se puede; si no, dejar la solución implícita.

## Fórmulas clave
$$f(x)\,dx+g(y)\,dy=0\ \Longrightarrow\ \int f(x)\,dx+\int g(y)\,dy=C$$
- $C$: constante de integración (una sola, la de los dos miembros).
- Solución general: familia de curvas. Solución particular: una curva de la familia.
- Ejemplo con solución perdida: $y'=y(1-y)$. Separando, $\int\frac{dy}{y(1-y)}=\int dx\Rightarrow\ln\left|\frac y{1-y}\right|=x+C\Rightarrow y=\frac1{1+Ce^{-x}}$. Las constantes $y=0$ e $y=1$ se perdieron al dividir por $y(1-y)$ y también son solución ($y=0$ aparece con $C\to\infty$).
- Ejemplo de la fuente: $x\,dx+y\,dy=0\Rightarrow x^2+y^2=C^2$ (circunferencias); con $y(4)=3$ resulta $x^2+y^2=25$.

## Por qué funciona
La ecuación dice que la suma de dos diferenciales vale $0$: $d\big(F(x)+G(y)\big)=0$. Entonces $F(x)+G(y)$ es constante y esa constante es la familia de soluciones.

## Errores frecuentes
- Poner una constante en cada miembro (con una alcanza).
- Perder soluciones constantes al dividir por una expresión de $y$.
- Integrar $\int\frac{dy}{y}$ y escribir $\ln y$ sin módulo: $\ln|y|$.
- Mezclar $x$ e $y$ en un mismo miembro sin haber separado de verdad.
- Despejar $y$ con raíces cuadradas y perder el $\pm$.

## Cómo comprobar el resultado
- Derivá implícitamente la solución y verificá que reproduce la ecuación original.
- Reemplazá la condición inicial en la solución particular.
- Fijate que las soluciones perdidas (si hay) estén contempladas.

> **Elaborado para el sitio — verificar con la cátedra:** las observaciones sobre soluciones perdidas y el módulo en el logaritmo no figuran textuales en las fuentes.
