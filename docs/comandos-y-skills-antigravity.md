# Guía de Invocación: Comandos y Skills en Antigravity

En Claude Code utilizabas comandos estrictos con una barra (`/comando`). En **Antigravity**, el paradigma cambia de "ejecución de scripts" a **"Activación de Skills"**. 

Para invocar cualquiera de estos flujos, simplemente pídeselo al agente en lenguaje natural o mencionando el nombre del skill. Por ejemplo:
- *"Inicia el proyecto usando spec-init"*
- *"Ejecuta un quality-gate sobre el PRD"*
- *"Vamos a hacer el design-system para este proyecto"*

El agente de Antigravity leerá automáticamente las reglas (el `SKILL.md` asociado) y guiará el proceso. A continuación, el mapa exacto de qué pedir y cuándo pedirlo.

---

## 1. Fase de Definición (El Vía Núcleo)

### `spec-init` (Skill Activo)
- **Cuándo invocarlo:** Al inicio absoluto de una idea o cuando necesites reclasificar un proyecto existente (subir de Boceto a MVP).
- **Qué hace:** Activa el triaje conversacional de 4 preguntas. Determina la Etapa, la Exposición (X0-X3) y genera la estructura base de carpetas y el archivo `project.md`.

### `prd-lite` (Skill Conceptual)
- **Cuándo invocarlo:** Inmediatamente después de `spec-init` (para Prototipos, MVPs y Productos).
- **Qué hace:** El agente formulará el problema, la hipótesis, el riesgo principal y el alcance. Si tienes integrado Antigravity, el agente utilizará investigación en la web (`search_web`) para sustentar fuentes y competidores reales antes de escribir el documento.

### `expand` y `specify` (Skills Conceptuales)
- **Cuándo invocarlo:** Tras aprobar el PRD (para MVPs y Productos).
- **Qué hace:** El agente expande el alcance a requerimientos técnicos exhaustivos, rastreando su origen (`C-n`, `RC-XX`). Aquí es donde las *Rules* actúan más fuerte: el agente tiene estrictamente prohibido inventar métricas, marcando asunciones técnicas con `[ASUMIDO: ...]`.

---

## 2. Fase de Diseño e Interfaz

### `design-system` (Skill Activo - Híbrido)
- **Cuándo invocarlo:** Después de tener clara la identidad del proyecto (Prototipo+).
- **Qué hace:** No genera código final a ciegas. Genera un **Master Prompt** hiper-optimizado (y mockups opcionales) que tú llevarás a **Google Stitch** (`stitch.withgoogle.com`). 
- **Cómo continuar:** Una vez tengas el diseño en Stitch, le dices al agente: *"He exportado el código de Stitch, intégralo"*. El agente ingerirá el código, aislará los tokens CSS, aplicará las físicas de motion y sombras en capas, y adaptará la lógica a tu framework.

---

## 3. Fase de Control de Calidad

### `quality-gate` (Skill Activo)
- **Cuándo invocarlo:** Antes de pasar a escribir código, cuando el PRD, la Spec o el Plan están "terminados".
- **Qué hace:** El agente actual pausa su contexto y levanta un subagente paralelo (`quality-reviewer`) que auditará el documento. 
- **Por qué pedirlo:** Garantiza la **revisión ciega**; el subagente será despiadado evaluando los umbrales (ej. no dejará pasar un MVP con menos de 6.5) porque no está sesgado por el esfuerzo que os haya costado llegar a ese punto en el chat.

---

## 4. Fase de Operación y Cambios

### `amend` (Skill Conceptual)
- **Cuándo invocarlo:** Si a mitad de implementación hay que cambiar un requisito (MVP+).
- **Qué hace:** Le pides al agente *"Haz un amend sobre el requisito X"*. El agente analizará el impacto, versionará el artefacto, redactará la razón y alineará el código con la spec. El código y la spec jamás deben divergir.

### `go-nogo` y `go-live` (Skills Conceptuales)
- **Cuándo invocarlo:** Al finalizar una hipótesis (`go-nogo`) o antes de publicar para usuarios reales (`go-live`).
- **Qué hace:** Obliga al agente a revisar la infraestructura, asegurar que los secretos (`.env`) no estén expuestos, verificar el checklist de seguridad/GDPR según la exposición X2/X3, y preparar el despliegue final.

---

> **💡 Pro Tip para Antigravity:**
> No tienes que memorizar comandos rígidos. Antigravity entiende la intención. Puedes decir: *"Siento que la spec ya está lista, audítala"* y el agente sabrá que debe invocar internamente el proceso de **quality-gate** apoyado en el subagente. 
> Del mismo modo, si le dices *"Quiero diseñar el dashboard"*, sabrá que debe iniciar el **design-system** preparando el terreno para Google Stitch.
