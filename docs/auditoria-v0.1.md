# Auditoría de la v0.1 y diseño de la evolución

> **Documento histórico.** Es la auditoría que originó la v1.0 y se conserva como registro de por qué el framework es como es. La v1.0 finalmente adoptó el modelo de dos ejes de la sección 6 en lugar del plan incremental de la sección 3, por lo que **algunos nombres de aquí no coinciden con los definitivos** (`despliegue-observabilidad.md` → `checklists/operacion.md`; `/review-metrics` → `/go-nogo`; los tiers → ejes Etapa y Exposición). La referencia vigente es `constitution.md` y `docs/modelo.md`.


**Fecha:** 2026-07-27 · **Autor de la revisión:** revisión técnica experta (Claude, sesión dedicada) · **Estado:** propuesta para ejecutar
**Alcance:** evaluación completa de constitution, 8 comandos, 3 checklists, 7 plantillas, docs y manifests del plugin, contrastada con el output real del piloto (PRD-lite de LegoVirtualMuseum).

---

## 0. Resumen ejecutivo

El framework v0.1 tiene una base conceptual **muy por encima de la media** de frameworks caseros de spec-driven development: revisión ciega con criterios de parada, trazabilidad RC-XX → requisito verificable, identidad de diseño anti-genérica y tiers por riesgo son decisiones que la mayoría de equipos profesionales no tienen formalizadas. Eso se conserva íntegro.

Los problemas son de **cobertura y de ingeniería del propio plugin**, no de filosofía:

1. **El PRD-lite no define la solución.** Salta de hipótesis a requisitos críticos sin decir qué se construye: sin usuarios/JTBD, sin alternativas, sin alcance v1 (solo exclusiones). Es la causa raíz de que el output del piloto parezca "muy mejorable".
2. **El pipeline termina donde empieza el riesgo real.** Todo acaba en `/tasks`; implementación, verificación, despliegue, lanzamiento y medición del go/no-go están sin gobernar. Las métricas de go/no-go se definen en el PRD… y nadie garantiza que se instrumenten.
3. **Tres áreas legalmente exigibles en la UE no existen como área propia:** protección de datos (GDPR/ePrivacy), accesibilidad (WCAG 2.2 / European Accessibility Act, exigible desde jun-2025) y obligaciones legales básicas (términos, cookies, textos legales).
4. **Como plugin de Claude Code tiene deuda técnica:** rutas de plugin no resolubles, quality-gate sin subagente definido, sin verificación de precondiciones entre fases, versionado descuadrado (constitution v0.1, plugin.json 0.1.0, uso real v0.1.1).
5. **El quality-gate es manipulable:** promedio simple de 3 dimensiones sin suelos, hallazgos limitados a 5 sin justificar, sin exigencia de evidencia citada.

La v0.2 propuesta: constitution ampliada a 7 bloques / 24 principios, pipeline extendido con `/implement`, `/preflight` y `/review-metrics`, 4 checklists nuevas (privacidad-GDPR, accesibilidad, testing, despliegue-observabilidad), plantillas PRD-lite y spec reescritas, quality-gate v2 con rúbricas ancladas, y saneamiento completo del plugin (rutas, agente revisor, precondiciones, versionado).

---

## 1. Scorecard de la v0.1

| Área | Nota | Justificación breve |
|------|:---:|---------------------|
| Filosofía y principios (constitution) | 8/10 | Sólida y original; le faltan bloques enteros (datos, a11y, operaciones) y tiene duplicidades con quality-gate.md |
| Definición de producto (prd-lite) | 5/10 | Sin alcance de solución, sin usuarios/JTBD, sin alternativas, sin riesgos/asunciones |
| Especificación técnica (specify + template) | 6/10 | Buena trazabilidad; sin arquitectura, sin test strategy, sin observabilidad, sin a11y, sin plan de medición |
| Quality gate | 6/10 | Concepto excelente (revisión ciega + parada), ejecución débil (rúbrica manipulable, sin agente definido) |
| Prototipo | 7,5/10 | Bien planteado; falta checklist de aprobación explícita y accesibilidad en el gate visual |
| Plan y tasks | 6/10 | Falta walking skeleton (desplegar esqueleto E2E primero), evidencia de verificación por tarea |
| Seguridad | 7/10 | Checklist decente; sin cabeceras modernas completas, sin supply chain, sin gestión de sesiones |
| Privacidad / GDPR | 2/10 | Inexistente como área; solo aparece si el usuario lo menciona (como pasó en el piloto) |
| Accesibilidad | 3/10 | 1 línea en checklist UX; sin criterio WCAG, sin EAA, sin verificación |
| Performance | 7/10 | Presupuestos correctos; faltan Core Web Vitals completos (INP, CLS) y medición continua |
| Despliegue / operaciones / observabilidad | 1/10 | Inexistente ("automatización de despliegue" diferida sin sustituto manual) |
| Testing | 3/10 | Criterios de verificación por requisito, pero sin estrategia de test como artefacto |
| Ingeniería del plugin | 4/10 | Rutas ambiguas, sin agents/, sin hooks, sin precondiciones, sin LICENSE, versionado inconsistente |
| **Global** | **5,4/10** | Fundación excelente, cobertura incompleta para producto real en producción en la UE |

---

## 2. Hallazgos detallados

Severidad: 🔴 crítico (bloquea calidad profesional) · 🟠 alto · 🟡 medio · ⚪ bajo.

### 2.1 Producto y definición

