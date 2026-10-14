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

## Cómo reconocerlo
- Es una lineal pero con $y^n$ en el segundo miembro: $y'+P(x)\,y=Q(x)\,y^n$, con $n\ne0,1$.
- Se ve una potencia de $y$ que impide que sea lineal: $y^{-3}$, $y^3$, $\dfrac1{\sqrt y}$, $y^{-2}$…
- Ejemplo de forma: $y'-\dfrac{2}{x}y=4x^2\,y^{-1/2}$ (forma, no es resolución).

## Qué necesitás antes
- $n\ne0$ y $n\ne1$ (si no, sería lineal).
- Forma estándar: coeficiente de $y'$ igual a $1$. Reacomodá la ecuación hasta ver $y'+Py=Qy^n$.
- Saber resolver la lineal con $y=u\cdot v$.
- $n$ puede ser negativo o fraccionario.

## Pasos
1. Llevar a $y'+P\,y=Q\,y^n$ e identificar $n$, $P$, $Q$.
2. Multiplicar por $(1-n)\,y^{-n}$: $(1-n)y^{-n}y'+(1-n)P\,y^{1-n}=(1-n)Q$.
3. Cambio $z=y^{1-n}$, con $z'=(1-n)\,y^{-n}y'$.
4. Queda una **lineal en $z$**: $z'+(1-n)P\,z=(1-n)Q$.
5. Resolverla con $z=u\cdot v$ (ver machete de lineal).
6. **Deshacer** el cambio: $y^{1-n}=z$ y despejar $y$ si se puede.
7. Si el enunciado dice "paso a paso, sin aplicar la fórmula general", desarrollar los pasos 2 a 6 sin saltearlos.

## Fórmulas clave
$$z=y^{1-n},\qquad z'+(1-n)P\,z=(1-n)Q$$
- $n$: exponente de $y$ en el segundo miembro.
- $z$: nueva incógnita que vuelve lineal la ecuación.
- $(1-n)$: factor que sale de derivar $y^{1-n}$ (regla de la cadena).
- Ejemplo de la fuente: $y'+2y=y^3$ ($n=3$, $z=y^{-2}$) da $z'-4z=-2$ y $y^{-2}=Ce^{4x}+\tfrac12$.

- Con $n$ negativo: $y'+y=x\,y^{-1}$ ($n=-1$, $1-n=2$, $z=y^2$) da $z'+2z=2x$ y $y^2=x-\tfrac12+Ce^{-2x}$. Con $n=-\tfrac12$: $z=y^{3/2}$ (se supone $y>0$ para que la potencia esté definida).
- Si viene como $x\,y'-y=\dfrac{x^2}{y^2}$: dividí por $x$ para tener $y'-\tfrac1xy=x\,y^{-2}$ y recién ahí leer $n$, $P$, $Q$.

## Por qué funciona
Con $z=y^{1-n}$ la derivada $z'$ contiene a $y'$ multiplicada por $y^{-n}$, justo el factor que hace desaparecer la potencia de $y$ del segundo miembro.

## Errores frecuentes
- Olvidar el factor $(1-n)$ en $P$ y en $Q$.
- Dividir por $y^n$ y no multiplicar por $(1-n)$ al armar $z'$.
- Calcular mal $1-n$ cuando $n$ es negativo o fraccionario (ej. $n=-\tfrac12\Rightarrow1-n=\tfrac32$).
- Dejar el resultado en $z$ sin volver a $y$.
- Perder la solución $y=0$ (cuando $n>0$).
- Tratar como lineal una ecuación con $y^n$ sin ver que es Bernoulli.

## Cómo comprobar el resultado
- Verificar que $z=y^{1-n}$ cumple la lineal obtenida.
- Derivar la solución final y reemplazar en la ecuación original.
- Algunas Bernoulli también son homogéneas: si el enunciado lo dice, resolver por ambos métodos y comparar.

> **Elaborado para el sitio — verificar con la cátedra:** la observación sobre la solución $y=0$ no figura textual en las fuentes.
