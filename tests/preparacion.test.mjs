import test from 'node:test';import assert from 'node:assert/strict';
import { ordenarParciales } from '../src/lib/preparacion.js';
const e=(id,fecha,orden=1)=>({id,data:{fecha,orden}});
test('orden por fecha real y empate por variante, sin depender del orden manual',()=>{
 const lista=[e('sin','no figura'),e('2025','20/11/2025',-99),e('b','27/06/2026',2),e('nuevo','31/10/2026',50),e('a','27/06/2026',1)].sort(ordenarParciales);
 assert.deepEqual(lista.map(x=>x.id),['nuevo','a','b','2025','sin']);
});
