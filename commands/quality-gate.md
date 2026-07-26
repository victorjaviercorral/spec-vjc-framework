---
description: Revision ciega e independiente de un artefacto (prd | spec) mediante sub-agente fresco sin acceso a la autoevaluacion. 1 revision por defecto.
argument-hint: <prd | spec>
---

# /quality-gate

Ejecuta UNA revision ciega del artefacto indicado. Rondas adicionales SOLO si el usuario las solicita explicitamente (maximo 2 extra).

## Protocolo
1. Lanza un sub-agente (Task) SIN acceso a: la conversacion previa, la autoevaluacion del autor, ni versiones anteriores. Solo recibe: el artefacto, la rubrica correspondiente y la constitution.
2. El sub-agente puntua 0-10 por dimension y emite veredicto: PASS (>= 7.5), CONDICIONAL (6.0-7.4), FAIL (< 6.0), con maximo 5 hallazgos concretos ordenados por severidad y accion correctora propuesta.
3. Rubrica PRD-lite: D1 problema+evidencia (fuentes, fechas, "por que ahora"), D2 hipotesis+go/no-go (medible, plazos), D3 requisitos criticos+exclusiones (completos, sin ambiguedad).
4. Rubrica spec: D1 trazabilidad (todo requisito con origen y criterio de verificacion; RC-XX cubiertos al 100 por ciento o FAIL automatico), D2 completitud tecnica (modelo de datos, contratos, estados de error), D3 seguridad+performance (checklists aplicadas item a item).
5. El resultado se anexa al final del artefacto en una seccion "Quality Gate" con fecha, veredicto y hallazgos. Sin reescribir el historial.

## Criterio de avance (constitution B.5)
- Tier ligero: PASS o CONDICIONAL >= 6.5 avanza.
- Tier medio/completo: >= 7.0 avanza.
- El autor corrige los hallazgos que acepte; los que rechace se documentan con razon. No hay persecucion de PASS: se aplica el criterio y se avanza o se corrige UNA vez.
