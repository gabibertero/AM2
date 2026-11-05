---
slug: integral-triple-cilindricas-esfericas
titulo: "Integral triple en cilíndricas y esféricas"
unidad: U4
orden: 2
ejerciciosOficiales: ["1h10-2026-10-31-a#2", "1r3-2025-11-14#2", "1r7-2025-11-11#2", "1v1-2025-11-13-a#2", "1v1-2025-11-13-b#2", "2s2-2025-11-07-a#2", "2s2-2025-11-07-b#2", "recup-1h10-2025-11-08#2", "1h9-2026-06-27-a#1", "1h9-2026-06-27-b#1", "recup-2025-11-20#1"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/05-INTEGRALES MULTIPLES 2015.pdf, p. 35-38"
  - "teoria/Teorico-practico Rocha-Giordano/12_Integrales triples_CC.pdf, p. 1-2"
  - "teoria/AM2 Resumen segundo parcial.pdf, p. 13-14"
  - "parciales/2do-parcial/2026-10-31-1H10-A.png, p. 1 (enunciado aportado por Gabi; resolución elaborada para el sitio)"
---
> **Prioridad alta.** Una integral triple se parece a un volumen, pero también hay una función que transformar. Primero aprendé cilíndricas; esféricas aparece en el recuperatorio del 20/11/2025.

## Cómo reconocerlo

La consigna dice **«integral triple de la función…»**. Separá dos cosas en tu hoja: **qué integrar** (la función) y **dónde integrar** (el cuerpo).

## Pasos cortos en cilíndricas

1. Anotá la función original $f(x,y,z)$.
2. Cambiá $x=r\cos\theta$, $y=r\sin\theta$ y dejá $z$ igual.
3. Usá $x^2+y^2=r^2$ y $\sqrt{x^2+y^2}=r$ porque $r\ge0$.
4. Reescribí también las superficies que encierran el cuerpo.
5. Buscá el piso y techo de $z$.
6. Igualalos para obtener el radio exterior cuando corresponde.
7. Fijá el intervalo angular según el cuerpo: una vuelta entera es $0$ a $2\pi$.
8. **Multiplicá la función transformada por otro $r$**, el jacobiano.
9. Armá la triple con el orden elegido y sus diferenciales. Si usás $dz\,dr\,d\theta$, integrás primero en $z$.
10. Al integrar una variable, tratá las otras como constantes.
11. Evaluá cada integral con **superior menos inferior** antes de pasar a la siguiente.

$$I=\int\int\int f(r\cos\theta,r\sin\theta,z)\,r\,dz\,dr\,d\theta.$$

## Ejemplo del parcial del 31/10

**Ejercicio 2:** función $u=\sqrt{4x^2+4y^2}$; región limitada por $z^2=x^2+y^2$ y $z=2$.

1. El plano $z=2$ cierra el **cono superior**. La rama inferior del cono y ese plano solos no encierran otro cuerpo acotado.
2. En la rama superior, $z=r$. El piso es $r$ y el techo es $2$.
3. En el corte con el plano: $r=2$. Entonces $0\le r\le2$.
4. Sin restricción de cuadrante: $0\le\theta\le2\pi$.
5. Transformá la función: $u=\sqrt{4r^2}=2r$.
6. Agregá el jacobiano: $u\,dV$ aporta $2r\cdot r=2r^2$.

$$I=\int_0^{2\pi}\int_0^2\int_r^2 2r^2\,dz\,dr\,d\theta.$$

7. Primero $z$: $2r^2$ es constante respecto de $z$.

$$\int_r^2 2r^2\,dz=\left[2r^2z\right]_r^2=2r^2(2-r).$$

8. Distribuí e integrá en $r$:

$$\int_0^2(4r^2-2r^3)\,dr=\left[\frac{4r^3}{3}-\frac{r^4}{2}\right]_0^2=\frac{32}{3}-8=\frac83.$$

9. Integrá en $\theta$: $\frac83\cdot2\pi$.

$$\boxed{I=\frac{16\pi}{3}}$$

## Si la consigna pide esféricas

Usá $\rho$ para la distancia al origen, para distinguirla del radio cilíndrico $r$:

$$x=\rho\sin\varphi\cos\theta,\quad y=\rho\sin\varphi\sin\theta,\quad z=\rho\cos\varphi.$$

1. En una esfera de radio $a$, $\rho=a$.
2. $\varphi$ se mide desde el eje $z$ positivo; $\theta$ gira en el plano $xy$.
3. Cono superior $z=\sqrt{x^2+y^2}$: $\varphi=\pi/4$.
4. Dentro del cono superior: $0\le\varphi\le\pi/4$. Si el lado no está claro, declaralo y revisá el dibujo.
5. Primer octante: $0\le\theta\le\pi/2$ y $0\le\varphi\le\pi/2$, antes de agregar otras restricciones.
6. Transformá la función y multiplicá por **$\rho^2\sin\varphi$**.
7. Entre esferas de radios $1$ y $2$, dentro del cono superior y en el primer octante, los límites son $1\le\rho\le2$, $0\le\varphi\le\pi/4$, $0\le\theta\le\pi/2$.

No intercambies los dos jacobianos: cilíndricas lleva $r$; esféricas lleva $\rho^2\sin\varphi$.

## Comprobá y evitá estos errores

- En el ejemplo la función es positiva y el cuerpo tiene volumen positivo: el resultado debe ser positivo.
- Con orden alternativo: $0\le z\le2$, $0\le r\le z$; $\int_0^{2\pi}\int_0^2\int_0^z2r^2\,dr\,dz\,d\theta$ también da $16\pi/3$.
- $\sqrt{4r^2}=2r$, no $4r$.
- Transformar la función **no** reemplaza el jacobiano: ambos factores se necesitan.
- En los parciales de junio, el seno/coseno puede anular la integral. Aun si da cero, escribí el cuerpo y los límites completos.
- **Prueba sin mirar:** separá función, superficies, límites y jacobiano en cuatro renglones.
