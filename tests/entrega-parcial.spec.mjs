import { test, expect } from '@playwright/test';
const examen = 'parciales/1h10-2026-10-31-a/';

test('explicar abre solo el primer paso y entregar comprueba resultados', async ({ page }) => {
  await page.goto(examen);
  const exercise = page.locator('#ej-1');
  await exercise.getByRole('button', { name: 'Explicame paso a paso' }).click();
  await expect(exercise.locator('[data-paso]').first()).toBeVisible();
  await expect(exercise.locator('[data-paso]').nth(1)).toBeHidden();
  await expect(exercise.getByRole('button', { name: 'Siguiente paso' })).toBeEnabled();

  const entrega = page.locator('[data-entrega-parcial]');
  await entrega.getByLabel('Volumen V', { exact: true }).fill('62.5*pi');
  await entrega.getByLabel('Valor de la integral triple', { exact: true }).fill('16*pi');
  await entrega.getByLabel('Integral por definici\u00f3n', { exact: true }).fill('9');
  await entrega.getByRole('button', { name: 'Entregar', exact: true }).click();
  await expect(entrega.locator('[data-result=correct]')).toHaveCount(2);
  await expect(entrega.locator('[data-result=incorrect]')).toHaveCount(1);
  await expect(entrega.locator('[data-result=empty]')).toHaveCount(3);

  await page.reload();
  await expect(entrega.getByLabel('Volumen V', { exact: true })).toHaveValue('62.5*pi');
});

test('una entrega al final del simulacro detiene el reloj y comprueba la cuenta', async ({ page }) => {
  await page.goto(examen);
  await page.getByRole('button', { name: 'Rendir como examen' }).click();
  await page.getByRole('button', { name: 'Empezar', exact: true }).click();
  await expect(page.locator('#ej-1 [data-accion=paso]')).toBeHidden();
  await expect(page.getByRole('link', { name: 'Ir a la entrega \u2193' })).toBeVisible();

  await page.locator('#entrega-parcial').getByLabel('Volumen V', { exact: true }).fill('125*pi/2');
  await page.getByRole('button', { name: 'Entregar', exact: true }).click();
  await expect(page.locator('[data-examen-panel]')).toHaveAttribute('data-fase', 'entregado');
  await expect(page.locator('#entrega-parcial [data-result=correct]')).toHaveCount(1);
  await expect(page.locator('[data-entrega-resumen]')).toBeFocused();
});

test('las llaves abarcan los renglones incluso sin la fuente de delimitadores', async ({ page }) => {
  await page.route('**/KaTeX_Size4-Regular.*', route => route.abort());
  for (const path of [examen, 'laboratorio/?parcial=1h10-2026-10-31-a&ejercicio=1']) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(path);
    const system = page.locator('.capa.oficial .sistema-con-llave').first();
    await expect(system).toBeVisible();
    const sizes = await system.evaluate(el => ({
      brace: el.querySelector('.llave-trazo').getBoundingClientRect().height,
      lines: el.querySelector('.vlist-t').getBoundingClientRect().height,
      mask: getComputedStyle(el.querySelector('.llave-trazo'), '::before').maskImage,
    }));
    expect(sizes.brace).toBeGreaterThanOrEqual(sizes.lines - 1);
    expect(sizes.mask).toContain('image/svg+xml');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
