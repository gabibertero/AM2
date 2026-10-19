---
slug: diferencial-total-y-errores
titulo: "Diferencial total y errores (absoluto, relativo, porcentual)"
unidad: U2
orden: 15
ejerciciosOficiales: ["p1-1h10-2025-09#2", "p1-1r7-2025-10#2", "p1-2s2-2025-06-b#2", "p1-2s2-2024-06-b#2", "p1-1r3-2024-10-a#2", "p1-1r3-2024-10-b#2", "p1-1h9-2024-05#2", "p1-todas-2025-11-rec#2"]
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
3. Identificar $dx,dy,\dots$ (errores, espesores o incrementos). Si el error viene como porcentaje de la medida (p. ej. 1 %), $dx=0{,}01\,x$.
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

Caso material (1H10 Sep-25 #2): $V=xyz=6$ en $(3,2,1)$, espesores $1\,\%$: $dV=yz\,dx+xz\,dy+xy\,dz=2\cdot0{,}03+3\cdot0{,}02+6\cdot0{,}01=0{,}18$ y $\dfrac{0{,}18}{6}\cdot100=3\,\%$.

## Errores frecuentes
- Usar $\Delta z$ exacto cuando piden "por método diferencial".
- Olvidar los **valores absolutos** en el error máximo (los errores compensan signos).
- Calcular $dz$ pero **no dividir por $z$** para el relativo/porcentual (o dividir por la medida equivocada).
- Evaluar las parciales en el punto equivocado.
- Convertir mal el porcentaje: 1 % de 3 es $0{,}03$, no $0{,}3$.
- Pieza **hueca**: los $dx$ son espesores (aumentos de la medida *interna*) y la aproximación da el material, no el volumen interno.
- Mezclar unidades (mm con cm).

## Cómo comprobar el resultado
- Calculá $\Delta z$ exacto con los valores incrementados: tiene que ser parecido a $dz$ (Monllor p.10: $dz=0{,}88$ vs. $\Delta z\approx0{,}9175$).
- El orden de magnitud del error porcentual tiene que ser parecido a la suma de los porcentajes de las medidas (con pesos según los exponentes).
- Unidades de $dz$ = unidades de $z$.

> **Elaborado para el sitio — verificar con la cátedra:** la fórmula del error máximo es la de la cátedra (cuestionario pregunta 27); los nombres "relativo" y "porcentual" y el ejemplo del cilindro son estándar y propios.