- **H-01 🔴 El PRD-lite no contiene la solución.** `templates/prd-lite.md` tiene: problema, evidencia, hipótesis, go/no-go, RC-XX, exclusiones. En ningún punto se responde "¿qué construimos y para quién exactamente?". El PRD del piloto lo demuestra: se sabe qué NO tiene el Lego Virtual Museum (6 exclusiones) pero no qué tiene. `/specify` hereda ese vacío y acaba inventando o preguntando tarde.
- **H-02 🟠 Sin usuarios ni JTBD.** El "quién" vive dentro del párrafo de problema (un solo caso: Víctor). No hay segmento primario, ni jobs-to-be-done, ni anti-usuario. Sin esto las decisiones de UX de `/prototype` no tienen sujeto.
- **H-03 🟠 Sin alternativas/competencia.** No se pregunta "¿cómo resuelven esto hoy?" ni "¿por qué las alternativas existentes no valen?" (en el piloto: BrickLink, Brickset, Instagram anónimo, Reddit). Esto es lo primero que un inversor o stakeholder pregunta, y detecta productos redundantes antes de escribir una línea.
- **H-04 🟡 Sin asunciones de riesgo priorizadas.** La hipótesis es un bloque monolítico. Falta descomponer en asunciones y marcar la más arriesgada (riskiest assumption) — que es lo que el prototipo/MVP debería testear primero.
- **H-05 🟡 Go/no-go sin plan de instrumentación.** Las 4 métricas del piloto ("conteo de filas en BD", "contador propio") no bajan a ningún requisito de la spec ni a tarea. Riesgo real: llegar a los 3 meses sin datos para decidir.

### 2.2 Especificación

- **H-06 🟠 Sin visión de arquitectura.** `templates/spec.md` pasa de modelo de datos a contratos API sin describir el sistema: componentes, stack elegido (con ADR), diagrama de despliegue, límites de confianza. STRIDE-lite sin diagrama de flujos de datos es teatro: no puedes enumerar amenazas de un sistema que no está dibujado.
- **H-07 🟠 Sin estrategia de test.** El criterio de verificación por requisito es correcto pero atomizado. Falta: pirámide de tests del proyecto, herramientas, qué se automatiza vs. manual, cobertura mínima en rutas críticas, datos de prueba.
- **H-08 🟠 Sin requisitos no funcionales más allá de seguridad/performance.** Disponibilidad objetivo, comportamiento ante caída de dependencias (Supabase down), límites de escala esperados, compatibilidad de navegadores, i18n (¿el piloto es en español, inglés, ambos?), SEO si hay contenido público indexable.
- **H-09 🟡 Criterios de aceptación sin formato.** "Criterio de verificación" en texto libre. Formato Given/When/Then en los flujos principales elimina ambigüedad y es directamente convertible a test.

### 2.3 Cumplimiento legal (UE) — el mayor agujero

- **H-10 🔴 GDPR no es parte del framework.** En el piloto, RC-04 (GDPR) existe porque *el autor lo aportó en la sesión* ("Aportado por el autor en esta sesión"). Un framework profesional para productos con usuarios en la UE debe imponerlo, no depender de que el usuario se acuerde. Faltan: registro de tratamientos (RoPA-lite), base legal por tratamiento, minimización, retención por tipo de dato, derechos ARSOPL (acceso, rectificación, supresión, oposición, portabilidad, limitación) con mecanismo, DPA con procesadores (Supabase, Vercel, Plausible…), transferencias internacionales, procedimiento de brecha (72h), disparador de DPIA, y ePrivacy/cookies.
- **H-11 🔴 Accesibilidad sin criterio normativo.** El European Accessibility Act es exigible desde el 28-jun-2025 para muchos servicios digitales de cara a consumidor en la UE. El framework solo dice "contraste AA, foco visible" (1 línea de `checklists/uxui.md`). Falta checklist WCAG 2.2 AA operativa y verificación automatizada (axe/Lighthouse) + manual (teclado, lector de pantalla).
- **H-12 🟡 Sin artefactos legales mínimos.** Política de privacidad, aviso de cookies, términos de uso, licencias de assets (fuentes, iconos, fotos), propiedad intelectual de contenido subido por usuarios. Nadie los genera ni los verifica antes de publicar.
- **H-13 🟡 Sin router de cumplimiento por tipo de producto.** Pagos → PSD2/SCA y PCI-DSS (aunque delegues en Stripe); menores → consentimiento parental art. 8 GDPR; features con IA → AI Act (transparencia, categoría de riesgo); salud → categoría especial art. 9. Debe existir una pregunta de triaje en `/spec-init` que active las checklists correspondientes.

### 2.4 Ciclo de vida incompleto

- **H-14 🔴 La implementación no está gobernada.** El pipeline oficial acaba en `/tasks`; la guía §6 despacha la implementación en 3 líneas. Justo la fase donde un agente introduce más deriva (código que ignora la spec, checklists no aplicadas, "hecho" sin verificar) es la única sin comando. Falta `/implement <task-id>` con disciplina: leer sección de spec referenciada, aplicar checklists de fase, ejecutar verificación, registrar evidencia, actualizar estado, commit convencional.
- **H-15 🔴 Sin fase de lanzamiento.** Nada entre "tareas hechas" y "en producción". Falta `/preflight`: barrido pre-lanzamiento (cabeceras, RLS, GDPR artefactos presentes, a11y scan, Lighthouse en despliegue real, backups, dominio/DNS/TLS, textos legales) que emite informe go/no-go de lanzamiento.
- **H-16 🟠 Sin operaciones ni observabilidad.** Error tracking (Sentry o equivalente), logs, uptime, alertas mínimas, estrategia de backup/restore probada, plan de rollback. Sin esto la app está en producción a ciegas.
- **H-17 🟠 Sin cierre de bucle con el go/no-go.** Nadie programa la revisión a los 3 meses. Falta `/review-metrics`: compara métricas reales vs. targets del PRD y fuerza la decisión de la hipótesis (perseverar/pivotar/matar).
- **H-18 🟡 Sin principio de walking skeleton.** `/plan` ordena por dependencia técnica pero no impone que la Fase 1 sea un esqueleto E2E desplegado en producción (deploy day one). Es la práctica que más reduce riesgo de integración y la que valida el pipeline de despliegue cuando aún es barato.

