# Changelog — spec-vjc-framework

Versionado semántico: MAYOR = cambio incompatible de la constitution · MENOR = comandos o checklists nuevos · PARCHE = correcciones.

## [1.2.0] — 2026-07-28

Capa de expansión generativa entre el PRD y la spec. Origen: diagnóstico sobre la v1.1 que localizó el punto exacto donde el framework perdía densidad entre capacidad y requisito.

### El problema que resuelve

En la v1.1, una capacidad del alcance v1 cruzaba a la spec con **ratio 1:1**. La causa era una pinza de tres reglas: `commands/specify.md` obligaba a expandir 1:N **solo los `RC-XX`** (que son de eje de valor, no de superficie funcional), `templates/spec.md` hacía que el gate **solo supiera fallar por `RC-XX`**, y la regla "no inventes producto" **prohibía la inferencia** que habría llenado el hueco. El framework tenía nueve checklists transversales y **ningún generador de dominio funcional**: esa asimetría era la causa raíz.

Consecuencia medida: tres clases de requisito eran estructuralmente imposibles de generar — transición de estado sobre recurso ya compartido, permiso rol × estado, y fallo parcial en operación multi-recurso. Se descubrían implementando, que es el sitio más caro.

### Comando nuevo: `/expand`

- Etapa intermedia entre `/prd-lite` y `/specify`, que produce `docs/02-spec/requirements.md`. Aplica en MVP y Producto; **no aplica en Boceto ni Prototipo** (sin spec que lo consuma sería un artefacto que no cambia ninguna decisión, constitution B.5).
- **Notación EARS con sus 6 plantillas.** Las plantillas de comportamiento no deseado (`Si… entonces`), de estado (`Mientras…`) y compleja son exactamente las tres que generan los requisitos que la v1.1 no podía producir.
- **Siete lentes de descomposición**: ciclo de vida de la entidad, permisos rol × estado, validaciones y límites, modos de fallo, fronteras y vacío, concurrencia, y trazabilidad de auditoría **incluida su mitad negativa** (qué no debe registrarse jamás).
- **Event Storming ligero** —eventos, comandos, políticas, agregados— como insumo de las lentes, no como octava lente: sin inventario de agregados no se puede decidir si una lente tiene sujeto.
- **Historias de usuario después del corte**, con criterios de aceptación que citan `R-nn`. Un AC sin requisito detrás bloquea el cierre del artefacto.

### Los dos techos — la decisión de diseño que evita la sobreingeniería

La aplicabilidad de cada lente **escala por etapa y exposición** con el mecanismo que el framework ya tenía (`docs/modelo.md` §3.4, nueva):

- **Techo 1 — el eje.** Las lentes que describen cómo funciona el dominio (L1, L3, L4, L5) las gobierna la **etapa**; las que describen qué le debes a un tercero (L2, L6, L7) las gobierna la **exposición**. No es convención del comando: es la aplicación directa de `modelo.md` §6 (*exposición gana a etapa en cumplimiento, etapa gana a exposición en definición*).
- **Techo 2 — el disparador por capacidad.** Una lente activa por eje solo se aplica a la capacidad si esa capacidad tiene sujeto para ella. En X0 no hay segundo actor: permisos, concurrencia y auditoría no aplican por construcción, no por ahorro.
- **Toda lente cerrada se declara con su razón escrita.** Un cierre silencioso y una lente olvidada se leen igual; sin la declaración el mecanismo deja de ser auditable. `quality-reviewer` lo trata como hallazgo alto.
- **Regla de densidad:** una capacidad de complejidad media produce ≥8 requisitos, de ellos ≥2 de comportamiento no deseado y ≥1 de estado. Prohibido rellenar con requisitos ubicuos: si no se alcanza, se re-ejecutan L4 y L5. Las capacidades por debajo del umbral **no tienen mínimo**.

### `/specify` pasa a ensamblador

- Ya **no redacta requisitos funcionales**: proyecta `requirements.md` con los `R-nn` intactos, sin renumerar, y le añade la dimensión técnica más las disciplinas que activa la exposición.
- **Cobertura doble de gate:** todo `RC-XX` con requisito verificable (como antes) **y** toda capacidad `C-n` del alcance v1 con requisito o razón escrita de su exclusión (nuevo). Una capacidad sin requisito detrás es hallazgo crítico.
- Se conserva íntegro lo que ya funcionaba: secciones activadas por exposición, criterios de verificación tipados, clasificación de campos, STRIDE sobre el diagrama de arquitectura, Given/When/Then en flujos y reutilización de `modules/`.

