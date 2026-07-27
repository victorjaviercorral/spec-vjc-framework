# Changelog — spec-vjc-framework

Versionado semántico: MAYOR = cambio incompatible de la constitution · MENOR = comandos o checklists nuevos · PARCHE = correcciones.

## [1.1.0] — 2026-07-27

Capa de documentación y uso. No cambia la constitution ni el comportamiento de ningún comando.

### Guías
- `docs/guia-usuario.md` reescrita como **referencia completa**: qué es y para quién, modelo en un minuto, prompt de arranque, referencia de los 14 comandos, preguntas frecuentes y límites conocidos declarados.
- `docs/guia-etapa.md` — guía del eje Etapa (Vía Núcleo): las 4 etapas, artefactos por etapa, recorrido comando a comando y cambio de etapa.
- `docs/guia-exposicion.md` — guía del eje Exposición (Vía Producción): los 4 niveles, triaje con sus trampas frecuentes, disciplinas activadas, `/go-live`, `/preflight` y lo mínimo exigible por nivel.
- Separadas porque los ejes tienen alcance distinto: mezclarlas era lo que hacía parecer el framework más pesado de lo que es.

### Diagramas
- `docs/diagramas.md` con 9 diagramas Mermaid: mapa general, triaje de clasificación, Vía Núcleo por etapa, Vía Producción, **relación comando ↔ artefacto** (qué lee y escribe cada comando), ciclo de vida de una tarea, ciclo de vida de un artefacto, mecánica del quality gate y bucle de aprendizaje.
- Renderizan en GitHub y en Obsidian: son la base de la futura documentación pública.

### Obsidian
- `docs/obsidian.md`: diagnóstico del entorno real, evaluación de las tres arquitecturas posibles y recomendación de **modelo híbrido de dos niveles** — `docs/` del repo como fuente de verdad versionada, más un vault hub con junctions como vista de portfolio.
- Junctions de Windows **verificadas** en el entorno real: se crean sin permisos de administrador y el contenido se lee a través del enlace. Los puntos no verificables sin abrir Obsidian quedan marcados `[PENDIENTE]` en lugar de darse por buenos (constitution D.20).
- Recomendación calibrada a lo que hay instalado: **solo plugins core**, sin depender de Dataview.

### Propiedades YAML en las plantillas
- Las 9 plantillas incorporan frontmatter (`proyecto`, `tipo`, `etapa`, `exposicion`, `estado`, `version`, `fecha`, `tags`), que habilita consultar el portfolio entero desde la búsqueda nativa de Obsidian sin plugins de comunidad.
- La consulta `"[PENDIENTE` devuelve toda la deuda de definición de todos los proyectos a la vez.

### Prompt de arranque
- `templates/prompt-arranque.md`: prompt **común a cualquier proyecto** con parte fija invariable y bloque de datos parametrizable. Incluye variante corta para Boceto·X0 y prompt de continuación entre sesiones.
- Incorpora la instrucción de discrepar si la etapa propuesta no encaja con lo descrito, y de parar tras cada comando en lugar de encadenar la ruta entera.

---

## [1.0.0] — 2026-07-27

Reescritura completa. Origen: auditoría técnica documentada en `docs/evolucion-v0.2.md`, que identificó 32 hallazgos y 3 fallos estructurales sobre la v0.1.

### Modelo — dos ejes y dos vías
- **Eje Etapa** (`Boceto` · `Prototipo` · `MVP` · `Producto`) sustituye al tier único, y absorbe el time-boxing: cada etapa lleva presupuesto de tiempo.
- **Eje Exposición** (`X0`-`X3`) gobierna, de forma independiente de la etapa, qué disciplinas de seguridad, cumplimiento y operación son obligatorias.
- **Vía Núcleo** (siempre, optimizada para velocidad) y **Vía Producción** (activada por `/go-live` al pasar a usuarios reales).
- `docs/modelo.md`: matriz de activación completa, rutas típicas y reglas de resolución de conflictos entre ejes.

### Constitution v1.0
- De 16 a 36 principios, **cada uno con su condición de activación**: un principio que la etapa o exposición no activa, no aplica, y exigirlo es una infracción.
- Nuevo bloque **B — Proporcionalidad** (anti-parálisis), con precedencia interpretativa: ningún artefacto que no cambie una decisión, regla del 20%, presupuesto declarado, contacto con la realidad cada 5 días, descartar como resultado de éxito.
- Nuevo bloque **E — Datos, cumplimiento y personas**: privacidad por diseño, accesibilidad como requisito, cumplimiento detectado en triaje, seguridad de la cadena agéntica.
- Nuevo bloque **G — Entrega y operación**: esqueleto desplegado primero, observabilidad mínima, preflight, reversibilidad.
- **A.3 Evidencia de verificación**: código generado sin verificación ejecutada se considera no escrito.
- **D.16 Reglas ejecutables, no prosa**: lo que no se puede verificar ejecutando algo es una recomendación y se etiqueta como tal.
- **D.21 La spec es un documento vivo**: los cambios se tramitan, no se editan a mano.
- Umbrales de gate unificados en C.14 como fuente única, con **suelo por dimensión** (antes: promedio simple, que permitía compensar una dimensión floja).

