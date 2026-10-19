---
slug: integral-triple-cilindricas-esfericas
titulo: "Integral triple en cilíndricas y esféricas"
unidad: U4
orden: 2
ejerciciosOficiales: ["1r3-2025-11-14#2", "1r7-2025-11-11#2", "1v1-2025-11-13-a#2", "1v1-2025-11-13-b#2", "2s2-2025-11-07-a#2", "2s2-2025-11-07-b#2", "recup-1h10-2025-11-08#2", "1h9-2026-06-27-a#1", "1h9-2026-06-27-b#1", "recup-2025-11-20#1"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/05-INTEGRALES MULTIPLES 2015.pdf, p. 35-38"
  - "teoria/Teorico-practico Rocha-Giordano/12_Integrales triples_CC.pdf, p. 1-2"
  - "teoria/AM2 Resumen segundo parcial.pdf, p. 13-14"
---

## Cómo reconocerlo
- "Calcular la integral triple $\iiint_V f\,dV$ siendo $V$ la región limitada por…".
- **Cilíndricas** si la región tiene eje $z$ (paraboloides, cilindros, conos, $x^2+y^2$ en el integrando).
- **Esféricas** si hay esferas, conos centrados en el origen y $x^2+y^2+z^2$; el enunciado lo dice ("emplear coordenadas esféricas").

## Qué necesitás antes
- Región $V$ cerrada y acotada; $f$ continua en $V$.
- Poder describir $V$ con límites simples en las nuevas variables.
- Jacobiano en **valor absoluto** (convención de la cátedra).
- En esféricas, ángulos de la cátedra: $\varphi$ medido desde el eje $z$ ($0\le\varphi\le\pi$), $\theta$ en el plano $xy$.

## Pasos
1. **Graficar** $V$ y su proyección $D$ en el plano $xy$ (cilíndricas) o un corte por el plano $xz$ (esféricas).
2. Escribir cada superficie en las nuevas variables.
3. Encontrar los límites: en cilíndricas $z$ entre dos superficies, $(r,\theta)$ describen $D$. En esféricas, $r$ entre dos esferas (o $0$ y la superficie), $\varphi$ entre el eje y el cono, $\theta$ según octante o cuadrante.
4. Reescribir $f$ y multiplicar por el jacobiano.
5. Integrar de adentro hacia afuera; si $f$ no depende de alguna variable, esa integral es un factor.
6. Cuando la región tiene "$\ge$ esfera" y "$\le$ paraboloide", la curva de intersección da el radio de $D$.

## Fórmulas clave
$$\text{Cilíndricas: } x=r\cos\theta,\ y=r\sin\theta,\ z=z\qquad dV=r\,dz\,dr\,d\theta$$

$$\text{Esféricas: } x=r\sin\varphi\cos\theta,\ y=r\sin\varphi\sin\theta,\ z=r\cos\varphi\qquad dV=r^2\sin\varphi\,dr\,d\varphi\,d\theta$$
- $r$ (cilíndricas): distancia al eje $z$. $r$ (esféricas): distancia al origen.
- $r$ y $r^2\sin\varphi$: valores absolutos de los jacobianos.
- **Superficies en cilíndricas** (como límites de $z$): cono $z=\sqrt{x^2+y^2}\to z=r$; paraboloide $z=x^2+y^2\to z=r^2$; plano $z=4\to z=4$; elipsoide $x^2+y^2+\tfrac{z^2}{9}=1\to z=\pm3\sqrt{1-r^2}$. Para "dentro del cono" ($z\ge r$) con $z\le4$: $r\le z\le4$, $0\le r\le4$.
- Útiles: $x^2+y^2=r^2$ (cil.) $=r^2\sin^2\varphi$ (esf.); $x^2+y^2+z^2=r^2$ (esf.); cono $z=\sqrt{x^2+y^2}\Rightarrow\varphi=\pi/4$.
- Cono "hoja superior" entre dos esferas: se interpreta $0\le\varphi\le\pi/4$ (adentro del cono). Si el enunciado no dice qué lado, **declará la suposición** al empezar.
- $\sin^2\varphi=\tfrac{1-\cos 2\varphi}{2}$ (el enunciado de recup-2025-11-20 lo recuerda).

## Por qué funciona
Es un cambio de variables: se reemplaza la región difícil por una "caja" en $(r,\theta,z)$ o $(r,\varphi,\theta)$. El jacobiano mide cuánto se deforma el volumen al cambiar de coordenadas, y se pone en el integrando para no perder esa deformación.

## Errores frecuentes
- Olvidar el jacobiano, o poner $r^2\sin\varphi$ en cilíndricas.
- Integrando con $\sqrt{x^2+y^2}$ o $x\sqrt{x^2+y^2}$: al pasarlo a $r$ queda $r$ (o $r\cos\theta\cdot r$) **y además** el $r$ del jacobiano.
- Dejar $\theta\in[0,2\pi]$ en un octante o cuadrante.
- En esféricas, cambiar el rol de $\varphi$ y $\theta$ (aquí $\varphi$ es el que nace del eje $z$).
- Región entre paraboloides: el radio de $D$ sale de igualarlos, no de uno solo.
- Región $0\le y\le x$: en polares es $0\le\theta\le\pi/4$.
- No copiar el typo de algunas guías ($z=r\cos\theta$): en esféricas es $z=r\cos\varphi$.
- Si el integrando cambia de signo por simetría ($\cos\theta$ en $[0,2\pi]$), puede dar $0$: verificá que sea razonable.

## Cómo comprobar el resultado
- Si $f=1$ obtenés el volumen: comparalo con fórmulas conocidas.
- Revisá la paridad: $\int_0^{2\pi}\cos\theta\,d\theta=0$, $\int_0^{2\pi}\sin\theta\,d\theta=0$.
- Verificá el signo: $f\ge0$ en $V$ implica resultado $\ge0$.
- Probá el orden de integración opuesto en un tramo (cuando sea fácil).

> **Elaborado para el sitio — verificar con la cátedra:** Notación de ángulos según Monllor 05 p. 37; las equivalencias de cono/esfera son cuentas directas: verificar con la cátedra si usan otra convención para φ.
