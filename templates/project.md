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
| **Sostenibilidad** | <ninguna \| cubrir costes \| ingresos> | <una frase> |

**Sostenibilidad** no es un tercer eje: es un campo declarado que activa las secciones de negocio del PRD en MVP y Producto. `ninguna` = no pretende ingresos y se asume su coste. `cubrir costes` = debe pagarse a sí mismo. `ingresos` = debe generar margen. Si el valor es `ingresos` y hay cobro directo, la exposición sube a X3 y se activa el módulo de pagos.

**Módulos de cumplimiento activados:** <ninguno \| pagos \| menores \| IA \| categoría especial>
**Checklists activas:** <según docs/modelo.md §3.2>

## Presupuesto

| | |
|---|---|
| Inicio | <YYYY-MM-DD> |
| Fecha límite | <YYYY-MM-DD> |
| Presupuesto de definición (20%) | <horas o días> |
| Coste mensual de infraestructura | <estimado / N-A> · alerta de facturación: <sí/no> |

### Presupuesto de preguntas (constitution B.6-bis)

Máximo **8 preguntas** en todo el flujo de definición. Agotado el cupo, lo pendiente se convierte en asunción marcada `[ASUMIDO: …]` o en `[PENDIENTE]` si es un dato.

| Comando | Cupo | Gastadas | Notas |
|---------|:---:|:---:|-------|
| `/spec-init` | 4 | | |
| `/prd-lite` | 2 | | |
| `/expand` | 2 | | |
| `/specify` | 0 | | |
| **Acumulado** | **8** | | |

<Un comando puede ceder cupo a otro; ninguno puede ampliar el total. Una tanda de confirmación sobre un bloque ya redactado no consume cupo.>

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
| requirements.md | <sin gate propio: se revisa dentro del de la spec> | | |
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
