---
slug: edo-bernoulli
titulo: "EDO de Bernoulli"
unidad: U8
orden: 8
ejerciciosOficiales: ["1v1-2025-11-13-b#4", "2s2-2025-11-07-b#4", "recup-1h9-2025-07-05#3", "recup-2025-11-20#3"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/08-ECUACIONES DIFERENCIALES 2015.pdf, p. 8-10"
  - "teoria/AM2 Resumen segundo parcial.pdf, p. 23-24"
  - "teoria/Teorico-practico Rocha-Giordano/14_Ecuaciones Diferenciales de Primer Orden.pdf, p. 1"
---
> **Para los modelos anteriores.** Bernoulli convierte una EDO con una potencia de $y$ en una lineal. Hacé el cambio por escrito, especialmente si piden desarrollo analítico.

## Cómo reconocerlo

Podés escribirla así:

$$y'+P(x)y=Q(x)y^n,\qquad n\ne0,\ n\ne1.$$

Ejemplos de potencias: $y^{-3}=1/y^3$, $y^{-1/2}=1/\sqrt y$. Si $n=0$ o $n=1$, resolvé como lineal.

## Pasos cortos

1. Dividí para que $y'$ tenga coeficiente $1$.
2. Anotá $P$, $Q$ y el exponente $n$, con sus signos.
3. Calculá $1-n$ en un renglón aparte.
4. Elegí la nueva función $z=y^{1-n}$.
5. Derivá: $z'=(1-n)y^{-n}y'$.
6. Multiplicá la ecuación original por $(1-n)y^{-n}$.
7. Reemplazá los grupos por $z$ y $z'$:

$$z'+(1-n)Pz=(1-n)Q.$$

8. Resolvé esa **lineal** por el método $z=uv$.
9. Volvé a $y$: reemplazá $z$ por $y^{1-n}$.
10. Respetá las restricciones del problema: si hay raíces o denominadores, no todos los valores son admisibles.
11. Si dividiste por una potencia de $y$, comprobá aparte si $y=0$ puede resolver la ecuación original.

## Ejemplo oficial, paso a paso

Recuperatorio 1H9: $y'+2y=y^{-3}$.

1. Leé $P=2$, $Q=1$, $n=-3$.
2. Calculá $1-n=1-(-3)=4$.
3. Elegí $z=y^4$. Su derivada es $z'=4y^3y'$.
4. Multiplicá todo por $4y^3$:

$$4y^3y'+8y^4=4.$$

5. Cambiá a $z$: $z'+8z=4$.
6. Poné $z=uv$: $u'v+u(v'+8v)=4$.
7. Elegí $v'+8v=0$. Separando, $dv/v=-8dx$; elegí $v=e^{-8x}$.
8. Queda $u'e^{-8x}=4$, o sea $u'=4e^{8x}$.
9. Integrá: $u=\tfrac12e^{8x}+C$, porque la derivada de $e^{8x}$ es $8e^{8x}$.
10. Multiplicá: $z=uv=\tfrac12+Ce^{-8x}$.
11. Volvé a $y$:

$$\boxed{y^4=\frac12+Ce^{-8x}}.$$

Para soluciones reales, usá intervalos donde el lado derecho es positivo y elegí una rama $y=\pm(\tfrac12+Ce^{-8x})^{1/4}$. $y=0$ **no** sirve acá, porque la ecuación original contiene $1/y^3$.

## Comprobá y evitá estos errores

- Derivá $y^4=\tfrac12+Ce^{-8x}$: $4y^3y'=-8Ce^{-8x}=-8(y^4-\tfrac12)$.
- Dividiendo por $4y^3$, recuperás $y'=-2y+y^{-3}$.
- El factor $1-n$ multiplica **los dos coeficientes**, no solamente el término con $y'$.
- No dejes la respuesta en $z$.
- **Prueba sin mirar:** para $n=-2$ tendrías que obtener $1-n=3$ y elegir $z=y^3$.
