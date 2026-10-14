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

export const collections = {
  parciales,
  teoria: simple('./src/content/teoria'),
  machetes: simple('./src/content/machetes'),
};
