import { test, expect } from '@playwright/test';

// cada link del nav, en desktop y en celular, sin errores de consola ni recursos >= 400
const vistas = { desktop: { width: 1280, height: 800 }, celular: { width: 375, height: 812 } };

for (const [nombre, viewport] of Object.entries(vistas)) {
  test(`navegación por el nav (${nombre})`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const problemas = [];
    page.on('console', (m) => m.type() === 'error' && problemas.push(`consola: ${m.text()}`));
    page.on('pageerror', (e) => problemas.push(`pageerror: ${e.message}`));
    page.on('response', (r) => r.status() >= 400 && problemas.push(`${r.status()} ${r.url()}`));

    await page.goto('');
    const hrefs = await page.locator('nav a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(hrefs.length).toBeGreaterThanOrEqual(6);
    expect(hrefs.some((h) => h.endsWith('/anteriores/'))).toBe(true);

    const visitar = async (href) => {
      const r = await page.goto(href, { waitUntil: 'networkidle' });
      expect(r.status(), href).toBeLessThan(400);
      await expect(page.locator('h1').first(), href).toBeVisible();
    };
    for (const href of hrefs) await visitar(href);
    // una página de teoría y una de machete, que el nav no linkea directo
    for (const lista of ['teoria/', 'machetes/']) {
      await page.goto(lista);
      await visitar(await page.locator('main li a').first().getAttribute('href'));
    }
    expect(problemas).toEqual([]);
  });
}
