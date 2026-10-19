---
slug: extremos-relativos-hessiano
titulo: "Extremos relativos: puntos críticos y hessiano"
unidad: U3
orden: 20
ejerciciosOficiales: ["p1-1h9-2025-05-g1#3", "p1-1h9-2025-05-g2#3", "p1-1h9-2025-07-rec#3", "p1-1h10-2024-b#3", "p1-1h10-2025-09#4", "p1-1r3-2024-10-a#5", "p1-1r3-2024-10-b#5", "p1-1r7-2025-10#4", "p1-2s2-2025-06-b#4", "p1-2s2-2024-06-b#4"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/03-MAXIMOS Y MINIMOS 2015.pdf, p. 6-12"
  - "U2 - Taylor y Extremos Relativos .pdf, p. 20-40"
  - "teoria/Teorico-practico Rocha-Giordano/10_Extremos.pdf, p. 1"
  - "foto de método de WhatsApp w12 (criterio de H), docs/inventario/P1-B-fotos.md"
---

## Cómo reconocerlo
- "Determinar los puntos críticos y categorizarlos en máximos, mínimos y puntos de ensilladura".
- "Hallar los extremos relativos de $z=f(x,y)$." A veces: "no es necesario determinar las coordenadas completas" (no hace falta calcular $z$).
- Función de dos variables sin condición adicional (si hay una ligadura, es Lagrange).

## Qué necesitás antes
- $f$ continua con derivadas parciales hasta el segundo orden **continuas** (así $f''_{xy}=f''_{yx}$).
- Puntos críticos: $f'_x=f'_y=0$ (extremos solo pueden estar ahí, salvo donde no existen las parciales).

## Pasos
1. $f'_x$ y $f'_y$; resolver $f'_x=0,\ f'_y=0$. Si cada ecuación tiene una sola variable, combinar todas las raíces; si están "vinculadas", despejar y reemplazar.
2. $f''_{xx}$, $f''_{yy}$, $f''_{xy}$ y armar $H=f''_{xx}f''_{yy}-(f''_{xy})^2$.
3. Evaluar $H$ en **cada** punto crítico.
4. Clasificar:
   - $H>0$ y $f''_{xx}>0$: **mínimo**; $H>0$ y $f''_{xx}<0$: **máximo**.
   - $H<0$: **silla** (ensilladura).
   - $H=0$: **dudoso**: estudiar el signo de $f(x,y)-f(P_0)$ cerca del punto.
5. Si lo piden, la cota $z_0=f(P_0)$ (también para sillas).

## Fórmulas clave

$$H=\begin{vmatrix}f''_{xx}&f''_{xy}\\f''_{yx}&f''_{yy}\end{vmatrix}=f''_{xx}\,f''_{yy}-\big(f''_{xy}\big)^2$$
| En el punto crítico | Conclusión |
|---|---|
| $H>0,\ f''_{xx}>0$ | mínimo relativo |
| $H>0,\ f''_{xx}<0$ | máximo relativo |
| $H<0$ | punto de ensilladura |
| $H=0$ | no decide |
- Con $H>0$, $f''_{xx}$ y $f''_{yy}$ tienen el mismo signo: sirve cualquiera.
- Caso dudoso: mirar $\Delta f=f(x,y)-f(P_0)$; si tiene signo constante hay extremo, si toma ambos signos (dos trayectorias) es silla.

## Por qué funciona
En un punto crítico los términos de primer orden de Taylor se anulan y $\Delta f=\tfrac12\big[f''_{xx}\Delta x^2+2f''_{xy}\Delta x\Delta y+f''_{yy}\Delta y^2\big]$. Completando el cuadrado aparece $H\,\Delta y^2$: con $H>0$ el corchete no cambia de signo (extremo); con $H<0$ sí cambia (silla).

## Ejemplo resuelto
$z=x^3+3xy+y^3$ _(teoría U3, verificado)_.
- $f'_x=3x^2+3y=0\Rightarrow y=-x^2$; $f'_y=3y^2+3x=0\Rightarrow3x^4+3x=0\Rightarrow x(x^3+1)=0$.
- Críticos: $(0,0)$ y $(-1,-1)$.
- $f''_{xx}=6x$, $f''_{yy}=6y$, $f''_{xy}=3$, entonces $H=36xy-9$.
- $H(0,0)=-9<0$: **silla** en $(0,0,0)$.
- $H(-1,-1)=27>0$ y $f''_{xx}=-6<0$: **máximo** relativo en $(-1,-1,1)$.

Caso dudoso: $z=x^4+y^4$ tiene $H=144x^2y^2=0$ en el origen, pero $\Delta f=x^4+y^4>0$: mínimo. Con $x^3+y^3$ (también $H=0$) hay silla porque $\Delta f$ cambia de signo con $x$ sobre $y=0$.

## Errores frecuentes
- Perder puntos críticos al resolver el sistema (p. ej. dividir por $x$ y perder $x=0$).
- Combinar raíces en pares cuando las ecuaciones están vinculadas: solo se combinan si cada ecuación depende de **una** variable; si no, hay que despejar y reemplazar.
- Olvidar el cuadrado en $(f''_{xy})^2$, o perder su signo (se resta siempre).
- Clasificar con el signo de $H$ sin mirar $f''_{xx}$ (con $H>0$ hay que distinguir máx/mín).
- Concluir "silla" cuando $H=0$ (no se puede concluir).
- No evaluar $H$ en el punto (dejarlo en función de $x,y$).
- Confundir el punto $(x_0,y_0)$ con el punto del gráfico $(x_0,y_0,z_0)$.

## Cómo comprobar el resultado
- Reemplazá cada punto crítico en $f'_x$ y $f'_y$: deben dar $0$.
- Mirá $f$ cerca del punto en dos direcciones: sube y baja (silla), solo sube (mínimo), solo baja (máximo).
- Con curvas de nivel: óvalos que se achican hacia el punto indican extremo; un cruce en X indica silla.

> **Elaborado para el sitio — verificar con la cátedra:** el criterio de $H$ y el ejemplo son de la cátedra (Monllor y U2 Taylor y Extremos); los ejemplos del caso dudoso se tomaron de Demostraciones parcial 1.pdf y de la teoría U3 sección 7.
