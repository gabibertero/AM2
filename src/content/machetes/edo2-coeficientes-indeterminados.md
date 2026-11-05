---
slug: edo2-coeficientes-indeterminados
titulo: "EDO de 2.º orden no homogénea: coeficientes indeterminados"
unidad: U9
orden: 11
ejerciciosOficiales: ["1h10-2026-10-31-a#5", "1r3-2025-11-14#5", "1r7-2025-11-11#5", "1v1-2025-11-13-a#5", "1v1-2025-11-13-b#5", "2s2-2025-11-07-a#5", "2s2-2025-11-07-b#5", "1h9-2026-06-27-a#4", "1h9-2026-06-27-b#4", "recup-1h10-2025-11-08#5", "recup-2025-11-20#4"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/09-ECUACIONES DIFERENCIALES DE ORDEN SUPERIOR2015.pdf, p. 13-19"
  - "teoria/Teorico-practico Rocha-Giordano/15_Ecuaciones Diferenciales de Segundo Orden.pdf, p. 2"
  - "teoria/AM2 Resumen segundo parcial.pdf, p. 30-31"
  - "parciales/2do-parcial/2026-10-31-1H10-A.png, p. 1 (enunciado aportado por Gabi; resolución elaborada para el sitio)"
---
> **Ejercicio 5 del 31/10.** Dividí la tarea en dos: homogénea $y_h$ y particular $y_p$. La respuesta completa es la suma.

## Cómo reconocerlo

$$ay''+by'+cy=f(x),\qquad a,b,c\text{ constantes},\quad a\ne0.$$

La consigna pide coeficientes indeterminados. $f(x)$ está formada por polinomios, exponenciales, senos, cosenos o combinaciones de ellos.

## Pasos cortos

Si todavía no sabés encontrar la homogénea, [abrí el machete de raíces y ecuación característica](/AM2/machetes/edo2-homogenea-coef-constantes/). Ahí se muestra qué escribir para cada tipo de raíz.


1. Copiá la ecuación y marcá $f(x)$, el segundo miembro.
2. Hallá $y_h$ con la ecuación característica.
3. Separá los sumandos de $f(x)$: por ejemplo, $2e^x$ y $1$.
4. Para cada sumando, elegí una propuesta de la tabla.
5. Compará con $y_h$: si la propuesta se repite allí, hay **resonancia** y hay que agregar factores $x$.
6. Escribí $y_p$ sumando las propuestas ya corregidas.
7. Derivá $y_p$ una vez, con regla del producto si hace falta.
8. Derivá otra vez para hallar $y_p''$.
9. Reemplazá las tres expresiones en el lado izquierdo original.
10. Agrupá los términos parecidos: exponenciales con exponenciales, constantes con constantes.
11. Igualá sus coeficientes con los del segundo miembro y despejá $A,B,\ldots$.
12. Reemplazá esos números en $y_p$ y escribí $y=y_h+y_p$.

## Elegí la propuesta

| Segundo miembro | Propuesta antes de revisar resonancia |
|---|---|
| Constante, por ejemplo $1$ | $A$ |
| Recta, por ejemplo $3x+2$ | $Ax+B$ |
| Polinomio de grado $n$ | Polinomio **completo** de grado $n$ |
| $ce^{\alpha x}$ | $Ae^{\alpha x}$ |
| Seno o coseno de $\beta x$ | $A\cos\beta x+B\sin\beta x$; proponé los dos |
| Polinomio por $e^{\alpha x}$ | Polinomio del mismo grado por $e^{\alpha x}$ |
| Suma | Una propuesta por cada grupo y después sumarlas |

**Resonancia, en corto:** si el exponente $\alpha$ es raíz simple de la característica, multiplicá ese grupo por $x$; si es raíz doble, por $x^2$. Para polinomios el exponente es $0$; para seno/coseno, revisá las raíces $\pm i\beta$. Modificá solo el grupo que coincide.

Si hay un polinomio de grado $n$ multiplicando seno/coseno, proponé dos polinomios completos de grado $n$, uno por coseno y otro por seno. Si también hay exponencial, multiplicá ambos por esa exponencial.

## Ejemplo del parcial del 31/10

$$y''-2y'+y=2e^x+1.$$

1. Característica: $(k-1)^2=0$.
2. Homogénea: $y_h=(C_1+C_2x)e^x$.
3. Para $2e^x$, empezarías proponiendo $Ae^x$.
4. Pero $1$ es raíz **doble**: corregí a $Ax^2e^x$.
5. Para el $1$ constante, proponé $B$. No hay raíz $0$, así que no necesita un $x$ extra.
6. La propuesta conjunta es:

$$y_p=Ax^2e^x+B.$$

7. Primera derivada: derivá $x^2$ y también $e^x$:

$$y_p'=A(2x+x^2)e^x.$$

8. Segunda derivada: derivá el paréntesis y después la exponencial:

$$y_p''=A(2+4x+x^2)e^x.$$

9. Reemplazá:

$$y_p''-2y_p'+y_p=A\big[(2+4x+x^2)-2(2x+x^2)+x^2\big]e^x+B.$$

10. Cancelá $4x-4x=0$ y $x^2-2x^2+x^2=0$; queda $2Ae^x+B$.
11. Compará con $2e^x+1$: $2A=2$ y $B=1$, por lo tanto $A=1$, $B=1$.
12. Sumá homogénea y particular:

$$\boxed{y=(C_1+C_2x+x^2)e^x+1}.$$

## Comprobá y evitá estos errores

- $y_p=x^2e^x+1$ debe producir **$2e^x+1$**, no cero, al sustituirla.
- $C_1,C_2$ son constantes libres de la solución general; $A,B$ se calculan y desaparecen de la respuesta.
- No multipliques también el $B$ por $x^2$: la resonancia afectaba solo al grupo exponencial.
- Proponer $Ae^x$ acá falla porque su lado izquierdo se anula. Por eso hacía falta $x^2$.
- **Prueba sin mirar:** escribí la propuesta correcta y sus dos derivadas antes de buscar $A$ y $B$.
