---
description: Descompone el plan aprobado en tareas ejecutables con IDs, dependencias y criterio de verificacion. Requiere plan aprobado.
---

# /tasks

Genera `docs/05-plan/tasks.md` con `templates/tasks.md`.

## Reglas
1. Una tarea = una unidad implementable y verificable en una sesion corta. Formato: `ID | titulo | fase | depende de | requisitos que cubre (IDs de spec) | criterio de verificacion`.
2. IDs con prefijo del proyecto (ej. LVM-01).
3. Las tareas de requisitos criticos (RC-XX) incluyen su verificacion como parte de la propia tarea, no como tarea aparte opcional.
4. Toda tarea referencia seccion de la spec por numero; prohibido parafrasear la spec dentro de la tarea.
5. Integracion con Kanvas: DIFERIDA en v0.1 del framework. Manten el formato de tabla estable, sera el input del futuro volcado a tablero.

## Cierre
El usuario aprueba las tareas. La implementacion se ejecuta en sesiones de Claude Code tarea a tarea, actualizando el estado en la propia tabla (pendiente / en curso / hecha / verificada).
