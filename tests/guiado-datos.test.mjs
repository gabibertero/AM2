import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {curso} from '../src/scripts/guiado/curso.js';import {anteriores} from '../src/scripts/guiado/anteriores.js';import {checkExpression} from '../src/scripts/guiado/validar.js';
const specs=[...curso,...anteriores];
test('cada ejercicio oficial P2 tiene controles propios, preguntas y ayuda',()=>{
 const ids=[];
 for(const name of fs.readdirSync('src/content/parciales').filter(n=>n.endsWith('.mdx')&&!n.startsWith('p1-')&&!n.startsWith('modelo-'))){const body=fs.readFileSync('src/content/parciales/'+name,'utf8');ids.push(...[...body.matchAll(/<Ejercicio\b[^>]*\bid="([^"]+)"/g)].map(m=>m[1]));}
 assert.deepEqual(specs.map(s=>s.id).sort(),ids.sort());
 for(const e of specs){assert.ok(e.steps.length>=3,e.id);assert.equal(new Set(e.steps.map(s=>s.id)).size,e.steps.length);for(const s of e.steps){assert.ok(s.title&&s.prompt&&s.hint&&s.explanation,`${e.id}:${s.id}`);assert.ok(s.fields.length);assert.equal(new Set(s.fields.map(f=>f.id)).size,s.fields.length);}}
});
test('todas las respuestas de los controles son compatibles y un +1 no se aprueba',()=>{
 for(const e of specs)for(const s of e.steps)for(const f of s.fields){
  const label=`${e.id}:${s.id}:${f.id}`;
  if(f.options){assert.ok(f.options.some(o=>o.value===f.expected),label);assert.ok(f.options.length>=2,label);continue;}
  assert.equal(checkExpression(f.expected,f.expected).status,'correct',label);
  assert.notEqual(checkExpression(`(${f.expected})+1`,f.expected).status,'correct',label);
 }
});
test('los finales discutidos no se usan como controles definitivos',()=>{
 for(const id of ['recup-1h10-2025-11-08#2','2s2-2025-11-07-b#2']){
  const s=specs.find(e=>e.id===id);assert.ok(s.warning,id);assert.equal(s.steps.some(s=>s.id==='resultado'),false,id);
 }
});
