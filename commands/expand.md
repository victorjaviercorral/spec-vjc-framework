---
description: Expande cada capacidad del alcance v1 en requisitos EARS aplicando lentes de descomposición escaladas por etapa y exposición. Etapa intermedia entre el PRD y la spec.
---

# /expand

Produce `docs/02-spec/requirements.md` con `${CLAUDE_PLUGIN_ROOT}/templates/requirements.md`.

Existe porque una capacidad del PRD es una línea de prosa y un requisito implementable no lo es. Sin esta etapa, `/specify` solo tiene obligación de expandir los `RC-XX` —que son de eje de valor, no de superficie funcional— y el alcance v1 cruza a la spec con ratio 1:1. Aquí el ratio correcto para una capacidad de complejidad media es 1:8 o más.

## Paso 0 — Precondiciones
1. Lee `${CLAUDE_PLUGIN_ROOT}/constitution.md`, `${CLAUDE_PLUGIN_ROOT}/docs/modelo.md`, `docs/00-proyecto/project.md` y `docs/01-prd/prd-lite.md`.
2. Detente si falta el PRD-lite o si su sección 6 (Alcance v1) está vacía: sin capacidades no hay nada que expandir.
3. Si la etapa es Boceto o Prototipo, este comando **no aplica**: dilo, explica que sin spec que consuma el artefacto sería producir algo que no cambia ninguna decisión (constitution B.5), y detente.
4. Lee el contador de preguntas de `project.md`. Tu cupo son **2 preguntas** (constitution B.6-bis). Si el cupo acumulado ya está agotado, tu cupo es 0 y todo hueco de decisión se resuelve con `[ASUMIDO: …]`.
5. **Comprueba si ya existe `docs/02-spec/spec.md`.** Si existe, estás en **modo retroactivo**: el proyecto tiene spec sin haber pasado por esta etapa. Entonces, y solo entonces, lee también la spec, **conserva la numeración `R-nn` que ya usa** y numera lo nuevo a continuación. Declara el modo retroactivo por escrito en el encabezado del artefacto y regístralo como `AS-nn`: las referencias cruzadas de la spec, los ADR y el prototipo dependen de esos IDs, y renumerar las rompería sin ganar nada. Si no existe spec, **no la busques**: en flujo normal este comando va antes.

## Paso 1 — Declara las lentes activas, antes de generar nada

Lee `docs/modelo.md` §3.4 y resuelve el **techo 1**: qué lentes activan la etapa y la exposición de este proyecto.

Anuncia al usuario, antes de escribir: qué lentes corren, cuáles no y por qué. Una lente cerrada por eje se declara en la sección 0 del artefacto con su razón. Nunca se omite en silencio.

## Paso 2 — Event Storming ligero

Sobre las capacidades del alcance v1 —solo las `must` en MVP; `must` y `should` en Producto— produce cuatro listas:

1. **Eventos** en pasado: lo que ocurre en el dominio.
2. **Comandos** en imperativo, con su actor: lo que alguien pide.
3. **Políticas** en forma `cuando <evento> entonces <comando>`. Bajan a EARS plantilla 2 sin traducción.
4. **Agregados**: la entidad que guarda la consistencia de un grupo de comandos.

Este paso no es una lente: es su insumo. El disparador de L1 pregunta si la capacidad transiciona una entidad persistente, y esa pregunta no se puede responder sin la lista de agregados. Por cada agregado, registra las dos señales que gobiernan el techo 2: **¿tiene ≥2 estados?** y **¿pueden escribirlo ≥2 actores?**

## Paso 3 — Aplica las lentes, capacidad a capacidad

Para cada capacidad `C-n` y cada lente activa, resuelve el **techo 2**: comprueba su disparador (`docs/modelo.md` §3.4). Si no se cumple, cierra la lente para esa capacidad con una línea de razón en la sección 0 y pasa a la siguiente. Si se cumple, genera.

