# P1 — Auditoría profe del laboratorio U1–U3 (2026-10-19)

Alcance: los 7 generadores de `src/scripts/lab/p1-*.js` (commit 66fa8c3) contra los machetes de `src/content/machetes/` y el formato de `E5-lab-profe.md`.
Método: lectura del código y razonamiento sobre las salidas. En esta sesión no había shell, así que no corrí `node -e` con semillas ni los tests. Los casos de "puede salir X" son por inspección del código, no por una salida vista. Conviene que quien implemente confirme los marcados con (*) corriendo semillas.

Matemática de los pasos: correcta en los 7 generadores, salvo una justificación falsa en Lagrange (H01). Fórmulas, despejes, hessiano, orlado, versores y errores revisados a mano. El problema principal es de alcance. Los generadores cubren una variante fácil de cada tipo y dejan afuera variantes que están en los machetes y en los parciales oficiales.

## Puntajes

| Generador | Notación | Matemática | Porqué en cada paso | Nivel parcial / casos borde | **Total /100** |
|---|---|---|---|---|---|
| dominio | 14/20 | 24/25 | 22/25 | 14/30 | **74** |
| direccional | 13/20 | 24/25 | 20/25 | 14/30 | **71** |
| diferencial | 14/20 | 25/25 | 21/25 | 8/30 | **68** |
| extremos | 13/20 | 25/25 | 21/25 | 22/30 | **81** |
| lagrange | 14/20 | 18/25 | 22/25 | 14/30 | **68** |
| implicita | 14/20 | 25/25 | 21/25 | 15/30 | **75** |
| plano | 15/20 | 25/25 | 22/25 | 18/30 | **80** |
| **Global (promedio)** | | | | | **74** |

Objetivo 90: no se alcanza. Con los críticos resueltos y los mayores de notación, estimo 88–92.

## Hallazgos

Prioridad: CRÍTICO = error matemático o tipo de ejercicio de parcial que falta y baja la nota. MAYOR = notación de cátedra o paso oculto. MENOR = pulido.

### Lagrange (p1-lagrange.js)

- **H01 [CRÍTICO] Justificación falsa en `geomMax` (línea 9; se usa en líneas 33, 56 y 118).** Dice que el conjunto de puntos con x, y, z > 0 que cumplen la restricción "es acotado". Para `cajaTapa` y `cajaSinTapa` no lo es: con x = y = ε, z = (S₀ − 2ε²)/(4ε) tiende a ∞. Solo es cierto en `tetraedro`. Un corrector lo marca como error. Hacer dos textos:
  - tetraedro: se mantiene (triángulo acotado, V = 0 en el borde).
  - cajas con superficie fija: "V = xyz > 0 adentro; xy, xz, yz ≤ S₀/2, por lo que V² = (xy)(xz)(yz) ≤ (S₀/2)³ está acotado, y si cualquier arista → 0 entonces V → 0 (una arista → ∞ obliga a otra → 0). Por lo tanto V alcanza un máximo en el interior; como el único candidato es este, es el máximo".
  - Alternativa más corta, la de las resoluciones del profe: "por el carácter del problema (V ≥ 0 y V → 0 en el borde) existe máximo y el único candidato es este".
- **H02 [CRÍTICO] Falta el caso de varios candidatos con valores distintos.** Todos los problemas tienen variables > 0, dividen sin problema y dan un único candidato. La excepción es la hipérbola, que tiene dos candidatos simétricos con el mismo valor. El machete (`extremos-ligados-lagrange.md`, "Con clasificación") trae f = 2x + y² sujeta a x² + y² = 4. Hay que dividir por y y revisar el caso y = 0, λ = −1, y comparar f en 4 candidatos para máximo y mínimo. Es el error frecuente nº 1 del machete y no se entrena. Agregar un 7º problema `circunferencia`:
  - f = ax + by², ligadura x² + y² = r².
  - Pasos: F, ∇F = 0, factorizar y(…) = 0, rama y = 0 y rama λ = λ₀, tabla de candidatos con f(P), conclusión máx/mín por comparación (curva cerrada y acotada, f continua → Weierstrass).
  - Verif: tipo `'ambos'`.
