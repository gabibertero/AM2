---
slug: edo2-homogenea-coef-constantes
titulo: "EDO de 2.º orden homogénea, coeficientes constantes"
unidad: U9
orden: 10
ejerciciosOficiales: ["1h10-2026-10-31-a#5", "1r3-2025-11-14#5", "1r7-2025-11-11#5", "1v1-2025-11-13-a#5", "1v1-2025-11-13-b#5", "2s2-2025-11-07-a#5", "2s2-2025-11-07-b#5", "1h9-2026-06-27-a#4", "1h9-2026-06-27-b#4", "recup-1h10-2025-11-08#5", "recup-2025-11-20#4"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/09-ECUACIONES DIFERENCIALES DE ORDEN SUPERIOR2015.pdf, p. 3 (Wronskiano) y siguientes"
  - "teoria/Teorico-practico Rocha-Giordano/15_Ecuaciones Diferenciales de Segundo Orden.pdf, p. 1"
  - "teoria/AM2 Resumen segundo parcial.pdf, p. 27-29"
  - "parciales/2do-parcial/2026-10-31-1H10-A.png, p. 1 (enunciado aportado por Gabi; resolución elaborada para el sitio)"
---
> **Primera mitad del ejercicio 5 del 31/10.** Antes de buscar la particular, resolvé la misma ecuación con segundo miembro cero.

## Cómo reconocerlo

Tiene $y''$, $y'$ e $y$, con coeficientes constantes:

$$ay''+by'+cy=0,\qquad a\ne0.$$

$y''$ es la derivada de $y'$: vas a derivar dos veces. Si el segundo miembro no es cero, esta guía resuelve solo la parte llamada **homogénea**, $y_h$.

## Pasos cortos

1. Ordená la ecuación, con las derivadas del mismo lado.
2. Si hay otro segundo miembro, reemplazalo provisionalmente por $0$.
3. Cambiá $y''$ por $k^2$, $y'$ por $k$ e $y$ por $1$.
4. Conservá los coeficientes: sale $ak^2+bk+c=0$.
5. Factorizá o calculá las raíces con $k=(-b\pm\sqrt{b^2-4ac})/(2a)$.
6. Elegí la fila de la tabla.
7. Escribí dos constantes distintas, $C_1$ y $C_2$.

| Raíces que obtuviste | Escribí $y_h$ |
|---|---|
| Dos reales distintas $k_1,k_2$ | $C_1e^{k_1x}+C_2e^{k_2x}$ |
| Una real repetida $k$ | $(C_1+C_2x)e^{kx}$ |
| Complejas $\alpha\pm i\beta$ | $e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x)$ |

El $x$ del caso repetido es necesario: sin él estarías escribiendo dos veces la misma solución.

## Ejemplo del parcial del 31/10

La original es $y''-2y'+y=2e^x+1$.

1. Homogénea: $y''-2y'+y=0$.
2. Característica: $k^2-2k+1=0$.
3. Factorizá: $(k-1)^2=0$.
4. La raíz es $k=1$ **doble**.
5. Elegí la segunda fila:

$$\boxed{y_h=(C_1+C_2x)e^x}.$$

**Todavía no terminaste el ejercicio original.** Falta buscar $y_p$ y sumar $y=y_h+y_p$ en el [machete de coeficientes indeterminados](../edo2-coeficientes-indeterminados/).

## Si hay condiciones iniciales

Primero armá la solución **completa**. Después:

1. Reemplazá $x=x_0$ en $y(x)$ e igualá al valor dado $y(x_0)$.
2. Derivá toda la solución.
3. Reemplazá $x=x_0$ en $y'(x)$ e igualá al dato $y'(x_0)$.
4. Resolvé esas dos ecuaciones para $C_1,C_2$.

Si pide solución general y no da datos iniciales, las dos constantes quedan libres.

## Comprobá y evitá estos errores

- Para $e^x$: $y'=e^x$, $y''=e^x$ y $y''-2y'+y=0$.
- Para $xe^x$: $y'=(x+1)e^x$, $y''=(x+2)e^x$; también da $0$.
- La característica de $y''-2y'+y$ lleva **$-2k$**, no $+2k$.
- Con raíces complejas, no olvides el factor $e^{\alpha x}$ en los dos términos.
- **Prueba sin mirar:** resolvé $k^2-2k+1=0$ y explicá por qué aparece $xe^x$.
