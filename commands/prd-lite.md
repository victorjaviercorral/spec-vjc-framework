---
description: Entrevista guiada que produce el PRD-lite del proyecto. Escalado por etapa: 1 página en Prototipo, completo en MVP y Producto.
---

# /prd-lite

Produce `docs/01-prd/prd-lite.md` con `${CLAUDE_PLUGIN_ROOT}/templates/prd-lite.md`.

## Paso 0 — Precondiciones
1. Lee `${CLAUDE_PLUGIN_ROOT}/constitution.md`, `${CLAUDE_PLUGIN_ROOT}/docs/modelo.md` y `docs/00-proyecto/project.md`.
2. Si no existe `project.md`, detente: hay que ejecutar `/spec-init` antes.
3. Determina el **modo** según la etapa declarada:
   - **Boceto:** este comando no aplica. Dilo y detente.
   - **Prototipo → modo corto:** solo bloques 1, 5, 6 y 7. Objetivo: 1 página, 15-20 minutos.
   - **MVP / Producto → modo completo:** todos los bloques.
4. Anuncia el modo y el tiempo objetivo antes de empezar. Vigila la regla del 20% (constitution B.6): si la entrevista se alarga más allá del presupuesto de definición, dilo y cierra con `[PENDIENTE]` en lo que falte.

## Cómo conducir

Bloque a bloque, en orden. En cada uno: pregunta abierta, **una sola** repregunta si la respuesta es vaga, y si el dato no existe márcalo `[PENDIENTE]` y sigue. Muestra lo redactado al cerrar cada bloque y pide confirmación.

1. **Problema** — quién, qué, desde cuándo y por qué ahora. El "por qué ahora" debe responder a la urgencia del *problema*, no a la motivación del autor; si el usuario responde con su motivación, acéptala pero regístrala aparte como contexto.
2. **Usuarios** — segmento primario y su *job to be done* en una frase ("cuando [situación], quiero [motivación], para [resultado]"). Y el **anti-usuario**: para quién NO es esto.
3. **Alternativas hoy** — mínimo 2 formas reales en que hoy se resuelve el problema (productos, apaños, no hacer nada) y por qué son insuficientes. Si no hay ninguna alternativa, es señal de alarma: o el problema no existe o no lo has buscado.
4. **Evidencia** — mínimo 3 datos con fuente y fecha. Evidencia propia del autor admitida en Prototipo/MVP, citada explícitamente como tal. Observaciones cualitativas con cita literal y procedencia; sin permalink verificado, `[PENDIENTE]` (nunca fabricar la referencia).
5. **Hipótesis y asunciones** — hipótesis en formato "Creemos que [acción] para [usuario] resultará en [resultado], porque [E-n]". Después descompón en 3 asunciones y marca **la más arriesgada**: la que, si es falsa, tira todo lo demás. Cierra con cómo el trabajo de esta etapa la pone a prueba.
6. **Alcance v1** — pregunta: *"enumera lo mínimo que un usuario debe poder hacer para que la hipótesis sea comprobable"*. Lista numerada de capacidades, una línea cada una, marcadas `must` o `should`. **Valida cada capacidad contra la hipótesis**: la que no sirva a la asunción más arriesgada, se cuestiona en voz alta o se mueve a exclusiones. Este bloque es el contrato de `/specify`.
7. **Go / No-Go** — 2-4 métricas con baseline, target, plazo, cómo se mide y **con qué se instrumenta** (evento, consulta o contador concreto; la instrumentación baja a requisito en la spec). Más un criterio explícito de revisión de hipótesis. Al cerrar el bloque, escribe la fecha de revisión en `docs/00-proyecto/project.md` (constitution H.33).
8. **Requisitos críticos de valor** — pregunta directa: *"¿qué cosa, si falla, destruye la propuesta de valor?"*. Cada respuesta se registra como `RC-XX`. Este bloque existe para que la señal crítica no se diluya en narrativa; `/specify` los bajará a requisito técnico verificable.
9. **Exclusiones** — mínimo 3, cada una con su justificación.

## Gate
- Prototipo: sin gate. Ofrécelo solo si el usuario lo pide.
- MVP: gate opcional sobre el PRD (el obligatorio es el de la spec).
- Producto o cualquier etapa en X3: ejecuta `/quality-gate prd`.

## Cierre
Resume alcance y asunción más arriesgada en 3 líneas. Siguiente paso según la ruta de `docs/modelo.md` §4: en Prototipo, normalmente `/prototype`; en MVP/Producto, `/specify`.
