---
description: Convierte la spec y el prototipo aprobados en un plan de implementacion por fases con definicion de hecho y skills por fase. Requiere spec y prototipo aprobados.
---

# /plan

Genera `docs/05-plan/plan.md` con `templates/plan.md`. Lee antes: spec, decisiones visuales del prototipo, checklists del plugin.

## Contenido
1. **Fases de implementacion** ordenadas por dependencia tecnica, cada una con: objetivo, requisitos de la spec que cubre (por ID), definicion de hecho verificable, y riesgos.
2. **Skills y herramientas por fase**: que skill se activa en cada fase (diseno en fases de UI, checklists de seguridad en fases de backend/API, etc.).
3. **Estrategia de verificacion**: como se comprueba cada requisito critico (RC-XX) y en que fase; smoke test en el entorno real de destino (Windows + runtime actual) como tarea explicita de la primera fase.
4. **Setup de seguridad como Fase 0**: variables de entorno, .gitignore para secretos, configuracion de permisos/RLS antes de cualquier feature.

## Reglas
- Ninguna fase sin definicion de hecho medible.
- Si el plan detecta un hueco en la spec, se corrige la spec primero.

## Cierre
Aprobacion humana del plan. Siguiente paso: `/tasks`.
