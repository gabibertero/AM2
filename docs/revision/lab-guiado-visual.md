# Revisión visual del laboratorio guiado

Probé el laboratorio en Chromium a 1366 × 900 y 390 × 844, con el tema claro y el oscuro. La tarea era entrar desde cero, elegir un parcial, comprobar una respuesta, pedir ayuda y retomar el intento.

## Recorrido observado

- El selector muestra 12 parciales. Cambiar de parcial actualiza sus ejercicios y carga el paso correspondiente. El enunciado oficial se distingue de la actividad guiada y conserva el enlace al parcial completo.
- Una respuesta incorrecta identifica el campo que requiere revisión y mantiene bloqueado el avance. Una respuesta correcta habilita el siguiente paso. La pista y el desarrollo se muestran al pedirlos. Volver al paso anterior conserva lo escrito.
- Recargar mantiene el paso activo y los aciertos. Un enlace anterior con tipo y semilla conserva ambos datos al abrir el generador.
- El formulario y las ayudas se acomodan en las tres configuraciones probadas. No observé errores de ejecución ni desplazamiento horizontal de toda la página. En celular, la figura se desplaza dentro de su propio recuadro.
- Medí el contraste de pregunta, campo, etiqueta, botón de comprobación, botón de pista y consejo de escritura en ambos temas. La muestra da entre 5,13:1 y 13,12:1. En celular, los botones principales miden 46 px de alto y los campos, 53 px. El consejo de escritura usa 11,2 px y podría ganar legibilidad con un tamaño mayor.

## Hallazgos enviados al equipo

| Prioridad | Hallazgo | Recomendación |
| --- | --- | --- |
| Media | En una pantalla de 390 × 844, el primer paso empieza a unos 1537 px y «Comprobar este paso» a 1948 px. En escritorio, el primer paso empieza a 940 px. El usuario tiene que pasar por encabezado, selectores, índice y enunciado antes de encontrar la práctica. | Agregar «Ir al paso actual» junto a los selectores y trasladar el foco al título del paso. |
| Media | En el recuperatorio del 5/7/2025, el segundo ejercicio dice «Recta y parábola con total cero» en el selector y vuelve a anticipar el valor en la advertencia. | Usar un título neutro y explicar la relación entre resultado nulo y conservatividad después de comprobar el último paso. |
| Baja | El recuadro de la figura tiene 322 px para un dibujo de 560 px en celular. El aviso de desplazamiento es útil, pero el recuadro carece de nombre y de un punto de foco explícito. | Darle nombre de región y `tabindex="0"`, siguiendo el patrón del dibujo en la página de parciales. |

## Revalidación del build final

Los tres hallazgos quedaron resueltos. «Ir al paso 1» lleva el foco al título del paso, la figura es una región con nombre y foco de teclado, y el selector del recuperatorio usa «Curvilínea sobre recta y parábola» sin anticipar el resultado.

Repetí la prueba en Chromium, en escritorio y en móvil de 390 px con ambos temas. En los ejercicios 1 y 3 del parcial del 31/10, las llaves abarcan las dos filas del sistema. «Explicame paso a paso» abre la primera ayuda y pasa a decir «Siguiente paso». El formulario «Entregá tus resultados» aparece después del ejercicio 5. Durante el simulacro, «Ir a la entrega» conserva el reloj. Al entregar, el formulario reconoce un acierto, un resultado para revisar y cuatro campos vacíos, y el cronómetro se detiene. No hubo errores de ejecución ni desplazamiento horizontal de página.
