// Falla si hay ids de <Ejercicio> duplicados o un Ejercicio sin fuente/pagina.
import { readdirSync, readFileSync } from 'node:fs';

const dir = new URL('../src/content/parciales/', import.meta.url);
const vistos = new Map();
const errores = [];

for (const f of readdirSync(dir).filter((n) => n.endsWith('.mdx'))) {
  const texto = readFileSync(new URL(f, dir), 'utf8');
  for (const [, attrs] of texto.matchAll(/<Ejercicio\b([^>]*)>/g)) {
    const attr = (n) => attrs.match(new RegExp(`\\b${n}=(?:"([^"]*)"|\\{([^}]*)\\})`))?.slice(1).find(Boolean);
    const id = attr('id');
    if (!id) { errores.push(`${f}: Ejercicio sin id`); continue; }
    if (vistos.has(id)) errores.push(`id duplicado "${id}" en ${f} y ${vistos.get(id)}`);
    vistos.set(id, f);
    for (const n of ['fuente', 'pagina']) if (!attr(n)) errores.push(`${f}: ${id} sin ${n}`);
  }
}
if (errores.length) { console.error(errores.join('\n')); process.exit(1); }
console.log(`check-ids OK: ${vistos.size} ejercicios, sin duplicados.`);
