# Auditoría machetes — 2026-10-14

Puntaje = Σ(peso×nota)/Σpeso×100 con corrección (3), fidelidad (2), suficiencia para el parcial (3), claridad (1).
Verificado con sympy: ejemplos de Bernoulli (z'−4z=−2), lineal (y=2+3e^{−x³}), VP (y_p=e^{7x}/98), cono (π/3), 1r3#1 (32π/3), 1h9-a#2 y 1h9-b#2 por definición (16/3), 1r3#5 (y_p=2e^{2x}+½cos2x−½sen2x), recup#3 exacta (P_y=Q_x=4y). Fuentes abiertas: Monllor 05 p.37, 06 p.9, 08 p.3/7/9/10/12, 09 p.14-21; Rocha 11-15 completos; resoluciones oficiales 1r3 p.4,7 y 1h9-A p.3.

| slug | puntaje | errores matemáticos | faltantes |
|---|---|---|---|
| volumen-polares-cilindricas | 86 | ninguno | coordenadas rectangulares (2s2-b#1) sin pasos; cilindro no centrado |
| integral-triple-cilindricas-esfericas | 86 | ninguno | cono y paraboloide como límites de z en cilíndricas; elipsoide; qué lado del cono |
| curvilinea-por-definicion | 82 | ninguno (regla "abajo izq→der" no sirve para x=g(y)) | elipse x=a cos t, y=b sin t (1v1-b#3); sentido en x=g(y); ángulos del arco de circunferencia; truco de intersecciones |
| teorema-de-green | 86 | ninguno (regla "arriba menos abajo" falla si la región no es tipo I) | partir la región; área ½∮(x dy−y dx); semicírculo ambiguo (1v1-a#3) |
| edo-variables-separables | 94 | ninguno | ejemplo resuelto con solución perdida |
| edo-homogenea | 93 | ninguno | pasar P dx+Q dy=0 a y'=−P/Q con ejemplo; ejemplo resuelto |
| edo-lineal | 93 | ninguno | caso x y'+y=… (dividir por x); ejemplo con y_p no inmediata |
| edo-bernoulli | 92 | ninguno | ejemplo con n negativo/fraccionario (n=−1, −2, −1/2); condición y>0 |
| edo-exacta | 90 | ninguno (factor integrante correcto, marcado fuera de fuentes) | pasar y'=−A/B a A dx+B dy=0 |
| edo2-homogenea-coef-constantes | 94 | ninguno | ejemplo numérico completo con condiciones iniciales |
| edo2-coeficientes-indeterminados | 84 | ambiguo: "producto de las propuestas" (induce a usar el mismo polinomio en cos y sen) | ejemplo resuelto con resonancia; polinomio×sen/cos; mezcla de resonancia en un solo término |
| edo2-variacion-de-parametros | 94 | ninguno | ejemplo con tan x o ln x; y_h con raíces complejas |

**Promedio: 89.5**

## Detalle por machete

### volumen-polares-cilindricas
- Pasos: agregar un paso 0 "si el enunciado dice rectangulares (2s2-b#1: y=1−x², 1≤z≤y+2, y≥0), D: −1≤x≤1, 0≤y≤1−x², V=∬(z_sup−z_inf)dy dx". Hoy solo dice "el mismo método".
- Errores frecuentes: agregar caso del esfera inscripta en el cilindro (1r3#1): z_inf=√(4−r²) porque r≤2 ya garantiza el radicando, y z_sup=r sinθ+4; el término impar en sinθ se anula al integrar en [0,2π].
- Línea "z=±√(R²−r²), no ±√(R²−x²−y²) sin pasar a r": son iguales; reformular como "reescribir en r".
- Falta mencionar circunferencias desplazadas (r=2a cosθ); aparecen en Rocha 11 ej.1-2 aunque no en parciales.

### integral-triple-cilindricas-esfericas
- Fórmulas clave: agregar para cilíndricas "cono z=√(x²+y²) → z=r; paraboloide z=x²+y² → z=r²; plano z=4 → z=4". Hoy solo está φ=π/4 para esféricas. Con eso se resuelve 1h9-A#1 (r≤z≤4, 0≤r≤4; la integral da 0 por ∫cosθ).
- Agregar ellipsoide x²+y²+z²/9=1 → z=±3√(1−r²) (1v1-b#2).
- Esféricas: aclarar que "hoja superior del cono, entre esferas" se interpreta 0≤φ≤π/4 (recup#1); el enunciado no dice qué lado y el machete debería pedir declarar la suposición. Resultado verificado: 15π/16−15/8.
- Usa r para ρ en esféricas (igual que Monllor y Rocha); correcto con la convención de la cátedra (φ desde z, jacobiano r² sinφ, Monllor 05 p.37). Nota: Rocha 12 tiene un typo (z=r cos θ); no copiarlo.

### curvilinea-por-definicion
- Paso 3: agregar "elipse x²/a²+y²/b²=1: x=a cos t, y=b sin t" (1v1-b#3 no se puede plantear sin esto).
- Paso 3 y regla "abajo izq→der, arriba der→izq": para x=g(y) dice "igual criterio" pero no lo explica. Escribir: curva a la derecha se recorre subiendo (y crece), a la izquierda bajando. En 1h9 la rama x=y²−y NO es "la de arriba" y=f(x); la regla literal falla.
- Circunferencia: indicar cómo sacar los límites del arco (1r3#3: puntos (1,1),(−1,1) en circunferencia radio √2 → t de π/4 a 3π/4). La resolución oficial usa y=√(2−x²) en vez de parametrizar; mencionarlo como alternativa válida.
- Paso 1: agregar el truco de restar las ecuaciones cuando son simétricas (y=x²−x, x=y²−y → (x−y)(x+y)=0). La intersección real es un cuártico con raíz doble.
- Nota final: el criterio de orientación no es solo "no figura en las fuentes" sino que además es inexacto; reemplazar por la regla de región a la izquierda.

### teorema-de-green
- Errores frecuentes: agregar "si la región no es tipo I/II respecto de la variable elegida hay que partirla". En 1h9#2 la región llega a x∈[−¼,0]; integrar x∈[0,2] con "arriba menos abajo" da 5 en lugar de 16/3 (verificado).
- Fórmulas: agregar área = ½∮(x dy−y dx) (Rocha 13 p.2) además de Q_x−P_y=1.
- Polares: 1v1-a#3 (círculo x²+y²=2 y y=−x) es un semicírculo y hay dos posibles; indicar que hay que dibujar y fijar θ (−π/4..3π/4 o 3π/4..7π/4) según el sentido antihorario de la trayectoria completa; si el enunciado es ambiguo, declararlo.
- Faltan regiones con agujero o curva abierta (cerrar con tramo auxiliar): los parciales no lo piden, es opcional.

### edo-variables-separables
- Agregar un ejemplo resuelto con solución perdida (y'=y(1−y)) donde se vea y=0 y y=1.

### edo-homogenea
- Pasos: ejemplo completo con 1h9-A#3: 2y²−x²y'−2xyy'=0 → y'=2y²/(x²+2xy), f(1,u)=2u²/(1+2u), x u'=−u/(1+2u), ln|y|+2y/x=C, y=0 solución perdida.
- Paso 2: aclarar "−P/Q" también cuando viene como P dx+Q dy y a veces el enunciado ya tiene y' multiplicado por varios términos (agrupar y').

### edo-lineal
- Pasos: agregar caso en que el coeficiente de y' no es 1 (dividir y el signo de P) con ejemplo x y'+y−2x=0 (Rocha ej.18).
- El ejemplo de la fuente tiene P=3x²; el del parcial 1h9-B#3 tiene P=−3x²: mostrar el resultado y=−2+Ce^{x³} para fijar el signo de v=e^{x³}.

### edo-bernoulli
- Agregar ejemplo con n negativo, p. ej. recup-1h9#3: y'+2y=y^{−3}, n=−3, 1−n=4, z=y⁴, z'+8z=4.
- Aclarar para n fraccionario (1v1-b#4, n=−½, z=y^{3/2}) que se supone y>0.
- La observación "perder y=0 si n>0" es correcta; el machete ya la marca como propia.
- Falta decir cómo reconocer Bernoulli cuando viene como x y'−y=x²/y² (2s2-b#4): dividir por x primero para tener y'+Py=Qy^n.

### edo-exacta
- Paso 1: agregar "si viene como y'=−A/B, pasar a A dx+B dy=0".
- Aclarar que el dominio debe ser simplemente conexo (solo si preguntan teoría).
- El factor integrante es matemáticamente correcto (μ(x)=e^{∫(P_y−Q_x)/Q dx}, μ(y)=e^{∫(Q_x−P_y)/P dy}); fuera de fuentes, correctamente rotulado.

### edo2-homogenea-coef-constantes
- Agregar ejemplo numérico completo: 4y''+25y=12y' → y''−3y'+25/4 y=0, Δ=−16, α=3/2, β=2 (Rocha ej.5, resultado e^{3x/2}(cos2x+¼ sen2x)).
- Usa a1,a2; VP usa p,q; unificar notación.

### edo2-coeficientes-indeterminados
- Tabla, fila "producto": reemplazar por lo que muestra Monllor 09 p.17: (Ax+B)e^{2x}; (Ax+B)cos5x+(Cx+D)sen5x (polinomios distintos en cos y en sen); Ae^{3x}cos2x+Be^{3x}sen2x.
- Resonancia: agregar ejemplo de 1h9: y''−2y'+y=e^x−x, k=1 doble, y_p=Ax²e^x+Bx+C (el −x no resuena porque 0 no es raíz). Verificado con sympy: y_p=½x²e^x−x−2.
- Agregar caso k=0 con polinomio (1v1-b#5: y''+y'=x+e^x → polinomio×x, e^x sin x) y y''+y'=2cos x+1 (1r7#5: constante×x y seno/coseno sin x).
- Verificado: 1r3#5 da y_p=2e^{2x}−½sen2x+½cos2x, coincide con la resolución oficial.

### edo2-variacion-de-parametros
- Agregar un ejemplo con tan x: y''+y=tan x (y1=cos, y2=sen, W=1, integrales de sen²/cos).
- Aclarar el caso y_h complejo (y1=e^{αx}cosβx, y2=e^{αx}senβx, W=βe^{2αx}).
- Usa p,q como Monllor; correcto.

## Prueba de examen (solo con el machete)
- 1r3#1 volumen con esfera: resoluble con volumen-polares (z_inf=√(4−r²)); sin faltante grave. V=32π/3.
- 1r3#2 y 1h9#1: resolubles; falta solo cono/paraboloide en cilíndricas para 1h9.
- recup#1 esféricas: resoluble; falta fijar lado del cono.
- 1h9#2 curvilínea: no resoluble literal con el machete por la regla de orientación en x=g(y).
- 1v1-b#3 con elipse: no resoluble (falta parametrización).
- 1r3#5, 1h9#4, recup#4: resolubles con la tabla de resonancia.
- recup#3 (y'=−(3x²+2y²)/(4xy)): resoluble por los tres machetes (homogénea f(1,u); Bernoulli n=−1, z=y²; exacta P_y=Q_x=4y).
