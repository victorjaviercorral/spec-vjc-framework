---
proyecto: spec-vjc-framework
tipo: validacion
version: 1.2.0
fecha: 2026-07-28
estado: pre-registrado
tags: [spec-vjc]
---

# Validación de la v1.2 — la capa de expansión

Autoevaluación del diseño de `/expand` y de los cambios que arrastra. **Valorada por madurez actual, no por potencial.** Un diseño coherente sobre el papel y un diseño que funciona son cosas distintas, y este documento existe para no confundirlas.

Se escribe **antes** de tener resultados, con las predicciones y las reglas de decisión pre-registradas. Escribirlas después sería elegir el criterio una vez visto el resultado, que es la forma más común de que una autoevaluación se infle.

Cubre dos añadidos de la versión: la etapa `/expand` y las **secciones de negocio y riesgo del PRD** (§2b y §5b). Ambos comparten condición: cero ejecuciones reales.

---

## 0. Declaración de ejecuciones reales

> **En el momento de publicar esta versión, `/expand` tiene CERO ejecuciones reales.**

Ni una. No se ha ejecutado sobre ningún proyecto, ni sobre el piloto LegoVirtualMuseum, ni sobre un caso sintético completo. Lo que existe es:

- Un diagnóstico verificado línea a línea contra la v1.1 (ver §1).
- Un diseño argumentado y contrastado contra el modelo de dos ejes existente.
- Cero evidencia de que el diseño produzca el output que promete.

Todo lo que sigue sobre calidad esperada es **predicción, no resultado**. La columna «Resultado» de las tablas de §4 está vacía a propósito y se rellena solo con ejecuciones reales.

Esto no es humildad retórica: el framework tiene un principio (A.3) que dice que lo no verificado se considera no escrito, y aplicarlo al propio framework significa decir que esta versión es una hipótesis, no una mejora demostrada.

---

## 1. Qué sí está verificado

Lo único con evidencia dura es el **diagnóstico**, no la solución. Se comprobó con cita de línea sobre el repo en v1.1:

| Hallazgo | Estado | Evidencia |
|----------|:---:|-----------|
| La regla binaria "no inventes producto" existe literal y sin tercera vía | **Confirmado** | `commands/specify.md:40` |
| Y es constitucional, no solo del comando: A.1 nombra "requisitos" | **Confirmado, más grave de lo diagnosticado** | `constitution.md:31` |
| La obligación de expandir 1:N cubre solo `RC-XX`, nunca `C-n` | **Confirmado** | `commands/specify.md:34` |
| El gate solo sabe fallar por cobertura de `RC-XX` | **Confirmado** | `templates/spec.md:35` |
| Cero apariciones de EARS, máquinas de estado, matrices de permisos o Event Storming | **Confirmado** | grep sobre todo el repo, 0 aciertos |
| Todas las checklists son transversales; ningún generador de dominio | **Confirmado, con corrección** | son **9**, no 8 — faltaba `uxui.md` en el recuento de partida |
| El bloque 6 del PRD es input limpio | **Confirmado, mejor de lo esperado** | `templates/prd-lite.md:57-65` ya traía columna "Sirve a" |

El diagnóstico es sólido. **La solución no está validada en absoluto.** Confundir una cosa con la otra sería exactamente el error que este documento intenta evitar.

---

## 2. Autoevaluación por dimensión

Anclas de la rúbrica del propio framework: **3** ausente o narrativo · **5** estructura con huecos que obligan a decidir sobre la marcha · **7** completo y utilizable con defectos localizados · **9** verificable ítem a ítem, un tercero lo aplicaría sin preguntar.

