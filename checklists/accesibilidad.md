# Checklist de accesibilidad (WCAG 2.2 AA)

**Activación:** obligatoria en X1, X2 y X3. Referencia normativa en la UE: European Accessibility Act y EN 301 549.
**Aplicación:** cada ítem se convierte en requisito con ID, o se marca `N/A` con razón escrita.

**Regla de bloqueo:** los incumplimientos de **nivel A** bloquean el lanzamiento. Los de **AA** se registran con plan y fecha de corrección (constitution E.23).

## Percepción

1. **Contraste** ≥ 4,5:1 en texto normal, ≥ 3:1 en texto grande y en componentes de interfaz (bordes de campos, iconos con significado). Verificado en los **estados reales**: hover, disabled, error, sobre imagen.
2. **Nunca solo color** para transmitir información: los errores, estados y series de datos llevan además texto, icono o forma.
3. **Alternativas textuales:** `alt` descriptivo en imágenes con contenido; `alt=""` en las decorativas. Iconos que actúan como botón, con nombre accesible.
4. **Contenido no textual con alternativa:** vídeo con subtítulos, audio con transcripción.

## Operación

5. **Todo lo interactivo es alcanzable y operable con teclado**, en orden lógico y sin trampas de foco. Se comprueba recorriendo el flujo principal entero solo con teclado.
6. **Foco siempre visible** y con contraste suficiente. Nunca `outline: none` sin sustituto equivalente.
7. **Objetivos táctiles ≥ 24×24 px** (criterio 2.5.8 de WCAG 2.2), con separación suficiente entre objetivos contiguos.
8. **Sin dependencia de gestos complejos**: toda acción que requiera arrastrar o gesto multipunto tiene alternativa de un solo puntero (criterio 2.5.7).
9. **Contenido superpuesto no oculta el foco** (criterio 2.4.11): barras fijas, banners de cookies y chats no pueden tapar el elemento enfocado.
10. **Tiempo:** sin límites de tiempo arbitrarios; si los hay, se pueden extender. Nada parpadea más de 3 veces por segundo.
11. **`prefers-reduced-motion` respetado** en toda animación no esencial.

## Comprensión

12. **Estructura semántica real:** landmarks (`header`, `nav`, `main`, `footer`), jerarquía de encabezados sin saltos, listas como listas, tablas con cabeceras. Un `div` con `onclick` no es un botón.
13. **Formularios:** etiqueta programáticamente asociada a cada campo (no solo placeholder), instrucciones antes del campo, errores descritos en texto y vinculados al campo que los origina, y autocompletado declarado en datos personales.
14. **Autenticación accesible** (criterio 3.3.8): sin pruebas cognitivas irresolubles; permitir pegar la contraseña y el uso de gestores de contraseñas.
15. **Idioma declarado** en `<html lang>` y en los fragmentos en otro idioma.
16. **Zoom al 200%** sin pérdida de contenido ni funcionalidad, y sin scroll horizontal a 320px de ancho.

## Robustez

17. **HTML nativo primero; ARIA solo cuando el nativo no llega.** ARIA mal puesto es peor que ausente.
18. **Componentes personalizados con rol, nombre, estado y comportamiento de teclado** esperados por su patrón (menú, diálogo, pestañas, combobox).
19. **Cambios dinámicos anunciados**: regiones activas para notificaciones, resultados de búsqueda y errores que aparecen sin recargar.

## Verificación (no basta con implementar)

20. **Automatizada:** axe-core o Lighthouse accesibilidad sobre todas las vistas principales, integrado en CI cuando exista.
21. **Manual de teclado:** recorrido completo del flujo principal sin ratón.
22. **Con lector de pantalla:** el flujo principal, al menos una vez, con NVDA o VoiceOver. Es la prueba que detecta lo que ninguna herramienta automática ve.
23. **Declaración de accesibilidad** publicada si el proyecto entra en el ámbito del European Accessibility Act.
