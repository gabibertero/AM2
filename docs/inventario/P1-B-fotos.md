# P1-B: fotos de 1º parcial (WhatsApp 06/09/2026 + fotos-clase 001-032) — solo lectura

[V] = visto en la imagen. [I] = inferencia. Ilegible = `[ILEGIBLE]`. Resultados de resoluciones: **NO verificados**.
Base: `UTN/2º Año/AM II/`. Renders en `/private/tmp/claude-501/p1inv2/` (no son parte del repo).

## Correcciones al encargo
- **Son 19 fotos WhatsApp, no 21** (`ls`/glob: 19 `.jpeg`). Ninguna con fecha en el nombre distinta de `2026-09-06` (17.33.22 a 17.33.53).
- Las fotos WhatsApp **no son exámenes impresos**: son (a) pizarrones con enunciados de práctica (w01, w02, w06, w07, w08), (b) páginas de cuaderno con resolución manuscrita (w03, w04, w05, w09-w11, w13-w18) y (c) apuntes/machete de método (w12, w19).
- Del `fotos-clase/` 001-032, las de 1º parcial son 001-024. **025-032 son de 2º parcial (U4, U8)**: fuera de alcance (ver sección 4).

## 1. Fotos WhatsApp (`../parciales/1er-parcial/WhatsApp Image 2026-09-06 at 17.33.XX*.jpeg`)
Tipo general [I]: material de compañeros/Gabi en la práctica; **no oficial**. Los "foto N" y "hoja N" escritos en las resoluciones (resaltados amarillo) son numeración del cuaderno de quien las escribió [I], y se corresponden con los pizarrones w01/w07 (mismas funciones). Ningún dato personal legible (ni nombres ni legajos); salen manos, notebook HP, mouse.
Numeración w = orden alfabético del glob (`ls`): `(1)` va antes del archivo sin sufijo.

| ID | Archivo | Qué es |
|---|---|---|
| w01 | `...17.33.22.jpeg` (1599x899) | pizarrón, 3 ejercicios |
| w02 | `...17.33.50 (1).jpeg` (1280x720) | pizarrón, 5 ejercicios |
| w03 | `...17.33.50 (2).jpeg` (719x1280) | cuaderno, derivada direccional ("foto 19") |
| w04 | `...17.33.50.jpeg` (719x1280) | cuaderno, extremos + direccional ("foto 18") |
| w05 | `...17.33.51 (1).jpeg` (719x1280) | cuaderno, dominio ("foto 18", hoja 5) |
| w06 | `...17.33.51 (2).jpeg` (1280x590) | pizarrón, 2 ejercicios (+ borde del 3-5) |
| w07 | `...17.33.51 (3).jpeg` (1280x720) | pizarrón, 3 ejercicios |
| w08 | `...17.33.51 (4).jpeg` (1280x590) | pizarrón, ejercicios 3-5 (continúa w06) |
| w09 | `...17.33.51.jpeg` (719x1280) | cuaderno, direccional ("foto 9", hoja 4) |
| w10 | `...17.33.52 (1).jpeg` | cuaderno, dominio ("foto 19", hoja 6) |
| w11 | `...17.33.52 (2).jpeg` | cuaderno, extremos ("foto 3", hoja 2) |
| w12 | `...17.33.52 (3).jpeg` | hoja resumen de método (dominio, direccional, extremos) |
| w13 | `...17.33.52 (4).jpeg` | cuaderno, dominio ("foto 4") |
| w14 | `...17.33.52 (5).jpeg` | cuaderno, 2 compuestas ("foto 5" y "foto 6") |
| w15 | `...17.33.52.jpeg` | cuaderno, dominio ("foto 20", hoja 8) |
| w16 | `...17.33.53 (1).jpeg` | cuaderno, extremos ("foto 10") |
| w17 | `...17.33.53 (2).jpeg` | cuaderno, direccional + extremos ("foto 20") |
| w18 | `...17.33.53 (3).jpeg` | cuaderno, implícita ("foto 7") + dominio ("foto 8") |
| w19 | `...17.33.53.jpeg` | cuaderno, apunte de método y cónicas |

