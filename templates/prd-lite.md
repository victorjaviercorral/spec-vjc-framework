---
proyecto: <slug-del-proyecto>
tipo: prd
etapa: <boceto | prototipo | mvp | producto>
exposicion: <X0 | X1 | X2 | X3>
estado: borrador
version: 0.1
fecha: <YYYY-MM-DD>
tags: [spec-vjc]
---

# PRD-lite — <Proyecto>

**Etapa:** <boceto | prototipo | mvp | producto> · **Exposición:** <X0 | X1 | X2 | X3> · **Presupuesto:** <inicio → fecha límite>
**Fecha:** <YYYY-MM-DD> · **Versión:** 0.1

> **Modo corto (etapa Prototipo):** solo las secciones 1, 5, 6 y 7. Las demás se omiten, no se dejan vacías.

## 1. Problema
<Quién, qué, desde cuándo y POR QUÉ AHORA. La urgencia debe venir del lado del problema; si la motivación es del autor, va abajo como contexto. Máximo 6 líneas.>

**Contexto del autor (opcional):** <motivación propia, separada de la urgencia del problema>

## 2. Usuarios
**Segmento primario:** <quién es, con suficiente concreción para reconocerlo>
**Job to be done:** cuando <situación>, quiero <motivación>, para <resultado esperado>.
**Anti-usuario:** <para quién NO es esto — sirve para decir que no después>

## 3. Alternativas hoy
| Alternativa actual | Por qué no es suficiente |
|--------------------|--------------------------|
| | |
| | |

<Mínimo 2, incluyendo "no hacer nada" o el apaño manual si es lo que ocurre hoy. Si no encuentras ninguna alternativa, sospecha del problema.>

## 4. Evidencia
| # | Dato | Fuente | Fecha |
|---|------|--------|-------|
| E1 | | | |
| E2 | | | |
| E3 | | | |

Observaciones cualitativas (recomendado): cita literal + procedencia verificable. Sin permalink comprobado, `[PENDIENTE]`.

## 5. Hipótesis y asunciones
**Hipótesis:** creemos que <acción> para <usuario> resultará en <resultado>, porque <E-n>.

| # | Asunción | ¿Arriesgada? | Cómo la ponemos a prueba en esta etapa |
|---|----------|:---:|----------------------------------------|
| A1 | | | |
| A2 | | | |
| A3 | | | |

**Asunción más arriesgada:** <A-n — la que, si es falsa, invalida todo lo demás>

## 6. Alcance v1
Lo mínimo que un usuario debe poder hacer para que la hipótesis sea comprobable.

| # | Capacidad | must / should | Sirve a |
|---|-----------|:---:|---------|
| C1 | | must | A1 |
| C2 | | | |

<Contrato de /specify. Toda capacidad debe servir a la hipótesis; la que no, se cuestiona o se mueve a exclusiones.>

## 7. Go / No-Go
| Métrica | Baseline | Target | Plazo | Cómo se mide | Instrumentación |
|---------|:---:|:---:|:---:|--------------|-----------------|
| | | | | | |

**Criterio de revisión de hipótesis:** <si a los N meses no se alcanza X, revisar antes de invertir más.>
**Fecha de revisión:** <YYYY-MM-DD — se copia a project.md y se ejecuta con /go-nogo>

## 8. Requisitos críticos de valor
| ID | Requisito (que, si falla, destruye la propuesta de valor) | Evidencia origen |
|----|-----------------------------------------------------------|------------------|
| RC-01 | | |

## 9. Exclusiones (v1)
1. <exclusión> — <justificación>
2.
3.

## Quality Gate
<Anexado por /quality-gate. Vacío hasta entonces.>

## Historial
| Versión | Fecha | Cambio | ADR |
|:---:|:---:|--------|-----|
| 0.1 | | Versión inicial | — |
