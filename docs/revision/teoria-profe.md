# Revisión del profe: teoría U4–U10 (borrador)

Alcance: `src/content/teoria/u04.md` … `u10.md` contra `modelo-teorico.mdx`, el Modelo P2 teórico (PDF, páginas 1-4 mirados como imagen), los apuntes Monllor (texto de las páginas citadas) y `Links e Info.md`. Formato real del teórico: 2 temas (elegir 1), 4 preguntas cortas, 3 multiple choice. Cuentas verificadas con sympy: todos los ejemplos mínimos de las 7 unidades dan lo que dice el texto (Jacobiano esférico incluido: en orden (r,θ,φ) da -r² sinφ).

## Puntajes (corrección 3, fidelidad 2, suficiencia para el examen 3, claridad 1)

| Unidad | Corrección | Fidelidad | Suficiencia | Claridad | /100 |
|---|---|---|---|---|---|
| U4 Integrales múltiples | 9,5 | 9 | 8 | 9 | **88** |
| U5 Curvilíneas / Green | 8,5 | 9 | 6 | 8,5 | **78** |
| U6 Campos vectoriales (tentativa) | 7,5 | 8,5 | 7 | 8,5 | **77** |
| U7 Computación numérica | n/a | n/a | n/a | n/a | **n/a** (correctamente "sin material", no inventa nada) |
| U8 EDO 1.er orden | 8,5 | 9 | 8 | 9 | **85** |
| U9 EDO orden superior | 8,5 | 8,5 | 7 | 8,5 | **80** |
| U10 EDP (tentativa) | 8,5 | 9 | 5,5 | 7,5 | **75** |

(cada criterio sobre 10; total = (3C+2F+3S+Cl)·100/90)

Punto 6 del encargo: U6 y U10 están marcadas `alcance: tentativo` con aviso arriba; U7 dice "sin material" y no inventa teoría; lo agregado por el sitio está rotulado "agregado del sitio / verificar con la cátedra" casi siempre (excepciones abajo, E9). Matiz: U6 se rotula tentativa pero 3 de las 6 preguntas del Modelo teórico (4, 5, 6) son de U6, o sea la parte teórica ya está confirmada por la cátedra; el aviso debería decir "tentativa solo para los prácticos".

## Respuesta al modelo teórico, usando solo la teoría

| Preg. | Unidad | ¿Alcanza? |
|---|---|---|
| 1 Green (desarrollar) | U5 §5 | **No del todo.** Está el enunciado y la fórmula, pero la demostración es solo un resumen de una línea. Una consigna "desarrolle" pide la demostración completa (las dos integrales (1) y (2) de la p.1-2 del modelo). |
| 2 Solución general EDO homogénea | U8 §3 | **Sí**, cubre toda la deducción oficial (definición, t=1/x, y=ux, separación, G(y/x)=ln x+C). |
| 3 Factor al cambiar variables | U4 §5 | **Sí** (|J|, fórmula y determinante coinciden con el modelo). Falta el 3×3 para triples. |
| 4 Derivada de campo vectorial | U6 §2 | **Sí** (matriz m×n, filas = gradientes, casos escalar y vectorial). |
| 5 Divergencia y qué representa | U6 §4 | **Sí en lo oficial** (traza, escalar, fuente/sumidero/incompresible). Falta la definición "en un punto" como límite (flujo por unidad de volumen). |
| 6 Dominio de campo vectorial | U6 §1 | **Sí**: más completo que la respuesta oficial. |

Preguntas que según `Links e Info.md` salieron en otros parciales y que la teoría cubre solo a medias: "sol. general lineal" (U8 §4 tiene el método pero no figura como pregunta tipo), "EDO 2.º orden con raíces iguales" (U9: se da el resultado, no por qué `x e^{kx}` es solución), "qué representa el rotor" (U6 §5: se dice "velocidad angular" sin la precisión), "condiciones de la serie de Fourier" (U11, fuera de alcance; ver F9).

## Errores y observaciones de corrección

