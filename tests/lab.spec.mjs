import { test, expect } from '@playwright/test';

const vistas = { desktop: { width: 1280, height: 800 }, celular: { width: 390, height: 844 } };
const sinScrollH = async (page) => expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

for (const [nombre, viewport] of Object.entries(vistas)) {
  test.describe(nombre, () => {
    test.use({ viewport });

    test('laboratorio: carga, KaTeX, semilla reproducible, otro, solución e IA', async ({ page }) => {
      const problemas = [];
      page.on('pageerror', (e) => problemas.push(e.message));
      page.on('console', (m) => ['error', 'warning'].includes(m.type()) && problemas.push(m.text())); // incluye los warn de KaTeX
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
      page.on('console', (m) => ['error', 'warning'].includes(m.type()) && problemas.push(m.text())); // incluye los warn de KaTeX
      await page.goto('laboratorio/?tipo=polares&semilla=5');
      const ids = await page.locator('#lab-tipo option').evaluateAll((os) => os.map((o) => o.value));
      expect(ids.length).toBeGreaterThanOrEqual(12); // 7 del 1º parcial más los del 2º
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

    test('laboratorio: varias semillas por generador, sin errores de KaTeX ni scroll horizontal con la solución abierta', async ({ page }) => {
      const problemas = [];
      page.on('pageerror', (e) => problemas.push(e.message));
      page.on('console', (m) => ['error', 'warning'].includes(m.type()) && problemas.push(m.text()));
      for (const id of ['lineal', 'bernoulli', 'homogenea2', 'nohomogenea', 'exacta', 'green', 'polares', 'dominio', 'direccional', 'diferencial', 'extremos', 'lagrange', 'implicita', 'plano']) {
        for (const semilla of [3, 17, 101, 4242, 90001]) {
          await page.goto(`laboratorio/?tipo=${id}&semilla=${semilla}`);
          await page.locator('[data-ver]').click();
          await expect(page.locator('[data-solucion] li').first()).toBeVisible();
          expect(await page.locator('.katex-error').count(), `${id} ${semilla}`).toBe(0);
          expect(await page.locator('[data-solucion] li').count()).toBeGreaterThanOrEqual(4);
          await sinScrollH(page);
        }
      }
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

test('laboratorio: el dominio muestra su gráfico dentro de la solución, sin scroll horizontal en 390px', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  const problemas = [];
  page.on('pageerror', (e) => problemas.push(e.message));
  await page.goto('laboratorio/?tipo=dominio&semilla=7');
  await page.locator('[data-ver]').click();
  const c = page.locator('[data-solucion] canvas.lab-graf');
  await expect(c).toBeVisible();
  expect(await c.evaluate((n) => n.getContext('2d').getImageData(0, 0, n.width, n.height).data.some((v, i) => i % 4 === 3 && v > 0))).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(problemas).toEqual([]);
  await ctx.close();
});

// Segunda vuelta P1 (estética/profe): generador en el primer pantallazo, gráfico nítido, notación en KaTeX, parcial sin JS.
test('laboratorio: el generador está en el primer pantallazo (390x844) y la lista de tipos queda debajo', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto('laboratorio/?tipo=direccional&semilla=3');
  const sel = await page.locator('#lab-tipo').boundingBox();
  const lista = await page.locator('details.lab-tipos').boundingBox();
  expect(sel.y + sel.height).toBeLessThan(844);
  expect(lista.y).toBeGreaterThan(sel.y);
  await ctx.close();
});

test('laboratorio: el gráfico del dominio es nítido (devicePixelRatio 2), cabe en 390px y está centrado', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto('laboratorio/?tipo=dominio&semilla=7');
  await page.locator('[data-ver]').click();
  const c = page.locator('[data-solucion] canvas.lab-graf');
  await expect(c).toBeVisible();
  expect(await c.evaluate((n) => n.width)).toBe(680); // 340 px lógicos x 2
  const caja = await c.boundingBox(), sol = await page.locator('[data-solucion]').boundingBox();
  expect(caja.width).toBeLessThanOrEqual(340.5);
  expect(caja.x + caja.width).toBeLessThanOrEqual(390);
  expect(Math.abs(caja.x - sol.x - (sol.x + sol.width - caja.x - caja.width))).toBeLessThan(3); // centrado en la solución
  // hay tinta de texto (números de los ejes) fuera de las rectas de los ejes: píxeles opacos alrededor de la marca del 3
  expect(await c.evaluate((n) => { const d = n.getContext('2d').getImageData(0, 0, n.width, n.height).data; let k = 0; for (let i = 3; i < d.length; i += 4) if (d[i] === 255) k++; return k; })).toBeGreaterThan(200);
  await ctx.close();
});

test('laboratorio: la notación f\'_x, F\'_z, … no queda en texto plano (todo KaTeX)', async ({ page }) => {
  for (const tipo of ['extremos', 'direccional', 'implicita', 'plano', 'dominio']) {
    for (const semilla of [4, 9, 21]) {
      await page.goto(`laboratorio/?tipo=${tipo}&semilla=${semilla}`);
      await page.locator('[data-ver]').click();
      const planos = await page.locator('.lab-ej').evaluate((raiz) => {
        const w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT), malos = [];
        for (let n = w.nextNode(); n; n = w.nextNode()) if (!n.parentElement.closest('.katex, .katex-mathml') && /[A-Za-z]'{1,2}_[xyz]|\$/.test(n.textContent)) malos.push(n.textContent);
        return malos;
      });
      expect(planos, `${tipo} ${semilla}`).toEqual([]);
    }
  }
});

test('laboratorio: implícita con F\'_z(P) = 0 y direccional en 3 variables se muestran completas', async ({ page }) => {
  await page.goto('laboratorio/?tipo=direccional3&semilla=5');
  await page.locator('[data-ver]').click();
  await expect(page.locator('[data-solucion]')).toContainText('cosenos directores');
  expect(await page.locator('[data-solucion] .katex-error').count()).toBe(0);
  for (let s = 1; s < 60; s++) {
    await page.goto(`laboratorio/?tipo=implicita&semilla=${s}`);
    await page.locator('[data-ver]').click();
    if ((await page.locator('[data-solucion]').innerText()).includes('NO se puede aplicar el teorema')) { expect(await page.locator('[data-solucion] .katex-error').count()).toBe(0); return; }
  }
  throw new Error('no apareció el caso F_z(P)=0 en 60 semillas');
});
