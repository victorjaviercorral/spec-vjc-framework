---
proyecto: <slug-del-proyecto>
tipo: tasks
etapa: <mvp | producto>
exposicion: <X0 | X1 | X2 | X3>
estado: borrador
version: 0.1
fecha: <YYYY-MM-DD>
tags: [spec-vjc]
---

# Tasks — <Proyecto>

**Estados:** `pendiente` · `en curso` · `hecha` (implementada, sin verificación ejecutada) · `verificada` (con evidencia registrada)

> Una tarea solo pasa a `verificada` si la columna Evidencia contiene el comando ejecutado y su resultado (constitution A.3). Sin evidencia, el estado máximo es `hecha`.

| ID | Título | Fase | Depende de | Cubre (spec §) | Criterio de verificación | Estado | Evidencia |
|----|--------|:---:|------------|----------------|--------------------------|:---:|-----------|
| XXX-01 | | 0 | — | | | pendiente | |

## Verificación de requisitos críticos

| RC | Tarea que lo verifica | Tipo | Estado |
|----|----------------------|:---:|:---:|
| RC-01 | | test-auto | |

<En X2+, todo RC-XX se verifica con test automatizado. Un RC marcado como manual requiere justificación escrita aquí.>