| Dimensión | Nota | Por qué esa banda y no la siguiente |
|-----------|:---:|-------------------------------------|
| **Coherencia con el modelo existente** | **7,5** | El reparto de lentes deriva de `modelo.md` §6, no de una convención inventada; el appetite reutiliza B.7 en vez de duplicarlo; `A.4-bis` y `B.6-bis` siguen el precedente de `F.26-bis` sin renumerar. No llega a 9 porque la derivación es argumentada, no forzada: nada impediría a un agente repartir las lentes de otro modo. |
| **Capacidad generativa esperada** | **5,5** | Las plantillas EARS 3, 5 y 6 atacan directamente los tres requisitos que el Paso 1 declaró imposibles, y eso es una relación de diseño, no una casualidad. Pero **cero ejecuciones**: no hay ni una prueba de que el mecanismo dispare. Un 5,5 es "estructura plausible sin evidencia", y es exactamente donde está. |
| **Control de sobreingeniería** | **6** | Los dos techos van antes del generador, que es la corrección estructural correcta frente al diseño anterior. Baja de 7 porque el techo 2 depende de un juicio ("¿tiene ≥2 estados?") que nadie verifica, y porque no hay ningún caso probado en el que se haya observado el recorte funcionando. |
| **Integridad de lo preexistente** | **8** | Se conservan las seis capacidades que la v1.1 tenía y son mejores que cualquier propuesta anterior; los siete comandos congelados no se tocaron; `§3.3` de `modelo.md` conserva su numeración porque `go-live.md:26` la cita; las cinco citas a `A.1` sobreviven intactas. Es la dimensión mejor resuelta y aun así no es 9: no hay test automático que lo demuestre, solo lectura cuidadosa. |
| **Honestidad del artefacto** | **7,5** | La deuda D.16 está declarada en el CHANGELOG, en los límites conocidos de la guía y aquí. Las cero ejecuciones están en portada. No llega a 9 porque la honestidad declarada no sustituye a la verificación ausente. |
| **Reducción de fricción** | **6,5** | El paso de 16+∞ a 8 preguntas es real y medible en el texto de los comandos. Pero **el número 8 no está calibrado con ningún dato**: sale de un juicio sobre lo que parece razonable, no de haber medido cuántas preguntas hacen falta. Podría ser demasiado estrecho y forzar asunciones que deberían ser preguntas. |

**Global: 6,8/10.** Bajo el umbral de Producto (7,0) del propio framework y muy lejos del de X3. La lectura correcta es: **diseño defendible, madurez baja, sin derecho a presentarse como mejora demostrada.**

---

## 3. Debilidades identificadas, cada una con su prueba de refutación

Cada debilidad va con el experimento concreto que la confirmaría o la descartaría. Una debilidad sin prueba de refutación es una opinión con formato de autocrítica.

### D-01 · Los dos techos son juicio, no control · 🔴 alto

El disparador de cada lente ("¿la entidad tiene ≥2 estados?", "¿la capacidad toca ≥2 recursos?") lo evalúa el agente. Es prosa, no regla ejecutable: incumple D.16 igual que el resto de precondiciones del framework. La mitigación —declarar por escrito la razón de cada cierre— lo hace **auditable**, no determinista.

**Prueba de refutación:** ejecutar `/expand` tres veces sobre el mismo PRD, en sesiones limpias. Si las tres producen el mismo conjunto de lentes activas y cerradas, el juicio es estable y la debilidad es menor de lo previsto. Si divergen en más de una lente, el techo 2 es ruido con apariencia de mecanismo y hay que convertirlo en pregunta explícita al usuario o en script.

### D-02 · La regla de densidad es gameable · 🔴 alto

"≥8 requisitos, ≥2 de plantilla 5, ≥1 de plantilla 3 o 6" se cumple con ocho requisitos triviales. La composición exigida sube el listón, y la prohibición de rellenar con ubicuos lo sube más, pero **nada de eso es verificable de forma determinista**: un agente que quiera cumplir el número puede hacerlo con ruido bien formateado.

**Prueba de refutación:** aplicar la rúbrica D1 de `requirements` a un output real y contar cuántos de los 8 requisitos sobrevivirían a la pregunta "¿este requisito cambiaría algo si se borrase?". Si sobreviven ≥6, la regla funciona. Si sobreviven ≤4, la densidad es un número inflado y hay que sustituir el mínimo por un criterio de calidad, no de cantidad.

