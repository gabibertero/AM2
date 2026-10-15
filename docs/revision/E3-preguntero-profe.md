# E3 — Auditoría del preguntero teórico (profe) — U4, U5, U6, U8, U9, U10

Vara: definición precisa + propiedades + desarrollo/deducción + gráfico; formato 2º teórico (2 temas elegir 1, 4 cortas, 3 choice).
Método: recalculé a mano todas las fórmulas, ejemplos y distractores. NO se editó nada.
Limitación: las respuestas oficiales del Modelo P2 están solo como PDF/imagen (`pdftoppm` no está instalado, no pude verlas). Las comparé con el resumen de `docs/inventario/B-parciales-2026-recup-modelo.md` (E12). Hay que cotejar a ojo los puntos marcados (OFICIAL?).

## Puntajes

| Unidad | Puntaje | Resumen |
|---|---|---|
| U4 | 90/100 | Sin errores matemáticos. Faltan hipótesis finas del Jacobiano. |
| U5 | 84/100 | Dos imprecisiones lógicas en la condición de independencia de trayectoria. Falta el contraejemplo clásico. |
| U6 | 83/100 | Rotor mal interpretado (2ω). Divergencia sin definición como límite del flujo. Stokes con demostración floja. |
| U8 | 88/100 | Exactitud "suficiente" sin dominio. No hay existencia y unicidad. |
| U9 | 88/100 | Justificación de y_h + y_p incompleta. No hay existencia y unicidad. |
| U10 | 80/100 | No cayó. Falta justificar el signo de la constante de separación. Dirichlet con constantes imprecisas. |
| Global | 86/100 | Objetivo >= 90: faltan los arreglos de abajo. |

## 1. Errores matemáticos o de rigor lógico (bajan más puntos)

1. **u5-t03 y u5-c04**. Dicen "condición necesaria y suficiente P_y=Q_x" y después "la recíproca vale solo si el dominio es simplemente conexo". Es contradictorio. Arreglo: escribir "independencia de la trayectoria => P_y=Q_x (siempre); P_y=Q_x => independencia solo en dominio simplemente conexo".
2. **u5-t03**. Falta el contraejemplo que un profe pide: F=(-y,x)/(x²+y²) tiene P_y=Q_x en R²\{0} y circulación 2π sobre la circunferencia. Arreglo: agregarlo en "Propiedades". También aclarar en "Es consecuencia de Green" que D debe estar contenido en el dominio.
3. **u6-t02**. "El rotor mide la velocidad angular" es incorrecto. Arreglo: rot v = 2ω (ω = velocidad angular), con el ejemplo (-y,x,0) => rot=(0,0,2), ω=1. Corregir también la guía.
4. **u6-t03**. "Si rot F=0, la integral curvilínea no depende de la forma de la curva" es falso sin simple conexión. Arreglo: "si rot F=0 en una región simplemente conexa, la circulación sobre curva cerrada es 0".
5. **u8-t03, u8-h02 y u8-c05**. Afirman que P_y=Q_x es suficiente y "si y solo si". Arreglo: agregar "en una región simplemente conexa" (rectángulo o disco), como en U5.
6. **u9-t02, justificación de y=y_h+y_p**. Solo prueba que y_h+y_p ES solución, no que TODA solución es de esa forma. Arreglo: agregar "si y es otra solución, y-y_p resuelve la homogénea, entonces y-y_p=C1y1+C2y2". Agregar también que con W≠0 el sistema de condiciones iniciales tiene solución única en C1,C2.
7. **u10-c05, Dirichlet**. Dice que a_n y b_n son los coeficientes de Fourier de f, pero en radio R es a_n R^n = coef. de Fourier. Arreglo: escribir (r/R)^n, o aclarar a_n=(1/(πR^n))∫f cos nθ dθ.
8. **u10-t01 y u10-t02**. Ponen la constante de separación como "-λ²" sin justificarla. Arreglo: una línea con los casos λ²>0, =0, <0 (solo el negativo da X no trivial con X(0)=X(l)=0).

## 2. Hipótesis de teoremas (Green, conservativo, existencia y unicidad, wronskiano)

