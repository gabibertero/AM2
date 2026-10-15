import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';

// remark-math 6 lee `$$…$$` en un solo renglón como fórmula en línea: si un párrafo es solo eso, lo pasa a bloque.
function displayEnUnRenglon() {
  return (tree, file) => {
    const fuente = String(file.value);
    const recorrer = (nodo) => (nodo.children ?? []).forEach((hijo, i) => {
      const [m] = hijo.type === 'paragraph' && hijo.children.length === 1 ? hijo.children : [];
      if (m?.type === 'inlineMath' && fuente.slice(m.position?.start.offset, m.position?.start.offset + 2) === '$$') {
        nodo.children[i] = { type: 'math', value: m.value, position: hijo.position, data: { hName: 'pre', hChildren: [{ type: 'element', tagName: 'code', properties: { className: ['language-math', 'math-display'] }, children: [{ type: 'text', value: m.value }] }] } };
      } else recorrer(hijo);
    });
    recorrer(tree);
  };
}

export default defineConfig({
  site: 'https://gabibertero.github.io',
  base: '/AM2/',
  output: 'static',
  integrations: [mdx()],
  markdown: {
    processor: unified({ remarkPlugins: [remarkMath, displayEnUnRenglon], rehypePlugins: [rehypeKatex] }),
  },
});
