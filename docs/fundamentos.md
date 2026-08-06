# Fundamentos y procedencia

De dónde viene cada pieza del framework. No es una revisión sistemática de literatura ni pretende serlo: es el **mapa de linaje** de las decisiones, para que quien lo use —o quien lo audite— sepa qué es práctica establecida, qué es adaptación y qué es invención propia.

Tres reglas de lectura:

1. **Se cita lo que se puede sostener.** Autor, obra y año donde son verificables; sin referencia inventada. Es el principio A.1 aplicado a este documento.
2. **Donde nos separamos de la fuente, se dice.** Adoptar una técnica no es adoptarla entera, y las divergencias suelen ser lo interesante.
3. **Lo original se marca como original.** Un framework que se presenta como puro ensamblaje de ideas ajenas oculta dónde está su riesgo real.

---

## 1. El modelo: dos ejes y dos vías

| Pieza | Procedencia | Qué tomamos · qué cambiamos |
|-------|-------------|------------------------------|
| **Eje Etapa con presupuesto de tiempo** | **Shape Up** — Ryan Singer, Basecamp (2019). El concepto de *appetite*: el tiempo es fijo y el alcance variable, no al revés | Tomamos el appetite íntegro (constitution B.7: cuando no cabe, se recorta alcance). **Cambiamos** el vocabulario: Singer habla de apetito por apuesta; nosotros lo fijamos por etapa, porque un builder en solitario no tiene ciclos de equipo que sincronizar |
| **Etapas Boceto → Prototipo → MVP → Producto** | **Lean Startup** — Eric Ries (2011): MVP, construir-medir-aprender, perseverar/pivotar | **Cambiamos** que el MVP no es el punto de partida sino el tercer escalón. Ries popularizó el MVP hasta convertirlo en la única etapa que se nombra, y eso empuja a construir producto cuando bastaba un boceto |
| **Descartar a tiempo como resultado de éxito** (B.9) | Lean Startup (pivotar/matar) + el *circuit breaker* de Shape Up | **Cambiamos** el coste del cierre: aquí es explícitamente barato (15 minutos, sin retrospectiva completa). Un cierre caro desincentiva cerrar, que es justo lo contrario de lo que se busca |
| **Eje Exposición X0-X3** | **Enfoque basado en riesgo** del GDPR (arts. 24, 25 y 35): las obligaciones escalan con el riesgo para los derechos de las personas, no con el tamaño del proyecto | Es la traducción operativa de ese principio a un eje declarable. La idea legal es estándar; **la formulación como eje independiente de la madurez del producto es propia** |
| **Independencia de los dos ejes** | — | **Original.** No conozco un framework que separe "cuánta definición merece" de "a qué te expones". Es la decisión que permite que un boceto de un día aplique GDPR sin cargar con una spec, y es también la más fácil de refutar si resulta que en la práctica los ejes correlacionan |

---

## 2. Definición: `/spec-init` y `/prd-lite`

