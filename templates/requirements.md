---
proyecto: <slug-del-proyecto>
tipo: requirements
etapa: <mvp | producto>
exposicion: <X0 | X1 | X2 | X3>
estado: borrador
version: 0.1
fecha: <YYYY-MM-DD>
tags: [spec-vjc]
---

# Requisitos — <Proyecto>

**Basado en:** PRD-lite v\<X\> §6 Alcance v1 · **Etapa:** \<mvp | producto\> · **Exposición:** \<X0-X3\>
**Fecha:** \<YYYY-MM-DD\> · **Versión:** 0.1

> Producido por `/expand`. Los `R-nn` de este documento son los **definitivos**: `/specify` los proyecta a la spec sin renumerar. Un `R-nn` sin origen no se emite (constitution A.2).

## 0. Lentes activadas

Qué lentes corren en este proyecto y por qué (`docs/modelo.md` §3.4). Las cerradas se declaran, no se omiten.

| Lente | Eje que la activa | Estado | Razón si está cerrada |
|-------|-------------------|:---:|-----------------------|
| L1 Ciclo de vida | Etapa \<n\> | activa / cerrada | |
| L2 Permisos rol × estado | Exposición \<Xn\> | | |
| L3 Validaciones y límites | Etapa \<n\> | | |
| L4 Modos de fallo | Etapa \<n\> | | |
| L5 Fronteras y vacío | Etapa \<n\> | | |
| L6 Concurrencia | Exposición \<Xn\> | | |
| L7 Auditoría y mitad negativa | Exposición \<Xn\> | | |

**Cierres por disparador** (lente activa por eje que no aplica a una capacidad concreta):

| Capacidad | Lente | Razón del cierre |
|-----------|:---:|------------------|
| | | |

## 1. Dominio

Event Storming ligero sobre las capacidades del alcance v1. Es el insumo de L1, L2 y L6: sin agregados no hay sobre qué correrlas.

**Eventos** (en pasado, lo que ocurre en el dominio)
- \<EntidadAcción — p. ej. ColecciónPublicada\>

**Comandos** (en imperativo, lo que alguien pide)
- \<AcciónEntidad — p. ej. PublicarColección\> · actor: \<rol\>

**Políticas** (cuando \<evento\> entonces \<comando\>) — bajan a EARS plantilla 2 sin traducción
- cuando \<evento\> entonces \<comando o efecto\>

**Agregados** (entidad que guarda la consistencia de un grupo de comandos)
| Agregado | Comandos que gobierna | ¿≥2 estados? | ¿≥2 actores escriben? |
|----------|----------------------|:---:|:---:|
| | | | |

## 2. Ciclo de vida de las entidades [L1]

Una subsección por agregado con ciclo de vida. Una entidad de estado único se declara en una línea y se cierra.

### 2.1 \<Entidad\>

**Estados:** \<lista\>

| Desde | Hacia | Disparador | Quién puede | Efecto sobre artefactos derivados | Req |
|-------|-------|-----------|-------------|-----------------------------------|-----|
| | | | | | R-nn |

**Transiciones prohibidas:** \<pares no permitidos, cada uno con su requisito de rechazo\>
**Invariantes por estado** \[Producto\]: \<qué debe ser cierto mientras la entidad está en cada estado\>

```mermaid
%% [Producto] Diagrama de estados. En MVP basta la tabla de arriba.
stateDiagram-v2
```

## 3. Permisos rol × estado [L2 · X2+]

Una matriz por entidad. **Cada celda denegada es un requisito**, no un hueco: es lo que impide que la autorización quede como un escalar por endpoint.

**Roles del proyecto:** \<enumerados; salen de los actores de §1\>

### 3.1 \<Entidad\>

| Rol \\ Estado | \<estado A\> | \<estado B\> | \<estado C\> |
|---------------|---|---|---|
| \<rol 1\> | | | |
| \<rol 2\> | | | |

Notación por celda: `L` leer · `E` editar · `T` transicionar · `B` borrar · `—` denegado. Cada `—` que no sea evidente lleva su `R-nn`.

**Denegación por defecto** \[X3\]: \<qué ocurre ante un par (rol, estado) no contemplado en la matriz\>

## 4. Requisitos EARS