### D-03 · El número 8 no está calibrado · 🟠 medio

Ocho preguntas es un juicio, no una medición. El flujo v1.1 hacía ~16 nominales y hasta ~36 turnos reales; 8 es aproximadamente la mitad de lo nominal, elegido porque suena a "la mitad" y no porque se haya observado que 8 basta.

**Prueba de refutación:** contar, en las tres primeras ejecuciones reales, cuántas asunciones `AS-nn` acaban **corregidas** por el usuario. Si se corrige ≤20%, el presupuesto de 8 es correcto o incluso generoso. Si se corrige ≥50%, el framework está asumiendo cosas que debería preguntar y el número está mal puesto: la fricción no se eliminó, se desplazó a la fase de corrección.

### D-04 · `/expand` puede ser un artefacto que no cambia una decisión · 🟠 medio

Es la objeción B.5 aplicada al propio comando. Si el output de `/expand` acaba siendo lo mismo que `/specify` habría escrito de todos modos, la etapa es ceremonia con nombre nuevo.

**Prueba de refutación:** ejecutar el mismo PRD por las dos rutas —con `/expand` y saltándoselo— y comparar el número de requisitos y, sobre todo, **cuántos de los generados con `/expand` no aparecen en la ruta directa**. Si el solapamiento supera el 80%, la etapa no aporta y hay que replegar sus lentes dentro de `/specify`. Si aparecen requisitos nuevos de estado, permiso y fallo parcial, la etapa se justifica.

### D-05 · La frontera dato/decisión es borrosa en los casos que importan · 🟠 medio

`A.4-bis` dice que la frontera es si el hueco se resuelve eligiendo o averiguando, y en los casos limpios funciona. Pero hay una zona gris real: "los usuarios prefieren X" es dato; "priorizamos X" es decisión; y la segunda formulación puede usarse para colar la primera. El principio no impide ese deslizamiento, solo lo nombra.

**Prueba de refutación:** revisar todos los `AS-nn` de las primeras ejecuciones y clasificarlos a mano. Si alguno es en realidad una afirmación sobre el mundo disfrazada de decisión, el principio necesita una regla operativa adicional —por ejemplo, prohibir que un `AS-nn` contenga verbos de estado sobre terceros— y no basta con la frontera conceptual.

### D-06 · El reparto de lentes por eje puede estar mal en L4 · 🟡 bajo

L4 (modos de fallo) está bajo el eje **etapa**, tratada como definición del dominio. Pero el fallo parcial en operación multi-recurso, cuando hay datos personales de por medio, es tanto una obligación como una decisión de diseño: dejar huérfanos tras un borrado de cuenta es un problema de cumplimiento, no solo de robustez.

**Prueba de refutación:** comprobar en un proyecto X2 si L4 genera el requisito de borrado consistente. Si lo genera, el reparto aguanta. Si no lo genera porque la etapa es baja, L4 debe pasar a activación mixta —etapa para la profundidad, exposición para el mínimo obligatorio en X2+.

### D-08 · La búsqueda de competidores puede degradar a memoria del modelo · 🔴 alto

`/prd-lite` tiene permiso para hacer una pasada de búsqueda web y proponer un listado inicial de alternativas. La regla dice que sin URL comprobada va `[PENDIENTE]` y que **está prohibido recurrir a la memoria** si no hay búsqueda disponible. Pero es una instrucción en prosa, no un control: nada impide que el agente complete una fila con un precio recordado y le adjunte la URL de la página de inicio del competidor, que es formalmente una fuente y materialmente nada.

Es la debilidad de mayor impacto de esta versión, porque el daño no se detecta: una tabla de competidores plausible con URLs reales pasa cualquier lectura rápida, y sobre ella se toma una decisión de negocio.

