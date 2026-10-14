// Saca las capturas del README. Requiere `npm run build` antes y chromium de Playwright.
import { execSync, spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const PORT = 4321;
const BASE = `http://localhost:${PORT}/AM2/`;
const OUT = fileURLToPath(new URL('../docs/capturas/', import.meta.url));

const responde = () => fetch(BASE).then((r) => r.ok, () => false);
// astro 7 reusa un preview ya corriendo en el puerto: capturaríamos un build viejo
if (await responde()) { console.error(`Ya hay un servidor en el puerto ${PORT}: cerralo y reintentá.`); process.exit(1); }

// detached: el grupo de procesos entero se mata al final (npx/astro dejan hijos)
const srv = spawn('node_modules/.bin/astro', ['preview', '--ignore-lock', '--port', String(PORT)], { stdio: 'ignore', detached: true });
srv.on('error', (e) => { console.error('no se pudo lanzar astro preview:', e.message); process.exit(1); });
let browser;
try {
  let listo = false;
  for (let i = 0; i < 60 && !(listo = await responde()); i++) await new Promise((r) => setTimeout(r, 500));
  if (!listo) throw new Error('preview no levantó');
  browser = await chromium.launch();
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
} finally {
  await browser?.close();
  try { process.kill(-srv.pid); } catch {}
  // astro 7 lanza el servidor real en otro grupo de procesos: matar también al que escucha el puerto
  try { execSync(`kill $(lsof -ti tcp:${PORT} -sTCP:LISTEN)`, { stdio: 'ignore' }); } catch {}
}
