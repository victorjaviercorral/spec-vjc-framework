# Estructura documental de un proyecto (vault de Obsidian)

La carpeta `docs/` del repo del proyecto ES el vault documental (se abre en Obsidian directamente o como subcarpeta de un vault mayor). Codigo y documentacion versionan juntos.

```
docs/
├── _index.md                  # Portada: que es el proyecto, estado, enlaces a cada fase
├── 00-proyecto/
│   └── project.md             # Tier, stack, criterios de parada, repo, fechas
├── 01-prd/
│   └── prd-lite.md
├── 02-spec/
│   └── spec.md
├── 03-diseno/
│   ├── design-identity.md
│   └── (overrides de design system si aplica)
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
└── 08-retros/
    └── retro-<fecha>.md       # Solo por invocacion explicita
```

Reglas:
- Los headings y wiki-links se extraen literalmente, nunca se reconstruyen desde IDs.
- Un archivo por artefacto; versiones via git, no via copias "v2-final".
- `_index.md` se actualiza al cerrar cada fase (es la futura base de la pagina de docs publica).
