// Única fuente de datos editables del Home.
// Fecha del 2º parcial en formato 'aaaa-mm-dd'. null = todavía no se conoce → el Home muestra "Fecha a confirmar".
export const FECHA_PARCIAL = '2026-10-31';
export const FECHA_FINAL = null; // final de diciembre: null = "fecha a confirmar"
export const NOMBRE_MATERIA = 'Análisis Matemático II';
export const FECHA_RECUP = '2026-11-07'; // recuperatorio del 2º parcial

// Instancias. DECISIÓN DE ESQUEMA: no hay campo `instancia` en el contenido; se DERIVA de la unidad
// (U1–U3 → p1, U4–U10 → p2), así no se puede desincronizar. Un examen con `unidades` mezcladas cuenta como p1 solo si
// TODAS sus unidades son de p1. Rutas de P1 siguen el patrón actual (/parciales/p1-…/, /teoria/u01/).
export const INSTANCIAS = [
  { i: 'p1', nombre: '1º parcial', rango: 'U1–U3' },
  { i: 'p2', nombre: '2º parcial', rango: 'U4–U10' },
];
export const instanciaDeUnidad = (u) => (['U1', 'U2', 'U3'].includes(u) ? 'p1' : 'p2');
export const instanciaDeUnidades = (us) => (us?.length && us.every((u) => instanciaDeUnidad(u) === 'p1') ? 'p1' : 'p2');

// Unidades del programa 2025 (U11 Fourier queda fuera). `cae`: qué se vio en parciales prácticos.
export const UNIDADES = [
  { u: 'U1', titulo: 'Funciones de varias variables', cae: 'practico', slug: 'u01' },
  { u: 'U2', titulo: 'Derivadas y diferenciales', cae: 'practico', slug: 'u02' },
  { u: 'U3', titulo: 'Máximos y mínimos', cae: 'practico', slug: 'u03' },
  { u: 'U4', titulo: 'Integrales múltiples', cae: 'practico', slug: 'u04' },
  { u: 'U5', titulo: 'Integrales curvilíneas', cae: 'practico', slug: 'u05' },
  { u: 'U6', titulo: 'Funciones y campos vectoriales', cae: 'tentativo', slug: 'u06' },
  { u: 'U7', titulo: 'Computación numérica', cae: 'sin-material', slug: 'u07' },
  { u: 'U8', titulo: 'EDO de primer orden', cae: 'practico', slug: 'u08' },
  { u: 'U9', titulo: 'EDO de orden superior', cae: 'practico', slug: 'u09' },
  { u: 'U10', titulo: 'Ecuaciones en derivadas parciales', cae: 'tentativo', slug: 'u10' },
];
export const CAE = {
  practico: 'Cae en el práctico',
  tentativo: 'Tentativa',
  'sin-material': 'Sin material',
  proximamente: 'Próximamente',
};