- **Existencia y unicidad: no existe NINGUNA pregunta en U8 ni U9.** Es el hueco más grande de cobertura. Agregar:
  - Una corta en U8: y'=f(x,y), y(x0)=y0 tiene solución única local si f y ∂f/∂y son continuas en un entorno de (x0,y0). Ejemplo: y'=√y, y(0)=0 viola ∂f/∂y.
  - Una corta en U9: para y''+a1y'+a2y=f con a1,a2,f continuas, el problema de Cauchy tiene solución única en todo el intervalo.
  - Referenciar ambas desde u8-t02 (condición de validez) y u9-t01/t02.
- **u5-t01 (Green)**. La hipótesis dice "derivadas parciales continuas en D". Precisar "en un abierto que contiene a D" y que D es simple (regular en x e y) para la demostración. La parte de Q j usa x=g(y), así que hay que aclarar "supongo D regular en ambas direcciones". Agregar una línea de extensión: dominio con agujeros = suma de bordes (exterior antihorario, interiores horarios). Si el oficial lo demuestra con "regiones tipo I/II" (según el inventario), esto ya coincide.
- **u9-t02/u9-c02 (Wronskiano)**. Agregar "W≠0 en un punto => W≠0 en todo el intervalo (si son soluciones)". Agregar el aviso: para funciones cualesquiera, W=0 NO implica dependencia. Hoy solo está implícito.
- **u4-t01**. La lista de condiciones del cambio de variables omite J≠0 (en el interior del dominio). Es la hipótesis que justifica la biyección local. Agregar.
- **u6-t03 (Stokes)**. Faltan "S suave a trozos y L simple cerrada suave a trozos". La demostración dice "ambos miembros coinciden" sin hacer la cuenta. Arreglo: desarrollar el término P (P_z f_y y la regla de la cadena) y decir "idem Q, R".

## 3. Respuestas modelo que un profe no pondría 10

- **u6-t01 (divergencia en un punto)**. El Modelo P2 pide "concepto de divergencia en un punto". Falta la definición como límite: div F(P)=lim_{V->P} (1/V)∬_S F·n dσ. Eso es lo que "representa". Hoy la respuesta arranca con la fórmula del operador. Agregar la definición límite y mencionarla en la corta de la pregunta 5. (OFICIAL? cotejar si pide ∇·V, traza del Jacobiano o ambos.)
- **u6-t01**. "div=0 => incompresible" necesita "(flujo sin acumulación; incompresible si la densidad es constante)". "Ocurre cuando F=rot A" es solo la condición suficiente. Escribir "si F=rot A entonces div F=0; la recíproca vale en dominios estrellados".
- **u6-c02 (dominio)**. Falta la definición formal: dominio ⊂ R^n, f: R^n -> R^m, Dom = intersección de dominios de las m componentes. El inventario dice que el oficial usa "R^n -> R^m, dominio en R²/R³". Cotejar. Agregar un ejemplo con un campo de R³.
- **u6-c01 (derivada)**. Agregar "diferenciable en el punto si cada componente lo es (condición suficiente: parciales continuas)". Agregar la fila del Jacobiano evaluada en un punto.
- **u8-t03**. El texto "(El factor integrante no figura en Monllor...)" está dentro del cuerpo de la respuesta modelo. Moverlo a un comentario o nota. Además usa P,Q con sentido distinto al de la lineal (u8-t02). Agregar una nota "en esta pregunta P,Q son M,N de la ecuación".
- **u8-t02 (solución particular)**. Links dice que el Tema B cambió "solución general" por "la otra que es la particular". No hay un tema "solución particular" (condición inicial, determinación de C, caso lineal 1er orden). Agregar un tema o una corta con ejemplo resuelto, por ejemplo la lineal con y(0)=0.
- **u9-t03**. En la tabla de resonancia, aclarar que el polinomio también entra en resonancia cuando 0 es raíz (q=0): se multiplica por x. Ejemplo: y''+y'=x.
- **u5-t02**. Falta "L suave a trozos" entre las propiedades y la independencia de la parametrización (la integral no depende de cómo se parametrice, solo del sentido).

## 4. Choices: inequívocos, con un solo correcto

