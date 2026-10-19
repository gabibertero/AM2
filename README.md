<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/readme/banner-oscuro.svg">
  <img alt="AM II · 1º y 2º parcial" src="docs/readme/banner-claro.svg" width="100%">
</picture>

**Practicá el 1º y el 2º parcial de Análisis Matemático II (UTN FRC) con los exámenes reales: pistas de a poco, resolución verificada y modo examen con nota.**

[![Abrir el sitio](https://img.shields.io/badge/▶_ABRIR_EL_SITIO-1d4fd8?style=for-the-badge&labelColor=1d4fd8)](https://gabibertero.github.io/AM2/)

![Unidades](https://img.shields.io/badge/unidades-U1_a_U10-3b82c4?style=flat-square)
![Parciales](https://img.shields.io/badge/parciales_resueltos-31-b0477f?style=flat-square)
![Anteriores](https://img.shields.io/badge/años_anteriores-8-c2671f?style=flat-square)
![Preguntas](https://img.shields.io/badge/preguntero-133_preguntas-7a5cc7?style=flat-square)
![Tests E2E](https://img.shields.io/badge/E2E-76_✓-14876b?style=flat-square)
![Tests unitarios](https://img.shields.io/badge/unitarios-78_✓-14876b?style=flat-square)
![sympy](https://img.shields.io/badge/verificado_con-sympy-3b82c4?style=flat-square)
![Machetes](https://img.shields.io/badge/machetes-21-c2671f?style=flat-square)
![Celular](https://img.shields.io/badge/funciona_en-celular-c2671f?style=flat-square)
[![Hecho con Claude](https://img.shields.io/badge/Hecho%20con-Claude-D97757?logo=claude&logoColor=white&style=flat-square)](https://claude.com/claude-code)

[Parciales](https://gabibertero.github.io/AM2/parciales/) · [Anteriores](https://gabibertero.github.io/AM2/anteriores/) · [Teoría](https://gabibertero.github.io/AM2/teoria/) · [Preguntero](https://gabibertero.github.io/AM2/preguntero/) · [Machetes](https://gabibertero.github.io/AM2/machetes/) · [Laboratorio](https://gabibertero.github.io/AM2/laboratorio/)

</div>

<br>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/readme/mockup-oscuro.png">
  <img alt="Inicio del sitio en desktop y en celular" src="docs/readme/mockup-claro.png" width="100%">
</picture>

> [!NOTE]
> Es material de estudio **no oficial**. Los enunciados y las resoluciones manuscritas son de la cátedra; las pistas, pasos, comprobaciones, criterios y la teoría están elaborados para el sitio y pueden tener errores. Contrastá siempre con tu cátedra.

<details>
<summary><b>📑 Contenido</b></summary>

- [Qué tiene](#qué-tiene)
- [Cómo usarlo](#cómo-usarlo)
- [Temas](#temas)
- [Privacidad](#privacidad)
- [Cómo está hecho](#cómo-está-hecho)
- [Para desarrollar](#para-desarrollar)
- [Roadmap](#roadmap)
- [FAQ](#faq)
- [Hecho con Claude](#hecho-con-claude)
- [Créditos y licencia](#créditos-y-licencia)

</details>

## Qué tiene

<table>
<tr>
<td valign="top" width="33%">🎯 <b>Dos instancias</b><br><sub>1º parcial (U1–U3) y 2º parcial (U4–U10), cada una con su mapa de temas</sub></td>
<td valign="top" width="33%">📝 <b>31 parciales resueltos</b><br><sub>20 del 1º y 11 del 2º: pistas, pasos, comprobación y criterio estimado; la resolución oficial escaneada va con datos tapados</sub></td>
<td valign="top" width="33%">🗂️ <b>8 años anteriores</b><br><sub>resueltos y verificados</sub></td>
</tr>
<tr>
<td valign="top" width="33%">⏱️ <b>Modo examen</b><br><sub>cronómetro, solo enunciados y autocalificación</sub></td>
<td valign="top" width="33%">🤖 <b>Corrección con IA</b><br><sub>Claude, ChatGPT o Gemini con el prompt armado</sub></td>
<td valign="top" width="33%">❓ <b>Preguntero U1–U10</b><br><sub>133 preguntas (49 del 1º, 84 del 2º), simulacro 2 temas + 4 cortas + 3 choice</sub></td>
</tr>
<tr>
<td valign="top" width="33%">📖 <b>Teoría U1–U10</b><br><sub>con figuras, estilo de cátedra</sub></td>
<td valign="top" width="33%">🧰 <b>21 machetes</b><br><sub>qué hacer según el tipo de problema; la pista 2 de cada ejercicio del 1º enlaza a su machete</sub></td>
<td valign="top" width="33%">🧪 <b>Laboratorio</b><br><sub>8 generadores del 1º y 7 del 2º, con semilla</sub></td>
</tr>
<tr>
<td valign="top" width="33%">⚠️ <b>Avisos de discrepancia</b><br><sub>donde sympy no coincide con la resolución del profe, el ejercicio lo anota</sub></td>
<td valign="top" width="33%">🏠 <b>Home</b><br><sub>mapa por instancia, cuenta regresiva al 2º parcial (31/10), progreso y "seguir donde dejaste"</sub></td>
<td valign="top" width="33%">🔌 <b>Usable sin JS</b><br><sub>enunciados, pistas, pasos y teoría se leen aunque el script no cargue</sub></td>
</tr>
</table>

<details>
<summary><b>🏠 Home con las dos instancias</b></summary>

<br>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/readme/home-largo-oscuro.png">
  <img alt="Home con accesos y mapa de la materia por instancia" src="docs/readme/home-largo-claro.png" width="100%">
</picture>

</details>

<details>
<summary><b>🧮 Laboratorio del 1º parcial</b></summary>

<br>

Ocho generadores: dominio (con gráfico de la región), gradiente y derivada direccional en 2 y 3 variables, diferencial, extremos relativos, Lagrange, derivada implícita y plano tangente. Cada uno trae la solución paso a paso.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/readme/lab-p1-oscuro.png">
  <img alt="Laboratorio: ejercicio de Lagrange con semilla 7" src="docs/readme/lab-p1-claro.png" width="100%">
</picture>

</details>

<details>
<summary><b>⏱️ Modo examen</b> (GIF)</summary>

<br>

Empezás, resolvés en papel con el reloj corriendo, entregás y te autocalificás ejercicio por ejercicio con el criterio Bien / A medias / Mal. La nota se guarda en tu navegador.

<img src="docs/readme/modo-examen.gif" alt="Modo examen: empezar, entregar y nota estimada" width="100%">

</details>

<details>
<summary><b>🧪 Laboratorio del 2º parcial</b> (GIF)</summary>

<br>

En el 2º parcial: EDO de 1º y 2º orden, exactas, Bernoulli, Green y polares (el 1º está en el siguiente bloque). La misma semilla da siempre el mismo ejercicio, así que podés pasarle el enlace a un amigo. Cada uno trae solución paso a paso.

<img src="docs/readme/laboratorio.gif" alt="Laboratorio: ejercicio generado y su solución" width="100%">

</details>

<details>
<summary><b>📝 Un parcial resuelto</b></summary>

<br>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/readme/parcial-oscuro.png">
  <img alt="Un parcial con enunciado, pista y pasos" src="docs/readme/parcial-claro.png" width="100%">
</picture>

</details>

<details>
<summary><b>❓ Preguntero</b></summary>

<br>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/readme/preguntero-oscuro.png">
  <img alt="Preguntero teórico" src="docs/readme/preguntero-claro.png" width="100%">
</picture>

</details>

<details>
<summary><b>📖 Teoría</b></summary>

<br>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/readme/teoria-oscuro.png">
  <img alt="Página de teoría con figuras" src="docs/readme/teoria-claro.png" width="100%">
</picture>

</details>

<details>
<summary><b>📱 En el celular</b></summary>

<br>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/readme/parcial-cel-oscuro.png">
    <img alt="Parcial en celular" src="docs/readme/parcial-cel-claro.png" width="30%">
  </picture>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/readme/preguntero-cel-oscuro.png">
    <img alt="Preguntero en celular" src="docs/readme/preguntero-cel-claro.png" width="30%">
  </picture>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/readme/home-cel-oscuro.png">
    <img alt="Inicio en celular" src="docs/readme/home-cel-claro.png" width="30%">
  </picture>
</p>

Diseñado para 390 px sin scroll horizontal, con tema claro y oscuro.

</details>

## Cómo usarlo

```text
0. Elegí instancia → 1º parcial (U1–U3) o 2º parcial (U4–U10)
1. Machete        → identificá el tipo de problema y su método
2. Teoría         → repasá la unidad si algo no cierra
3. Parcial        → resolvelo en papel, sin ayudas
4. Pista → Pasos  → pedí UNA pista, después destapá los pasos de a uno
5. Comprobación   → verificá tu resultado y marcá el estado del ejercicio
6. Modo examen    → la semana previa, un parcial entero con reloj
7. Preguntero     → simulacro de teoría (2 temas + 4 cortas + 3 choice)
```

> [!TIP]
> Si no sabés cómo arrancar, andá al **Laboratorio**: generás ejercicios con semilla hasta que el método te salga solo.

> [!NOTE]
> Si en un ejercicio ves un aviso de discrepancia con el profe, es que sympy y la resolución de cátedra dan distinto; ahí contrastá con tu cátedra.

> [!NOTE]
> Tu progreso se guarda **solo en tu navegador** (`localStorage`). Si cambiás de dispositivo o borrás los datos del sitio, empezás de cero.

## Temas

| Instancia | Unidad | Tema | Práctica | Teoría |
|:---:|:---:|---|:---:|:---:|
| **1º parcial** | **U1** | Funciones de varias variables, dominio | ✅ | ✅ |
| | **U2** | Derivadas direccionales, diferencial, implícita, plano tangente | ✅ | ✅ |
| | **U3** | Máximos y mínimos, Lagrange | ✅ | ✅ |
| **2º parcial** | **U4** | Integrales múltiples | ✅ | ✅ |
| | **U5** | Integrales curvilíneas, Green, potencial | ✅ | ✅ |
| | **U6** | Funciones vectoriales | alcance tentativo | ✅ |
| | **U7** | Computación numérica | sin material | sin material |
| | **U8** | EDO de 1º orden | ✅ | ✅ |
| | **U9** | EDO de orden superior | ✅ | ✅ |
| | **U10** | EDP | alcance tentativo | ✅ |

Fourier (U11) queda fuera. Programa 2025. Los escaneos del 1º parcial (119 páginas) se publican con los datos personales tapados.

## Privacidad

- Los escaneos de la cátedra se publican **con los datos personales tapados**.
- No hay cuentas, servidor ni analítica: el progreso y las notas del modo examen viven en `localStorage` con el prefijo `am2:v1:`.
- La corrección con IA **no envía nada sola**: arma un prompt que copiás o abrís en la herramienta que elijas.

## Cómo está hecho

![Astro](https://img.shields.io/badge/Astro-7-ff5d01?style=flat-square&logo=astro&logoColor=white)
![MDX](https://img.shields.io/badge/MDX-contenido-f9ac00?style=flat-square&logo=mdx&logoColor=white)
![KaTeX](https://img.shields.io/badge/KaTeX-0.19-555?style=flat-square)
![Playwright](https://img.shields.io/badge/Playwright-E2E-2ead33?style=flat-square&logo=playwright&logoColor=white)
![sympy](https://img.shields.io/badge/sympy-verificación-3b82c4?style=flat-square&logo=python&logoColor=white)
![Pages](https://img.shields.io/badge/GitHub_Pages-deploy-222?style=flat-square&logo=github&logoColor=white)

```mermaid
flowchart TD
  A[Material de la cátedra<br/>parciales 1º y 2º, teoría] --> B[Inventario<br/>docs/inventario]
  B --> C[Resolución<br/>pistas, pasos, figuras]
  C --> D{{Verificación<br/>tests/check_*.py con sympy}}
  D --> E[MDX en src/content]
  E --> F[Astro + KaTeX<br/>sitio estático]
  F --> G[Playwright + node --test]
  G --> H[GitHub Pages]
```

Sin framework de frontend: JavaScript vanilla, las fórmulas se renderizan al construir y el sitio funciona sin JS para leer el contenido (un test lo recorre con JS apagado, y otro revisa las 80 páginas en 390 px).

<details>
<summary><b>🌳 Árbol de carpetas</b></summary>

```text
.
├── src/
│   ├── content/      parciales (p1-* del 1º), anteriores, teoria, machetes, preguntas (MDX/MD)
│   ├── pages/        rutas de Astro
│   ├── components/   piezas reutilizables (ejercicio, pregunta, panel de examen)
│   ├── scripts/      examen, preguntero, progreso, IA y laboratorio (lab/: p1-*.js del 1º, el resto del 2º)
│   └── styles/
├── tests/            *.spec.mjs (Playwright) · *.test.mjs (node --test) · check_*.py (sympy)
├── scripts/          chequeo de ids, escaneos y capturas
├── docs/             inventario, estándar de soluciones, capturas y recursos del README
├── figuras/          gráficos generados con matplotlib
├── public/           favicon y escaneos con datos tapados
└── .github/          deploy a Pages y plantillas de issues
```

</details>

## Para desarrollar

**Requisitos:** Node ≥ 22.12 (el deploy usa 24). Para los chequeos de sympy: Python 3 con `sympy`.

```bash
npm install
npm run dev            # http://localhost:4321/AM2/
npm run build          # chequea ids y construye
npm run preview        # sirve el build

npx playwright install chromium   # una sola vez
npm test               # 76 tests E2E (celular, sin JS, modo examen, laboratorio, recorrido del 1º...)
npm run test:unit      # 78 tests de lógica pura
python3 tests/check_1r3.py        # un check con sympy (hay uno por examen resuelto)
```

<details>
<summary><b>➕ Cómo agregar un examen</b></summary>

1. Copiá un archivo de `src/content/parciales/` (o `anteriores/`; los del 1º llevan prefijo `p1-`) y completá el frontmatter: fecha, tipo, unidades, instancia y fuente.
2. Transcribí el enunciado tal cual y agregá el escaneo (con los datos personales tapados) a `public/`.
3. Escribí pistas, pasos, solución y criterio; cada ejercicio con un `id` único (`npm run check` lo valida).
4. Sumá `tests/check_<id>.py` que recalcule el resultado con sympy.
5. `npm run build && npm test`.

</details>

## Roadmap

- [x] Dos instancias en el sitio: 1º parcial (U1–U3) y 2º parcial (U4–U10)
- [x] 31 parciales oficiales resueltos y verificados con sympy (20 del 1º, 11 del 2º), escaneos con datos tapados
- [x] Exámenes de años anteriores resueltos (8)
- [x] Modo examen con cronómetro y autocalificación
- [x] Corrección con IA (Claude, ChatGPT, Gemini)
- [x] Preguntero U1–U10 (133 preguntas) y simulacro 2 + 4 + 3
- [x] Teoría U1–U10 con figuras
- [x] 21 machetes, con enlace desde la pista 2 de cada ejercicio del 1º
- [x] Laboratorio con 15 generadores con semilla (8 del 1º, 7 del 2º)
- [x] Home con mapa por instancia, cuenta regresiva, progreso y "seguir donde dejaste"
- [x] Sitio usable sin JS
- [ ] Material de U7 (computación numérica), hoy sin fuentes
- [ ] Revisar las lecturas de gráficos marcadas como pendientes en algunos años anteriores
- [ ] Confirmar con la cátedra las discrepancias anotadas (p. ej. 1H10 ej. 2 del 2º parcial; recuperatorio 2025 ej. 2 del 1º)
- [ ] Más generadores en el laboratorio (integrales triples, Stokes, límites dobles)

## FAQ

<details>
<summary><b>¿Es oficial?</b></summary>

No. Es un proyecto de estudio hecho por estudiantes. Los enunciados y las resoluciones escaneadas son de la cátedra; el resto está elaborado para el sitio.

</details>

<details>
<summary><b>¿Se guarda mi progreso?</b></summary>

Sí, pero solo en tu navegador. No hay cuentas ni servidor, así que no se sincroniza entre dispositivos.

</details>

<details>
<summary><b>¿Qué hago si encuentro un error en un ejercicio?</b></summary>

Abrí un [issue](https://github.com/gabibertero/AM2/issues/new/choose) con el formulario "Error en un ejercicio" indicando el examen y el ejercicio. Ver [CONTRIBUTING.md](CONTRIBUTING.md).

</details>

<details>
<summary><b>¿Por qué a veces mi resultado difiere del de la resolución oficial?</b></summary>

En unos pocos casos sympy no coincide con la resolución del profe; esos casos están anotados en cada ejercicio en lugar de corregir el original.

</details>

## Hecho con Claude

Este proyecto se construyó con [Claude Code](https://claude.com/claude-code), con revisión y criterio final de Gabi. Claude hizo:

- **Diseño:** paleta, tipografía, tema claro/oscuro, favicon, Home y auditoría estética con capturas en desktop y 390 px.
- **Código:** modo examen, corrección con IA, preguntero, progreso local, laboratorio con semilla (15 generadores) y Home con las dos instancias.
- **Contenido:** transcripción y resolución de los 31 parciales y los años anteriores, teoría U1–U10, 21 machetes con figuras y 133 preguntas.
- **Verificación:** un script de sympy por examen resuelto (33 checks), auditorías didácticas y code review.
- **Tests:** Playwright (E2E, celular, sin JS) y `node --test`.

Agentes que intervinieron: `resolvedor`, `web`, `disenador`, `estetica`, `profe`, `verificador`, `redactor`, `graficos`, `tester`, `readme` y `ecc:code-reviewer`. Auditorías de `profe`: parciales 91–95, preguntero 96, teoría 93; en la etapa del 1º parcial, preguntero 92, teoría 94, machetes 80 y laboratorio 74 (corregido hasta ≥ 90 según `estetica`, `tester` y `ecc:code-reviewer`).

En la etapa del 1º parcial: `resolvedor` resolvió y verificó con sympy los 20 parciales, `web` programó el laboratorio y el sitio usable sin JS, `disenador` armó el Home con las dos instancias, `profe` auditó teoría, preguntero, machetes y laboratorio, `estetica` auditó con capturas (77 → 82), `tester` escribió el test de recorrido del 1º, `ecc:code-reviewer` revisó el código y `readme` actualizó este documento.

Los commits llevan `Co-Authored-By: Claude`, por eso Claude figura en Contributors.

## Créditos y licencia

- Enunciados y resoluciones: cátedra de Análisis Matemático II, UTN FRC.
- Sitio, contenido elaborado y código: Gabi, con Claude.
- Cambios y errores: ver [CHANGELOG.md](CHANGELOG.md) y [CONTRIBUTING.md](CONTRIBUTING.md).
- Licencia: pendiente de definir. Mientras tanto, el material de la cátedra pertenece a sus autores.

<div align="center">

<br>

### Made by Claudio 🧉

<sub>Por estudiantes, para estudiantes. Hecho con [Claude Code](https://claude.com/claude-code).</sub>

</div>
