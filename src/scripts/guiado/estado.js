import {checkExpression} from './validar.js';
// Intentos guiados separados del progreso y de las notas anteriores.
const pendientes = (spec) => Object.fromEntries(spec.steps.map(s => [s.id, { values:{}, status:'pending', help:false, hint:false, tries:0 }]));
export function crearIntento(spec) {
 return {schema:1, signature:spec.signature, current:0, started:new Date().toISOString(), records:pendientes(spec), history:[]};
}
function registroValido(r, step) {
 if(!r || !['pending','correct','shown'].includes(r.status))return null;
 const values={};
 for(const f of step.fields)if(typeof r.values?.[f.id]==='string')values[f.id]=r.values[f.id].slice(0,512);
 const checked=r.status==='correct' && !step.fields.every(f=>typeof values[f.id]==='string' && (f.options?values[f.id]===f.expected:checkExpression(values[f.id],f.expected).status==='correct'))?'pending':r.status;
 return {values,status:checked,help:r.help===true||r.status==='shown',hint:r.hint===true,tries:Number.isSafeInteger(r.tries)&&r.tries>=0?r.tries:0};
}
function archivoSeguro(h) {
 if(!h || !Array.isArray(h.steps))return null;
 const steps=h.steps.filter(s=>s&&typeof s.id==='string').map(s=>({id:s.id.slice(0,100),status:['correct','shown','pending'].includes(s.status)?s.status:'pending',help:s.help===true,values:Object.fromEntries(Object.entries(s.values&&typeof s.values==='object'?s.values:{}).filter(([,v])=>typeof v==='string').map(([k,v])=>[k.slice(0,80),v.slice(0,512)]))}));
 return {started:typeof h.started==='string'?h.started.slice(0,64):'',steps,total:steps.length,solos:steps.filter(s=>s.status==='correct'&&!s.help).length};
}
export function recuperarIntento(spec, raw) {
 const fresh=crearIntento(spec);
 if(raw==null)return {state:fresh,message:''};
 try {
  const old=JSON.parse(raw);
  if(!old || old.schema!==1)throw new Error('versión de guardado');
  const history=Array.isArray(old.history)?old.history.map(archivoSeguro).filter(Boolean):[];
  if(old.signature!==spec.signature){
   const previous=archivoSeguro({started:old.started,steps:Object.entries(old.records||{}).map(([id,r])=>({id,...(r&&typeof r==='object'?r:{})}))});
   fresh.history=[...history,...(previous?.steps.length?[previous]:[])];
   return {state:fresh,message:'La guía cambió. El intento anterior quedó en el historial y empezás uno actualizado. Tus otros progresos se conservan.'};
  }
  const records={};
  for(const s of spec.steps){const r=registroValido(old.records?.[s.id],s);if(!r)throw new Error('registro');records[s.id]=r;}
  const current=Number.isInteger(old.current)?Math.max(0,Math.min(old.current,spec.steps.length-1)):0;
  const state={...fresh,current,records,started:typeof old.started==='string'?old.started:fresh.started,history};
  state.current=Math.min(state.current,frontera(spec,state));
  return {state,message:''};
 }catch{return {state:fresh,message:'No pudimos recuperar este intento. Podés empezar de nuevo sin afectar tus otros progresos.'};}
}
export function frontera(spec,state) {
 const i=spec.steps.findIndex(s=>state.records[s.id].status==='pending');
 return i===-1?spec.steps.length-1:i;
}
export function cambiarCampo(spec,state,index,field,value) {
 const step=spec.steps[index],r=state.records[step.id];
 if(!step.fields.some(f=>f.id===field))return false;
 const next=String(value).slice(0,512);
 if(r.values[field]===next)return false;
 const invalida=r.status!=='pending';
 r.values[field]=next;
 for(let j=index;j<spec.steps.length;j++)state.records[spec.steps[j].id].status='pending';
 return invalida;
}
export function resumen(spec,state) {
 const rs=spec.steps.map(s=>state.records[s.id]);
 return {total:rs.length,completados:rs.filter(r=>r.status!=='pending').length,solos:rs.filter(r=>r.status==='correct'&&!r.help).length,ayuda:rs.filter(r=>r.status!=='pending'&&r.help).length};
}
export function nuevoIntento(spec,state) {
 const fresh=crearIntento(spec);
 const summary={started:state.started,finished:new Date().toISOString(),...resumen(spec,state),steps:spec.steps.map(s=>({id:s.id,...state.records[s.id],values:{...state.records[s.id].values}}))};
 fresh.history=[...state.history,summary];
 return fresh;
}
