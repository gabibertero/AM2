---
slug: edo2-homogenea-coef-constantes
titulo: "EDO de 2.º orden homogénea, coeficientes constantes"
unidad: U9
orden: 10
ejerciciosOficiales: ["1r3-2025-11-14#5", "1r7-2025-11-11#5", "1v1-2025-11-13-a#5", "1v1-2025-11-13-b#5", "2s2-2025-11-07-a#5", "2s2-2025-11-07-b#5", "1h9-2026-06-27-a#4", "1h9-2026-06-27-b#4", "recup-1h10-2025-11-08#5", "recup-2025-11-20#4"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/09-ECUACIONES DIFERENCIALES DE ORDEN SUPERIOR2015.pdf, p. 3 (Wronskiano) y siguientes"
  - "teoria/Teorico-practico Rocha-Giordano/15_Ecuaciones Diferenciales de Segundo Orden.pdf, p. 1"
  - "teoria/AM2 Resumen segundo parcial.pdf, p. 27-29"
---

> En los parciales oficiales no aparece como ejercicio aislado: es el **primer paso** (hallar $y_h$) de los problemas por coeficientes indeterminados. Los ids de arriba son los ejercicios donde se usa como paso.

## Cómo reconocerlo
- $y''+a_1y'+a_2y=0$ con $a_1,a_2$ constantes (o la parte izquierda de una no homogénea).
- "Hallar la solución general / particular para $y(x_0)=\ldots,\ y'(x_0)=\ldots$".

## Qué necesitás antes
- Coeficiente de $y''$ igual a $1$ (si no, dividir).
- Saber resolver una cuadrática (Bhaskara) con raíces reales o complejas.
- Dos soluciones **linealmente independientes** ($W(y_1,y_2)\ne0$).

## Pasos
1. Proponer $y=e^{kx}$: derivar y reemplazar.
2. Sacar la ecuación característica: $k^2+a_1k+a_2=0$.
3. Calcular las raíces $k_1,k_2$ (discriminante $\Delta=a_1^2-4a_2$).
4. Armar la solución según el caso (tabla de abajo).
5. Con condiciones iniciales: usar $y$ e $y'$ para armar un sistema $2\times2$ en $C_1,C_2$.

## Fórmulas clave
| Raíces | Solución general |
|---|---|
| Reales distintas, $k_1\ne k_2$ ($\Delta>0$) | $y=C_1e^{k_1x}+C_2e^{k_2x}$ |
| Reales iguales, $k_1=k_2=k$ ($\Delta=0$) | $y=C_1e^{kx}+C_2\,x\,e^{kx}$ |
| Complejas, $k=\alpha\pm i\beta$ ($\Delta<0$) | $y=e^{\alpha x}\big(C_1\cos\beta x+C_2\sin\beta x\big)$ |

- $\alpha=-a_1/2$: parte real (amortiguamiento). $\beta$: frecuencia, $\beta=\tfrac{\sqrt{4a_2-a_1^2}}2$.
- Wronskiano: $W(y_1,y_2)=y_1y_2'-y_2y_1'$; si $\ne0$ las soluciones son independientes.
- Casos particulares: $y''=0\Rightarrow k=0$ doble, $y=C_1+C_2x$; $y''-a^2y=0\Rightarrow k=\pm a$.

- Ejemplo completo (Rocha 15, ej. 5): $4y''+25y=12y'$, $y(0)=1,\ y'(0)=2$. Estándar: $y''-3y'+\tfrac{25}4y=0$; $k^2-3k+\tfrac{25}4=0$, $\Delta=-16$, $k=\tfrac32\pm2i$, $\alpha=\tfrac32,\ \beta=2$. $y=e^{3x/2}(C_1\cos2x+C_2\sin2x)$; $y(0)=1\Rightarrow C_1=1$; $y'(0)=\tfrac32C_1+2C_2=2\Rightarrow C_2=\tfrac14$.
- Notación: acá $a_1,a_2$ son los coeficientes de $y',y$ (en variación de parámetros se llaman $p,q$).

## Por qué funciona
$e^{kx}$ se reproduce al derivar, así que la ecuación diferencial se vuelve un polinomio en $k$. Cada raíz da una solución; el conjunto de soluciones es un espacio de dimensión $2$. Con raíz doble, $xe^{kx}$ es la segunda solución independiente; con complejas, la fórmula de Euler convierte las exponenciales en seno y coseno.

## Errores frecuentes
- Signo de $a_1$ al calcular raíces: $k=\dfrac{-a_1\pm\sqrt{a_1^2-4a_2}}{2}$.
- Olvidar el factor $x$ en el caso de raíz doble.
- En complejas, poner $e^{\alpha x}$ solo en uno de los términos.
- Confundir $\beta$ con $\beta^2$ (pasa cuando $a_2$ no es $1$).
- No pasar a forma estándar ($4y''+25y=12y'$ → ordenar y dividir por $4$).
- Con condiciones iniciales, derivar la solución general antes de reemplazar $y'(x_0)$.

## Cómo comprobar el resultado
- Reemplazar cada término ($e^{k_1x}$, $e^{k_2x}$, …) en la ecuación: cada uno la satisface.
- Wronskiano distinto de $0$.
- Suma de raíces $=-a_1$ y producto $=a_2$ (Vieta).
- Verificar $y(x_0)$ e $y'(x_0)$ en la solución particular.

> **Elaborado para el sitio — verificar con la cátedra:** la notación de raíces es $k_1,k_2$ (Rocha, Monllor); el resumen de alumno usa otras letras. Los comentarios físicos ($\alpha$, $\beta$) son elaborados.
