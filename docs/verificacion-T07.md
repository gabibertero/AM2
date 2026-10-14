# Verificación T07 — exámenes anteriores (W, X, Y, Z × Tema 1 y 2)

Verificador: fidelidad MDX vs. imágenes públicas `public/escaneos/anterior-*/f*.webp` (convertidas a PNG para revisión).
Alcance: 8 MDX en `src/content/anteriores/` (`anterior-{w,x,y,z}-t{1,2}.mdx`) y 9 imágenes referenciadas (z-t1 usa además f058).

## Resultado

**OK | 0 errores**

Todos los enunciados transcriptos (símbolos, signos, exponentes, coeficientes, condiciones iniciales, palabras y numeración) coinciden con la imagen. Ver sección Dudas para observaciones que no son errores.

## Tabla de errores

| id#n | Problema | Imagen dice | MDX dice | Corrección |
|---|---|---|---|---|
| — | Sin errores detectados | — | — | — |

## Privacidad de imágenes

Se revisó el encabezado de las 9 imágenes publicadas. Los campos "APELLIDO Y NOMBRE", "LEGAJO" y "CURSO" aparecen en blanco en todas. No se ven firmas, caras ni otros datos personales. La imagen f058 (z-t1) es un recorte de la hoja sin encabezado ni datos personales.

## Dudas

1. **Fuente compartida para W-T1 y W-T2.** Ambos MDX citan `fotos-clase/2026-08-28 foto 056.jpeg`, pero las imágenes f056 de W-T1 y W-T2 son distintas (md5 distinto) y muestran TEMA 1 y TEMA 2 respectivamente. Lo mismo ocurre con la foto 054 (Y-T1 e Y-T2) y la foto 055 (Z-T1 y Z-T2). Conviene confirmar si la fuente es una sola foto que contiene las dos hojas o si el campo `fuente` debería apuntar a otra foto.
2. **Numeración de fotos inconsistente.** X-T1 cita la foto 052 y X-T2 la foto 057. Es coherente con la imagen, pero no sé si corresponde a la numeración real del archivo fotográfico.
3. **Imagen f058 de Z-T1.** Es un recorte de los ejercicios 2 y 3 del Tema 1, sin encabezado. El MDX la referencia en `<details>` del enunciado 1, que es el área con los rótulos. Confirmar si es intencional que el recorte f058 vaya en el enunciado 1 y no en el 2.
4. **Pendientes de elaboración.** Todos los `Pista` y `Paso` dicen "solución no elaborada". Esto es coherente con el estado actual, no es un error de transcripción.
