import {test,expect} from '@playwright/test';
const lab='laboratorio/?parcial=1h10-2026-10-31-a&ejercicio=1';
const field=(p,id)=>p.locator(`[data-g-campos] [name="${id}"]`);
async function fillStep(page,step){for(const f of step.fields){if(f.options)await field(page,f.id).selectOption(f.expected);else await field(page,f.id).fill(f.expected);}}
async function currentSpec(page){return page.locator('#guiado-catalogo').evaluate(el=>JSON.parse(el.textContent)[0].exercises[0]);}
test('pasos comprobados, error específico y equivalencias sin spoilers',async({page})=>{
 await page.goto(lab);await expect(page.locator('[data-g-img]')).toBeHidden();await expect(page.locator('[data-g-explicacion]')).toBeHidden();await expect(page.locator('[data-g-siguiente]')).toBeDisabled();
 await field(page,'piso').fill('r^2/5');await field(page,'techo').fill('6');await page.getByRole('button',{name:'Comprobar este paso'}).click();await expect(page.locator('[data-g-feedback]')).toHaveAttribute('data-result','incorrect');
 await field(page,'piso').fill('(2*r^2)/10');await field(page,'techo').fill('10/2');await page.getByRole('button',{name:'Comprobar este paso'}).click();await expect(page.locator('[data-g-feedback]')).toHaveAttribute('data-result','correct');await expect(page.locator('[data-g-siguiente]')).toBeEnabled();
 await page.locator('[data-g-siguiente]').click();await expect(page.locator('[data-g-titulo]')).toHaveText('Igualá las dos alturas');
 await page.reload();await expect(page.locator('[data-g-titulo]')).toHaveText('Igualá las dos alturas');
});
test('volver atrás e invalidar pasos dependientes conserva progreso ajeno',async({page})=>{
 await page.goto(lab);await page.evaluate(()=>localStorage.setItem('am2:v1:estado:viejo#1','resuelto'));
 const spec=await currentSpec(page);for(const step of spec.steps.slice(0,2)){await fillStep(page,step);await page.getByRole('button',{name:'Comprobar este paso'}).click();await page.locator('[data-g-siguiente]').click();}
 await page.locator('[data-g-indice] button').first().click();await field(page,'techo').fill('7');await expect(page.locator('[data-g-siguiente]')).toBeDisabled();await expect(page.locator('[data-g-contador]')).toContainText('0 de');
 await page.reload();await expect(field(page,'techo')).toHaveValue('7');await expect(page.locator('[data-g-indice] button').nth(1)).toBeDisabled();expect(await page.evaluate(()=>localStorage.getItem('am2:v1:estado:viejo#1'))).toBe('resuelto');
});
test('pistas, final e historial separan ayuda de autonomía',async({page})=>{
 await page.goto(lab);const spec=await currentSpec(page);
 for(let i=0;i<spec.steps.length;i++){
  if(i===0){await page.getByRole('button',{name:'Necesito una pista'}).click();await expect(page.locator('[data-g-img]')).toBeVisible();}
  await fillStep(page,spec.steps[i]);await page.getByRole('button',{name:'Comprobar este paso'}).click();await expect(page.locator('[data-g-feedback]')).toHaveAttribute('data-result','correct');await page.locator('[data-g-siguiente]').click();
 }
 await expect(page.locator('[data-g-resumen]')).toContainText('8 de 9');await page.getByRole('button',{name:'Rehacer sin ayudas'}).click();await expect(page.locator('[data-g-contador]')).toHaveText('0 de 9 pasos completados');
 await page.getByText('Ver mis pasos y los intentos anteriores',{exact:true}).click();await expect(page.locator('[data-g-historial]')).toContainText('Intentos anteriores');await expect(page.locator('[data-g-historial]')).toContainText('8/9');await expect(page.locator('[data-g-img]')).toBeHidden();
});
test('almacenamiento bloqueado permite practicar y alternar ejercicios en memoria',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('bloqueado');}});});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(lab);
 await field(page,'piso').fill('r^2/5');await field(page,'techo').fill('5');await page.getByRole('button',{name:'Comprobar este paso'}).click();await expect(page.locator('[data-g-feedback]')).toHaveAttribute('data-result','correct');await expect(page.locator('[data-g-storage]')).toContainText('no permite guardar');
 await page.locator('[data-g-ejercicio]').selectOption('1h10-2026-10-31-a#2');await page.locator('[data-g-ejercicio]').selectOption('1h10-2026-10-31-a#1');await expect(field(page,'techo')).toHaveValue('5');expect(errors).toEqual([]);
});
test('una forma no soportada no se califica como error matemático',async({page})=>{
 await page.goto(lab);await field(page,'piso').fill('integral(r)');await field(page,'techo').fill('5');await page.getByRole('button',{name:'Comprobar este paso'}).click();await expect(page.locator('[data-g-feedback]')).toHaveAttribute('data-result','unsupported');await expect(page.locator('[data-g-siguiente]')).toBeDisabled();
});
test('catálogo completo: todos los controles admiten completar el recorrido',async({page})=>{
 test.setTimeout(180000);await page.goto(lab);const catalog=await page.locator('#guiado-catalogo').evaluate(e=>JSON.parse(e.textContent));let n=0;
 for(const exam of catalog)for(const exercise of exam.exercises){
  await page.goto(`laboratorio/?parcial=${exam.id}&ejercicio=${exercise.id.split('#')[1]}`);
  for(const step of exercise.steps){await fillStep(page,step);await page.getByRole('button',{name:'Comprobar este paso'}).click();await expect(page.locator('[data-g-feedback]'),`${exercise.id}:${step.id}`).toHaveAttribute('data-result','correct');await page.locator('[data-g-siguiente]').click();}
  await expect(page.locator('[data-g-final]')).toBeVisible();n++;
 }
 expect(n).toBe(55);
});
for(const scheme of ['light','dark'])test(`celular ${scheme}: controles y figura sin desborde`,async({page})=>{
 await page.emulateMedia({colorScheme:scheme});await page.setViewportSize({width:390,height:844});await page.goto(lab);await page.getByRole('button',{name:'Ir al paso 1 ↓'}).click();await expect(page.locator('[data-g-titulo]')).toBeFocused();await page.getByRole('button',{name:'Necesito una pista'}).click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:`/tmp/am2-guiado-${scheme}.png`,fullPage:true});
});
test('URL anterior del generador conserva tipo y semilla',async({page})=>{
 await page.goto('laboratorio/?tipo=lineal&semilla=123');await expect(page).toHaveURL(/laboratorio\/generador\/\?tipo=lineal&semilla=123/);await expect(page.locator('[data-lab]')).toBeVisible();await expect(page.locator('#lab-semilla')).toHaveValue('123');
});
