---
description: Genera un prototipo HTML autocontenido y navegable del producto para validacion visual antes de implementar. Requiere spec aprobada.
---

# /prototype

Genera `docs/04-prototipo/prototype.html`: UN unico archivo HTML autocontenido (CSS y JS inline, datos mock realistas, sin dependencias de build) que permita navegar el flujo principal definido en la spec.

## Antes de generar
1. Lee `docs/02-spec/spec.md` y `docs/03-diseno/design-identity.md`.
2. Activa las skills de diseno disponibles (ui-ux-pro-max, taste-skill, frontend-design). La identidad del proyecto GOBIERNA sus recomendaciones (constitution D.12): nada de look generico.
3. Si el proyecto usa un design system de `design-systems/`, aplica sus tokens.

## Requisitos del prototipo
- Cubre el flujo principal completo y al menos 1 camino alternativo.
- Estados vacios, de carga y de error visibles (no solo el happy path).
- Responsive (movil y escritorio).
- Animaciones y microinteracciones con intencion, coherentes con la identidad (no decoracion aleatoria).
- Marca de agua discreta "PROTOTIPO - datos ficticios".

## Cierre
- Gate humano visual: el usuario abre el HTML en el navegador y aprueba, pide ajustes (maximo 2 iteraciones de ajuste visual) o rechaza.
- Al aprobar: registra en `docs/04-prototipo/decisiones-visuales.md` que se valido y que cambio. Siguiente paso: `/plan`.
- Si el prototipo revela un problema de spec, se corrige la spec ANTES de continuar (la spec manda).