Plantillas: **1** ubicua `El <sistema> deberá…` · **2** evento `Cuando <disparador>, el <sistema> deberá…` · **3** estado `Mientras <estado>, el <sistema> deberá…` · **4** opcional `Donde <característica>, el <sistema> deberá…` · **5** no deseada `Si <condición>, entonces el <sistema> deberá…` · **6** compleja `Mientras <estado>, cuando <disparador>, el <sistema> deberá…`

| ID | Pl. | Requisito | Capacidad | Origen | Lente | Clasif. |
|----|:---:|-----------|:---:|--------|:---:|:---:|
| R-01 | | | C-n | E-n / RC-XX / C-n / A-n / AS-nn / ADR-nnn / Xn / checklist §n | L\<n\> | v1 / v2 / desc |

Orígenes válidos: conjunto cerrado de constitution A.2. **La lente no es un origen** — va en su propia columna porque es el generador, no la procedencia.

**Regla de densidad.** Una capacidad de complejidad media —entidad con ≥2 estados, **o** que toca ≥2 recursos, **o** con ≥2 roles— produce **≥8 requisitos**, de los cuales **≥2 de plantilla 5** (no deseada) y **≥1 de plantilla 3 o 6** (estado). Si no se alcanza, la aplicación de lentes fue superficial: se re-ejecutan L4 y L5. **Prohibido rellenar con requisitos ubicuos** para llegar al número. Las capacidades por debajo del umbral de complejidad no tienen mínimo.

**Todo requisito debe ser implementable y falsable.** Si no puedes escribir el criterio de verificación que lo falsaría, no es un requisito. Prohibidos: la aserción de test disfrazada ("tratarlo como defecto bloqueante") y el rechazo de una capacidad inexistente (eso es una exclusión, no un requisito).

**Recuento verificado.** No lo escribas a mano: lo calcula `scripts/check-requirements.ps1`. Pega su salida.

| Capacidad | Total | Pl.5 | Pl.3/6 | v1 | v1 Pl.5 | v1 Pl.3/6 | ¿Cumple? |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| C-n | | | | | | | |

Las tres últimas columnas son las que importan: **la composición se verifica también después del corte**. Una capacidad que cumplía en bruto y cuyo único requisito de estado se difirió a v2 entrega v1 sin ningún requisito de estado, que es el caso que esta etapa existe para cubrir.

## 5. Corte

| | v1 | v2 | Descartado |
|---|:---:|:---:|:---:|
| Requisitos | | | |

**Fuera de v1, con razón:**

| ID | Destino | Razón |
|----|:---:|-------|
| R-nn | v2 / descartado | |

**Encaje en presupuesto:** \<suma estimada de v1 contra el presupuesto de `project.md`. Si no cabe, el recorte propuesto — constitution B.7: se recorta alcance, no se estira el plazo.\>

## 6. Historias de usuario y criterios de aceptación

Solo de las capacidades que sobreviven a v1. **Todo criterio de aceptación cita al menos un `R-nn`.** Un AC sin requisito detrás es un defecto que bloquea el cierre de este artefacto.

### HU-01 — \<capacidad\>
**Como** \<rol de §3\>, **quiero** \<acción\>, **para** \<resultado\>.

| # | Criterio (Given / When / Then) | Requisitos |
|---|--------------------------------|-----------|
| AC-01.1 | Dado \<contexto\>, cuando \<acción\>, entonces \<resultado observable\> | R-nn |

## 7. Asunciones y preguntas abiertas

**Asunciones de diseño** (constitution A.4-bis). Decisión elegida, no dato averiguado. Todo `R-nn` que dependa de una asunción la cita en su columna Origen.

| ID | Asunción | Razón | Riesgo si es falsa | Requisitos afectados | Estado |
|----|----------|-------|--------------------|---------------------|:---:|
| AS-01 | | | | R-nn | propuesta / confirmada / corregida |

**Huecos de dato** (constitution A.1). Aquí no se asume nada: se marca y se pregunta o se averigua.

- `[PENDIENTE: <qué falta y cómo obtenerlo>]`

## Historial
| Versión | Fecha | Cambio | ADR |
|:---:|:---:|--------|-----|
| 0.1 | | Versión inicial | — |
