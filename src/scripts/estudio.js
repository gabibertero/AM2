import { leer, guardar } from './progreso.js';
const validos = ['ayuda', 'repetir', 'solo'];
function registro(id) {
 try { const r=JSON.parse(leer('aprendizaje:'+id)); return r && (r.estado === '' || validos.includes(r.estado)) ? {estado:r.estado, nota:typeof r.nota==='string'?r.nota.slice(0,1200):''} : {estado:'',nota:''}; }
 catch { return {estado:'',nota:''}; }
}
// El registro de autonomía es independiente del progreso anterior.
document.querySelectorAll('[data-aprendizaje]').forEach(el=>{
 el.hidden=false;
 const id=el.closest('[data-ejercicio]').dataset.id;
 let r=registro(id);
 const nota=el.querySelector('textarea'); nota.value=r.nota;
 const pintar=()=>el.querySelectorAll('[data-autonomia]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.autonomia===r.estado));
 el.querySelectorAll('[data-autonomia]').forEach(b=>b.addEventListener('click',()=>{
  r.estado=b.dataset.autonomia; guardar('aprendizaje:'+id,JSON.stringify(r)); pintar();
  el.querySelector('[data-aprendizaje-status]').textContent='Registrado para este intento.';
 }));
 nota.addEventListener('input',()=>{r.nota=nota.value.slice(0,1200);guardar('aprendizaje:'+id,JSON.stringify(r));});
 pintar();
});
function errores(){
 let n=0;
 document.querySelectorAll('[data-error-id]').forEach(el=>{
  const r=registro(el.dataset.errorId), visible=['ayuda','repetir'].includes(r.estado) || (!r.estado && !!r.nota.trim());
  el.hidden=!visible;
  if(visible){n++;el.querySelector('[data-error-estado]').textContent=r.estado==='ayuda'?'Lo seguí con ayuda · ahora probá solo.':r.estado==='repetir'?'Necesito repetir el planteo.':'Anoté una dificultad para revisar.';el.querySelector('[data-error-nota]').textContent=r.nota;}
 });
 const vacio=document.querySelector('[data-errores-vacio]');if(vacio)vacio.hidden=n>0;
}
errores();addEventListener('pageshow',errores);addEventListener('storage',errores);
document.querySelectorAll('[data-dia]').forEach(b=>b.addEventListener('click',()=>{
 document.querySelectorAll('[data-dia]').forEach(o=>o.setAttribute('aria-pressed',o===b));
 document.querySelectorAll('[data-plan-dia]').forEach(o=>o.hidden=o.dataset.planDia!==b.dataset.dia);
}));
