---
slug: plano-tangente-y-recta-normal
titulo: "Plano tangente y recta normal a una superficie"
unidad: U2
orden: 19
ejerciciosOficiales: ["p1-1h9-2024-05#4"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/02-DERIVADAS Y DIFERENCIALES 2015.pdf, p. 14-16"
  - "U2 - Derivadas Compuestas e Implicitas.pdf, p. 14-17 (superficie implícita)"
  - "Demostraciones parcial 1.pdf, p. 6 (Demostración 7: el gradiente es normal; como imagen)"
---

## Cómo reconocerlo
- "Hallar la ecuación del plano tangente (y de la recta normal) a la superficie $z=f(x,y)$ / $F(x,y,z)=0$ en el punto...".
- "Puntos de la superficie donde el plano tangente es paralelo a un plano dado".
- Aparece como paso intermedio: Lagrange "con plano tangente" (1H9 May-24 #4), en el que el plano tangente es una de las condiciones.

## Qué necesitás antes
- Superficie explícita $z=f(x,y)$ con $f$ **diferenciable** en $(x_0,y_0)$ (p. ej. parciales continuas), o implícita $F=0$ con $\nabla F(M)\ne\vec0$.
- El punto $M(x_0,y_0,z_0)$ **pertenece a la superficie** (verificarlo; si falta $z_0$, calcularlo).
- Si solo existen las parciales, la ecuación se puede escribir pero el plano no aproxima a la superficie.

## Pasos
1. Verificar que $M$ está en la superficie. Si falta una coordenada, hallarla.
2. **Explícita:** calcular $f'_x(x_0,y_0)$ y $f'_y(x_0,y_0)$. **Implícita:** $F'_x,F'_y,F'_z$ en $M$.
3. Armar el **vector normal**: $\vec n=(f'_x,f'_y,-1)$ o $\vec n=\nabla F(M)$.
4. Plano: $\vec n\cdot(x-x_0,\,y-y_0,\,z-z_0)=0$. Recta normal: por $M$ con dirección $\vec n$.
5. Opcional: pasar a $Ax+By+Cz=D$.

## Fórmulas clave

$$z-z_0=f'_x(x_0,y_0)\,(x-x_0)+f'_y(x_0,y_0)\,(y-y_0)\qquad\text{(plano tangente, explícita)}$$

$$\frac{x-x_0}{f'_x}=\frac{y-y_0}{f'_y}=\frac{z-z_0}{-1}\qquad\text{(recta normal)}$$

$$F'_x(x-x_0)+F'_y(y-y_0)+F'_z(z-z_0)=0,\qquad \frac{x-x_0}{F'_x}=\frac{y-y_0}{F'_y}=\frac{z-z_0}{F'_z}$$
- $\vec n=(f'_x,f'_y,-1)$ (o su opuesto) es el vector normal; si $F=f(x,y)-z$ se recupera la fórmula explícita.
- **Plano tangente paralelo a $ax+by+cz=d$** _(estándar)_: $\nabla F(M)$ múltiplo de $(a,b,c)$, o sea $F'_x/a=F'_y/b=F'_z/c$, junto con $F(M)=0$.

## Por qué funciona
Para el plano explícito, $dz=f'_x\,dx+f'_y\,dy$ con $dx=x-x_0$, etc., es el incremento sobre el plano tangente. Para el implícito: sobre cualquier curva de la superficie, $F(x(t),y(t),z(t))=0$ da $\nabla F\cdot\vec T=0$; el gradiente es perpendicular a todas las tangentes en $M$.

## Ejemplo resuelto
$z=9-x^2-y^2$ en $M(1,2,4)$ _(Monllor p.16, verificado)_: $f'_x=-2x\to-2$, $f'_y=-2y\to-4$.

$$z-4=-2(x-1)-4(y-2)\ \Leftrightarrow\ 2x+4y+z=14,\qquad \frac{x-1}{-2}=\frac{y-2}{-4}=\frac{z-4}{-1}$$

Implícita _(propio)_: $x^2+y^2+z^2=14$ en $(1,2,3)$ ($1+4+9=14$ ✓). $F=x^2+y^2+z^2-14$, $\nabla F=(2x,2y,2z)=(2,4,6)$. Plano: $2(x-1)+4(y-2)+6(z-3)=0\Leftrightarrow x+2y+3z=14$. Recta normal: $\dfrac{x-1}{2}=\dfrac{y-2}{4}=\dfrac{z-3}{6}$.

**Ejemplo encadenado con Lagrange** (1H9 May-24 #4): "caja de volumen máximo con un vértice en el origen y el opuesto en el plano tangente al paraboloide $z=16-x^2-y^2$ en $P(1;2)$". El plano **no está dado**: primero se calcula.
- $z_0=16-1-4=11$ (el $P(1;2)$ da solo $x_0,y_0$; la cota se calcula), $f'_x=-2x\to-2$, $f'_y=-2y\to-4$.

$$z-11=-2(x-1)-4(y-2)\ \Leftrightarrow\ 2x+4y+z=21$$

- Ese plano pasa a ser la **condición de Lagrange**: $F=xyz+\lambda\,(2x+4y+z-21)$ y se maximiza $V=xyz$ (resultado en el machete de extremos ligados: $x=\frac72$, $y=\frac74$, $z=7$, $V=\frac{343}8$).
- Error típico: usar el paraboloide como condición (no es un plano).

## Errores frecuentes
- Olvidar el $-1$ en $\vec n=(f'_x,f'_y,-1)$ al pasar de explícita a implícita.
- Evaluar las parciales en un punto distinto de $M$.
- No verificar que $M$ pertenece a la superficie.
- Dejar $x,y$ en el vector normal: hay que evaluarlo en $M$.
- Confundir recta tangente (en una dirección) con **plano** tangente.
- En la recta normal, poner denominador $0$ sin escribirla como paramétrica (si $f'_x=0$, usar $x=x_0$).

## Cómo comprobar el resultado
- $M$ cumple la ecuación del plano.
- $\vec n$ es perpendicular a dos tangentes en la superficie (p. ej. $(1,0,f'_x)$ y $(0,1,f'_y)$).
- La recta normal pasa por $M$ con dirección $\vec n$.

> **Elaborado para el sitio — verificar con la cátedra:** fórmulas y primer ejemplo son de Monllor p.14-16 y de U2 Compuestas e Implícitas. El ejemplo de la esfera y la condición de paralelismo son estándar y propios; el encadenado con Lagrange es 1H9 May-24 #4, con resolución del profe.