### Pizarrones (enunciados; legibles salvo lo marcado)
**w01** (tema "foto 18" [I], comparar w04/w05):
1. "DOMINIO": $z=\dfrac{\ln\left[\left(\frac{(x+2)^2}{9}-\frac{y^2}{4}-1\right)\left(-\frac12y^2+y+\frac12-x\right)\right]}{\sqrt{\frac{(x-1)^2}{16}+\frac{(y+1)^2}{4}-1}}$
2. "D. DIRECCIONAL": $z=\ln\left[(x^3y)\cdot(\sqrt[3]{y}\,x)\right]$, $P(1;1)$, $\alpha=30^\circ$ (el factor "$\sqrt[3]{y}\,x$" dudoso; w04 lo reescribe como $x^3y\cdot y^{1/3}x$).
3. "MAX Y MIN": $z=x^3+3xy+y^3$

**w02** (rótulo "6?" ilegible arriba a la izquierda):
1. "DOMINIO": $z=\sqrt{-36-9(x-2)^2+4(y+1)^2}+\ln\left[\left((x-2)^2-(y+1)^2-1\right)(x-y)\right]$
2. "Derivada de Función Implícita": $F(x,y,z)=x+2y+3z-2\sqrt{xy^3z}=0$
3. "DERIVADA DIRECCIONAL": $z=\ln\left(\sqrt{x^2+y^2}\right)+xy^3$, $P(1,1)$, $\alpha=141^\circ$ (el "141" podría ser 111 o 144 [ILEGIBLE parcial])
4. "DERIVADA DE FUNCIÓN COMPUESTA": $F=e^{3x}(y-z)$ con $y=u\,\operatorname{sen}x$, $z=x\,\operatorname{sen}u$
5. "MAX - MIN": $z=\dfrac{y^3}{3}-10y+x^2y-6x-3$

**w06** + **w08** (un mismo pizarrón, dos fotos; w06 tiene 1-2, w08 3-5):
1. "DERIVADA DIRECCIONAL": $z=\sqrt{3x^2+2y^2}$, $P(2,-1)$, $\vec v=-\vec i+4\vec j$
2. "MAX, MIN RELATIVOS, PUNTOS SILLAS": $f(x,y)=x^3+y^3-3x^2-3y^2+2$
3. "DERIVADA DE FUNCIÓN COMPUESTA": $F=\ln(u^2+\cos v)$, $u=x^2+y^2+z^2$, $v=xyz$ (el exponente de $z$ en $u$ difícil de leer; w08 lo muestra como $z^2$)
4. "DOMINIO. ANALÍTICA Y GRÁFICAMENTE": $z=\sqrt{\left((x-2)^2-(y+1)^2-4\right)(y+1)}+\ln\left[9x^2-4(y+2)^2-36\right]$
5. "DERIVADA DE FUNCIÓN IMPLÍCITA": $z=\ln\left[\dfrac{3x}{\sqrt[3]{y}}\right]-\operatorname{sen}(xyz)=0$

**w07** (cartel del pizarrón: "SRES. DOCENTES: SE RUEGA USAR FIBRAS CON TINTA APROPIADA..." — dato institucional, no personal):
1. "DOMINIO. ANALÍTICA Y GRÁFICAMENTE": $z=\dfrac{\ln\left[\left(9x^2-4(y-1)^2-36\right)(y-1)\right]}{x^2+(y-1)^2-81}$
2. "D. DIRECCIONAL": $z=\sqrt{1-x^2+y^2}$, $P(1;-2)$, $V=2i+j$
3. "MAX. MIN. PTOS SILLOS, DUDOSOS SI EXISTIERA": $z=y^3-6x^2y^2+\dfrac34x^4$

Unidades: dominio = U1; direccional/compuesta/implícita = U2; max/min = U3.