| Id | Unidad / sección | Qué dice | Corrección |
|---|---|---|---|
| E1 | U5 §6 y §7 (también U8 §6) | Declara "condición **necesaria y suficiente** P_y=Q_x" y recién después aclara "solo si simplemente conexo vale la recíproca". Queda contradictorio, y el equivalente "independencia de la trayectoria ⇔ P_y=Q_x" figura sin la hipótesis. | Reescribir: P_y=Q_x es **necesaria** siempre (con P,Q de clase C¹); es **suficiente solo si el dominio es simplemente conexo** (contraejemplo: F=(-y,x)/(x²+y²) en R²∖{0}: P_y=Q_x pero la circulación es 2π). En U8 §6: "exacta ⇔ P_y=Q_x" **en un dominio simplemente conexo** (p. ej. un rectángulo). Monllor p.10 la enuncia sin esa hipótesis y p.15 la agrega; conviene unificar. |
| E2 | U6 §7 (Stokes, Interpretación) | "Si rot F=0, la integral curvilínea no depende de la forma de la curva." | Falso en general. Vale solo si el dominio de F es simplemente conexo y se comparan curvas con los mismos extremos. Agregar la hipótesis (mismo contraejemplo de E1). |
| E3 | U6 §5 (Interpretación del rotor) | "Mide la velocidad angular local." Es lo que dice Monllor p.5, pero es impreciso. | rot F = 2ω (el doble de la velocidad angular del fluido); su dirección es el eje de giro. Monllor no lo precisa: agregarlo como aclaración del sitio. |
| E4 | U6 §5 (Solenoidal) | "Ocurre cuando F=rot A": se lee como si fuera la caracterización. | Solo vale la implicación F=rot A ⇒ div F=0; la recíproca requiere dominio estrellado. Reformular como "si F=rot A entonces es solenoidal". |
| E5 | U9 §5 (Variación de parámetros) | Las fórmulas u'=-y₂f/W, v'=y₁f/W no aclaran que f es el segundo miembro **con y'' de coeficiente 1**. | Agregar: "forma normal y''+a₁y'+a₂y=f; si el coeficiente de y'' no es 1, dividir antes de usar f". Y hipótesis: a₁, a₂, f continuas en el intervalo. |
| E6 | U9 §4 (Resonancia) | La regla "a o a±bi es raíz" no cubre explícitamente el polinomio con q=0 (raíz k=0). | Aclarar: para f polinomio, a=0; si k=0 es raíz (p. ej. y''+y'=x) hay que multiplicar por x. Agregar ese ejemplo. |
| E7 | U10 §3 (Separación de variables) | Se escribe -λ² "porque ambos miembros son constantes" sin justificar el signo. | Justificar: con las condiciones de contorno X(0)=X(l)=0, las constantes ≥0 dan solo X≡0; por eso se toma -λ² (λ>0). Sin esto el paso parece arbitrario. |
| E8 | U8 §4 (Lineal) | Falta la hipótesis de que P y Q sean **continuas en un intervalo**; la fórmula se da como cierta "donde el cociente esté definido". | Agregar "P, Q continuas en un intervalo I: la solución general está definida en todo I". |
| E9 | U9 §3 ("Orden n (resumen)"), §2 (W≠0) | Resumen de orden n y "W≠0 en todo punto" no tienen marca de origen. | Citar página de Monllor o rotular "agregado del sitio". El "W≠0 en todo punto" vale **solo para soluciones de la misma EDO lineal homogénea** con coeficientes continuos; decirlo. |
| E10 | U4 §1 / §3 | "Si f cambia de signo, el resultado ya no es un volumen." | Correcto pero conviene completar: es la diferencia de volúmenes (Monllor p.6). Menor. |

Sin errores matemáticos en fórmulas: Jacobianos (plano, polares, cilíndricas, esféricas), momentos e inercias, área de superficie, trabajo y circulación, Green (incluso el cambio de signo horario), potencial, flujo con proyección sobre xy, Stokes/Gauss, Bernoulli, lineal, exacta, tabla de raíces, coeficientes indeterminados, Wronskiano, clasificación B²-4AC, coeficientes C_n y D_n de la cuerda (D_n=2/(cnπ)∫φ sin), calor, Dirichlet en el círculo. La alerta de U10 §5 sobre los "ejemplos armónicos" de Monllor p.11 es correcta: Δ(3y²-4x²)=-2 y Δ(x²+xy)=2.

## Faltantes, ordenados por peso

| # | Peso | Qué agregar | Dónde |
|---|---|---|---|
| F1 | Alto (pregunta 1 oficial, "desarrolle") | Demostración **completa** de Green tal como en el modelo p.1-2: región entre y=f₁(x), y=f₂(x) y entre x=g₁(y), x=g₂(y) (**hipótesis explícita: D regular en ambas direcciones**; en general se subdivide); cálculo de ∮P dx = -∬P_y y ∮Q dy = +∬Q_x con los dos tramos de la curva y el signo de recorrer el tramo superior hacia atrás; suma. | U5 §5, reemplazar la "Idea de la demostración". |
| F2 | Alto (preguntas tipo de otros turnos) | Derivación de la solución general lineal y'+Py=Q (y=uv, v=e^{-∫P}, u=∫Qe^{∫P}+C) redactada como respuesta de examen, con las hipótesis (E8); y un párrafo "solución particular = elegir C con y(x₀)=y₀" para el caso en que la consigna pida la particular en vez de la general (Links: "lo único que cambiaba era solución general por la particular"). | U8 §4 y bloque "Preguntas teóricas" (agregar la pregunta; hoy solo figura la homogénea). |
| F3 | Alto | Qué representa el rotor (E3) con interpretación y ejemplo del campo F=(-y,x,0) (rot=2k, ω=k); y la definición de divergencia **en un punto** como límite: div F(P)=lim (1/V)∯F·n dσ cuando el volumen tiende a P. | U6 §4 y §5 + agregar "rotor" a "Preguntas teóricas" (Links lo menciona). |
| F4 | Medio | Hipótesis de simple conexión en independencia de trayectoria, exactas y Stokes (E1, E2); contraejemplo del campo (-y,x)/(x²+y²). | U5 §6-7, U6 §7, U8 §6. |
| F5 | Medio (multiple choice) | Mini-banco de multiple choice por unidad (p. ej. "¿cuál es el Jacobiano de polares?", "Green: signo si es horario", "ec. característica de raíces iguales", "tipo de y_tt=c²y_xx"). El formato real tiene 3 y hoy la teoría no tiene ninguno. | Bloque "Preguntas teóricas" de cada unidad. |
| F6 | Medio | Jacobiano 3×3 general y las cuentas explícitas del determinante en cilíndricas (=r) y esféricas (=r² sinφ), no solo "(verificado con sympy)"; en el examen hay que mostrar el factor. | U4 §5, §8, §9. |
| F7 | Medio | Por qué x e^{kx} es solución en raíz doble (reemplazo, o Wronskiano ya dado) y por qué la solución compleja se pasa a seno y coseno (Euler, resumen de dos líneas); enunciar el teorema "y=C₁y₁+C₂y₂ es la general si W≠0". | U9 §3. |
| F8 | Bajo | Ejemplo de resonancia con polinomio y k=0 (E6) y ejemplo con raíz doble en el segundo miembro (x²). | U9 §4. |
| F9 | Bajo | U10: justificar el signo -λ² (E7) y mostrar cómo salen C_n y D_n (ortogonalidad del seno). Si "condiciones de la serie de Fourier" (Dirichlet) fuera a tomarse como en el 1.er parcial, falta una frase con las condiciones (f y f' continuas a trozos): hoy U11 está explícitamente fuera de alcance y Links indica que Fourier no se tomó. | U10 §3-§5 (una nota). |
| F10 | Bajo | Aclarar en el cartel de U6 que la parte teórica (preguntas 4-6) es oficial y confirmada; tentativa solo la parte práctica. | U6, encabezado. |
| F11 | Informativo | Factor integrante: no está en las fuentes (confirmado: Monllor 08 y 6EDO no lo traen); el machete lo rotula bien. No agregar a la teoría salvo que la cátedra lo tome. | n/a |

## Fidelidad (páginas abiertas)
Confirmadas contra el texto de las páginas citadas: Monllor 05 p.6 (iteradas, continua), p.23 y 25 (condiciones del cambio de variables, Jacobiano en valor absoluto), p.37 (esféricas); 06 p.9 (Green y caso horario), p.10 (independencia), p.15 (simplemente conexo); 04 p.3 (dominio = intersección); 07 p.4-6, 13, 17 (divergencia, rotor, irrotacional, Stokes con orientación, Gauss); 08 p.4-5 (homogéneas); 09 p.14, 18-19 (coeficientes indeterminados, resonancia); 11 p.4, 11, 14 (cuerda, Laplace con ejemplos erróneos, Dirichlet). Modelo P2 teórico p.1-4: la teoría reproduce bien las respuestas oficiales 2 a 6. No se abrieron imagen por imagen las guías Rocha-Giordano ni los números de página de los listados de ejercicios.
