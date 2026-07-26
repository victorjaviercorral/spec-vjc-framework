# Changelog — spec-vjc-framework

## [0.1.0] — 2026-07-26

### Fundacion
- Constitution v0.1 (16 principios en 5 bloques: evidencia, proceso, calidad tecnica, diseno, comunicacion).
- 8 comandos: spec-init, prd-lite, specify, prototype, design-system, plan, tasks, quality-gate.
- Plantillas: prd-lite, spec, plan, tasks, design-identity, adr, comunicacion.
- Checklists: seguridad (10 items), performance (8), UX/UI (9).
- Guia de usuario y estructura de vault documental.

### Decisiones de diseno (origen: lecciones del piloto E2E anterior)
- 1 revision de quality gate por defecto; extras solo bajo peticion explicita (antes: sin criterio de parada).
- Revision ciega en sub-agente fresco, autoevaluacion no vinculante (evidencia: 3/3 rondas infladas).
- Requisitos criticos RC-XX con trazabilidad obligatoria a requisito tecnico verificable (caso EXIF).
- Prototipo HTML autocontenido como gate visual barato previo a implementacion.
- Identidad de diseno por proyecto gobierna a las skills, prohibido look generico.
- Integracion Kanvas diferida; formato de tasks compatible.

### Pendiente
- [ ] Piloto con LegoVirtualMuseum y retro posterior.
- [ ] Integracion Kanvas.
- [ ] Primer design system reutilizable extraido de un proyecto real.
