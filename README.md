# AM II — sitio de estudio para el 2º parcial

Sitio estático para practicar el segundo parcial de Análisis Matemático II (UTN FRC, Ing. en Sistemas) con exámenes reales: cada ejercicio muestra el enunciado oficial y esconde pistas, pasos y solución para ir descubriéndolos de a uno. Lo usan Gabi y algunos amigos. Alcance: unidades U4 a U10 (ver `SPEC.md`).

## Requisitos

- Node.js 20 o más nuevo (probado con v26.11.1) y npm.
- Probado con Astro 7.3.8, KaTeX 0.19.0 y Playwright 1.64.0.

## Correr en local

Desde esta carpeta (`AM II/github`):

```bash
npm install
npm run dev
```

Abrí <http://localhost:4321/AM2/>. Tenés que ver la página de Inicio con el menú (Inicio · Parciales oficiales · Teoría · Machetes · Simulacros generados). En "Parciales oficiales" está el examen de prueba 1R3, con sus 5 ejercicios.

## Build y vista previa

```bash
npm run build
npm run preview
```

## Tests

La primera vez hay que bajar el navegador de pruebas:

```bash
npx playwright install chromium
```

Después:

```bash
npm run check   # ids de ejercicio sin duplicados y con fuente/página
npm test        # Playwright: construye el sitio, lo sirve y prueba el progreso
```

## Publicar gratis en GitHub Pages

1. Creá en GitHub un repositorio público llamado `AM2`.
2. Subí este proyecto:
   ```bash
   git add .
   git commit -m "Sitio AM II"
   git branch -M main
   git remote add origin https://github.com/gabibertero/AM2.git
   git push -u origin main
   ```
3. En GitHub: Settings → Pages → Source: **GitHub Actions**.
4. El workflow `.github/workflows/deploy.yml` construye y publica solo. El sitio queda en <https://gabibertero.github.io/AM2/>.

Si cambiás el nombre del repo o el usuario, actualizá `site` y `base` en `astro.config.mjs`.

## Actualizar

Editá o agregá archivos, y después:

```bash
git add .
git commit -m "Describí el cambio"
git push
```

GitHub Pages se vuelve a publicar solo. El progreso de cada persona no se toca.

## Dónde se guarda el progreso

En el navegador de cada persona (localStorage), con claves que empiezan con `am2:v1:`. No hay cuentas ni servidor, así que no pasa de un dispositivo a otro. Para borrarlo: botón "Reiniciar progreso" en Inicio (pide confirmación en la página y borra solo claves `am2:v1:`), o borrar los datos del sitio en el navegador.

## Cómo se organizan los exámenes

- Un archivo `.mdx` por examen en `src/content/parciales/`, con sus datos (comisión, fecha, fuente, páginas) en el encabezado.
- Cada ejercicio tiene un id fijo `<comision>-<fecha>#<n>` (ej. `1r3-2025-11-14#1`), archivo de origen y página.
- Teoría y machetes: `src/content/teoria/` y `src/content/machetes/`.
- Lo oficial se distingue por capas visuales:
  - **Azul — Oficial**: enunciado tal cual la fuente y resolución del profe.
  - **Verde — Elaborado para el sitio, no oficial**: pistas, pasos, solución, comprobación.
  - **Ámbar punteado — Simulacro generado, no oficial**: solo si Gabi lo pide.
- Los PDFs originales viven en la carpeta de la materia (`../`) y no se modifican.
