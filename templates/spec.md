---
proyecto: <slug-del-proyecto>
tipo: spec
etapa: <mvp | producto>
exposicion: <X0 | X1 | X2 | X3>
estado: borrador
version: 0.1
fecha: <YYYY-MM-DD>
tags: [spec-vjc]
---

# Spec — <Proyecto>

**Basada en:** PRD-lite v<X> · **Etapa:** <mvp | producto> · **Exposición:** <X0-X3>
**Fecha:** <YYYY-MM-DD> · **Versión:** 0.1

> Secciones 1-5, 11 y 12: núcleo, siempre. Secciones 6-10 y 13: se activan por exposición (`docs/modelo.md` §3.2). Las no activadas se omiten, no se dejan vacías.

## 1. Contexto y arquitectura
**Stack elegido:** <con referencia al ADR que lo decide>
**Componentes y flujo de datos:**

```mermaid
%% Componentes, dependencias externas y límites de confianza.
%% Este diagrama es el insumo del STRIDE de la sección 5: sin él, no hay modelado de amenazas.
```

**Límites de confianza:** <dónde entra dato no confiable, dónde se cruza de cliente a servidor, qué terceros participan>

## 2. Trazabilidad
| Req ID | Requisito | Origen (PRD §/RC-XX/ADR) | Criterio de verificación | Tipo |
|--------|-----------|--------------------------|--------------------------|:---:|
| R-01 | | | | test-auto / manual / inspección |

<Todo RC-XX del PRD aparece aquí como requisito técnico verificable. Cobertura < 100% = FAIL de gate.>

## 3. Modelo de datos
Entidades, campos con tipo, relaciones e índices previstos. Cada campo clasificado.

| Entidad | Campo | Tipo | Clasificación | Notas |
|---------|-------|------|:---:|-------|
| | | | público / personal / categoría especial | |

## 4. Contratos de API / interfaz
Por operación: método y ruta, autenticación y autorización requeridas, límite de tasa, input, output, y **todo estado de error con su comportamiento definido**.

| Operación | Auth | Rate limit | Input | Output | Errores → comportamiento |
|-----------|:---:|:---:|-------|--------|--------------------------|

## 5. Seguridad y privacidad
**Checklist de seguridad** aplicada ítem a ítem (aplicable → Req ID · N/A → razón).

**STRIDE-lite** sobre el diagrama de la sección 1:
| Amenaza | Componente afectado | Mitigación | Req ID |
|---------|--------------------|-----------|--------|

### 5b. Datos personales [X2+]
**Checklist de privacidad** aplicada ítem a ítem. Mapa de datos:

| Dato | Finalidad | Base legal (art. 6) | Retención | Ubicación | Encargado |
|------|-----------|--------------------|-----------|-----------|-----------|

**Encargados del tratamiento:** <proveedor · qué datos toca · DPA · región>
**Derechos:** <mecanismo concreto para cada derecho y su SLA>

## 6. Accesibilidad [X1+]
Checklist de accesibilidad aplicada ítem a ítem. Requisitos con ID. Nivel objetivo: WCAG 2.2 AA.

## 7. Performance [X1+]
Presupuestos concretos: Lighthouse, LCP, INP, CLS, peso de JS, peso total de página, imágenes.

## 8. Estrategia de test [X2+]
Capas y herramientas · qué se automatiza y qué no (con razón) · cobertura de cada RC-XX · datos de prueba.

## 9. Operación y observabilidad [X1+]
Entornos · despliegue · reversión · seguimiento de errores y alertas · logs · copias de seguridad y prueba de restauración · modo degradado por dependencia · disponibilidad objetivo.

## 10. Plan de medición
| Métrica del Go/No-Go | Evento o consulta que la instrumenta | Req ID | Herramienta |
|----------------------|--------------------------------------|--------|-------------|

<Sin esta sección, la fecha de revisión llega sin datos y la decisión se toma por intuición.>

## 11. Flujos de usuario
Camino principal y alternativos, referenciando las pantallas de `design-identity.md`. Criterios en formato Given/When/Then, convertibles 1:1 a tests.

## 12. Fuera de alcance
<Hereda y amplía las exclusiones del PRD-lite.>

## 13. Módulo de cumplimiento [X3]
<Pagos · menores · IA · categoría especial. Ítems del módulo activado, cada uno como requisito con ID.>

## Quality Gate
<Anexado por /quality-gate.>

## Historial
| Versión | Fecha | Cambio | ADR |
|:---:|:---:|--------|-----|
| 0.1 | | Versión inicial | — |
