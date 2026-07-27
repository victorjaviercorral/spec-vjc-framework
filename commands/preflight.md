---
description: Verificación de lanzamiento contra el despliegue real. Emite veredicto GO / GO CON EXCEPCIONES / NO-GO. Obligatorio antes de publicar o anunciar (X1+).
---

# /preflight

Último control antes de que exista para el mundo. **Verifica ejecutando contra el despliegue real**, nunca contra local y nunca por inspección de código: el objetivo es comprobar lo que hay publicado, no lo que debería haberse publicado.

## Paso 0 — Precondiciones
1. Lee `docs/00-proyecto/project.md` (exposición y módulos activos) y `docs/09-lanzamiento/endurecimiento.md` si existe.
2. Necesitas la URL del despliegue real. Sin ella, detente.
3. Determina los bloques aplicables según `docs/modelo.md` §3.2. Los no aplicables se marcan N/A con razón; no se omiten en silencio.

## Bloques de verificación

Cada ítem se resuelve como `OK` (con la evidencia obtenida), `FALLO` (con qué se observó) o `N/A` (con razón). Prohibido `OK` sin evidencia ejecutada (constitution A.3).

**1 · Seguridad [X1+]**
Cabeceras reales sobre la URL publicada (HSTS, CSP, X-Content-Type-Options, Referrer-Policy, permissions-policy) · TLS válido y redirección de http a https · ningún secreto en el bundle servido ni en el repo público · rate limiting probado con ráfaga real en el endpoint más expuesto · permisos/RLS: intento de acceso a dato ajeno devuelve denegado · errores de la app sin trazas ni rutas internas · `npm audit` (o equivalente) sin vulnerabilidades altas o críticas sin justificar.

**2 · Privacidad y legal [X2+]**
Textos publicados y alcanzables: privacidad, cookies, términos · política de privacidad coherente con el mapa de datos **real** (comprueba que no promete menos ni más de lo que hace) · ningún script no esencial se carga antes del consentimiento (verifícalo con las peticiones de red en carga limpia) · flujo de borrado de cuenta **ejecutado de principio a fin** una vez · exportación de datos disponible si aplica · procesadores con DPA aceptado y región de datos anotada · logs revisados: sin datos personales.

**3 · Accesibilidad [X1+]**
Scan automatizado (axe o Lighthouse a11y) sobre las vistas principales, sin incumplimientos de nivel A · recorrido completo del flujo principal **solo con teclado**, foco siempre visible · contraste verificado en los estados reales, no solo en la paleta · zoom al 200% sin pérdida de contenido ni funcionalidad · formularios con etiqueta programática y errores asociados al campo.

**4 · Performance [X1+]**
Lighthouse móvil sobre la URL publicada frente a los presupuestos de la spec · Core Web Vitals: LCP, INP, CLS · peso real de la página principal contra el presupuesto declarado · comprobación en una conexión lenta simulada.

**5 · Operación [X1+]**
Seguimiento de errores recibiendo eventos (provoca uno de prueba y compruébalo) · alerta configurada y con destinatario real · comprobación de disponibilidad activa · **copia de seguridad restaurada al menos una vez** · procedimiento de reversión escrito y ejecutado una vez en menos de 10 minutos [X2+] · alerta de facturación configurada.

**6 · Contenido [X1+]**
Sin texto de marcador de posición ni lorem · mensajes de error revisados y comprensibles · metadatos, Open Graph y favicon · sitemap y robots coherentes con lo que quieres indexar · dominio correcto en todos los enlaces (nada apuntando a preview o localhost).

**7 · Medición**
Cada métrica del Go/No-Go dispara de verdad: provoca el evento y compruébalo en la herramienta. Sin esto, llegarás a la fecha de revisión sin datos y la decisión será una opinión.

**8 · Módulo específico [X3]**
Los ítems del módulo activado (pagos, menores, IA, categoría especial).

## Veredicto

Genera `docs/09-lanzamiento/preflight-<YYYY-MM-DD>.md` con la tabla completa y el veredicto:

- **GO** — sin fallos, o solo fallos menores ya corregidos durante el propio preflight.
- **GO CON EXCEPCIONES** — hay fallos no bloqueantes; cada uno se lista con su riesgo aceptado, responsable y fecha de corrección, y **requiere aceptación escrita del autor** en el propio documento.
- **NO-GO** — hay al menos un bloqueante. Son siempre bloqueantes: secreto expuesto, dato personal accesible por quien no debe, incumplimiento de accesibilidad de nivel A, ausencia de texto legal obligatorio en X2+, carga de scripts no esenciales sin consentimiento, y ausencia de copia de seguridad restaurable en X2+.

No suavices un NO-GO. El valor entero de este comando está en ser el único punto del framework que dice "esto todavía no sale".

## Cierre
Con GO: lanzar, y anotar en `project.md` la fecha de revisión del Go/No-Go. Siguiente comando en su momento: `/go-nogo`.
