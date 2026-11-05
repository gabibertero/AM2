---
slug: edo-homogenea
titulo: "EDO homogénea de 1.er orden"
unidad: U8
orden: 6
ejerciciosOficiales: ["1h9-2026-06-27-a#3", "recup-2025-11-20#3"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/08-ECUACIONES DIFERENCIALES 2015.pdf, p. 4-6"
  - "teoria/Teorico-practico Rocha-Giordano/14_Ecuaciones Diferenciales de Primer Orden.pdf, p. 1"
  - "teoria/AM2 Resumen segundo parcial.pdf, p. 22"
---
> **Tema A de junio de 2026.** «Homogénea de primer orden» es un método distinto de la homogénea de segundo orden. Acá el cambio es $y=ux$.

## Cómo reconocerlo

Despejá $y'$. Si queda una función del cociente $y/x$, probá este método. Por ejemplo:

$$y'=\frac{2y^2}{x^2+2xy}=\frac{2(y/x)^2}{1+2(y/x)}.$$

La segunda igualdad sale de dividir numerador y denominador por $x^2$ en un intervalo donde $x\ne0$.

## Pasos cortos

1. Juntá los términos con $y'$ y despejá la derivada.
2. Dividí por la potencia de $x$ necesaria para ver $y/x$.
3. Escribí $u=y/x$, es decir $y=ux$.
4. Derivá el producto: $y'=u+xu'$. **No es solamente $xu'$.**
5. Reemplazá $y/x$ por $u$ y $y'$ por $u+xu'$.
6. Despejá $xu'$.
7. Escribí $u'=du/dx$ y separá: expresiones de $u$ con $du$, expresiones de $x$ con $dx$.
8. Integrá ambos lados y usá una constante $C$.
9. Reemplazá $u$ por $y/x$.
10. Revisá las soluciones que pudiste perder al dividir por $u$ u otra expresión.

## Ejemplo de junio de 2026

$$2y^2-x^2y'-2xyy'=0.$$

1. Agrupá: $(x^2+2xy)y'=2y^2$.
2. Despejá: $y'=2y^2/(x^2+2xy)$.
3. Usá $y=ux$ y $y'=u+xu'$:

$$u+xu'=\frac{2u^2}{1+2u}.$$

4. Restá $u$ usando el mismo denominador:

$$xu'=\frac{2u^2-u(1+2u)}{1+2u}=-\frac{u}{1+2u}.$$

5. Si $u\ne0$, separá y distribuí:

$$\left(\frac1u+2\right)du=-\frac{dx}{x}.$$

6. Integrá término a término:

$$\ln|u|+2u=-\ln|x|+C.$$

7. Reemplazá $u=y/x$ y sumá $\ln|x|$:

$$\boxed{\ln|y|+\frac{2y}{x}=C}.$$

Usamos $\ln|y/x|+\ln|x|=\ln|y|$. Esta expresión trabaja en intervalos donde las operaciones anteriores están definidas, con $x\ne0$ e $y\ne0$.

8. Revisá lo perdido al dividir por $u$: **$y=0$ también resuelve la ecuación original**. Escribilo aparte.

## Comprobá y evitá estos errores

- Derivando la solución implícita:

$$\frac{y'}y+\frac{2y'}x-\frac{2y}{x^2}=0.$$

- Multiplicá por $x^2y$: $x^2y'+2xyy'-2y^2=0$, la original cambiada de signo.
- No confundas «misma potencia total» con que todos los términos tengan el mismo exponente de $x$.
- Conservá el módulo en el logaritmo, salvo que estés trabajando explícitamente con $y>0$.
- **Prueba sin mirar:** reconstruí $y'=u+xu'$ antes de despejar nada más.