### 2.5 Quality gate

- **H-19 🟠 Rúbrica manipulable.** Promedio simple de 3 dimensiones: un 8 en D2 compensa un 5 en D1 (como pasó en el piloto: 6.5/8.0/6.5 → 7.0 "supera el umbral"). Solución: suelo por dimensión (ninguna < 6.0 para avanzar) + anclas de puntuación descritas por banda (qué es un 5, qué es un 7, qué es un 9) para reducir varianza entre revisiones.
- **H-20 🟠 El revisor ciego no está definido como agente.** El protocolo dice "lanza un sub-agente (Task)" pero no existe `agents/quality-reviewer.md` con system prompt, herramientas restringidas (solo lectura) y rúbrica embebida. Cada invocación improvisa el revisor → varianza y fugas de contexto.
- **H-21 🟡 Hallazgos sin evidencia obligatoria.** No se exige citar la línea/sección del artefacto que sustenta cada hallazgo. Con cita obligatoria, los hallazgos vagos ("falta detalle") desaparecen.
- **H-22 ⚪ Límite de 5 hallazgos arbitrario.** Si hay 8 problemas reales, 3 se pierden. Mejor: sin límite en críticos/altos, top-5 solo para medios/bajos.

### 2.6 Ingeniería del plugin

- **H-23 🔴 Rutas de plugin no resolubles.** Los comandos dicen "lee `constitution.md` del plugin", "usa `templates/prd-lite.md`". Desde el proyecto del usuario esas rutas relativas no existen; el agente debe adivinar dónde está instalado el plugin. Claude Code expone `${CLAUDE_PLUGIN_ROOT}` para esto. Todos los comandos deben usar rutas absolutas de plugin: `${CLAUDE_PLUGIN_ROOT}/constitution.md`, etc.
- **H-24 🟠 Sin verificación de precondiciones.** `/specify` "requiere prd-lite aprobado" solo en la description. Ningún comando comprueba que el artefacto previo exista y tenga gate aprobado. Cada comando debe empezar con un paso 0 de verificación: existe el archivo, tiene sección Quality Gate con veredicto suficiente (o aprobación explícita del usuario registrada), y si no, detenerse con mensaje claro.
- **H-25 🟠 Versionado inconsistente.** constitution "v0.1", plugin.json y marketplace.json "0.1.0", CHANGELOG "[0.1.0]", uso real "v0.1.1". Debe haber una única fuente (plugin.json) y el resto referenciarla; todo bump = entrada de CHANGELOG (la propia constitution lo exige y no se cumple).
- **H-26 🟡 Metadatos del marketplace exponen email personal** (`marketplace.json`). Es público al publicar el repo. Decisión consciente: quitarlo o asumirlo.
- **H-27 🟡 Sin LICENSE.** Repo destinado a publicarse como marketplace sin licencia = todos los derechos reservados; nadie puede legalmente usarlo. Añadir MIT (o la que decidas).
- **H-28 ⚪ Sin argument-hint en la mayoría de comandos**, sin `disable-model-invocation` donde procede, y descriptions largas que podrían aprovechar frontmatter completo.
- **H-29 ⚪ Sin validación del propio framework.** Un script mínimo (CI o local) que compruebe: JSON válidos, versiones sincronizadas, que cada comando referencie plantillas existentes, enlaces internos no rotos.

### 2.7 Constitution

- **H-30 🟠 Duplicidad normativa.** Los umbrales del gate viven en constitution B.5 *y* en quality-gate.md con redacciones distintas (PASS ≥7.5 / CONDICIONAL 6.0-7.4 solo en el comando). Norma: los números viven SOLO en la constitution; los comandos la referencian.
- **H-31 🟡 "Tier completo fuera de alcance" sin camino.** B.7 remite a "el pipeline anterior", que no está en el repo. O se documenta el enlace o se define el tier completo en v0.2 (recomendado: definirlo como tier medio + discovery formal + DPIA + gate a ≥7.5).
- **H-32 ⚪ El principio C.11 fija "Windows + runtime actual"** como entorno universal. Correcto para ti hoy, pero es un parámetro de proyecto, no un principio inmutable. Mover a `project.md` (entorno objetivo por proyecto) y dejar el principio como "smoke test en el entorno real de destino".

---

## 3. Diseño de la v0.2

### 3.1 Constitution v0.2 — 7 bloques, 24 principios

Se conservan los 16 principios actuales (con las correcciones H-30/H-32) y se añaden:

