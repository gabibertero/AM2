import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const parciales = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/parciales' }),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    comision: z.string(),
    fecha: z.string(), // tal cual figura en el examen
    tipo: z.enum(['práctico', 'teórico', 'recuperatorio']),
    tema: z.string().optional(),
    fuente: z.string(), // ruta del PDF relativa a la carpeta de la materia
    paginasEnunciado: z.string(),
    paginasResolucion: z.string(),
    orden: z.number(),
    unidades: z.array(z.string()),
  }),
});

const simple = (base: string) =>
  defineCollection({
    loader: glob({ pattern: '*.mdx', base }),
    schema: z.object({ titulo: z.string(), orden: z.number(), unidades: z.array(z.string()).default([]) }),
  });

const machetes = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/machetes' }),
  schema: z.object({
    slug: z.string(),
    titulo: z.string(),
    unidad: z.enum(['U4', 'U5', 'U8', 'U9']),
    orden: z.number(),
    ejerciciosOficiales: z.array(z.string().regex(/^[\w-]+#\d+$/)),
    fuentes: z.array(z.string()).min(1),
  }),
});

export const collections = {
  parciales,
  teoria: simple('./src/content/teoria'),
  machetes,
};