| Pieza | Procedencia | Qué tomamos · qué cambiamos |
|-------|-------------|------------------------------|
| **Job to be done** ("cuando \<situación\>, quiero \<motivación\>, para \<resultado\>") | **Clayton Christensen**, *Competing Against Luck* (2016) para la teoría; el formato de *job story* se popularizó desde Intercom y el trabajo de **Alan Klement** | Tomamos el formato porque obliga a nombrar la situación, no solo al usuario. **No adoptamos** el aparato completo de *outcome-driven innovation* (Ulwick): la entrevista de resultados deseados no cabe en el presupuesto de un MVP de cuatro semanas |
| **Formato de hipótesis** ("creemos que X para Y resultará en Z, porque…") | **Lean UX** — Jeff Gothelf y Josh Seiden (2013) | Tomado casi literal. **Añadimos** la obligación de citar la evidencia `E-n` que lo sustenta, que en el original es opcional |
| **Asunción más arriesgada** | **Testing Business Ideas** — David J. Bland y Alexander Osterwalder (2019); el concepto de *riskiest assumption test* | Tomamos la priorización por riesgo. **No adoptamos** el catálogo de 44 experimentos: en este framework el experimento por defecto es el prototipo navegable, y elegir entre 44 es una decisión que consume más de lo que aporta a esta escala |
| **Alternativas actuales** ("cómo se resuelve hoy") | JTBD: la competencia real de un producto suele ser el apaño manual o el no hacer nada, no otro producto | Tomado como bloque obligatorio del PRD. Es lo primero que revela un producto redundante |
| **Métricas de Go/No-Go con instrumentación** | **Goal-Question-Metric** — Victor Basili y colaboradores (años 80, ingeniería del software empírica): toda métrica cuelga de una pregunta que cuelga de un objetivo. Y la *contabilidad de innovación* de Ries | **Añadimos** la columna de instrumentación, que es donde el original se rompe en la práctica: una métrica sin evento que la mida llega a la fecha de revisión sin dato |
| **Redactar antes de preguntar** | La práctica del **memo narrativo de seis páginas** de Amazon: se escribe el documento completo y la reunión empieza leyéndolo, en lugar de construirlo en la conversación. Y el *satisficing* de **Herbert Simon** (1956): una opción suficientemente buena decidida ya vale más que la óptima decidida tarde | **Original en su aplicación**: aquí el agente escribe el memo y el humano lo corrige. Corregir es más barato y más preciso que responder preguntas abiertas |

### 2b · Negocio, monetización y riesgo

| Pieza | Procedencia | Qué tomamos · qué cambiamos |
|-------|-------------|------------------------------|
| **Modelo de negocio: quién paga, qué obtiene, por qué** | **Business Model Canvas** — Alexander Osterwalder e Yves Pigneur, *Business Model Generation* (2010) | Nos quedamos con tres de sus nueve bloques: segmentos, propuesta de valor y flujos de ingreso. **Descartamos los otros seis** (socios clave, actividades, recursos, canales, relaciones, estructura de costes) porque en un proyecto de un autor no cambian una decisión de definición, y el canvas completo tarda más en rellenarse que el PRD entero |
| **Propuesta de valor como frase declarativa** | **Value Proposition Canvas** — Osterwalder y colaboradores (2014): encaje entre trabajos, dolores y alegrías del cliente y lo que ofreces | **Simplificado a una línea.** El canvas de nueve casillas es una herramienta de taller; aquí el trabajo pesado ya lo hace el *job to be done* de §2, y repetirlo en otro formato sería duplicar |
| **Modelos de monetización como catálogo de patrones** | Literatura de *pricing* y modelos de ingreso: suscripción, por uso, por asiento, pago único, freemium. Patrones establecidos, no invención | Es la razón de que el agente **pueda proponer un modelo**: elegir entre patrones conocidos es una decisión, no un dato. Va marcado `[ASUMIDO]` |
| **Economía unitaria** | Práctica estándar de análisis de negocio: contribución por unidad antes de costes fijos | **Añadido propio en el énfasis**: aquí la variable que se vigila es el **coste variable por usuario con funcionalidad de IA**, que es nueva y es la que rompe márgenes que parecían sanos. La auditoría original ya lo señaló como área no cubierta (A-04) |
| **Product-market fit como condición, no como resultado** | **Marc Andreessen** (2007) popularizó el término; **Lean Startup** lo operacionaliza con perseverar/pivotar | Aquí baja a algo verificable: si a la fecha de revisión el Go/No-Go no se cumple, hay decisión explícita. **No adoptamos** las métricas tipo encuesta de *fit* (Sean Ellis): a esta escala son ruido |
| **Riesgo por categorías con señal observable** | Taxonomías de riesgo de la gestión de proyectos (registro de riesgos, ISO 31000) y el **pre-mortem** de **Gary Klein** (*HBR*, 2007) | **Cambiamos lo esencial: nada de probabilidades estimadas.** Un registro de riesgos clásico pide probabilidad e impacto, y ambos se inventan. Aquí cada riesgo declara la **señal observable** de que se está materializando, que sí se puede vigilar. Es la aplicación de A.1 a una técnica que habitualmente la incumple |
| **Riesgo de sustitución y comoditización** | — | **Original en su inclusión como categoría obligatoria.** Responde a una condición actual concreta: cuando el coste de construir software cae, la pregunta "¿esto lo resolverá gratis una herramienta de propósito general en seis meses?" pasa de paranoia a diligencia básica |
| **Verificación de datos de competidor** | — | **Original, y es la regla más restrictiva del framework.** Nombre, precio y posicionamiento ajenos son datos: exigen fuente y fecha o `[PENDIENTE]`. Está prohibido rellenarlos de memoria, incluso siendo plausibles. El motivo no es solo la exactitud: **una tabla verosímil cierra la pregunta que debería haber abierto** |

