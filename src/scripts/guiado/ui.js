import katex from 'katex';
import {checkExpression} from './validar.js';
import {recuperarIntento,frontera,cambiarCampo,resumen,nuevoIntento} from './estado.js';
const root=document.querySelector('[data-guiado]');
const source=document.getElementById('guiado-catalogo');
if(root&&source)iniciar(root,JSON.parse(source.textContent));

function iniciar(root,catalog){
 const base=import.meta.env.BASE_URL;
 const params=new URLSearchParams(location.search);
 // Los enlaces antiguos del generador conservan su destino y semilla.
 if(params.has('tipo')||params.has('semilla')){location.replace(`${base}laboratorio/generador/${location.search}`);return;}
 const $=name=>root.querySelector(`[data-g-${name}]`);
 const crear=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;};
 const memoria=new Map();
 let exam=catalog.find(e=>e.id===params.get('parcial'))||catalog[0],spec,state,feedback=null;
 const clave=id=>'am2:v1:lab-guiado:'+id;
 const almacenamiento=$('storage');
 const mensajeStorage=(text)=>{almacenamiento.textContent=text;};
 function guardar(){
  memoria.set(spec.id,state);
  try{localStorage.setItem(clave(spec.id),JSON.stringify(state));$('guardado').textContent='Tu intento se guarda automáticamente en este navegador.';}
  catch{mensajeStorage('El navegador no permite guardar este intento. Podés continuar y cambiar de ejercicio, pero se perderá al cerrar o recargar.');$('guardado').textContent='Este intento continúa en memoria, sin guardado persistente.';}
 }
 function cargar(id){
  spec=exam.exercises.find(e=>e.id===id)||exam.exercises[0];
  feedback=null;
  mensajeStorage('');
  if(memoria.has(spec.id))state=memoria.get(spec.id);
  else{
   let raw=null;
   try{raw=localStorage.getItem(clave(spec.id));}catch{mensajeStorage('El almacenamiento está bloqueado. Podés practicar, pero el intento no se conservará al recargar.');}
   const recovered=recuperarIntento(spec,raw);state=recovered.state;
   if(recovered.message)mensajeStorage(recovered.message);
  }
  $('ejercicio').value=spec.id;
  const url=new URL(location.href);url.searchParams.set('parcial',exam.id);url.searchParams.set('ejercicio',spec.id.split('#')[1]);
  try{history.replaceState(null,'',url.pathname+url.search);}catch{/* La práctica funciona aunque el historial no esté disponible. */}
  // Solo HTML académico generado en build. Las respuestas del usuario siempre se muestran como texto.
  $('enunciado').innerHTML=spec.officialHtml;
  $('nombre').textContent=`· Ejercicio ${spec.id.split('#')[1]}`;
  $('fuente').textContent=`Fuente: ${spec.source.split('/').pop()}, p.${spec.page}.`;
  $('original').href=spec.href;
  $('warning').hidden=!spec.warning;$('warning').textContent=spec.warning||'';
  pintar();guardar();
 }
 function opcionesEjercicio(){
  $('ejercicio').replaceChildren(...exam.exercises.map(e=>{const o=crear('option',`${e.id.split('#')[1]}. ${e.title}`);o.value=e.id;return o;}));
 }
 function vistaMatematica(value,el){
  if(!value.trim()){el.textContent='';return;}
  const tex=value.replace(/\bpi\b/g,'\\pi').replace(/\*/g,'\\cdot ').replace(/\bexp\(/g,'\\exp(').replace(/\bln\(/g,'\\ln(').replace(/\bsin\(/g,'\\sin(').replace(/\bcos\(/g,'\\cos(').replace(/sqrt\(([^()]+)\)/g,'\\sqrt{$1}').replace(/\^(-?\d+)/g,'^{$1}').replace(/\bC(\d+)/g,'C_{$1}');
  try{katex.render(tex,el,{throwOnError:true,trust:false,strict:'ignore',maxExpand:100});}
  catch{el.textContent=value;}
 }
 function progreso(){
  const s=resumen(spec,state);
  $('contador').textContent=`${s.completados} de ${s.total} pasos completados`;
  $('barra').style.setProperty('--p',`${100*s.completados/s.total}%`);
  const limite=frontera(spec,state);
  $('indice').replaceChildren(...spec.steps.map((step,i)=>{
   const r=state.records[step.id],li=crear('li'),b=crear('button');b.type='button';b.disabled=i>limite;
   if(i===state.current)b.setAttribute('aria-current','step');
   b.append(crear('span',r.status==='correct'?'✓':r.status==='shown'?'↗':String(i+1),'g-indice-num'),crear('span',step.title));
   const lab=r.status==='pending'?'pendiente':r.help?'completado con ayuda':'comprobado sin ayuda';b.setAttribute('aria-label',`Paso ${i+1}: ${step.title}, ${lab}`);
   b.addEventListener('click',()=>{state.current=i;feedback=null;pintar();guardar();$('titulo').focus();});li.append(b);return li;
  }));
  const r=state.records[spec.steps[state.current].id];
  $('siguiente').disabled=r.status==='pending';$('siguiente').textContent=state.current===spec.steps.length-1?'Ver mi resumen →':'Siguiente paso →';
  $('atras').disabled=state.current===0;
  $('ir').textContent=`Ir al paso ${state.current+1} ↓`;
  $('final').hidden=s.completados!==s.total;
  $('resumen').textContent=`${s.solos} de ${s.total} controles resueltos sin ayudas. ${s.ayuda} completados con pista o desarrollo. Si usaste ayuda, repetir sin mirar es el próximo objetivo.`;
  $('pista').setAttribute('aria-expanded',String(r.hint));$('mostrar').setAttribute('aria-expanded',String(r.status==='shown'));
  historial();
 }
 function historial(){
  const cont=$('historial');cont.replaceChildren();
  const ol=crear('ol');
  for(const s of spec.steps){const r=state.records[s.id];if(r.status==='pending')continue;
   const li=crear('li');li.append(crear('strong',s.title),crear('p',r.help?'Con ayuda':'Comprobado sin ayuda'));
   for(const f of s.fields)li.append(crear('p',`${f.label}: ${r.values[f.id]||'Respuesta mostrada en la explicación'}`));ol.append(li);
  }
  if(!ol.children.length)cont.append(crear('p','Todavía no completaste pasos de este intento.'));else cont.append(ol);
  if(state.history.length){cont.append(crear('h3','Intentos anteriores'));
   for(const h of state.history){const details=crear('details');details.append(crear('summary',`${h.solos??0}/${h.total??spec.steps.length} sin ayuda · ${typeof h.started==='string'?h.started.slice(0,10):'Intento anterior'}`));
    for(const step of h.steps){const p=crear('p');p.textContent=`${step.id}: ${step.status==='correct'&&!step.help?'comprobado sin ayuda':step.status==='pending'?'pendiente':'con ayuda'}. ${Object.values(step.values||{}).filter(v=>typeof v==='string').join(' · ')}`;details.append(p);}cont.append(details);
   }
  }
 }
 function pintar(){
  const step=spec.steps[state.current],r=state.records[step.id];
  $('numero').textContent=`PASO ${state.current+1} DE ${spec.steps.length}`;$('titulo').textContent=step.title;$('pregunta').textContent=step.prompt;
  $('campos').replaceChildren(...step.fields.map(f=>{
   const box=crear('div',undefined,'g-campo'),label=crear('label',f.label),id=`g-field-${f.id}`;label.htmlFor=id;
   const input=crear(f.options?'select':'input');input.id=id;input.name=f.id;input.required=true;
   if(f.options){const empty=crear('option','Elegí una opción');empty.value='';input.append(empty);for(const o of f.options){const op=crear('option',o.label);op.value=o.value;input.append(op);}}
   else{input.type='text';input.maxLength=512;input.autocomplete='off';input.spellcheck=false;input.placeholder=f.placeholder||'Escribí tu cuenta o resultado';input.setAttribute('aria-describedby',id+'-formato');}
   input.value=r.values[f.id]||'';
   box.append(label,input);
   const formato=crear('small',f.options?'':'Usá ^ para potencias, * para multiplicar y pi para π.');formato.id=id+'-formato';box.append(formato);
   const preview=crear('div',undefined,'g-preview');if(!f.options){preview.setAttribute('aria-label','Vista previa de tu cuenta');box.append(preview);vistaMatematica(input.value,preview);}
   input.addEventListener(f.options?'change':'input',()=>{
    const invalida=cambiarCampo(spec,state,state.current,f.id,input.value);
    feedback=invalida?{status:'unsupported',message:'Cambiaste este paso. Volvé a comprobarlo; los pasos siguientes también necesitan una nueva comprobación.'}:null;
    if(!f.options)vistaMatematica(input.value,preview);
    pintarFeedback();$('explicacion').hidden=true;if(!r.hint)$('figura').hidden=true;progreso();guardar();
   });return box;
  }));
  $('hint').hidden=!r.hint;$('hint').textContent=step.hint;
  $('explicacion').hidden=r.status==='pending';
  explicacion(step,r);
  $('figura').hidden=!step.figure || (!r.hint && r.status==='pending');
  if(step.figure){$('img').src=base+'figuras/'+step.figure;$('img').alt=step.figureAlt||'Esquema didáctico para este paso. Los límites y el recorrido se explican en el texto.';}else $('img').removeAttribute('src');
  pintarFeedback();progreso();
 }
 function explicacion(step,r){
  const target=$('explicacion');target.replaceChildren(crear('strong','Cómo se hace'),crear('p',step.explanation));
  if(r.status==='shown'){
   const ul=crear('ul');for(const f of step.fields){const label=f.options?.find(o=>o.value===f.expected)?.label||f.expected;ul.append(crear('li',`${f.label}: ${label}`));}target.append(ul,crear('p','Esta respuesta se mostró con ayuda. Podés continuar y después rehacer el ejercicio sin mirar.'));
  }
 }
 function pintarFeedback(){
  const el=$('feedback');el.hidden=!feedback;if(feedback){el.dataset.result=feedback.status;el.textContent=feedback.message;}
  const r=state.records[spec.steps[state.current].id];$('intentos').textContent=r.tries?`${r.tries} comprobación${r.tries===1?'':'es'} en este paso`:'';
 }
 $('form').addEventListener('submit',ev=>{
  ev.preventDefault();const step=spec.steps[state.current],r=state.records[step.id];
  if(step.fields.some(f=>!r.values[f.id]?.trim())){feedback={status:'unsupported',message:'Completá todos los campos de este paso antes de comprobar.'};pintarFeedback();return;}
  r.tries++;
  const resultados=step.fields.map(f=>({field:f,...(f.options?{status:r.values[f.id]===f.expected?'correct':'incorrect',message:'Revisá la opción elegida.'}:checkExpression(r.values[f.id],f.expected))}));
  const fallo=resultados.find(v=>v.status==='incorrect'),noVerificable=resultados.find(v=>v.status==='unsupported');
  if(fallo){
   const frecuente=(step.commonErrors||[]).find(e=>e.field===fallo.field.id&&checkExpression(r.values[e.field],e.value).status==='correct');
   feedback={status:'incorrect',message:`Revisá «${fallo.field.label}». ${frecuente?.message||'Todavía no coincide. Revisá el signo, los paréntesis y la operación. Podés pedir una pista para destrabarte.'}`};
  }else if(noVerificable)feedback={status:'unsupported',message:`No pude comprobar «${noVerificable.field.label}» en esta forma. ${noVerificable.message||'Revisá cómo escribir las cuentas o pedí el desarrollo.'} Esto no significa que tu respuesta esté mal.`};
  else{
   r.status='correct';feedback={status:'correct',message:r.help?'¡Coincide! Este paso quedó comprobado con ayuda. Podés continuar.':'¡Coincide! Comprobaste este paso sin abrir ayudas. Podés continuar.'};explicacion(step,r);$('explicacion').hidden=false;if(step.figure)$('figura').hidden=false;
  }
  pintarFeedback();progreso();guardar();
 });
 $('pista').addEventListener('click',()=>{
  const step=spec.steps[state.current],r=state.records[step.id];r.help=true;r.hint=true;$('hint').hidden=false;$('hint').textContent=step.hint;if(step.figure)$('figura').hidden=false;progreso();guardar();
 });
 $('mostrar').addEventListener('click',()=>{
  const step=spec.steps[state.current],r=state.records[step.id];r.help=true;r.status='shown';
  explicacion(step,r);$('explicacion').hidden=false;if(step.figure)$('figura').hidden=false;feedback={status:'unsupported',message:'Desarrollo mostrado con ayuda. Hacé la cuenta en tu hoja antes de continuar.'};pintarFeedback();progreso();guardar();
 });
 $('siguiente').addEventListener('click',()=>{
  const r=state.records[spec.steps[state.current].id];if(r.status==='pending')return;
  if(state.current<spec.steps.length-1){state.current++;feedback=null;pintar();guardar();$('titulo').focus();}
  else{$('final').hidden=false;$('final').scrollIntoView({behavior:'smooth',block:'center'});root.querySelector('#guiado-final-t').focus();}
 });
 $('ir').addEventListener('click',()=>{$('titulo').focus();$('titulo').scrollIntoView({block:'start'});});
 $('atras').addEventListener('click',()=>{if(state.current>0){state.current--;feedback=null;pintar();guardar();$('titulo').focus();}});
 $('rehacer').addEventListener('click',()=>{state=nuevoIntento(spec,state);feedback=null;pintar();guardar();$('titulo').focus();});
 $('proximo').addEventListener('click',()=>{
  const todos=catalog.flatMap(e=>e.exercises.map(x=>({exam:e,spec:x}))),i=todos.findIndex(x=>x.spec.id===spec.id),next=todos[i+1];
  if(!next){feedback={status:'correct',message:'Llegaste al final de la ruta. Podés volver a elegir un ejercicio para repetirlo.'};pintarFeedback();return;}
  exam=next.exam;$('parcial').value=exam.id;opcionesEjercicio();cargar(next.spec.id);$('titulo').focus();
 });
 $('parcial').value=exam.id;$('parcial').addEventListener('change',()=>{exam=catalog.find(e=>e.id===$('parcial').value);opcionesEjercicio();cargar(exam.exercises[0].id);});
 $('ejercicio').addEventListener('change',()=>cargar($('ejercicio').value));
 opcionesEjercicio();
 const initial=exam.exercises.find(e=>e.id===params.get('ejercicio')||e.id.split('#')[1]===params.get('ejercicio'));
 cargar(initial?.id);root.hidden=false;
}
