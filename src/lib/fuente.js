// Muestra una fuente sin carpeta ni extensión: "teoria/Apuntes/05-X 2015.pdf p.4" -> "05-X 2015 p.4". Sirve para texto y para HTML.
export const limpiarFuente = (s) =>
  String(s).replace(/\b(?:teoria|parciales|anteriores|fotos-clase)\/(?:[^/<>;:,]*\/)*/g, '').replace(/\.(?:pdf|jpe?g|png)\b/gi, '');
