import { test, expect } from '@playwright/test';

for (const [nombre, viewport] of Object.entries({ desktop: { width: 1280, height: 800 }, celular: { width: 390, height: 844 } })) {
  test.describe(nombre, () => {
    test.use({ viewport });
    const sinScrollH = async (page) => expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

    test('Home: dos instancias con contenido, final a confirmar', async ({ page }) => {
      await page.goto('');
      await expect(page.locator('h1')).toHaveText('Análisis Matemático II');
      await expect(page.locator('.inst-home')).toHaveCount(2);
      await expect(page.locator('[data-instancia="p1"] .mapa-u')).toHaveCount(3);
      await expect(page.locator('[data-instancia="p2"] .mapa-u')).toHaveCount(7);
      await expect(page.locator('[data-instancia="p1"] .mapa-u a').first()).toBeVisible();
      await expect(page.locator('[data-final]')).toContainText('fecha a confirmar');
      await expect(page.locator('[data-dias-txt]')).toContainText('2º parcial');
      await sinScrollH(page);
    });

    test('índices agrupados por instancia (p1 y p2)', async ({ page }) => {
      for (const ruta of ['parciales/', 'anteriores/', 'machetes/', 'teoria/', 'laboratorio/']) {
        await page.goto(ruta);
        // p1 se va llenando por etapas: alcanza con que su bloque exista (con contenido o "Próximamente")
        await expect(page.locator('section.inst[data-instancia="p1"]'), ruta).toBeVisible();
        await expect(page.locator('section.inst[data-instancia="p2"] a, section.inst[data-instancia="p2"] li').first(), ruta).toBeVisible();
        await sinScrollH(page);
      }
    });

    test('preguntero: filtro de instancia', async ({ page }) => {
      await page.goto('preguntero/');
      await page.locator('[data-filtro="instancia"][data-valor="p1"]').click();
      await expect(page.locator('[data-pregunta][data-unidad="U4"]:visible')).toHaveCount(0);
      await expect(page.locator('[data-pregunta]:visible').first()).toBeVisible();
      await page.locator('[data-filtro="instancia"][data-valor="p2"]').click();
      await expect(page.locator('[data-pregunta]:visible').first()).toBeVisible();
    });

    test('simulacro: elegir instancia', async ({ page }) => {
      await page.goto('preguntero/simulacro/?semilla=7');
      await page.locator('[data-instancia-sel]').selectOption('p1');
      await page.locator('[data-armar]').click();
      await expect(page.locator('[data-sim-lista] [data-tipo]').first()).toBeVisible();
      await page.locator('[data-instancia-sel]').selectOption('p2');
      await page.locator('[data-armar]').click();
      await expect(page.locator('[data-sim-lista] [data-tipo]').first()).toBeVisible();
    });
  });
}

test('URLs existentes siguen vivas', async ({ request }) => {
  for (const r of ['parciales/', 'teoria/u05/', 'machetes/', 'anteriores/']) expect((await request.get(r)).status(), r).toBe(200);
});
