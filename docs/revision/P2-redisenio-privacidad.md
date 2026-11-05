# Revisión independiente de privacidad y seguridad · práctico P2

Fecha: 04/11/2026. Rol: security-reviewer de ECC. Alcance: cambios locales del rediseño, foto aportada y notas de aprendizaje. No se modificó implementación.

## Resultado

**APROBADO: 0 críticos, 0 altos, 0 medios detectados en el alcance revisado.**

## Evidencia

- La foto original se conserva en `../parciales/2do-parcial/2026-10-31-1H10-A.png`, fuera del repositorio del sitio. No aparece entre archivos nuevos de Git ni hay copia idéntica por SHA256/tamaño en `public/` o `dist/`.
- El nuevo MDX transcribe contenido académico; no reproduce los campos personales de apellido, legajo o firma. La fuente se cita como nombre de archivo, sin enlace público a la foto completa.
- Las únicas imágenes nuevas publicables son los tres diagramas propios `practico-2026-{volumen,cono,curva}.svg`. Revisé sus textos y marcado: representan regiones, ecuaciones, límites y recorrido; no contienen datos personales, scripts, manejadores de eventos ni recursos externos.
- Las imágenes del nuevo parcial apuntan solo a esos diagramas. El HTML generado no carga la foto original ni expone su ruta temporal del portapapeles.
- Las notas de aprendizaje se limitan a 1200 caracteres, se guardan bajo `am2:v1:aprendizaje:` y se recuperan con tolerancia a errores. Se muestran mediante `textContent` o `textarea.value`, sin interpolación en `innerHTML`.
- Prueba real en Chromium: una nota con marcado `<img ... onerror=...>` se mostró como texto literal, sin insertar imágenes ni ejecutar código. Al abrir y recargar la página de errores no se registraron solicitudes automáticas externas.
- No hay llamadas de red ni envío automático de notas en el módulo de aprendizaje. La integración de IA existente requiere un clic explícito y toma enunciado, modelo y respuesta escrita en su campo propio; las notas nuevas quedan fuera de esa selección.
- El manifiesto de organización contiene fecha, explicación de reversión, nombres/rutas relativas y SHA256. No incluye contenido de documentos, secretos ni datos personales nuevos.
- No se introdujeron autenticación, endpoints, dependencias ni credenciales. Esta revisión no incluyó una nueva auditoría de dependencias, al no haber cambios de paquetes y estar acotada a privacidad/entrada de notas.

## Límite

La evaluación se refiere al estado local revisado. La foto original debe continuar fuera de los archivos que se publiquen. No se autorizó ni ejecutó publicación remota durante esta revisión.
