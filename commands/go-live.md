---
description: Activa la Vía Producción. Re-triaje de exposición, activación de módulos de cumplimiento y generación del plan de endurecimiento para llevar el trabajo a usuarios reales.
---

# /go-live

Comando de **transición**: convierte un boceto, prototipo o MVP validado en algo que puede recibir usuarios reales. No lanza nada; produce el trabajo pendiente para poder lanzar.

Se ejecuta una vez al productivizar, y de nuevo cada vez que sube la exposición.

## Paso 0 — Precondiciones
1. Lee `docs/00-proyecto/project.md`, `${CLAUDE_PLUGIN_ROOT}/constitution.md` y `${CLAUDE_PLUGIN_ROOT}/docs/modelo.md`.
2. Si existe PRD con Go/No-Go y aún no se ha ejecutado `/go-nogo`, pregunta si hay señal suficiente para justificar el endurecimiento. Endurecer algo que se va a descartar es la forma más cara de perder tiempo (constitution B.9).

## Paso 1 — Re-triaje de exposición (obligatorio)
El paso a usuarios reales casi siempre sube el nivel. Pregunta de nuevo, sin dar por buena la clasificación anterior:
1. ¿Habrá cuentas, registro o identificación de usuarios?
2. ¿Se recogerá algún dato personal, incluida analítica identificable, correo o contenido subido?
3. ¿Habrá dinero, datos de salud/biometría/ideología, o puede atraer a menores?
4. ¿Hay IA con la que interactúe el usuario final?
5. ¿En qué jurisdicciones estarán los usuarios? (si hay UE ⇒ GDPR y accesibilidad son obligatorios)

Clasifica X0-X3 y **declara explícitamente el salto** ("pasas de X1 a X2: se activan privacidad, testing de RC y textos legales"). Actualiza `project.md`.

## Paso 2 — Diferencial de cumplimiento
Compara lo que exige la nueva exposición (`docs/modelo.md` §3.2 y §3.3) contra lo que el proyecto tiene hoy. Produce `docs/09-lanzamiento/endurecimiento.md` con el **diferencial**, no con la lista completa: solo lo que falta.

Por cada hueco: qué falta · por qué (checklist e ítem, o norma) · esfuerzo estimado · bloqueante para lanzar sí/no.

Agrupa por bloque:
- **Legal y datos** — mapa de datos personales, base legal por tratamiento, retención, derechos ARSOPL con mecanismo real, DPA de cada procesador, textos publicados (privacidad, cookies, términos), consentimiento previo a scripts no esenciales.
- **Seguridad** — cabeceras, permisos y RLS revisados, rate limiting, gestión de sesión, auditoría de dependencias, rotación de secretos si alguno se expuso alguna vez.
- **Accesibilidad** — scan automatizado, recorrido de teclado, corrección de incumplimientos de nivel A (bloqueantes).
- **Operación** — seguimiento de errores, logs sin datos personales, comprobación de disponibilidad, copia de seguridad **restaurada una vez**, procedimiento de reversión escrito.
- **Contenido** — copy sin marcadores de posición, mensajes de error revisados, metadatos y SEO si es indexable.
- **Medición** — instrumentación del Go/No-Go operativa de verdad.

## Paso 3 — Actualizar spec y tareas
- Añade a `docs/02-spec/spec.md` las secciones que la nueva exposición activa (privacidad, accesibilidad, operación, módulo de cumplimiento). Si el proyecto no tenía spec (venía de Prototipo), créala en modo núcleo: la exposición X2+ sin spec no es aceptable.
- Vuelca el diferencial a `docs/05-plan/tasks.md` como tareas con criterio de verificación, marcando cuáles bloquean el lanzamiento.

## Paso 4 — Presupuesto y decisión
Suma el esfuerzo del endurecimiento y contrástalo con el presupuesto de la etapa. Preséntalo como decisión explícita al usuario:
- **Adelante** con el endurecimiento completo,
- **Reducir exposición** (por ejemplo: quitar cuentas y quedarse en X1) para lanzar antes y con menos obligaciones,
- **Aplazar** el lanzamiento público.

Reducir exposición es una respuesta legítima y a menudo la más inteligente: menos obligaciones, menos superficie, más rápido.

## Cierre
Siguiente paso: implementar el endurecimiento con `/implement` y, cuando no queden bloqueantes, `/preflight`.
