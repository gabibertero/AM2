---
slug: edo2-variacion-de-parametros
titulo: "EDO de 2.º orden: variación de parámetros"
unidad: U9
orden: 12
ejerciciosOficiales: []
fuentes:
  - "teoria/Apuntes Ing. Monllor/09-ECUACIONES DIFERENCIALES DE ORDEN SUPERIOR2015.pdf, p. 20-22"
  - "teoria/Teorico-practico Rocha-Giordano/15_Ecuaciones Diferenciales de Segundo Orden.pdf, p. 2 (solo la menciona)"
---
> **Dejá este método para después.** No aparece en los parciales prácticos oficiales relevados. El del 31/10 pide coeficientes indeterminados: usá ese método para ese ejercicio.

## Cómo reconocerlo

La consigna pide «variación de parámetros», o necesitás una particular para una función que no encaja en coeficientes indeterminados. Se parte de:

$$y''+p(x)y'+q(x)y=f(x).$$

Si el coeficiente de $y''$ no es $1$, dividí **toda** la ecuación antes de empezar.

## Pasos cortos

1. Resolvé la homogénea y separá sus dos soluciones: $y_h=C_1y_1+C_2y_2$.
2. Derivá $y_1$ e $y_2$.
3. Calculá $W=y_1y_2'-y_2y_1'$. Se llama wronskiano; necesitás $W\ne0$ en el intervalo de trabajo.
4. Buscá $y_p=uy_1+vy_2$, con $u,v$ funciones por calcular.
5. Escribí las dos ecuaciones: $u'y_1+v'y_2=0$ y $u'y_1'+v'y_2'=f$.
6. Resolvé ese sistema para $u'$ y $v'$:

$$u'=-\frac{y_2f}{W},\qquad v'=\frac{y_1f}{W}.$$

7. Integrá cada una para hallar $u$ y $v$. Podés elegir constantes cero: basta una particular.
8. Armá $y_p=uy_1+vy_2$.
9. Sumá $y=y_h+y_p$.
10. Verificá sustituyendo en la original.

## Ejemplo didáctico breve

$$y''+y=\frac1{\cos x},\qquad \cos x\ne0.$$

1. Homogénea: $y_1=\cos x$, $y_2=\sin x$.
2. Sus derivadas son $-\sin x$ y $\cos x$.
3. $W=\cos^2x+\sin^2x=1$.
4. $u'=-\sin x/\cos x=-\tan x$, $v'=1$.
5. $u=\ln|\cos x|$, $v=x$. La derivada del logaritmo es $-\sin x/\cos x$.
6. $y_p=\cos x\ln|\cos x|+x\sin x$.

$$\boxed{y=C_1\cos x+C_2\sin x+\cos x\ln|\cos x|+x\sin x}.$$

El ejemplo es elaborado, no pertenece a un parcial oficial.

## Comprobá y evitá estos errores

- El signo menos está en $u'$, no en $v'$.
- Conservá el mismo orden de $y_1,y_2$ al calcular $W$.
- En el ejemplo, $y_p'= -\sin x\ln|\cos x|+x\cos x$ y $y_p''+y_p=1/\cos x$.
- Trabajá dentro de un intervalo que no cruce los ceros de $\cos x$.
- No dediques el primer bloque de estudio a este método mientras los cinco ejercicios del 31/10 sigan pendientes.
