import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

// Recorrido de la "estudiante apurada" del 1º parcial (U1–U3), desktop y 390px.
const ID = 'p1-1h9-2025-05-g1';
const RUTA = `parciales/${ID}/`;
const ej = (page, n) => page.locator(`[data-id="${ID}#${n}"]`);
const sinScrollH = (page) => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
const P1_GEN = ['dominio', 'direccional', 'diferencial', 'extremos', 'lagrange', 'implicita', 'plano'];
const DIR = process.env.SITE_DIR || 'dist';

for (const [nombre, viewport] of Object.entries({ desktop: { width: 1280, height: 800 }, celular: { width: 390, height: 844 } })) {
  test.describe(`P1 ${nombre}`, () => {
    test.use({ viewport });

    test('Home → 1º parcial → un parcial → pista 2 → machete → volver', async ({ page }) => {
      const problemas = [];
      page.on('pageerror', (e) => problemas.push(e.message));
      page.on('console', (m) => ['error', 'warning'].includes(m.type()) && problemas.push(m.text()));
      await page.goto('');
      await page.locator('.accesos a[href$="/parciales/"]').first().click();
      await expect(page.locator('section.inst[data-instancia="p1"] a.ec-titulo').first()).toBeVisible();
      await page.locator(`a[href$="/parciales/${ID}/"]`).click();
      await expect(page.locator('h1')).toBeVisible();
      await expect(page).toHaveURL(new RegExp(`${ID}/$`));

      const e1 = ej(page, 1);
      await e1.getByRole('button', { name: 'Ver pista' }).click();
      await e1.getByRole('button', { name: 'Ver pista' }).click();
      const pistas = e1.locator('[data-pista]');
      await expect(pistas.nth(1)).toBeVisible();
      const link = pistas.nth(1).getByRole('link', { name: /Dominio de funciones/ });
      await link.click();
      await expect(page).toHaveURL(/machetes\/dominio-de-funciones-de-dos-variables\/$/);
      await expect(page.locator('h1')).toBeVisible();
      expect(await page.locator('.katex-error').count()).toBe(0);
      await page.goBack();
      await expect(page).toHaveURL(new RegExp(`${ID}/`));
      await expect(ej(page, 1).locator('[data-pista]').nth(1)).toBeVisible(); // la pista abierta sigue abierta
      expect(await sinScrollH(page)).toBe(true);
      expect(problemas).toEqual([]);
    });

    test('modo examen completo en un parcial del 1º: reloj, pausa, entregar, corrección, IA, persistencia, salir', async ({ page }) => {
      await page.clock.install();
      await page.goto(RUTA);
      await page.getByRole('button', { name: 'Rendir como examen' }).click();
      await page.getByLabel('Minutos').fill('2');
      await page.getByRole('button', { name: 'Empezar' }).click();
      await expect(page.locator('[data-ex="reloj"]')).toHaveText('02:00');
      await page.clock.runFor(30_000);
      await expect(page.locator('[data-ex="reloj"]')).toHaveText('01:30');
      await page.getByRole('button', { name: 'Pausar' }).click();
      await page.clock.runFor(20_000);
      await expect(page.locator('[data-ex="reloj"]')).toHaveText('01:30'); // pausado no corre
      await page.getByRole('button', { name: 'Reanudar' }).click();
      expect(await sinScrollH(page)).toBe(true);
      await expect(ej(page, 1).locator('[data-solucion]').first()).toBeHidden();
      await expect(ej(page, 1).locator('[data-pista]').first()).toBeHidden();
      await expect(ej(page, 1).locator('[data-ia-enun] summary').first()).toBeVisible(); // el enunciado (y su escaneo) sigue
      // doble click en Entregar: no explota ni duplica
      await page.getByRole('button', { name: 'Entregar' }).dblclick().catch(() => {});
      await expect(page.locator('[data-ex="nota"]')).toBeVisible();
      await expect(ej(page, 1).locator('[data-solucion]').first()).toBeVisible();
      await expect(ej(page, 1).locator('.ia')).toBeVisible();
      await ej(page, 1).getByRole('button', { name: 'Bien', exact: true }).click();
      await ej(page, 2).getByRole('button', { name: 'A medias' }).click();
      await ej(page, 3).getByRole('button', { name: 'Mal', exact: true }).click();
      await expect(page.locator('[data-ex="nota"]')).toHaveText('50'); // (1 + .5 + 0) / 3 = 50
      await expect(ej(page, 1).getByRole('button', { name: 'Bien', exact: true })).toHaveAttribute('aria-pressed', 'true');
      expect(await sinScrollH(page)).toBe(true);
      await page.reload();
      await expect(page.locator('[data-ex="ultimo"]')).toContainText('50/100');
      await page.getByRole('button', { name: 'Rendir como examen' }).click();
      await page.getByRole('button', { name: 'Salir del modo examen' }).click();
      await expect(page.locator('body')).not.toHaveAttribute('data-examen', /.*/);
    });

    test('exploratoria: cambiar de tema (sistema) en medio del examen, girar a horizontal, doble Entregar', async ({ page }) => {
      await page.clock.install();
      await page.goto(RUTA);
      await page.getByRole('button', { name: 'Rendir como examen' }).click();
      await page.getByRole('button', { name: 'Empezar' }).click();
      await page.clock.runFor(5_000);
      for (const esquema of ['dark', 'light', 'dark']) {
        await page.emulateMedia({ colorScheme: esquema });
        await expect(page.locator('body')).toHaveAttribute('data-examen', 'activo');
        await expect(page.locator('[data-ex="reloj"]')).toBeVisible();
        expect(await sinScrollH(page)).toBe(true);
      }
      await page.setViewportSize({ width: 844, height: 390 });
      expect(await sinScrollH(page)).toBe(true);
      await page.getByRole('button', { name: 'Entregar' }).click();
      await page.getByRole('button', { name: 'Entregar' }).click({ timeout: 500 }).catch(() => {}); // ya no existe: no debe pasar nada
      await expect(page.locator('[data-ex="nota"]')).toBeVisible();
      await expect(page.locator('[data-ex="usado"]')).toHaveText('00:05');
      expect(await sinScrollH(page)).toBe(true);
    });
  });
}

