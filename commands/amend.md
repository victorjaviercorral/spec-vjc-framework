---
description: Tramita un cambio de requisito sobre un artefacto ya aprobado, con análisis de impacto, versionado y ADR. Evita que spec y código diverjan en silencio.
argument-hint: <prd | spec> "<qué cambia>"
---

# /amend

El cambio de requisito a mitad de camino es lo normal, no la excepción. Este comando existe para que ese cambio quede tramitado en vez de aplicado a mano sobre el Markdown, que es como la documentación empieza a mentir.

## Paso 0 — Precondiciones
- El artefacto debe existir y estar aprobado (con gate anexado o aprobación explícita del usuario registrada).
- Lee `docs/00-proyecto/project.md` para conocer etapa y exposición.
- En etapa Boceto o Prototipo: este comando es innecesario. Edita el documento directamente y dilo. Tramitar cambios en un prototipo es sobre-proceso (constitution B.5).

## Paso 1 — Enunciar el cambio
En una frase: qué se elimina, se añade o se modifica, y **por qué ahora** (nuevo dato, hallazgo de implementación, cambio de contexto, error de definición original). La razón importa: alimenta el aprendizaje del framework.

## Paso 2 — Análisis de impacto
Rastrea y presenta antes de tocar nada:

| Ámbito | Qué revisar | Resultado |
|--------|-------------|-----------|
| Requisitos | Qué IDs se ven afectados, incluidos los que dependían del modificado | |
| RC-XX | ¿Toca algún requisito crítico de valor? Si sí, el cambio es de severidad alta por definición | |
| Modelo de datos | Campos, migraciones necesarias, datos existentes afectados | |
| Contratos | Rupturas de compatibilidad para consumidores ya desplegados | |
| Tareas | Tareas pendientes que cambian, y **tareas ya verificadas que quedan invalidadas** | |
| Código | Ficheros que implementan el requisito afectado | |
| Exposición | ¿El cambio altera qué datos se tratan o quién accede? Si sí ⇒ re-triaje y posible `/go-live` | |
| Presupuesto | Coste del cambio contra lo que queda del presupuesto de la etapa | |

Si el impacto excede lo que queda de presupuesto, dilo y plantea la alternativa: recortar otro alcance, o aplazar el cambio al siguiente ciclo.

## Paso 3 — Aplicar
1. Actualiza el artefacto y **sube su versión** en la cabecera (`0.1` → `0.2`), con una línea de historial al pie: fecha, qué cambió, referencia al ADR.
2. Actualiza tareas: las invalidadas vuelven a `pendiente` y pierden su evidencia (una verificación de un requisito que ya no existe no vale). Añade las nuevas.
3. Registra un ADR en `docs/06-decisiones/` con el contexto, la decisión, las alternativas descartadas y las consecuencias aceptadas.
4. Si el cambio toca un `RC-XX` o el modelo de datos en X2+, ofrece re-ejecutar `/quality-gate` sobre el artefacto modificado. No lo impongas.

## Regla
Un cambio de requisito nunca se aplica primero en el código y luego en la spec. Siempre en este orden: spec, tareas, código. El orden inverso es exactamente la deriva que este comando previene.
