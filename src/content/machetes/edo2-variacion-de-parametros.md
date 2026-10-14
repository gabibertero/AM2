---
slug: edo2-variacion-de-parametros
titulo: "EDO de 2.º orden: variación de parámetros"
unidad: U9
orden: 12
ejerciciosOficiales: []
fuentes:
  - "teoria/Apuntes Ing. Monllor/09-ECUACIONES DIFERENCIALES DE ORDEN SUPERIOR2015.pdf, p. 20-22"
  - "teoria/Teorico-practico Rocha-Giordano/15_Ecuaciones Diferenciales de Segundo Orden.pdf, p. 2 (solo la menciona)"
---

> No aparece en los parciales prácticos oficiales relevados. Está en la teoría (Monllor 09); es el método de respaldo si la cátedra lo pide.

## Cómo reconocerlo
- $y''+py'+qy=f(x)$ donde $f$ **no** tiene la forma de polinomio/exponencial/seno/coseno (ej. $\tan x$, $\ln x$, $\dfrac1x$) o si el enunciado pide "por variación de los parámetros".
- Sirve en cualquier caso en que se conozca $y_h$.

## Qué necesitás antes
- $y_h=C_1y_1+C_2y_2$ resuelta, con $y_1,y_2$ independientes.
- Wronskiano $W(y_1,y_2)=y_1y_2'-y_2y_1'\ne0$.
- Ecuación en forma estándar (coeficiente $1$ en $y''$).
- Saber integrar $u'$ y $v'$.

## Pasos
1. Resolver la homogénea: $y_1,y_2$.
2. Calcular $W=y_1y_2'-y_2y_1'$.
3. Proponer $y_p=u(x)\,y_1+v(x)\,y_2$.
4. Plantear el sistema (con la condición $u'y_1+v'y_2=0$):
   $u'y_1+v'y_2=0$ y $u'y_1'+v'y_2'=f$.
5. Resolver: $u'=-\dfrac{y_2f}{W}$, $v'=\dfrac{y_1f}{W}$.
6. Integrar $u'$ y $v'$ (constantes $=0$, basta una solución particular).
7. Armar $y_p=uy_1+vy_2$ y $y=y_h+y_p$.

## Fórmulas clave
$$u'=-\frac{y_2\,f(x)}{W(y_1,y_2)},\qquad v'=\frac{y_1\,f(x)}{W(y_1,y_2)},\qquad y_p=u\,y_1+v\,y_2$$
- $u,v$: los "parámetros" $C_1,C_2$ convertidos en funciones de $x$.
- $f$: segundo miembro de la ecuación estándar.
- $W$: Wronskiano; nunca $0$ si las soluciones son independientes.
- Ejemplo de la fuente: $y''+7y'=e^{7x}$ ($y_1=1,\ y_2=e^{-7x}$, $W=-7e^{-7x}$) da $y_p=\tfrac1{98}e^{7x}$.

- Con $\tan x$: $y''+y=\tan x$, $y_1=\cos x,\ y_2=\sin x,\ W=1$. $u'=-\sin x\tan x=-\frac{\sin^2x}{\cos x}$, $v'=\sin x$. Integrando, $u=\sin x-\ln|\sec x+\tan x|$, $v=-\cos x$ y $y_p=-\cos x\,\ln|\sec x+\tan x|$.
- Si $y_h$ es complejo: $y_1=e^{\alpha x}\cos\beta x,\ y_2=e^{\alpha x}\sin\beta x$, $W=\beta e^{2\alpha x}$.

## Por qué funciona
Se busca una $y_p$ con la forma de $y_h$ pero con $C_1,C_2$ variables. Como se introducen dos funciones desconocidas y una sola ecuación, se impone una condición extra ($u'y_1+v'y_2=0$) que evita derivadas segundas de $u,v$. El sistema resultante tiene solución única porque su determinante es el Wronskiano.

## Errores frecuentes
- Olvidar pasar a forma estándar (si hay coeficiente delante de $y''$, $f$ cambia).
- Signo en $u'$: lleva menos.
- Confundir el orden $y_1,y_2$ en $W$ (cambia el signo de $W$ y de todo lo demás).
- Agregar constantes de integración a $u$ y $v$ (no hace falta, ya están en $y_h$).
- Integrar mal $u'$ o $v'$ (pueden ser integrales no inmediatas).

## Cómo comprobar el resultado
- Reemplazar $y_p$ en la ecuación original: debe dar $f$.
- Comprobar $u'y_1+v'y_2=0$.
- Si $f$ era de tipo "polinomio/exponencial", comparar con coeficientes indeterminados.

> **Elaborado para el sitio — verificar con la cátedra:** no hay ejercicios oficiales; el ejemplo y la fórmula salen de Monllor 09 p. 20-22; la advertencia de forma estándar es propia.