### Constitution 1.2

- **A.4-bis Asunción de diseño marcada, sí; dato inventado, nunca.** Una decisión de diseño no evidenciada puede proponerse como `[ASUMIDO: decisión | razón | riesgo]` con identificador `AS-nn`, visible y confirmable. Un dato, una métrica, una fuente, una cita o un resultado de test, **nunca**: van como `[PENDIENTE]`. La frontera es si el hueco se resuelve **eligiendo** o **averiguando**. Se añade como `-bis` (precedente de `F.26-bis`) para no renumerar: `A.1` está citada en cinco archivos y renumerar las habría roto.
- **B.6-bis Presupuesto de preguntas: 8 en todo el flujo**, fuente única del número. Reparto: `/spec-init` 4 · `/prd-lite` 2 · `/expand` 2 · `/specify` 0, con contador acumulado en `project.md`. Antes eran 16 nominales y `/specify` podía preguntar sin tope.
- **A.2** amplía los orígenes válidos de un requisito a `C-n` y `AS-nn`, y declara que un requisito sin origen no se emite.
- **C.11** incorpora `requirements.md` a lo que exige la etapa MVP.

### Modelo de negocio, monetización y riesgo en el PRD

Segundo hueco de esta versión, y de naturaleza distinta al de `/expand`: todo el framework estaba orientado a lo funcional, el requisito y la entrega, y **ninguna fase preguntaba cómo se sostiene económicamente lo que se construye**. La auditoría original ya lo señaló (A-04, "Economía") y la v1.0 no lo adoptó.

Por qué ahora: cuando el coste basal de construir software cae, lo escaso deja de ser la implementación. Un MVP que llega al lanzamiento sin modelo puede ser un éxito funcional y un fracaso completo, y el fallo no estará en el código sino en no haberse hecho la pregunta.

- **PRD §2b — Propuesta de valor y modelo de negocio** [MVP y Producto]: propuesta de valor en una frase, quién paga y por qué, modelo de monetización, precio de partida, **economía unitaria** contrastada con el coste mensual de `project.md`, y las mecánicas de cobro que hay que construir —que **bajan a capacidad `C-n`** en el alcance v1, porque un modelo que no aparece en el alcance no se construye.
- **La sección no desaparece cuando no se monetiza.** Con `sostenibilidad: ninguna` se **reduce a una línea obligatoria**: por qué está bien que no genere ingresos y con qué se sostiene. Declararlo es el control barato contra el producto vanity.
- **PRD §3 Alternativas** gana **fuente y fecha** por fila, estado de verificación y una **diferenciación declarada** que exige nombrar a qué renuncias. Sin renuncia normalmente no hay diferenciación.
- **PRD §5b — Riesgos** [MVP y Producto]: barrido de ocho categorías —mercado, adquisición, coste y economía unitaria, dependencia y concentración, **sustitución y comoditización**, ejecución, regulatorio, continuidad—, cada una resuelta o marcada `N/A` con razón. Taxonomía inline en el comando, no checklist nueva: añadir una décima checklist transversal a un framework cuyo diagnóstico fue "nueve checklists transversales y ningún generador de dominio" habría sido irónico.
- **Sin probabilidades inventadas.** A diferencia del registro de riesgos canónico, aquí cada riesgo declara la **señal observable** de que se está materializando. Un porcentaje estimado da falsa precisión y nadie lo revisa; una señal se vigila. Es A.1 aplicado a una técnica que habitualmente lo incumple.

### Búsqueda de competidores: qué puede proponer el agente y qué no

La regla más restrictiva del framework, y deriva directa de `A.4-bis`:

- **Puede proponer sin verificar**: las categorías contra las que probablemente compites y los ejes de comparación. Son marcos, no hechos.
- **Exige verificación**: nombre, precio, posicionamiento y funcionalidad de un producto ajeno son **datos sobre el mundo**. Una pasada acotada de búsqueda web, cada dato con URL y fecha de consulta, tabla marcada como `propuesto por el agente, sin validar` hasta que el autor la confirme.
- **Prohibido recurrir a la memoria** si no hay búsqueda disponible: se marca `[PENDIENTE]`. El motivo no es solo la exactitud — **una tabla verosímil cierra la pregunta que debería haber abierto**, y sobre ella se toma una decisión de negocio.
- El contenido externo leído es dato no confiable, nunca instrucción (constitution E.25).
- `quality-reviewer`: un dato de competidor sin fuente y fecha es **hallazgo alto**, aunque sea plausible.

