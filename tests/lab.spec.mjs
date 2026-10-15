import { test, expect } from '@playwright/test';

const vistas = { desktop: { width: 1280, height: 800 }, celular: { width: 390, height: 844 } };
const sinScrollH = async (page) => expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

for (const [nombre, viewport] of Object.entries(vistas)) {
  test.describe(nombre, () => {
    test.use({ viewport });

    test('laboratorio: carga, KaTeX, semilla reproducible, otro, solución e IA', async ({ page }) => {
      const problemas = [];
      page.on('pageerror', (e) => problemas.push(e.message));
      page.on('console', (m) => m.type() === 'error' && problemas.push(m.text()));
      await page.goto('laboratorio/?tipo=lineal&semilla=123');
      await expect(page.locator('nav a[href$="/laboratorio/"]')).toHaveAttribute('aria-current', 'page');
      const enun = page.locator('[data-enunciado]');
      await expect(enun.locator('.katex').first()).toBeVisible();
      const texto = await enun.innerText();
      await expect(page.locator('#lab-semilla')).toHaveValue('123');

      await page.reload(); // misma semilla = mismo ejercicio
      expect(await page.locator('[data-enunciado]').innerText()).toBe(texto);

      const url0 = page.url();
      await page.getByRole('button', { name: 'Otro ejercicio' }).click();
      expect(page.url()).not.toBe(url0);
      expect(await page.locator('#lab-semilla').inputValue()).not.toBe('123');

      // semilla escrita a mano y semilla inválida
      await page.locator('#lab-semilla').fill('123');
      await page.getByRole('button', { name: 'Cargar' }).click();
      expect(await page.locator('[data-enunciado]').innerText()).toBe(texto);
      await page.locator('#lab-semilla').fill('abc');
      await page.getByRole('button', { name: 'Cargar' }).click();
      await expect(page.getByRole('status').filter({ hasText: 'semilla' })).toBeVisible();

      // solución oculta hasta pedirla
      const ver = page.locator('[data-ver]');
      await expect(page.locator('[data-solucion]')).toBeHidden();
      await ver.click();
      await expect(ver).toHaveAttribute('aria-expanded', 'true');
      await expect(page.locator('[data-solucion] .katex').first()).toBeVisible();
      await expect(page.locator('[data-solucion]')).toContainText('Resultado');
      await sinScrollH(page);

      // IA: "Tu respuesta" y menú visibles
      await expect(page.locator('[data-ia-mia]')).toBeVisible();
      await page.locator('summary[aria-label*="Corregir con IA"]').click();
      await expect(page.getByRole('button', { name: 'Solo copiar el prompt' })).toBeVisible();
      expect(problemas).toEqual([]);
    });

    test('laboratorio: "otro" cambia el ejercicio y cada generador entra en pantalla', async ({ page }) => {
      const problemas = [];
      page.on('pageerror', (e) => problemas.push(e.message));
      page.on('console', (m) => m.type() === 'error' && problemas.push(m.text()));
      await page.goto('laboratorio/?tipo=polares&semilla=5');
      const ids = await page.locator('#lab-tipo option').evaluateAll((os) => os.map((o) => o.value));
      expect(ids.length).toBe(7);
      for (const id of ids) {
        await page.locator('#lab-tipo').selectOption(id);
        await page.locator('[data-ver]').click();
        await expect(page.locator('[data-solucion] .katex').first()).toBeVisible();
        expect(await page.locator('.katex-error').count()).toBe(0);
        await sinScrollH(page);
      }
      // en 10 clics sobre un generador con mucha variedad, el enunciado cambia
      await page.locator('#lab-tipo').selectOption('green');
      const a = await page.locator('[data-enunciado]').innerText();
      let cambio = false;
      for (let i = 0; i < 10 && !cambio; i++) {
        await page.getByRole('button', { name: 'Otro ejercicio' }).click();
        cambio = (await page.locator('[data-enunciado]').innerText()) !== a;
      }
      expect(cambio).toBe(true);
      expect(problemas).toEqual([]);
    });
  });
}

test('laboratorio sin JS: se ve la lista de tipos y no hay controles rotos', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto('laboratorio/');
  await expect(page.locator('.lab-lista li').first()).toBeVisible();
  await expect(page.locator('[data-lab]')).toBeHidden();
  await sinScrollH(page);
  await ctx.close();
});

test('el Home enlaza al laboratorio', async ({ page }) => {
  await page.goto('');
  await page.locator('.accesos a[href$="/laboratorio/"]').click();
  await expect(page.getByRole('heading', { level: 1, name: 'Laboratorio' })).toBeVisible();
});