**Nuevo bloque F — Datos y cumplimiento (privacy by design):**
- **F.17 Privacidad por diseño y por defecto.** Todo proyecto con datos personales aplica `checklists/privacidad-gdpr.md` en `/specify`. Minimización: todo dato personal que se recoge debe justificar su tratamiento; sin justificación, no se recoge. El mapa de datos personales (qué, dónde, base legal, retención) es sección obligatoria de la spec.
- **F.18 Accesibilidad como requisito, no como pulido.** Objetivo WCAG 2.2 AA en todo producto de cara a usuario (EAA como referencia normativa UE). Se verifica automatizada y manualmente antes de lanzar; los fallos de nivel A bloquean el lanzamiento.
- **F.19 Cumplimiento proporcional por triaje.** `/spec-init` detecta señales (pagos, menores, IA, salud, contenido de usuarios) y activa los módulos de cumplimiento correspondientes. Nunca se descubre una obligación legal después de implementar.

**Nuevo bloque G — Entrega y operación:**
- **G.20 Walking skeleton primero.** La Fase 1 de todo plan es un esqueleto E2E mínimo desplegado en el entorno de producción real. Se despliega desde el día uno, no al final.
- **G.21 Observabilidad mínima antes del lanzamiento.** Error tracking, logs con contexto (sin datos personales), uptime check y backup restaurable probado. "En producción sin observabilidad" es un estado prohibido.
- **G.22 Lanzamiento con preflight.** Ningún producto se anuncia/publica sin `/preflight` en verde o con excepciones aceptadas por escrito.
- **G.23 El go/no-go se cierra.** La revisión de hipótesis del PRD tiene fecha en el calendario y se ejecuta con `/review-metrics`. Un experimento sin lectura de resultado es peor que no haberlo hecho.

**Añadido al bloque C:**
- **C.11-bis Verificación como parte de la definición de hecho.** Una tarea/requisito está "hecho" cuando su verificación se ha ejecutado y su evidencia (comando + output, captura, test en verde) queda registrada. Aplica especialmente a código generado por agentes: el código sin verificación ejecutada no existe.

**Correcciones:** B.5 pasa a ser la única fuente de umbrales (añadiendo: suelo por dimensión ≥ 6.0); B.7 define el tier completo; C.11 se parametriza por proyecto.

### 3.2 Pipeline v0.2

```
/spec-init → /prd-lite → /specify (+gate) → /prototype → /plan → /tasks
    → /implement (por tarea, iterativo) → /preflight → LANZAMIENTO → /review-metrics
```

Soporte: `/quality-gate`, `/design-system` (sin cambios de rol).

### 3.3 Comandos nuevos

**`/implement <task-id | next>`** — gobierna la fase de mayor riesgo:
1. Paso 0: verifica plan y tasks aprobados; carga la tarea, su sección de spec (por número, literal) y las checklists de su fase.
2. Implementa respetando spec; si detecta contradicción o hueco, PARA y propone corrección de spec (la spec manda, ya es principio D.14-análogo).
3. Ejecuta el criterio de verificación de la tarea y registra la **evidencia** (output del test/comando) en `tasks.md`, columna nueva.
4. Actualiza estado y hace commit convencional (`feat|fix|chore(scope): ... [LVM-XX]`).
5. Al cerrar la última tarea de una fase: repaso de checklists de la fase + entrada de comunicación si es fase mayor.

**`/preflight`** — informe go/no-go de lanzamiento en `docs/09-lanzamiento/preflight.md`:
- Ejecuta/verifica: checklist seguridad (cabeceras reales con curl, RLS, secretos), privacidad-GDPR (artefactos legales publicados, banner consentimiento, flujo de borrado probado), accesibilidad (scan axe + prueba de teclado), performance (Lighthouse contra el despliegue real, no local), operaciones (error tracking recibe eventos, backup restaurado una vez, dominio/TLS), y plan de medición (eventos de analítica del go/no-go disparan de verdad).
- Veredicto: GO / GO CON EXCEPCIONES (listadas y aceptadas) / NO-GO con bloqueantes.

**`/review-metrics`** — cierre del experimento:
- Lee el go/no-go del PRD-lite, pide/lee los datos reales, calcula % de target, y fuerza decisión explícita: perseverar / pivotar / parar, registrada como ADR. Programable: al aprobar el PRD se anota la fecha de revisión en `project.md`.

### 3.4 Checklists nuevas (4) y ampliadas (3)

**`checklists/privacidad-gdpr.md` (nueva, ~15 items):** mapa de datos personales (dato → finalidad → base legal art. 6 → retención → ubicación); minimización justificada; derechos ARSOPL con mecanismo concreto (mínimo: borrado de cuenta self-service o vía email con SLA); consentimiento: registro de cuándo/cómo se obtuvo, retirable tan fácil como se dio; cookies/ePrivacy: nada no esencial antes del opt-in, panel de preferencias; procesadores: lista con DPA firmado/aceptado (Supabase, Vercel, etc.) y región de datos (preferir UE); transferencias fuera del EEE identificadas y amparadas (SCC/adequacy); brecha: procedimiento mínimo escrito (detectar → evaluar → notificar AEPD ≤72h si procede); DPIA: triaje (¿tratamiento a gran escala, categorías especiales, monitorización sistemática? → hacer DPIA); menores: si el servicio puede atraer <14 años (España), mecanismo art. 8; privacidad en logs y analítica (sin PII en logs, analítica cookie-less verificada contra su política vigente); textos: política de privacidad publicada y coherente con el mapa de datos real.

