---
proyecto: <slug-del-proyecto>
tipo: decision
etapa: <boceto | prototipo | mvp | producto>
exposicion: <X0 | X1 | X2 | X3>
estado: <perseverar | pivotar | descartar | extender>
version: 1
fecha: <YYYY-MM-DD>
tags: [spec-vjc, go-nogo]
---

# Decisión de continuidad — <Proyecto>

**Fecha:** <YYYY-MM-DD> · **Etapa:** <...> · **Ciclo:** <n> · **ADR asociado:** <ADR-XXX>

## 1. Resultados frente al Go/No-Go

| Métrica | Baseline | Target | Real | % del target | Plazo |
|---------|:---:|:---:|:---:|:---:|:---:|
| | | | | | |

**Métricas sin dato:** <ninguna | listar — y por qué no se instrumentaron; es un fallo de proceso, no un detalle>

## 2. Lectura

**¿Se cumplió el criterio de revisión del PRD?**

**La asunción más arriesgada (<A-n>) resultó:** cierta | falsa | sin comprobar
<Por qué lo sabes.>

**Si la señal es mala, ¿hipótesis falsa o ejecución insuficiente?**
<Distinción clave: ¿lo vio alguien de verdad? ¿funcionaba el flujo? ¿hubo distribución? Un pivote informado y un descarte prematuro se parecen mucho desde fuera.>

**Qué he aprendido que no sabía al escribir el PRD:**

## 3. Decisión

**<PERSEVERAR | PIVOTAR | DESCARTAR | EXTENDER PLAZO>**

<Una frase con la razón.>

**Si perseverar:** nueva etapa · nuevo presupuesto · nuevas métricas · nueva fecha de revisión.
**Si pivotar:** qué se conserva (evidencia, usuarios, componentes) · nueva hipótesis a llevar a `/prd-lite`.
**Si extender:** qué cambia para que esta vez la hipótesis sí se ponga a prueba · plazo nuevo y corto.

## 4. Cierre (solo si se descarta)

- [ ] Nota de aprendizaje escrita (esta misma, no hace falta más)
- [ ] Usuarios avisados con antelación razonable
- [ ] Exportación de sus datos ofrecida
- [ ] **Datos personales borrados y borrado documentado**
- [ ] Infraestructura de pago dada de baja · ahorro mensual: <n>
- [ ] Activos reutilizables extraídos a `modules/` o `design-systems/`: <cuáles>
- [ ] Estado `descartado` con fecha y razón en `project.md`
- [ ] Repo archivado (no borrado)

## 5. Aprendizaje para el framework

<Solo si es generalizable a futuros proyectos. Se propone como cambio al framework vía CHANGELOG (constitution H.35). Si no hay nada generalizable, escríbelo: también es información.>
