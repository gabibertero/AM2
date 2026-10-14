---
slug: volumen-polares-cilindricas
titulo: "Volumen entre superficies (polares / cilíndricas)"
unidad: U4
orden: 1
ejerciciosOficiales: ["1r3-2025-11-14#1", "1r7-2025-11-11#1", "1v1-2025-11-13-a#1", "1v1-2025-11-13-b#1", "2s2-2025-11-07-a#1", "2s2-2025-11-07-b#1", "recup-1h9-2025-07-05#1", "recup-1h10-2025-11-08#1"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/05-INTEGRALES MULTIPLES 2015.pdf, p. 22 (polares) y p. 35-36 (cilíndricas)"
  - "teoria/Teorico-practico Rocha-Giordano/11_Integrales dobles_CC.pdf, p. 1; 12_Integrales triples_CC.pdf, p. 1-2"
  - "teoria/AM2 Resumen segundo parcial.pdf, p. 7-9 y 13"
---

## Cómo reconocerlo
- "Calcular el volumen del sólido limitado por…" con cilindro, paraboloide, cono, esfera, planos.
- El enunciado suele sugerir "polares (integral doble) o cilíndricas (integral triple)".
- Aparecen $x^2+y^2$ en las ecuaciones: señal de simetría circular.
- En 2s2 (B) la sugerencia es "coordenadas rectangulares": el mismo método, sin cambio de variables.

## Qué necesitás antes
- Sólido de la forma $z_{inf}(x,y)\le z\le z_{sup}(x,y)$ sobre una región plana $D$ (su proyección en el plano $xy$).
- $z_{sup}\ge z_{inf}$ en todo $D$. Si no, hay que partir $D$ o restar volúmenes.
- $D$ expresable en polares: círculo, anillo o sector ($r_1\le r\le r_2$, $\theta_1\le\theta\le\theta_2$).
- "Primer octante" = $x,y,z\ge0$: $0\le\theta\le\pi/2$ y $z\ge0$.

## Pasos
0. Si el enunciado pide **rectangulares** (p. ej. $y=1-x^2,\ 1\le z\le y+2,\ y\ge0$), no hay cambio de variables: describí $D$ como región tipo I ($-1\le x\le1,\ 0\le y\le1-x^2$) y calculá $V=\iint_D(z_{sup}-z_{inf})\,dy\,dx$ (sin factor $r$). Conviene rectangulares cuando $D$ está acotada por parábolas o rectas y no por circunferencias.
1. **Graficar** (lo piden los enunciados). Marcá cada superficie y el sólido.
2. **Hallar $D$.** Si hay un cilindro $x^2+y^2\le R^2$, ese es el borde. Si no, igualá las dos superficies en $z$ y despejá $x^2+y^2=\dots$: la curva de corte es el borde.
3. **Identificar $z_{inf}$ y $z_{sup}$.** Evaluá un punto interior de $D$ para ver cuál es mayor.
4. **Pasar a polares:** $x=r\cos\theta,\ y=r\sin\theta$ y reescribí $z_{inf}$, $z_{sup}$ en $(r,\theta)$.
5. **Límites** de $r$ y $\theta$ (anillo: $r_{int}\le r\le r_{ext}$; sector: acotá $\theta$).
6. **Integrar** (doble o triple, dan lo mismo).
7. Si el sólido es "fuera de una esfera" (hueco), restá el volumen del hueco o armá las tapas arriba/abajo por separado.

## Fórmulas clave
$$V=\iint_D \big(z_{sup}-z_{inf}\big)\,r\,dr\,d\theta$$
$$V=\int_{\theta_1}^{\theta_2}\!\int_{r_1}^{r_2}\!\int_{z_{inf}}^{z_{sup}} r\,dz\,dr\,d\theta$$
- $z_{sup}-z_{inf}$: altura del sólido sobre cada punto de $D$.
- $r$ (extra): valor absoluto del jacobiano $|J|=r$ de $(r,\theta)\mapsto(x,y)$.
- $dA=dx\,dy=r\,dr\,d\theta$; en cilíndricas $dV=r\,dz\,dr\,d\theta$.
- Ejemplo de la fuente: cono $z=\sqrt{x^2+y^2}$ hasta $z=1$: $V=\int_0^{2\pi}\!\!\int_0^1(1-r)\,r\,dr\,d\theta=\pi/3$.

## Por qué funciona
El volumen es la integral de la altura sobre la base. En polares los pedacitos de área son "sectores" de tamaño $r\,dr\,d\theta$ y no $dr\,d\theta$: el jacobiano corrige esa deformación. Las superficies de revolución quedan con límites constantes, por eso se integra fácil.

## Errores frecuentes
- Olvidar el factor $r$.
- Usar el radio equivocado: cuando no hay cilindro, el radio de $D$ sale de **igualar** las superficies, no de una de ellas.
- Poner $\theta$ en $[0,2\pi]$ cuando el enunciado pide primer octante.
- $z_{sup}$ y $z_{inf}$ invertidos (da volumen negativo).
- Con esfera: reescribí en $r$: $z=\pm\sqrt{R^2-r^2}$ (es lo mismo que $\pm\sqrt{R^2-x^2-y^2}$, pero ya queda listo para integrar). Si el cilindro es $r\le\rho$ con $\rho\le R$, el radicando nunca es negativo en $D$.
- Sólido "dentro del cilindro $r\le R$ y fuera de la esfera $r^2+z^2\ge R^2$" (mismo radio $R$), con $z\ge 0$: el piso es la tapa de la esfera, $z_{inf}=\sqrt{R^2-r^2}$, y el techo es el plano o paraboloide, $z_{sup}$. Si el techo es un plano como $z=y+c$, en cilíndricas queda $z_{sup}=r\sin\theta+c$; al integrar en $\theta\in[0,2\pi]$ el término con $\sin\theta$ da $0$.
- Circunferencias que no pasan por el origen centradas: $x^2+y^2=2ax$ pasa a $r=2a\cos\theta$ con $-\pi/2\le\theta\le\pi/2$ (no aparece en los parciales relevados).
- Planos inclinados (p. ej. $z=y+4$): en polares queda $z=r\sin\theta+4$; no lo dejes en $y$.
- Mezclar límites de la integral doble con los de la triple.

## Cómo comprobar el resultado
- $V>0$ y razonable: acotalo con un volumen conocido (cilindro $\pi R^2h$, cono $\tfrac13\pi R^2h$, esfera $\tfrac43\pi R^3$).
- Hacelo por la doble **y** por la triple: deben coincidir.
- Simetría: si el sólido es simétrico, el resultado es $2\times$ (o $4\times$) la parte.
- Unidades: unidades de volumen.

> **Elaborado para el sitio — verificar con la cátedra:** Las fórmulas y la notación (r, θ, |J|) siguen a Monllor 05 y Rocha 11_CC; el ejemplo del cono es elaborado: verificar con la cátedra.
