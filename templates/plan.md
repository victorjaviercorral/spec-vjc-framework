---
proyecto: <slug-del-proyecto>
tipo: plan
etapa: <mvp | producto>
exposicion: <X0 | X1 | X2 | X3>
estado: borrador
version: 0.1
fecha: <YYYY-MM-DD>
tags: [spec-vjc]
---

# Plan de implementación — <Proyecto>

**Basado en:** Spec v<X> <+ prototipo aprobado> · **Fecha:** <YYYY-MM-DD>
**Presupuesto de la etapa:** <fecha límite> · **Estimación total del plan:** <n días>

## Fase 0 — Setup y seguridad
- **Objetivo:** entorno reproducible y seguro antes de la primera funcionalidad.
- **Incluye:** variables de entorno · `.env` en `.gitignore` · permisos y RLS · auditoría inicial de dependencias · smoke test en el entorno objetivo.
- **Definición de hecho:** <comprobación concreta y ejecutable>

## Fase 1 — Esqueleto desplegado
- **Objetivo:** recorrido extremo a extremo mínimo, funcionando en el entorno **real** de producción.
- **Definición de hecho:** URL pública que lee y escribe de verdad, verificada desde fuera de la máquina de desarrollo.

## Fase N — <nombre>
- **Objetivo:**
- **Requisitos cubiertos:** <IDs de la spec>
- **Checklists activas:**
- **Riesgos:** <y qué los descartaría>
- **Definición de hecho:** <verificable, con el comando o comprobación concreta>
- **Estimación:** <n días — ninguna fase supera 5 días sin entregar algo visible>

## Cobertura de requisitos
| Req ID | Fase | | Req ID | Fase |
|--------|:---:|---|--------|:---:|

<Todo requisito de la spec asignado. Los huérfanos se reportan aquí, no se omiten.>

## Verificación de requisitos críticos
| RC | Cómo se verifica | Tipo | Fase |
|----|------------------|:---:|:---:|
| RC-01 | | test-auto | |

## Encaje en presupuesto
**Estimación total:** <n días> · **Presupuesto disponible:** <n días>
- [ ] Cabe. 
- [ ] No cabe → **recorte propuesto:** <qué fases o requisitos salen> (constitution B.7: se recorta alcance, no se estira el plazo)