for (const [nombre, viewport] of Object.entries({ desktop: { width: 1280, height: 800 }, celular: { width: 390, height: 844 }, horizontal: { width: 844, height: 390 } })) {
  test.describe(`Lab P1 ${nombre}`, () => {
    test.use({ viewport });

    test('cada generador del 1º parcial: semillas, "otro", solución, link reproducible', async ({ page, browser }) => {
      test.setTimeout(180_000);
      const problemas = [];
      page.on('pageerror', (e) => problemas.push(e.message));
      page.on('console', (m) => ['error', 'warning'].includes(m.type()) && problemas.push(m.text()));
      for (const id of P1_GEN) {
        for (const semilla of [1, 2, 7, 99, 31337, 2147483647]) {
          await page.goto(`laboratorio/?tipo=${id}&semilla=${semilla}`);
          await expect(page.locator('#lab-tipo')).toHaveValue(id);
          await expect(page.locator('#lab-semilla')).toHaveValue(String(semilla));
          await expect(page.locator('[data-enunciado] .katex').first()).toBeVisible();
          await page.locator('[data-ver]').click();
          await expect(page.locator('[data-solucion]')).toBeVisible();
          expect(await page.locator('.katex-error').count(), `${id} ${semilla}`).toBe(0);
          expect(await sinScrollH(page), `${id} ${semilla} scroll`).toBe(true);
          const sol = (await page.locator('[data-solucion]').innerText()).replace(/\s+/g, '');
          expect(sol).not.toMatch(/NaN|undefined|Infinity|\[objectObject\]/);
        }
        // "otro" cambia la URL y la URL reproduce el mismo ejercicio en otra pestaña
        await page.getByRole('button', { name: 'Otro ejercicio' }).click();
        const url = page.url();
        expect(url).toMatch(new RegExp(`tipo=${id}&semilla=\\d+`));
        const texto = await page.locator('[data-enunciado]').innerText();
        const p2 = await (await browser.newContext({ viewport })).newPage();
        await p2.goto(url);
        expect(await p2.locator('[data-enunciado]').innerText()).toBe(texto);
        await p2.context().close();
      }
      expect(problemas).toEqual([]);
    });

    test('lab dominio: el gráfico se pinta con varias semillas y no se sale de la pantalla', async ({ page }) => {
      for (const semilla of [1, 5, 13, 42, 777]) {
        await page.goto(`laboratorio/?tipo=dominio&semilla=${semilla}`);
        await page.locator('[data-ver]').click();
        const c = page.locator('[data-solucion] canvas.lab-graf');
        await expect(c).toBeVisible();
        const caja = await c.boundingBox();
        expect(caja.x + caja.width).toBeLessThanOrEqual(viewport.width + 1);
        expect(await c.evaluate((n) => n.getContext('2d').getImageData(0, 0, n.width, n.height).data.some((v, i) => i % 4 === 3 && v > 0))).toBe(true);
        await expect(c).toHaveAttribute('role', 'img');
      }
    });
  });
}