**`checklists/accesibilidad.md` (nueva, ~14 items, WCAG 2.2 AA operativa):** contraste 4.5:1 texto / 3:1 UI; todo interactivo alcanzable y operable por teclado, foco visible y orden lógico; sin trampas de foco; targets táctiles ≥24px; alt significativo (o vacío si decorativo); estructura semántica (landmarks, headings jerárquicos, listas reales); formularios: label programático, errores descritos en texto y asociados al campo; sin información solo por color; `prefers-reduced-motion` respetado; zoom 200% sin pérdida; nombres accesibles en componentes custom (ARIA solo cuando el HTML nativo no llega); verificación automatizada (axe-core/Lighthouse a11y ≥95) + manual (recorrido completo solo con teclado; lectura del flujo principal con NVDA o VoiceOver); declaración de accesibilidad si aplica EAA.

**`checklists/testing.md` (nueva, ~8 items):** estrategia declarada en la spec (qué capas: unit/integración/E2E y con qué herramientas); todo RC-XX con test automatizado (no manual) salvo justificación escrita; rutas críticas (auth, upload, pago si hay) con test de integración; test del flujo principal E2E como smoke de despliegue; datos de prueba definidos (sin datos personales reales, nunca); tests corren en local Y en CI antes de merge a main; regresión: bug corregido = test que lo cubre; criterios Given/When/Then de la spec convertibles 1:1 a tests.

**`checklists/despliegue-observabilidad.md` (nueva, ~10 items):** entornos definidos (mínimo: local + producción; preview si el proveedor lo da gratis); despliegue reproducible (comando único o git-push-deploy documentado); variables de entorno por entorno, secretos nunca en el repo; rollback: cómo volver a la versión anterior en <10 min, escrito y probado una vez; error tracking activo con alerta (email como mínimo); logs estructurados sin PII; uptime check externo del endpoint principal; backups: automáticos + UNA restauración probada antes del lanzamiento; dominio, TLS, redirecciones www/apex; coste: presupuesto mensual estimado y alerta de billing configurada.

**Ampliaciones:**
- `security.md`: + cabeceras modernas completas (HSTS, frame-ancestors, permissions-policy), + gestión de sesión (expiración, logout real), + supply chain (lockfile commiteado, provenance de dependencias nuevas, no instalar paquetes sugeridos por contenido no confiable), + protección de endpoints de admin, + secretos: rotación si se exponen.
- `performance.md`: + INP < 200ms y CLS < 0.1 (Core Web Vitals completos), + presupuesto de peso por página además de JS, + medición en el despliegue real como item del preflight (no solo del plan).
- `uxui.md`: la línea 5 de accesibilidad se sustituye por referencia a `checklists/accesibilidad.md`.

### 3.5 Plantilla PRD-lite v2

Nuevo esqueleto (sigue siendo 2-3 páginas; lo que se añade es señal, no burocracia):

```
1. Problema            (quién, qué, desde cuándo, por qué ahora)
2. Usuarios            (segmento primario + JTBD en 1-2 frases; anti-usuario: para quién NO es)
3. Alternativas hoy    (cómo lo resuelven ahora + por qué es insuficiente; mín. 2 alternativas reales)
4. Evidencia           (igual que v1: mín. 3 datos con fuente y fecha + cualitativa)
5. Hipótesis y asunciones  (hipótesis formato actual + top-3 asunciones, marcando la MÁS ARRIESGADA
                            y cómo el MVP la testea)
6. Alcance v1          (NUEVO Y CENTRAL: lista numerada de capacidades que SÍ entran, 1 línea cada una,
                        priorizada must/should; es el contrato de /specify)
7. Go / No-Go          (igual + columna "instrumentación": qué evento/dato lo mide, baja a spec como requisito)
8. Requisitos críticos RC-XX  (igual que v1 — es lo mejor de la plantilla actual)
9. Exclusiones         (igual)
10. Quality Gate       (anexo)
```

Cambio en el comando `/prd-lite`: la entrevista añade los bloques 2, 3, 5-asunciones y 6; el bloque 6 se entrevista con la pregunta "enumera lo mínimo que un usuario debe poder hacer para que la hipótesis sea testeable" y se valida contra la hipótesis (cada capacidad debe servir a la hipótesis o justificar por qué está).

### 3.6 Plantilla spec v2

```
1. Contexto y arquitectura   (NUEVO: stack con ADR, diagrama de componentes + flujo de datos
                              en Mermaid, límites de confianza — insumo de STRIDE)
2. Trazabilidad              (igual; añade columna "tipo de verificación: test-auto | manual | inspección")
3. Modelo de datos           (igual + clasificación de cada campo: personal / sensible / público)
4. Contratos de API          (igual + autenticación/autorización por endpoint + límites de rate)
5. Seguridad y privacidad    (security.md + privacidad-gdpr.md ítem a ítem; STRIDE-lite sobre el
                              diagrama de la sección 1; mapa de datos personales)
6. Accesibilidad             (NUEVO: checklist accesibilidad.md aplicada; requisitos con ID)
7. Performance               (igual + CWV completos)
8. Estrategia de test        (NUEVO: capas, herramientas, cobertura de RC-XX, datos de prueba)
9. Observabilidad y operación (NUEVO: error tracking, logs, backups, rollback — de la checklist nueva)
10. Plan de medición         (NUEVO: cada métrica go/no-go → evento/consulta concreta → requisito con ID)
11. Flujos de usuario        (igual + criterios Given/When/Then en principal y alternativos)
12. Fuera de alcance         (igual)
13. Quality Gate             (anexo)
```

### 3.7 Quality gate v2

