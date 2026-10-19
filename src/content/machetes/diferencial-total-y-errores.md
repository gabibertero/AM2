---
slug: diferencial-total-y-errores
titulo: "Diferencial total y errores (absoluto, relativo, porcentual)"
unidad: U2
orden: 15
ejerciciosOficiales: ["p1-1h10-2025-09#2", "p1-1r7-2025-10#2", "p1-2s2-2025-06-b#2", "p1-2s2-2024-06-b#2", "p1-1r3-2024-10-a#2", "p1-1r3-2024-10-b#2", "p1-1h9-2024-05#2", "p1-todas-2025-11-rec#2", "p1-1h9-2023-05#2", "p1-1h9-2023-07-rec#2", "p1-1h10-2023-10-rec#2", "p1-2s2-2023-07#2", "p1-1r3-2023-09-a#3", "p1-1r3-2023-09-b#3"]
fuentes:
  - "teoria/Apuntes Ing. Monllor/02-DERIVADAS Y DIFERENCIALES 2015.pdf, p. 8-13 (diferencial, aplicaciones y errores)"
  - "teoria/Teorico-practico Rocha-Giordano/4_Diferencial.pdf, p. 1"
  - "AM2_A 2025.pdf, p. 1-2 (cuestionario, preguntas 24, 27, 28)"
---

## Cómo reconocerlo
- "Calcular **por método diferencial**..." / "aproximar el valor de...".
- "Error máximo", "error porcentual", "errores de medición de $\pm$...", "cantidad de **material** de una pieza hueca con espesor...".
- Una fórmula geométrica o física (volumen, área, período) con medidas que tienen un pequeño error o un espesor.

## Qué necesitás antes
- $z=f(x,y)$ con derivadas parciales **continuas** (entonces es diferenciable).
- Incrementos $dx,dy$ **chicos** respecto de las medidas: $\Delta z\approx dz$.
- Distinguir: **material/aproximación** (los $dx$ son los espesores o incrementos, con su signo) vs. **error máximo** (se suman valores absolutos).

## Pasos
1. Escribir la fórmula $z=f(x,y,\dots)$ (volumen, área, ...).
2. Calcular las derivadas parciales y **evaluarlas** en el punto de medida.
3. Identificar $dx,dy,\dots$ (errores, espesores o incrementos). Si el error viene como porcentaje de la medida (p. ej. 1 %), $dx=0{,}01\,x$. Si hay un **ángulo**, pasar $d\theta$ a **radianes** ($3^\circ=\frac{3\pi}{180}=\frac\pi{60}$) antes de multiplicar.
4. Armar $dz=f'_x\,dx+f'_y\,dy+\dots$
5. **Error máximo aproximado** (absoluto): $e_{\max}\approx|f'_x||dx|+|f'_y||dy|+\dots$
6. **Relativo** $=e_{\max}/|z|$ y **porcentual** $=$ relativo $\cdot\,100$.
7. Escribir con unidades (mm$^3$, cm$^2$, ...).

## Fórmulas clave

$$dz=\frac{\partial z}{\partial x}\,dx+\frac{\partial z}{\partial y}\,dy,\qquad \Delta z\approx dz$$

$$e_{\max}\approx\Big|\frac{\partial z}{\partial x}\Big||dx|+\Big|\frac{\partial z}{\partial y}\Big||dy|,\qquad e_{\text{rel}}=\frac{e_{\max}}{|z|},\qquad e_\%=\frac{e_{\max}}{|z|}\cdot100$$

$$f(x+dx,\,y+dy)\approx f(x,y)+f'_x\,dx+f'_y\,dy$$
- $dz$: parte lineal (principal) del incremento; $\Delta z-dz$ es de orden superior.
- Para tres variables se agrega $f'_z\,dz$ (aquí $dz$ de la variable; cuidado con la letra).

## Por qué funciona
El incremento total es $\Delta z=f'_x\Delta x+f'_y\Delta y+\varepsilon_1\Delta x+\varepsilon_2\Delta y$ con $\varepsilon_i\to0$. Los dos últimos términos son de orden superior, así que la parte lineal $dz$ aproxima a $\Delta z$. Geométricamente, $dz$ es el incremento de altura sobre el **plano tangente**.

## Ejemplo resuelto
Cilindro: $V=\pi r^2h$ con $r=5$ cm, $h=10$ cm y errores $|dr|=0{,}1$, $|dh|=0{,}2$ cm _(propio, verificado a mano)_.
- $V=250\pi$ cm$^3$.
- $V'_r=2\pi rh=100\pi$ y $V'_h=\pi r^2=25\pi$.
- $e_{\max}=100\pi\cdot0{,}1+25\pi\cdot0{,}2=10\pi+5\pi=15\pi\approx47{,}1$ cm$^3$.
- Relativo $=\dfrac{15\pi}{250\pi}=0{,}06$; porcentual $=6\,\%$.

