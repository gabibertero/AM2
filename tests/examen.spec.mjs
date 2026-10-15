import { test, expect } from '@playwright/test';

const ID = '1r3-2025-11-14';
const RUTAS = [`parciales/${ID}/`, 'anteriores/'];
const ej = (page, n) => page.locator(`[data-id="${ID}#${n}"]`);
const sinScrollH = (page) => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
const entrar = async (page) => {
  await page.goto(RUTAS[0]);
  await page.getByRole('button', { name: 'Rendir como examen' }).click();
  await page.getByRole('button', { name: 'Empezar' }).click();
};

test('modo examen: oculta ayudas, entregar las revela y la nota se guarda', async ({ page }) => {
  await page.goto(RUTAS[0]);
  await ej(page, 1).getByLabel('En curso').check(); // progreso previo que no se debe tocar
  await entrar(page);
  await expect(page.locator('[data-ex="reloj"]')).toHaveText('120:00');
  await expect(ej(page, 1).locator('[data-solucion]').first()).toBeHidden();
  await expect(ej(page, 1).locator('[data-paso]').first()).toBeHidden();
  await expect(ej(page, 1).locator('[data-pista]').first()).toBeHidden();
  await expect(ej(page, 1).getByRole('button', { name: 'Ver pista' })).toBeHidden();
  await expect(ej(page, 1).locator('.ia')).toBeHidden();
  await expect(ej(page, 1).locator('h2')).toBeVisible();

  await page.getByRole('button', { name: 'Entregar' }).click();
  await expect(ej(page, 1).locator('[data-solucion]').first()).toBeVisible();
  await expect(ej(page, 1).locator('.ia')).toBeVisible();
  const n = await page.locator('[data-ejercicio]').count();
  await ej(page, 1).getByRole('button', { name: 'Bien', exact: true }).click();
  await expect(page.locator('[data-ex="nota"]')).toHaveText(String(Math.round(1000 / n) / 10));
  await ej(page, 2).getByRole('button', { name: 'A medias' }).click();

  await page.reload();
  await expect(page.locator('[data-ex="ultimo"]')).toContainText('/100');
  await expect(ej(page, 1).getByLabel('En curso')).toBeChecked(); // progreso intacto
  const claves = await page.evaluate(() => Object.keys(localStorage));
  expect(claves).toContain(`am2:v1:examen:${ID}`);
  expect(claves.every((k) => k.startsWith('am2:v1:'))).toBe(true);
});

test('modo examen: pausa y salir restaura la vista normal', async ({ page }) => {
  await entrar(page);
  await page.getByRole('button', { name: 'Pausar' }).click();
  await expect(page.getByRole('button', { name: 'Reanudar' })).toBeVisible();
  await page.getByRole('button', { name: 'Salir del modo examen' }).click();
  await expect(ej(page, 1).getByRole('button', { name: 'Ver solución completa' })).toBeVisible();
  await expect(page.locator('body')).not.toHaveAttribute('data-examen', /.*/);
});

test('modo examen: storage roto no rompe nada', async ({ page }) => {
  await page.addInitScript(() => {
    const falla = () => { throw new Error('storage roto'); };
    Storage.prototype.getItem = falla; Storage.prototype.setItem = falla; Storage.prototype.removeItem = falla;
  });
  await entrar(page);
  await page.getByRole('button', { name: 'Entregar' }).click();
  await ej(page, 1).getByRole('button', { name: 'Bien', exact: true }).click();
  await expect(page.locator('[data-ex="nota"]')).not.toBeEmpty();
});

test('anteriores: también tiene modo examen', async ({ page }) => {
  await page.goto('anteriores/');
  const href = await page.locator('main a[href*="/anteriores/"]:not([href$="/anteriores/"])').first().getAttribute('href');
  await page.goto(href);
  await page.getByRole('button', { name: 'Rendir como examen' }).click();
  await page.getByRole('button', { name: 'Empezar' }).click();
  await expect(page.locator('[data-ex="reloj"]')).toHaveText('120:00');
});

test('IA: copia el prompt con enunciado, modelo y respuesta, y abre la URL de cada destino', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto(RUTAS[0]);
  const e = ej(page, 1);
  await e.getByLabel('Tu respuesta').fill('Mi intento de resolución');
  await e.locator('.ia-menu summary').click();
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    e.getByRole('button', { name: 'Claude', exact: true }).click(),
  ]);
  expect(popup.url()).toContain('claude.ai/new?q=');
  const q = decodeURIComponent(new URL(popup.url()).searchParams.get('q'));
  expect(q).toContain('Análisis Matemático II');
  expect(q).toContain('Mi intento de resolución');
  expect(q).toMatch(/Consigna:/);
  expect(q).toMatch(/Respuesta modelo/);
  await popup.close();
  await expect(e.locator('[data-ia-aviso]')).toContainText('Claude');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(q);

  await e.locator('.ia-menu summary').click();
  const [g] = await Promise.all([page.waitForEvent('popup'), e.getByRole('button', { name: 'Gemini' }).click()]);
  expect(g.url()).toContain('gemini.google.com');
  await expect(e.locator('[data-ia-aviso]')).toContainText('pegá');
  await g.close();

  await e.locator('.ia-menu summary').click();
  await e.getByRole('button', { name: 'Solo copiar el prompt' }).click();
  await expect(e.locator('[data-ia-aviso]')).toContainText('copiado');
});

test('sin JS se ve todo y no hay controles inútiles', async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await ctx.newPage();
  await page.goto(RUTAS[0]);
  await expect(page.locator('[data-examen-panel]')).toBeHidden();
  await expect(page.locator('.ia-menu').first()).toBeHidden();
  await expect(ej(page, 1).locator('h2')).toBeVisible();
  await ctx.close();
});

test.describe('390px', () => {
  test.use({ viewport: { width: 390, height: 800 } });
  test('sin scroll horizontal en reposo, rindiendo y entregado', async ({ page }) => {
    await page.goto(RUTAS[0]);
    expect(await sinScrollH(page)).toBe(true);
    await entrar(page);
    expect(await sinScrollH(page)).toBe(true);
    await page.getByRole('button', { name: 'Entregar' }).click();
    expect(await sinScrollH(page)).toBe(true);
    await ej(page, 1).locator('.ia-menu summary').click();
    expect(await sinScrollH(page)).toBe(true);
  });
});
