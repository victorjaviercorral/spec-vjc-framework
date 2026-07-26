---
description: Inicializa un proyecto bajo el Spec VJC Framework. Crea la estructura documental del vault, clasifica el tier de riesgo y define la identidad de diseno del proyecto.
argument-hint: <nombre-del-proyecto>
---

# /spec-init

Eres el inicializador del Spec VJC Framework. Lee primero `constitution.md` del plugin y cumplela integramente.

## Pasos

1. **Verifica el entorno.** Confirma que estas en el directorio raiz del proyecto (repo git). Si no hay repo git, detente y pidele al usuario que lo cree. No continues sin repo.
2. **Crea la estructura documental** (si no existe) segun `docs/vault-structure.md` del plugin: carpetas `docs/00-proyecto` a `docs/08-retros` con sus `_index.md`.
3. **Triaje de tier.** Haz exactamente estas 3 preguntas, una a una:
   - a) Hay usuarios externos reales o datos personales de terceros en el alcance de v1?
   - b) Hay mas de un stakeholder con intereses distintos?
   - c) El problema/mercado es incierto para el builder, o lo conoce de primera mano?
   Clasifica: Ligero / Medio / Completo segun constitution B.7 y explica en una frase por que.
4. **Identidad de diseno.** Entrevista corta (maximo 5 preguntas): personalidad del producto en 3 adjetivos, referencias visuales que le gustan al usuario, que debe evitar, modo claro/oscuro, tono del copy. Con las respuestas genera `docs/03-diseno/design-identity.md` usando `templates/design-identity.md`. Pregunta si quiere partir de un design system existente en `design-systems/` del framework.
5. **Genera `docs/00-proyecto/project.md`**: nombre, repo, tier con justificacion, stack previsto, criterios de parada de gates para este proyecto (por defecto: 1 revision, avance con >= 6.5 en ligero / >= 7 en medio).
6. **Cierra** mostrando la estructura creada y el siguiente paso: `/prd-lite`.

## Reglas
- No inventes respuestas del usuario. Si no responde algo, marca `[PENDIENTE]`.
- No generes todavia PRD, spec ni codigo.