### Cuaderno (resoluciones manuscritas, cuadriculado, resaltador amarillo). Legibles; esquemas dibujados a mano.
- **w05** (foto 18, hoja 5): dominio de $z=\ln[((x+2)^2/9 - y^2/4 - 1)(-\frac12y^2+y+\frac12-x)]/\sqrt{(x-1)^2/16+(y+1)^2/4-1}$ (= w01 ej.1). Restricciones, S1/S2, gráfico. Parte del texto [ILEGIBLE] (miniatura; recorte a 1000 px alcanza).
- **w04** (foto 18): extremos de $z=x^3+3xy+y^3$: sistema $3x^2+3y=0$, $3x+3y^2=0$; puntos críticos $(0,0)$ y $(-1,-1)$; $H(0,0)<0$ silla, $H(-1,-1)>0$ y máximo relativo con $z(-1,-1)=1$ (valor [ILEGIBLE parcial]). Debajo, direccional de $z=\ln[x^3y\,(\sqrt[3]{y}\,x)]$ en $(1,1)$, $\alpha=30^\circ$: $\nabla z=(4,\tfrac43)$, $\alpha=\operatorname{tg}^{-1}(\tfrac{4/3}{4})=18{,}43^\circ$; ángulos máx 72°(?), mín 161,57°, nulos 251,57° y 341,57° (escritura dudosa [ILEGIBLE parcial]); gráfico del gradiente con ángulos.
- **w03** (foto 19, hoja arriba): direccional de $z=\ln(x^2/\sqrt[3]{y}\ldots)$ en $P(-2,1)$ [ILEGIBLE parcial el enunciado]; $\partial z/\partial x=-1$, $\partial z/\partial y=-\tfrac13$, $\nabla z=(-1,-\tfrac13)$, $\alpha=18{,}43^\circ$ con $\operatorname{tg}$; $\partial z/\partial s=-1{,}01$; ángulos 161,57; 71,57; 251,57; 341,57. Gráfico.
- **w09** (foto 9, hoja 4): direccional $z=\sqrt{5x^2+y^2}$ en $(-1,2)$: $\nabla z=(-\tfrac53,\tfrac23)$, $\alpha=21{,}8^\circ$, $\theta_{máx}=158{,}2$, $\theta_{mín}=68{,}2$, nulos 248,2 y 338,2. (Coincide con `fotos-clase` 012, resolución "2k3 T1").
- **w10** (foto 19, hoja 6): dominio de $z=\dfrac{\ln\left[\left(\frac{y^2}{9}-\frac{(x-1)^2}{16}-1\right)\left((x-2)^2+(y-2)^2-25\right)\right]}{\sqrt{y-x}}$ (lectura del enunciado dudosa: dentro del $\sqrt{}$ "y-x", signos y exponentes pequeños [ILEGIBLE parcial]); restricciones (1) y (2) $y-x>0$, S1 y S2, gráfico con hipérbola y circunferencia.
- **w11** (foto 3, hoja 2): extremos de $z=\frac23x^3-x^2y+\frac13y^3-\frac12y^2-2y$: puntos $(0,2),(0,-1),(-2,-2)$; sillas en $(0,2,-\tfrac{10}{3})$ y $(0,-1,\tfrac76)$, máximo relativo en $(-2,-2,2)$. = fotos-clase 019.
- **w12**: hoja resumen: "Dominio" (raíz índice par $\ge0$, cociente $\neq0$, $\ln>0$, arcsen/arccos en $[-1,1]$), "Derivada direccional" (pasos, vector normalizado, $\nabla z\cdot S_n$), "Máximos y mínimos relativos" ($H>0$ extremo, $<0$ silla, $=0$ dudoso; criterio con $z''_{xx}$). Muestra pasos de método para machete. Texto pequeño, parcialmente [ILEGIBLE].
- **w13** (foto 4): dominio de $z=\dfrac{\ln[(y-2)(x^2+y^2-4)]}{\sqrt{9x^2+4(y-2)^2-36}}$; restricciones y gráfico. = fotos-clase 013.
- **w14** (fotos 5 y 6): compuesta 1) $z=\sqrt{\dfrac{\operatorname{tg}(xy)}{\ln v}}$ con $x=\operatorname{sen}(3t^2)$, $y=2^{\cos t}$, $v=\operatorname{arctg}t$ y árbol; 2) $z=\dfrac{\operatorname{tg}(xy)-\ln^2(3v^2)}{x}$ con $x=\operatorname{sen}(3u^2)$ (?), $y=v^{\cos u}$ [ILEGIBLE parcial]; derivadas parciales. = fotos-clase 007 y 010.
- **w15** (foto 20, hoja 8): dominio de w07 ej.1; S1, S2, gráfico con hipérbola.
- **w16** (foto 10): extremos de $z=\frac23y^3-y^2x\mp\frac13x^3-\frac12x^2-2x$ (signo de $x^3$ dudoso); puntos $(2,0),(-1,0),(-2,-2)$; $H(2,0)=-6$, $H(-1,0)=-3$, $H(-2,-2)=34$; sillas y máximo relativo $(-2,-2,2)$. = fotos-clase 021 (2k2 T2).
- **w17** (foto 20): arriba direccional de $z=\sqrt{1-x^2+y^2}$ en $P(1,-2)$, $v=2i+j$: $\nabla z=(1,-1)$, resultado "$\tfrac{\sqrt5}{5}\approx0{,}44$"; gráfico con ángulos 315, 135, etc.; abajo extremos de $z=y^3-6x^2y^2+\frac34x^4$: puntos $(0,0)$ y $(\pm\tfrac18,\tfrac1{16})$; $H(0,0)=0$ dudoso; los otros dos sillas. (= w07 ej.2 y 3; = fotos-clase 015 en la parte de extremos).
- **w18** (foto 7, hoja 3): implícita de $\operatorname{sen}(3x^2-xy+z)+e^{y-x^2+z}=0$ en $(1,2,-1)$: $\partial F/\partial x=2$, $\partial F/\partial y=0$, $\partial F/\partial z=2$ ⇒ $\partial z/\partial x=-1$, $\partial z/\partial y=0$. = fotos-clase 020. Abajo (foto 8): dominio de $z=\sqrt{[(x+2)^2+(y-2)^2-4](y-2)}+\ln(9x^2-4(y-2)^2-36)$; S1 y S2 con circunferencia e hipérbola. = fotos-clase 011.
- **w19**: apunte de método: pasos para derivada direccional (1-9), derivada implícita ($1^{er}$ y $2^{o}$ caso), "identificar cónicas" (circunferencia, elipse, hipérbola, parábola con $p$ y orientación). Muy útil para machete/preguntero.

