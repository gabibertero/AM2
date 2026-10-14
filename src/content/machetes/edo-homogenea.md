---
slug: edo-homogenea
titulo: "EDO homogénea de 1.er orden"
unidad: U8
orden: 6
ejerciciosOficiales: ["1h9-2026-06-27-a#3", "recup-2025-11-20#3", "modelo-teorico#2"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/08-ECUACIONES DIFERENCIALES 2015.pdf, p. 4-6"
  - "teoria/Teorico-practico Rocha-Giordano/14_Ecuaciones Diferenciales de Primer Orden.pdf, p. 1"
  - "teoria/AM2 Resumen segundo parcial.pdf, p. 22"
---

## Cómo reconocerlo
- $y'=f(x,y)$ donde $f$ solo depende del cociente $y/x$.
- O bien $P(x,y)\,dx+Q(x,y)\,dy=0$ con $P$ y $Q$ **homogéneas del mismo grado** (todos los términos tienen el mismo grado total).
- Ejemplos de forma: $2y^2-x^2y'-2xyy'=0$ (grado 2 en cada término).

## Qué necesitás antes
- Verificar la homogeneidad: $f(\lambda x,\lambda y)=f(x,y)$ (grado $0$). Es el primer paso del desarrollo.
- Para $P\,dx+Q\,dy=0$: $P(\lambda x,\lambda y)=\lambda^nP$ y $Q(\lambda x,\lambda y)=\lambda^nQ$, mismo $n$.
- $x\ne0$ (se divide por $x$).

## Pasos
1. **Verificar** $f(\lambda x,\lambda y)=f(x,y)$ y decirlo.
2. Despejar $y'=f(x,y)$ si venía como $P\,dx+Q\,dy=0$: $y'=-P/Q$. Si $y'$ multiplica varios términos, agrupá: $y'\,(A+B)=C\Rightarrow y'=C/(A+B)$.
3. Cambio: $u=\dfrac yx$, o sea $y=ux$ y $y'=u+x\,u'$.
4. Sustituir: $u+x\dfrac{du}{dx}=f(1,u)$, de donde $x\dfrac{du}{dx}=f(1,u)-u$.
5. **Separar variables:** $\dfrac{du}{f(1,u)-u}=\dfrac{dx}{x}$.
6. Integrar ambos lados.
7. **Volver** a $y$ con $u=y/x$.
8. Condición inicial (si hay): hallar $C$.

## Fórmulas clave
$$u=\frac yx,\quad y'=u+x\,u',\qquad \int\frac{du}{f(1,u)-u}=\ln|x|+C$$
- $f(1,u)$: la función $f$ evaluada con $x=1,\ y=u$ (por ser de grado $0$, es lo mismo que $f(x,y)$).
- $u$: nueva incógnita, función de $x$.
- Se llama homogénea porque $y'$ no cambia al escalar $(x,y)\to(\lambda x,\lambda y)$.

- Ejemplo corto (genérico): $(x+y)\,dx-x\,dy=0\Rightarrow y'=\dfrac{x+y}{x}=1+\dfrac yx$, grado $0$. Con $y=ux$: $u+xu'=1+u\Rightarrow u'=\dfrac1x\Rightarrow u=\ln|x|+C\Rightarrow y=x(\ln|x|+C)$.

## Por qué funciona
Al ser $f$ de grado $0$, solo depende de la razón $y/x$. Con $u=y/x$ el problema se reduce a una ecuación en $u$ y $x$ que ya es de variables separables.

## Errores frecuentes
- Usar el cambio sin verificar que sea homogénea (si no lo es, no sirve).
- Derivar mal $y=ux$: es $y'=u+xu'$ (regla del producto).
- Olvidar volver a $y$ al final.
- Perder las soluciones $u=$ constante cuando $f(1,u)-u=0$.
- Cancelar $x$ o $u$ sin revisar que no sean $0$.
- Constante: reubicar $C$ al pasar logaritmos (por ejemplo $\ln|x|+C=\ln|Cx|$).
- Confundir con lineal o Bernoulli: si pide "homogénea", va por $u=y/x$.

## Cómo comprobar el resultado
- Derivar implícitamente la solución y volver a la ecuación.
- Si hay punto $(x_0,y_0)$, reemplazarlo en la solución para hallar $C$ y revisar que cumpla.
- Algunas ecuaciones son homogéneas **y** exactas **y** Bernoulli: resolver por dos métodos y comparar es un buen control.

> **Elaborado para el sitio — verificar con la cátedra:** el chequeo cruzado entre métodos es sugerencia propia; el enunciado de recup-2025-11-20#3 menciona que la ecuación se resuelve por cualquiera de ellos.
