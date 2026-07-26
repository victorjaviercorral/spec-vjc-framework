# Checklist de seguridad (aplicar en /specify y /plan)

Cada item: se convierte en requisito con ID, o se marca N/A con razon escrita. Sin terceras opciones.

1. Secretos y API keys SOLO en variables de entorno; nunca en codigo, commits ni prototipos HTML. `.env` en `.gitignore` desde Fase 0.
2. Rate limiting en todo endpoint publico (definir limite concreto por endpoint).
3. Validacion y sanitizacion de todo input de usuario (cliente Y servidor).
4. Contenido subido por usuarios: validacion de tipo/tamano, y limpieza de metadatos (EXIF/GPS) cuando la privacidad sea requisito.
5. Base de datos: permisos minimos / RLS activado (en Supabase: RLS en TODAS las tablas, politicas explicitas por operacion).
6. Autenticacion: solo mediante proveedor gestionado (Supabase Auth u equivalente); nunca gestion propia de contrasenas.
7. HTTPS en todo; cabeceras de seguridad basicas (CSP, X-Content-Type-Options, Referrer-Policy).
8. Dependencias: auditadas (`npm audit` o equivalente) en Fase 0 y antes de cada release; sin dependencias abandonadas para funciones criticas.
9. Errores: mensajes al usuario sin filtrar detalles internos (stack traces, SQL, rutas).
10. Anti-abuso en apps con contenido publico anonimo: mecanismo minimo de reporte/moderacion definido en la spec, no pospuesto sine die.
