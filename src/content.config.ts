import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { UNIDADES_MACHETES } from './unidades-machetes';

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

const anteriores = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/anteriores' }),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    fecha: z.string().optional(), // sin fecha en las fotos
    tipo: z.enum(['práctico', 'teórico', 'recuperatorio']),
    tema: z.string(),
    fuente: z.string(), // ruta de la foto principal relativa a la carpeta de la materia
    fotos: z.array(z.string()).min(1), // nombres de public/escaneos/<id>/<foto>.webp
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
    unidad: z.enum(UNIDADES_MACHETES),
    orden: z.number(),
    ejerciciosOficiales: z.array(z.string().regex(/^[\w-]+#\d+$/)),
    fuentes: z.array(z.string()).min(1),
  }),
});

// Preguntero teórico: un MDX por unidad con varias <Pregunta> (ver components/Pregunta.astro).
const preguntas = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/preguntas' }),
  schema: z.object({
    titulo: z.string(),
    unidad: z.enum(['U4', 'U5', 'U6', 'U7', 'U8', 'U9', 'U10']),
    orden: z.number(),
  }),
});

export const collections = {
  preguntas,
  anteriores,
  parciales,
  teoria: defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/teoria' }),
    schema: z.object({
      unidad: z.enum(['U4', 'U5', 'U6', 'U7', 'U8', 'U9', 'U10']),
      titulo: z.string(),
      orden: z.number(),
      estado: z.enum(['borrador', 'revisado']),
      alcance: z.enum(['confirmado', 'tentativo', 'sin material']),
      fuentes: z.array(z.string()).min(1),
    }),
  }),
  machetes,
};
