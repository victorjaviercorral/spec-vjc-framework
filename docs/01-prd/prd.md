---
proyecto: spec-vjc-showcase
tipo: prd
etapa: prototipo
exposicion: X1
estado: borrador
version: 0.3
fecha: 2026-08-06
tags: [spec-vjc]
---

# PRD-lite — Spec VJC Showcase

**Etapa:** prototipo · **Exposición:** X1 · **Presupuesto:** 2026-08-05 → +1 semana
**Fecha:** 2026-08-06 · **Versión:** 0.3

> Modo corto (etapa Prototipo): solo las secciones 1, 5, 6, 7 y 10. Las demás se omiten (marcadas con N/A explícito).
>
> **Nota de versión:** esta v0.3 sincroniza el alcance con `docs/02-spec/spec.md` v0.3 tras dos cambios reales no reflejados hasta ahora en el PRD: (1) el commit `3adcf5c` (repo `victorcorral`) abandonó el diseño Split-Screen de la hipótesis original por un layout vertical de una columna, y añadió un modal "Playbook" que no estaba en el alcance v1; (2) esta misma sesión añade el requisito de que la página respete la estructura de navegación (enlace de vuelta, cierre con footer) del resto de `victorjaviercorral.com`. Ver `docs/informe-auditoria-commit-3adcf5c.md`.

## 1. Problema
Escribir código con IA se ha vuelto trivial, pero los agentes asumen reglas de negocio y derivan silenciosamente, lo que provoca colapsos legales o de mercado (el espejismo de Default AI). Se necesita demostrar visual y prácticamente por qué la definición rigurosa previa es la verdadera solución, ya que una PPT estática no transmite la experiencia interactiva de un framework determinista.

**Contexto del autor (opcional):** Necesidad de tener un espacio público didáctico dentro de `victorjaviercorral.com` para explicar el framework a otros desarrolladores y demostrar la experiencia generada.

## 2. Usuarios
[N/A - Omitida por etapa Prototipo]

## 2b. Propuesta de valor y modelo de negocio
[N/A - Omitida por etapa Prototipo]

## 3. Alternativas hoy
[N/A - Omitida por etapa Prototipo]

## 4. Evidencia
[N/A - Omitida por etapa Prototipo]

## 5. Hipótesis y asunciones
**Hipótesis:** creemos que implementar un prototipo interactivo del framework para desarrolladores web resultará en una comprensión clara del modelo, porque podrán ver en tiempo real cómo las reglas de evidencia bloquean asunciones de la IA y cómo escala el rigor.

| # | Asunción | ¿Arriesgada? | Cómo la ponemos a prueba en esta etapa |
|---|----------|:---:|----------------------------------------|
| A1 | **[RESUELTA, distinto de lo propuesto]** El diseño Split-Screen se adaptaría a móviles dividiendo la pantalla horizontalmente | Alta | El Split-Screen con panel fijo generó un bug de scroll real en desktop (`informe-verificacion-2026-08-06.md`, H-07: el panel visualizador se desplazaba fuera de la pantalla). Se resolvió no depurando el layout, sino abandonándolo — commit `3adcf5c` sustituye el Split-Screen por una columna única con narrativa y tarjeta ilustrativa lado a lado por sección. La asunción original queda cerrada como "no viable tal como se planteó"; C1 se redefine en consecuencia (ver sección 6). |
| A2 | El formato interactivo retiene más la atención que la PPT | Media | Medición de eventos de scroll (cookie-less) |

**Asunción más arriesgada (histórica):** A1 — resuelta según lo anterior; ya no bloquea la hipótesis principal.

## 5b. Riesgos
[N/A - Omitida por etapa Prototipo]

## 6. Alcance v1
Lo mínimo que un usuario debe poder hacer para que la hipótesis sea comprobable.