**Prueba de refutación:** en la primera ejecución con búsqueda, verificar a mano **todos** los precios de la tabla contra su fuente. Si alguno no aparece literalmente en la URL citada, la regla no se está cumpliendo y hay que endurecerla — exigir cita textual del fragmento, no solo el enlace, igual que el `quality-reviewer` exige cita para sus hallazgos.

### D-09 · La economía unitaria puede salir toda en `[PENDIENTE]` y aparentar rigor · 🟠 medio

Si el coste variable por usuario es desconocido —lo habitual antes de tener usuarios— la tabla queda casi entera marcada. Formalmente es cumplimiento de A.1; en la práctica es una sección que ocupa espacio sin cambiar ninguna decisión, que es justo lo que B.5 prohíbe.

**Prueba de refutación:** contar en las primeras ejecuciones cuántas celdas de economía unitaria salen con valor y cuántas con `[PENDIENTE]`. Si más del 75% van marcadas de forma sistemática, la sección se reduce a **una sola pregunta** —"¿cuánto te cuesta servir a un usuario más y cuánto te paga?"— y se elimina la tabla.

### D-07 · Sin evals, el CHANGELOG afirma más de lo que sabe · 🟡 bajo

La entrada de la v1.2 describe el problema resuelto con precisión, pero la mejora sigue sin dato que la respalde: es el mismo incumplimiento de H.34 ("un cambio al framework sin dato que lo respalde es una opinión") que el framework arrastra desde la v1.0. Está declarado, no resuelto.

**Prueba de refutación:** ninguna posible hasta que existan los evals. Se registra como deuda abierta, no como debilidad refutable.

---

## 4. Predicciones pre-registradas

Escritas antes de la primera ejecución. **La columna «Resultado» se rellena solo con ejecuciones reales**, nunca con estimaciones ni con lecturas del propio diseño.

### 4.1 Prueba de fuego — los tres requisitos que justifican la etapa

`/expand` debe generar estos tres **sin ayuda**: sin que el usuario los sugiera, sin que aparezcan en el PRD, y sin que se le pregunte por ellos. Si no los genera, ha fallado en su razón de existir, porque son exactamente los tres que el Paso 1 declaró estructuralmente imposibles en la v1.1.

| # | Requisito exigido | Lente que debería producirlo | Plantilla EARS esperada | Predicción | Resultado |
|:---:|-------------------|:---:|:---:|:---:|:---:|
| **F-1** | Transición de estado sobre **recurso ya compartido** — el cambio de estado invalida artefactos emitidos antes (enlaces, cachés, notificaciones) | L1 | 6 compleja | Se genera | |
| **F-2** | Permiso **rol × estado** — un rol puede una acción en un estado y no en otro | L2 | 3 estado | Se genera | |
| **F-3** | **Fallo parcial en operación multi-recurso** — qué queda a medias, compensación, idempotencia al reintentar | L4 | 5 no deseada | Se genera | |

**Condición de la prueba:** un PRD de MVP · X2 con al menos una capacidad cuya entidad tenga ≥2 estados y ≥2 roles. Sesión limpia. Sin pistas sobre qué se está evaluando.

**Veredicto:** los tres → la etapa cumple su razón de existir. Dos de tres → cumple parcialmente y se identifica qué lente falló. **Uno o ninguno → el diseño ha fallado**, y la respuesta correcta no es ajustarlo sino replantear si el generador funciona.

### 4.2 Predicciones de comportamiento

