---
description: Convierte la spec aprobada en un plan de implementación por fases, con esqueleto desplegado primero, definición de hecho verificable y encaje en el presupuesto de la etapa.
---

# /plan

Produce `docs/05-plan/plan.md` con `${CLAUDE_PLUGIN_ROOT}/templates/plan.md`.

## Paso 0 — Precondiciones
1. Lee `docs/00-proyecto/project.md` (etapa, exposición, presupuesto, entorno), `docs/02-spec/spec.md`, las decisiones visuales del prototipo si existen, y las checklists activas.
2. Etapa Boceto: no aplica, dilo y detente. Etapa Prototipo: produce una **lista simple de pasos**, no un plan por fases; la ceremonia aquí no compensa (constitution B.5).
3. Sin spec aprobada en MVP+, detente.

## Estructura del plan

**Fase 0 — Setup y seguridad.** Variables de entorno, `.env` en `.gitignore`, permisos y RLS antes de cualquier funcionalidad, auditoría inicial de dependencias, y smoke test en el entorno objetivo declarado (constitution D.20).

**Fase 1 — Esqueleto desplegado (constitution G.29).** Recorrido extremo a extremo mínimo, desplegado en el entorno **real** de producción. Una sola pantalla que lea y escriba de verdad ya sirve. Objetivo: validar el pipeline de despliegue cuando cambiarlo todavía es barato, no la semana del lanzamiento.

**Fases 2..N — Funcionalidad**, ordenadas por dependencia técnica y, a igualdad de dependencia, **por riesgo descendente**: lo que puede tumbar el proyecto va primero, no lo que es cómodo de construir. Cada fase con:
- Objetivo en una frase.
- Requisitos que cubre (IDs de la spec).
- Checklists activas en esa fase.
- Riesgos y qué haría falta para descartarlos.
- **Definición de hecho verificable**: qué comando, test o comprobación demuestra que la fase está cerrada. Ninguna fase sin ella.

## Comprobaciones obligatorias antes de cerrar el plan

1. **Cobertura**: todo requisito de la spec está asignado a alguna fase. Los que no encajen se reportan; no se dejan huérfanos.
2. **Verificación de RC-XX**: tabla `RC → cómo se verifica → en qué fase`. En X2+, con test automatizado.
3. **Encaje en presupuesto**: suma la estimación de las fases y compárala con el presupuesto de la etapa (`project.md`). Si no cabe, **presenta el recorte de alcance como propuesta concreta** —qué fases o requisitos salen— en vez de estirar el plazo (constitution B.7). Estirar exige decisión explícita del usuario, registrada.
4. **Contacto con la realidad**: ninguna fase dura más de 5 días laborables sin producir algo visible o usable (constitution B.8). Si alguna lo hace, pártela.

## Reglas
- Si el plan destapa un hueco en la spec, se corrige la spec primero (`/amend` si ya estaba aprobada).
- Gate de plan: opcional, solo si el usuario lo pide (`/quality-gate plan`).

## Cierre
Aprobación humana del plan. Siguiente paso: `/tasks`.
