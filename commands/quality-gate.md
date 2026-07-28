---
description: Revisión ciega e independiente de un artefacto (prd | requirements | spec | plan) mediante el agente quality-reviewer, sin acceso a la conversación ni a la autoevaluación. Una revisión por defecto.
argument-hint: <prd | requirements | spec | plan>
---

# /quality-gate

Ejecuta UNA revisión ciega del artefacto indicado. Rondas adicionales SOLO si el usuario las solicita explícitamente (máximo 2 extra, constitution C.12).

## Paso 0 — Precondiciones
- El artefacto debe existir y no estar vacío.
- Lee `docs/00-proyecto/project.md` para conocer etapa y exposición: determinan el umbral aplicable.
- Si la etapa es Boceto o Prototipo y el usuario no lo ha pedido explícitamente, recuérdale que este gate no es obligatorio (constitution C.15) y pide confirmación antes de gastar el tiempo.
- `requirements` **no tiene gate obligatorio** en ninguna etapa: se revisa dentro del gate de la spec. Si el usuario lo pide de forma explícita, ejecútalo con su rúbrica; si no, no lo ofrezcas (constitution C.15 y B.5).

## Protocolo
1. Lanza el agente `quality-reviewer` (Task, `subagent_type: quality-reviewer`). Recibe **únicamente**: el contenido del artefacto, la rúbrica que le corresponde y `${CLAUDE_PLUGIN_ROOT}/constitution.md`. Nunca: la conversación previa, tu autoevaluación, versiones anteriores ni el veredicto de gates anteriores.
2. El agente devuelve: puntuación 0-10 por dimensión con la banda justificada, veredicto, y hallazgos con **cita obligatoria** de la sección o línea del artefacto que los sustenta.
3. Aplica el criterio de avance de constitution C.14 según etapa y exposición del proyecto: media mínima **y** suelo por dimensión. Una dimensión por debajo de su suelo bloquea el avance aunque la media sea suficiente.
4. Anexa el resultado al final del artefacto en una sección "Quality Gate" (fecha, ronda, puntuaciones, veredicto, hallazgos y resolución de cada uno). Sin reescribir el historial.
5. Guarda además una copia en `docs/02-spec/gates/gate-<artefacto>-<YYYY-MM-DD>.md` para poder comparar entre proyectos y alimentar constitution H.34.

## Rúbricas

**PRD-lite** — D1 problema, usuarios y evidencia (fuentes con fecha, alternativas reales con fuente verificada o `[PENDIENTE]`, "por qué ahora" del lado del problema) · D2 hipótesis, asunciones, riesgos y Go/No-Go (asunción más arriesgada identificada, riesgo principal declarado, métricas medibles con instrumentación) · D3 alcance, negocio, requisitos críticos y exclusiones (alcance que sirve a la hipótesis, RC sin ambigüedad; en MVP+ modelo de monetización y economía unitaria presentes, y toda mecánica de cobro que haya que construir reflejada como capacidad o excluida con razón).

En MVP y Producto, un dato de competidor **sin fuente y fecha** es hallazgo alto: es la forma más frecuente de que una decisión de negocio se tome sobre memoria del modelo.

**Requirements** (solo a petición explícita) — D1 densidad y cobertura (toda capacidad `C-n` expandida; capacidades de complejidad media con ≥8 requisitos, ≥2 de comportamiento no deseado y ≥1 de estado; sin relleno ubicuo) · D2 disciplina de las lentes (lentes activas correctas para la etapa y exposición declaradas; **toda lente cerrada con su razón escrita** — un cierre silencioso es el defecto grave de este artefacto) · D3 trazabilidad y corte (todo `R-nn` con origen `E-n`/`RC-XX`/`C-n`/`AS-nn`; todo lo fuera de v1 con razón; todo AC citando al menos un `R-nn`).

**Spec** — D1 trazabilidad (todo requisito con origen y criterio de verificación tipado; **cobertura de RC-XX < 100% ⇒ FAIL automático**; toda capacidad `C-n` del alcance v1 con requisito o razón escrita) · D2 completitud técnica (arquitectura con flujo de datos, modelo de datos con estados, contratos, estados de error) · D3 disciplinas activadas (seguridad, privacidad, accesibilidad, performance, test, operación: aplicadas ítem a ítem según la exposición del proyecto, sin ítems ignorados).

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