Recalculé todos. Los 33 tienen una única respuesta correcta. Ajustes menores:
- **u4-h04**. La opción 2 "el volumen de D" es falsa pero ambigua (∬1 dA es numéricamente el volumen del cilindro de altura 1). Reformular: "El volumen del sólido de base D y altura 1" no sirve; cambiar por "El volumen de D (D es plano)" o reemplazarla.
- **u4-h03**. Pregunta en negativo ("NO forma parte"). El formato oficial es afirmativo. Invertirla o dejarla marcada.
- **u6-h05**. La opción 4 "F es solenoidal" puede ser verdadera en casos particulares (F=(1,0,0)). Agregar "siempre", como la 2, o cambiar la 4 por "div F = rot F".
- **u8-h05**. La opción 1 ("una única curva") es trivialmente absurda. Reemplazarla por un distractor serio, por ejemplo "una familia con una constante, que puede incluir soluciones singulares".
- **u10-h02**. La opción 4 ("2nπ/l solo para n par") es un subconjunto de la correcta, no es falsa del todo. Cambiar a "2nπ/l, n=1,2,…".
- **u10-h03**. Si c=0 el calor degenera en u_t=0. La respuesta 3 sigue siendo única, pero aclarar en el cuerpo que Laplace sale de u_t=0 con c≠0.

Los choices verificados contra el Modelo P2 coinciden con las preguntas del modelo (Green en u5-h01, Jacobiano/traza en u6-h01).

## 5. Cobertura de lo que ya cayó

| Lo que tomaron (Links e Info.md + Modelo P2) | Estado |
|---|---|
| Green | OK (u5-t01, u5-h01) |
| Sol. general lineal | OK (u8-t02) |
| Factor necesario = Jacobiano | OK (u4-t01, u4-c01) |
| Derivada de campo vectorial | OK (u6-c01) |
| Divergencia y qué representa | Mejorable (ver 3) |
| Dominio de función vectorial | OK, falta formalidad (ver 3) |
| EDO 2º orden raíces iguales | OK (u9-t01), muy bien resuelto |
| Rotacional (definición y qué representa) | Mejorable (ver 1.3) |
| Homogénea 1er orden (Modelo P2) | OK (u8-t01), coincide con el oficial; falta nota x≠0 en λ=1/x |
| Tema B: "solución particular" | FALTA |
| Condiciones para la serie de Fourier | FALTA en estas unidades (revisar U7; Gabi dice que no se tomó) |
| Existencia y unicidad | FALTA (ver 2) |

Nada del resto del banco de U4/U5/U6/U8/U9 es de relleno: todos los temas cuelgan de algo que cayó o del programa.

## 6. Qué está muy bien (no tocar)

- u9-t01: verifica y2=xe^{kx}, calcula W=e^{2kx} y muestra u''=0. Nota 10.
- u8-t01: homogénea completa, incluye la solución singular u0. Nota 10.
- u4-t03: Jacobiano esférico con el signo del orden (r,θ,φ) bien explicado. Ejemplos verificados (8π y 4πR³/3).
- Todos los ejemplos numéricos (37/30, 8π, √3, 2πa², x²y+3x+2y²=C, rot=(-y,-z²,-x²), div=2xy+z+2xz, y_p=½xe^x, y_p de 1/cos x) están bien.
- Factor integrante μ(x) y μ(y): signos correctos.

## Orden para llegar a 90

1. Existencia y unicidad (U8 y U9) y tema "solución particular". (+3 U8, +2 U9)
2. Independencia de trayectoria: arreglar necesaria/suficiente + contraejemplo. Mismo arreglo en U8 (exacta). (+4 U5, +2 U8)
3. Rotor 2ω, divergencia como límite del flujo, Stokes y su demostración. (+5 U6)
4. Resto de la sección 1 y 3.

---

## Re-auditoría

Método: releí los seis MDX completos y recalculé a mano todo lo agregado. No se editó ningún MDX. No cotejé contra los txt de Monllor (no hizo falta: lo agregado es estándar y está marcado como tal).

### Puntajes

| Unidad | Antes | Ahora |
|---|---|---|
| U4 | 90 | 97 |
| U5 | 84 | 95 |
| U6 | 83 | 96 |
| U8 | 88 | 96 |
| U9 | 88 | 96 |
| U10 | 80 | 94 |
| Global | 86 | 96 |

### Hallazgos anteriores: todos resueltos

