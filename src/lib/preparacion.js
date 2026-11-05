// Solo el práctico. Fechas del encabezado, no del nombre del archivo.
export const esP2 = (e) => e.data.tipo !== 'teórico' && e.data.unidades.some((u) => ['U4', 'U5', 'U8', 'U9'].includes(u));
const fecha = (s) => { const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(s); return m ? Number(m[3] + m[2].padStart(2, '0') + m[1].padStart(2, '0')) : 0; };
export const ordenarParciales = (a,b) => fecha(b.data.fecha) - fecha(a.data.fecha) || a.data.orden - b.data.orden || a.id.localeCompare(b.id);
export const TIPOS = [
 {n:'01', titulo:'Volumen', pista:'De las superficies a los límites.', slug:'volumen-polares-cilindricas', tema:'Integrales múltiples', color:'coral'},
 {n:'02', titulo:'Integral triple', pista:'Coordenadas, jacobiano e integración.', slug:'integral-triple-cilindricas-esfericas', tema:'Integrales múltiples', color:'coral'},
 {n:'03', titulo:'Curvilínea + Green', pista:'Recorré cada tramo y comprobá.', slug:'curvilinea-por-definicion', tema:'Curvas y campos', color:'azul'},
 {n:'04', titulo:'EDO de primer orden', pista:'Reconocé el método antes de empezar.', slug:'edo-lineal', tema:'Ecuaciones diferenciales', color:'verde'},
 {n:'05', titulo:'EDO de segundo orden', pista:'Homogénea, particular y resonancia.', slug:'edo2-coeficientes-indeterminados', tema:'Ecuaciones diferenciales', color:'violeta'},
];
export const DIAS = [
 {id:'hoy', dia:'Miércoles 4', tiempo:'3 horas', titulo:'Empezá con acompañamiento', pasos:[['20 min','Prepará la base','Despejes, derivadas e integrales inmediatas. Detectá qué operación te frena.'],['60 min','EDO de segundo orden','Ejercicio 5 del 31/10: seguí el machete, un paso a la vez.'],['10 min','Descansá','Levantate de la mesa antes de seguir.'],['65 min','Volumen e integral triple','Ejercicios 1 y 2: entendé los límites y el jacobiano. Priorizá plantearlos bien.'],['25 min','Probá sin mirar','Cerrá la ayuda y reconstruí un planteo. Guardá dónde te trabaste.']]},
 {id:'jueves', dia:'Jueves 5', tiempo:'6–7 h con pausas', titulo:'Completá los cinco tipos', pasos:[['90 min','Curvilínea y Green','Ejercicio 3 del 31/10: intersecciones, tramos, orientación y verificación.'],['90 min','EDO de primer orden','Ejercicio 4 del 31/10: ordená la ecuación y resolvé la lineal.'],['90 min','Rehacé el parcial de tu curso','Intentá los cinco planteos con las ayudas cerradas.'],['90 min','Seguí con junio de 2026','Tema A y después B: homogénea, lineal y repetición de los otros métodos.'],['Opcional','Avanzá si los planteos salen','Continuá en orden. Si seguís trabado, repetí primero el ejercicio con menos ayuda.']]},
 {id:'viernes', dia:'Viernes 6', tiempo:'6–7 h con pausas', titulo:'Pasá del ejemplo al examen', pasos:[['120 min','Simulacro sin ayudas','Usá el próximo parcial de la secuencia. Papel, sin tablas ni calculadora.'],['90 min','Corregí con calma','Separá fallas de planteo, método, cuentas y tiempo.'],['90 min','Atacá dos dificultades','Volvé al machete preciso y después repetí sin mirar.'],['120 min','Segundo intento','Otro parcial si podés empezar solo; si no, rehacé los ejercicios fallados.']]},
];