| Lente | Qué debe producir |
|-------|-------------------|
| **L1** Ciclo de vida | Estados de la entidad, transiciones permitidas con su disparador, **una transición prohibida por cada par no permitido**, y qué ocurre con los artefactos derivados (enlaces compartidos, cachés, exportaciones, notificaciones ya emitidas) en cada transición |
| **L2** Permisos rol × estado | Matriz completa por entidad. **Cada celda denegada es un requisito**, no un hueco. Roles enumerados: el PRD solo declara un segmento primario, así que los roles salen de los actores del paso 2 |
| **L3** Validaciones y límites | Formato, rango, unicidad, obligatoriedad, tamaño máximo, tipos aceptados, longitud, límite de tasa. Y el comportamiento ante cada violación, no solo la regla |
| **L4** Modos de fallo | Por dependencia externa caída **y** por fallo parcial en operación multi-recurso: qué queda a medias, compensación, idempotencia al reintentar, estado reconciliable. Nunca huérfanos silenciosos |
| **L5** Fronteras y vacío | Cero elementos, un elemento, el máximo, uno más que el máximo, negativo, nulo, cadena vacía, primer y último día del rango |
| **L6** Concurrencia | Dos escrituras simultáneas sobre el mismo recurso, escritura sobre entidad ya borrada, lectura durante una transición |
| **L7** Auditoría | Qué se registra (actor, acción, recurso, momento) **y su mitad negativa: qué no debe registrarse jamás** — contenido del usuario, credenciales, datos de categoría especial. Retención por tipo de registro en X3 |

**Escribe cada requisito en EARS**, eligiendo plantilla según lo que expresa:

| # | Plantilla | Forma |
|:---:|-----------|-------|
| 1 | Ubicua | `El <sistema> deberá <respuesta>.` |
| 2 | Dirigida por evento | `Cuando <disparador>, el <sistema> deberá <respuesta>.` |
| 3 | Dirigida por estado | `Mientras <estado>, el <sistema> deberá <respuesta>.` |
| 4 | Opcional | `Donde <característica presente>, el <sistema> deberá <respuesta>.` |
| 5 | No deseada | `Si <condición no deseada>, entonces el <sistema> deberá <respuesta>.` |
| 6 | Compleja | `Mientras <estado>, cuando <disparador>, el <sistema> deberá <respuesta>.` |

La plantilla 1 es la que más se abusa: si un requisito puede expresarse con la 2, la 3 o la 5, no uses la 1.

**Numeración:** asigna `R-01`, `R-02`… secuencial y global. Son los IDs **definitivos**; `/specify` los proyecta sin renumerar.

**Origen obligatorio:** todo requisito cita uno del conjunto cerrado de constitution A.2 — `E-n` · `RC-XX` · `C-n` · `A-n` · `AS-nn` · `ADR-nnn` · `Xn` (obligación de exposición) · `checklist/<nombre> §n`. Sin origen no se emite. **La lente no es un origen:** es el generador. Un requisito cuyo único origen sea `L4` no tiene procedencia, tiene autor.

**Todo requisito debe ser implementable y falsable.** Dos antipatrones que están prohibidos porque suman a la cuota de densidad sin especificar nada:

- **La aserción de test disfrazada.** *"Si aparece un recurso privado en el listado público, entonces el sistema deberá tratarlo como defecto bloqueante"* no describe comportamiento del sistema: describe cómo reaccionarías tú. Reescríbelo como el comportamiento que impide que ocurra, o elimínalo y llévalo a la estrategia de test.
- **El rechazo de una capacidad inexistente.** *"Si alguien solicita mensajería directa, entonces el sistema deberá rechazarla — no existe tal capacidad"* pide implementar el rechazo de algo que no está construido. Si la ausencia es deliberada, es una **exclusión** del alcance, no un requisito.

Prueba rápida: si no puedes escribir el criterio de verificación que lo falsaría, no es un requisito.

## Paso 4 — Verifica la densidad antes de cortar

Para cada capacidad de complejidad media —entidad con ≥2 estados, **o** que toca ≥2 recursos, **o** con ≥2 roles— comprueba: **≥8 requisitos**, de ellos **≥2 de plantilla 5** y **≥1 de plantilla 3 o 6**.

Si no se alcanza, la aplicación de lentes fue superficial: vuelve a L4 y L5 sobre esa capacidad. **Está prohibido rellenar con requisitos ubicuos** para llegar al número — convertiría el mínimo en una cuota que se cumple con ruido. Las capacidades por debajo del umbral de complejidad no tienen mínimo, y forzarlas es el sobredisparo que los dos techos existen para evitar.

## Paso 5 — Corte

Clasifica cada requisito en `v1` · `v2` · `descartado` con el orden de decisión de `docs/modelo.md` §3.4. Los de pérdida de datos, brecha de permisos o incumplimiento legal entran en v1 sin competir por presupuesto.

Suma el esfuerzo de v1 y contrástalo con el presupuesto de la etapa en `project.md`. Si no cabe, **presenta el recorte de alcance como propuesta concreta** en vez de estirar el plazo (constitution B.7).

