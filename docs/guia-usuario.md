# Guía de usuario — Spec VJC Framework v1.2

Guía de referencia completa. Sirve tanto para quien construyó el framework como para cualquiera que quiera usarlo desde cero.

**Índice**
1. [Qué es y para qué sirve](#1-qué-es-y-para-qué-sirve) · 2. [Instalación](#2-instalación) · 3. [El modelo en un minuto](#3-el-modelo-en-un-minuto) · 4. [Prompt de arranque](#4-prompt-de-arranque) · 5. [Guías por eje](#5-guías-por-eje) · 6. [Referencia de comandos](#6-referencia-de-comandos) · 7. [Documentación y Obsidian](#7-documentación-y-obsidian) · 8. [Reglas que te protegen](#8-las-reglas-que-te-protegen-de-ti-mismo) · 9. [Preguntas frecuentes](#9-preguntas-frecuentes) · 10. [Límites conocidos](#10-límites-conocidos)

---

## 1. Qué es y para qué sirve

Un framework de desarrollo dirigido por especificación que se ejecuta dentro de Claude Code, pensado para una premisa concreta:

> **El mismo framework tiene que servir para un boceto de un día y para un producto con usuarios reales en la UE**, sin que el primero cargue con la ceremonia del segundo ni el segundo se salte lo que el primero no necesita.

Eso se consigue con dos ejes independientes. La mayoría de metodologías tienen un solo eje —"proceso ligero" frente a "proceso completo"— y por eso acaban aplicando rigor donde no toca y eximiendo donde sí toca.

**Para quién es:** builders en solitario o equipos pequeños que construyen varias cosas a la vez, algunas desechables y otras destinadas a tener usuarios reales.

**Para quién no es:** organizaciones con procesos de cumplimiento formales propios, o proyectos donde ya existe un marco de gobierno que este duplicaría.

---

## 2. Instalación

```
/plugin marketplace add victorjaviercorral/spec-vjc-framework
/plugin install spec-vjc-framework@spec-vjc-framework
```

Verifica que aparecen los 15 comandos. Quedan disponibles en todos los proyectos: no se copia nada por proyecto.

Skills de diseño recomendadas (opcionales). **Antes de instalar cualquier plugin de terceros**, aplica los ítems 1-3 de `checklists/seguridad-agentica.md`: quién lo publica, cuándo se actualizó y qué instrucciones inyecta.

```
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
```

---

## 3. El modelo en un minuto

**Eje 1 — ETAPA.** *¿Cuánto vale este trabajo?* Determina cuánta definición produces.
`Boceto` (≤1 día) → `Prototipo` (≤1 semana) → `MVP` (≤4 semanas) → `Producto` (ciclos ≤4 semanas)

**Eje 2 — EXPOSICIÓN.** *¿A qué te expones?* Determina qué disciplinas son obligatorias.
`X0` privado · `X1` público sin cuentas · `X2` usuarios con datos personales · `X3` dinero, menores, datos sensibles o IA

**Son independientes.** Un boceto de un día que recoge emails aplica la checklist de privacidad completa aunque no tenga spec. Un producto grande que solo usas tú no necesita banner de cookies.

**Dos vías.** La **Núcleo** corre siempre: definir lo mínimo, construir, validar, decidir. La **Producción** se activa con `/go-live` cuando decides ir a usuarios reales.

```
VÍA NÚCLEO
/spec-init → [/prd-lite] → [/expand] → [/specify +gate] → /prototype → [/plan → /tasks] → /implement → /go-nogo
                                                                                                        │
VÍA PRODUCCIÓN                                                               ┌──────────────────────────┘
/go-live → endurecimiento → /preflight → GO LIVE → /go-nogo ─────────────────┘
```

Lo que va entre corchetes aparece o desaparece según la etapa. Una herramienta personal se construye con dos comandos; un MVP con usuarios recorre el pipeline entero.

**Ocho preguntas para todo el flujo de definición.** El framework no te entrevista: escribe primero, marca lo que ha decidido sin evidencia y te lo presenta para confirmar o corregir en bloque. `/spec-init` dispone de 4 preguntas, `/prd-lite` de 2, `/expand` de 2 y `/specify` de ninguna. Lo que no cabe en ese presupuesto se convierte en asunción marcada, nunca en un turno más de conversación.

Diagramas completos en [diagramas.md](diagramas.md).

---

## 4. Prompt de arranque

Prompt común a cualquier proyecto: la parte fija no cambia nunca, solo se rellena el bloque de datos. Versión completa, variante corta para bocetos y prompt de continuación entre sesiones en [`templates/prompt-arranque.md`](../templates/prompt-arranque.md).

````markdown
Vas a arrancar un proyecto bajo el **Spec VJC Framework v1.2**, instalado como plugin en Claude Code.

## Antes de nada

1. Lee `${CLAUDE_PLUGIN_ROOT}/constitution.md` y `${CLAUDE_PLUGIN_ROOT}/docs/modelo.md` completos, y cúmplelos.
2. Confirma en una línea qué has entendido que gobierna cada eje. Si algo del bloque de datos contradice la constitution, dilo antes de empezar.

## Datos del proyecto

```yaml
nombre:
slug:              # kebab-case, se usará en las propiedades YAML
repo:
una_frase:

# EJE 1 — ETAPA
etapa:             # boceto | prototipo | mvp | producto
presupuesto:       # fecha límite concreta
por_que_esta_etapa:

# EJE 2 — EXPOSICIÓN
lo_ve_alguien_mas:        # sí/no
recoge_datos_personales:  # sí/no
dinero_menores_sensibles: # sí/no
ia_de_cara_al_usuario:    # sí/no
jurisdiccion_usuarios:

# ENTORNO
desarrollo:
despliegue:
stack_previsto:

# DISEÑO (si etapa >= prototipo)
personalidad:      # 3 adjetivos
referencias:
evitar:
modo:              # claro | oscuro | ambos
tono_copy:
design_system:

# CONTEXTO PREVIO (opcional)
material_existente:
```

## Qué quiero que hagas

1. **Clasifica y confirma.** Determina etapa y exposición según `docs/modelo.md`. Dime el resultado, los módulos que activa y qué comandos voy a recorrer. Si mi etapa propuesta no encaja con lo que describo, discrepa.
2. **Ejecuta `/spec-init <nombre>`.** No repitas preguntas cuyo dato ya esté arriba.
3. **Para y espera mi confirmación** antes del siguiente comando. No encadenes la ruta entera.

## Reglas de esta sesión

- **No inventes un dato.** Un dato, una métrica, una fuente o una obligación legal que falte va como `[PENDIENTE: qué falta y cómo obtenerlo]`. Nunca como asunción.
- **Sí puedes proponer una decisión.** Lo que se resuelve eligiendo y no averiguando: propónlo marcado como `[ASUMIDO: <decisión> | <razón> | <riesgo si me equivoco>]` y lo confirmo o lo corrijo.
- **Ocho preguntas como máximo en todo el flujo de definición.** Escribe el borrador completo antes de preguntar nada, y agrupa las preguntas en un solo bloque al final, ordenadas por impacto y con opción por defecto.
- **Regla del 20%**: la definición no supera el 20% del presupuesto. Avísame si nos acercamos.
- **Proporcionalidad**: no produzcas ningún artefacto que mi etapa no exija.
- **La exposición manda en cumplimiento** aunque la etapa sea baja. Si obliga a algo caro, plantéame bajar la exposición como alternativa.
- Al terminar cada comando, dime el siguiente paso y qué decisión necesito tomar.
````

**Los campos que no sepas, déjalos como `[PENDIENTE]`.** El framework los preguntará; inventarlos infringe el principio A.1.

---

## 5. Guías por eje

Los dos ejes tienen alcances distintos y guía propia:

| Guía | Qué cubre | Cuándo leerla |
|------|-----------|---------------|
| **[Eje ETAPA — Vía Núcleo](guia-etapa.md)** | Las 4 etapas, qué artefactos produce cada una, el recorrido completo comando a comando, cómo cambiar de etapa | Siempre. Es el flujo que corre en todo proyecto |
| **[Eje EXPOSICIÓN — Vía Producción](guia-exposicion.md)** | Los 4 niveles, el triaje y sus trampas, qué disciplinas activa cada uno, `/go-live` y `/preflight`, lo mínimo por nivel | Cuando algo va a salir de tu máquina |

Referencia operativa completa: [modelo.md](modelo.md). Principios: [constitution.md](../constitution.md).

De dónde viene cada decisión —EARS, Event Storming, statecharts, sagas, inspecciones de Fagan, appetite de Shape Up, la norma europea aplicable— y qué partes son originales y por tanto están sin red: [fundamentos.md](fundamentos.md). Autoevaluación crítica de la etapa `/expand`, con sus debilidades y predicciones: [validacion-1.2.md](validacion-1.2.md).

---

## 6. Referencia de comandos

### Vía Núcleo

| Comando | Qué hace | Etapa mínima |
|---------|----------|:---:|
| `/spec-init` | Triaje de dos ejes, presupuesto y estructura documental | Boceto |
| `/prd-lite` | Borrador de definición y confirmación en bloque. Modo corto (1 página) o completo | Prototipo |
| `/expand` | Expande cada capacidad en requisitos EARS, ciclo de vida y permisos | MVP |
| `/specify` | Ensambla la spec técnica; baja cada `RC-XX` a requisito verificable | MVP |
| `/prototype` | HTML autocontenido navegable para validación visual | Prototipo |
| `/plan` | Fases con definición de hecho; esqueleto desplegado primero | MVP |
| `/tasks` | Tareas con IDs, dependencias y columna de evidencia | MVP |
| `/implement` | Una tarea: leer spec, implementar, **verificar**, registrar evidencia | Boceto |
| `/go-nogo` | Métricas reales contra targets → perseverar/pivotar/descartar | Boceto |

### Vía Producción

| Comando | Qué hace | Nivel mínimo |
|---------|----------|:---:|
| `/go-live` | Re-triaje + diferencial de endurecimiento + decisión de coste | X1 |
| `/preflight` | Verificación contra despliegue real → GO / NO-GO | X1 |

### Soporte

| Comando | Qué hace |
|---------|----------|
| `/quality-gate` | Revisión ciega por el agente `quality-reviewer` |
| `/amend` | Cambio de requisito con impacto, versión y ADR |
| `/sync-check` | Reconciliación spec ↔ código |
| `/design-system` | Crea o extiende un design system reutilizable |

### Los cinco momentos que más importan

**`/expand`.** El puente entre "qué construimos" y "qué tiene que hacer exactamente". Convierte cada capacidad del alcance v1 en requisitos EARS aplicando siete lentes —ciclo de vida, permisos rol × estado, validaciones, modos de fallo, fronteras y vacío, concurrencia, auditoría— y ahí es donde aparecen los casos límite que antes se descubrían implementando.

Lo que hay que mirar: que las lentes cerradas **estén declaradas con su razón**. Una lente cerrada en silencio y una lente olvidada se leen igual. Y que una capacidad de complejidad media haya producido ocho requisitos o más, con al menos dos de comportamiento no deseado; si salen tres genéricos, la expansión fue superficial.

**`/specify` y su gate.** Revisa la tabla de trazabilidad. Un requisito crítico que sigue siendo narrativa es el fallo que más caro sale, y una capacidad del alcance v1 sin ningún requisito detrás es hallazgo crítico. El gate lo ejecuta un revisor ciego que no ve tu autoevaluación; una revisión por defecto y no se persigue el PASS.

**`/implement`.** Una tarea por invocación. Termina con la verificación **ejecutada** y su evidencia en `tasks.md`. Sin evidencia se queda en `hecha`, nunca en `verificada`.

**`/go-live`.** Te presenta el coste del endurecimiento y tres salidas, incluida **reducir exposición para lanzar antes** — legítima y a menudo la más inteligente.

**`/preflight`.** El único punto del framework que dice "esto todavía no sale". Bloqueantes absolutos: secreto expuesto, dato personal accesible por quien no debe, accesibilidad nivel A, falta de texto legal en X2+, scripts sin consentimiento, copia de seguridad sin restaurar.

---

## 7. Documentación y Obsidian

La carpeta `docs/` de cada repo **es** el vault documental: código y documentación versionan juntos. Solo se crean las carpetas que la etapa exige.

Todas las plantillas llevan propiedades YAML (`proyecto`, `tipo`, `etapa`, `exposicion`, `estado`, `version`, `fecha`), lo que permite consultar el portfolio entero desde la búsqueda nativa de Obsidian sin instalar plugins. La consulta más útil:

```
"[PENDIENTE
```

Te da **todos los huecos declarados de todos los proyectos** en una búsqueda. Es tu deuda de definición completa.

La segunda más útil es `"[ASUMIDO`: te da todas las decisiones que el framework tomó por ti y que aún no has confirmado. Son dos listas distintas y conviene no mezclarlas — una es lo que no sabes, la otra es lo que alguien decidió sin preguntarte.

Arquitectura recomendada, montaje del vault hub y convenciones en [obsidian.md](obsidian.md). Estructura documental en [vault-structure.md](vault-structure.md).

---

## 8. Las reglas que te protegen de ti mismo

**Regla del 20%.** La definición no supera el 20% del presupuesto: 1,5h en Boceto, un día en Prototipo, cuatro en MVP. Superarlo es sobre-proceso.

**Contacto con la realidad cada 5 días.** Si llevas una semana sin producir algo que alguien pueda ver o usar, el trabajo se ha ido a definición o a fontanería.

**El alcance cede antes que el plazo.** Cuando el plan no cabe, se recorta alcance. Estirar exige decisión explícita registrada.

**Ningún artefacto que no cambie una decisión.** La carga de la prueba recae en quien exige el control, no en quien lo omite.

**Ocho preguntas en todo el flujo de definición.** Con contador acumulado en `project.md`. Lo que no cabe se propone como asunción marcada, que tú confirmas o corriges en bloque. Un agente que te interroga durante media hora no está siendo riguroso: te está trasladando su trabajo.

**Un dato jamás se asume; una decisión sí puede proponerse.** La frontera es si el hueco se resuelve eligiendo o averiguando. Un target de conversión inventado no es una asunción de diseño: es un dato falso que contamina el Go/No-Go entero.

**Evidencia, no afirmación.** Código sin verificación ejecutada se considera no escrito.

**Descartar a tiempo es un éxito**, y cuesta quince minutos: nota de aprendizaje, baja de infraestructura, extracción de lo reutilizable a `modules/`, repo archivado. Si hubo usuarios con datos personales, el borrado sí es obligatorio y se documenta, aunque el proyecto muera.

---

## 9. Preguntas frecuentes

**¿Tengo que usar todos los comandos?** No. Una herramienta personal usa dos. El pipeline completo solo se justifica en un MVP con usuarios reales, donde gestionas datos de terceros.

**¿Y si me equivoco de etapa?** Se cambia con `/spec-init --etapa <nueva>`, que obliga a nuevo presupuesto y re-triaje. Equivocarse hacia arriba te ralentiza; hacia abajo te expone. En cumplimiento, ante la duda sube; en definición, baja.

**¿Puedo saltarme el quality gate?** En Boceto y Prototipo no existe. En MVP y Producto es obligatorio sobre la spec, y es donde está buena parte del valor: la revisión ciega existe porque la autoevaluación se infló en 3 de 3 rondas del piloto.

**¿`/expand` no es una etapa más de burocracia?** Es la pregunta correcta, y la respuesta es que sustituye trabajo, no lo añade. Antes, una capacidad del alcance v1 cruzaba a la spec con ratio 1:1 —una línea de PRD, un requisito— porque `/specify` solo tenía obligación de expandir los `RC-XX`. El resto se descubría implementando, que es el sitio más caro. Además **reduce** preguntas: el flujo entero pasó de un número abierto a un máximo de ocho.

**¿Y si mi proyecto no tiene estados ni roles?** Entonces la mitad de las lentes no se activan y `/expand` es corto. Es el comportamiento buscado: el techo de activación existe justo para que una landing sin cuentas no reciba matriz de permisos ni análisis de concurrencia. En Boceto y Prototipo el comando directamente no aplica.

**¿Por qué el PRD me pide modelo de negocio si solo quiero construir?** Porque a partir de MVP construir bien ha dejado de ser lo escaso. Con el coste de generar software desplomado, el modo de fallo dominante ya no es un producto que no funciona: es uno que funciona perfectamente y por el que nadie iba a pagar. La §2b no te pide un plan de negocio, te pide responder a tres cosas —quién paga, por qué, y cuánto te cuesta servirle— y si no tienes respuesta clara, eso ya es el resultado.

**No pretendo ganar dinero con esto. ¿Me salto la sección?** No, pero te cuesta una línea: declarar por qué está bien que no genere ingresos y con qué se sostiene. Es deliberado — el hueco entre "no quiero monetizar" y "no me lo he planteado" es donde vive el producto vanity, y una línea lo cierra.

**¿El framework me hace el análisis de competencia?** Te da un punto de partida, no un hecho consumado. Puede proponer libremente **contra qué categorías** compites, porque eso es un marco. Pero nombres, precios y posicionamiento son datos sobre el mundo: hace una pasada de búsqueda acotada, cada fila con fuente y fecha, y marca la tabla como sin validar hasta que la confirmes. **Si no puede buscar, marca `[PENDIENTE]` en vez de tirar de memoria** — una tabla de competidores verosímil pero inventada es peor que una vacía, porque la vacía te empuja a investigar y la llena cierra la pregunta.

**¿Y por qué los riesgos no llevan probabilidad?** Porque te la inventarías. Un "probabilidad: media" no lo revisa nadie. En su lugar cada riesgo declara la **señal observable** de que se está materializando, que sí se puede vigilar.

**¿Qué diferencia hay entre `[PENDIENTE]` y `[ASUMIDO]`?** `[PENDIENTE]` es un hueco de **dato**: no se rellena nunca, se averigua. `[ASUMIDO]` es una **decisión** que el agente ha tomado por ti y que puedes revertir; lleva su razón, su riesgo y un identificador `AS-nn` para que los requisitos que dependan de ella lo digan. Si te equivocas de categoría, la que hace daño es marcar un dato como asunción.

**¿Qué hago si cambia un requisito a mitad?** `/amend`. Nunca editar a mano un artefacto aprobado: se pierde el análisis de impacto. Orden siempre: spec → tareas → código.

**¿Y si el proyecto no funciona?** `/go-nogo` con salida "descartar". Es un resultado de éxito del framework, no un fracaso.

**¿Esto vale para un proyecto que ya existe?** Sí: ejecuta `/spec-init` para clasificarlo y `/sync-check` si ya tiene spec. Los artefactos que falten se crean retroactivamente solo si la etapa los exige.

**¿Las checklists son asesoramiento legal?** No. Son diligencia técnica. En X3 conviene validación legal profesional antes de lanzar.

---

## 10. Límites conocidos

Honestidad sobre lo que la versión actual no hace:

- **Enforcement mayoritariamente no determinista, con una excepción.** Casi todas las precondiciones del framework son instrucciones al agente, no controles que bloqueen — incumplimiento parcial de su propio principio D.16, escrito así en vez de presentarse como más robusto de lo que es. La excepción es `scripts/check-requirements.ps1`, que verifica `requirements.md` de verdad y devuelve código de salida: `/expand` lo ejecuta y lee el resultado en lugar de juzgar. Es el primer control real del framework y el modelo de los que vengan. La capa de hooks sigue siendo el siguiente salto.
- **Los techos de `/expand` siguen siendo juicio.** "¿Esta entidad tiene ≥2 estados?" lo decide el agente; el script avisa pero no puede decidirlo. La mitigación —declarar por escrito la razón de cada lente cerrada— hace el juicio **auditable**, y eso sí lo comprueba el script. Lo que ya no es juicio: la densidad por capacidad, la composición después del corte, la presencia de origen y la trazabilidad de cada criterio de aceptación.
- **`/expand` es la parte menos rodada del framework.** Se publica con las ejecuciones reales declaradas en `docs/validacion-1.2.md`, junto con sus predicciones pre-registradas y las reglas de decisión escritas de antemano sobre qué hacer según el resultado. Léelo antes de confiar en esta etapa para algo caro.
- **Sin evals del framework.** No hay forma de demostrar con dato que una versión mejora a la anterior; solo el registro de métricas de `project.md` que las alimentará.
- **Integración con Kanvas diferida.** El formato de `tasks.md` ya es compatible.
- **Puntos pendientes de smoke test** en la integración con Obsidian: ver [obsidian.md §9](obsidian.md#9-qué-queda-por-verificar).
