// Saca las capturas del README. Requiere `npm run build` antes y chromium de Playwright.
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const PORT = 4321;
const BASE = `http://localhost:${PORT}/AM2/`;
const OUT = fileURLToPath(new URL('../docs/capturas/', import.meta.url));

// astro 7 reusa el preview si ya hay uno corriendo en el puerto
const srv = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { stdio: 'ignore' });
try {
  for (let i = 0; i < 60; i++) {
    if (await fetch(BASE).then(r => r.ok, () => false)) break;
    await new Promise(r => setTimeout(r, 500));
  }
  const browser = await chromium.launch();
  const toma = async (viewport, nombre, ruta, pista = false) => {
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    await page.goto(BASE + ruta, { waitUntil: 'networkidle' });
    if (pista) await page.locator('[data-accion="pista"]').first().click();
    await page.screenshot({ path: `${OUT}${nombre}.png` });
    await ctx.close();
  };
  const d = { width: 1280, height: 800 }, c = { width: 390, height: 844 };
  await toma(d, 'inicio-desktop', '');
  await toma(d, 'examen-desktop', 'parciales/1r3-2025-11-14/', true);
  await toma(d, 'parciales-desktop', 'parciales/');
  await toma(c, 'inicio-celular', '');
  await toma(c, 'examen-celular', 'parciales/1r3-2025-11-14/', true);
  await browser.close();
} finally {
  srv.kill();
}
