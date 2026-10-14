import { test, expect } from '@playwright/test';

const EXAMEN = 'parciales/1r3-2025-11-14/';
const ej1 = (page) => page.locator('[data-id="1r3-2025-11-14#1"]');

test('estado y pista persisten tras recargar, con prefijo am2:v1:', async ({ page }) => {
  await page.goto(EXAMEN);
  await ej1(page).getByLabel('Resuelto').check();
  await ej1(page).getByRole('button', { name: 'Ver pista' }).click();
  await expect(ej1(page).locator('[data-pista]').first()).toBeVisible();

  await page.reload();
  await expect(ej1(page).getByLabel('Resuelto')).toBeChecked();
  await expect(ej1(page).locator('[data-pista]').first()).toBeVisible();
  await expect(ej1(page).locator('[data-paso]').first()).toBeHidden();

  const claves = await page.evaluate(() => Object.keys(localStorage));
  expect(claves).toContain('am2:v1:estado:1r3-2025-11-14#1');
  expect(claves.every((k) => k.startsWith('am2:v1:'))).toBe(true);
});

test('Ocultar todo esconde las ayudas', async ({ page }) => {
  await page.goto(EXAMEN);
  await ej1(page).getByRole('button', { name: 'Ver solución completa' }).click();
  await expect(ej1(page).locator('[data-solucion]').first()).toBeVisible();
  await ej1(page).getByRole('button', { name: 'Ocultar todo' }).click();
  await expect(ej1(page).locator('[data-solucion]').first()).toBeHidden();
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

test('con localStorage roto los botones siguen andando y no hay errores', async ({ page }) => {
  const errores = [];
  page.on('pageerror', (e) => errores.push(e.message));
  await page.addInitScript(() => {
    const falla = () => { throw new Error('storage roto'); };
    Storage.prototype.getItem = falla;
    Storage.prototype.setItem = falla;
  });
  await page.goto(EXAMEN);
  await ej1(page).getByRole('button', { name: 'Ver pista' }).click();
  await expect(ej1(page).locator('[data-pista]').first()).toBeVisible();
  await ej1(page).getByLabel('Resuelto').check();
  await expect(ej1(page).getByLabel('Resuelto')).toBeChecked();
  expect(errores).toEqual([]);
});

test('JSON basura en la clave vista no rompe nada', async ({ page }) => {
  const errores = [];
  page.on('pageerror', (e) => errores.push(e.message));
  await page.addInitScript(() => {
    localStorage.setItem('am2:v1:vista:1r3-2025-11-14#1', '{{{no es json');
    localStorage.setItem('am2:v1:vista:1r3-2025-11-14#2', '{"p":99,"s":-3,"full":"si"}');
    localStorage.setItem('am2:v1:estado:1r3-2025-11-14#1', 'cualquiera');
  });
  await page.goto(EXAMEN);
  await expect(ej1(page).getByLabel('Pendiente')).toBeChecked();
  await expect(ej1(page).locator('[data-pista]').first()).toBeHidden();
  await expect(page.locator('[data-id="1r3-2025-11-14#2"] [data-pista]').first()).toBeVisible(); // p=99 se acota a la cantidad real de pistas
  await expect(page.locator('[data-id="1r3-2025-11-14#2"] [data-paso]').first()).toBeHidden();
  expect(errores).toEqual([]);
});
