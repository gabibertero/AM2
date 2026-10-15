# E3 — Auditoría de la teoría (profe) — u04 a u10 (commit 484b8b5)

Vara: definición precisa + propiedades + desarrollo/deducción + gráfico; formato 2º teórico (2 temas, 4 cortas, 3 choice). Coherencia con el preguntero (96).
Método: releí los 7 .md, recalculé a mano todo (Jacobianos, esféricas, Green por partes, Stokes término P, rot=2ω, factor integrante, Bernoulli, resonancia, variación de parámetros, separación de variables, Dirichlet) y cotejé con los txt de Monllor (07 div/rot/Stokes, 06 Green/independencia, 09, 11). NO se editó ningún .md.

## Puntajes

| Unidad | Puntaje | Resumen |
|---|---|---|
| U4 | 91 | Sin errores de cálculo. Faltan gráficos reales y fórmula general de la triple. |
| U5 | 89 | "solo si simplemente conexa" mal formulado; Enunciado de Green inconsistente con sus propias hipótesis. |
| U6 | 88 | Stokes: "idem R dz" no es idem. Divergencia como límite sin marcar como agregado. (Tentativa) |
| U7 | N/A | Sin material, honesto: no inventa. |
| U8 | 90 | Bien. Detalles de rigor y Schwarz sin marcar. |
| U9 | 90 | Variación de parámetros sin deducción; resonancia p=q=0 falta; sin aplicaciones. |
| U10 | 88 | Falta λ>0 s.p.d.g., compatibilidad f(0)=f(l)=0, n=0 en Dirichlet. (Tentativa) |
| Global (U4-U6, U8-U10) | 89 | Falta 1 punto para 90; el que más pesa es la falta de figuras. |

## 1. Errores matemáticos / de rigor lógico (bajan más)

1. **U5 §6 y §7, "vale solo si el dominio es simplemente conexo"** (-2). "Solo si" = necesario; es falso (hay campos con P_y=Q_x conservativos en dominios con agujeros, por ejemplo (x,y)/(x²+y²)). Simple conexión es condición SUFICIENTE. Arreglo: cambiar a "vale si el dominio es simplemente conexo; con agujeros puede fallar (contraejemplo)". Mismo cambio en U5 §7 "vale solo en una región simplemente conexa".
2. **U5 §5, Enunciado** (-2). Dice "derivadas parciales continuas en D" y dos viñetas más abajo "en un abierto que contiene a D". Es el hallazgo 1 de mi re-auditoría anterior y sigue. Arreglo: poner "en un abierto que contiene a D" en el Enunciado.
3. **U6 §7, Demostración de Stokes, "Idem para Q dy y R dz"** (-2). Para Q es idem; para R no: con S: z=f(x,y), ∮R dz = ∮R(f_x dx+f_y dy), el término no sale de la misma cuenta. Monllor (07, p.14-15) lo hace junto: ∮F·ds = ∮(P+R f_x)dx+(Q+R f_y)dy y aplica Green una sola vez. Arreglo: reemplazar "idem" por esa línea (o decir "R se trata con dz=f_x dx+f_y dy").
4. **U8 §1, ejemplo y'=√y** (-1). f solo está definida en y≥0, así que "entorno de (0,0)" no es literal. Arreglo: "en el semiplano y≥0, donde f está definida". (Hallazgo viejo, sigue.)
5. **U4 §1, Definición** (-0,5). "área del mayor subrectángulo → 0" no controla el lado (rectángulos finos). Arreglo: "diagonal del mayor subrectángulo → 0" (si Monllor dice área, dejar nota).

## 2. Lo que baja puntos por estilo de cátedra

6. **Sin gráficos reales en U4, U5, U6, U8, U9, U10** (-3 por unidad). Todos los "Gráfico." son descripciones de texto; `public/figuras/teoria/` no existe y los .md no insertan ninguna figura (el componente PreguntaFigura.astro existe pero nadie lo usa). La cátedra pide el gráfico en Green, Jacobiano, divergencia y esféricas. Arreglo: generar SVG (agente graficos) para Green (D entre f1 y f2 con L antihoraria), Jacobiano (rectángulo → paralelogramo), esféricas, div fuente/sumidero, Stokes (S, n, L), campo de pendientes homogénea, y_h tres casos, modos de cuerda. Prioridad: Green, Jacobiano, esféricas, Stokes.
7. **U6 §4, divergencia como límite** (-1). Es agregado del sitio: Monllor (07 p.4) la define solo por la fórmula y la interpretación física. Arreglo: agregar "_(hipótesis estándar; Monllor define por la fórmula)_" a la Definición.
8. **Schwarz / derivadas mixtas sin marcar** (-1 en U5, U6, U8). Monllor (07 p.~1683) dice solo "igualdad de las derivadas mixtas de segundo orden continuas"; el nombre y su uso en U5 §7, U6 §5 (conservativo ⇒ irrotacional) y U8 §6 (Necesaria) no llevan la etiqueta. Arreglo: agregar "_(estándar: Teorema de Schwarz; Monllor lo usa sin nombrarlo)_" en los tres lugares.
9. **U6 §5, Campo irrotacional** (-1). "rot F=0 (con derivadas segundas continuas)" mezcla definición con hipótesis de Schwarz (hallazgo viejo, sigue). Arreglo: mover el paréntesis a la línea "Todo campo conservativo es irrotacional".
10. **U6 §4, "=0 … (incompresible)"** (-0,5). Arreglo: "sin acumulación; incompresible si la densidad es constante".
11. **U6 §8, Gauss** (-1). Solo "idea de la demostración"; Monllor (p.17-18) desarrolla ∭R_z dv=∬R cosγ dσ. Arreglo: una línea con la integral en z entre z=f1 y z=f2 y el resultado.

