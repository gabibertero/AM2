// Agrega "Ver en tamaño completo" (abre el SVG) después de cada figura; el CSS lo muestra solo en celular.
document.querySelectorAll('img[src*=".svg"]').forEach((img) => {
  if (img.nextElementSibling?.classList.contains('fig-full')) return;
  const a = document.createElement('a');
  a.className = 'fig-full';
  a.href = img.getAttribute('src');
  a.target = '_blank';
  a.rel = 'noopener';
  a.textContent = 'Ver en tamaño completo';
  img.after(a);
});
