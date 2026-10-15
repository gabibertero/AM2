# Contribuir

Gracias por ayudar a mejorar el sitio.

## Reportar un error en un ejercicio

Abrí un issue con el formulario **Error en un ejercicio** e incluí:

- el examen (por ejemplo `1r3-2025-11-14`) y el número de ejercicio;
- la página del sitio (URL) o el archivo de `src/content/`;
- qué ves y qué esperabas, con tu cuenta si podés.

Si es un error de transcripción, comparalo con el escaneo del examen antes de reportarlo.

## Correr los tests

```bash
npm install
npx playwright install chromium   # una sola vez
npm run build
npm test                          # E2E
npm run test:unit                 # lógica pura
python3 tests/check_1r3.py        # sympy (requiere `pip install sympy`)
```

## Pull requests

- Un cambio por PR, con el build y los tests en verde.
- No subas escaneos con datos personales (nombres, legajos, firmas).
- Los enunciados oficiales van tal cual; lo elaborado para el sitio se mantiene separado.