| # | Capacidad | must / should | Sirve a |
|---|-----------|:---:|---------|
| C1 | Visualizar narrativa y tarjeta ilustrativa juntas por sección, en layout vertical de una columna (redefinida en v0.3 — sustituye al Split-Screen original, ver A1) | must | A2 (Atención/Didáctica) |
| C2 | Ver simulador de Error por Invención (A.1) | must | Hipótesis principal |
| C3 | Ver simulador de Quality Gate (Suelo Duro) | must | Hipótesis principal |
| C4 | Leer la matriz de riesgos reactiva (GDPR) | must | Hipótesis principal |
| C5 | Ver un "Playbook" — deck de diapositivas a pantalla completa navegable, accesible desde un botón en la sección de introducción | should | A2 (Atención/Didáctica) — **añadida en v0.3**: implementada por el commit `3adcf5c` sin pasar antes por este PRD; se registra aquí para cerrar la trazabilidad, no para justificarla a posteriori |
| C6 | La página respeta la estructura de navegación del resto de `victorjaviercorral.com`: enlace de vuelta al portfolio bajo el NavBar, y footer de cierre con copyright y enlaces sociales, igual que el resto de páginas del sitio (ver `src/pages/Tools.tsx`, `src/components/ContactSection.tsx`) | must | Coherencia de UX del sitio — **añadida en v0.3**, a petición explícita del autor |

## 7. Go / No-Go
| Métrica | Baseline | Target | Plazo | Cómo se mide | Instrumentación |
|---------|:---:|:---:|:---:|--------------|-----------------|
| Tasa de completitud de lectura (llegar al último paso) | 0% | 40% | 1 mes | Eventos custom | Umami Analytics (cookie-less) |

**Criterio de revisión de hipótesis:** Evaluar la adopción pasados 30 días del lanzamiento. Si no se alcanza el target, investigar fricción en la UI.
**Fecha de revisión:** 2026-09-06

## 8. Requisitos críticos de valor
[N/A - Omitida por etapa Prototipo]

## 9. Exclusiones (v1)
[N/A - Omitida por etapa Prototipo]

## 10. Asunciones de decisión (constitution A.4-bis)
| ID | Asunción | Razón | Riesgo si es falsa | Afecta a | Estado |
|----|----------|-------|--------------------|----------|:---:|
| AS-01 | **[ACTUALIZADA v0.3]** Integración como componentes React nativos dentro de `victorcorral` (`/product-framework`), no HTML/CSS/JS Vanilla como se propuso originalmente | El HTML/CSS/JS Vanilla estático quedó descartado al decidir la superficie de despliegue real (H-08, `informe-verificacion-2026-08-06.md`): integrarse dentro del stack Vite/React ya existente de `victorcorral` en vez de un microsite aparte | Divergencia entre spec y código si no se sincronizan tras cada refactor de arquitectura (ya ocurrió una vez, ver `informe-auditoria-commit-3adcf5c.md`) | C1 a C6 | asumido |
| AS-02 | Se recogerán analíticas pasivas (cookie-less) | Necesario para medir adopción sin incurrir en obligaciones de GDPR (mantiene X1) | Si requiere cookies, saltará a X2. | Criterios Go/No-Go | asumido |

## Quality Gate
**Revisión ciega ejecutada por agente:** (Quality Reviewer Subagent) - 2026-08-06, **sobre la v0.2**
- **D1 (Problema, Evidencia):** 7.5
- **D2 (Hipótesis, Asunciones, Riesgos):** 8.0
- **D3 (Alcance, Negocio, Requisitos Críticos):** 7.5
**Media:** 7.66 (Umbral Prototipo 6.5)
**Veredicto:** PASS (v0.2)

**⚠️ No vigente para v0.3.** Este veredicto no evaluó C5 (Playbook) ni C6 (consistencia de navegación con el sitio), ni la resolución de A1 — los tres se añaden en esta versión. **Pendiente: re-ejecutar `/quality-gate`** sobre esta v0.3 junto con `spec.md` v0.3 antes de considerar el PRD aprobado.

## 12. Tareas dependientes / Fuera de Alcance (v1)
- **Casos de Uso**: La migración de las pantallas "Lego Virtual Museum" y "PM Toolkit" se declaran explícitamente como trabajo dependiente para futuras iteraciones, con el fin de concentrar esfuerzos en la robustez y diseño "WOW" del framework core.

## Historial
| Versión | Fecha | Cambio | ADR |
|:---:|:---:|--------|-----|
| 0.3 | 2026-08-06 | Sincronización de trazabilidad con `spec.md` v0.3: A1 cerrada como resuelta (Split-Screen abandonado, no depurado), C1 redefinida, C5 (Playbook) y C6 (consistencia de navegación con el sitio) añadidas al alcance, AS-02/§7 corregidos a Umami Analytics (coincide con spec.md). Quality Gate de v0.2 marcado como no vigente. | — |
| 0.2 | 2026-08-06 | Actualización para reflejar cambio a entorno React y declarar Casos de Uso como dependientes | — |
| 0.1 | 2026-08-05 | Versión inicial estructurada bajo plantilla | — |
