# Guía del Spec VJC Framework para Antigravity & Google Stitch

Este documento establece cómo opera el **Spec VJC Framework** dentro del ecosistema de agentes autónomos de **Google Antigravity**, y cómo se integra con **Google Stitch** para el ciclo de diseño. Actúa como la fuente principal de verdad para entender los procesos, los *skills* del agente y las reglas inquebrantables.

## 1. El Cambio de Paradigma: De Claude Code a Antigravity

El framework original dependía de comandos explícitos (`/spec-init`, `/design-system`, etc.) ejecutados manualmente por el usuario. En Antigravity, la orquestación es **proactiva y basada en reglas (Customizations)**.

- **Skills (`SKILL.md`)**: Reemplazan a los comandos. Los agentes de Antigravity saben cuándo invocar habilidades como `spec-init` o `quality-gate` según el contexto del proyecto.
- **Rules (`AGENTS.md`)**: Sustituyen a la `constitution.md` para el comportamiento del agente. Dictan reglas obligatorias (ej. "No inventar datos", "Usar revisión ciega") que el modelo acata sin excepción.
- **Subagentes**: Sustituyen la dependencia en scripts externos de PowerShell para el control de calidad, utilizando entidades agénticas aisladas (como el `quality-reviewer`).

## 2. Los Flujos de Trabajo (Skills)

### A. Inicialización (`spec-init`)
Cuando un usuario indica que quiere empezar un proyecto o evaluar uno existente, el agente ejecuta el skill `spec-init`:
1. **Triaje de 4 Preguntas**: El agente evalúa conversacionalmente la Etapa (Boceto, Prototipo, MVP, Producto), el nivel de Exposición (X0 a X3), el Entorno y la Identidad Visual (si aplica).
2. **Estructuración Documental**: El agente crea los directorios necesarios (ej. `docs/00-proyecto/`) y genera el archivo `project.md` de forma autónoma.
3. **Presupuestos y Sostenibilidad**: Define umbrales de evaluación, tiempos y activa las checklists necesarias para cumplir con los estándares de seguridad y privacidad.

### B. Diseño y UI Híbrida (`design-system` con Google Stitch)
La fase de diseño abandona la generación a ciegas de CSS para apoyarse en [Google Stitch](https://stitch.withgoogle.com/). El flujo es el siguiente:
1. **Master Prompt**: El agente analiza `brand.md` (personalidad, tono, presupuesto de acentos, reglas) y formula un prompt hiper-detallado para Google Stitch.
2. **Generación Visual en Antigravity**: Opcionalmente, el agente usa `generate_image` para crear mockups iniciales (vibe checks).
3. **Iteración Externa**: El usuario pega el Master Prompt (y opcionalmente los mockups) en Google Stitch para generar los componentes UI de alta fidelidad.
4. **Ingestión de Código**: El usuario entrega el código exportado de Stitch al agente.
5. **Refactorización Física y de Capas**: El agente refactoriza el código de Stitch, extrae los valores fijos a tokens, aplica **sombras multicapa** (nada de sombras planas genéricas) y reemplaza las animaciones por defecto (ej. `all 0.3s ease`) por **curvas con nombre y físicas (Motion F.26-bis)**.

### C. Revisión Ciega (`quality-gate`)
Para evaluar la viabilidad técnica y funcional de un entregable (PRD, Spec o Plan):
1. El agente principal invoca al subagente `quality-reviewer`.
2. Al subagente **se le oculta el historial de chat y la autoevaluación**. Solo recibe el documento crudo y la rúbrica constitucional correspondiente.
3. El subagente emite un veredicto con hallazgos estrictamente citados (líneas específicas del documento).
4. El agente principal procesa el veredicto. Si la media es insuficiente según el nivel de Exposición (ej. < 6.5 para MVP), no se avanza al código.

## 3. Las Leyes del Agente (Reglas Críticas)

Todo agente operando en este framework debe cumplir con:

1. **PROHIBICIÓN ABSOLUTA DE INVENCIÓN**: Si falta una métrica, fuente o dato real, se escribe `[PENDIENTE]`. No se asumen datos del mundo (ej. "los usuarios prefieren rojo").
2. **ASUNCIONES MARCADAS**: Solo se pueden asumir decisiones de diseño o técnicas, y SIEMPRE marcadas con `[ASUMIDO: decisión | razón | riesgo]`. 
3. **PRESUPUESTO DE PREGUNTAS**: El agente dispone de un máximo de 8 preguntas durante toda la fase de definición. No puede excederse bombardeando al usuario.
4. **EVIDENCIA DE VERIFICACIÓN**: El agente no puede dar por válida una funcionalidad sin haber ejecutado un test, corrido el servidor localmente o documentado que funciona. 
5. **LOOK GENÉRICO PROHIBIDO**: No se aceptan componentes presentacionales sin un criterio previo. Toda UI debe obedecer a un `brand.md` real.

## 4. Uso del Plugin por Parte de Nuevos Agentes

Esta guía funciona como contexto fundacional. Si eres un nuevo agente o modelo leyendo este repositorio para entender qué debes hacer:
- Navega a `.agents/plugins/spec-vjc-framework/` para entender las mecánicas técnicas.
- Tus directrices de comportamiento están en `rules/AGENTS.md`.
- No pidas permisos constantes si estás seguro de que las reglas te avalan para ejecutar cambios en `docs/`. Eres proactivo.
- Tu misión no es escribir líneas de código rápidas, sino garantizar la definición, justificación, y validación estructurada del producto antes de llegar a producción.