### Duplicados / reflejos
- **No hay enunciados duplicados con los 20 PDF de `Practicos de otros años/`** (revisé la primera hoja de cada PDF: comisiones 1H9, 1H10, 1R3, 1R7, 1V1, 2S2; 2022-2025). Las fotos son de cursos **2K2/2K3** (1er parcial de otra serie) [I]; los PDF son otras comisiones. Funciones recurrentes de mismo estilo (ej. $z=\ln(\ldots)/\sqrt{\ldots}$, $\sqrt{5x^2+y^2}$ en el PDF 1H9/2S2) pero **no idénticas**.
- Entre las propias fotos: w09=fc012, w11=fc019, w13=fc013, w14=fc007+fc010, w15/w07=pizarrón, w17(parte)=fc015, w18 der.=fc011, w18 izq.=fc020, w16=fc021 (ver sección 3).
- `fotos-clase` 014 duplica 016 (misma hoja, otra toma).

## 2. Datos personales a tapar
- WhatsApp: **ninguno visible** (ni nombres ni legajos). Contenido incidental: laptop HP, manos.
- Ver sección 3 (fotos-clase): 004, 005, 023 con nombre/legajo legible; 009 y 026 ya tienen tachones de edición rojo/blanco sobre los campos.

## 3. fotos-clase 001-024 (`../fotos-clase/2026-08-28 foto NNN.jpeg`)
Fecha del nombre = importación. Todas 1º parcial salvo lo marcado. Hay tres grupos: **exámenes impresos (001, 003)**, **teóricos (004, 009, 023)**, **hojas de resolución con rótulo "2k2/2k3 T1/T2"** (006-008, 010-022, 024) y **pizarrón/proyección (002)**. Las hojas de resolución llevan rótulo manuscrito "2k2 T1", "2k3 T2", y numeración "1/1", "1/4", "2/3" arriba a la derecha; no son del cuaderno de WhatsApp; [I] es la resolución de un docente/ayudante del curso de Sistemas (la tinta/tipo de hoja se repite en todas), origen no confirmado. Enunciado leído de la hoja de resolución, no de un examen impreso.