1. **Agente definido:** nuevo `agents/quality-reviewer.md` — system prompt del revisor ciego, herramientas solo-lectura, recibe únicamente artefacto + rúbrica + constitution. Fin de la improvisación por invocación.
2. **Rúbricas ancladas:** por dimensión, descripción de qué es 3 / 5 / 7 / 9 (ej. D1-trazabilidad: 5 = "hay tabla pero ≥1 RC sin criterio verificable"; 7 = "todos los RC con criterio, algunos criterios no automatizables sin razón"; 9 = "100% verificable y tipado"). Reduce varianza entre rondas y proyectos.
3. **Suelo por dimensión:** avanza si media ≥ umbral del tier **y** ninguna dimensión < 6.0.
4. **Evidencia obligatoria por hallazgo:** cada hallazgo cita sección/línea del artefacto. Hallazgo sin cita = descartado.
5. **Hallazgos:** sin tope para severidad crítica/alta; top-5 para el resto.
6. **Rúbricas nuevas** para los artefactos nuevos: gate opcional de plan (¿fases con DoD verificable? ¿walking skeleton primero?) y el propio preflight actúa como gate de lanzamiento.
7. **Resultado también como archivo:** además del anexo en el artefacto, `docs/0X-.../gates/gate-<artefacto>-<fecha>.md` para histórico comparable.

### 3.8 Saneamiento del plugin

1. **Rutas:** todos los comandos pasan a `${CLAUDE_PLUGIN_ROOT}/constitution.md`, `${CLAUDE_PLUGIN_ROOT}/templates/...`, `${CLAUDE_PLUGIN_ROOT}/checklists/...`.
2. **Paso 0 de precondiciones en cada comando:** existe artefacto previo + gate/aprobación registrada; si no, detener con mensaje y comando sugerido. (Opcional v0.3: hook `PreToolUse` que lo haga determinista.)
3. **`agents/quality-reviewer.md`** (ver 3.7).
4. **Versionado:** plugin.json = única fuente; constitution y README referencian "ver plugin.json"; bump 0.2.0 con CHANGELOG completo. Regla semver documentada: MAJOR = cambio de constitution incompatible, MINOR = comandos/checklists nuevos, PATCH = correcciones.
5. **LICENSE** (MIT recomendada) + decisión sobre el email en marketplace.json.
6. **`scripts/validate.md` o script real:** JSON parseables, versiones sincronizadas, referencias comando→plantilla existentes, sin enlaces internos rotos. Ejecutable a mano o en GitHub Actions.
7. **Frontmatter completo** en todos los comandos: `description`, `argument-hint` donde aplique.
8. **Vault:** nueva carpeta `docs/09-lanzamiento/` (preflight, textos legales, declaración accesibilidad) en `vault-structure.md`.

### 3.9 `/spec-init` v2 — triaje ampliado

Al triaje de tier (3 preguntas) se añaden 4 preguntas de cumplimiento que activan módulos:
- ¿Se tratan datos personales de usuarios UE? → privacidad-gdpr.md obligatoria (casi siempre sí).
- ¿Pagos/dinero? → módulo pagos (delegar en PSP certificado, nunca tocar tarjetas, SCA).
- ¿Puede atraer menores? → módulo menores (art. 8 GDPR).
- ¿Features de IA de cara al usuario? → módulo AI Act (transparencia: el usuario sabe que habla con IA; contenido generado marcado).

Y una pregunta de entorno objetivo (sustituye al "Windows" hardcodeado de C.11): dónde se desarrolla y dónde se despliega.

---

## 4. Plan de ejecución (orden recomendado)

| # | Paquete | Contenido | Impacto |
|---|---------|-----------|---------|
| 1 | Saneamiento plugin | Rutas `${CLAUDE_PLUGIN_ROOT}`, precondiciones paso 0, versionado 0.2.0, LICENSE, frontmatter | Fiabilidad inmediata de todos los comandos |
| 2 | Constitution v0.2 | Bloques F y G, correcciones B.5/B.7/C.11, CHANGELOG | Marco normativo del resto |
| 3 | Checklists | 4 nuevas + 3 ampliadas | Cierra GDPR/a11y/testing/ops |
| 4 | Plantillas + comandos de definición | prd-lite v2, spec v2, /prd-lite, /specify, /spec-init triaje ampliado | El salto de calidad visible en los artefactos |
| 5 | Quality gate v2 | agents/quality-reviewer.md, rúbricas ancladas, suelos, evidencia | Rigor del gate |
| 6 | Ciclo de vida completo | /implement, /preflight, /review-metrics, vault 09-lanzamiento, tasks con columna evidencia, plan con walking skeleton | Cobertura E2E real |
| 7 | Docs | guia-usuario v2, README, vault-structure, script de validación | Consistencia final |

Cada paquete es commiteable de forma independiente; el orden minimiza retrabajo (las plantillas dependen de las checklists; los comandos nuevos, de la constitution).

**Criterio de éxito de la v0.2:** re-ejecutar `/prd-lite` y `/specify` sobre LegoVirtualMuseum con las plantillas nuevas y comprobar que (a) el alcance v1 queda definido sin intervención correctora del autor, (b) GDPR y accesibilidad aparecen sin que el autor los aporte, y (c) el gate v2 con suelos habría detectado el 6.5 de D1/D3 del piloto como bloqueo de dimensión, no como promedio aprobado.

---

## 5. Qué NO cambiar (fortalezas a proteger)

