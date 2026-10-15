// Única fuente de datos editables del Home.
// Fecha del 2º parcial en formato 'aaaa-mm-dd'. null = todavía no se conoce → el Home muestra "Fecha a confirmar".
export const FECHA_PARCIAL = null;

// Unidades del programa 2025 (U11 Fourier queda fuera). `cae`: qué se vio en parciales prácticos.
export const UNIDADES = [
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
};