### Comandos
- Nuevos: `/implement` (disciplina de ejecución tarea a tarea con evidencia), `/go-live` (transición a Vía Producción), `/preflight` (veredicto GO/NO-GO contra el despliegue real), `/go-nogo` (cierre del experimento con descarte barato), `/amend` (cambio de requisito con impacto y ADR), `/sync-check` (reconciliación spec ↔ código).
- Reescritos: `spec-init` (triaje de 2 ejes), `prd-lite` (modo corto y completo), `specify` (secciones activadas por exposición), `plan`, `tasks`, `prototype`, `quality-gate`, `design-system`.
- Todos con **paso 0 de precondiciones** y rutas `${CLAUDE_PLUGIN_ROOT}` resolubles (antes: rutas relativas que el agente tenía que adivinar).

### Agente
- `agents/quality-reviewer.md`: el revisor ciego pasa de ser una instrucción improvisada en cada invocación a un agente definido, de solo lectura, con anclas de puntuación y cita obligatoria por hallazgo.

### Checklists
- Nuevas: `privacidad-gdpr.md` (20 ítems), `accesibilidad.md` (23, WCAG 2.2 AA), `testing.md` (13), `operacion.md` (18), `seguridad-agentica.md` (14), `contenido-seo.md` (17).
- Ampliadas: `seguridad.md` (10 → 20 ítems: cabeceras, sesiones, cadena de suministro, rotación de secretos), `performance.md` (Core Web Vitals completos), `uxui.md` (accesibilidad extraída a su propia checklist).
- Todas con **activación declarada por nivel de exposición**.

### Plantillas
- `prd-lite.md`: nuevas secciones de usuarios/JTBD, alternativas, asunciones con la más arriesgada marcada, y **alcance v1** — el hueco que hacía que el PRD no dijera nunca qué se construye. Modo corto para etapa Prototipo.
- `spec.md`: nuevas secciones de arquitectura con flujo de datos (insumo del STRIDE), accesibilidad, estrategia de test, operación, plan de medición y módulo de cumplimiento. Clasificación de datos por campo.
- Nuevas: `project.md`, `decision-continuidad.md`.
- `tasks.md`: columna **Evidencia** obligatoria para el estado `verificada`.

### Repo
- `LICENSE` (MIT). Antes: sin licencia, lo que impedía legalmente su uso por terceros pese a publicarse como marketplace.
- Versión unificada en `plugin.json` como fuente única (antes: v0.1 / 0.1.0 / v0.1.1 conviviendo).
- Email personal retirado de `marketplace.json`.
- `modules/` para capacidades transversales reutilizables entre proyectos.

### Pendiente
- [ ] Piloto de la v1.0 con LegoVirtualMuseum y retro posterior.
- [ ] Capa de enforcement con hooks (`PreToolUse`) y scripts de validación: hoy las precondiciones son instrucciones al agente, no controles deterministas. Es el siguiente salto real (constitution D.16).
- [ ] Evals del framework: proyectos de referencia con artefactos golden para poder afirmar con dato que una versión mejora a la anterior.
- [ ] Primer módulo reutilizable y primer design system extraídos de un proyecto real.
- [ ] Integración con Kanvas.

---

## [0.1.0] — 2026-07-26

### Fundación
- Constitution v0.1 (16 principios en 5 bloques).
- 8 comandos: spec-init, prd-lite, specify, prototype, design-system, plan, tasks, quality-gate.
- Plantillas: prd-lite, spec, plan, tasks, design-identity, adr, comunicacion.
- Checklists: seguridad (10 ítems), performance (8), UX/UI (9).
- Guía de usuario y estructura de vault documental.

### Decisiones de diseño (origen: lecciones del piloto E2E anterior)
- 1 revisión de quality gate por defecto; extras solo bajo petición explícita.
- Revisión ciega en sub-agente fresco, autoevaluación no vinculante (evidencia: 3/3 rondas infladas).
- Requisitos críticos RC-XX con trazabilidad obligatoria a requisito técnico verificable (caso EXIF).
- Prototipo HTML autocontenido como gate visual barato previo a implementación.
- Identidad de diseño por proyecto gobierna a las skills; prohibido el look genérico.
