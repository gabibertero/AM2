import test from 'node:test';import assert from 'node:assert/strict';
import {crearIntento,recuperarIntento,cambiarCampo,resumen,nuevoIntento,frontera} from '../src/scripts/guiado/estado.js';
const spec={signature:'guia1',steps:[{id:'radio',fields:[{id:'r',expected:'5'}]},{id:'limites',fields:[{id:'a',expected:'0'}]},{id:'resultado',fields:[{id:'v',expected:'1'}]}]};
test('editar un paso anterior invalida los siguientes sin borrar sus valores ni el uso de ayuda',()=>{
 const s=crearIntento(spec);s.records.radio={values:{r:'5'},status:'correct',help:false,hint:false,tries:1};s.records.limites={values:{a:'0'},status:'shown',help:true,hint:true,tries:0};s.records.resultado.status='correct';
 assert.equal(cambiarCampo(spec,s,0,'r','25'),true);assert.equal(frontera(spec,s),0);assert.equal(s.records.resultado.status,'pending');assert.equal(s.records.limites.values.a,'0');assert.equal(s.records.limites.help,true);
});
test('un intento nuevo conserva el historial, sin arrastrar aciertos ni ayudas',()=>{
 const s=crearIntento(spec);s.records.radio.status='correct';s.records.limites.status='shown';s.records.limites.help=true;
 assert.deepEqual(resumen(spec,s),{total:3,completados:2,solos:1,ayuda:1});const next=nuevoIntento(spec,s);
 assert.equal(next.history.length,1);assert.equal(next.history[0].steps[0].status,'correct');assert.equal(next.records.radio.status,'pending');next.records.radio.values.r='6';assert.equal(next.history[0].steps[0].values.r,undefined);
});
test('guardado válido conserva campos; guardado corrupto o versión distinta no mezcla validaciones',()=>{
 const s=crearIntento(spec);s.records.radio.values.r='5';s.records.radio.status='correct';s.current=1;
 assert.equal(recuperarIntento(spec,JSON.stringify(s)).state.current,1);
 for(const raw of ['{','null','[]',JSON.stringify({...s,signature:'vieja'})]){const r=recuperarIntento(spec,raw);assert.ok(r.message);assert.equal(r.state.records.radio.status,'pending');}
});
test('un guardado no permite saltar pasos pendientes',()=>{
 const s=crearIntento(spec);s.current=2;assert.equal(recuperarIntento(spec,JSON.stringify(s)).state.current,0);
});

test('cambiar versión archiva el intento anterior y tolera historial dañado',()=>{const old=crearIntento(spec);old.signature='otra';old.records.radio.values.r='5';old.records.radio.status='correct';old.history=[{steps:[null,{},'texto']}];const recovered=recuperarIntento(spec,JSON.stringify(old));assert.equal(recovered.state.records.radio.status,'pending');assert.equal(recovered.state.history.at(-1).steps[0].values.r,'5');});
test('un acierto guardado con valor incorrecto necesita comprobarse otra vez',()=>{const s=crearIntento(spec);s.records.radio.values.r='25';s.records.radio.status='correct';assert.equal(recuperarIntento(spec,JSON.stringify(s)).state.records.radio.status,'pending');});
