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

> **Modo corto (etapa Prototipo):** solo las secciones 1, 5, 6, 7 y 10. Las demás se omiten, no se dejan vacías. La 10 nunca se omite: si has decidido algo sin evidencia, tiene que verse.
> **Secciones 2b y 5b:** solo en MVP y Producto. En Boceto y Prototipo no aplican salvo que el autor las pida explícitamente — a esa altura el modelo de negocio es especulación sobre un producto que aún no existe.

## 1. Problema
<Quién, qué, desde cuándo y POR QUÉ AHORA. La urgencia debe venir del lado del problema; si la motivación es del autor, va abajo como contexto. Máximo 6 líneas.>

**Contexto del autor (opcional):** <motivación propia, separada de la urgencia del problema>

## 2. Usuarios
**Segmento primario:** <quién es, con suficiente concreción para reconocerlo>
**Job to be done:** cuando <situación>, quiero <motivación>, para <resultado esperado>.
**Anti-usuario:** <para quién NO es esto — sirve para decir que no después>

## 2b. Propuesta de valor y modelo de negocio [MVP y Producto]

**Propuesta de valor en una frase:** <qué obtiene el usuario que hoy no tiene, en su lenguaje, no en el tuyo>

**Sostenibilidad declarada:** <ninguna | cubrir costes | ingresos> — copiada de `project.md`.

> Si es `ninguna`, esta sección se cierra aquí con una línea: **por qué está bien que no genere ingresos y con qué se sostiene** (tiempo propio, coste asumido, valor indirecto). Declararlo es obligatorio; construir un MVP sin haberse hecho la pregunta es cómo se llega a un producto funcionalmente correcto que nadie iba a pagar.

**Quién paga y por qué**
| Quién paga | Qué obtiene a cambio | Por qué pagaría en vez de no hacerlo |
|------------|----------------------|--------------------------------------|
| | | |

<Si quien paga no es quien usa, dilo explícitamente: cambia el producto entero.>

**Modelo de monetización:** <suscripción · por uso · por asiento · pago único · freemium · gratuito con coste asumido · [ASUMIDO: …]>
**Precio de partida y en qué te basas:** <o `[PENDIENTE]` si no hay referencia verificada. Un precio inventado contamina toda la economía unitaria.>

**Economía unitaria** — contrastar contra el coste mensual declarado en `project.md`.

| | Valor | Origen |
|---|---|---|
| Ingreso por usuario/mes | | |
| Coste variable por usuario/mes (infra, IA, terceros) | | |
| **Margen por usuario** | | |
| Usuarios para cubrir el coste fijo | | |

<La cifra que más productos mata no es el precio: es el coste variable por usuario, sobre todo con funcionalidad de IA. Si el margen sale negativo o desconocido, es un riesgo de §5b, no una nota.>

**Mecánicas de monetización que hay que construir en v1:** <cobro, planes, límites de uso, facturación… Cada una baja a capacidad `C-n` en §6, o se declara fuera de v1 con su razón.>

## 3. Alternativas hoy
| Alternativa actual | Por qué no es suficiente | Fuente y fecha |
|--------------------|--------------------------|----------------|
| | | |
| | | |

<Mínimo 2, incluyendo "no hacer nada" o el apaño manual si es lo que ocurre hoy. Si no encuentras ninguna alternativa, sospecha del problema.>

**Datos de terceros, verificados o marcados.** Nombre, precio, posicionamiento y funcionalidad de un producto ajeno son **datos**, no decisiones: llevan fuente y fecha de consulta, o van como `[PENDIENTE]`. Nunca de memoria. Los precios cambian y una tabla verosímil sin fuente es peor que una vacía, porque cierra la pregunta en vez de abrirla.

**Estado de verificación:** <propuesto por el agente, sin validar | validado por el autor el YYYY-MM-DD>

**Diferenciación declarada:** <en qué eres deliberadamente distinto, y qué renuncias a cambio. Si no hay renuncia, probablemente no hay diferenciación.>

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

## 5b. Riesgos [MVP y Producto]

Riesgo del proyecto, no de la hipótesis (eso es §5). Barrido por categorías: cada una se resuelve con un riesgo concreto o con `N/A` y su razón. Nunca se deja en blanco.

**Sin probabilidades inventadas.** En vez de estimar un porcentaje, se declara la **señal observable** de que el riesgo se está materializando. Un número inventado da falsa precisión; una señal se puede vigilar.

| # | Categoría | Riesgo concreto | Señal de que se materializa | Respuesta si ocurre | Mitigación ahora |
|---|-----------|-----------------|----------------------------|---------------------|------------------|
| R1 | Mercado | | | | |
| R2 | Adquisición | | | | |
| R3 | Coste y economía unitaria | | | | |
| R4 | Dependencia y concentración | | | | |
| R5 | Sustitución y comoditización | | | | |
| R6 | Ejecución | | | | |
| R7 | Regulatorio | | | | |
| R8 | Continuidad | | | | |

**Riesgo principal:** <el que, si se materializa, obliga a parar o replantear. Uno solo.>

<Mitigación válida incluye "ninguna, se acepta y se vigila la señal". Lo inválido es no haber mirado.>

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

## 10. Asunciones de decisión (constitution A.4-bis)
Decisiones de producto tomadas sin evidencia, propuestas para confirmar o corregir. **No confundir con `A1`-`A3` de la sección 5**, que son las asunciones de riesgo de la hipótesis.

Un dato, una métrica o una fuente NUNCA van aquí: van como `[PENDIENTE]` donde correspondan.

| ID | Asunción | Razón | Riesgo si es falsa | Afecta a | Estado |
|----|----------|-------|--------------------|----------|:---:|
| AS-01 | | | | <bloque o C-n> | propuesta / confirmada / corregida |

## Quality Gate
<Anexado por /quality-gate. Vacío hasta entonces.>

## Historial
| Versión | Fecha | Cambio | ADR |
|:---:|:---:|--------|-----|
| 0.1 | | Versión inicial | — |