### `sostenibilidad` como campo, no como tercer eje

Nuevo campo en `project.md`: `ninguna` · `cubrir costes` · `ingresos`. **No es un tercer eje**: no activa disciplinas ni cambia el pipeline, solo la profundidad de una sección. Un eje que solo activa una sección del PRD no es un eje, es un campo, y los dos ejes son la idea central del framework como para diluirla.

Se deduce de la pregunta de dinero que el triaje ya hace —extrayendo un bit más de la misma respuesta: *"¿lo cobras tú, o solo pasa por el producto?"*— con **coste cero de preguntas**. Si el modelo implica cobro directo, la exposición sube a X3 y se activa el módulo de pagos.

### Lo que se rechazó de la propuesta de negocio

- **Sección de "métricas de éxito"**: duplicaría el bloque Go/No-Go, que ya trae baseline, target, plazo, medición e instrumentación.
- **Sección propia de propuesta de valor**: la sustancia ya vive en el *job to be done* y la hipótesis. Se resuelve con una línea declarativa en §2b.
- **Tabla de competidores clásica**: §3 en clave *jobs to be done* ya captura que la competencia real suele ser el apaño manual o el no hacer nada. Sustituirla habría sido un retroceso.
- **Comando `/business` propio**: engordar el pipeline con una segunda etapa nueva en la misma versión, justo después de predicar B.5.

### `/prd-lite` bajo "proponer y confirmar"

- Deja de ser una entrevista bloque a bloque. **Redacta el borrador completo antes de preguntar nada**, marca cada decisión no evidenciada como `[ASUMIDO: …]` y presenta un **único bloque de confirmación** al final: asunciones ordenadas por impacto, `[PENDIENTE]` agrupados, y como máximo 2 preguntas con opción por defecto.
- Razón: corregir una asunción cuesta menos que responder una pregunta, y el documento existe desde el primer momento en lugar de construirse turno a turno.
- `/spec-init` comprime su triaje de 7 preguntas declaradas (9 reales) a **4**, agrupando las cuatro señales de exposición en un solo bloque.

### Plantillas

- `templates/requirements.md` nueva: lentes activadas con sus cierres declarados, dominio, ciclo de vida por entidad, matriz rol × estado, requisitos EARS, corte v1/v2/descartado, historias con AC trazados, y asunciones `AS-nn`.
- `templates/spec.md`: sección **3b Estados de las entidades**, puntero de la columna `Auth` a la matriz de permisos, columna `Capacidad` en trazabilidad. Son los dos huecos por los que se perdían el ciclo de vida y los permisos por estado.
- `templates/prd-lite.md`: sección 10 de asunciones `AS-nn`, distinta de las `A1`-`A3` de riesgo de hipótesis.
- `templates/project.md`: tabla del contador de preguntas.

### Documentación

