---
slug: edo2-coeficientes-indeterminados
titulo: "EDO de 2.º orden no homogénea: coeficientes indeterminados"
unidad: U9
orden: 11
ejerciciosOficiales: ["1r3-2025-11-14#5", "1r7-2025-11-11#5", "1v1-2025-11-13-a#5", "1v1-2025-11-13-b#5", "2s2-2025-11-07-a#5", "2s2-2025-11-07-b#5", "1h9-2026-06-27-a#4", "1h9-2026-06-27-b#4", "recup-1h10-2025-11-08#5", "recup-2025-11-20#4"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/09-ECUACIONES DIFERENCIALES DE ORDEN SUPERIOR2015.pdf, p. 13-19"
  - "teoria/Teorico-practico Rocha-Giordano/15_Ecuaciones Diferenciales de Segundo Orden.pdf, p. 2"
  - "teoria/AM2 Resumen segundo parcial.pdf, p. 30-31"
---

## Cómo reconocerlo
- $y''+a_1y'+a_2y=f(x)$ con $a_1,a_2$ constantes y "por el método de los coeficientes indeterminados".
- $f(x)$ es polinomio, exponencial, seno o coseno, o sumas/productos de estos.
- Si $f$ es otra cosa ($\tan x$, $\ln x$, $1/x$…) este método no sirve: usar variación de parámetros.

## Qué necesitás antes
- $y_h$ ya resuelta (machete de homogénea): hace falta saber las raíces $k$ de la característica.
- Forma estándar con coeficiente $1$ en $y''$.
- Dividir $f(x)$ en términos y proponer una $y_p$ por cada uno.

## Pasos
1. Hallar $y_h=C_1y_1+C_2y_2$.
2. Para **cada término** de $f$, proponer la forma según la tabla.
3. **Chequear resonancia** (abajo): si algún sumando propuesto coincide con una solución de la homogénea, multiplicar ese grupo por $x^s$.
4. Derivar $y_p$ dos veces y reemplazar en la ecuación completa.
5. Igualar coeficientes de cada tipo de término y despejar $A,B,\dots$
6. Armar $y=y_h+y_p$ (solución general).

## Fórmulas clave
| $f(x)$ | $y_p$ propuesta |
|---|---|
| polinomio de grado $n$ | polinomio **completo** de grado $n$ ($A_nx^n+\dots+A_0$) |
| $Ce^{\alpha x}$ | $Ae^{\alpha x}$ |
| $a\sin\beta x$ y/o $b\cos\beta x$ | $A\cos\beta x+B\sin\beta x$ (**ambos** siempre) |
| $P_n(x)\,e^{\alpha x}$ | $Q_n(x)\,e^{\alpha x}$ con $Q_n$ polinomio completo, p. ej. $(Ax+B)e^{2x}$ |
| $P_n(x)\cos\beta x$ y/o $\sin\beta x$ | $(Ax+B)\cos\beta x+(Cx+D)\sin\beta x$: **dos polinomios distintos** (Monllor 09 p. 17) |
| $e^{\alpha x}\cos\beta x$ y/o $\sin\beta x$ | $Ae^{\alpha x}\cos\beta x+Be^{\alpha x}\sin\beta x$ |
| suma | suma de las $y_p$ (superposición) |

- $y=y_h+y_p$: solución general (cátedra); $y_p$ cualquier solución particular.
- **Regla de multiplicar por $x$ (resonancia):** si el exponente/frecuencia del término de $f$ es raíz de la característica (o $0$ en el caso polinomio con raíz $k=0$; $\pm i\beta$ para seno/coseno), la propuesta se multiplica por $x^s$, con $s=1$ si la raíz es simple y $s=2$ si es doble.
- Multiplicar solo el grupo que choca: el resto de $y_p$ no cambia.
- Mini-ejemplo de resonancia (genérico): $y''-3y'+2y=e^x+2x$. Raíces $k=1,2$. $e^x$ choca con $e^{x}$ de $y_h$ ($k=1$ simple): $Axe^x$. El $2x$ no choca ($0$ no es raíz): $Bx+C$. Resulta $y_p=-xe^x+x+\tfrac32$ y $y=C_1e^x+C_2e^{2x}-xe^x+x+\tfrac32$.
- Con $k=0$ raíz: $y''+y'=x$ propone $x\,(Ax+B)$ (polinomio por $x$), y una constante en $f$ propone $Ax$. Con $\pm i$ raíces: $y''+y=\sin x$ propone $x(A\cos x+B\sin x)$ y da $y_p=-\tfrac x2\cos x$.
- Raíz doble ($k=1$ doble): $e^{x}$ en $f$ propone $Ax^2e^x$.

## Por qué funciona
Las derivadas de polinomios, exponenciales, senos y cosenos son de la misma familia. Al reemplazar una propuesta de esa familia, el lado izquierdo queda en la misma familia que $f$ y los coeficientes se pueden igualar. Si la propuesta ya es solución de la homogénea, daría $0$ (no sirve): subir un grado con $x$ evita esa anulación.

## Errores frecuentes
- Olvidar la regla de $x$ (resonancia): pasa mucho con $e^{x}$ en $y''-2y'+y$ (raíz doble) o con una constante y raíz $k=0$.
- Proponer solo $\cos$ o solo $\sin$.
- Polinomio incompleto: si $f=x$, la propuesta es $Ax+B$.
- Multiplicar por $x$ toda la $y_p$ en vez de solo el grupo que choca.
- Equivocar la derivada del producto $x\,e^{\alpha x}$ o $x\sin\beta x$.
- Mezclar $C_1,C_2$ con $A,B$.
- Olvidar sumar $y_h$ al final.

## Cómo comprobar el resultado
- Reemplazar $y_p$ en la ecuación: debe dar exactamente $f(x)$.
- Revisar que ningún término de $y_p$ esté en $y_h$ (si lo está, falta un $x$).
- Con condiciones iniciales: derivar la **general** y reemplazar.

> **Elaborado para el sitio — verificar con la cátedra:** la tabla resume Monllor 09 p. 14-19 y Rocha 15 p. 2 ("multiplicar por $x$ o $x^2$ si es necesario"); la formulación de $s$ como multiplicidad es elaborada.
