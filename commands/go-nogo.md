---
description: Cierra el bucle del experimento. Contrasta las métricas reales contra los targets del PRD y fuerza una decisión explícita: perseverar, pivotar o descartar.
---

# /go-nogo

El comando que impide que un proyecto siga vivo por inercia. Se ejecuta en la fecha de revisión escrita en `project.md`, o antes si ya hay señal suficiente.

**Descartar aquí es un resultado de éxito del framework** (constitution B.9): significa que has ahorrado el coste de construir algo sin base. Trátalo como tal, sin dramatismo y sin penitencia documental.

## Paso 0 — Precondiciones
- Lee el Go/No-Go del PRD (`docs/01-prd/prd-lite.md` §7) y `docs/00-proyecto/project.md`.
- Si no hay PRD con Go/No-Go (etapa Boceto), usa la hipótesis implícita: pregunta al usuario qué esperaba conseguir y en qué plazo, y trabaja con eso.

## Paso 1 — Datos reales
Recoge el valor real de cada métrica. Consulta directamente la fuente que la spec definió como instrumentación (consulta a la base de datos, panel de analítica, contador).

**Si una métrica no se instrumentó**, no la estimes: márcala `[SIN DATO]` y regístralo como fallo de proceso — es exactamente lo que el plan de medición de la spec existe para evitar, y alimenta constitution H.34.

| Métrica | Baseline | Target | Real | % del target | Plazo cumplido |
|---------|:---:|:---:|:---:|:---:|:---:|

## Paso 2 — Lectura
Antes de decidir, responde por escrito y en corto:
1. ¿Se cumplió el criterio de revisión de hipótesis que se escribió en el PRD?
2. La **asunción más arriesgada** que se marcó en el PRD, ¿resultó cierta, falsa o sin comprobar?
3. Si los números son malos: ¿es que la hipótesis es falsa, o que la ejecución no la puso a prueba de verdad (nadie lo vio, el flujo estaba roto, no hubo distribución)? Esta distinción es la que separa un pivote informado de un descarte prematuro.
4. ¿Qué has aprendido que no sabías al escribir el PRD?

No adornes. Si la señal es mala, dilo con la misma claridad con la que dirías que es buena.

## Paso 3 — Decisión

Fuerza **una** de estas cuatro, sin permitir la no-decisión:

- **Perseverar** — hay señal. Define el siguiente ciclo: nueva etapa si procede, nuevo presupuesto, nuevas métricas y nueva fecha de revisión.
- **Pivotar** — el problema es real pero la solución no. Registra qué se conserva (evidencia, usuarios, componentes) y vuelve a `/prd-lite` con la hipótesis nueva.
- **Descartar** — no hay base suficiente. Cierra limpio (paso 4).
- **Extender el plazo** — solo si la ejecución no puso a prueba la hipótesis (pregunta 3), nunca por optimismo. Requiere nombrar qué cambia para que esta vez sí se ponga a prueba, y plazo nuevo y corto.

Registra la decisión como ADR en `docs/06-decisiones/` con `${CLAUDE_PLUGIN_ROOT}/templates/adr.md`, y el detalle en `docs/08-retros/` con `${CLAUDE_PLUGIN_ROOT}/templates/decision-continuidad.md`.

## Paso 4 — Cierre limpio si se descarta

Debe ser barato. Máximo 15 minutos:
1. Nota de aprendizaje breve: qué se probó, qué pasó, qué te llevas. Sin retrospectiva completa (constitution B.9).
2. Si hubo usuarios reales con datos personales: avísales con antelación razonable, ofréceles exportar su contenido y **borra los datos personales de verdad**, dejándolo documentado. Esta parte no es opcional ni negociable, aunque el proyecto muera.
3. Da de baja la infraestructura de pago y anota el ahorro.
4. Marca el estado del proyecto como `descartado` en `project.md`, con fecha y razón en una línea. El repo se archiva, no se borra.
5. Si algo construido es reutilizable (un componente, un módulo transversal, un design system), extráelo a `${CLAUDE_PLUGIN_ROOT}/modules/` o `design-systems/` antes de archivar. Un proyecto descartado que deja un activo reutilizable no fue tiempo perdido.