Entrega el recuento explícito: cuántos entran en v1, cuántos van a v2 y cuántos se descartan, **cada uno fuera de v1 con su razón escrita**.

**Vuelve a verificar la composición sobre el conjunto v1**, no solo sobre el bruto. El requisito de estado suele ser el más sofisticado de una capacidad y por eso mismo es el primer candidato a diferirse: si el corte deja una capacidad de complejidad media **sin ningún requisito de plantilla 3 o 6 en v1**, o reconsideras el corte o lo declaras por escrito como deuda aceptada. Verificar solo antes del corte deja pasar exactamente el caso que esta etapa existe para cubrir.

## Paso 5-bis — Ejecuta el control, no lo juzgues

Escribe el artefacto en `docs/02-spec/requirements.md` —**escribirlo es parte del comando, no basta con mostrarlo en conversación**— y ejecuta:

```
pwsh -File ${CLAUDE_PLUGIN_ROOT}/scripts/check-requirements.ps1 -Path docs/02-spec/requirements.md
```

(en Windows PowerShell 5.1, `powershell -File`). Verifica de forma determinista: cierres de lente con razón, origen de todo requisito, densidad por capacidad antes y después del corte, y criterios de aceptación que citan requisitos existentes.

**Corrige los fallos y vuelve a ejecutar hasta que salga con código 0.** No interpretes el resultado ni lo describas como aceptable: constitution A.3 exige la evidencia ejecutada, y D.16 exige que la regla crítica se ejecute en lugar de leerse. Pega la salida final en el cierre. Los **avisos** sí requieren tu juicio: son los casos donde el script no puede decidir si una capacidad está por debajo del umbral de complejidad.

## Paso 6 — Historias de usuario, solo después del corte

Una historia por capacidad que sobrevive a v1. Ninguna para v2: una historia sobre trabajo que no se va a construir es una promesa falsa con formato de contrato.

Criterios de aceptación en Given/When/Then, y **cada uno cita al menos un `R-nn`**. Un AC sin requisito detrás es un defecto que bloquea el cierre del artefacto: significa que se ha prometido un comportamiento que nadie ha especificado.

## Reglas de contenido

- **Proponer y confirmar, no entrevistar.** Genera el artefacto completo primero. No preguntes durante la generación.
- **Decisión de diseño no evidenciada → `[ASUMIDO: <decisión> | <razón> | <riesgo si me equivoco>]`** con identificador `AS-nn` en la sección 7 (constitution A.4-bis). Todo requisito que dependa de ella la cita como origen.
- **Dato, métrica, fuente u obligación legal no evidenciados → `[PENDIENTE]`.** Nunca `[ASUMIDO]`. La frontera es si el hueco se resuelve eligiendo o averiguando.
- **No inventes capacidades.** Expandes las del alcance v1; si detectas una que falta, dilo al usuario como hallazgo y no la añadas por tu cuenta.
- **Reutiliza antes de expandir:** revisa `${CLAUDE_PLUGIN_ROOT}/modules/`. Si un módulo existente cubre una capacidad transversal (autenticación, consentimiento, subida de archivos, borrado de cuenta), referencia sus requisitos en lugar de regenerarlos (constitution F.28).
- **No especifiques implementación.** Un requisito dice qué debe ocurrir, no con qué tecnología. El stack es de `/specify` y sus ADR.

## Cierre

Un **único bloque de confirmación**, nunca preguntas sueltas durante el trabajo:

0. La **salida del script** con código 0, o la lista de avisos que requieren tu juicio.
1. Recuento del corte: v1 / v2 / descartado.
2. Las asunciones `AS-nn` ordenadas **por impacto**, cada una con su opción por defecto ya aplicada. El usuario confirma en bloque o corrige las que quiera.
3. Como máximo **2 preguntas**, solo si son datos que no puedes asumir. Ordenadas por impacto y con opción por defecto. Actualiza el contador acumulado en `docs/00-proyecto/project.md`.

Siguiente paso: `/specify`, que proyecta este artefacto sin volver a redactar requisitos funcionales.

## Gate
Sin gate propio. Constitution C.15 reserva los gates obligatorios a la tabla C.14 y a `/preflight`, y `docs/modelo.md` §6.4 prohíbe que un comando añada gates. Este artefacto se revisa dentro del gate de la spec. Si el usuario pide uno explícitamente, `/quality-gate requirements` existe.