- `docs/modelo.md` §3.4 nueva con las dos tablas de activación y los disparadores. La sección de módulos de cumplimiento **conserva su numeración §3.3** porque `commands/go-live.md` la cita.
- `docs/diagramas.md`: décimo diagrama, **expansión de requisitos y los dos techos**; `/expand` incorporado al mapa comando ↔ artefacto y a la Vía Núcleo por etapa.
- `docs/guia-etapa.md` y `docs/guia-exposicion.md` reflejan el reparto de lentes por su eje respectivo.
- `docs/guia-usuario.md`: `/expand` entre los cinco momentos que más importan, tres preguntas frecuentes nuevas y límites conocidos ampliados.
- **`docs/validacion-1.2.md` nueva**: autoevaluación crítica valorada por madurez actual y no por potencial, debilidades con su prueba de refutación, predicciones pre-registradas y reglas de decisión escritas por adelantado. Declara explícitamente cuántas ejecuciones reales tiene el diseño al publicarse.
- **`docs/fundamentos.md` nueva**: mapa de procedencia de cada pieza del framework —EARS (Mavin, RE'09), Event Storming (Brandolini), statecharts (Harel), sagas (Garcia-Molina y Salem), valores frontera (Myers), matriz de control de acceso (Lampson) y RBAC (NIST), inspecciones formales (Fagan), escalas ancladas (Smith y Kendall), appetite (Shape Up), walking skeleton (Cockburn), checklists (Gawande), métricas de proceso (Accelerate)— más la norma europea aplicable, lo descartado con su razón, y **la lista explícita de lo que es original y por tanto no tiene respaldo externo**.

### Deuda declarada

Los dos techos y la regla de densidad son **juicio del agente, no control determinista**: incumplen D.16 igual que el resto de precondiciones del framework. La mitigación —declarar por escrito la razón de cada cierre— los hace auditables, no ejecutables. Está en los límites conocidos de la guía y en la validación, no escondido.

---

## [1.1.0] — 2026-07-27

Capa de documentación y uso, más la fusión de una retro paralela (ver nota de fusión al final de esta entrada).

### Guías
- `docs/guia-usuario.md` reescrita como **referencia completa**: qué es y para quién, modelo en un minuto, prompt de arranque, referencia de los 14 comandos, preguntas frecuentes y límites conocidos declarados.
- `docs/guia-etapa.md` — guía del eje Etapa (Vía Núcleo): las 4 etapas, artefactos por etapa, recorrido comando a comando y cambio de etapa.
- `docs/guia-exposicion.md` — guía del eje Exposición (Vía Producción): los 4 niveles, triaje con sus trampas frecuentes, disciplinas activadas, `/go-live`, `/preflight` y lo mínimo exigible por nivel.
- Separadas porque los ejes tienen alcance distinto: mezclarlas era lo que hacía parecer el framework más pesado de lo que es.

### Diagramas
- `docs/diagramas.md` con 9 diagramas Mermaid: mapa general, triaje de clasificación, Vía Núcleo por etapa, Vía Producción, **relación comando ↔ artefacto** (qué lee y escribe cada comando), ciclo de vida de una tarea, ciclo de vida de un artefacto, mecánica del quality gate y bucle de aprendizaje.
- Renderizan en GitHub y en Obsidian: son la base de la futura documentación pública.

### Obsidian
- `docs/obsidian.md`: diagnóstico del entorno real, evaluación de las tres arquitecturas posibles y recomendación de **modelo híbrido de dos niveles** — `docs/` del repo como fuente de verdad versionada, más un vault hub con junctions como vista de portfolio.
- Junctions de Windows **verificadas** en el entorno real: se crean sin permisos de administrador y el contenido se lee a través del enlace. Los puntos no verificables sin abrir Obsidian quedan marcados `[PENDIENTE]` en lugar de darse por buenos (constitution D.20).
- Recomendación calibrada a lo que hay instalado: **solo plugins core**, sin depender de Dataview.

### Propiedades YAML en las plantillas
- Las 9 plantillas incorporan frontmatter (`proyecto`, `tipo`, `etapa`, `exposicion`, `estado`, `version`, `fecha`, `tags`), que habilita consultar el portfolio entero desde la búsqueda nativa de Obsidian sin plugins de comunidad.
- La consulta `"[PENDIENTE` devuelve toda la deuda de definición de todos los proyectos a la vez.

### Prompt de arranque
- `templates/prompt-arranque.md`: prompt **común a cualquier proyecto** con parte fija invariable y bloque de datos parametrizable. Incluye variante corta para Boceto·X0 y prompt de continuación entre sesiones.
- Incorpora la instrucción de discrepar si la etapa propuesta no encaja con lo descrito, y de parar tras cada comando en lugar de encadenar la ruta entera.

### Fusión con retro paralela [0.1.1]
Mientras esta reescritura estaba en curso, una sesión paralela ejecutó una retro sobre la v0.1 (ver entrada `[0.1.1]` más abajo, conservada como registro histórico) tras pilotar `/spec-init` en LegoVirtualMuseum. Su hallazgo — combinar siempre `emil-design-eng` y `apple-design` para motion, nunca una sola — es real y está trazado a evidencia, así que se incorporó a esta versión en su ubicación correspondiente en vez de descartarse:
- **constitution.md**: nuevo principio `F.26-bis` (bloque F, junto a identidad visual).
- **commands/prototype.md**: paso 0.4 activa ambas skills cuando el prototipo tiene animación o gestos reales.
- **checklists/uxui.md**: ítem 9 (microinteracciones) verifica contra ambas skills cuando aplica.

---

## [1.0.0] — 2026-07-27

Reescritura completa. Origen: auditoría técnica documentada en `docs/auditoria-v0.1.md`, que identificó 32 hallazgos y 3 fallos estructurales sobre la v0.1.

### Modelo — dos ejes y dos vías
- **Eje Etapa** (`Boceto` · `Prototipo` · `MVP` · `Producto`) sustituye al tier único, y absorbe el time-boxing: cada etapa lleva presupuesto de tiempo.
- **Eje Exposición** (`X0`-`X3`) gobierna, de forma independiente de la etapa, qué disciplinas de seguridad, cumplimiento y operación son obligatorias.
- **Vía Núcleo** (siempre, optimizada para velocidad) y **Vía Producción** (activada por `/go-live` al pasar a usuarios reales).
- `docs/modelo.md`: matriz de activación completa, rutas típicas y reglas de resolución de conflictos entre ejes.

### Constitution v1.0
- De 16 a 36 principios, **cada uno con su condición de activación**: un principio que la etapa o exposición no activa, no aplica, y exigirlo es una infracción.
- Nuevo bloque **B — Proporcionalidad** (anti-parálisis), con precedencia interpretativa: ningún artefacto que no cambie una decisión, regla del 20%, presupuesto declarado, contacto con la realidad cada 5 días, descartar como resultado de éxito.
- Nuevo bloque **E — Datos, cumplimiento y personas**: privacidad por diseño, accesibilidad como requisito, cumplimiento detectado en triaje, seguridad de la cadena agéntica.
- Nuevo bloque **G — Entrega y operación**: esqueleto desplegado primero, observabilidad mínima, preflight, reversibilidad.
- **A.3 Evidencia de verificación**: código generado sin verificación ejecutada se considera no escrito.
- **D.16 Reglas ejecutables, no prosa**: lo que no se puede verificar ejecutando algo es una recomendación y se etiqueta como tal.
- **D.21 La spec es un documento vivo**: los cambios se tramitan, no se editan a mano.
- Umbrales de gate unificados en C.14 como fuente única, con **suelo por dimensión** (antes: promedio simple, que permitía compensar una dimensión floja).

### Comandos
- Nuevos: `/implement` (disciplina de ejecución tarea a tarea con evidencia), `/go-live` (transición a Vía Producción), `/preflight` (veredicto GO/NO-GO contra el despliegue real), `/go-nogo` (cierre del experimento con descarte barato), `/amend` (cambio de requisito con impacto y ADR), `/sync-check` (reconciliación spec ↔ código).
- Reescritos: `spec-init` (triaje de 2 ejes), `prd-lite` (modo corto y completo), `specify` (secciones activadas por exposición), `plan`, `tasks`, `prototype`, `quality-gate`, `design-system`.
- Todos con **paso 0 de precondiciones** y rutas `${CLAUDE_PLUGIN_ROOT}` resolubles (antes: rutas relativas que el agente tenía que adivinar).

### Agente
- `agents/quality-reviewer.md`: el revisor ciego pasa de ser una instrucción improvisada en cada invocación a un agente definido, de solo lectura, con anclas de puntuación y cita obligatoria por hallazgo.

### Checklists
- Nuevas: `privacidad-gdpr.md` (20 ítems), `accesibilidad.md` (23, WCAG 2.2 AA), `testing.md` (13), `operacion.md` (18), `seguridad-agentica.md` (14), `contenido-seo.md` (17).
- Ampliadas: `seguridad.md` (10 → 20 ítems: cabeceras, sesiones, cadena de suministro, rotación de secretos), `performance.md` (Core Web Vitals completos), `uxui.md` (accesibilidad extraída a su propia checklist).
- Todas con **activación declarada por nivel de exposición**.

### Plantillas
- `prd-lite.md`: nuevas secciones de usuarios/JTBD, alternativas, asunciones con la más arriesgada marcada, y **alcance v1** — el hueco que hacía que el PRD no dijera nunca qué se construye. Modo corto para etapa Prototipo.
- `spec.md`: nuevas secciones de arquitectura con flujo de datos (insumo del STRIDE), accesibilidad, estrategia de test, operación, plan de medición y módulo de cumplimiento. Clasificación de datos por campo.
- Nuevas: `project.md`, `decision-continuidad.md`.
- `tasks.md`: columna **Evidencia** obligatoria para el estado `verificada`.

### Repo
- `LICENSE` (MIT). Antes: sin licencia, lo que impedía legalmente su uso por terceros pese a publicarse como marketplace.
- Versión unificada en `plugin.json` como fuente única (antes: v0.1 / 0.1.0 / v0.1.1 conviviendo).
- Email personal retirado de `marketplace.json`.
- `modules/` para capacidades transversales reutilizables entre proyectos.

### Pendiente
- [ ] Piloto de la v1.0 con LegoVirtualMuseum y retro posterior.
- [ ] Capa de enforcement con hooks (`PreToolUse`) y scripts de validación: hoy las precondiciones son instrucciones al agente, no controles deterministas. Es el siguiente salto real (constitution D.16).
- [ ] Evals del framework: proyectos de referencia con artefactos golden para poder afirmar con dato que una versión mejora a la anterior.
- [ ] Primer módulo reutilizable y primer design system extraídos de un proyecto real.
- [ ] Integración con Kanvas.

---

## [0.1.1] — 2026-07-27

> **Registro histórico.** Esta entrada corresponde a una sesión paralela sobre la v0.1, cuyo commit divergió de la reescritura `[1.0.0]`/`[1.1.0]` anterior. Su lección es real y ya está incorporada a la v1.1 como `constitution F.26-bis` (ver "Fusión con retro paralela" arriba); las referencias a `constitution D.12` de abajo son las que existían en el momento de este commit y ya no aplican tal cual.

### Retro: piloto LegoVirtualMuseum (constitution E.16, disparo manual)

Durante `/spec-init` de LegoVirtualMuseum se iteraron 4 direcciones visuales completas
(v1 neubrutalismo, v2 archivo/museo, v3 fusion, v4 sandbox interactivo) usando la skill
`ui-ux-pro-max` para la direccion inicial y, para v3/v4, dos skills de motion instaladas
aparte: `emil-design-eng` (pulido de componente: easing propio, performance
transform/opacity, reduced-motion que atenua en vez de eliminar) y `apple-design`
(fisicidad: manejo directo 1:1, momentum/proyeccion, rubber-banding, interrumpibilidad).

**Hallazgo:** la v4 (identidad jugable — tokens de diseno arrastrables, vitrina con
inercia real) fue la mas innovadora de las 4, y goberno bien porque se aplicaron ambas
skills de motion EN LA MISMA iteracion, no una despues de la otra. Son complementarias:
Emil resuelve "que tan bien se siente" a nivel de componente; Apple resuelve "que tan
fisico se siente" a nivel de gesto. Usar solo una deja una mitad del problema sin cubrir.

**Cambio al framework (constitution D.12 + commands/prototype.md + checklists/uxui.md):**
siempre que un prototipo o design-identity incluya animacion real (no solo hover/fade)
o gestos (drag, swipe, momentum), activar `emil-design-eng` y `apple-design` juntas,
nunca una sola.

### Cambios
- constitution D.12: anadida evidencia y regla de combinar ambas skills de motion.
- commands/prototype.md: nuevo paso 3, activa ambas skills de motion cuando aplique.
- checklists/uxui.md: item 7 ahora verifica contra ambas skills cuando hay animacion real.

### Pendiente (actualizado)
- [x] Piloto con LegoVirtualMuseum y retro posterior — ver arriba. Sigue en curso el
  resto del pipeline (`/prd-lite` en adelante).
- [ ] Integracion Kanvas.
- [ ] Primer design system reutilizable extraido de un proyecto real.

---

## [0.1.0] — 2026-07-26

### Fundación
- Constitution v0.1 (16 principios en 5 bloques).
- 8 comandos: spec-init, prd-lite, specify, prototype, design-system, plan, tasks, quality-gate.
- Plantillas: prd-lite, spec, plan, tasks, design-identity, adr, comunicacion.
- Checklists: seguridad (10 ítems), performance (8), UX/UI (9).
- Guía de usuario y estructura de vault documental.

### Decisiones de diseño (origen: lecciones del piloto E2E anterior)
- 1 revisión de quality gate por defecto; extras solo bajo petición explícita.
- Revisión ciega en sub-agente fresco, autoevaluación no vinculante (evidencia: 3/3 rondas infladas).
- Requisitos críticos RC-XX con trazabilidad obligatoria a requisito técnico verificable (caso EXIF).
- Prototipo HTML autocontenido como gate visual barato previo a implementación.
- Identidad de diseño por proyecto gobierna a las skills; prohibido el look genérico.