test('lab: query rara no rompe (tipo inválido, semilla 0, negativa, decimal, gigante, script)', async ({ page }) => {
  const errores = [];
  page.on('pageerror', (e) => errores.push(e.message));
  page.on('dialog', (d) => { errores.push('dialog:' + d.message()); d.dismiss(); });
  for (const q of ['tipo=nada&semilla=5', 'semilla=0', 'semilla=-3', 'semilla=1.5', 'semilla=99999999999999', 'tipo=<script>alert(1)</script>&semilla=<img src=x onerror=alert(1)>', 'semilla=1e3', 'semilla=%00']) {
    await page.goto(`laboratorio/?${q}`);
    await expect(page.locator('[data-enunciado] .katex').first()).toBeVisible();
    expect(await page.locator('#lab-semilla').inputValue()).toMatch(/^\d+$/);
  }
  expect(errores).toEqual([]);
});

test('lab: la caja de semilla acepta basura sin romper', async ({ page }) => {
  const errores = [];
  page.on('pageerror', (e) => errores.push(e.message));
  page.on('dialog', (d) => { errores.push('dialog:' + d.message()); d.dismiss(); });
  await page.goto('laboratorio/?tipo=extremos&semilla=4');
  for (const v of ['−3/2', '2√5', '1,5', '', ' ', 'alert(1)', '<b>x</b>', '0', '-1', '99999999999']) {
    await page.locator('#lab-semilla').fill(v);
    await page.getByRole('button', { name: 'Cargar' }).click();
    await expect(page.locator('[data-enunciado] .katex').first()).toBeVisible();
  }
  await page.locator('[data-ia-mia]').fill('<img src=x onerror=alert(1)>');
  await page.locator('[data-ver]').click();
  expect(errores).toEqual([]);
});

test('preguntero y teoría U1–U3: filtros, respuesta, "la sé" persiste, páginas sin errores', async ({ page }) => {
  const problemas = [];
  page.on('pageerror', (e) => problemas.push(e.message));
  page.on('console', (m) => ['error', 'warning'].includes(m.type()) && problemas.push(m.text()));
  await page.goto('preguntero/');
  await page.locator('[data-filtro="instancia"][data-valor="p1"]').click();
  for (const u of ['U1', 'U2', 'U3']) {
    await page.locator(`[data-filtro="unidad"][data-valor="${u}"]`).click();
    expect(await page.locator(`[data-pregunta]:visible`).count(), u).toBeGreaterThan(0);
    expect(await page.locator(`[data-seccion][data-unidad]:visible:not([data-unidad="${u}"])`).count()).toBe(0);
  }
  const t = page.locator('[data-pregunta]:visible').first();
  const id = await t.getAttribute('data-id');
  const sabida = t.getByRole('button', { name: '✓ La sé' });
  await sabida.click();
  await expect(sabida).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(page.locator(`[data-id="${id}"]`).getByRole('button', { name: '✓ La sé' })).toHaveAttribute('aria-pressed', 'true');
  for (const u of ['u01', 'u02', 'u03']) {
    await page.goto(`teoria/${u}/`);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('.katex').first()).toBeVisible();
    expect(await page.locator('.katex-error').count()).toBe(0);
    expect(await sinScrollH(page)).toBe(true);
  }
  expect(problemas).toEqual([]);
});

