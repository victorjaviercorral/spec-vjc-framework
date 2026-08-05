# Retrospectiva y Pivot de Diseño 01

## 1. Análisis del Fallo: ¿Por qué no funciona la V1?

Tras revisar la primera iteración generada en `docs/04-prototipo/`, hemos identificado que la propuesta ha fracasado en transmitir la profundidad y el rigor del **Spec VJC Framework**. Las causas principales son:

### Causa A: Traducción Superficial a Plantilla SaaS
- **El Error:** Se intentó encajar la lógica de un framework metodológico complejo en componentes estándar de marketing (Hero, Bento Boxes, Tarjetas de 3 columnas).
- **El Impacto:** El framework parecía un producto SaaS genérico. Se perdió la sensación de "herramienta de ingeniería" y rigor documental.

### Causa B: Pérdida Masiva de Densidad de Información
- **El Error:** Para mantener el diseño "limpio", se resumieron diapositivas enteras (como las 7 lentes de `/expand` o el sistema de Quality Gate con su suelo duro) a una simple línea de texto.
- **El Impacto:** El usuario no aprende *cómo* funciona la lógica detrás. Falta la "chicha" (casos de uso, ejemplos de prompts, mapas de datos obligatorios en GDPR).

### Causa C: "Falsa" Interactividad
- **El Error:** Se usaron animaciones de scroll (hacer aparecer elementos) en lugar de interactividad didáctica.
- **El Impacto:** El usuario es pasivo. Solo lee. No *experimenta* por qué Spec VJC es mejor que Default AI.

---

## 2. Decisiones Descartadas (Lo que NO haremos)
1. **Descartado:** Modo oscuro genérico con acentos neón sin justificación funcional.
2. **Descartado:** Secciones de marketing con bullet points (Tarjetas de "Beneficios").
3. **Descartado:** Resumir las reglas. Si una regla (ej. C.11-bis, Código sin verificación = no escrito) es crítica, debe tener su espacio explicativo.

---

## 3. La Alternativa Desarrollada (El Nuevo Enfoque)

Para solucionar esto, pivotamos hacia un diseño de **"Documentación Interactiva / Scrollytelling"** (inspirado en documentaciones premium como Stripe, Vercel o guías interactivas de ingeniería).

### Eje Central de la Alternativa:
En lugar de una página monolítica de lectura, la web usará un **Layout de Pantalla Dividida (Split-Screen)** para las secciones críticas:
- **Lado Izquierdo (Narrativa):** Explicación del concepto (El Por Qué).
- **Lado Derecho (Visualizador Interactivo):** Representación visual del framework en acción (El Cómo). 

**Ejemplos de los nuevos módulos:**
1. **El Simulador del Principio de Evidencia:** A la derecha, una "terminal" falsa. Si el usuario intenta que la IA asuma un dato, la terminal lo bloquea y muestra la regla `[PENDIENTE]`.
2. **El Prisma de `/expand`:** Una visualización donde metes un "Requerimiento Simple" y ves visualmente cómo se desglosa en las 7 lentes (Ciclo de vida, Permisos, Fallos, etc.).
3. **La Matriz Interactiva de Rigor:** En lugar de viñetas, un gráfico real (Etapa vs Exposición) donde hacer clic en "X2 (Datos)" despliega inmediatamente la Checklist de GDPR (minimización, borrado).
