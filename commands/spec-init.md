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

## Paso 1 — Triaje (4 preguntas)

Tu cupo son **4 preguntas** de las 8 del flujo de definición (constitution B.6-bis). Es el mayor de los cuatro repartos porque aquí se responde a lo que nadie puede asumir por el usuario: qué va a hacer con esto y a quién lo expone. Agotado el cupo, lo que falte va como `[PENDIENTE]`.

**No trocees.** Cada pregunta se hace entera, con sus partes en un solo mensaje, y con la opción por defecto ya propuesta cuando la haya. Preguntar de una en una convierte 4 preguntas en 9 turnos.

**1 · Etapa y presupuesto**
> ¿Qué es esto hoy: un boceto desechable, un prototipo para validar un concepto, un MVP para poner delante de usuarios, o un producto que vas a mantener? Te propongo el presupuesto por defecto de esa etapa (`docs/modelo.md` §1); dime si lo sobrescribes.

**2 · Exposición — las cuatro señales, en un solo bloque**
> a) ¿Lo va a ver alguien más que tú, o se despliega en internet?
> b) ¿Alguien dejará datos personales: cuenta, email, contenido subido, analítica identificable?
> c) ¿Hay dinero, datos de salud/biometría/ideología, o puede atraer a menores de edad? Y si hay dinero: ¿lo cobras tú, o solo pasa por el producto?
> d) ¿Hay funcionalidad de IA con la que el usuario final interactúa?

→ Clasifica X0-X3 según `docs/modelo.md` §1 y nombra los módulos de cumplimiento activados. Explica en una frase qué implica el nivel elegido. **Ante la duda, sube**: clasificar de menos expone a terceros.

→ De la misma respuesta sale el campo **`sostenibilidad`** de `project.md`: `ninguna` (no pretende ingresos), `cubrir costes` o `ingresos`. Es un campo declarado, **no un tercer eje**: activa las secciones de negocio del PRD en MVP y Producto, nada más. Si no se deduce con claridad, propónlo marcado `[ASUMIDO: …]` en lugar de gastar una pregunta.

**3 · Entorno**
> ¿Dónde desarrollas (SO y runtime) y dónde vas a desplegar?

**4 · Identidad** (solo si etapa ≥ Prototipo)
> Personalidad del producto en 3 adjetivos · referencias visuales que te gustan · qué evitar · claro u oscuro · tono del copy. Y si quieres partir de un design system existente: te listo los de `${CLAUDE_PLUGIN_ROOT}/design-systems/` con la respuesta.

→ Genera `docs/03-diseno/design-identity.md` con `${CLAUDE_PLUGIN_ROOT}/templates/design-identity.md`.

En **Boceto X0**, las señales c) y d) no aplican y la pregunta 4 tampoco: el triaje se cierra en **dos preguntas**. La velocidad aquí es un requisito, no una cortesía.

## Paso 2 — Estructura documental

Crea **solo** las carpetas que la etapa exige (`docs/modelo.md` §3.1), no el árbol completo. Estructura de referencia en `${CLAUDE_PLUGIN_ROOT}/docs/vault-structure.md`.
- Boceto: solo `docs/00-proyecto/`.
- Prototipo: + `01-prd/`, `03-diseno/`, `04-prototipo/`.
- MVP y Producto: árbol completo salvo `09-lanzamiento/`, que lo crea `/go-live`.

## Paso 3 — `docs/00-proyecto/project.md`

Genera con estos campos obligatorios:
`nombre` · `repo` · `etapa` + justificación en una frase · `presupuesto` (fecha de inicio y fecha límite concreta) · `exposición` + módulos activados · `sostenibilidad` · `entorno` (desarrollo y despliegue) · `stack previsto` · `umbrales de gate` (copiados de constitution C.14 para su etapa) · `fecha de revisión Go/No-Go` (`[PENDIENTE]` hasta que exista PRD) · `presupuesto de coste mensual` si hay infraestructura de pago.

Inicializa además el **contador de preguntas** (constitution B.6-bis) con las que hayas gastado en el triaje. Es el saldo que consultan `/prd-lite`, `/expand` y `/specify`.

## Paso 4 — Cierre

Muestra: etapa, exposición, presupuesto con fecha límite, checklists activadas y **el siguiente comando concreto de su ruta** (`docs/modelo.md` §4). Si la ruta es Boceto X0, dilo explícitamente: no hay más comandos obligatorios, a construir.

## Reglas
- No inventes respuestas del usuario. Lo no respondido va como `[PENDIENTE]`.
- **No gastes cupo en lo que ya sabes.** Si un dato está en el repo, en el prompt de arranque o en lo que el usuario ya ha dicho, se da por respondido y se confirma de pasada, no se pregunta.
- No generes PRD, spec ni código en este comando.
- No crees artefactos que la etapa no exija, aunque "puedan venir bien" (constitution B.5).
