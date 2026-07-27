---
description: Revisión ciega e independiente de un artefacto (prd | spec | plan) mediante el agente quality-reviewer, sin acceso a la conversación ni a la autoevaluación. Una revisión por defecto.
argument-hint: <prd | spec | plan>
---

# /quality-gate

Ejecuta UNA revisión ciega del artefacto indicado. Rondas adicionales SOLO si el usuario las solicita explícitamente (máximo 2 extra, constitution C.12).

## Paso 0 — Precondiciones
- El artefacto debe existir y no estar vacío.
- Lee `docs/00-proyecto/project.md` para conocer etapa y exposición: determinan el umbral aplicable.
- Si la etapa es Boceto o Prototipo y el usuario no lo ha pedido explícitamente, recuérdale que este gate no es obligatorio (constitution C.15) y pide confirmación antes de gastar el tiempo.

## Protocolo
1. Lanza el agente `quality-reviewer` (Task, `subagent_type: quality-reviewer`). Recibe **únicamente**: el contenido del artefacto, la rúbrica que le corresponde y `${CLAUDE_PLUGIN_ROOT}/constitution.md`. Nunca: la conversación previa, tu autoevaluación, versiones anteriores ni el veredicto de gates anteriores.
2. El agente devuelve: puntuación 0-10 por dimensión con la banda justificada, veredicto, y hallazgos con **cita obligatoria** de la sección o línea del artefacto que los sustenta.
3. Aplica el criterio de avance de constitution C.14 según etapa y exposición del proyecto: media mínima **y** suelo por dimensión. Una dimensión por debajo de su suelo bloquea el avance aunque la media sea suficiente.
4. Anexa el resultado al final del artefacto en una sección "Quality Gate" (fecha, ronda, puntuaciones, veredicto, hallazgos y resolución de cada uno). Sin reescribir el historial.
5. Guarda además una copia en `docs/02-spec/gates/gate-<artefacto>-<YYYY-MM-DD>.md` para poder comparar entre proyectos y alimentar constitution H.34.

## Rúbricas

**PRD-lite** — D1 problema, usuarios y evidencia (fuentes con fecha, alternativas reales, "por qué ahora" del lado del problema) · D2 hipótesis, asunciones y Go/No-Go (asunción más arriesgada identificada, métricas medibles con instrumentación) · D3 alcance, requisitos críticos y exclusiones (alcance que sirve a la hipótesis, RC sin ambigüedad).

**Spec** — D1 trazabilidad (todo requisito con origen y criterio de verificación tipado; **cobertura de RC-XX < 100% ⇒ FAIL automático**) · D2 completitud técnica (arquitectura con flujo de datos, modelo de datos, contratos, estados de error) · D3 disciplinas activadas (seguridad, privacidad, accesibilidad, performance, test, operación: aplicadas ítem a ítem según la exposición del proyecto, sin ítems ignorados).

**Plan** — D1 fases con definición de hecho verificable y esqueleto desplegado primero · D2 cobertura: todo requisito de la spec asignado a una fase · D3 riesgos y verificación de RC-XX asignada a fase concreta.

## Anclas de puntuación (para reducir varianza entre revisiones)
- **3** — la dimensión está esencialmente ausente o es narrativa sin sustancia verificable.
- **5** — existe la estructura, pero con huecos que obligarían a decidir sobre la marcha durante la implementación.
- **7** — completa y utilizable; defectos localizados que no bloquean, señalables como mejoras.
- **9** — completa, verificable ítem a ítem y sin ambigüedad interpretable; un tercero podría implementarla sin preguntar.

## Reglas del veredicto
- Hallazgos de severidad crítica o alta: **sin límite de número**. Medios y bajos: máximo 5, los más relevantes.
- Hallazgo sin cita al artefacto = descartado, no cuenta.
- El autor corrige los hallazgos que acepte; los que rechace se documentan con su razón en la misma sección. No se persigue el PASS (constitution C.12).
