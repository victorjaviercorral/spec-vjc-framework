---
description: Reconcilia spec y código. Detecta requisitos sin implementar, funcionalidad sin requisito y tareas marcadas como hechas sin evidencia.
---

# /sync-check

Auditoría de deriva. Un agente introduce divergencia entre documentación y código con mucha más facilidad que una persona, porque avanza más rápido y no vuelve atrás a mirar. Este comando es el contrapeso.

Se recomienda al cerrar cada fase, antes de `/go-live` y antes de cualquier `/preflight`.

## Paso 0 — Precondiciones
- Requiere spec (`docs/02-spec/spec.md`). En Boceto o Prototipo no aplica: dilo y detente.

## Comprobaciones

**1 · Requisitos sin implementación**
Por cada requisito de la tabla de trazabilidad, busca su implementación en el código. Reporta los que no aparecen por ningún sitio. Distingue "no implementado todavía" (tiene tarea pendiente) de "perdido" (nadie lo tiene asignado) — el segundo es el peligroso.

**2 · Funcionalidad sin requisito**
Recorre el código buscando comportamiento con efecto sobre el usuario o sobre datos que no responde a ningún requisito: endpoints, campos de base de datos, integraciones externas, flags, dependencias nuevas. Cada hallazgo es una de tres cosas y hay que decidir cuál: requisito que faltaba documentar, alcance colado que hay que eliminar, o riesgo silencioso.
Presta atención especial a lo que recoge o expone datos personales sin estar en el mapa de datos de la spec: eso es un incumplimiento, no un descuido.

**3 · Verificaciones fantasma**
Tareas en `tasks.md` con estado `verificada` y columna de evidencia vacía o genérica. Devuélvelas a `hecha` y repórtalas (constitution A.3).

**4 · Cobertura de requisitos críticos**
Por cada `RC-XX`: ¿existe su test? ¿pasa hoy? Ejecútalos. Un RC sin test que pase es el fallo más caro que puede tener el proyecto, porque es exactamente lo que destruye la propuesta de valor.

**5 · Coherencia de exposición**
¿El código trata datos personales que el nivel de exposición declarado no contempla? ¿Hay integración nueva con un tercero que no está en la lista de procesadores? Si sí: la exposición real es mayor que la declarada ⇒ `/go-live`.

## Salida

Informe con hallazgos ordenados por severidad, cada uno con ruta de fichero y línea, y acción propuesta (`/amend`, tarea nueva, eliminar código, re-triaje).

No corrijas nada por tu cuenta más allá de devolver los estados fantasma a `hecha`: este comando diagnostica. Cada corrección real se tramita por su vía, que es la que deja rastro.

## Cierre
Si no hay hallazgos, dilo en una línea. Un `sync-check` limpio es información valiosa, no una decepción.