1. **RC-XX con trazabilidad a requisito verificable** — es la mejor idea del framework; v2 solo la refuerza (test automatizado obligatorio para RC).
2. **Revisión ciega con criterios de parada y sin persecución del PASS** — filosofía correcta; solo se endurece la mecánica.
3. **Prototipo HTML autocontenido como gate visual barato** — intacto; solo se añade a11y básica al gate humano.
4. **Identidad de diseño gobierna a las skills** — principio diferencial real frente al look genérico de IA; intacto.
5. **Tiers de profundidad por riesgo** — correcto; solo se completa el tier "completo".
6. **`[PENDIENTE]` en vez de inventar** — el principio A.1 es oro; se extiende a la evidencia de verificación de tareas.
7. **Vault Obsidian = docs/ del repo** — decisión acertada de una sola fuente de verdad versionada.

---

## 6. Adenda crítica — lo que la v0.2 tal como está NO resuelve

Autocrítica de la sección 3: el diseño anterior es **aditivo** (más checklists, más comandos, más secciones de plantilla). Cierra huecos de cobertura, pero no cambia la arquitectura del framework y por tanto **no produce por sí solo un salto de orden de magnitud**. Faltan tres cosas estructurales y ocho áreas de contenido.

### 6.1 Los tres fallos estructurales

**E-01 🔴 El framework no tiene capa de cumplimiento (enforcement). Todo es prosa.**
Constitution, comandos y checklists son Markdown que un agente *puede* seguir o derivar. No hay un solo mecanismo determinista que impida avanzar. El propio piloto lo demuestra: el gate se anexó correctamente porque el agente cooperó, no porque algo lo verificara. En el sector, el equivalente maduro es *policy as code*: la regla que importa se ejecuta, no se lee. Traducción a este framework:
- **Hooks de Claude Code** (`hooks/`, evento `PreToolUse`/`UserPromptSubmit`) que bloqueen de forma determinista: no escribir en `docs/02-spec/` si no existe PRD con gate aprobado; no permitir commit si `tasks.md` tiene tareas "hecha" sin evidencia registrada.
- **Scripts de verificación** (`scripts/check-*.ps1|sh`) invocados por los comandos: validan estructura del artefacto (secciones obligatorias presentes, tabla de trazabilidad sin celdas vacías, todo RC-XX con criterio) y devuelven código de salida. El agente no juzga: ejecuta y lee el resultado.
- **Regla nueva de constitution:** "toda restricción crítica del framework debe ser ejecutable; si solo puede expresarse como prosa, es una recomendación, no una regla, y se etiqueta como tal". Esto obliga a separar lo que se verifica de lo que se aconseja — hoy están mezclados y eso hace el framework parecer más robusto de lo que es.

**E-02 🔴 El framework es lineal y de un solo uso. No gestiona el cambio.**
El pipeline asume que la definición se cierra una vez y todo fluye hacia adelante. En la realidad de cualquier producto, el cambio llega a mitad de implementación — y ahí el framework no dice nada, lo que significa que el spec-driven development se rompe en su punto más frecuente: la spec y el código divergen silenciosamente y a partir de ahí la documentación miente. Falta:
- **`/amend <artefacto>`**: cambio de requisito con análisis de impacto (qué requisitos, tareas y código toca), versionado del artefacto y ADR de la razón del cambio. Sin esto, la alternativa real es editar el MD a mano y perder trazabilidad.
- **`/sync-check`**: reconciliación código ↔ spec. Detecta requisitos de la spec sin implementación y funcionalidad implementada sin requisito (la deriva silenciosa que un agente introduce con más facilidad que un humano).
- **Principio:** la spec es un documento vivo con versión; código y spec divergentes es un defecto de severidad alta, no una nota al pie.

**E-03 🟠 El framework no aprende de sí mismo ni se mide.**
Hay un CHANGELOG y una retro manual, pero ninguna evidencia de si el framework mejora los resultados. La v0.2 podría ser peor que la v0.1 y no habría forma de saberlo. Falta:
- **Evals del framework**: 2-3 proyectos de referencia (uno de ellos LegoVirtualMuseum) con sus artefactos "golden". Al cambiar una plantilla o un comando, se regenera el artefacto y se compara contra el golden con la rúbrica del gate. Es el único modo de afirmar "la v0.2 es mejor" con dato en vez de con intuición.
- **Métricas de proceso** (equivalente ligero de DORA): tiempo de ciclo por fase, nº de rondas de gate, hallazgos por artefacto y su severidad, defectos encontrados después del lanzamiento que un gate debería haber cazado (*gate escape rate* — la métrica que de verdad dice si el gate funciona).
- **Bucle de destilación**: la retro ya existe, pero sin métricas alimenta opiniones. Con ellas, alimenta cambios justificados.

### 6.2 Áreas de contenido no cubiertas

