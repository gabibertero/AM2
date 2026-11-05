import { test, expect } from '@playwright/test';
const ruta='parciales/1h10-2026-10-31-a/';
const ejercicio=p=>p.locator('[data-ejercicio][data-id="1h10-2026-10-31-a#1"]');
test('portada práctica, días del plan y orden real del parcial nuevo',async({page})=>{
 await page.goto('');await expect(page.locator('h1')).toContainText('Un ejercicio a la vez');
 await expect(page.locator('nav[aria-label="Principal"] a')).toHaveCount(5);
 await expect(page.locator('nav[aria-label="Principal"]')).not.toContainText('Teoría');
 await page.getByRole('button',{name:/Jueves 5/}).click();await expect(page.locator('[data-plan-dia="jueves"]')).toBeVisible();await expect(page.locator('[data-plan-dia="hoy"]')).toBeHidden();
 await page.goto('parciales/');await expect(page.locator('.exam-row')).toHaveCount(12);
 await expect(page.locator('.exam-row').first()).toContainText('31/10/2026');
 await expect(page.locator('.exam-row').nth(1)).toContainText('27/06/2026');
 await page.locator('.exam-info h2 a').first().click();await expect(page.locator('[data-ejercicio]')).toHaveCount(5);
 await expect(page.locator('[data-ex="minutos"]')).toHaveValue('120');
});
test('nota sin autonomía persiste y reintento lleva al ejercicio exacto',async({page})=>{
 await page.goto(ruta);await ejercicio(page).getByRole('textbox',{name:'Mi dificultad en el ejercicio 1'}).fill('No entiendo el radio de la región');
 await page.reload();await expect(ejercicio(page).getByRole('textbox',{name:'Mi dificultad en el ejercicio 1'})).toHaveValue('No entiendo el radio de la región');
 await page.goto('errores/');const row=page.locator('[data-error-id="1h10-2026-10-31-a#1"]');await expect(row).toBeVisible();
 await expect(row.getByRole('link',{name:'Reintentar →'})).toHaveAttribute('href','/AM2/'+ruta+'#ej-1');
 await row.getByRole('link',{name:'Reintentar →'}).click();await expect(ejercicio(page)).toBeInViewport();
 await ejercicio(page).getByRole('button',{name:'Lo hice solo',exact:true}).click();await page.goto('errores/');await expect(row).toBeHidden();
});
test('autonomía se guarda separada del progreso previo y el examen oculta las ayudas',async({page})=>{
 await page.goto(ruta);await ejercicio(page).getByLabel('Resuelto',{exact:true}).check();
 await ejercicio(page).getByRole('button',{name:'Lo seguí con ayuda'}).click();
 await page.reload();await expect(ejercicio(page).getByLabel('Resuelto',{exact:true})).toBeChecked();
 await expect(ejercicio(page).getByRole('button',{name:'Lo seguí con ayuda'})).toHaveAttribute('aria-pressed','true');
 await ejercicio(page).getByRole('button',{name:'Explicame paso a paso'}).click();await expect(ejercicio(page).locator('[data-paso]').first()).toBeVisible();
 await page.getByRole('button',{name:'Rendir como examen'}).click();await page.getByRole('button',{name:'Empezar',exact:true}).click();
 await expect(ejercicio(page).locator('[data-paso]').first()).toBeHidden();await expect(ejercicio(page).locator('[data-aprendizaje]')).toBeHidden();await expect(ejercicio(page).locator('.chip-link:visible')).toHaveCount(0);
 await expect(page.locator('[data-ex="reloj"]')).toHaveText('120:00');
});
for(const width of [375,390,1440])test(`nuevo recorrido sin desborde a ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});
 for(const r of ['',ruta,'machetes/','machetes/edo-lineal/','errores/']){
  await page.goto(r);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),r).toBe(true);
 }
});

test('dibujos revelados permanecen dentro de su contenedor en celular',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto(ruta);
 for(const n of [1,2,3]){
  const e=page.locator(`[data-ejercicio][id="ej-${n}"]`);
  await e.getByRole('button',{name:'Ver solución completa',exact:true}).click();
  await expect(e.locator('.figura-ayuda img')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  expect(await e.locator('.dibujo-scroll').evaluate(el=>el.scrollWidth>el.clientWidth)).toBe(true);
 }
});
