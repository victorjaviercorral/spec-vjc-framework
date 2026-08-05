---
name: quality-gate
description: Ejecuta una revisión ciega de un artefacto mediante el subagente quality-reviewer.
---

# quality-gate Skill

Este skill ejecuta una revisión imparcial y "ciega" de un artefacto (PRD, Requirements, Spec o Plan) usando un subagente aislado (`quality-reviewer`). 
Al invocar a un subagente, te aseguras de que no esté sesgado por la conversación actual ni por la autoevaluación del autor.

## Paso 0 — Precondiciones
- Verifica que el artefacto que se quiere evaluar existe en el repositorio.
- Lee `docs/00-proyecto/project.md` para conocer la Etapa y Exposición actual.
- Si la etapa es Boceto o Prototipo, el gate **no es obligatorio**. Pide confirmación al usuario antes de gastar recursos.

## Paso 1 — Ejecución (Invocación de Subagente)
Utiliza la herramienta `invoke_subagent` para lanzar al agente `quality-reviewer` (o un agente de tipo `research`).
**Prompt a enviar al subagente:**
1. Adjúntale el contenido completo del artefacto a revisar.
2. Pídele que evalúe el contenido contra las reglas de la constitución (provéele un resumen si es necesario, o indícale que lea `rules/AGENTS.md`).
3. Indícale que debe devolver:
   - Puntuación (0-10) por cada dimensión aplicable al artefacto (ver Rúbricas).
   - Veredicto final.
   - Hallazgos críticos con **cita estricta** (número de línea o sección) de dónde está el defecto. Sin cita, el hallazgo se descarta.

## Paso 2 — Interpretación y Avance
- Aplica los umbrales de la constitución:
  - MVP: Media >= 6.5, mínimo por dimensión >= 6.0
  - Producto: Media >= 7.0, mínimo >= 6.5
  - X3 (Riesgo Alto): Media >= 7.5, mínimo >= 7.0
- Si la cobertura de requisitos críticos (RC-XX) es < 100%, es un FAIL automático en Spec.

## Paso 3 — Reporte
- Anexa el resultado al final del artefacto original en una sección `## Quality Gate` con la fecha, ronda, puntuaciones, veredicto y hallazgos.
- Guarda un histórico en `docs/02-spec/gates/gate-<artefacto>-<YYYY-MM-DD>.md` para mantener el registro.

## Rúbricas (Pasar al subagente)
- **PRD**: D1 (problema, evidencia), D2 (hipótesis, asunciones, riesgos), D3 (alcance, negocio, requisitos críticos).
- **Spec**: D1 (trazabilidad, orígenes), D2 (completitud técnica), D3 (disciplinas activadas: seguridad, privacidad, a11y).
- **Plan**: D1 (fases con definición de hecho), D2 (cobertura total de spec), D3 (riesgos asignados).

Las anclas de puntuación son: 3 (ausente/narrativa), 5 (estructura pero con huecos), 7 (completa, usabilidad con defectos menores), 9 (perfecta, ejecutable sin preguntar).
