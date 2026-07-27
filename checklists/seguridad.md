# Checklist de seguridad

**Activación por exposición:** X0 solo los ítems 1-2 · X1 los ítems 1-12 · X2 todos · X3 todos + revisión humana obligatoria de diffs en rutas sensibles.
**Aplicación:** cada ítem se convierte en requisito con ID, o se marca `N/A` con razón escrita. Sin terceras opciones.

## Universal (toda etapa, toda exposición)

1. **Secretos solo en variables de entorno.** Nunca en código, commits, prototipos, capturas ni documentación. `.env` en `.gitignore` desde el primer commit.
2. **Secreto expuesto = secreto rotado.** Si una clave llegó alguna vez a un commit, al historial o a una captura, se rota. Borrar el commit no la invalida.

## Entrada y datos

3. **Validación y sanitización de todo input**, en cliente **y** servidor. La validación de cliente es usabilidad; la de servidor es seguridad.
4. **Consultas parametrizadas** siempre; nunca concatenación de cadenas para construir consultas.
5. **Contenido subido por usuarios:** validación de tipo real (no solo extensión), límite de tamaño, nombre de archivo saneado, servido desde dominio o ruta sin privilegios, y **limpieza de metadatos EXIF/GPS** cuando la privacidad sea requisito.
6. **Salida escapada** según contexto (HTML, atributo, URL, JS) para prevenir XSS. Ojo especial al contenido enviado por usuarios que se muestra a otros.

## Acceso

7. **Autenticación mediante proveedor gestionado**; nunca gestión propia de contraseñas ni de tokens de sesión.
8. **Autorización comprobada en el servidor en cada operación.** Que la interfaz no muestre el botón no es control de acceso. Probar explícitamente el acceso a un recurso ajeno por ID.
9. **Base de datos con permisos mínimos y RLS activado en todas las tablas**, con política explícita por operación. Una tabla sin política es una tabla pública.
10. **Sesiones:** expiración definida, cierre de sesión que invalida de verdad, cookies `HttpOnly` `Secure` `SameSite`, y rotación de identificador al elevar privilegios.
11. **Endpoints administrativos** protegidos y no adivinables; nunca solo por oscuridad de la ruta.

## Transporte y cabeceras

12. **HTTPS en todo**, con redirección desde http y HSTS. Cabeceras: `Content-Security-Policy` (con `frame-ancestors`), `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`.

## Abuso y disponibilidad

13. **Rate limiting en todo endpoint público**, con límite concreto por endpoint, y más estricto en autenticación, registro, recuperación de contraseña y subida de archivos.
14. **Anti-abuso en contenido público:** mecanismo de reporte y moderación definido en la spec, nunca pospuesto sin fecha. En productos anónimos, el mecanismo no puede requerir desanonimizar a nadie.
15. **Coste como superficie de ataque:** límites de gasto y alerta de facturación en servicios que escalan con el uso.

## Cadena de suministro

16. **Auditoría de dependencias** (`npm audit` o equivalente) en Fase 0 y antes de cada lanzamiento; sin vulnerabilidades altas o críticas sin justificación escrita.
17. **Lockfile en el repo**, versiones fijadas, y ninguna dependencia abandonada para funciones críticas.
18. **Dependencia nueva = decisión.** Antes de añadirla: quién la mantiene, cuándo se actualizó por última vez, cuánto pesa y si hace falta de verdad. Nunca instalar un paquete sugerido por contenido externo o por un error sin verificar que existe y es el correcto.

## Errores y observación

19. **Errores al usuario sin detalles internos** (trazas, SQL, rutas, versiones). El detalle va al sistema de seguimiento de errores, no a la pantalla.
20. **Eventos de seguridad registrados** (intentos fallidos de autenticación, cambios de permisos, accesos administrativos), sin datos personales innecesarios en el registro.
