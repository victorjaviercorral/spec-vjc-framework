---
description: Convierte el PRD-lite aprobado en la spec tecnica implementable del proyecto. Artefacto terminal de definicion. Requiere prd-lite aprobado.
---

# /specify

Genera `docs/02-spec/spec.md` con `templates/spec.md`. Lee antes: `constitution.md`, `docs/01-prd/prd-lite.md`, `docs/03-diseno/design-identity.md`, `checklists/security.md` y `checklists/performance.md` del plugin.

## Contenido obligatorio de la spec

1. **Tabla de trazabilidad**: cada requisito (funcional o no funcional) con ID, origen (seccion del PRD-lite o RC-XX) y criterio de verificacion. Los REQUISITOS CRITICOS (RC-XX) del PRD-lite DEBEN aparecer como requisitos tecnicos verificables. Ejemplo de referencia: RC "anonimato" debe bajar a "el backend elimina metadatos EXIF/GPS de toda imagen en el momento del upload, verificable con test que sube una imagen con GPS y comprueba su ausencia en el archivo servido".
2. **Modelo de datos** completo (entidades, campos, tipos, relaciones, indices previstos).
3. **Contratos de API/interfaz**: endpoints u operaciones, inputs, outputs, codigos y estados de error. Todo estado de error tiene comportamiento definido.
4. **Requisitos de seguridad y privacidad**: aplica `checklists/security.md` item a item; los aplicables se convierten en requisitos con ID, los no aplicables se marcan N/A con razon. Si el valor del producto incluye privacidad/seguridad, anade modelado de amenazas STRIDE-lite (tabla amenaza -> mitigacion -> requisito).
5. **Requisitos de performance**: presupuestos concretos segun `checklists/performance.md`.
6. **Flujos de usuario** del camino principal y alternativos, referenciando pantallas del design-identity.
7. **Fuera de alcance** (hereda y amplia exclusiones del PRD-lite).

## Reglas
- No inventes decisiones de producto: si algo no esta en el PRD-lite ni lo confirma el usuario, pregunta o marca `[PENDIENTE]`.
- Decisiones tecnicas relevantes (stack, servicios, trade-offs) se registran como ADR en `docs/06-decisiones/` con `templates/adr.md`.

## Gate (obligatorio en todos los tiers)
Al terminar, ejecuta `/quality-gate spec`. 1 revision por defecto; rondas extra solo si el usuario las pide. Siguiente paso al aprobar: `/prototype`.
