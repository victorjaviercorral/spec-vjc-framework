---
description: Genera un prototipo HTML autocontenido y navegable para validar propuesta visual y flujo antes de implementar. Gate humano visual barato.
---

# /prototype

Produce `docs/04-prototipo/prototype.html`: UN único archivo HTML autocontenido (CSS y JS en línea, datos ficticios realistas, sin dependencias de build) que permita recorrer el flujo principal.

Su razón de ser: es mucho más barato descartar un HTML que una implementación desplegada. Trátalo como instrumento de decisión, no como entrega.

## Paso 0 — Precondiciones
1. Lee `docs/00-proyecto/project.md` y `docs/03-diseno/design-identity.md`.
2. Fuente del contenido según etapa: en MVP+, `docs/02-spec/spec.md`; en Prototipo, el PRD corto; en Boceto, la descripción directa del usuario.
3. Activa las skills de diseño disponibles (ui-ux-pro-max, apple-design, emil-design-eng, frontend-design). **La identidad del proyecto gobierna sus recomendaciones** (constitution F.26): nada de look genérico de plantilla.
4. **Si el prototipo incluye animación real o gestos** (drag, swipe, momentum — no solo hover/fade), activa siempre **juntas** `emil-design-eng` y `apple-design`, nunca una sola (constitution F.26-bis). Emil cubre pulido de componente, rendimiento y curvas de easing; Apple cubre fisicidad, manejo directo e interrumpibilidad. Usadas por separado, el resultado es notablemente menos original.
5. Si el proyecto parte de un design system de `${CLAUDE_PLUGIN_ROOT}/design-systems/`, aplica sus tokens.

## Requisitos del prototipo
- Flujo principal completo y al menos un camino alternativo.
- **Estados vacío, de carga y de error visibles**, no solo el camino feliz. Es donde se descubren los huecos de definición.
- Responsive real, verificado a 380px.
- Tokens primero: ningún valor en crudo en los componentes.
- Accesibilidad de base aunque sea prototipo: contraste AA, foco visible, navegable con teclado, jerarquía semántica. Si esto no está en el prototipo, tampoco estará en la implementación.
- Animaciones con intención y coherentes en timing y easing; respeta `prefers-reduced-motion`.
- Copy con el tono definido en la identidad. Sin lorem ipsum: el texto falso oculta problemas de producto reales.
- Marca de agua discreta "PROTOTIPO — datos ficticios".
- Ningún secreto, clave ni endpoint real dentro del archivo.

## Gate humano visual
El usuario lo abre en el navegador y decide: aprueba, pide ajustes (máximo 2 iteraciones; más significa que el problema es de definición, no de píxeles) o rechaza.

Al aprobar, registra en `docs/04-prototipo/decisiones-visuales.md` qué se validó, qué cambió respecto a la propuesta inicial y qué queda abierto.

## Reglas
- Si el prototipo revela un problema de fondo, se corrige la spec **antes** de continuar. La spec manda (`/amend` si ya estaba aprobada).
- El prototipo no es la implementación: no se reutiliza su código como base salvo decisión explícita registrada.

## Cierre
Siguiente paso según etapa: en Prototipo, enseñarlo y `/go-nogo`; en MVP+, `/plan`.