**001** — examen impreso 1º parcial (1600x720, toma con mano, legible). Encabezado: "UNIVERSIDAD TECNOLÓGICA NACIONAL FACULTAD REGIONAL CÓRDOBA / Cátedra: Análisis Matemática [sic] II – 1er Parcial", campos Alumno/Leg/Curso/Fecha **vacíos**. Puntajes de corrección a mano al margen: 3, 2,5, 2, 2,5. Sin comisión ni fecha.
1. "Determine gráfica y analíticamente el dominio de la siguiente función:" $z=\log(x^2+y^2-4)+\sqrt{y-x^2-5}+\dfrac{x}{x+y-1}$ — U1
2. "Determine la derivada direccional. $\theta$máx., $\theta$mín, $\theta$nulo 1, $\theta$nulo 2." $z=2x^2-3y^2$ en $P(1,0)$, $\theta=\dfrac{2\pi}{3}$ — U2
3. "Encuentre las derivadas de la siguiente función compuesta:" $z=\left(\dfrac{x\cdot y}{v^2}\right)^{w}$ con $x=\arccos(t)$, $y=\operatorname{sen}^3\left(\tfrac1s\right)$, $v=\dfrac{\cos^2(s)}{u}$ — U2 (nombres de variables y el exponente $w$ [ILEGIBLE parcial])
4. "Encuentre los puntos críticos de la siguiente función, indique si tienen máx., min, etc." $z=x^3+\dfrac{48}{x}+y^2+4y$ — U3
Sin resolución. Duplicado en PDFs: no.

**002** — pizarrón con proyección y tabla de valores trigonométricos (0°, 30°, 45°, 60°, 90°; sen, cos, tg, cotg, sec, cosec; incluye "no existe" donde corresponde). Fragmento de slide: "…en el punto (2,1) en la dirección α = 45°". Apunte de clase; sirve para machete de ángulos. Legible (tabla), el slide [ILEGIBLE parcial].

**003** — examen impreso 1º parcial práctico **Tema 1** (1204x1600, mano sosteniendo, legible). "UNIVERSIDAD TECNOLÓGICA NACIONAL FACULTAD REGIONAL CÓRDOBA / Cátedra: Análisis Matemático II / 1º Parcial Práctico", Tema: 1; Alumno/Leg/DNI/Curso/Fecha vacíos. Puntajes a mano: 3p, 2,5p, 2p, 2,5.
1. "Determinar gráfica y analíticamente el dominio de la siguiente función" $z=\ln\left(\dfrac{x^2-2x-3+y}{36-4(x-2)^2-9(y+2)^2}\right)$ — U1
2. "Determinar la derivada direccional $\theta$máx, $\theta$mín, $\theta$nulos y graficar" $z=2+\ln(7x)+3\sqrt y$ en $P(2,3)$ — U2
3. "Calcular las derivadas de la siguiente función definida implícitamente, obtener $\dfrac{dy}{dx}$" $\ln\sqrt{x^2+y^2}-\operatorname{arctg}\dfrac yx=0$ — U2
4. "Encuentre los puntos críticos de la siguiente función, indique si tiene Max o Min" $z=2x+y^2$ sujeta a condición $x^2+y^2-4=0$ — U3 (Lagrange)
Abajo: comienzo de resolución a mano del ej.1 (restricciones $\frac{(x-2)^2}{9}+\frac{(y+2)^2}{4}\ldots$) [ILEGIBLE parcial]. Duplicado en PDFs: no.