| # | Área | Por qué es necesaria | Propuesta |
|---|------|----------------------|-----------|
| A-01 🔴 | **Appetite / time-boxing** (Shape Up) | El framework escala la *profundidad del proceso* por riesgo (tiers) pero no acota nunca el *tamaño de la apuesta*. Sin apetito declarado ("esto vale 3 semanas"), el alcance se define por lo que parece buena idea, no por lo que cabe. Para un builder con varios proyectos en paralelo es EL mecanismo de scoping. | Campo `appetite` obligatorio en `/spec-init` y `project.md`; `/plan` valida que las fases quepan en el apetito y, si no caben, recorta alcance en vez de estirar plazo. |
| A-02 🔴 | **Seguridad de la propia cadena agéntica** | El framework instala plugins de terceros (`ui-ux-pro-max`, `taste-skill`) desde GitHub sin vetting, y los agentes leen contenido web durante research con permiso de escritura en el repo: inyección de prompt y supply chain de skills son riesgos reales de *este* framework, no del producto. La checklist de seguridad protege la app y deja el proceso desprotegido. | `checklists/seguridad-agentica.md`: vetting de plugins/skills antes de instalar, principio de mínimo privilegio en permisos de agente, contenido externo tratado como dato no confiable, secretos nunca en contexto de agente, revisión humana obligatoria de diffs generados en rutas sensibles (auth, pagos, RLS, CI). |
| A-03 🟠 | **Fiabilidad** (pilar ausente del Well-Architected) | La v0.2 cubre performance y observabilidad, pero no qué pasa cuando algo falla: degradación elegante si cae Supabase, reintentos, idempotencia, límites de escala, objetivo de disponibilidad. | Sección "Fiabilidad" en la spec: SLO simple, modos de fallo de cada dependencia externa y comportamiento esperado ante cada uno. |
| A-04 🟠 | **Economía: coste de infraestructura y coste de tokens** | Dos costes reales gobiernan si el framework se usa: el de la app (ya parcialmente cubierto con alerta de billing) y el de ejecutar el propio pipeline. Un pipeline caro se abandona. | Presupuesto de coste por proyecto en `project.md`; guía de modelo por comando (razonamiento alto en `/specify` y gate, modelo económico en `/tasks` y ejecución mecánica); registro de coste/tiempo real por fase para alimentar E-03. |
| A-05 🟠 | **Módulos reutilizables entre proyectos** | `design-systems/` es el único activo que cruza proyectos. Vas a reimplementar auth, upload con limpieza EXIF, banner de consentimiento, borrado de cuenta GDPR y rate limiting en cada proyecto nuevo. Ahí está el multiplicador real para "mis siguientes proyectos". | `modules/<nombre>/` en el framework: spec + requisitos + tests + notas de integración de capacidades transversales resueltas una vez. `/specify` propone módulos existentes antes de especificar desde cero. |
| A-06 🟠 | **Contenido, i18n y SEO** | Para producto web de consumo, el copy y la indexabilidad son producto, no adorno. Hoy solo existe "tono del copy" en design-identity. | `checklists/contenido-seo.md`: catálogo de mensajes de error, microcopy de estados vacíos/carga, decisión de idiomas y estrategia i18n *antes* de codificar, metadatos, OG, sitemap, datos estructurados, y política de contenido generado por usuarios. |
| A-07 🟡 | **Red-team de producto (pre-mortem)** | El gate ciego revisa la *calidad del artefacto*, no si la idea es mala. Para un builder en solitario, el agente es el único contrapeso y hoy no tiene mandato para discrepar. | `/premortem` sobre el PRD: "estamos a 6 meses vista y esto ha fracasado, ¿por qué?" + refutación explícita de la hipótesis. Salida: riesgos priorizados y, si procede, recomendación de no construir. |
| A-08 🟡 | **Mantenimiento y fin de vida** | Todo el ciclo acaba en el lanzamiento. Un portfolio de proyectos personales acumula apps sin parchear y, si alguna se apaga, hay obligación GDPR sobre los datos de sus usuarios. | Sección de mantenimiento en `project.md` (cadencia de actualización de dependencias, ventana de parcheo de seguridad) y plan de sunset: aviso a usuarios, exportación de sus datos, borrado verificado. |

### 6.3 Concepto a reevaluar: los tiers

Los tiers actuales escalan **profundidad de proceso** por riesgo, lo cual es correcto pero insuficiente: aplican lo mismo a un prototipo desechable que a una app pública. Propuesta de reformulación en dos ejes independientes:
- **Eje 1 — Apetito** (cuánto vale): boceto / proyecto / producto. Gobierna alcance y tiempo.
- **Eje 2 — Exposición** (a qué te expones): privado / público sin datos personales / público con datos personales / con dinero o menores. Gobierna qué módulos de cumplimiento, seguridad y operación son obligatorios.

Un boceto público con datos personales sigue necesitando GDPR aunque el apetito sea de dos días; un producto grande privado no necesita banner de cookies. Los tiers actuales, de un solo eje, no distinguen estos casos y acaban aplicando rigor donde no toca o eximiendo donde sí toca.

### 6.4 Recomendación revisada

El plan de la sección 4 sigue siendo válido como **base de cobertura**, pero por sí solo entrega una v0.2 "completa", no un salto de calidad. La secuencia que sí produce el salto:

1. **Paquete 1 (saneamiento) + E-01 (capa de enforcement con hooks y scripts)** — sin esto, todo lo demás sigue siendo prosa opcional. Es el cambio de mayor apalancamiento del framework entero.
2. **Paquetes 2-4** (constitution, checklists, plantillas) — la cobertura, ahora sí ejecutable.
3. **E-02 (`/amend` + `/sync-check`) y A-01 (appetite)** — convierten el framework de lineal a sostenible.
4. **Paquetes 5-6** (gate v2, ciclo de vida completo) + A-02 (seguridad agéntica).
5. **E-03 (evals y métricas) + A-05 (módulos reutilizables)** — el efecto compuesto: cada proyecto deja al framework mejor que antes, y el siguiente parte de más arriba.

Con este orden, la versión resultante deja de ser v0.2 y es honestamente una **v1.0**: un framework con reglas ejecutables, gestión del cambio, activos reutilizables y medición de sí mismo.
