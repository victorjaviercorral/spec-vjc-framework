# Estructura documental de un proyecto

La carpeta `docs/` del repo del proyecto **es** el vault documental (se abre en Obsidian directamente o como subcarpeta de un vault mayor). Código y documentación versionan juntos.

**Se crea solo lo que la etapa exige** (`docs/modelo.md` §3.1). Crear el árbol completo para un boceto es sobre-proceso e infringe constitution B.5.

```
docs/
├── _index.md                  # Portada: qué es, etapa, exposición, estado, enlaces
├── 00-proyecto/
│   └── project.md             # Etapa, exposición, presupuesto, entorno, gates, hitos, métricas
├── 01-prd/
│   └── prd-lite.md
├── 02-spec/
│   ├── requirements.md        # Requisitos EARS por capacidad, ciclo de vida y permisos (/expand)
│   ├── spec.md
│   └── gates/                 # Copias de cada quality gate, para histórico comparable
├── 03-diseno/
│   ├── design-identity.md
│   └── (overrides del design system si aplica)
├── 04-prototipo/
│   ├── prototype.html
│   └── decisiones-visuales.md
├── 05-plan/
│   ├── plan.md
│   └── tasks.md
├── 06-decisiones/
│   └── ADR-001-*.md
├── 07-comunicacion/
│   └── <fase>-<fecha>.md
├── 08-retros/
│   ├── decision-continuidad-<fecha>.md
│   └── retro-<fecha>.md       # Solo por invocación explícita
└── 09-lanzamiento/            # Creada por /go-live
    ├── endurecimiento.md      # Diferencial de cumplimiento al productivizar
    ├── preflight-<fecha>.md   # Veredicto GO / GO CON EXCEPCIONES / NO-GO
    └── legal/                 # Privacidad, cookies, términos, declaración de accesibilidad
```

## Qué crea cada etapa

| Etapa | Carpetas |
|-------|----------|
| **Boceto** | `00-proyecto/` |
| **Prototipo** | + `01-prd/`, `03-diseno/`, `04-prototipo/` |
| **MVP / Producto** | árbol completo salvo `09-lanzamiento/` |
| **Cualquiera + `/go-live`** | + `09-lanzamiento/` |

## Reglas

- Los encabezados y wiki-links se extraen literalmente, nunca se reconstruyen desde IDs.
- Un archivo por artefacto; las versiones van en git y en la tabla de historial del propio artefacto, nunca en copias tipo "v2-final".
- `_index.md` se actualiza al cerrar cada fase: es la futura base de la página de documentación pública.
- Los artefactos aprobados no se editan a mano: se tramitan con `/amend`, que deja historial y ADR.