**¿Error máximo o variación con signo?** Depende de lo que diga el enunciado:
- "Error de medición del 2 %", "tolerancia $\pm$", "máximo error": se suman **valores absolutos** (todos los aportes positivos). Cono $V=\frac{\pi R^2H}{3}$, $R=2$, $H=3$, errores del 2 %: $dR=0{,}04$, $dH=0{,}06$, $dV=4\pi\cdot0{,}04+\frac{4\pi}{3}\cdot0{,}06=0{,}24\pi\ \text{m}^3$ y $E\%=\frac{0{,}24\pi}{4\pi}\cdot100=6\,\%$ (1R3 Sep-23 A #3).
- "Disminuyen" / "aumenta": cada $dx$ lleva **su signo** y el resultado también. Pirámide $V=\frac{ABH}{3}$, $A=1$, $B=2$, $H=3$ m, los lados de la base **disminuyen 2 %** y la altura **aumenta 3 %**: $dA=-0{,}02$, $dB=-0{,}04$, $dH=+0{,}09$.

$$dV=2\cdot(-0{,}02)+1\cdot(-0{,}04)+\frac23\cdot0{,}09=-0{,}02\ \text{m}^3$$

$$E\%=\frac{-0{,}02}{2}\cdot100=-1\,\%$$

El signo negativo dice que el volumen **disminuye** (20 litros). Chequeo: $\frac{dV}{V}=\frac{dA}{A}+\frac{dB}{B}+\frac{dH}{H}=-0{,}02-0{,}02+0{,}03=-1\,\%$ (1R3 Sep-23 B #3; algo parecido en 1R3 Oct-24 A #2).

**Ángulo en radianes** (Recup. Nov-25 #2): tiro oblicuo, $H=\frac{v_0^2\sin^2\theta}{2g}$, $R=\frac{v_0^2\sin2\theta}{g}$, $v_0=50$ m/s, $\theta=45^\circ$, $g=10$, con $dv_0=\pm1\,\%=0{,}5$ y $d\theta=\pm3^\circ=\frac\pi{60}$ rad. Para $R$: $R'_{v_0}=\frac{2v_0\sin2\theta}{g}=10$ y $R'_\theta=\frac{2v_0^2\cos2\theta}{g}=0$ (porque $\cos90^\circ=0$), entonces $dR=10\cdot0{,}5=5$ m y $E\%=\frac5{250}\cdot100=2\,\%$. Para $H$: $H'_\theta=\frac{v_0^2\sin\theta\cos\theta}{g}=125$ y el aporte del ángulo es $125\cdot\frac\pi{60}=\frac{25\pi}{12}$ (con $d\theta=3$ en vez de $\frac\pi{60}$ el resultado sería absurdo).

⚠️ En ese ejercicio la resolución del profe da $\frac52$ en el primer término de $dH$ y el recálculo da $\frac54$ ($H'_{v_0}\,dv_0=\frac52\cdot\frac12$); está marcado como pendiente de confirmar con la cátedra.

**Pieza hueca** (1H9 May-24 #2): cilindro hueco de **8 cm de diámetro** y 10 cm de altura, espesores: pared lateral 2 mm, fondo 5 mm, tapa 1 mm. Pasos:
- Diámetro $\to$ **radio**: $r=4$ cm, $h=10$ cm (medidas del hueco interior).
- Todo a **cm**: $dr=0{,}2$ (la pared suma al radio **una vez**); $dh=0{,}5+0{,}1=0{,}6$ (**fondo + tapa**, cada espesor una sola vez).
- $V'_r=2\pi rh=80\pi$ y $V'_h=\pi r^2=16\pi$.

$$dV=80\pi\cdot0{,}2+16\pi\cdot0{,}6=25{,}6\pi\ \text{cm}^3\approx80{,}4\ \text{cm}^3$$

Es el **material** (no el volumen $160\pi$ del hueco). Exacto por capas: $26{,}984\pi$; el diferencial queda cerca (espesores no tan chicos).

Caso material (1H10 Sep-25 #2): $V=xyz=6$ en $(3,2,1)$, espesores $1\,\%$: $dV=yz\,dx+xz\,dy+xy\,dz=2\cdot0{,}03+3\cdot0{,}02+6\cdot0{,}01=0{,}18$ y $\dfrac{0{,}18}{6}\cdot100=3\,\%$.

## Errores frecuentes
- Usar $\Delta z$ exacto cuando piden "por método diferencial".
- Olvidar los **valores absolutos** en el error máximo (los errores compensan signos).
- Calcular $dz$ pero **no dividir por $z$** para el relativo/porcentual (o dividir por la medida equivocada).
- Evaluar las parciales en el punto equivocado.
- Convertir mal el porcentaje: 1 % de 3 es $0{,}03$, no $0{,}3$.
- Pieza **hueca**: los $dx$ son espesores (aumentos de la medida *interna*) y la aproximación da el material, no el volumen interno.
- Mezclar unidades (mm con cm).
- Ángulo en grados dentro de la cuenta: va en **radianes** ($3^\circ=\pi/60$).
- Poner valor absoluto cuando el enunciado dice "disminuye" (o ignorar el signo del resultado): con signo, $dV<0$ y $E\%<0$ significan que la magnitud baja.
- Pieza hueca: usar el diámetro como radio, o sumar un espesor dos veces (o solo fondo o solo tapa en $dh$).

## Cómo comprobar el resultado
- Calculá $\Delta z$ exacto con los valores incrementados: tiene que ser parecido a $dz$ (Monllor p.10: $dz=0{,}88$ vs. $\Delta z\approx0{,}9175$).
- El orden de magnitud del error porcentual tiene que ser parecido a la suma de los porcentajes de las medidas (con pesos según los exponentes).
- Unidades de $dz$ = unidades de $z$.

> **Elaborado para el sitio — verificar con la cátedra:** la fórmula del error máximo es la de la cátedra (cuestionario pregunta 27); los nombres "relativo" y "porcentual" y el ejemplo del cilindro son estándar y propios.