- **H03 [MAYOR] Falta la variante inversa: superficie mínima con volumen fijo** (ejemplo central del machete: caja sin tapa V = 32, φ = xyz − 32, resultado 4, 4, 2 y S = 48). La argumentación cambia: S → ∞ en el borde, así que hay un mínimo. Agregar `cajaVolumenFijo` con y sin tapa y un argumento de existencia distinto del máximo.
- **H04 [MAYOR] Falta lo que pide la consigna real.** El machete insiste en "devolver lo que piden", y Recup. Nov-25 #4 pide la superficie total. El `tetraedro` siempre pide solo V y siempre usa la forma segmentaria x/a + y/b + z/c = 1. Agregar:
  - plano general αx + βy + γz = δ (6x + 3y + 2z = 18);
  - consigna que pide S = 2(xy + yz + xz), no V;
  - una variante con el plano tangente a z = k − x² − y² (1H9 May-24 #4), encadenando con el generador `plano`.
- **H05 [MAYOR] Notación de cátedra.** El machete dice "ligadura escrita como φ(x,y) = 0", F = f ± λφ y F'_x. El generador usa g = constante y F_x. Cambiar a `\varphi`, escribir la ligadura como φ = 0 en el enunciado y en F (F = f − λφ, con φ ya igualada a 0) y poner `F'_x`, `F'_\lambda`.
- **H06 [MENOR] `distanciaHiperbola`, línea 163.** Dice "En P₁ (y también en P₂) vale:" y muestra el determinante con g_x = g_y = m. En P₂ la matriz tiene entradas −m, y el determinante coincide (−8m²). Mostrar la matriz de P₂ en una segunda línea, o decir "en P₂ las entradas g_x, g_y cambian de signo y el determinante da lo mismo". Hoy parece un error de copia.
- **H07 [MENOR] `productoRecta`.** La clasificación por orlado ya está bien. Agregar una línea de control ("por geometría: xy → 0 en los extremos de la recta, por lo tanto es máximo") para que no dependa solo del orlado.
- **H08 [MENOR] `distanciaPlano`.** Aclarar que el resultado final es la distancia, no su cuadrado (el machete lo recalca). Hoy figura `d` en el resultado, así que solo falta una frase en el paso 7.

### Direccional (p1-direccional.js)

- **H09 [CRÍTICO] Faltan mínimo y direcciones nulas.** El machete: "Hallar θmax, θmin y los ángulos de derivada nula", con θmin = θmax + 180° y nulas θmax ± 90° (aparece en muchos parciales). El generador solo da el máximo. Agregar dos pasos después del cuadrante:
  - "mínimo: sentido opuesto, valor −‖∇f‖, θmin = θmax + 180°";
  - "nulas: u ⟂ ∇f, dos soluciones θmax ± 90°, con versor (−g_y, g_x)/‖∇f‖ y su opuesto".
  Agregarlas también al enunciado y al resultado.
- **H10 [CRÍTICO] Falta el modo "por definición"** (límite con t → 0⁺). El machete lo trae con ejemplos oficiales, y dice que "el profe resolvió con la fórmula aunque pedía definición". Agregar un modo por definición con f sencilla (xy, ln(x/y)): armar f(P + t·u) − f(P), simplificar y aplicar el límite notable ln(1 + at)/t → a.
- **H11 [MAYOR] Dirección solo por ángulo en radianes o vector.** Faltan las formas de parcial:
  - dirección hacia otro punto Q (v = Q − P);
  - "bisectriz del 2º cuadrante" (135°);
  - ángulo en grados (30°, 45°…).
  Hoy `ANGULOS` solo tiene 9 radianes sin ejes (0, π/2, π, 3π/2).
- **H12 [MAYOR] Funciones triviales.** En e1, e2, e3 y l3 el punto P se elige para que el exponente o el ln valga 0 (e⁰ = 1, ln 1 = 0). En el parcial el punto no es tan amable y hay ln(x/y), ln√(5x² − 4y²) (Recup. Nov-25) y 3 variables (2S2 Jun-24, cosenos directores). Agregar:
  - ln√(·) con el paso "simplificar antes de derivar" (el machete lo marca como error frecuente de factor ½);
  - ln(x/y) = ln x − ln y;
  - un modo de 3 variables.
- **H13 [MAYOR] `g_x`, `g_y` sin definir (líneas 113 y 116).** El paso del cuadrante usa `\theta_0=\arctan(g_y/g_x)` y "Como g_x > 0…", pero en ningún paso se introdujo g. Usar f'_x(P), f'_y(P), o decir en el paso 3 "llamo g_x = f'_x(P), g_y = f'_y(P)".
- **H14 [MAYOR] Notación.** Usar `\operatorname{arctg}` (no `\arctan`, tanto en el TeX como en los textos), f'_x en lugar de f_x, ∂z/∂S o ∂f/∂S en lugar de D_u f en el resultado, y la misma notación en el paso y en el resultado. Hoy el paso 6 dice ∂f/∂u y el resultado D_u f.
- **H15 [MAYOR] Racionalización oculta (línea 83).** El paso dice "racionalizo si hace falta" pero salta de `-2/(2√2)` a `-½√2` (con v = (−2, −2)). Mostrar `a/(k√s) = a√s/(k·s)` como línea aparte. Es una cuenta que los alumnos se comen.
- **H16 [MENOR] Falta el gráfico del gradiente.** El machete (paso 7) dice "casi siempre lo piden". El laboratorio es solo texto y TeX, así que decirlo: o se agrega un SVG simple con ∇f saliendo de P y las cuatro direcciones, o se aclara en la consigna que el gráfico se hace aparte.
- **H17 [MENOR] ∇f(P) = 0 nunca aparece.** Es un caso borde del machete ("derivada nula en toda dirección y no hay dirección de máximo"). El generador lo evita con `continue`. Se puede agregar como variante rara con un paso que lo explique.

### Diferencial (p1-diferencial.js)

- **H18 [CRÍTICO] Un solo tipo de ejercicio.** Siempre es "error máximo" con % igual en todas las medidas, con valores absolutos. El machete y los parciales traen estos otros tipos y ninguno se entrena:
  - **Con signo:** "los lados de la base disminuyen 2 % y la altura aumenta 3 %", con dV y E % con signo (1R3 Sep-23 B #3). Hoy es imposible que dV < 0.
  - **Material de una pieza hueca:** diámetro → radio, espesores de pared, fondo y tapa (1H9 May-24 #2). Es el error frecuente del machete: sumar mal los espesores.
  - **Aproximar un valor** con f(P + dP) ≈ f(P) + f'_x dx + f'_y dy (por ejemplo ln o raíz de una expresión).
  - **Ángulo en radianes** (Recup. Nov-25 #2, d θ = π/60).
  Agregar al menos "con signo" y "pieza hueca" como modos, y la "aproximación numérica".
- **H19 [MAYOR] Mezcla d y Δ en el paso 2.** Escribe `dV = V_r dr + …` y la línea siguiente `|dV| ≤ |V_r||Δr| + …`. Sin decir que |dr| = Δr, cambia de símbolo. Hacer la cadena consistente: `|dV| ≤ |V'_r||dr| + …` y definir |dr| = error de la medida.
- **H20 [MAYOR] Notación.** Cátedra: V'_r y no V_r (el subíndice se lee como volumen en r); e_máx, e_rel y e_% en lugar de ε_r y ε_%.
- **H21 [MENOR] Falta el control de la cuenta** (machete "Cómo comprobar"): calcular ΔV exacto con los valores incrementados y compararlo con dV. Agregarlo como último paso opcional.
- **H22 [MENOR] Faltan figuras de uso.** El cono solo tiene V (S exige la generatriz). Decir en el enunciado que "se usa la altura h y el radio r". Falta también una fórmula física (período o tiro oblicuo) como en el parcial.

### Dominio (p1-dominio.js)

- **H23 [CRÍTICO] No se grafica y falta el método S1/S2.** El machete dice "siempre se pide el dibujo" ("gráfica y analíticamente") y "producto o cociente ≥ 0 o > 0: dos casos S1 (ambos > 0) y S2 (ambos < 0), dominio = S1 ∪ S2". El generador solo tiene G ≥ 0, G > 0 y G ≠ 0, nunca un cociente con raíz (√(N/D)) ni un producto, y no pide el gráfico. Agregar:
  - tipo `√(A/B)` con unión de los dos casos S1 y S2 (lenses/exteriores) y `ln(A·B)`;
  - consigna "determinar gráfica y analíticamente", con una descripción de qué se dibuja (borde llena o punteada) o un SVG.
- **H24 [MAYOR] Faltan cónicas más ricas y puntos de intersección.** Solo hay recta, parábola, circunferencia con centro en el origen e hipérbola xy = w. Falta:
  - elipse y circunferencia con centro desplazado (completar cuadrados);
  - hipérbola x² − y²/4 = 1;
  - arcsen o arccos (−1 ≤ A ≤ 1);
  - ln|A| (solo excluye A = 0);
  - xy ≠ 0 en un denominador (saca los dos ejes).
  El paso 6 del machete (calcular y rotular las intersecciones entre las curvas) tampoco está. Con dos condiciones, mostrar el sistema entre los bordes y sus soluciones.
- **H25 [MAYOR] Dominio vacío posible (*).** Con dos condiciones puede salir una región vacía, sin avisarlo: por ejemplo círculo x² + y² ≤ 4 junto con x + y ≥ 4. Revisar por inspección de `forma`, lo que da c = ±4 contra radios 2–4. En ese caso el resultado diría un conjunto que no tiene puntos. Reintentar (`continue`) si la intersección es vacía, o agregar un paso que lo diga.
- **H26 [MAYOR] "Frontera: se obtiene cambiando por una igualdad… queda una parábola" no muestra el despeje.** Dar la curva en forma canónica: la parábola y = x² − w con vértice, la circunferencia con radio √w, la hipérbola con asíntotas. Hoy el alumno no ve cuál es el radio ni dónde se corta con los ejes.
- **H27 [MENOR] Notación.** Cátedra: D_f = {(x,y) ∈ ℝ² : …}, y no `\operatorname{Dom}f`. Escribir la condición en el orden usual (x² + y² − 9 ≥ 0, no −9 + x² + y² ≥ 0): `suma` pone la constante primero en `G`.
- **H28 [MENOR] Texto "estricta o de distinto".** Separarlo en dos frases claras (">" y "≠") para el alumno.

### Extremos libres (p1-extremos.js)

- **H29 [MAYOR] Notación de cátedra.** El machete usa H para el determinante (H = f''_xx f''_yy − (f''_xy)²) y f''_xx para las segundas derivadas. El generador llama D al determinante y H a la matriz (línea 87), lo contrario. Cambiar D → H y llamar a la matriz otra cosa, o no nombrarla. También f'_x, f'_y, f''_xx, f''_xy, f''_yy.
- **H30 [MAYOR] La cota z₀ = f(P) no tiene paso (línea 95).** El machete (paso 5) dice "si lo piden, la cota z₀ = f(P₀) (también para sillas)", y aparece en el resultado sin cuenta. Agregar un paso por punto con `p3Sub(f, P)` y el valor.
- **H31 [MAYOR] Caso H = 0 solo da silla.** En el generador los dudosos son siempre sillas degeneradas (cubo). El machete trae x⁴ + y⁴ (H = 0 pero mínimo) y dice que la cátedra se detiene en "H = 0, no decide" (2S2 Jul-23 #4). Dos cambios:
  - decir explícitamente en el paso "conclusión del criterio: H = 0, el criterio no decide" antes del estudio directo;
  - agregar una variante con H = 0 y mínimo o máximo (por ejemplo f = x⁴ + y⁴ − …), con Δf de signo constante.
- **H32 [MENOR] El estudio directo no explica el cubo (línea 76).** "f(x,y₀) − f(P) es un cubo" aparece afirmado. Agregar "integrando f'_x = 6a(x − r)² se obtiene 2a(x − r)³" o equivalente.
- **H33 [MENOR] Solo polinomios cúbicos.** Los parciales traen funciones con exponencial, ln o términos mixtos (x³ + 3xy + y³ está cubierto por la familia `fol`). Anotarlo como límite conocido.
- **H34 [MENOR] `fol` con a = ±1.** Aparece "Multiplico por 1" y "x²/1". Saltear ese paso cuando a² = 1.

### Derivada implícita (p1-implicita.js, `superficie` en p1-comun.js)

- **H35 [CRÍTICO] Faltan los sistemas y y = f₁(x), z = f₂(x).** Los 3 ejercicios oficiales del machete (1R3 Oct-24 A/B #3 y 1R3 Sep-23 A #4) no son de este tipo:
  - una ecuación g(x, y) = 0 con dy/dx = −g'_x/g'_y;
  - una ecuación con tres letras y "siendo y = f₁(x), z = f₂(x)" (dy/dx con z fija, dz/dx con y fija);
  - sistema de dos ecuaciones con cocientes de jacobianos.
  Agregar al menos "dos ecuaciones" con jacobianos (filas = funciones, columnas = variables) y "una ecuación, y(x), z(x)".
- **H36 [MAYOR] Funciones sin trigonométricas ni arctg.** `superficie` solo arma polinomio + c·ln z o c·e^{y−z}. El ejemplo de la cátedra tiene sen(3x² − xy + z) + e^{y − x² + z}, y el de 1R3 tiene arctg(x²yz³) = π/4, donde el factor 1/(1 + u²) se cancela. Agregar `senz` y `arctg` como tipos, con el paso "el factor común se cancela".
- **H37 [MAYOR] Notación.** F'_x, F'_y, F'_z y z'_x, z'_y (no F_x, z_x), igual que el machete.
- **H38 [MENOR] Doble signo (línea 10).** `frac` arma `-\frac{-3}{2}`. Es correcto, pero conviene mostrar `-\frac{(-3)}{2}` o escribir primero el cociente con paréntesis para que el alumno vea el cambio de signo.
- **H39 [MENOR] Caso F_z(P) = 0.** Está descartado por `continue`. Es el error frecuente del machete ("el denominador se anula, no se puede aplicar"). Una variante con F_z(P) = 0 donde la respuesta correcta es "el teorema no se aplica" entrenaría ese razonamiento.

### Plano tangente y recta normal (p1-plano.js)

- **H40 [MAYOR] Recta normal solo en paramétricas.** El machete la da en forma simétrica (x − x₀)/f'_x = (y − y₀)/f'_y = (z − z₀)/(−1), y dice "si f'_x = 0, usar x = x₀". Agregar la forma simétrica al resultado (y el caso con una componente nula como variante). Hoy x = x₀ + 0·t queda escrito como `x=x0`, correcto pero sin comentario.
- **H41 [MAYOR] Falta "plano tangente paralelo a un plano dado"** (machete, "Cómo reconocerlo"): ∇F(M) múltiplo de (a, b, c), junto con F(M) = 0. Agregar un modo con ese enunciado y punto desconocido.
- **H42 [MAYOR] Notación.** f'_x, f'_y, F'_x, F'_y, F'_z.
- **H43 [MENOR] Plano horizontal (f'_x = f'_y = 0).** Puede salir en la rama polinómica (*). El resultado `z = z₀` es correcto. Agregar una frase "plano horizontal" para que el caso no quede mudo.
- **H44 [MENOR] Rama de raíz.** El paso salta de `x₀/√(c + x₀² + y₀²)` a la fracción reducida sin decir que √(z₀²) = z₀ (z₀ > 0). Agregar la línea.

### Transversales

- **H45 [MAYOR] Notación de cátedra unificada.** Hacer un solo pase por los 7 archivos y por `p1-comun.js`: f'_x en vez de f_x; f''_xx; F'_x; H para el determinante hessiano; `\operatorname{arctg}`; φ para la ligadura; e_máx, e_rel, e_% para errores; D_f para el dominio. Ya está resuelto `\operatorname{sen}` (SEN en `mate.js`).
- **H46 [MENOR] Comprobación final.** El machete tiene un "Cómo comprobar el resultado" en cada tema y el laboratorio no. Agregar una línea de control al final de cada generador (por ejemplo, en extremos "reemplazar P en f'_x y f'_y da 0"; en implícita "F(P) = 0").

## Lo que está bien (no tocar)

- Los porqué son explícitos y están donde corresponde. Ejemplos: por qué C¹ permite usar el gradiente, por qué se minimiza el cuadrado de la distancia, por qué "si λ = 0 entonces xyz = 0", por qué el arctg necesita corrección de cuadrante.
- Los pasos de factorización del sistema separable en extremos y el tratamiento de la raíz doble (monomio y trinomio).
- La clasificación con hessiano orlado: el determinante y el criterio (> 0 máximo, < 0 mínimo) son correctos en `productoRecta` y `distanciaHiperbola`.
- La normalización del versor en dirección por vector, y el cálculo de θ con corrección de cuadrante (incluye los ejes).
- `\operatorname{sen}` en toda la salida del lab.

## Orden sugerido para llevar a 90

1. H01 (error matemático) y H45 (pase de notación): baratos y de mayor efecto.
2. H02, H09, H10, H18, H23, H35 (los críticos de cobertura): un modo nuevo en cada generador.
3. H03, H04, H11, H12, H24, H36, H40, H41.
4. El resto, como pulido.

## Re-auditoría 2026-10-19

Alcance: commit 1e96809, los 7 generadores `src/scripts/lab/p1-*.js` más `p1-comun.js`, y los tests de `tests/lab.test.mjs` que cubren el lab (ejemplos y controles negativos contra diferencias finitas, KaTeX y regex de notación vieja).
Método: lectura del código y de los tests, y verificación a mano de la matemática de cada modo nuevo. Igual que la vez anterior, no había shell: no corrí los tests ni vi salidas reales. Todo lo que dice "resuelto" es por inspección del código, y los tests existentes lo respaldan en lo numérico.

### Estado de los críticos y del pase de notación

| Hallazgo | Estado | Verificación |
|---|---|---|
| H01 justificación en cajas | Resuelto | Texto propio para cajas con superficie fija, para tetraedro/plano (triángulo) y para volumen fijo (S → ∞). Las cotas xy, xz, yz ≤ S₀/2 (con tapa) y ≤ S₀ (sin tapa) son correctas. El test prohíbe la frase "es acotado". |
| H02 varios candidatos | Resuelto | Modo `circunferencia`: f = ax + by² con a = 2b·x₀ sobre x² + y² = r². Se factoriza 2y(b − λ) = 0, rama y = 0 y rama λ = b, cuatro candidatos, valores b(r² + x₀²) y ±ar. Weierstrass bien invocado. Máximo y mínimo siempre distintos (r > \|x₀\|). Es el caso 2x + y² del machete. |
| H09 mínimo y nulas | Resuelto | θmin = θmax + 180°, valor −‖∇f‖, nulas con (−f'_y, f'_x)/‖∇f‖ y su opuesto, θmax ± 90°. Están en enunciado, pasos y resultado. Fórmulas correctas. |
| H10 por definición | Resuelto | `porDefinicion`: polinomios (coeficiente de t tras f(P + tu) − f(P), dividir por t, t → 0⁺) y ln(x/y) con el límite notable. u racional (módulo entero). Matemática correcta; el test compara el límite con D_u f. |
| H18 tipos de diferencial | Resuelto | Cinco modos: error máx. con %, variación con signo, pieza hueca (espesores de pared, fondo y tapa una sola vez), aproximación (raíz y ln) y ángulo en radianes (tiro, dθ = kπ/180). Derivadas y valores verificados a mano. |
| H23 gráfico y S1/S2 | Resuelto | Tipos √(A/B), √(A·B) y ln(A·B) con S₁ ∪ S₂ (los operadores ≥/> y ≤/< están bien). La consigna dice "gráfica y analíticamente", hay función `grafico` y la UI (`ui.js`) dibuja el dominio con bordes llenos o punteados. Además el dominio vacío (H25) se evita con un conteo sobre el reticulado, y la frontera sale en forma canónica (H26). |
| H35 sistemas e y(x), z(x) | Resuelto | Cinco formas: z(x,y), dy/dx de g(x,y) = 0, "y = f₁(x), z = f₂(x)" (incluida arctg con 1/(1 + u²) que se cancela) y sistema con jacobianos. Los cocientes −∂(g₁,g₂)/∂(x,z) ÷ ∂(g₁,g₂)/∂(y,z) y −∂(g₁,g₂)/∂(y,x) ÷ ∂(g₁,g₂)/∂(y,z) son correctos (Cramer). |
| H45 notación | Resuelto | f'_x, F'_x, z'_x, f''_xx, H para el determinante, `\operatorname{arctg}`, φ, e_máx / e_rel / e_%, D_f, `\varphi` y SEN. Hay un test con regex que falla si reaparece la notación vieja. Sin hallazgos nuevos. |

Ningún crítico queda sin resolver.

### Puntajes

| Generador | Notación /20 | Matemática /25 | Porqué /25 | Nivel parcial / bordes /30 | **Total /100** | Antes |
|---|---|---|---|---|---|---|
| dominio | 18 | 25 | 23 | 23 | **89** | 74 |
| direccional | 18 | 25 | 22 | 20 | **85** | 71 |
| diferencial | 18 | 25 | 23 | 24 | **90** | 68 |
| extremos | 18 | 25 | 24 | 26 | **93** | 81 |
| lagrange | 18 | 25 | 24 | 24 | **91** | 68 |
| implicita | 18 | 25 | 23 | 22 | **88** | 75 |
| plano | 18 | 25 | 23 | 25 | **91** | 80 |
| **Global (promedio)** | | | | | **89,6 (≈ 90)** | 74 |

El objetivo de 90 se alcanza en el borde (89,6). No lo doy por cerrado hasta que alguien corra los tests: mi puntaje es por lectura. Dos generadores, direccional (85) e implicita (88), quedan debajo de 90 por su cuenta.

### Hallazgos pendientes (ninguno crítico)

Orden por peso. Cada punto dice qué agregar y dónde.

1. **[MAYOR] Lagrange `cajaPlano`, consigna que pide S (línea ~187).** Cuando `pideS` es verdadero, el enunciado dice "Hallar con Lagrange sus dimensiones y su superficie total" y nunca dice qué se optimiza. Queda un ejercicio mal planteado. Agregar "de volumen máximo" (por ejemplo: "…la caja de volumen máximo; dar sus dimensiones y su superficie total"), como en Recup. Nov-25 #4.
2. **[MAYOR] Direccional, puntos y funciones amables (H12 parcial).** `e1`, `e2`, `e3` y `l3` siguen con el punto elegido para que e⁰ = 1 o ln 1 = 0, y no hay modo de 3 variables (2S2 Jun-24, cosenos directores). Agregar un tipo con P en que el exponente no sea 0 (por ejemplo e^{xy} en (1, 2)) y una variante f(x,y,z) con versor de 3 componentes y cosenos directores. ln√ y ln(x/y) ya están.
3. **[MAYOR] Direccional, gráfico del gradiente (H16).** El paso de nulas dice "el gráfico se hace aparte". Los parciales 2S2 Jun-25, 1R7 Oct-25, 1H10 Sep-25 y 1R3 Sep-23 piden graficar ∇f e indicar máximo, mínimo y nulos. Agregar un SVG con ∇f saliendo de P y las cuatro direcciones, como ya se hizo con `grafico` en dominio. Hasta entonces el generador entrena el cálculo y no el gráfico.
4. **[MAYOR] Dominio, familias y puntos de intersección (H24).** Siguen sin aparecer circunferencias o elipses con centro desplazado (completar cuadrados), arcsen/arccos (−1 ≤ A ≤ 1), ln|A| y xy ≠ 0 en un denominador. Falta también el paso 6 del machete: con dos curvas, resolver el sistema entre bordes y rotular los puntos de intersección.
5. **[MAYOR] Implícita, sen y F_z(P) = 0 (H36 parcial, H39).** `superficie` sigue sin `sen(…)`: el ejemplo de la cátedra es sen(3x² − xy + z) + e^{y − x² + z}. Falta un tipo `senz`. Falta también la variante en que el denominador se anula y la respuesta es "no se puede aplicar el teorema"; hoy se descarta con `continue`.
6. **[MENOR] Implícita, sistema (p1-implicita.js, paso 4 de `sistema`).** El texto dice "(cuenta de abajo, más adelante)", que se entiende mal. Además salta de las parciales a los jacobianos sin mostrar el sistema lineal en y', z' del que sale Cramer. Mostrar las dos ecuaciones g'_{1x} + g'_{1y}y' + g'_{1z}z' = 0 y la análoga, y despejar. Reemplazar la frase por "el denominador es siempre ∂(g₁,g₂)/∂(y,z)".
7. **[MENOR] Lagrange `circunferencia`, rama vacía.** Al ser a = 2b·x₀ con \|x₀\| < r, la rama λ = b siempre da dos puntos. No se entrena el caso en que \|x₀\| > r y la rama no aporta candidatos. Agregar como variante con un texto "esta rama no tiene solución real, queda solo y = 0".
8. **[MENOR] Diferencial.** El cono sigue solo con V (S pide la generatriz). Falta una variante con generatriz, o la nota "se usa la altura h y el radio r" en el enunciado.
9. **[MENOR] Extremos, funciones no polinómicas (H33).** Solo polinomios. Anotar como límite conocido (sin exponencial ni ln).
10. **[MENOR] Comprobación final (H46) incompleta.** Hay controles en diferencial (ΔV exacto), implícita (dF = 0), direccional (producto escalar) y Lagrange (geometría). Faltan en extremos (reemplazar P en f'_x y f'_y da 0), plano (el punto verifica la ecuación del plano) y dominio (punto de prueba dentro y fuera).
11. **[MENOR] Direccional con ∇f(P) = 0 (H17).** Sigue evitado con `continue`.
12. **[MENOR] Plano.** La forma simétrica con componente negativa queda como `\frac{x-1}{-2}`. Está bien matemáticamente, pero el machete usa el signo arriba. Revisar el estilo.

### Riesgos de esta re-auditoría

- Sin ejecución: puede haber un caso límite del RNG (por ejemplo la forma en que `raiz()` arma `yv` en `circunferencia`, o `dg()` con ángulos casi enteros) que no vi. Los tests con 1000 semillas deberían atraparlo; conviene correrlos antes de dar el lab por cerrado.
- Los puntajes de notación (18/20 para todos) dejan 2 puntos por la comprobación final incompleta, común a todos los generadores.
