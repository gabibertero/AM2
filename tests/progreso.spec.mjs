import { test, expect } from '@playwright/test';

const EXAMEN = 'parciales/1r3-2025-11-14/';
const ej1 = (page) => page.locator('[data-id="1r3-2025-11-14#1"]');

test('estado y pista persisten tras recargar, con prefijo am2:v1:', async ({ page }) => {
  await page.goto(EXAMEN);
  await ej1(page).getByLabel('Resuelto').check();
  await ej1(page).getByRole('button', { name: 'Ver pista' }).click();
  await expect(ej1(page).locator('[data-pista]')).toBeVisible();

  await page.reload();
  await expect(ej1(page).getByLabel('Resuelto')).toBeChecked();
  await expect(ej1(page).locator('[data-pista]')).toBeVisible();
  await expect(ej1(page).locator('[data-paso]')).toBeHidden();

  const claves = await page.evaluate(() => Object.keys(localStorage));
  expect(claves).toContain('am2:v1:estado:1r3-2025-11-14#1');
  expect(claves.every((k) => k.startsWith('am2:v1:'))).toBe(true);
});

test('Ocultar todo esconde las ayudas', async ({ page }) => {
  await page.goto(EXAMEN);
  await ej1(page).getByRole('button', { name: 'Ver solución completa' }).click();
  await expect(ej1(page).locator('[data-solucion]')).toBeVisible();
  await ej1(page).getByRole('button', { name: 'Ocultar todo' }).click();
  await expect(ej1(page).locator('[data-solucion]')).toBeHidden();
});

test('Reiniciar progreso borra solo claves am2:v1:', async ({ page }) => {
  await page.goto(EXAMEN);
  await ej1(page).getByLabel('En curso').check();
  await page.evaluate(() => localStorage.setItem('otra-app:x', '1'));

  await page.goto('');
  await page.getByRole('button', { name: 'Reiniciar progreso' }).click();
  await page.getByRole('button', { name: 'Sí, borrar todo' }).click();
  await expect(page.getByText('Progreso borrado.')).toBeVisible();

  const claves = await page.evaluate(() => Object.keys(localStorage));
  expect(claves).toEqual(['otra-app:x']);
});

test('parciales/index muestra progreso X/Y', async ({ page }) => {
  await page.goto(EXAMEN);
  await ej1(page).getByLabel('Resuelto').check();
  await page.goto('parciales/');
  await expect(page.getByText('1/5 resueltos')).toBeVisible();
});

test.describe('sin scroll horizontal a 375px', () => {
  test.use({ viewport: { width: 375, height: 800 } });
  for (const [nombre, ruta] of [['Inicio', ''], ['examen', EXAMEN]]) {
    test(nombre, async ({ page }) => {
      await page.goto(ruta);
      const ancho = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
      expect(ancho[0]).toBeLessThanOrEqual(ancho[1]);
    });
  }
});
