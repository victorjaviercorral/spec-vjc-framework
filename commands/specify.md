---
description: Ensambla la spec técnica implementable proyectando requirements.md y aplicando las disciplinas que activa la exposición. Secciones escaladas por etapa y exposición. Artefacto terminal de definición.
---

# /specify

Produce `docs/02-spec/spec.md` con `${CLAUDE_PLUGIN_ROOT}/templates/spec.md`.

**Este comando es un ensamblador, no un redactor.** Los requisitos funcionales ya existen: los produjo `/expand` en `docs/02-spec/requirements.md`. Aquí se proyectan a la spec, se les añade la dimensión técnica (arquitectura, datos, contratos) y se aplican las disciplinas que activa la exposición. Redactar aquí un requisito funcional nuevo significa que `/expand` se ejecutó mal o no se ejecutó.

## Paso 0 — Precondiciones
1. Lee: `${CLAUDE_PLUGIN_ROOT}/constitution.md`, `${CLAUDE_PLUGIN_ROOT}/docs/modelo.md`, `docs/00-proyecto/project.md`, `docs/01-prd/prd-lite.md`, `docs/02-spec/requirements.md` y `docs/03-diseno/design-identity.md`.
2. Detente si falta el PRD-lite, o si su sección 6 (Alcance v1) está vacía: sin alcance no hay spec, hay adivinación.
3. Detente si falta `requirements.md`: indica ejecutar `/expand` antes. Sin él tendrías que redactar los requisitos funcionales tú, que es exactamente lo que este comando dejó de hacer.
4. Si la etapa es Boceto o Prototipo, este comando **no aplica**: dilo, explica que la definición ya está cubierta por el PRD corto y el prototipo, y detente.
5. Tu cupo de preguntas es **0** (constitution B.6-bis). Todo hueco se resuelve proyectando lo que ya está decidido, con `[ASUMIDO: …]` si es una decisión técnica, o `[PENDIENTE]` si es un dato.

## Paso 1 — Determina las secciones activas

Secciones **núcleo** (siempre en MVP y Producto): 1 Arquitectura · 2 Trazabilidad · 3 Modelo de datos · 4 Contratos · 5 Seguridad · 11 Flujos · 12 Fuera de alcance.

Secciones **activadas por exposición** (`docs/modelo.md` §3.2), aplicando cada checklist ítem a ítem:
| Sección | Se activa en | Checklist |
|---------|:---:|-----------|
| 5b Privacidad y datos personales | X2+ | `checklists/privacidad-gdpr.md` |
| 6 Accesibilidad | X1+ | `checklists/accesibilidad.md` |
| 7 Performance | X1+ | `checklists/performance.md` |
| 8 Estrategia de test | X2+ (recomendada en X1) | `checklists/testing.md` |
| 9 Operación y observabilidad | X1+ | `checklists/operacion.md` |
| 10 Plan de medición | siempre que exista Go/No-Go | — |
| 13 Módulo de cumplimiento | X3 | módulo correspondiente |

Anuncia al usuario qué secciones vas a producir y por qué, **antes** de escribir. Las no activadas no se incluyen vacías: se omiten.

## Paso 2 — Proyecta `requirements.md`

- **Sin renumerar.** Los `R-nn` de `requirements.md` son los definitivos. La sección 2 de la spec los recoge con su ID intacto, su origen y su capacidad. Renumerar rompería `/amend` y `/sync-check`.
- **Solo los clasificados `v1`.** Los `v2` y los descartados no entran en la spec: viven en `requirements.md` §5 con su razón. La sección 12 (Fuera de alcance) los referencia por ID, no los repite.
- **Cobertura doble, y ambas son de gate:**
  - todo `RC-XX` del PRD aparece como uno o más requisitos técnicos verificables;
  - toda capacidad `C-n` del alcance v1 tiene al menos un requisito `v1` que la realiza, o una razón escrita de por qué quedó fuera.
- **El ciclo de vida y la matriz de permisos se proyectan, no se resumen.** Los estados de cada entidad bajan a la sección 3 junto a su esquema; la matriz rol × estado se referencia desde la columna `Auth` de la sección 4. Son las dos cosas que la spec no sabía expresar antes de que existiera `requirements.md`.
- **Añade el tipo de verificación.** `requirements.md` dice qué debe ocurrir; aquí cada requisito recibe su criterio y su tipo `test-auto` / `manual` / `inspección`.

## Paso 3 — Reglas de contenido

- **Aplicación de checklist:** cada ítem se convierte en requisito con ID, o se marca `N/A` con razón escrita. No hay tercera opción.
- **Cobertura de RC-XX:** ejemplo de referencia: RC "anonimato" no puede quedarse en narrativa; baja a *"el backend elimina metadatos EXIF/GPS de toda imagen en el momento de la subida, verificable con un test que sube una imagen con GPS y comprueba su ausencia en el archivo servido"*. En X2+ todo RC-XX exige test automatizado, no verificación manual.
- **Arquitectura antes que amenazas:** la sección 1 incluye diagrama de componentes y flujo de datos (Mermaid) con los límites de confianza marcados. El STRIDE-lite de la sección 5 se hace **sobre ese diagrama**; sin diagrama no se hace STRIDE, se hace teatro.
- **Clasificación de datos:** en el modelo de datos, cada campo se marca `público` / `personal` / `categoría especial`. Es el insumo del mapa de datos personales.
- **Criterios de verificación tipados:** cada requisito indica `test-auto` / `manual` / `inspección`. En X2+, un RC-XX marcado `manual` requiere justificación escrita.
- **Flujos con Given/When/Then** en el camino principal y los alternativos: son convertibles 1:1 a tests. Reutiliza los criterios de aceptación de `requirements.md` §6 en lugar de reescribirlos; si un flujo necesita un criterio que allí no existe, es señal de que falta un requisito y se tramita hacia atrás, no se inventa aquí.
- **Plan de medición:** cada métrica del Go/No-Go del PRD baja a un requisito con ID que la instrumenta. Sin esto, llegarás a la fecha de revisión sin datos para decidir.
- **No inventes producto.** Un requisito funcional que no esté en `requirements.md` no se redacta aquí: se devuelve a `/expand`. Para lo que sí decides en esta etapa —forma técnica, contratos, estructura de datos— aplica constitution A.4-bis: decisión no evidenciada se propone marcada `[ASUMIDO: <decisión> | <razón> | <riesgo si me equivoco>]` con su `AS-nn`; un dato, una métrica, una fuente o una obligación legal que falte va como `[PENDIENTE]`, nunca como asunción.
- **Reutiliza antes de especificar:** revisa `${CLAUDE_PLUGIN_ROOT}/modules/` y propón los módulos existentes que cubran capacidades transversales (autenticación, consentimiento, subida de archivos, borrado de cuenta) en lugar de especificarlas desde cero (constitution F.28).
- **Decisiones técnicas estructurales** (stack, proveedores, trade-offs) se registran como ADR en `docs/06-decisiones/` con `${CLAUDE_PLUGIN_ROOT}/templates/adr.md`.

## Gate
Al terminar ejecuta `/quality-gate spec`. Una revisión por defecto; rondas extra solo a petición explícita del usuario. Umbrales en constitution C.14 — no los redefinas aquí.

## Cierre
Siguiente paso: `/prototype` si hay UI nueva sin validar; si no, `/plan`.
