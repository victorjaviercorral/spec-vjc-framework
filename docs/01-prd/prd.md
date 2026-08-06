---
proyecto: spec-vjc-showcase
tipo: prd
etapa: prototipo
exposicion: X1
estado: borrador
version: 0.1
fecha: 2026-08-05
tags: [spec-vjc]
---

# PRD-lite — Spec VJC Showcase

**Etapa:** prototipo · **Exposición:** X1 · **Presupuesto:** 2026-08-05 → +1 semana
**Fecha:** 2026-08-05 · **Versión:** 0.1

> Modo corto (etapa Prototipo): solo las secciones 1, 5, 6, 7 y 10. Las demás se omiten (marcadas con N/A explícito).

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
**Hipótesis:** creemos que implementar un prototipo interactivo (Split-Screen) del framework para desarrolladores web resultará en una comprensión clara del modelo, porque podrán ver en tiempo real cómo las reglas de evidencia bloquean asunciones de la IA y cómo escala el rigor.

| # | Asunción | ¿Arriesgada? | Cómo la ponemos a prueba en esta etapa |
|---|----------|:---:|----------------------------------------|
| A1 | El diseño Split-Screen se adaptará a móviles dividiendo la pantalla horizontalmente | Alta | Obligatorio: El panel interactivo se fijará en la mitad inferior de la pantalla. |
| A2 | El formato interactivo retiene más la atención que la PPT | Media | Medición de eventos de scroll (cookie-less) |

**Asunción más arriesgada:** A1 — Si el diseño no es legible o navegable, el mensaje didáctico no llega y el usuario abandona la página.

## 5b. Riesgos
[N/A - Omitida por etapa Prototipo]

## 6. Alcance v1
Lo mínimo que un usuario debe poder hacer para que la hipótesis sea comprobable.

| # | Capacidad | must / should | Sirve a |
|---|-----------|:---:|---------|
| C1 | Visualizar narrativa y simulador de forma simultánea (Split-Screen desktop o partición móvil) | must | A2 (Atención/Didáctica) |
| C2 | Ver simulador de Error por Invención (A.1) | must | Hipótesis principal |
| C3 | Ver simulador de Quality Gate (Suelo Duro) | must | Hipótesis principal |
| C4 | Leer la matriz de riesgos reactiva (GDPR) | must | Hipótesis principal |

## 7. Go / No-Go
| Métrica | Baseline | Target | Plazo | Cómo se mide | Instrumentación |
|---------|:---:|:---:|:---:|--------------|-----------------|
| Tasa de completitud de lectura (llegar al último paso) | 0% | 40% | 1 mes | Eventos custom | Vercel Analytics (cookie-less) |

**Criterio de revisión de hipótesis:** Evaluar la adopción pasados 30 días del lanzamiento. Si no se alcanza el target, investigar fricción en la UI.
**Fecha de revisión:** 2026-09-06

## 8. Requisitos críticos de valor
[N/A - Omitida por etapa Prototipo]

## 9. Exclusiones (v1)
[N/A - Omitida por etapa Prototipo]

## 10. Asunciones de decisión (constitution A.4-bis)
| ID | Asunción | Razón | Riesgo si es falsa | Afecta a | Estado |
|----|----------|-------|--------------------|----------|:---:|
| AS-01 | Diseño HTML/CSS Vanilla estático | Reduce complejidad inicial para un prototipo rápido | Dificulta mantenimiento futuro si escala | C1 a C4 | propuesta |
| AS-02 | Se recogerán analíticas pasivas (cookie-less) | Necesario para medir adopción sin incurrir en obligaciones de GDPR (mantiene X1) | Si requiere cookies, saltará a X2. | Criterios Go/No-Go | asumido |

## Quality Gate
**Revisión ciega ejecutada por agente:** (Quality Reviewer Subagent)
- **D1 (Problema, Evidencia):** 7.0
- **D2 (Hipótesis, Asunciones, Riesgos):** 7.0
- **D3 (Alcance, Negocio, Requisitos Críticos):** 7.0
**Media:** 7.0 (Umbral Prototipo 6.5)
**Veredicto:** PASS
*(Nota: Defectos iniciales reportados por ausencia de métricas en Sección 7 y contradicción en AS-02 fueron subsanados).*

## Historial
| Versión | Fecha | Cambio | ADR |
|:---:|:---:|--------|-----|
| 0.1 | 2026-08-05 | Versión inicial estructurada bajo plantilla | — |
