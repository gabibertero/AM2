import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

// Recorre el build (SITE_DIR, por defecto dist/) y prueba TODAS las páginas.
const DIR = process.env.SITE_DIR || 'dist';
const paginas = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html') paginas.push(path.relative(DIR, path.dirname(p)).split(path.sep).join('/') + (path.dirname(p) === DIR ? '' : '/'));
  }
})(DIR);

test.setTimeout(240_000);

test('todas las páginas: sin errores de consola, sin KaTeX roto, sin 4xx, un h1, imgs con alt, links internos 200', async ({ page, request, baseURL }) => {
  expect(paginas.length).toBeGreaterThan(30);
  const problemas = [];
  const links = new Set();
  page.on('console', (m) => m.type() === 'error' && problemas.push(`consola: ${m.text()} @${page.url()}`));
  page.on('pageerror', (e) => problemas.push(`pageerror: ${e.message} @${page.url()}`));
  page.on('response', (r) => r.status() >= 400 && problemas.push(`${r.status()} ${r.url()}`));
  for (const ruta of paginas) {
    await page.goto(ruta, { waitUntil: 'networkidle' });
    if ((await page.locator('h1').count()) !== 1) problemas.push(`h1 != 1 en ${ruta}`);
    if (await page.locator('.katex-error').count()) problemas.push(`katex-error en ${ruta}`);
    if (await page.locator('img:not([alt])').count()) problemas.push(`img sin alt en ${ruta}`);
    if (await page.locator('main').count() !== 1) problemas.push(`main != 1 en ${ruta}`);
    const rotas = await page.evaluate(() => [...document.images].filter((i) => !i.naturalWidth && i.loading !== 'lazy').map((i) => i.src));
    rotas.forEach((s) => problemas.push(`imagen rota ${s} en ${ruta}`));
    const sinLabel = await page.locator('input:not([type=hidden]):not([type=submit]), select, textarea').evaluateAll((els) =>
      els.filter((e) => !e.labels?.length && !e.getAttribute('aria-label') && !e.getAttribute('aria-labelledby') && !e.closest('label')).map((e) => e.outerHTML.slice(0, 80)));
    sinLabel.forEach((s) => problemas.push(`input sin label ${s} en ${ruta}`));
    const hrefs = await page.locator('a[href]').evaluateAll((as) => as.map((a) => a.href));
    hrefs.filter((h) => h.startsWith(new URL(baseURL).origin)).forEach((h) => links.add(h.split('#')[0]));
  }
  for (const l of links) {
    const r = await request.get(l);
    if (r.status() !== 200) problemas.push(`link ${r.status()} ${l}`);
  }
  expect(problemas).toEqual([]);
});

for (const esquema of ['light', 'dark']) {
  test(`390px sin scroll horizontal en todas las páginas (${esquema})`, async ({ browser, baseURL }) => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: esquema, baseURL });
    const page = await ctx.newPage();
    const malas = [];
    for (const ruta of paginas) {
      await page.goto(ruta, { waitUntil: 'networkidle' });
      const d = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      if (d > 0) malas.push(`${ruta} (+${d}px)`);
    }
    await ctx.close();
    expect(malas).toEqual([]);
  });
}

test('sin JS: todas las páginas muestran contenido', async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await ctx.newPage();
  const malas = [];
  for (const ruta of paginas) {
    await page.goto(ruta);
    if (!(await page.locator('h1').first().isVisible())) malas.push(`${ruta}: h1 no visible`);
    if (((await page.locator('main').innerText()).length) < 80) malas.push(`${ruta}: casi vacía`);
  }
  await ctx.close();
  expect(malas).toEqual([]);
});

test('localStorage roto: ninguna página tira pageerror', async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ baseURL });
  await ctx.addInitScript(() => {
    const roto = { get() { throw new DOMException('blocked', 'SecurityError'); } };
    Object.defineProperty(window, 'localStorage', roto);
  });
  const page = await ctx.newPage();
  const malas = [];
  page.on('pageerror', (e) => malas.push(`${e.message} @${page.url()}`));
  for (const ruta of paginas) await page.goto(ruta, { waitUntil: 'networkidle' });
  await ctx.close();
  expect(malas).toEqual([]);
});