test('"seguir donde dejaste" y progreso persisten entre recargas', async ({ page }) => {
  await page.goto(RUTA);
  await ej(page, 2).getByLabel('Resuelto').check();
  await ej(page, 1).getByLabel('En curso').check();
  await page.goto('');
  const seguir = page.locator('[data-seguir]');
  await expect(seguir).toBeVisible();
  await expect(seguir).toContainText('Ejercicio 1');
  await expect(page.locator('[data-tu-progreso] [data-n]')).not.toHaveText('0');
  const n = await page.locator('[data-tu-progreso] [data-n]').innerText();
  await page.reload();
  await expect(page.locator('[data-tu-progreso] [data-n]')).toHaveText(n);
  await seguir.click();
  await expect(page).toHaveURL(new RegExp(`${ID}/#ej-1$`));
  await expect(ej(page, 1).getByLabel('En curso')).toBeChecked();
  await expect(ej(page, 2).getByLabel('Resuelto')).toBeChecked();
});

test('"seguir" con datos corruptos o de otro origen no se muestra ni rompe', async ({ page }) => {
  const errores = [];
  page.on('pageerror', (e) => errores.push(e.message));
  for (const v of ['{{{', '{"href":"https://evil.example/","t":"x"}', '{"href":"javascript:alert(1)","t":"x"}', '{"href":"/otra/","t":"x"}', 'null']) {
    await page.addInitScript((val) => localStorage.setItem('am2:v1:ultimo', val), v);
    await page.goto('');
    await expect(page.locator('h1')).toBeVisible();
    const href = await page.locator('[data-seguir]').getAttribute('href');
    expect(href, v).not.toMatch(/evil|javascript/);
    await expect(page.locator('[data-seguir]')).toBeHidden();
  }
  expect(errores).toEqual([]);
});

test('sin JS: parcial P1, teoría U1 y preguntero muestran contenido y sin botones muertos', async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false, baseURL, viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  for (const r of [RUTA, 'teoria/u01/', 'preguntero/', 'laboratorio/', '']) {
    await page.goto(r);
    await expect(page.locator('h1')).toBeVisible();
    expect(await sinScrollH(page), r).toBe(true);
    const muertos = await page.locator('main button:visible').evaluateAll((bs) => bs.map((b) => b.textContent.trim()));
    // en el Home "Reiniciar progreso" necesita JS: es un botón muerto sin JS
    expect(muertos.filter((t) => t !== 'Reiniciar progreso'), r).toEqual([]);
  }
  await ctx.close();
});

test('storage roto en las páginas del 1º parcial: nada se cae', async ({ page }) => {
  const errores = [];
  page.on('pageerror', (e) => errores.push(e.message));
  await page.addInitScript(() => {
    const falla = () => { throw new Error('storage roto'); };
    Object.defineProperty(window, 'localStorage', { get: falla });
  });
  for (const r of ['', RUTA, 'preguntero/', 'laboratorio/?tipo=plano&semilla=3', 'teoria/u02/', 'preguntero/simulacro/']) {
    await page.goto(r);
    await expect(page.locator('h1')).toBeVisible();
  }
  await page.goto(RUTA);
  await ej(page, 1).getByRole('button', { name: 'Ver pista' }).click();
  await expect(ej(page, 1).locator('[data-pista]').first()).toBeVisible();
  await page.getByRole('button', { name: 'Rendir como examen' }).click();
  await page.getByRole('button', { name: 'Empezar' }).click();
  await page.getByRole('button', { name: 'Entregar' }).click();
  await ej(page, 1).getByRole('button', { name: 'Bien', exact: true }).click();
  expect(errores).toEqual([]);
});

test('teclado: Tab alcanza cada control del parcial con foco visible; toggles con aria-pressed', async ({ page }) => {
  await page.goto(RUTA);
  const sin = [];
  const vistos = new Set();
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press('Tab');
    const info = await page.evaluate(() => {
      const a = document.activeElement;
      if (!a || a === document.body) return null;
      const cs = getComputedStyle(a);
      const visible = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0 || cs.boxShadow !== 'none';
      return { k: a.tagName + (a.id ? '#' + a.id : '') + ':' + (a.textContent || a.name || a.value || '').trim().slice(0, 30), visible, tag: a.tagName, type: a.type };
    });
    if (!info) continue;
    vistos.add(info.k);
    if (!info.visible && !['radio'].includes(info.type)) sin.push(info.k);
  }
  expect(sin, 'sin indicador de foco').toEqual([]);
  expect([...vistos].some((k) => /Ver pista/.test(k))).toBe(true);
  expect([...vistos].some((k) => /Rendir como examen/.test(k))).toBe(true);
  await page.goto('preguntero/');
  for (const b of await page.locator('[data-filtro]').all()) await expect(b).toHaveAttribute('aria-pressed', /true|false/);
});