**004** — teórico, foto rotada 90° (hay que girar; 828x1472). Ver "Teóricos" abajo. Datos personales **visibles**: Apellido, Nombre, Legajo manuscritos (línea "Apellido ... Nombre ... Legajo", tercio superior del examen una vez girado), nota manuscrita.
**005** — **2º parcial práctico Tema 2** (4160x3120): fuera de alcance. Con **Alumno y Leg legibles** (encabezado, 2ª línea); tapar si se usa.
**006** — "2K2 T1" (1200x1600, rotada ligeramente): dominio de $z=\dfrac{\ln\left[9x^2+4(y-2)^2-36\right]}{\sqrt{(y+1)(x^2+y^2-4)}}$; restricciones y gráfico (elipse, circunferencia, hipérbola); $D=\{(x,y)\in\mathbb R^2:\ 9x^2+4(y-2)^2-36>0\ \wedge\ (y+1)(x^2+y^2-4)>0\}$. U1. Legible.
**007** — "2K2 T1": compuesta $z=\sqrt{\dfrac{\operatorname{tg}(xy)}{\ln v}}$ con $x=\operatorname{sen}(3t^2)$, $y=2^{\cos t}$, $v=\operatorname{arctg}t$; árbol y derivadas (a)-(f); "Falta reemplazar..." U2. Legible.
**008** — "2k2 T1 1/3": implícita $\ln^2(3x^2-xy+z)-e^{y^3-8x-z}=0$ en $(1,2,0)$; $\partial z/\partial x=-8$, $\partial z/\partial y=12$. U2. Legible.
**009** — teórico "Teórico-Aplicado" 26/06/23. Nombre/Apellido/Legajo **tapados con trazos rojos**. Ver "Teóricos".
**010** — "2k2 T2": compuesta $z=\dfrac{\operatorname{tg}(xy)-\ln^2(3v^2)}{x}$ con $x=\operatorname{sen}(\ldots u\ldots)$, $y=v^{\cos u}$ (enunciado [ILEGIBLE parcial]); derivadas (a)-(f) y "Falta reemplazar". U2. Foto rotada.
**011** — "2k3 T1 1/4" [rótulo leído 2k3 T1]: dominio de $z=\sqrt{\left[(x+2)^2+(y-2)^2-4\right](y-2)}+\ln\left(9x^2-4(y-2)^2-36\right)$. U1. Rotada.
**012** — "2k3 T1 1/2": derivada direccional de $z=\sqrt{5x^2+y^2}$ en $(-1,2)$: $\nabla z=(-\tfrac53,\tfrac23)$, $|\nabla z|=\tfrac{\sqrt{29}}{3}$, $\alpha=-21{,}8^\circ$; $\alpha_1=68{,}2$, $\alpha_2=158{,}2$, $\alpha_3=248{,}2$, $\alpha_4=338{,}2$. U2. Rotada.
**013** — "2k2 T2 1/4": dominio de $z=\dfrac{\ln\left[(y-2)(x^2+y^2-4)\right]}{\sqrt{9x^2+4(y-2)^2-36}}$. U1. Rotada.
**014** — "2k3 T1 1/3": $z=\cos(3x^2+xy-y^3)$ en $(-2,2)$, $d^2z(-2,2)=-100\,dx^2-280\,dx\,dy-196\,dy^2$ (con $z''_{xx}=-100$, $z''_{xy}=-140$, $z''_{yy}=-196$). U2 (diferencial de 2º orden). Rotada.
**015** — "2k3 T1 1/4": extremos de $z=y^3-6x^2y^2+\tfrac34x^4$: puntos $(0,0),(\tfrac18,\tfrac1{16}),(-\tfrac18,\tfrac1{16})$; $H(0,0)$ "no informa"; los otros "$<0$ punto de silla". U3. Legible. Al lado, borde de "2k3 T2 $z=\sqrt{9x^2\ldots}$".
**016** — igual a 014 (otra toma). Duplicado.
**017** — "2k3 T2 2/4": extremos de $z=x^3-6x^2y^2+\tfrac34y^4$: $(0,0),(\tfrac1{16},\tfrac18),(\tfrac1{16},-\tfrac18)$; $H(0,0)=0$; sillas. U3.
**018** — "2k3 T2 2/3": $z=\operatorname{sen}(3x^2+xy-y^3)$ en $(-2,2)$, $d^2z(-2,2)=6\,dx^2+2\,dx\,dy-12\,dy^2$. U2.
**019** — "2k2 T1": extremos de $z=\tfrac23x^3-x^2y+\tfrac13y^3-\tfrac12y^2-2y$: puntos $(0,-1),(0,2),(-2,-2)$; $H(0,-1)<0$, $H(0,2)<0$ sillas, $H(-2,-2)>0$ con $z''_{xx}<0$ máximo; sillas en $(0,-1,\tfrac76)$, $(0,2,-\tfrac{10}3)$ y máximo relativo $(-2,-2,2)$. U3. Legible (hay mano).
**020** — "2k2 T2 2/3": implícita $\operatorname{sen}(3x^2-xy+z)+e^{y-x^2+z}=0$ en $(1,2,-1)$: $\partial F/\partial x=2$, $\partial F/\partial y=0$, $\partial F/\partial z=2$, $\partial z/\partial x=-1$, $\partial z/\partial y=0$. U2. Rotada.
**021** — "2k2 T2": extremos de $z=\tfrac23y^3-y^2x+\tfrac13x^3-\tfrac12x^2-2x$ [signo dudoso]: puntos $(2,0),(-1,0),(-2,-2)$; sillas y máximo (con nota "el enunciado no pide calcular alturas"). U3. Rotada.
**022** — "2k3 T2 2/1": dominio de $z=\sqrt{9x^2-4(y-2)^2-36}+\ln\left[\left((x-2)^2+(y-2)^2-4\right)(y-2)\right]$ [orden de factores reconstruido de la resolución]. U1. Rotada.
**023** — teórico 27/07/22. Ver "Teóricos". **Datos personales visibles** (Apellido, Nombre, Legajo manuscritos; línea bajo el título del examen).
**024** — "2k3 T2 2/2": direccional de $z=\sqrt{x^2+5y^2}$ en $(-2,-1)$: $\nabla z=(-\tfrac23,-\tfrac53)$, $|\nabla z|=\tfrac{\sqrt{29}}3$, ángulos 68,2; 158,2; 248,2; 338,2. U2. Rotada.

