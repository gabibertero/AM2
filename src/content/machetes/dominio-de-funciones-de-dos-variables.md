---
slug: dominio-de-funciones-de-dos-variables
titulo: "Dominio de funciones de dos variables (con gráfico)"
unidad: U1
orden: 13
ejerciciosOficiales: ["p1-1h9-2025-05-g1#1", "p1-1h9-2025-05-g2#1", "p1-1h9-2025-07-rec#1", "p1-1h9-2024-05#1", "p1-1h10-2024-b#1", "p1-1h10-2025-09#1", "p1-1r3-2024-10-a#1", "p1-1r3-2024-10-b#1", "p1-1r7-2025-10#1", "p1-2s2-2025-06-b#1", "p1-2s2-2024-06-b#1", "p1-todas-2025-11-rec#1"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/01-FUNCIONES DE VARIAS VARIABLES 2015.pdf, p. 7-9"
  - "U1.pdf (cónicas y signos S1/S2), p. 15-33 (casi solo imagen)"
  - "fotos de método de WhatsApp w12 y w19 (hoja resumen de dominio y apunte de cónicas), docs/inventario/P1-B-fotos.md"
---

## Cómo reconocerlo
- "Determine gráfica y analíticamente el dominio de la función $z=f(x,y)$".
- Aparecen $\ln$, raíces, cocientes, a veces $\arcsin$/$\arccos$; dentro de cada uno hay una expresión con cónicas (circunferencia, elipse, hipérbola, parábola) o rectas.
- Siempre se pide el **dibujo** con el borde bien marcado (línea llena o punteada).

## Qué necesitás antes
- Restricciones de cada operación:

| Operación | Restricción |
|---|---|
| Cociente $\dfrac AB$ | $B\ne0$ |
| Raíz de índice par $\sqrt A$ | $A\ge0$ |
| Logaritmo $\ln A$ | $A>0$ |
| $\arcsin A,\ \arccos A$ | $-1\le A\le1$ |

- Identificar cónicas (completar cuadrados si hace falta): $(x-a)^2+(y-b)^2=r^2$ circunferencia; $\frac{(x-a)^2}{p^2}+\frac{(y-b)^2}{q^2}=1$ elipse; signos opuestos entre los cuadrados, hipérbola; $y=ax^2+bx+c$ parábola.
- El dominio es la **intersección** de todas las condiciones (se pide todo a la vez).

## Pasos
1. Escribir **una restricción por cada operación** (raíz, log, denominador, arco). Si una raíz está en un denominador, junta las dos: $A>0$ (estricta).
2. Si hay un **producto o cociente** que debe ser $>0$ (o $\ge0$): dos casos, **S1** (ambos factores $>0$) y **S2** (ambos $<0$). Dominio $=S_1\cup S_2$.
3. Cambiar cada desigualdad por su **igualdad** y dibujar la cónica o recta: es el borde.
4. **Borde:** línea **llena** si la desigualdad es $\ge$ o $\le$ (el borde pertenece); **punteada** si es $>$ o $<$ (no pertenece).
5. Elegir un **punto de prueba** en cada zona (no sobre el borde) y reemplazar en la desigualdad para saber qué lado sombrear.
6. Calcular los puntos de intersección entre curvas (resolver el sistema) y rotularlos.
7. Intersectar las regiones y sombrear. Escribir $D_f=\{(x,y)\in\mathbb R^2:\ \dots\}$ con todas las condiciones.

## Fórmulas clave

$$D_f=\{(x,y)\in\mathbb R^2:\ \text{todas las restricciones a la vez}\}$$

$$A\cdot B>0\ \Leftrightarrow\ (A>0\wedge B>0)\ \vee\ (A<0\wedge B<0)$$
- Borde llena: pertenece al dominio ($\ge,\le$). Borde punteada: no pertenece ($>,<$, o $\ne0$).
- Una curva puede ser borde **lleno en un tramo y punteado en otro** si viene de restricciones distintas.

## Ejemplo resuelto
$z=\ln(x^2+y^2-1)+\sqrt{y-x^2}$ _(propio, verificado a mano)_.
- Log: $x^2+y^2-1>0$, o sea exterior de la circunferencia de radio 1, **borde punteado**.
- Raíz: $y-x^2\ge0$, o sea $y\ge x^2$, región sobre la parábola, **borde lleno**.
- Intersección de curvas: $y=x^2$ en $x^2+y^2=1$ da $y+y^2=1$, $y=\frac{-1+\sqrt5}{2}\approx0{,}618$, $x=\pm0{,}786$.
- Punto de prueba $(0,2)$: $4>1$ y $2\ge0$, cumple. El origen no cumple ($0>1$ falso).

$$D_f=\{(x,y):\ x^2+y^2>1\ \wedge\ y\ge x^2\}$$

Si en cambio fuera $\ln[(y-x)(x^2+y^2-1)]$: S1 $y>x\wedge x^2+y^2>1$, S2 $y<x\wedge x^2+y^2<1$; $D_f=S_1\cup S_2$, todo con borde punteado.

**Gráfico:** [FIGURA: plano $xy$, parábola $y=x^2$ en línea llena, circunferencia $x^2+y^2=1$ punteada, sombreada la zona dentro de la parábola y fuera del círculo, puntos de corte rotulados $(\pm0{,}786;\ 0{,}618)$ · fuente propia, ver estilo de figuras de p1-1h9-2025-05-g1 ej1]

## Errores frecuentes
- Dibujar siempre el borde lleno: hay que decidir **curva por curva** si pertenece.
- Olvidar que $\ln$ y el denominador piden $>0$ / $\ne0$ (borde fuera), y la raíz sola pide $\ge0$ (borde dentro).
- Raíz **en el denominador**: es $>0$, no $\ge0$.
- En un producto $>0$, tomar solo el caso en que ambos son positivos y olvidar S2 (ambos negativos).
- Sombrear sin punto de prueba: se invierte el lado.
- No completar cuadrados y confundir la cónica (hipérbola vs. elipse).
- Dar solo el dibujo o solo la fórmula: se piden **gráfica y analíticamente**.

## Cómo comprobar el resultado
- Elegí un punto dentro de la región final y reemplazalo en la función original: tiene que dar un número real.
- Elegí uno fuera (y uno sobre cada borde) y verificá que el borde punteado **no** está y el lleno **sí**.
- Revisá que la intersección de curvas dibujada coincida con la que calculaste.

> **Elaborado para el sitio — verificar con la cátedra:** la tabla de restricciones y el método S1/S2 siguen el resumen de la cátedra (U1 p. 15-33 y fotos de método); el ejemplo es propio.
