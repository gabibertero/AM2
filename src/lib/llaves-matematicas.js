const hasClass = (node, name) => node?.properties?.className?.includes(name);
const containsClass = (node, name) =>
  hasClass(node, name) || (node.children ?? []).some(child => containsClass(child, name));
const textOf = (node) =>
  node.type === 'text' ? node.value : (node.children ?? []).map(textOf).join('');

export function llavesMatematicas() {
  function visit(node, visual = false) {
    const katexVisual = visual || hasClass(node, 'katex-html');
    if (katexVisual && hasClass(node, 'minner')) {
      const [opening, table] = node.children ?? [];
      const glyph = opening ? textOf(opening).trim() : '';
      if (hasClass(opening, 'mopen') && table && containsClass(table, 'mtable') &&
          (glyph === '{' || /^[\u23a7-\u23a9\u23aa]+$/u.test(glyph))) {
        node.properties.className.push('sistema-con-llave');
        opening.properties.className.push('llave-trazo');
      }
    }
    for (const child of node.children ?? []) visit(child, katexVisual);
  }
  return tree => visit(tree);
}
