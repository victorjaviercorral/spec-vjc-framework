# Checklist de contenido, idioma y SEO

**Activación:** X1, X2 y X3 (todo lo que sea público). En X0 no aplica.
**Aplicación:** cada ítem se convierte en requisito con ID, o se marca `N/A` con razón escrita.

## Contenido como producto

1. **Catálogo de mensajes de error** escrito antes de implementar, no improvisado campo a campo. Cada mensaje dice qué pasó y qué hacer.
2. **Textos de estados vacíos** redactados con intención: es donde el usuario nuevo decide si entiende el producto.
3. **Sin marcadores de posición** en ninguna entrega: ni lorem, ni "TODO", ni "texto pendiente" visible.
4. **Voz y tono coherentes** con `design-identity.md` en toda la interfaz, incluidos correos transaccionales y textos legales cuando el registro lo permita.

## Idioma

5. **Decisión de idiomas tomada antes de implementar.** Añadir un segundo idioma después de codificar cuesta mucho más que preverlo; si hay duda razonable de que llegará, se estructura desde el principio.
6. **Sin cadenas incrustadas en el código** si hay más de un idioma previsto.
7. **Formatos localizados:** fechas, números, moneda y orden alfabético según el idioma, no según el del desarrollador.
8. **`lang` correcto** en el documento y en los fragmentos en otro idioma (comparte objetivo con accesibilidad).

## Indexación

9. **Metadatos por página:** `title` único y descriptivo, `meta description`, y URL canónica.
10. **Open Graph y tarjeta de Twitter** con imagen: determina cómo se ve cada vez que alguien comparta un enlace, que suele ser el primer contacto con el producto.
11. **`sitemap.xml` y `robots.txt` coherentes** con lo que realmente quieres indexar. Verificar que no queda un `noindex` de la fase de desarrollo, ni lo contrario: contenido privado indexable.
12. **Datos estructurados** (schema.org) donde aporten, sin inventar marcado que no corresponda al contenido real.
13. **URLs legibles y estables.** Si una URL pública cambia, se deja redirección permanente.
14. **Favicon e iconos** en los tamaños que usan navegadores y sistemas móviles.

## Derechos

15. **Licencias verificadas** de fuentes tipográficas, iconos, imágenes y componentes de terceros, incluida la licencia de uso web y comercial cuando aplique.
16. **Propiedad del contenido subido por usuarios** aclarada en los términos: qué licencia te ceden, qué puedes hacer con ello, y qué ocurre cuando borran su cuenta.
17. **Atribuciones requeridas** presentes donde la licencia las exija.
