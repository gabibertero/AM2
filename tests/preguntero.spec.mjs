import { test, expect } from '@playwright/test';

const vistas = { desktop: { width: 1280, height: 800 }, celular: { width: 390, height: 844 } };
const sinScrollH = async (page) => expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

for (const [nombre, viewport] of Object.entries(vistas)) {
  test.describe(nombre, () => {
    test.use({ viewport });

    test('preguntero: filtros, marcas persistentes y choice', async ({ page }) => {
      const problemas = [];
      page.on('pageerror', (e) => problemas.push(e.message));
      await page.goto('preguntero/');
      await expect(page.locator('nav a[href$="/preguntero/"]')).toHaveAttribute('aria-current', 'page');
      const arts = page.locator('[data-preguntero] [data-pregunta]');
      expect(await arts.count()).toBeGreaterThanOrEqual(3);

      await page.locator('[data-filtro="tipo"][data-valor="choice"]').click();
      await expect(page.locator('[data-pregunta][data-tipo="corta"]')).toBeHidden();
      await expect(page.locator('[data-pregunta][data-tipo="choice"]').first()).toBeVisible();
      await page.locator('[data-filtro="unidad"][data-valor="U5"]').click(); // U5 sin preguntas
      await expect(page.locator('[data-vacio]')).toBeVisible();
      await page.locator('[data-filtro="unidad"][data-valor="todas"]').click();

      // choice: marca correcta/incorrecta y abre el por qué
      const ch = page.locator('[data-pregunta][data-tipo="choice"]').first();
      await ch.locator('.op').nth(0).click();
      await expect(ch.locator('[data-fb]')).toContainText('Incorrecta');
      await expect(ch.locator('.op[data-res="ok"]')).toHaveCount(1);
      await ch.locator('.op').nth(Number(await ch.getAttribute('data-correcta')) - 1).click();
      await expect(ch.locator('[data-fb]')).toHaveText('Correcta.');

      // marcar "dudosa" persiste con el prefijo y el filtro de marca la encuentra
      await page.locator('[data-filtro="tipo"][data-valor="todas"]').click();
      const t = page.locator('[data-pregunta][data-tipo="tema"]').first();
      const id = await t.getAttribute('data-id');
      await t.getByRole('button', { name: '? Dudosa' }).click();
      await expect(t.getByRole('button', { name: '? Dudosa' })).toHaveAttribute('aria-pressed', 'true');
      await page.reload();
      await expect(page.locator(`[data-id="${id}"]`).getByRole('button', { name: '? Dudosa' })).toHaveAttribute('aria-pressed', 'true');
      expect(await page.evaluate(() => Object.keys(localStorage))).toContain('am2:v1:preg:' + id);
      await page.locator('[data-filtro="marca"][data-valor="repasar"]').click();
      await expect(arts.filter({ visible: true })).toHaveCount(1);

      // revelar respuesta + IA corregir en tema
      await page.locator('[data-filtro="marca"][data-valor="todas"]').click();
      await t.locator('.preg-resp > summary').click();
      await expect(t.locator('.resp')).toBeVisible();
      await expect(t.locator('.ia-menu summary')).toContainText('Corregir con IA');
      await expect(ch.locator('.ia-menu summary')).toContainText('Explicámelo');
      await sinScrollH(page);
      expect(problemas).toEqual([]);
    });

    test('simulacro: arma, entrega y corrige las choice', async ({ page }) => {
      await page.goto('preguntero/simulacro/?semilla=7');
      await page.locator('[data-armar]').click();
      await expect(page.locator('[data-sim-lista] [data-tipo]')).not.toHaveCount(0);
      await expect(page.locator('[data-sim-info]')).toContainText('semilla 7');
      await expect(page.locator('[data-sim-lista] .preg-resp').first()).toBeHidden(); // sin respuesta antes de entregar
      await sinScrollH(page);
      const ch = page.locator('[data-sim-lista] [data-tipo="choice"]').first();
      await ch.locator('.op').nth(Number(await ch.getAttribute('data-correcta')) - 1).click();
      await expect(ch.locator('[data-fb]')).toHaveText(''); // sin feedback hasta entregar
      await page.locator('[data-entregar]').click();
      await expect(page.locator('[data-sim-res]')).toContainText('1 de');
      await expect(ch.locator('.op[data-res="ok"] input')).toBeChecked();
      await expect(page.locator('[data-sim-lista] .resp').first()).toBeVisible();
      await expect(page.locator('[data-sim-lista] .ia-menu summary').first()).toBeVisible();
      await sinScrollH(page);
    });

    test('simulacro: cronómetro corre y se puede rearmar', async ({ page }) => {
      await page.goto('preguntero/simulacro/');
      await page.locator('[data-crono]').check();
      await page.locator('[data-minutos]').fill('5');
      await page.locator('[data-armar]').click();
      await expect(page.locator('[data-reloj]')).toHaveText(/^0[45]:\d\d$/);
      await page.locator('[data-armar]').click();
      await expect(page.locator('[data-sim-lista] section')).not.toHaveCount(0);
    });
  });
}

test.describe('sin JS', () => {
  test.use({ javaScriptEnabled: false });
  test('el contenido se ve y los controles JS no', async ({ page }) => {
    await page.goto('preguntero/');
    await expect(page.locator('[data-pregunta]').first()).toBeVisible();
    await expect(page.locator('.pf')).toBeHidden();
    await expect(page.locator('[data-tipo="choice"] .preg-ops li').first()).toBeVisible();
    await page.goto('preguntero/simulacro/');
    await expect(page.locator('[data-pool] [data-pregunta]').first()).toBeVisible();
    await expect(page.locator('[data-armar]')).toBeHidden();
  });
});

test('teoría enlaza al preguntero', async ({ page }) => {
  await page.goto('teoria/');
  await page.getByRole('link', { name: /preguntero teórico/i }).click();
  await expect(page.locator('h1')).toHaveText('Preguntero teórico');
});
