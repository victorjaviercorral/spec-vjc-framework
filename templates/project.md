---
proyecto: <slug-del-proyecto>
tipo: proyecto
etapa: <boceto | prototipo | mvp | producto>
exposicion: <X0 | X1 | X2 | X3>
estado: activo
version: 0.1
fecha: <YYYY-MM-DD>
tags: [spec-vjc]
---

# Proyecto — <Nombre>

**Repo:** <url> · **Estado:** activo | pausado | descartado | en producción
**Última actualización:** <YYYY-MM-DD>

## Clasificación

| Eje | Valor | Justificación |
|-----|-------|---------------|
| **Etapa** | <boceto \| prototipo \| mvp \| producto> | <una frase> |
| **Exposición** | <X0 \| X1 \| X2 \| X3> | <una frase> |

**Módulos de cumplimiento activados:** <ninguno \| pagos \| menores \| IA \| categoría especial>
**Checklists activas:** <según docs/modelo.md §3.2>

## Presupuesto

| | |
|---|---|
| Inicio | <YYYY-MM-DD> |
| Fecha límite | <YYYY-MM-DD> |
| Presupuesto de definición (20%) | <horas o días> |
| Coste mensual de infraestructura | <estimado / N-A> · alerta de facturación: <sí/no> |

## Entorno

| | |
|---|---|
| Desarrollo | <SO + runtime y versión> |
| Despliegue | <proveedor y región> |
| Dominio | <o [PENDIENTE]> |

## Stack previsto
<lenguajes, framework, base de datos, servicios. Las decisiones estructurales van a ADR, aquí solo el titular.>

## Gates

Umbrales según constitution C.14 para esta etapa y exposición:
- Media mínima: <n> · Suelo por dimensión: <n>
- Rondas por defecto: 1

| Artefacto | Gate | Fecha | Veredicto |
|-----------|:---:|:---:|-----------|
| PRD-lite | <obligatorio/opcional/N-A> | | |
| Spec | | | |

## Hitos

| Hito | Fecha prevista | Fecha real |
|------|:---:|:---:|
| Definición cerrada | | |
| Esqueleto desplegado | | |
| Lanzamiento (preflight GO) | | |
| **Revisión Go/No-Go** | <YYYY-MM-DD> | |

## Registro de decisiones de proceso
<Cambios de etapa, cambios de exposición, ampliaciones de presupuesto: fecha, qué cambió y por qué. Constitution B.7 y B.10 exigen que estas decisiones sean explícitas, no derivas.>

| Fecha | Decisión | Razón |
|:---:|----------|-------|

## Métricas del framework (constitution H.34)
| Fase | Tiempo real | Rondas de gate | Notas |
|------|:---:|:---:|-------|

**Gate escapes:** <defectos aparecidos tras el lanzamiento que un gate debería haber detectado>
