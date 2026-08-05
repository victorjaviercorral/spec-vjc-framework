---
name: spec-init
description: Inicializa o reclasifica un proyecto bajo el Spec VJC Framework. Declara etapa, exposición, presupuesto y entorno, y crea la estructura documental correspondiente.
---

# spec-init Skill

Inicializador del framework adaptado para Antigravity. Este skill guía al agente para cumplir los principios del framework en la etapa inicial.

Si ya existe `docs/00-proyecto/project.md`, esto es una **reclasificación**: el agente debe conservar los artefactos, actualizar los parámetros base y crear lo que falte.

## Paso 0 — Precondiciones
- Si el proyecto no tiene un repositorio git, el agente debe inicializarlo ejecutando `git init` a través del `run_command` (sin preguntar, pero informando al usuario).
- Asegurarse de tener un nombre de proyecto claro.

## Paso 1 — Triaje Interactivo
El agente debe interactuar con el usuario para determinar la Etapa y Exposición del proyecto. Como agente de Antigravity, usa el chat de manera conversacional, preguntando estas 4 cosas, idealmente agrupadas o de forma secuencial rápida si hay dudas:

**1. Etapa y presupuesto**
Opciones: Boceto (desechable), Prototipo (validar concepto), MVP (usuarios reales), Producto (larga vida).

**2. Exposición (Niveles X0 a X3)**
- ¿Lo verá alguien más que tú?
- ¿Habrá datos personales (email, analítica identificable)?
- ¿Hay dinero, menores, biometría, salud, o interactúa la IA directamente con el usuario?
Clasifica en X0 (Privado) a X3 (Alto Riesgo). Ante la duda, asume el nivel más alto.
Determina la **sostenibilidad**: ninguna, cubrir costes, o ingresos.

**3. Entorno**
SO, runtime, base de datos y destino de despliegue.

**4. Identidad Visual** (Sólo si Etapa >= Prototipo)
Preguntar por la personalidad en 3 adjetivos, referencias visuales, y estilo general (claro/oscuro). 

> **NOTA PARA EL AGENTE:** Si el usuario ya dio esta información en su prompt inicial, ¡no la vuelvas a preguntar! Asúmela y confírmala en tu resumen.

## Paso 2 — Estructura Documental
Utiliza `write_to_file` y `run_command` (o mkdir) para crear la estructura base en el directorio del proyecto:
- Boceto: solo `docs/00-proyecto/`
- Prototipo: `docs/00-proyecto/`, `docs/01-prd/`, `docs/03-diseno/`, `docs/04-prototipo/`
- MVP/Producto: Toda la estructura anterior más `docs/05-implementacion/`, `docs/07-comunicacion/`.

## Paso 3 — docs/00-proyecto/project.md
Crea este archivo como fuente de verdad. Debe incluir:
- nombre
- etapa y justificación
- presupuesto (tiempo)
- exposición y módulos activados
- sostenibilidad
- entorno (desarrollo y despliegue)
- stack
- umbrales de gate (Boceto: ninguno, MVP: 6.5, Producto: 7.0, X3: 7.5)
- fecha de revisión Go/No-Go

## Reglas Críticas
1. **No inventar un dato.** Lo que no sepas va como `[PENDIENTE]`. Las asunciones de diseño deben ir marcadas con `[ASUMIDO: decisión | razón | riesgo]`.
2. Eres proactivo. Si puedes inferir algo sin riesgo, ofrécelo al usuario como asumido para acelerar.
3. Al finalizar, indica claramente cuál es el siguiente paso (ej. `design-system`).