test('a11y básica en todas las páginas P1: un h1, landmarks, imgs con alt, inputs con label, botones con nombre', async ({ page }) => {
  test.setTimeout(240_000);
  const paginas = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name === 'index.html') paginas.push(path.relative(DIR, path.dirname(p)).split(path.sep).join('/'));
    }
  })(DIR);
  const malas = [];
  for (const r of paginas.filter((p) => !p.startsWith('anteriores/anterior') && !/^machetes\/.+/.test(p) || /dominio|hessiano|direccional|lagrange|plano|implicita|diferencial/.test(p))) {
    await page.goto(r ? r + '/' : '');
    const f = await page.evaluate(() => {
      const m = [];
      if (document.querySelectorAll('h1').length !== 1) m.push('h1=' + document.querySelectorAll('h1').length);
      if (!document.querySelector('main')) m.push('sin main');
      if (!document.querySelector('nav')) m.push('sin nav');
      if (!document.querySelector('header, [role=banner]')) m.push('sin header');
      if (!document.documentElement.lang) m.push('sin lang');
      document.querySelectorAll('img').forEach((i) => { if (!i.hasAttribute('alt')) m.push('img sin alt ' + i.src.slice(-30)); });
      document.querySelectorAll('input:not([type=hidden]), select, textarea').forEach((i) => {
        const ok = i.labels?.length || i.getAttribute('aria-label') || i.getAttribute('aria-labelledby') || i.closest('label');
        if (!ok) m.push('input sin label ' + (i.id || i.name || i.type));
      });
      document.querySelectorAll('button, a[href]').forEach((b) => { if (!(b.textContent.trim() || b.getAttribute('aria-label') || b.querySelector('img[alt]:not([alt=""])'))) m.push('sin nombre ' + b.outerHTML.slice(0, 60)); });
      const ids = [...document.querySelectorAll('[id]')].map((e) => e.id); const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
      if (dup.length) m.push('ids duplicados ' + [...new Set(dup)].slice(0, 3));
      return m;
    });
    if (f.length) malas.push(`${r || '/'}: ${f.join('; ')}`);
  }
  expect(malas).toEqual([]);
});

test('imágenes de las páginas P1 cargan (200, image/*, no vacías) y no hay copias duplicadas', async ({ page, request }) => {
  test.setTimeout(240_000);
  const srcs = new Set();
  const dirs = fs.readdirSync(path.join(DIR, 'parciales')).filter((d) => d.startsWith('p1-'));
  for (const d of dirs) {
    const html = fs.readFileSync(path.join(DIR, 'parciales', d, 'index.html'), 'utf8');
    for (const m of html.matchAll(/<img\b[^>]*?src="([^"]+)"/g)) srcs.add(m[1]);
  }
  expect(srcs.size).toBeGreaterThan(50);
  const malas = [];
  for (const s of srcs) {
    const r = await request.get(s);
    const ct = r.headers()['content-type'] || '';
    const len = (await r.body()).length;
    if (r.status() !== 200 || !ct.startsWith('image/') || len < 1000) malas.push(`${s} ${r.status()} ${ct} ${len}`);
  }
  expect(malas).toEqual([]);
});

test('IA en el laboratorio P1 y en un ejercicio P1: el prompt lleva consigna y modelo, sin undefined', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  for (const [ruta, raiz] of [['laboratorio/?tipo=lagrange&semilla=11', page.locator('.lab-ej')], [RUTA, ej(page, 2)]]) {
    await page.goto(ruta);
    await raiz.getByLabel('Tu respuesta').fill('−3/2 y 2√5');
    await raiz.locator('.ia-menu summary').click();
    await raiz.getByRole('button', { name: 'Solo copiar el prompt' }).click();
    await expect(raiz.locator('[data-ia-aviso]')).toContainText('copiado');
    const q = await page.evaluate(() => navigator.clipboard.readText());
    expect(q).toContain('−3/2 y 2√5');
    expect(q).toMatch(/Consigna:/);
    expect(q).toMatch(/Respuesta modelo/);
    expect(q).not.toMatch(/undefined|NaN|\[object/);
    expect(q.length).toBeGreaterThan(300);
  }
});