---

## 3. Expansión: `/expand`

La fase con más deuda con la ingeniería de requisitos clásica, y la que más se apoya en literatura verificable.

| Pieza | Procedencia | Qué tomamos · qué cambiamos |
|-------|-------------|------------------------------|
| **Notación EARS y sus 6 plantillas** | **Easy Approach to Requirements Syntax** — Alistair Mavin y colaboradores, Rolls-Royce; presentado en la conferencia IEEE de Requirements Engineering (RE'09, 2009) | Tomamos las seis plantillas íntegras. **Cambiamos** el uso: en su origen EARS es una guía de redacción para requisitos que ya existen; aquí se usa como **generador** — la plantilla de comportamiento no deseado obliga a preguntarse qué puede ir mal, y esa pregunta es la que produce los casos límite |
| **Event Storming** | **Alberto Brandolini** (2013) | Tomamos los cuatro artefactos que alimentan las lentes: eventos, comandos, políticas y agregados. **No adoptamos** la sesión facilitada con varias personas, ni *hotspots*, ni contextos delimitados: son coste de taller que un autor solo no puede pagar |
| **Agregados** | **Domain-Driven Design** — Eric Evans (2003) | Tomamos el agregado como unidad de consistencia, que es lo que da sujeto a las lentes de ciclo de vida, permisos y concurrencia. **No adoptamos** el resto del aparato táctico de DDD |
| **L1 · Ciclo de vida y estados** | **Statecharts** — David Harel, *Statecharts: A Visual Formalism for Complex Systems* (1987) | Tomamos la idea de que los estados y las transiciones son una estructura declarable, no prosa. **Simplificamos** mucho: sin jerarquía, sin ortogonalidad, sin historia. Una tabla de transiciones en MVP y un diagrama en Producto |
| **L2 · Permisos rol × estado** | La **matriz de control de acceso** de **Butler Lampson** (*Protection*, 1971); **RBAC** de **Ferraiolo y Kuhn** (NIST, 1992); y la idea de decidir por atributos del recurso, no solo por rol (ABAC, NIST SP 800-162) | La matriz rol × estado es RBAC con un atributo: el estado del recurso. **Es la pieza que corrige el defecto que teníamos**: la autorización modelada como un escalar por endpoint no sabe expresar "editable en borrador, no en publicado" |
| **L3 · Validaciones y límites** | Práctica estándar de diseño por contrato: precondiciones explícitas | Nada original. Se incluye porque es lo que más se olvida cuando el requisito se escribe en prosa |
| **L4 · Modos de fallo** | **FMEA** (análisis de modos de fallo y efectos), de la ingeniería de fiabilidad; y para el fallo parcial, **Sagas** — Hector Garcia-Molina y Kenneth Salem, SIGMOD (1987): transacciones largas con compensación | La mitad de compensación viene directa de Sagas. **Añadimos** la idempotencia al reintentar, que en la práctica moderna es inseparable (y está codificada en la propia semántica de HTTP) |
| **L5 · Fronteras y vacío** | **Análisis de valores frontera** y **particiones de equivalencia** — Glenford Myers, *The Art of Software Testing* (1979) | Técnica de test aplicada **antes** de que exista código. Es literatura de los años setenta y sigue siendo la forma más barata de encontrar casos límite |
| **L6 · Concurrencia** | Teoría de transacciones: **Jim Gray y Andreas Reuter**, *Transaction Processing* (1993); control optimista frente a pesimista | Se reduce a tres preguntas (escritura simultánea, escritura sobre borrado, lectura durante transición) porque a esta escala el resto no cambia una decisión |
| **L7 · Auditoría y su mitad negativa** | **Privacy by Design** — Ann Cavoukian, codificado en el art. 25 del GDPR; y el principio de **minimización** del art. 5.1.c | **Original en su formulación:** la "mitad negativa" —declarar qué NO debe registrarse jamás— no la he visto exigida como requisito con ID en ningún framework. Nace de una observación simple: un registro de auditoría mal delimitado es él mismo una brecha |
| **Historias de usuario y criterios de aceptación** | Las **tres C** de **Ron Jeffries** (2001: tarjeta, conversación, confirmación); **Given/When/Then** de **Dan North** y el desarrollo guiado por comportamiento (BDD, ~2006) | **Invertimos el orden habitual.** En la práctica ágil la historia viene primero y el requisito se deriva de ella. Aquí el requisito EARS es la unidad, y la historia es el envoltorio de aceptación que se escribe **después del corte**. Un criterio de aceptación sin requisito detrás es un defecto |
| **Trazabilidad de requisitos** | Matriz de trazabilidad, práctica formalizada en la norma **ISO/IEC/IEEE 29148** de ingeniería de requisitos | Tomada íntegra: todo requisito con origen, sin origen no se emite |
| **Los dos techos de activación** | — | **Original, y es la parte con menos respaldo externo.** La idea de escalar el rigor por riesgo es estándar; la de poner **dos filtros antes del generador en lugar de uno después** es nuestra, y está declarada como no validada en un documento interno de autoevaluación (no publicado en este repo) |

---

## 4. Especificación: `/specify`

| Pieza | Procedencia | Qué tomamos · qué cambiamos |
|-------|-------------|------------------------------|
| **STRIDE sobre diagrama de flujo de datos** | Modelo de amenazas de Microsoft — **Loren Kohnfelder y Praerit Garg** (1999), popularizado por el ciclo de desarrollo seguro de Microsoft | Tomamos la exigencia que más se incumple: **sin diagrama no hay STRIDE**. Enumerar amenazas de un sistema que no está dibujado es teatro |
| **Clasificación de campos** (público / personal / categoría especial) | GDPR arts. 4, 6 y 9 | Directo de la norma. La clasificación por campo es lo que hace auditable el mapa de datos |
| **ADR — registro de decisiones de arquitectura** | **Michael Nygard** (2011) | Tomado íntegro, sin cambios |
| **Presupuestos de rendimiento fijados antes de medir** | Práctica de *performance budgets* del desarrollo web; Core Web Vitals de Google como métricas | **Cambiamos** el momento: el presupuesto se fija en la spec, no después de la primera medición. Fijarlo después es describir lo que salió, no decidir lo que quieres |

---

## 5. Revisión: `/quality-gate` y el revisor ciego

| Pieza | Procedencia | Qué tomamos · qué cambiamos |
|-------|-------------|------------------------------|
| **Inspección formal con criterios de salida** | **Michael Fagan**, inspecciones de software, IBM Systems Journal (1976): roles definidos, criterios de entrada y salida, foco en detectar y no en corregir | El revisor diagnostica y no reescribe: es la regla de Fagan. **Cambiamos** el equipo por un agente aislado |
| **Revisión ciega** | Revisión por pares ciega de la práctica académica | El revisor no recibe la conversación, ni la autoevaluación, ni los gates anteriores. **Motivo empírico propio:** en el piloto, la autoevaluación se infló en 3 de 3 rondas |
| **Anclas de puntuación 3 / 5 / 7 / 9** | **Escalas de valoración con anclas conductuales (BARS)** — Patricia Cain Smith y L. M. Kendall (1963): describir el comportamiento que corresponde a cada punto de la escala reduce la varianza entre evaluadores | Tomado íntegro. Es la diferencia entre "puntúa del 1 al 10" y una rúbrica que dos personas aplican igual |
| **Suelo por dimensión, no solo media** | Regla de decisión **no compensatoria** (conjuntiva) del análisis multicriterio | **Cambiamos** un promedio simple por media **y** suelo. El promedio permitía compensar una dimensión floja con otra fuerte, que es exactamente por donde se cuela un problema |
| **Desconfianza de la autoevaluación** | La **falacia de la planificación** — Daniel Kahneman y Amos Tversky (1979): sistemáticamente subestimamos coste y sobreestimamos calidad de lo propio | Es el fundamento de que el gate exista y de que no lo ejecute quien escribió el artefacto |

---

## 6. Plan, entrega y operación

| Pieza | Procedencia | Qué tomamos · qué cambiamos |
|-------|-------------|------------------------------|
| **Esqueleto desplegado primero** | ***Walking skeleton*** — Alistair Cockburn; emparentado con las *tracer bullets* de **Andrew Hunt y David Thomas**, *The Pragmatic Programmer* (1999) | Tomado íntegro y elevado a principio (G.29). Desplegar el día uno valida el pipeline cuando cambiarlo aún es barato |
| **Definición de hecho verificable** | *Definition of Done* de Scrum | **Endurecido:** aquí "hecho" exige evidencia **ejecutada y registrada** (comando y salida), no la afirmación de que se hizo. Es el principio A.3, y existe porque un agente afirma haber verificado con demasiada facilidad |
| **Checklists como control** | **Atul Gawande**, *The Checklist Manifesto* (2009): en aviación y cirugía, la checklist reduce errores en tareas que el experto "ya sabe hacer" | Fundamento de las nueve checklists y del `/preflight`. La lección aplicable es que la checklist vale precisamente cuando crees que no la necesitas |
| **Preflight con veredicto** | Checklist previa al vuelo de la aviación; misma lógica que Gawande | **Original en el detalle que importa:** se verifica **contra el despliegue real**, nunca contra local ni por inspección de código |
| **Observabilidad y objetivos de servicio** | *Site Reliability Engineering* — Beyer, Jones, Petoff y Murphy, Google (2016) | Tomamos el mínimo viable: seguimiento de errores, logs sin datos personales, disponibilidad y copia restaurada. **No adoptamos** presupuestos de error ni SLO formales: no cambian una decisión a esta escala |
| **Los cinco pilares de calidad operativa** | *Well-Architected Framework* (AWS) | Usado como lista de cobertura para detectar qué faltaba, no como marco adoptado |
| **Medición del propio proceso** | ***Accelerate*** — Nicole Forsgren, Jez Humble y Gene Kim (2018), y las métricas DORA | **Cambiamos** las métricas: en lugar de frecuencia de despliegue, medimos tiempo por fase, rondas de gate y ***gate escape*** — defectos que aparecen tras el lanzamiento y que un gate debería haber cazado. Es la métrica que de verdad dice si el gate sirve |
| **Cierre del experimento** | Perseverar / pivotar / descartar, de Lean Startup | **Añadimos** la fecha en el calendario desde que se aprueba el PRD. Un experimento sin lectura de resultado es peor que no haberlo hecho (H.33) |

---

## 7. Cumplimiento y seguridad

Aquí no hay metodología que elegir: hay norma aplicable. Se cita para que se sepa de dónde sale cada exigencia.

| Área | Referencia normativa |
|------|----------------------|
| Protección de datos | **Reglamento (UE) 2016/679 (GDPR)** — art. 5 (minimización), art. 6 (base legal), art. 9 (categorías especiales), art. 25 (protección desde el diseño y por defecto), art. 33 (notificación de brecha en 72 h), art. 35 (evaluación de impacto) |
| Cookies y comunicaciones | **Directiva 2002/58/CE (ePrivacy)** y su transposición |
| Accesibilidad | **Directiva (UE) 2019/882 — European Accessibility Act**, aplicable desde el 28 de junio de 2025 · **WCAG 2.2 nivel AA** (W3C) · **EN 301 549** |
| Inteligencia artificial | **Reglamento (UE) 2024/1689 — AI Act**: transparencia, marcado de contenido generado, clasificación de riesgo |
| Pagos | **Directiva (UE) 2015/2366 (PSD2)** — autenticación reforzada; PCI-DSS por delegación en proveedor certificado |
| Menores | GDPR art. 8; en España, 14 años |
| Seguridad de aplicación | **OWASP** — ASVS y Top 10 |
| Seguridad de la cadena agéntica | **OWASP Top 10 para aplicaciones LLM** (2023): inyección de prompt, tratamiento del contenido externo como dato no confiable, mínimo privilegio |

La checklist `seguridad-agentica.md` es la menos convencional del conjunto: protege el **proceso** —el agente que lee contenido externo con permiso de escritura en el repo— y no el producto. Es una superficie de riesgo que casi ningún framework de desarrollo contempla todavía porque casi ninguno asume que un agente ejecuta el pipeline.

---

## 8. Diseño y documentación

| Pieza | Procedencia |
|-------|-------------|
| **Tokens de diseño y sistema antes que componente** | *Design tokens*, concepto originado en Salesforce (Jina Anne) y hoy estándar; **Brad Frost**, *Atomic Design* (2016) |
| **Identidad que gobierna a las herramientas** | **Original.** El principio F.26 existe porque la generación asistida converge hacia un aspecto genérico reconocible; obligar a que la identidad del proyecto mande sobre las skills es la contramedida |
| **Prototipo HTML como gate visual barato** | Lógica de prototipado de baja fidelidad del diseño de producto: es más barato descartar un HTML que una implementación desplegada |
| **Criterio en `brand.md` antes que tokens, easing con nombre propio, sombra en capas** (F.26-ter) | **Kevin** (@kvnkld), *"The 10 rules to ship truly polished UI with Claude"*, X, 16 jun 2026. Tomamos íntegras las reglas de easing con nombre propio y sombra en capas (anillo + contacto + ambiente a opacidad baja) frente a la sombra plana única, que el propio autor señala como el indicio más rápido de una interfaz genérica. **No adoptamos** su capa de física de arrastre (momentum, snap points): ya está cubierta por F.26-bis (`apple-design`) y repetirla aquí duplicaría el principio |
| **Flujo de dos capas (criterio en Markdown antes que tokens en CSS) y `showcase.html` como prueba renderizada, no prosa** | **Borja Pérez / Helmcode**, *"Creando un sistema de diseño sin tocar Figma. Diseñando con Claude Code"*, LinkedIn, 10 jul 2026, y su artefacto público `helmcode.com/brand`. El artículo cita directamente a Kevin como su propio punto de partida — la cadena de procedencia es explícita, no nuestra. Tomamos el orden brand.md → tokens.css → componente y la exigencia de que el sistema se apruebe mirándolo renderizado, no leyéndolo. **No adoptamos** su capa completa de Design Ops (`design-ops.md`, `quickstart.md`, `linter.md`, `control-de-versiones.md` como archivos separados, más `messaging.md`/`voz.md`): las checklists del framework y el campo de tono en `design-identity.md` ya cubren esa función, y multiplicar archivos para el mismo control infringe la regla del 20% |

---

## 9. Lo que se descartó conscientemente

Tan informativo como lo adoptado. Cada descarte tiene su razón y es revisable.

| Descartado | De dónde venía | Por qué no |
|-----------|----------------|-----------|
| **Pre-mortem** como comando propio | **Gary Klein**, *Harvard Business Review* (2007) | Buena técnica, y su lógica está absorbida en el barrido de riesgos de §5b. Como **comando propio** se descarta: se solaparía con la asunción más arriesgada y con la propia §5b, y un comando más para la misma pregunta infringe B.5 |
| **Business Model Canvas completo** | Osterwalder y Pigneur (2010) | Seis de sus nueve bloques no cambian una decisión en un proyecto de un autor. Nos quedamos con tres |
| **Métricas de encuesta de product-market fit** | Sean Ellis | A esta escala de usuarios el resultado es ruido estadístico. El Go/No-Go con instrumentación cumple la misma función con dato real |
| **Probabilidad e impacto en el registro de riesgos** | ISO 31000 y práctica habitual de gestión de proyectos | Ambos números se inventan y nadie los revisa. Sustituidos por señal observable, que sí se puede vigilar |
| **Sección propia de "métricas de éxito"** | Práctica habitual de PRD | Duplicaría el bloque Go/No-Go, que ya trae baseline, target, plazo, medición e instrumentación. Dos sitios para el mismo número es el defecto que la v1.0 corrigió |
| **Estimación en puntos de historia** | Práctica ágil habitual | El appetite hace el trabajo desde el otro lado: el tiempo es fijo, se recorta alcance. Estimar para después negociar el plazo es el bucle que el framework quiere evitar |
| **MoSCoW** a nivel de requisito | Gestión de requisitos clásica | El PRD ya prioriza `must`/`should` por capacidad. Repetir la priorización un nivel más abajo reintroduce ambigüedad; usamos una decisión de corte (v1/v2/descartado), no una prioridad |
| **Casos de uso completos** (Cockburn) | *Writing Effective Use Cases* (2000) | Excelentes y demasiado caros para esta escala. EARS más flujos con Given/When/Then cubren lo que cambia una decisión |
| **Event Storming completo** | Brandolini | Requiere sesión facilitada con varias personas. Nos quedamos con los cuatro artefactos que alimentan las lentes |
| **SLO y presupuestos de error formales** | SRE de Google | No cambian una decisión en un producto sin equipo de guardia |
| **Contabilidad de innovación completa** | Ries | Dos a cuatro métricas con instrumentación declarada cubren la decisión de perseverar o parar |

---

## 10. Qué es original, y por tanto dónde está el riesgo

Lo honesto es señalar dónde el framework no tiene red debajo:

1. **La independencia de los dos ejes.** Separar madurez de exposición es, hasta donde sé, propio. Si en la práctica ambos correlacionan siempre, el modelo tiene una complejidad que no paga.
2. **Los dos techos de `/expand`.** Filtrar antes de generar en lugar de después. Sin validar, y declarado como tal.
3. **La mitad negativa de la auditoría.** Exigir como requisito con ID qué NO debe registrarse.
4. **`A.4-bis` — la frontera dato/decisión.** Un dato no se asume jamás; una decisión sí puede proponerse marcada. La distinción es intuitiva pero la frontera es borrosa en la zona gris, y está registrada como debilidad D-05.
5. **`B.6-bis` — el presupuesto de 8 preguntas.** No conozco precedente de un presupuesto de preguntas como control de proceso. **El número no está calibrado con dato**: es un juicio, y así consta.
6. **El *gate escape* como métrica del propio framework.** Adaptación de la lógica de Accelerate a un contexto de un solo autor.
7. **La prohibición de rellenar datos de competidor de memoria**, aun siendo plausibles. Es más restrictivo que la práctica habitual del sector, donde un análisis competitivo generado se acepta como punto de partida sin marcar su procedencia.
8. **Riesgos con señal observable en lugar de probabilidad estimada.** Contradice deliberadamente la forma canónica del registro de riesgos.

Los puntos 2, 4, 5, 7 y 8 son los que están sin verificar. Sus predicciones y sus reglas de decisión están escritas por adelantado en un documento interno de autoevaluación (no publicado en este repo), incluida la que dice cuándo revertir en lugar de parchear.

---

> **Nota sobre este documento.** Es un mapa de procedencia, no una revisión de literatura. No afirma que estas fuentes validen el framework: afirma que las decisiones tienen linaje conocido y que las que no lo tienen están señaladas. La diferencia importa, porque un documento de referencias mal usado sirve para dar apariencia de rigor a algo que no lo tiene, y eso es lo contrario de lo que este framework intenta hacer.
