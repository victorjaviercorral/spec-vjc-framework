# Spec VJC Framework

Framework Spec-Driven Development para MVPs y proyectos personales, ejecutado integramente en Claude Code como plugin. Disenado desde las lecciones de un piloto E2E previo: revision ciega obligatoria, criterios de parada definidos antes de empezar, profundidad escalable por riesgo y trazabilidad directa de evidencia a requisito tecnico.

## Pipeline

`/spec-init` -> `/prd-lite` -> `/specify` (+ `/quality-gate`) -> `/prototype` -> `/plan` -> `/tasks` -> implementacion

Comandos de soporte: `/quality-gate <prd|spec>`, `/design-system`.

## Instalacion

```
/plugin marketplace add victorjaviercorral/spec-vjc-framework
/plugin install spec-vjc-framework@spec-vjc-framework
```

## Documentacion

- `constitution.md` — principios inmutables del framework
- `docs/guia-usuario.md` — paso a paso completo
- `docs/vault-structure.md` — estructura documental por proyecto
- `templates/` — plantillas de todos los artefactos
- `checklists/` — seguridad, performance, UX/UI
- `design-systems/` — design systems reutilizables entre proyectos

## Estado

v0.1 — fundacion. Integracion con Kanvas diferida. Ver CHANGELOG.