### Teóricos de 1º parcial encontrados (preguntas literales)
**fc023** — "EXAMEN PARCIAL No. 1 / CÁTEDRA DE AM2 – TEÓRICO – Tema I / Universidad Tecnológica Nacional, Facultad Regional Córdoba, Ing. en Sistemas de Información"; Fecha: 27/07/22; Curso: (manuscrito "2KZ"); Nota manuscrita (7 "siete"?) y correcciones en lila. Legible.
1. Desarrolle el Teorema de Schwartz [3]
2. Desarrolle paso a paso en máximos y mínimos relativos el razonamiento del análisis de signos del Hessiano. [3]
3. ¿Qué entiende por curva de nivel y para qué se usa? [1]
4. En el cálculo de límites dobles ¿cuándo es necesario y para qué calcula límites sucesivos, radiales y a lo largo de una curva? [1]
5. Con el método de los multiplicadores de Lagrange ¿Cuáles son las condiciones necesaria y suficiente para que exista un extremo condicionado? [1]
6. ¿Qué entiende por Hessiano Orlado y en qué se aplica? [1]
(un corrector escribió "Mal" junto a la 6; los [N] marcados con círculo/tilde: puntajes de corrección).

**fc004** — mismo encabezado "EXAMEN PARCIAL No. 1 / CÁTEDRA DE AM2 – TEÓRICO – Tema I", Fecha 27/07/22; Curso manuscrito "2K02"; Nota "4 (cuatro)". Foto rotada 90°. **Preguntas distintas** de fc023 aunque el encabezado dice igual Tema I [I: son dos temas o cursos distintos con el mismo rótulo]:
1. Desarrolle la obtención de la fórmula de cálculo de la derivada direccional. [3]
2. Usando la Regla de la Cadena, deduzca la fórmula de la derivada de la función compuesta de un campo escalar de dos variables, que dependen de una única variable independiente t. [3]
3. ¿Qué son y cómo se representan gráficamente el dominio y la imagen de una función de la forma z=f(x,y)? [1]
4. Indique una aplicación del cálculo del diferencial total de una función. [1]
5. Escriba la expresión del gradiente de una función en un punto e indique qué representa. [1]
6. ¿Cuáles son las condiciones necesaria y suficiente para que exista un extremo relativo? [1]
Debajo hay respuesta manuscrita de la #4 (alumno).

**fc009** — "EXAMEN PARCIAL No. 1 / CÁTEDRA DE AM2 – Teórico–Aplicado", Fecha 26/06/23, Curso manuscrito ("2ka3"), Nota "6 (seis)". Legible.
1. Desarrolle el Teorema del Valor Medio [3]
2. Desarrolle la obtención de la fórmula del Diferencial Total [2] (marcado "No responde")
3. ¿Qué diferencia hay entre función vectorial y campo vectorial? [1]
4. Exprese en símbolos la definición de entorno reducido y escriba su significado. [1]
5. Indique cuál es la interpretación gráfica del diferencial de una función en un punto. [1]
6. ¿Qué entiende por Hessiano y en qué se aplica? [1]
7. ¿Qué entiende por gradiente de una función en un punto? [1]
Debajo hay una respuesta manuscrita (Taylor con TVM, alumno).

