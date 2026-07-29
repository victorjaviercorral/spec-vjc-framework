# Spec VJC Framework

Framework de desarrollo dirigido por especificación para herramientas personales, publicaciones y productos digitales, ejecutado íntegramente en Claude Code como plugin.

Diseñado sobre una premisa: **el mismo framework tiene que servir para un boceto de un día y para un producto con usuarios reales en la UE**, sin que el primero cargue con la ceremonia del segundo ni el segundo se salte lo que el primero no necesita.

## El modelo: dos ejes, dos vías

**Eje 1 — Etapa** (cuánta definición merece): `Boceto` → `Prototipo` → `MVP` → `Producto`. Cada etapa lleva su presupuesto de tiempo.

**Eje 2 — Exposición** (a qué te expones): `X0` privado · `X1` público sin cuentas · `X2` usuarios con datos personales · `X3` dinero, menores, datos sensibles o IA.

Son **independientes**: un boceto de un día que recoge emails necesita protección de datos; un producto grande que solo usas tú, no.

**Vía Núcleo** — siempre activa. Definir lo mínimo, construir, validar y decidir rápido.
**Vía Producción** — se activa con `/go-live` cuando decides ir a usuarios reales: cumplimiento, endurecimiento, operación y verificación de lanzamiento.

Detalle operativo en [`docs/modelo.md`](docs/modelo.md).

## Pipeline

```
VÍA NÚCLEO
/spec-init → [/prd-lite] → [/expand] → [/specify +gate] → /prototype → [/plan → /tasks] → /implement → /go-nogo

VÍA PRODUCCIÓN
/go-live → endurecimiento → /preflight → GO LIVE → /go-nogo
```

Soporte: `/quality-gate`, `/design-system`, `/amend`, `/sync-check`.

Lo que va entre corchetes se activa según la etapa. Una herramienta personal se construye con dos comandos; un producto con usuarios reales recorre el pipeline entero.

**El flujo de definición cabe en 8 preguntas.** El framework redacta primero y pregunta después: borrador completo, decisiones no evidenciadas marcadas como asunciones revisables, y un único bloque de confirmación al final. Lo que no cabe en el presupuesto de preguntas se propone, no se interroga.

**Y pregunta cómo se sostiene.** A partir de MVP, el PRD exige modelo de negocio, monetización, economía unitaria y riesgos del proyecto. Cuando el coste de construir software se desploma, lo escaso deja de ser la implementación: un producto funcionalmente impecable por el que nadie iba a pagar sigue siendo un fracaso. Si no pretendes monetizar, la sección no desaparece — se reduce a una línea que te obliga a declarar por qué está bien.

## Rutas típicas

| Situación | Etapa · Exposición | Camino |
|-----------|:---:|--------|
| Herramienta personal | Boceto · X0 | `/spec-init` → construir |
| Validar una idea | Prototipo · X0-X1 | `/spec-init` → `/prd-lite` → `/prototype` → `/go-nogo` |
| Landing o publicación | Prototipo · X1 | `/spec-init` → `/prototype` → `/implement` → `/preflight` |
| MVP con usuarios | MVP · X2 | pipeline completo + `/go-live` |

## Principios que lo gobiernan

- **No inventar un dato.** Falta un dato, una métrica o una fuente, se marca `[PENDIENTE]`. Sin excepción.
- **Una decisión sí puede proponerse marcada.** Lo que se resuelve eligiendo y no averiguando va como `[ASUMIDO: decisión | razón | riesgo]`, revisable. La frontera es esa.
- **Evidencia de verificación, no afirmación.** Código sin verificación ejecutada se considera no escrito.
- **Ningún artefacto que no cambie una decisión.** La carga de la prueba recae en quien exige el control.
- **Regla del 20%**, y 8 preguntas como máximo en todo el flujo de definición.
- **Descartar a tiempo es un éxito**, y debe costar 15 minutos, no una retrospectiva.
- **Reglas ejecutables, no prosa.** Lo que no se puede verificar ejecutando algo es una recomendación, y se etiqueta como tal.

Los 36 principios completos —más las tres precisiones `-bis` y una `-ter`—, con su condición de activación, en [`constitution.md`](constitution.md).

## Instalación

```
/plugin marketplace add victorjaviercorral/spec-vjc-framework
/plugin install spec-vjc-framework@spec-vjc-framework
```

**Desarrollo del propio framework:** si vas a editar este repo, evita el clon+caché intermedios por completo lanzando la sesión con `claude --plugin-dir <ruta-a-este-repo>` — así `${CLAUDE_PLUGIN_ROOT}` apunta siempre a tu working copy y no hay nada que sincronizar. Si en cambio lo cargas por marketplace, **tras cada `git push` que cambie de versión** hace falta `/plugin marketplace update spec-vjc-framework` seguido de `/plugin update spec-vjc-framework` — ninguno de los dos ocurre solo dentro de una sesión activa. `scripts/check-plugin-version.ps1` (instalado como hook `pre-push`, ver CHANGELOG 1.3.1) impide publicar una versión donde `plugin.json`, `marketplace.json` y `CHANGELOG.md` no coincidan, pero no sustituye el paso manual de sincronizar el clon local.

## Documentación

| | |
|---|---|
| [`docs/guia-usuario.md`](docs/guia-usuario.md) | **Empieza aquí.** Referencia completa + prompt de arranque |
| [`docs/guia-etapa.md`](docs/guia-etapa.md) | Eje Etapa — Vía Núcleo, comando a comando |
| [`docs/guia-exposicion.md`](docs/guia-exposicion.md) | Eje Exposición — Vía Producción, cumplimiento y lanzamiento |
| [`docs/diagramas.md`](docs/diagramas.md) | 10 diagramas: flujos, relaciones comando↔artefacto, ciclos de vida, expansión de requisitos |
| [`docs/fundamentos.md`](docs/fundamentos.md) | De dónde viene cada pieza: metodologías, autores y norma aplicable, y qué es original |
| [`docs/validacion-1.2.md`](docs/validacion-1.2.md) | Autoevaluación crítica de `/expand`: debilidades, predicciones y reglas de decisión |
| [`docs/obsidian.md`](docs/obsidian.md) | Integración con Obsidian y vault de portfolio |
| [`constitution.md`](constitution.md) | Principios, con activación por etapa y exposición |
| [`docs/modelo.md`](docs/modelo.md) | Matriz de activación: qué se aplica y cuándo |
| [`docs/vault-structure.md`](docs/vault-structure.md) | Estructura documental del proyecto |
| `commands/` · `agents/` | 15 comandos y el revisor ciego |
| `scripts/` | Controles ejecutables. `check-requirements.ps1` verifica `requirements.md`; `check-plugin-version.ps1` verifica que `plugin.json`/`marketplace.json`/`CHANGELOG.md` no diverjan — ambos con código de salida |
| `checklists/` | Seguridad, seguridad agéntica, privacidad/GDPR, accesibilidad, performance, testing, operación, UX/UI, contenido/SEO |
| `templates/` | Plantillas de todos los artefactos |
| `design-systems/` · `modules/` | Activos reutilizables entre proyectos |

## Estado

v1.3.1. Ver [CHANGELOG](CHANGELOG.md). La etapa `/expand` es lo más reciente y lo menos rodado: sus ejecuciones reales, debilidades y predicciones están declaradas en [`docs/validacion-1.2.md`](docs/validacion-1.2.md). El flujo de dos capas de `/design-system` (F.26-ter) es aporte externo declarado sin ejecución propia todavía. Integración con tablero Kanvas diferida; el formato de `tasks.md` ya es compatible.

## Licencia

MIT.
