// Falla si hay ids de <Ejercicio> duplicados, sin prefijo del examen, o sin fuente/pagina;
// si falta un escaneo en public/escaneos; si un machete cita un ejercicio inexistente o hay slugs repetidos.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { idsDeEjercicios } from '../src/scripts/ids.js';

const vistos = new Map();
const errores = [];

for (const sub of ['parciales', 'anteriores']) for (const f of readdirSync(new URL(`../src/content/${sub}/`, import.meta.url)).filter((n) => n.endsWith('.mdx'))) {
  const dir = new URL(`../src/content/${sub}/`, import.meta.url);
  const texto = readFileSync(new URL(f, dir), 'utf8');
  const examen = texto.match(/^id:\s*"?([^"\n]+?)"?\s*$/m)?.[1];
  if (!examen) errores.push(`${f}: frontmatter sin id`);
  const escaneo = (ex, archivo) => {
    if (!existsSync(new URL(`../public/escaneos/${ex}/${archivo}`, import.meta.url))) errores.push(`${f}: falta imagen public/escaneos/${ex}/${archivo}`);
  };
  // misma lógica que Enunciado.astro (p<pagina>.webp) y ResolucionOficial.astro (rango "a–b" o "a")
  for (const [tag] of texto.matchAll(/<(?:Enunciado|ResolucionOficial)\b[^>]*>/g)) {
    const ex = tag.match(/\bexamen="([^"]+)"/)?.[1];
    if (!ex) continue;
    const [a, b] = (tag.match(/\bpaginas?="([^"]+)"/)?.[1] ?? '').split(/[–-]/).map((n) => parseInt(n, 10));
    if (!(a >= 1)) { errores.push(`${f}: ${tag.match(/<\w+/)[0]}> con examen="${ex}" sin pagina(s) válida`); continue; }
    for (let n = a; n <= (b ?? a); n++) escaneo(ex, `p${n}.webp`);
  }
  // anteriores: fotos del frontmatter -> f<NNN>.webp
  const fotos = texto.match(/^fotos:\s*\[([^\]]*)\]/m)?.[1];
  if (sub === 'anteriores' && examen && fotos) for (const [, foto] of fotos.matchAll(/"([^"]+)"/g)) escaneo(examen, `${foto}.webp`);
  for (const [tag] of texto.matchAll(/<Ejercicio\b[^>]*>/g)) {
    const [id] = idsDeEjercicios(tag);
    if (!id) { errores.push(`${f}: Ejercicio sin id`); continue; }
    if (examen && !id.startsWith(`${examen}#`)) errores.push(`${f}: id "${id}" no empieza con "${examen}#"`);
    if (vistos.has(id)) errores.push(`id duplicado "${id}" en ${f} y ${vistos.get(id)}`);
    vistos.set(id, f);
    for (const n of ['fuente', 'pagina']) {
      if (!new RegExp(`(?<![\\w-])${n}=(?:"[^"]+"|\\{[^}]+\\})`).test(tag)) errores.push(`${f}: ${id} sin ${n}`);
    }
  }
}
// machetes: ejerciciosOficiales existentes y slugs únicos (los de teoría salen del nombre de archivo)
const slugs = new Map();
const dirMach = new URL('../src/content/machetes/', import.meta.url);
for (const f of readdirSync(dirMach).filter((n) => n.endsWith('.md'))) {
  const texto = readFileSync(new URL(f, dirMach), 'utf8');
  const slug = texto.match(/^slug:\s*"?([^"\n]+?)"?\s*$/m)?.[1];
  if (!slug) errores.push(`machetes/${f}: sin slug`);
  else if (slugs.has(slug)) errores.push(`slug de machete repetido "${slug}" en ${f} y ${slugs.get(slug)}`);
  else slugs.set(slug, f);
  const lista = texto.match(/^ejerciciosOficiales:\s*\[([^\]]*)\]/m)?.[1] ?? '';
  for (const [, id] of lista.matchAll(/"([^"]+)"/g)) if (!vistos.has(id)) errores.push(`machetes/${f}: ejerciciosOficiales cita "${id}" que no existe como <Ejercicio>`);
}
const ids = readdirSync(new URL('../src/content/teoria/', import.meta.url)).map((n) => n.replace(/\.md$/, '').toLowerCase());
for (const id of ids) if (ids.indexOf(id) !== ids.lastIndexOf(id)) errores.push(`slug de teoría repetido "${id}"`);
if (errores.length) { console.error(errores.join('\n')); process.exit(1); }
console.log(`check-ids OK: ${vistos.size} ejercicios, sin duplicados.`);
