---
slug: edo-exacta
titulo: "EDO exacta, paso a paso"
unidad: U8
orden: 9
ejerciciosOficiales: ["1r3-2025-11-14#4", "1r7-2025-11-11#4", "1v1-2025-11-13-a#4", "2s2-2025-11-07-a#4", "recup-1h10-2025-11-08#4", "recup-2025-11-20#3"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/08-ECUACIONES DIFERENCIALES 2015.pdf, p. 10-13"
  - "teoria/AM2 Resumen segundo parcial.pdf, p. 25-26"
  - "teoria/Apuntes Ing. Monllor/06-INTEGRALES CURVILINEAS 2015.pdf, p. 10-20 (función potencial)"
---
> **Para los modelos anteriores.** No es el método que necesita la EDO del 31/10, pero aparece varias veces en los parciales de 2025.

## Cómo reconocerlo

La consigna suele decir «verificar si es exacta y, en ese caso, resolver». Se presenta como:

$$M(x,y)\,dx+N(x,y)\,dy=0.$$

Acá llamamos $M$ al coeficiente de $dx$ y $N$ al de $dy$, para no confundirlos con los $P,Q$ de la lineal.

## Pasos cortos

1. Copiá $M$ y $N$ por separado.
2. Derivá $M$ en $y$: tratá $x$ como constante.
3. Derivá $N$ en $x$: tratá $y$ como constante.
4. Compará: si $M_y=N_x$ en el dominio de trabajo, seguí con el método de exactas.
5. Integrá **$M$ respecto de $x$**. En esa integral, todo lo que tenga solo $y$ es constante.
6. A ese resultado sumale una función desconocida $g(y)$, no solo un número.
7. Llamá $H(x,y)$ a lo obtenido. Derivalo respecto de $y$.
8. Igualá $H_y$ al coeficiente $N$ del principio.
9. Despejá $g'(y)$ y después integrá para hallar $g(y)$.
10. Escribí la solución como $H(x,y)=C$.
11. Comprobá $H_x=M$ y $H_y=N$.

## Ejemplo oficial de 2025, en pasos

$$[2x\sin y-y\sin x]\,dx+[x^2\cos y+\cos x]\,dy=0.$$

1. $M=2x\sin y-y\sin x$ y $N=x^2\cos y+\cos x$.
2. Derivá en $y$: $M_y=2x\cos y-\sin x$.
3. Derivá en $x$: $N_x=2x\cos y-\sin x$. Son iguales.
4. Integrá $M$ en $x$ término a término:
   - $\int2x\sin y\,dx=x^2\sin y$, porque $\sin y$ es constante en esta cuenta.
   - $\int-y\sin x\,dx=y\cos x$, porque $\int\sin x\,dx=-\cos x$.
5. Entonces $H=x^2\sin y+y\cos x+g(y)$.
6. Derivá en $y$: $H_y=x^2\cos y+\cos x+g'(y)$.
7. Igualá a $N=x^2\cos y+\cos x$: queda $g'(y)=0$.
8. Elegí $g(y)=0$; la constante se incluirá en la solución final.

$$\boxed{x^2\sin y+y\cos x=C}$$

Es una solución **implícita**: no hace falta despejar $y$ para que sea válida.

## Si no da exacta

Volvé a revisar signos y derivadas. Si sigue siendo $M_y\ne N_x$, no escribas una función $H$ por este método como si nada. Buscá si la consigna pide otro procedimiento. El factor integrante para volver exacta una ecuación no aparece en los prácticos relevados: no lo agregues a tu carga inicial de estudio.

## Comprobá y evitá estos errores

- $\partial/\partial y$ significa derivar en $y$, manteniendo $x$ fija.
- No reemplaces $g(y)$ por $C$ antes de comparar con $N$: podrías perder términos.
- Si al despejar $g'(y)$ siguen quedando $x$, revisá la cuenta o la exactitud.
- La solución termina con **$=C$**.
- **Prueba sin mirar:** escribí qué dos derivadas comparar y qué función integrar primero.