| # | Predicción | Umbral | Resultado |
|:---:|-----------|:---:|:---:|
| P-1 | Una capacidad de complejidad media produce ≥8 requisitos | ≥8 | |
| P-2 | De ellos, ≥2 de plantilla 5 (no deseada) | ≥2 | |
| P-3 | De ellos, ≥1 de plantilla 3 o 6 (estado) | ≥1 | |
| P-4 | El flujo completo de definición no supera 8 preguntas | ≤8 | |
| P-5 | Ningún `R-nn` sale sin origen (`E-n`/`RC-XX`/`C-n`/`AS-nn`) | 100% | |
| P-6 | Ningún AC sale sin citar al menos un `R-nn` | 100% | |
| P-7 | Toda lente cerrada tiene su razón escrita | 100% | |
| P-8 | En un proyecto X1 sin cuentas, L2 y L6 quedan cerradas | ambas cerradas | |
| P-9 | En un proyecto X0, se cierran L2, L6 y L7 | las tres cerradas | |
| P-10 | El corte deja fuera de v1 algo real, no cero | ≥1 requisito a v2 | |
| P-11 | Tres ejecuciones sobre el mismo PRD activan el mismo conjunto de lentes | 3/3 iguales | |
| P-12 | Menos de la mitad de las `AS-nn` acaban corregidas por el usuario | <50% | |
| P-13 | Todo dato de competidor lleva fuente y fecha, o `[PENDIENTE]` | 100% | |
| P-14 | Todo precio citado aparece **literalmente** en la URL que lo respalda | 100% | |
| P-15 | La §2b produce al menos un riesgo que acaba en §5b (típicamente de coste) | ≥1 | |
| P-16 | Con `sostenibilidad: ninguna`, la §2b ocupa una línea y no más | 1 línea | |
| P-17 | Toda mecánica de cobro a construir aparece como capacidad `C-n` en §6 | 100% | |

### 4.3 Contra-predicciones — qué esperaría ver si el diseño está mal

Escritas para no poder reinterpretar un mal resultado como bueno:

- **Si P-10 sale en cero** de forma repetida, el corte no está cortando: todo entra en v1 y el filtro es decorativo.
- **Si P-8 o P-9 fallan**, el techo 1 no está funcionando y el comando sobredispara exactamente donde se prometió que no lo haría.
- **Si P-1 se cumple pero D-02 revela relleno**, el número se está cumpliendo con ruido y la métrica de densidad es peor que no tenerla, porque da falsa confianza.
- **Si P-4 se cumple pero P-12 falla**, no se redujo la fricción: se movió del principio al final del flujo, y probablemente empeoró.
- **Si P-13 se cumple pero P-14 falla**, la regla de fuentes es cosmética: hay enlace pero no respaldo, que es la peor combinación posible porque aparenta rigor.
- **Si P-15 sale en cero** de forma repetida, §2b y §5b están desconectadas y la economía unitaria no está alimentando el riesgo: dos secciones que se leen bonito y no se hablan.

---

## 5. Reglas de decisión, escritas por adelantado

Qué se hace según lo que salga. Se escriben ahora para que el resultado no elija su propia interpretación después.