**Estilo para preguntero** (Gabi pidió el estilo "gradiente, diferencial total, máximos relativos con Taylor→hessiano"): las tres formas aparecen (gradiente: fc004#5, fc009#7; diferencial total: fc004#4, fc009#2/#5; Hessiano: fc009#6, fc023#2/#6).
No es 1º parcial: `fc026` = "EXAMEN PARCIAL No. 2 ... Tema I", 06/11/23 (U4-U6: Green, EDO homogénea, Jacobiano, derivada de campo vectorial, divergencia, dominio de campo vectorial) — ya inventariado en E, **fuera de alcance**; en esa foto Apellido/Nombre/Legajo están tapados con blanco.

## 4. Fuera de alcance dentro de 001-032
- 005: 2º parcial práctico Tema 2 (integral doble área, EDO 1º y 2º orden) — con nombre y legajo visibles.
- 025: apunte EDO variables separables (U8).
- 026: P2 teórico (ver arriba).
- 027: EDO homogéneas (U8). 028: área región por integral doble (U4, circunferencia $x^2+y^2=9$ y $y=-x^2-2x+3$). 029: EDO exactas ("Octubre 14"). 030: integral doble área/volumen "TAREA". 031: integrales polares ("Sept. 2"). 032: EDO lineales de 1º orden ("Octubre 7"). Todas fuera del P1. Cuaderno cuadriculado con resaltador rosa/verde.

## Tabla resumen
| ID | Archivo | Nº ejercicios | Unidades | Puntajes | Resolución | Legibilidad | Datos a tapar |
|---|---|---|---|---|---|---|---|
| w01 | WhatsApp ...17.33.22 | 3 | U1,U2,U3 | no | no | buena | no |
| w02 | ...17.33.50 (1) | 5 | U1,U2,U3 | no | no | buena (141° dudoso) | no |
| w03 | ...17.33.50 (2) | 1 | U2 | no | sí, manuscrita (NO verificada) | media | no |
| w04 | ...17.33.50 | 2 | U2,U3 | no | sí (NO verificada) | media | no |
| w05 | ...17.33.51 (1) | 1 | U1 | no | sí | media | no |
| w06 | ...17.33.51 (2) | 2 | U2,U3 | no | no | buena | no |
| w07 | ...17.33.51 (3) | 3 | U1,U2,U3 | no | no | buena | no |
| w08 | ...17.33.51 (4) | 3 | U1,U2 | no | no | buena | no |
| w09 | ...17.33.51 | 1 | U2 | no | sí | buena | no |
| w10 | ...17.33.52 (1) | 1 | U1 | no | sí | media | no |
| w11 | ...17.33.52 (2) | 1 | U3 | no | sí | buena | no |
| w12 | ...17.33.52 (3) | machete | U1-U3 | no | no aplica | media | no |
| w13 | ...17.33.52 (4) | 1 | U1 | no | sí | buena | no |
| w14 | ...17.33.52 (5) | 2 | U2 | no | sí | media | no |
| w15 | ...17.33.52 | 1 | U1 | no | sí | buena | no |
| w16 | ...17.33.53 (1) | 1 | U3 | no | sí | buena | no |
| w17 | ...17.33.53 (2) | 2 | U2,U3 | no | sí | buena | no |
| w18 | ...17.33.53 (3) | 2 | U2,U1 | no | sí | buena | no |
| w19 | ...17.33.53 | machete | U1,U2 | no | no aplica | media | no |
| fc001 | fotos-clase 001 | 4 | U1,U2,U3 | manuscritos 3/2,5/2/2,5 | no | buena | no (campos vacíos) |
| fc002 | 002 | 0 | U2 (trigonometría) | no | tabla | buena | no |
| fc003 | 003 | 4 | U1,U2,U3 | manuscritos | inicio ej.1 | buena | no (vacío) |
| fc004 | 004 | 6 teóricas | U2,U1,U3 | [3][3][1][1][1][1] | respuesta parcial | buena (rotar) | SÍ: Apellido, Nombre, Legajo |
| fc006-008 | 006, 007, 008 | 3 | U1,U2 | no | sí (hoja oficial? [I]) | buena | no |
| fc009 | 009 | 7 teóricas | U1,U2,U3 | [3][2][1]x5 | respuesta parcial | buena | ya tachado en rojo |
| fc010-014 | 010-014 | 5 | U1,U2 | no | sí | buena (rotar) | no |
| fc015-022 | 015-022 | 8 | U3,U2,U1 | no | sí | buena (rotar) | no |
| fc023 | 023 | 6 teóricas | U1,U2,U3 | [3][3][1][1][1][1] | no | buena | SÍ: Apellido, Nombre, Legajo |
| fc024 | 024 | 1 | U2 | no | sí | buena (rotar) | no |
| fc005, fc025-032 | — | — | P2 (U4,U8) — fuera de alcance | — | — | — | fc005: nombre y legajo visibles |
