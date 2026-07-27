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
/spec-init → [/prd-lite] → [/specify +gate] → /prototype → [/plan → /tasks] → /implement → /go-nogo

VÍA PRODUCCIÓN
/go-live → endurecimiento → /preflight → GO LIVE → /go-nogo
```

Soporte: `/quality-gate`, `/design-system`, `/amend`, `/sync-check`.

Lo que va entre corchetes se activa según la etapa. Una herramienta personal se construye con dos comandos; un producto con usuarios reales recorre el pipeline entero.

## Rutas típicas

| Situación | Etapa · Exposición | Camino |
|-----------|:---:|--------|
| Herramienta personal | Boceto · X0 | `/spec-init` → construir |
| Validar una idea | Prototipo · X0-X1 | `/spec-init` → `/prd-lite` → `/prototype` → `/go-nogo` |
| Landing o publicación | Prototipo · X1 | `/spec-init` → `/prototype` → `/implement` → `/preflight` |
| MVP con usuarios | MVP · X2 | pipeline completo + `/go-live` |

## Principios que lo gobiernan

- **No inventar.** Falta un dato, se marca `[PENDIENTE]`.
- **Evidencia de verificación, no afirmación.** Código sin verificación ejecutada se considera no escrito.
- **Ningún artefacto que no cambie una decisión.** La carga de la prueba recae en quien exige el control.
- **Regla del 20%.** La definición nunca supera el 20% del presupuesto de la etapa.
- **Descartar a tiempo es un éxito**, y debe costar 15 minutos, no una retrospectiva.
- **Reglas ejecutables, no prosa.** Lo que no se puede verificar ejecutando algo es una recomendación, y se etiqueta como tal.

Los 36 principios completos, con su condición de activación, en [`constitution.md`](constitution.md).

## Instalación

```
/plugin marketplace add victorjaviercorral/spec-vjc-framework
/plugin install spec-vjc-framework@spec-vjc-framework
```

## Documentación

| | |
|---|---|
| [`docs/guia-usuario.md`](docs/guia-usuario.md) | **Empieza aquí.** Referencia completa + prompt de arranque |
| [`docs/guia-etapa.md`](docs/guia-etapa.md) | Eje Etapa — Vía Núcleo, comando a comando |
| [`docs/guia-exposicion.md`](docs/guia-exposicion.md) | Eje Exposición — Vía Producción, cumplimiento y lanzamiento |
| [`docs/diagramas.md`](docs/diagramas.md) | 9 diagramas: flujos, relaciones comando↔artefacto, ciclos de vida |
| [`docs/obsidian.md`](docs/obsidian.md) | Integración con Obsidian y vault de portfolio |
| [`constitution.md`](constitution.md) | Principios, con activación por etapa y exposición |
| [`docs/modelo.md`](docs/modelo.md) | Matriz de activación: qué se aplica y cuándo |
| [`docs/vault-structure.md`](docs/vault-structure.md) | Estructura documental del proyecto |
| `commands/` · `agents/` | 14 comandos y el revisor ciego |
| `checklists/` | Seguridad, seguridad agéntica, privacidad/GDPR, accesibilidad, performance, testing, operación, UX/UI, contenido/SEO |
| `templates/` | Plantillas de todos los artefactos |
| `design-systems/` · `modules/` | Activos reutilizables entre proyectos |

## Estado

v1.1. Ver [CHANGELOG](CHANGELOG.md). Integración con tablero Kanvas diferida; el formato de `tasks.md` ya es compatible.

## Licencia

MIT.
