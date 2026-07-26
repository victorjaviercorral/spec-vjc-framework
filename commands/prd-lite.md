---
description: Entrevista guiada corta que produce el PRD-lite del proyecto (1-2 paginas). Requiere /spec-init previo.
---

# /prd-lite

Conduce una entrevista corta y produce `docs/01-prd/prd-lite.md` con `templates/prd-lite.md`. Lee antes `constitution.md` y `docs/00-proyecto/project.md` del proyecto.

## Como conducir

Bloque a bloque, en este orden. En cada bloque: pregunta abierto, si la respuesta es vaga repregunta UNA vez pidiendo dato concreto, y si no existe el dato marca `[PENDIENTE]` y sigue. Muestra lo redactado al cerrar cada bloque y pide confirmacion.

1. **Problema** (quien, que, desde cuando, por que ahora). Exige el "por que ahora": es el hueco recurrente detectado en pilotos anteriores.
2. **Evidencia**: minimo 3 datos con fuente y fecha (tier ligero admite evidencia propia del autor, citada como tal). Observaciones cualitativas opcionales pero recomendadas, con cita literal.
3. **Hipotesis**: formato "Creemos que [accion] para [usuario] resultara en [outcome], porque [evidencia N]".
4. **Go/no-go**: 2-4 metricas con baseline, target, plazo y como se miden. Un criterio explicito de revision de hipotesis.
5. **Requisitos criticos de valor**: pregunta directamente "que cosa, si falla, destruye la propuesta de valor?" (privacidad, seguridad, un comportamiento concreto). Cada respuesta se registra como REQUISITO CRITICO con ID (RC-01, RC-02...) para que /specify los baje a requisito tecnico. Este bloque existe para que la senal critica no se diluya en narrativa.
6. **Exclusiones**: minimo 3 con justificacion.

## Gate
- Tier ligero: quality gate opcional (ofrecelo, no lo impongas).
- Tier medio/completo: ejecuta `/quality-gate prd` al terminar (1 revision por defecto).
- Siguiente paso al aprobar: `/specify`.
