---
description: Descompone el plan aprobado en tareas ejecutables con IDs, dependencias, criterio de verificación y columna de evidencia.
---

# /tasks

Produce `docs/05-plan/tasks.md` con `${CLAUDE_PLUGIN_ROOT}/templates/tasks.md`.

## Paso 0 — Precondiciones
Requiere `docs/05-plan/plan.md` aprobado (o la lista simple de pasos si la etapa es Prototipo). Sin plan, detente.

## Reglas

1. **Una tarea = una unidad implementable y verificable en una sesión corta.** Si no puedes escribir su criterio de verificación en una línea, es demasiado grande: pártela.
2. **IDs con prefijo del proyecto** (`LVM-01`, `LVM-02`) y estables: no se renumeran nunca, aunque se eliminen tareas. Los IDs se citan en commits.
3. **Referencia a la spec por número de sección**, nunca parafraseada. La tarea apunta a la spec; la spec es la fuente. Parafrasear es cómo se crean dos verdades distintas.
4. **Los RC-XX llevan su verificación dentro de la propia tarea**, no como tarea opcional aparte. En X2+, esa verificación es un test automatizado.
5. **Columna Evidencia obligatoria.** Una tarea solo pasa a `verificada` cuando esa columna contiene el comando ejecutado y su resultado (constitution A.3). Estados: `pendiente` · `en curso` · `hecha` · `verificada`.
6. **Dependencias explícitas.** Si una tarea depende de otra, se declara; `/implement next` las respeta.
7. **Orden de riesgo:** dentro de una fase, primero lo que puede invalidar el enfoque.
8. **Formato de tabla estable** — es el input del futuro volcado a tablero (integración diferida).

## Cierre
El usuario aprueba las tareas. A partir de aquí, la implementación se ejecuta con `/implement` tarea a tarea, nunca en bloque.