## 3. Faltantes por unidad

- **U4** (-2): (a) falta la fórmula general de cambio de variables en triple con J de 3×3 antes de cilíndricas/esféricas (§5 solo es 2D); (b) falta la fórmula iterada de la triple en un E general, ∬_D∫_{ψ1}^{ψ2} dz (§7 solo nombra la doble).
- **U5** (-3): (a) §1 sin "L suave a trozos" y sin "la integral no depende de la parametrización, solo del sentido" (estaba en el preguntero u5-t02); (b) §5 la parte Q de la demostración dice "mismo razonamiento": escribir la cuenta (∮Q dy=∫Q(g2,y)dy−∫Q(g1,y)dy=∬Q_x); (c) no se define "simplemente conexo" (una línea: toda curva cerrada se contrae a un punto sin salir de D).
- **U8** (-2): (a) §1 solo el ejemplo y'=2y para solución particular (Tema B del parcial real): agregar el ejemplo lineal con y(0)=0 (resultado x−1+e^{−x}, ya verificado en el preguntero); (b) §3 "para todo λ" en homogénea: λ>0 o dentro del dominio; (c) §6 usa P,Q como en Monllor, pero §4 los usa distinto: nota "en §6 P,Q son los coeficientes de la ecuación, no los de §4".
- **U9** (-3): (a) §5 variación de parámetros: "se imponen" las condiciones sin deducirlas; agregar y_p'=u'y1+v'y2+uy1'+vy2', se pide u'y1+v'y2=0 para que no aparezca y_p'' con u'' y se sigue el sistema; (b) §4 resonancia: falta p=q=0 (0 raíz doble, se multiplica por x²; y''=x ⇒ y_p=x³/6) (hallazgo viejo, sigue); (c) §3 complejas: decir que si e^{(α+iβ)x} es solución con coeficientes reales, Re y Im también lo son; (d) Monllor 09 p.23 tiene "Aplicaciones" (resorte, movimiento libre/amortiguado/forzado) y la teoría no las menciona: al menos una línea de complemento como en U8 §7.
- **U10** (-3): (a) §3/§4 falta "λ>0 sin pérdida de generalidad (λ y −λ dan la misma solución)" (Monllor 11 p.14 lo dice); (b) falta condición de compatibilidad f(0)=f(l)=0 (y φ(0)=φ(l)=0) y aclarar que la serie es formal/converge si f es seccionalmente suave; (c) §5 Dirichlet: explicitar λ=0 (u0=(A0+B0θ)(C0+D0 ln r)) ⇒ B0=0 por periodicidad y D0=0 y D_λ=0 por acotación en r=0 (Monllor 11 p.13); (d) "Equivalencia con la forma normalizada" es confuso: dejar una sola frase "con c_n=a_nRⁿ"; (e) §2 la letra D se usa para el término de orden menor y para los D_n de §3/§4: renombrar el término a "G(...)" o aclarar; el ejemplo mezcla variables (x,t) y (x,y).
- **U7**: sin material, correcto. No bajar ni subir.

## 4. Estado de lo agregado sin cita en Monllor (marcado como estándar)

- Marcados correctamente: existencia y unicidad (U8 §1, U9 §1), factor integrante (U8 §6), "toda solución es y_h+y_p" (U9 §1), contraejemplo (-y,x)/(x²+y²) (U5 §6), extensiones de Green (U5 §5), J≠0 (U4 §5), cociente −λ² (U10), B²−4AC (apoyo no oficial), recíproca de solenoidal (U6 §5), W=0 no implica dependencia (U9 §2), integral escalar sin sentido (U5 §2).
- Sin marcar: divergencia como límite (U6 §4), Schwarz (U5 §7, U6 §5, U8 §6), argumento del disco para "independencia ⇒ P_y=Q_x" (U5 §6, es del sitio; Monllor lo obtiene de otra forma), W(x0)≠0 ⇒ W≠0 en el intervalo (U9 §2, Abel).

## 5. Coherencia con el preguntero (96)

- Todo lo corregido en el preguntero está en la teoría: rot=2ω, simple conexión (U5/U8), y_h+y_p completo, existencia y unicidad, divergencia como límite, Stokes con la cuenta del término P, resonancia q=0, Dirichlet con aN/Rⁿ.
- Desfasajes: (a) el preguntero tiene u9-t04 y u8-c01 de solución particular; la teoría solo tiene el ejemplo de U9 (y'' - y=e^x); falta el equivalente en U8; (b) el preguntero ya dice (r/R)^n en Dirichlet y la teoría lo deja como "equivalencia" confusa; (c) los hallazgos 1, 6 y 7 de mi re-auditoría (Enunciado de Green, p=q=0, irrotacional) siguen abiertos en ambos lados.

## Verificado y correcto (no tocar)

Jacobiano esférico −r² sinφ con el desarrollo por columna; 3/20, 8π, 4πR³/3, πa⁴/2, 37/30, 3/2, √3; Green por partes (signos de P y de Q); contraejemplo y circulación 2π; rot de (x²y,yz,xz²)=(−y,−z²,−x²); Stokes término P (−P_zf_y−P_y a ambos lados); factor integrante μ(x), μ(y); Bernoulli z'−z=−x; W(e^{kx},xe^{kx})=e^{2kx}; y_p de 1/cos x; clasificación 4c²/0/−4; D_n=2/(cnπ)∫φ sin; errores de Monllor sobre armónicas (−2 y 2) confirmados contra el txt p.11.

## Orden para llegar a ≥90 (todos)

1. Figuras (item 6): +3 por unidad, es el salto.
2. Items 1, 2, 3 (errores): +2/+2/+2 en U5 y U6.
3. U9 (a) y (b), U10 (a)(c): +1/+2.