- Sec. 1 (8 ítems): resueltos. u5-t03/c04 con implicación en un solo sentido y contraejemplo (verifiqué P_y=Q_x=(y²-x²)/(x²+y²)² y circulación 2π); u6-t02 rot=2ω con ejemplo (-y,x,0); u6-t03 simple conexión; u8-t03/h02/c05 simple conexión; u9-t02 "toda solución es de esa forma" y sistema con det W(x0); u10-c05 con (r/R)^n; u10-t01/t02 casos K=0, K>0, K<0.
- Sec. 2: existencia y unicidad en u8-c07 y u9-c07 (ejemplo y'=√y con y=x²/4 verificado), referenciadas desde u8-t02, u9-t01, u9-t02; Green con "abierto que contiene a D" y regular en ambas direcciones; Wronskiano W(x0)≠0 y aviso W=0; J≠0 en u4-t01; Stokes con la cuenta del término P (verifiqué rot(P i)=(0,P_z,-P_y), n dσ=(-f_x,-f_y,1) y la regla de la cadena: ambos miembros dan -∬(P_y+P_z f_y)).
- Sec. 3: divergencia como límite del flujo (u6-t01), "sin acumulación / incompresible si ρ constante", dominio con R^n->R^m y ejemplo en R³, diferenciable y evaluación en P0, nota de notación P,Q en u8-t03, tema u9-t04 y corta u8-c01 de solución particular (recalculé: C1=-1/4, C2=1/4, y=-¼e^x+¼e^{-x}+½xe^x), resonancia con q=0 (y''+y'=x, y_p=½x²-x verificado), u5-t02 con "suave a trozos" e invariancia de la parametrización.
- Sec. 4: los seis choices ajustados. Todos siguen con una única correcta.
- Cálculos nuevos verificados: y'+y=x con y(0)=0 da x-1+e^{-x}; D_n=2/(cnπ)∫φ sin; B²-4AC de ondas=4c², calor=0, Laplace<0; Cramer de variación de parámetros; y''-3y'+2y=4x da 2x+3.

### Hallazgos que siguen bajando puntos (todos menores)

1. **u5-t01, Enunciado** (-1 en U5). El párrafo del enunciado dice "derivadas parciales continuas en D" pero Propiedades dice "en un abierto que contiene a D". Arreglo: poner "en un abierto que contiene a D" también en el Enunciado.
2. **u10-c05, última frase** (-1 en U10). "porque a_nR^n debe dar el coeficiente de Fourier" usa a_n para dos cosas (el coeficiente de r^n y el de Fourier). Arreglo: "si se escribe c_n r^n, entonces c_n=a_n/R^n, porque c_nR^n debe ser el coeficiente de Fourier a_n".
3. **u10-c05, descripción de la solución** (-1 en U10). No dice que n=0 sale de pedir solución acotada en r=0 (se descarta ln r y r^{-n}). Arreglo: agregar "acotada en r=0 descarta r^{-n} y ln r".
4. **u10-t01/t02** (-1 en U10). El cociente separado se iguala a -λ² y recién después se justifica; falta decir que λ>0 sin pérdida de generalidad (λ y -λ dan la misma solución). Arreglo: una frase.
5. **u8-c07** (-1 en U8). El ejemplo y'=√y está definido solo para y≥0, así que "entorno de (0,0)" no es literal. Arreglo: aclarar "en y≥0 (semiplano donde f está definida)".
6. **u9-t03** (-1 en U9). Resonancia con polinomio: falta el caso p=q=0 (0 raíz doble, se multiplica por x²). Arreglo: una línea con y''=x, y_p=x³/6.
7. **u6-t02, Propiedades** (-1 en U6). "Irrotacional ... (con derivadas segundas continuas)" mezcla la definición con la hipótesis del Teorema de Schwarz que va con "conservativo ⇒ irrotacional". Arreglo: mover el paréntesis a la línea del conservativo.
8. **u4-t01** (-1 en U4). Falta decir que la recíproca (qué pasa si J=0 en puntos aislados) se tolera; ya está en la propiedad pero no en la fórmula. Arreglo: en "Fórmula" agregar "(J puede anularse en puntos aislados o en la frontera)".

Ninguno es un error matemático. No encontré errores nuevos introducidos en lo agregado.
