---
slug: edo-lineal
titulo: "EDO lineal de 1.er orden (y = u·v)"
unidad: U8
orden: 7
ejerciciosOficiales: ["1h9-2026-06-27-b#3"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/08-ECUACIONES DIFERENCIALES 2015.pdf, p. 6-8"
  - "teoria/AM2 Resumen segundo parcial.pdf, p. 23-24"
  - "teoria/Teorico-practico Rocha-Giordano/14_Ecuaciones Diferenciales de Primer Orden.pdf, p. 1 (fórmula cerrada)"
---

## Cómo reconocerlo
- $y'$ e $y$ aparecen **a la primera potencia**, sin productos entre ellas: $y'+P(x)\,y=Q(x)$.
- Los coeficientes dependen solo de $x$. Ejemplo de forma: $y'-3x^2y-6x^2=0$.

## Qué necesitás antes
- La ecuación en forma estándar: el coeficiente de $y'$ debe ser $1$ (dividí si hace falta).
- $P$ y $Q$ continuas en el intervalo.
- Dominar las dos separables que salen del método.

## Pasos (método de la cátedra, $y=u\cdot v$)
1. Llevar a $y'+P\,y=Q$ (pasar términos, dividir).
2. Proponer $y=u(x)\,v(x)$ y derivar: $y'=u'v+uv'$.
3. Sustituir: $u'v+u\,(v'+P\,v)=Q$.
4. **Elegir $v$** tal que $v'+P\,v=0$ (variables separables). Basta una solución, con $C=0$: $v=e^{-\int P\,dx}$.
5. Con ese $v$ queda $u'\,v=Q$, también separable: $u=\int Q\,e^{\int P\,dx}dx+C$.
6. Armar $y=u\cdot v$.
7. Condición inicial (si hay): hallar $C$.

## Fórmulas clave
$$v=e^{-\int P\,dx},\qquad u=\int Q\,e^{\int P\,dx}\,dx+C,\qquad y=e^{-\int P\,dx}\Big[\int Q\,e^{\int P\,dx}\,dx+C\Big]$$
- $P$: coeficiente de $y$ en la forma estándar. $Q$: término independiente.
- $v$: solución de la ecuación homogénea asociada $v'+Pv=0$.
- $u$: lo que le falta a $v$ para resolver la completa.
- Ejemplo de la fuente: $y'+3x^2y=6x^2$ da $y=2+Ce^{-x^3}$; con $y(0)=5$ resulta $C=3$.

- Coeficiente de $y'$ distinto de $1$: $x\,y'+y=2x$ se divide por $x$ y queda $y'+\tfrac1xy=2$, con $P=\tfrac1x$ (el signo y el factor salen **después** de dividir). Da $v=\tfrac1x$, $u=x^2+C$ e $y=x+\dfrac Cx$ (Rocha 14, ej. 18).
- Signo de $P$: para $y'-2xy=4x$ es $P=-2x$, $v=e^{x^2}$ y $y=-2+Ce^{x^2}$.

## Por qué funciona
Al poner $y=uv$ aparecen dos funciones y una sola ecuación: hay libertad para imponer una condición. Se elige que el paréntesis $v'+Pv$ valga $0$, y el problema se parte en **dos** ecuaciones separables.

## Errores frecuentes
- No pasar a forma estándar (el signo de $P$ depende de eso: en $y'-3x^2y=6x^2$ es $P=-3x^2$).
- Signo de $v$: es $e^{-\int P}$, no $e^{+\int P}$.
- Sumar constante al calcular $v$ (no hace falta) o olvidar $C$ al calcular $u$.
- No distribuir $v$ en el producto final $y=(\ldots+C)\,v$.
- Errores en las integrales de $e^{\int P}$: integrar por partes si $Q$ es un polinomio por exponencial.

## Cómo comprobar el resultado
- Derivá $y$ y reemplazá en $y'+Py$: tiene que dar $Q$.
- La parte con $C$ debe resolver la homogénea $y'+Py=0$.
- Si hay condición inicial, revisá $y(x_0)=y_0$.

> **Elaborado para el sitio — verificar con la cátedra:** Rocha-Giordano da la fórmula cerrada y Monllor/el resumen de alumno el método $u\cdot v$; el examen de 1H9 tema B está rotulado "EDO lineal, método $y=u\cdot v$".