| Si ocurre… | Entonces |
|-----------|----------|
| **La prueba de fuego sale 3/3** | `/expand` se mantiene tal cual. Se registra como primera evidencia y se pasa a acumular ejecuciones hasta tener tres antes de tocar nada. |
| **La prueba de fuego sale 2/3** | Se identifica la lente que falló y se corrige **solo esa**, con su propia predicción pre-registrada. No se reescribe el comando entero: un fallo localizado no justifica rehacer lo que funcionó. |
| **La prueba de fuego sale ≤1/3** | El diseño ha fallado en su razón de existir. **No se parchea.** Se revierte `/expand` a experimento marcado como no validado, se restaura la regla anterior en `/specify` y se replantea si el problema es el generador, las lentes o la premisa entera. Publicar una etapa que no genera lo que promete es peor que no tenerla. |
| **P-11 falla (lentes inestables entre ejecuciones)** | El techo 2 deja de ser juicio del agente y pasa a ser **pregunta explícita al usuario** en el bloque de confirmación, gastando cupo de B.6-bis. Coste asumido: menos automatismo a cambio de determinismo. |
| **P-12 falla (≥50% de asunciones corregidas)** | El presupuesto de 8 está mal puesto. Se sube a 10 y se reasigna dando cupo a `/expand`, **con dato**, no por intuición. Se documenta como corrección de B.6-bis con su evidencia. |
| **D-02 se confirma (relleno)** | Se elimina el mínimo numérico de la regla de densidad y se sustituye por la exigencia de que cada lente activa con disparador cumplido produzca **al menos un requisito no trivial**, juzgado por el gate. Mejor un criterio cualitativo verificado que un número inflable. |
| **D-04 se confirma (solapamiento >80%)** | `/expand` se repliega dentro de `/specify` como paso interno. Se conserva `requirements.md` como sección de la spec, no como artefacto propio. Se revierte el comando y se documenta el motivo. |
| **D-06 se confirma (L4 no genera el borrado consistente en X2)** | L4 pasa a activación mixta: profundidad por etapa, mínimo obligatorio por exposición en X2+. Es un cambio de una fila en `modelo.md` §3.4. |
| **D-08 se confirma (P-14 falla: precio sin respaldo literal)** | Se endurece la regla: todo dato de competidor exige **cita textual del fragmento**, no solo la URL, igual que el `quality-reviewer` exige para sus hallazgos. Si aun así falla, **se retira el permiso de búsqueda** de `/prd-lite` y la tabla de alternativas vuelve a ser trabajo íntegro del autor. Es un retroceso en comodidad y un avance en veracidad, y en ese intercambio gana la veracidad. |
| **D-09 se confirma (>75% de la economía unitaria en `[PENDIENTE]`)** | La tabla desaparece y se sustituye por una sola pregunta declarativa: cuánto cuesta servir a un usuario más y cuánto paga. Mejor una pregunta que se responde que una tabla que se marca. |
| **P-16 falla (§2b se extiende con `sostenibilidad: ninguna`)** | El comando no está respetando el colapso a una línea y está produciendo negocio para proyectos que no lo necesitan. Se corrige en `commands/prd-lite.md`; si reincide, la sección pasa a activarse **solo** con `sostenibilidad ≠ ninguna` y se pierde la línea de declaración obligatoria. |
| **Cualquier resultado, tras 3 ejecuciones reales** | Se rellenan las columnas de §4, se recalcula la autoevaluación de §2 con el dato, y se decide si la v1.2 se consolida o se marca como fallida. Un cambio al framework sin dato que lo respalde es una opinión (H.34), y esto lo es hasta que esas columnas dejen de estar vacías. |

**Regla que gobierna a todas las anteriores:** ninguna de estas decisiones se toma con una sola ejecución, salvo la de fallo (≤1/3 en la prueba de fuego), que sí es suficiente para parar. Es la asimetría deliberada: una señal de que funciona necesita repetición; una señal de que no funciona, no.

---

## 6. Qué NO valida este documento

Para que no se lea como más de lo que es:

- No valida que el framework completo mejore con la v1.2. Solo mira la capa nueva.
- No valida la calidad de los requisitos generados, solo su **presencia y su forma**. Un requisito EARS bien formado puede seguir siendo un mal requisito.
- No sustituye a los evals del framework, que siguen sin existir (deuda desde la v1.0, H.34).
- No mide el coste real: cuánto tiempo y cuántos tokens añade `/expand` al flujo. Si la etapa funciona pero duplica el coste de definición, incumple B.6 y habría que revisarla igual.

---

## 7. Estado de este documento

| | |
|---|---|
| **Escrito** | 2026-07-28, antes de la primera ejecución |
| **Ejecuciones reales al publicar** | **0** |
| **Predicciones pre-registradas** | 17 + 3 de la prueba de fuego |
| **Columnas de resultado rellenas** | 0 de 20 |
| **Próxima revisión** | tras la primera ejecución real de `/expand` sobre un proyecto MVP · X2 |

Mientras las columnas de resultado sigan vacías, la afirmación defendible sobre la v1.2 es exactamente esta: **cierra un hueco estructural diagnosticado con precisión, mediante un diseño coherente con el modelo existente y todavía sin verificar.** Cualquier formulación más fuerte que esa es marketing.
