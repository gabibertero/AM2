---
slug: edo-lineal
titulo: "EDO lineal de 1.er orden (y = u·v)"
unidad: U8
orden: 7
ejerciciosOficiales: ["1h10-2026-10-31-a#4", "1h9-2026-06-27-b#3"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/08-ECUACIONES DIFERENCIALES 2015.pdf, p. 6-8"
  - "teoria/AM2 Resumen segundo parcial.pdf, p. 23-24"
  - "teoria/Teorico-practico Rocha-Giordano/14_Ecuaciones Diferenciales de Primer Orden.pdf, p. 1 (fórmula cerrada)"
  - "parciales/2do-parcial/2026-10-31-1H10-A.png, p. 1 (enunciado aportado por Gabi; resolución elaborada para el sitio)"
---
> **Ejercicio 4 del parcial del 31/10.** Vas a transformar una EDO en dos cuentas más cortas, usando $y=u\cdot v$. No alcanza con copiar una fórmula final: escribí el desarrollo.

## Cómo reconocerlo

Una **EDO** es una ecuación que contiene una función desconocida $y(x)$ y sus derivadas. $y'$ significa «derivada de $y$ respecto de $x$».

Es lineal de primer orden si podés ordenarla así:

$$y'+P(x)y=Q(x).$$

$P$ y $Q$ dependen solo de $x$. $y$ e $y'$ están a la primera potencia, sin multiplicarse entre sí.

## Pasos cortos

1. Juntá todos los términos con $y'$.
2. Pasá al otro lado lo que no tiene $y$ ni $y'$.
3. Dividí **todos** los términos por el coeficiente de $y'$. Ahora ese coeficiente debe ser $1$.
4. Anotá $P(x)$ con su signo y $Q(x)$.
5. Escribí $y=u(x)v(x)$.
6. Derivá el producto: $y'=u'v+uv'$.
7. Reemplazá: $u'v+u(v'+Pv)=Q$.
8. Elegí $v$ para que el paréntesis sea cero: $v'+Pv=0$.
9. Separá: $dv/v=-P(x)dx$ e integrá. Para $v$ alcanza elegir una solución no nula.
10. Con ese $v$, resolvé $u'v=Q$: despejá $u'=Q/v$.
11. Integrá para hallar $u$. **Acá agregá la constante $C$.**
12. Volvé a $y=uv$ y comprobá en la ecuación original.

## Ejemplo del parcial del 31/10

$$y'+x^2y'-2xy-2x-2x^3=0.$$

1. Agrupá: $(1+x^2)y'-2xy=2x+2x^3$.
2. Factorizá el segundo miembro: $2x+2x^3=2x(1+x^2)$.
3. Dividí por $1+x^2$ (siempre es positivo):

$$y'-\frac{2x}{1+x^2}y=2x.$$

4. Leé $P=-2x/(1+x^2)$ y $Q=2x$.
5. Poné $y=uv$, derivá y reemplazá:

$$u'v+u\left(v'-\frac{2x}{1+x^2}v\right)=2x.$$

6. Elegí $v$ para anular el paréntesis:

$$\frac{dv}{v}=\frac{2x}{1+x^2}\,dx.$$

7. Para integrar el lado derecho, llamá $w=1+x^2$. Su derivada es $dw=2x\,dx$.
8. Queda $\int dw/w=\ln|w|$. Como $1+x^2>0$, obtenés $\ln|v|=\ln(1+x^2)$ eligiendo constante cero.
9. Elegí $v=1+x^2$.
10. La ecuación restante es $u'(1+x^2)=2x$, de donde $u'=2x/(1+x^2)$.
11. Repetí la misma integral: $u=\ln(1+x^2)+C$.
12. Multiplicá $u$ por $v$:

$$\boxed{y=(1+x^2)\big[\ln(1+x^2)+C\big]}.$$

No hay condición inicial en este ejercicio: $C$ queda libre.

## Comprobación del ejemplo

Llamá $L=\ln(1+x^2)+C$. Entonces $y=(1+x^2)L$ y, por producto,

$$y'=2xL+(1+x^2)\frac{2x}{1+x^2}=2xL+2x.$$

En la ecuación ordenada:

$$(1+x^2)y'-2xy=(1+x^2)(2xL+2x)-2x(1+x^2)L=2x(1+x^2).$$

Se cancelan los términos con $L$ y queda el segundo miembro correcto.

## Errores que conviene revisar

- El signo de $P$ se lee **después de dividir**: acá es negativo.
- No dividas solamente el término con $y'$.
- Derivar $uv$ da **dos términos**: $u'v+uv'$.
- No olvides $C$ al integrar $u$.
- **Prueba sin mirar:** ordená la ecuación y escribí las dos ecuaciones que resolverías para $v$ y $u$.
