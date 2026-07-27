---
description: Inicializa o reclasifica un proyecto bajo el Spec VJC Framework. Declara etapa, exposición, presupuesto y entorno, y crea solo la estructura documental que esa combinación exige.
argument-hint: <nombre-del-proyecto> [--etapa boceto|prototipo|mvp|producto]
---

# /spec-init

Inicializador del framework. Lee `${CLAUDE_PLUGIN_ROOT}/constitution.md` y `${CLAUDE_PLUGIN_ROOT}/docs/modelo.md` y cúmplelos íntegramente.

Si ya existe `docs/00-proyecto/project.md`, esto es una **reclasificación** (subida o bajada de etapa): conserva los artefactos existentes, actualiza etapa/presupuesto/exposición y crea solo lo que falte para la nueva combinación.

## Paso 0 — Precondiciones
- Confirma que estás en la raíz de un repo git. Si no lo hay, ofrece `git init` y detente hasta resolverlo.
- No continúes si el usuario no ha indicado nombre de proyecto.

## Paso 1 — Triaje (7 preguntas, una a una, sin adelantar respuestas)

**Etapa (1 pregunta):**
1. ¿Qué es esto hoy: un boceto desechable, un prototipo para validar un concepto, un MVP para poner delante de usuarios, o un producto que vas a mantener?
   → Confirma la etapa y su presupuesto por defecto (`docs/modelo.md` §1). Pregunta si quiere sobrescribir el presupuesto.

**Exposición (4 preguntas, para si alguna sale afirmativa a partir de la 2ª):**
2. ¿Lo va a ver alguien más que tú? ¿Se despliega en internet?
3. ¿Alguien dejará datos personales (cuenta, email, contenido subido, analítica identificable)?
4. ¿Hay dinero, datos de salud/biometría/ideología, o puede atraer a menores de edad?
5. ¿Hay funcionalidad de IA con la que el usuario final interactúa?
   → Clasifica X0-X3 según `docs/modelo.md` §1 y nombra los módulos de cumplimiento activados. Explica en una frase qué implica el nivel elegido.

**Entorno (1 pregunta):**
6. ¿Dónde desarrollas (SO y runtime) y dónde vas a desplegar?

**Identidad (1 bloque, solo si etapa ≥ Prototipo):**
7. Personalidad del producto en 3 adjetivos · referencias visuales que te gustan · qué evitar · claro/oscuro · tono del copy.
   → Genera `docs/03-diseno/design-identity.md` con `${CLAUDE_PLUGIN_ROOT}/templates/design-identity.md`. Pregunta si parte de un design system de `${CLAUDE_PLUGIN_ROOT}/design-systems/`.

En Boceto X0, salta las preguntas 3-5 y 7 y cierra el triaje en dos preguntas. La velocidad aquí es un requisito, no una cortesía.

## Paso 2 — Estructura documental

Crea **solo** las carpetas que la etapa exige (`docs/modelo.md` §3.1), no el árbol completo. Estructura de referencia en `${CLAUDE_PLUGIN_ROOT}/docs/vault-structure.md`.
- Boceto: solo `docs/00-proyecto/`.
- Prototipo: + `01-prd/`, `03-diseno/`, `04-prototipo/`.
- MVP y Producto: árbol completo salvo `09-lanzamiento/`, que lo crea `/go-live`.

## Paso 3 — `docs/00-proyecto/project.md`

Genera con estos campos obligatorios:
`nombre` · `repo` · `etapa` + justificación en una frase · `presupuesto` (fecha de inicio y fecha límite concreta) · `exposición` + módulos activados · `entorno` (desarrollo y despliegue) · `stack previsto` · `umbrales de gate` (copiados de constitution C.14 para su etapa) · `fecha de revisión Go/No-Go` (`[PENDIENTE]` hasta que exista PRD) · `presupuesto de coste mensual` si hay infraestructura de pago.

## Paso 4 — Cierre

Muestra: etapa, exposición, presupuesto con fecha límite, checklists activadas y **el siguiente comando concreto de su ruta** (`docs/modelo.md` §4). Si la ruta es Boceto X0, dilo explícitamente: no hay más comandos obligatorios, a construir.

## Reglas
- No inventes respuestas del usuario. Lo no respondido va como `[PENDIENTE]`.
- No generes PRD, spec ni código en este comando.
- No crees artefactos que la etapa no exija, aunque "puedan venir bien" (constitution B.5).
