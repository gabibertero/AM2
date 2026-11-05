---
slug: volumen-polares-cilindricas
titulo: "Volumen entre superficies (polares / cilíndricas)"
unidad: U4
orden: 1
ejerciciosOficiales: ["1h10-2026-10-31-a#1", "1r3-2025-11-14#1", "1r7-2025-11-11#1", "1v1-2025-11-13-a#1", "1v1-2025-11-13-b#1", "2s2-2025-11-07-a#1", "2s2-2025-11-07-b#1", "recup-1h9-2025-07-05#1", "recup-1h10-2025-11-08#1"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/05-INTEGRALES MULTIPLES 2015.pdf, p. 22 (polares) y p. 35-36 (cilíndricas)"
  - "teoria/Teorico-practico Rocha-Giordano/11_Integrales dobles_CC.pdf, p. 1; 12_Integrales triples_CC.pdf, p. 1-2"
  - "teoria/AM2 Resumen segundo parcial.pdf, p. 7-9 y 13"
  - "parciales/2do-parcial/2026-10-31-1H10-A.png, p. 1 (enunciado aportado por Gabi; resolución elaborada para el sitio)"
---
> **Para este práctico.** Acá aprendés a calcular un volumen. No hace falta conocer una demostración: seguí las operaciones y después repetilas con la solución cerrada.

## Cómo reconocerlo

Dice **«calcular el volumen»** y te da superficies que encierran un cuerpo. El resultado mide cuánto espacio ocupa ese cuerpo. Si aparece $x^2+y^2$, probá polares o cilíndricas.

## Pasos cortos

1. **Despejá $z$** en cada superficie. Vas a buscar un piso y un techo.
2. **Elegí un punto interior**, por ejemplo el centro si pertenece a la base. Compará los valores: el mayor es el techo.
3. **Igualá piso y techo.** Eso muestra dónde se cierra el cuerpo.
4. **Buscá el radio.** En polares, reemplazá $x^2+y^2$ por $r^2$; $r$ es la distancia al eje vertical y nunca es negativo.
5. **Escribí los ángulos.** Vuelta completa: $0\le\theta\le2\pi$. Primer cuadrante: $0\le\theta\le\pi/2$. No uses la vuelta completa si hay restricciones.
6. **Restá techo menos piso.** Esa diferencia es la altura que vas a integrar.
7. **Multiplicá por $r$.** Es el factor que acompaña al área en polares: $dx\,dy=r\,dr\,d\theta$.
8. **Integrá primero en $r$.** Durante esa cuenta, $\theta$ se trata como constante.
9. **Evaluá arriba menos abajo.** Reemplazá el límite superior en la primitiva y restale el inferior.
10. **Integrá en $\theta$** y escribí unidades de volumen.

$$V=\int_{\theta_1}^{\theta_2}\int_{r_1}^{r_2}(z_{\rm techo}-z_{\rm piso})\,r\,dr\,d\theta$$

Si la consigna pide triple, el integrando para un **volumen** es $1$: con el factor cilíndrico queda $r$ y se integra primero entre piso y techo.

## Ejemplo del parcial del 31/10

**Ejercicio 1:** $x^2+y^2=5z$ y $z=5$.

1. Despejá el paraboloide: $z=(x^2+y^2)/5=r^2/5$.
2. En el centro $r=0$, el paraboloide vale $0$ y el plano vale $5$: piso $r^2/5$, techo $5$.
3. Igualá: $r^2/5=5$.
4. Multiplicá por $5$: $r^2=25$. Como $r\ge0$, el radio es $5$.
5. La base es el disco entero: $0\le r\le5$, $0\le\theta\le2\pi$.
6. Armá la integral:

$$V=\int_0^{2\pi}\int_0^5\left(5-\frac{r^2}{5}\right)r\,dr\,d\theta.$$

7. Distribuí el factor: $(5-r^2/5)r=5r-r^3/5$.
8. Integrá cada potencia: $\int r^n dr=r^{n+1}/(n+1)$ para $n\ne-1$.

$$\int_0^5\left(5r-\frac{r^3}{5}\right)dr=\left[\frac{5r^2}{2}-\frac{r^4}{20}\right]_0^5=\frac{125}{2}-\frac{125}{4}=\frac{125}{4}.$$

9. Como no queda $\theta$, integrar multiplica por el largo del intervalo: $2\pi$.

$$\boxed{V=\frac{125\pi}{2}}$$

**El mismo volumen con triple:**

$$V=\int_0^{2\pi}\int_0^5\int_{r^2/5}^{5}r\,dz\,dr\,d\theta.$$

La integral en $z$ da $r(5-r^2/5)$: vuelve a aparecer la cuenta anterior.

## Si la base no es circular

Usá rectangulares: $V=\iint_D(\text{techo}-\text{piso})\,dx\,dy$, **sin $r$**. Por ejemplo, $y=1-x^2$, $y\ge0$ da $-1\le x\le1$, $0\le y\le1-x^2$. Si $1\le z\le y+2$, la altura es $y+1$.

Si hay una esfera, escribí $z=\pm\sqrt{R^2-r^2}$ y elegí la tapa que corresponde al dibujo. Si techo y piso cambian de orden, separá la región antes de integrar.

## Comprobá y evitá estos errores

- El volumen debe ser positivo. En este ejemplo es menor que el cilindro de radio $5$ y altura $5$: $125\pi$.
- El radio sale del corte de superficies: es $5$, no $\sqrt5$.
- El factor $r$ aparece una vez por el cambio de coordenadas.
- En una doble no agregues también límites de $z$: la altura ya reemplaza esa integración.
- **Prueba sin mirar:** escribí piso, techo, radio y ángulos antes de hacer cuentas. Si podés explicar de dónde sale cada límite, el planteo está encaminado.
