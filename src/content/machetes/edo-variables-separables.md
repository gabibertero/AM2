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
> **Herramienta interna.** Aparece dentro de lineales, homogéneas y Bernoulli; no es un tipo aislado en los prácticos oficiales relevados.

## Cómo reconocerlo

Podés dejar todas las expresiones de $y$ con $dy$ y todas las de $x$ con $dx$:

$$y'=a(x)b(y)\quad\Longrightarrow\quad\frac{dy}{b(y)}=a(x)dx.$$

## Pasos cortos

1. Reemplazá $y'$ por $dy/dx$.
2. Multiplicá por $dx$.
3. Dividí por la expresión de $y$, si no es cero.
4. Integrá el lado con $y$ respecto de $y$ y el otro respecto de $x$.
5. Agregá **una sola constante $C$**: las dos constantes se pueden juntar.
6. Despejá $y$ si se puede.
7. Si hay dato inicial, reemplazalo para encontrar $C$.
8. Comprobá aparte los valores que anulaban el divisor del paso 3.

## Ejemplo para practicar la separación

Este ejemplo es didáctico, no un enunciado oficial: $y'=2xy$.

1. $dy/dx=2xy$.
2. $dy=2xy\,dx$.
3. Para $y\ne0$: $dy/y=2x\,dx$.
4. Integrá: $\ln|y|=x^2+C$.
5. Aplicá exponencial y reuní la constante: $y=Ke^{x^2}$.
6. El valor $y=0$ perdido al dividir también sirve; está incluido al permitir $K=0$.

$$\boxed{y=Ke^{x^2},\qquad K\in\mathbb R}$$

Si además $y(0)=3$, reemplazá: $3=Ke^0=K$. La solución particular es $y=3e^{x^2}$.

## Integrales pequeñas que vas a usar

- $\int x^n dx=x^{n+1}/(n+1)+C$, con $n\ne-1$.
- $\int dx/x=\ln|x|+C$.
- $\int e^{ax}dx=e^{ax}/a+C$, con $a\ne0$.
- $\int 2x/(1+x^2)\,dx=\ln(1+x^2)+C$, usando $w=1+x^2$, $dw=2x\,dx$.

Son cuentas necesarias para los ejercicios, no una unidad teórica para estudiar aparte.

## Comprobá y evitá estos errores

- Derivá $Ke^{x^2}$: da $2xKe^{x^2}=2xy$.
- No dejes $x$ mezclada con $dy$ si todavía no separaste.
- Si dividís por $y$, comprobá $y=0$ en la ecuación original.
- $\ln|y|$ lleva módulo, y $e^{C}$ no representa por sí solo todas las constantes reales: al despejar se incorpora también el signo.
- **Prueba sin mirar:** separá $v'+8v=0$ y obtené $dv/v=-8dx$.
