# AM II · práctico, paso a paso

Preparación del segundo parcial práctico de Análisis Matemático II, UTN FRC. El recorrido empieza por el examen del curso del 31/10/2026, Tema A, y continúa del más reciente al más viejo.

## Qué tiene esta versión

- Portada con plan de estudio para el 7/11/2026, adaptado a empezar desde cero.
- 12 parciales prácticos P2; el último incorpora cinco ejercicios con pistas, micro pasos, dibujos y comprobaciones.
- 12 machetes prácticos: reconocimiento, receta, ejemplo resuelto, errores y reintento sin mirar.
- Simulacro de 120 minutos con ayudas ocultas y autoevaluación, sin atribuirle una nota oficial.
- Registro independiente de autonomía: con ayuda, necesito repetir, lo hice solo; notas personales y cola de reintentos.
- Nuevo diseño tinta, superficies claras y acento mandarina; adaptación al celular, modo oscuro e impresión.

Las transcripciones son oficiales; las explicaciones y soluciones añadidas son material de estudio no oficial. El nuevo examen se recibió solo como enunciado: no se inventó una resolución del profesor. La orientación del ejercicio de curvilínea no está indicada en la foto; se explica la convención adoptada.

El recorrido visible se centra en el práctico. No se agregó teoría. El contenido anterior conserva sus direcciones.

## Abrir localmente

```sh
npm install
npm run dev
```

Abrir `http://localhost:4321/AM2/`. El proyecto usa Astro, MDX y KaTeX y mantiene la base `/AM2/` de GitHub Pages.

## Verificar

```sh
npm run build
npm run test:unit
python3 tests/check_1h10_2026.py
npx playwright test tests/p2-preparacion.spec.mjs tests/progreso.spec.mjs tests/examen.spec.mjs tests/navegacion.spec.mjs tests/sitio.spec.mjs
```

Los tests históricos que esperan la portada general de ambos parciales describen el diseño anterior; la validación del nuevo recorrido está en `tests/p2-preparacion.spec.mjs`.

## Fuentes, progreso y privacidad

Los originales se conservan fuera del repositorio. La foto nueva completa no se publica porque contiene datos personales parcialmente tapados; se usan transcripción académica y gráficos propios. El progreso anterior sigue bajo `am2:v1:estado:` y `am2:v1:vista:`. El registro nuevo usa `am2:v1:aprendizaje:` sin borrar claves anteriores. Todo permanece en el navegador, sin sincronización entre dispositivos.

La organización de la carpeta local está registrada con origen, destino y SHA256 en `docs/organizacion-materiales.json`. Los movimientos pueden deshacerse y se verificó que los archivos conservan su contenido.

Revisiones independientes: `docs/revision/P2-redisenio-matematica.md`, `P2-redisenio-code-review.md`, `P2-redisenio-visual.md` y `P2-redisenio-privacidad.md`.
