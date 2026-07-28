# Guía del eje ETAPA — Vía Núcleo

**Qué gobierna este eje:** cuánta definición produces y cuánto tiempo inviertes antes de decidir.
**Pregunta que responde:** *¿cuánto vale este trabajo?*

Este eje corre **siempre**, en todo proyecto. Es la Vía Núcleo: definir lo mínimo, construir, validar y decidir. El otro eje —[Exposición](guia-exposicion.md)— es independiente y responde a una pregunta distinta.

---

## 1. Las cuatro etapas

| | **Boceto** | **Prototipo** | **MVP** | **Producto** |
|---|---|---|---|---|
| **Qué es** | Explorar una idea o resolver algo puntual para ti | Validar una propuesta concreta | Producto mínimo real delante de alguien | Se mantiene, evoluciona y se opera |
| **Pregunta que responde** | ¿es viable esto? | ¿funciona el concepto? | ¿lo quiere alguien? | ¿cómo lo hago crecer? |
| **Presupuesto** | ≤ 1 día | ≤ 1 semana | ≤ 4 semanas | ciclos ≤ 4 semanas |
| **Definición máxima (20%)** | ~1,5 h | ~1 día | ~4 días | ~4 días/ciclo |
| **Desechable** | Sí, por diseño | Sí | No | No |
| **Compromiso con terceros** | Ninguno | Ninguno | Implícito | Explícito |

**El presupuesto es de calendario, no de esfuerzo.** "≤1 semana" significa que a los 7 días hay una decisión, no que hayas trabajado 40 horas.

### Cómo elegir la etapa

Elige por **qué pregunta necesitas responder ahora**, no por lo grande que sea la idea. Una idea ambiciosa empieza en Boceto igual que una pequeña; lo que cambia es cuántas etapas recorrerá.

Señales de que has elegido mal:
- *Demasiado alta*: llevas dos días escribiendo definición para algo que ibas a usar solo tú.
- *Demasiado baja*: hay usuarios reales esperando algo que no tiene spec ni tests.

---

## 2. Qué produce cada etapa

| Artefacto | Boceto | Prototipo | MVP | Producto |
|-----------|:---:|:---:|:---:|:---:|
| `project.md` | ✅ | ✅ | ✅ | ✅ |
| `design-identity.md` | — | ✅ | ✅ | ✅ |
| PRD-lite | — | 🟡 1 página | ✅ completo | ✅ completo |
| PRD §2b negocio y §5b riesgos | — | — | ✅ | ✅ |
| `requirements.md` | — | — | ✅ | ✅ |
| Spec técnica | — | — | ✅ núcleo | ✅ completa |
| Quality gate ciego | — | — | ✅ spec | ✅ PRD + spec |
| Prototipo HTML | 🟡 | ✅ | 🟡 si hay UI nueva | 🟡 por feature |
| Plan + tasks | — | 🟡 lista simple | ✅ | ✅ |
| ADRs | — | — | 🟡 estructurales | ✅ |
| Pieza de comunicación | — | — | ✅ por fase mayor | ✅ por fase mayor |

✅ obligatorio · 🟡 recomendado o condicional · — no aplica

**Lo que no aparece marcado, no se produce.** Crear un artefacto que la etapa no exige infringe el principio B.5 (ningún artefacto que no cambie una decisión).

---

## 3. Recorrido por etapa

### Boceto — dos comandos

```
/spec-init <nombre>   →   construir   →   usar
```

`/spec-init` hace **dos preguntas** (etapa y entorno) y crea solo `docs/00-proyecto/project.md`. No hay PRD, spec, plan, tasks ni gates.

Esas dos son parte del presupuesto de 8 preguntas que gobierna todo el flujo de definición (principio B.6-bis). En Boceto sobran seis, y eso es exactamente lo que debe pasar.

Regla dura única: **secretos en variables de entorno**. Se aplica en toda etapa sin excepción.

> Si el framework te estorba aquí, está mal usado. En Boceto debe ser prácticamente invisible.

**Cuándo subir a Prototipo:** cuando quieras enseñárselo a alguien, o cuando lleves más de un día y siga vivo.

---

### Prototipo — la ruta que más importa optimizar

```
/spec-init  →  /prd-lite (modo corto)  →  /prototype  →  enseñarlo  →  /go-nogo
```

Objetivo: **de idea a señal en una semana**.

**`/prd-lite` en modo corto** son cuatro bloques y 15-20 minutos:
1. Problema — quién, qué, por qué ahora.
5. Hipótesis y asunciones — con **la más arriesgada marcada**.
6. Alcance v1 — lo mínimo para que la hipótesis sea comprobable.
7. Go/No-Go — qué número te haría continuar.

Los bloques 2, 3, 4, 8 y 9 se omiten. No se dejan vacíos: se omiten.

**`/prototype`** genera un HTML autocontenido que se abre en el navegador. Debe incluir estados vacío, de carga y de error —es donde se descubren los huecos de definición—, y accesibilidad de base: lo que no esté aquí tampoco estará en la implementación.

Máximo **dos iteraciones** de ajuste visual. Si necesitas más, el problema es de definición, no de píxeles.

**Enseñarlo.** El prototipo no es el entregable: la señal lo es. Cinco personas del segmento primario bastan para saber si la asunción más arriesgada se sostiene.

**`/go-nogo`** cierra el ciclo. Descartar aquí es el mejor resultado posible del framework: te ha costado una semana en lugar de tres meses.

**Cuándo subir a MVP:** cuando la asunción más arriesgada resiste y quieres ponerlo delante de usuarios reales.

---

### MVP — el recorrido completo

```
/spec-init → /prd-lite → /expand → /specify (+gate) → /prototype → /plan → /tasks → /implement × N → /go-nogo
```

**`/prd-lite` completo** añade usuarios y *job to be done*, alternativas actuales, evidencia con fuente y fecha, requisitos críticos `RC-XX` y exclusiones.

No es una entrevista: escribe **el borrador entero primero** y luego te presenta un solo bloque con sus asunciones marcadas y, como mucho, dos preguntas. Corregir una asunción cuesta menos que responder una pregunta, y el documento existe desde el minuto uno en lugar de irse construyendo turno a turno.

El bloque que más se nota: **Alcance v1**. Es el contrato de `/expand` y responde a *"¿qué construimos?"*. Sin él, todo lo demás adivina.

**En MVP aparecen además dos bloques que en Prototipo no existen**: §2b (propuesta de valor, modelo de negocio, monetización y economía unitaria) y §5b (riesgos del proyecto). Están aquí y no antes porque en Prototipo el modelo de negocio es especulación sobre algo que aún no existe; a partir de MVP deja de serlo.

La §2b no desaparece aunque no pretendas ganar dinero: **se reduce a una línea que te obliga a declarar por qué está bien y con qué se sostiene**. Esa línea es el control barato contra el modo de fallo más caro de esta época — construir algo funcionalmente impecable por lo que nadie iba a pagar. Cuando el coste de construir software se desploma, lo escaso deja de ser la implementación.

La cifra a mirar en §2b es la **economía unitaria**: coste variable por usuario contra ingreso por usuario, contrastada con el coste mensual de `project.md`. Con funcionalidad de IA es lo que más productos mata y lo que menos se revisa.

En §5b los riesgos se declaran con **señal observable**, no con probabilidad. Un porcentaje inventado da falsa precisión y nadie lo revisa; una señal se vigila.

**`/expand`** es la etapa que convierte cada capacidad del alcance v1 en requisitos implementables. Una capacidad es una línea de prosa; un requisito no lo es. Aplica siete lentes de descomposición —ciclo de vida, permisos rol × estado, validaciones, modos de fallo, fronteras y vacío, concurrencia, auditoría— y escribe el resultado en notación EARS.

Lo que hace que no se dispare: **dos techos antes de generar**. El primero decide qué lentes corren según etapa y exposición; el segundo, si esa lente tiene sujeto en esa capacidad concreta. Una landing sin cuentas no recibe matriz de permisos ni concurrencia, y eso no es un ahorro: es que no hay dos actores.

Después viene el corte. La masa generada se clasifica en `v1`, `v2` y descartado contra el presupuesto de la etapa, y solo entonces se escriben las historias de usuario — porque una historia sobre trabajo que no vas a construir es una promesa falsa. Cada criterio de aceptación cita el requisito que hay detrás; uno que no lo cite es un defecto.

Señal de que ha funcionado: una capacidad de complejidad media sale con **ocho requisitos o más**, y entre ellos hay al menos dos de comportamiento no deseado. Esos son los casos límite que antes se descubrían implementando.

**`/specify`** ensambla. Ya no redacta requisitos funcionales: proyecta `requirements.md` y le añade la dimensión técnica —arquitectura, modelo de datos, contratos— más las disciplinas que activa la exposición. También baja cada `RC-XX` a requisito verificable. Ejemplo de referencia: "anonimato" no puede quedarse en narrativa; baja a *"el backend elimina metadatos EXIF/GPS de toda imagen al subirla, verificable con un test que sube una imagen con GPS y comprueba su ausencia en el archivo servido"*.

Revisa sobre todo la **tabla de trazabilidad**. Un `RC-XX` que sigue siendo narrativa es el fallo que más caro sale. Y una capacidad del alcance v1 sin ningún requisito detrás es hallazgo crítico del gate: es el modo de fallo que esta etapa existe para cerrar.

**El gate** lo ejecuta un revisor ciego (agente `quality-reviewer`) que no ve la conversación ni tu autoevaluación. Una revisión por defecto. Umbrales en MVP: media ≥6,5 **y** ninguna dimensión <6,0. El suelo por dimensión existe porque un promedio permite compensar una dimensión floja con otra fuerte, que es exactamente como se cuela un problema.

No se persigue el PASS: corriges lo que aceptes, documentas lo que rechaces con su razón, y avanzas.

**`/plan`** ordena por dependencia técnica y, a igualdad, **por riesgo descendente**. Dos fases fijas:
- **Fase 0** — setup y seguridad antes de cualquier funcionalidad.
- **Fase 1** — esqueleto extremo a extremo **desplegado en producción real**. El día uno, no al final: valida el pipeline de despliegue cuando cambiarlo todavía es barato.

Comprobación crítica al cerrar el plan: si la estimación **no cabe en el presupuesto**, se recorta alcance. Estirar el plazo exige decisión explícita registrada.

**`/tasks`** descompone en unidades verificables en una sesión corta, con IDs estables que se citan en los commits.

**`/implement`** — una tarea por invocación, siempre. El ciclo de cada tarea:

1. Lee la sección de spec que la tarea referencia, **literal**.
2. Enuncia qué va a hacer y cómo se verificará. Si detecta contradicción en la spec, **para** y propone `/amend`.
3. Implementa dentro del alcance de la tarea.
4. **Ejecuta** la verificación. Ejecutar significa correr el test, no razonar sobre lo que pasaría.
5. Registra la evidencia (comando y resultado) en `tasks.md`.
6. Commit con el ID de tarea.

Una tarea sin evidencia se queda en `hecha`, nunca en `verificada`. Encadenar tareas sin verificación intermedia es el modo de fallo que este comando existe para impedir.

---

### Producto — ciclos

Igual que MVP, pero en ciclos de ≤4 semanas y con dos comandos que pasan a ser rutina:

- **`/amend`** para todo cambio de requisito. Nunca edites a mano un artefacto aprobado: se pierde el análisis de impacto y la trazabilidad. Orden siempre: spec → tareas → código.
- **`/sync-check`** al cerrar cada fase. Detecta requisitos sin implementar, funcionalidad sin requisito y tareas marcadas como verificadas sin evidencia.

En Producto los ADRs dejan de ser opcionales: toda decisión estructural queda registrada con sus alternativas descartadas.

---

## 4. Cambiar de etapa

Se sube **por decisión explícita**, nunca por deriva (principio B.10):

```
/spec-init --etapa <nueva>
```

Esto obliga a: nuevo presupuesto, re-triaje de exposición, y crear retroactivamente los artefactos que la nueva etapa exige. Subir de Prototipo a MVP significa escribir el PRD completo y la spec que hasta ahora no tenías.

Bajar de etapa o congelar también son decisiones válidas y se registran igual.

---

## 5. Las reglas que te protegen

**Regla del 20%.** La definición no supera el 20% del presupuesto: 1,5h en Boceto, un día en Prototipo, cuatro en MVP. Superarlo es señal de sobre-proceso: recorta alcance o sube de etapa conscientemente.

**Ocho preguntas en todo el flujo de definición.** `/spec-init` dispone de 4, `/prd-lite` de 2, `/expand` de 2 y `/specify` de ninguna, con contador acumulado en `project.md`. Lo que no cabe en ese presupuesto no se pregunta: se propone como asunción marcada y tú la confirmas o la corriges. Un agente que te interroga durante media hora no está siendo riguroso, está trasladándote su trabajo.

**Contacto con la realidad cada 5 días.** Si llevas una semana sin producir algo que alguien pueda ver o usar, el trabajo se ha ido a definición o a fontanería.

**El alcance cede antes que el plazo.** Siempre.

**Ningún artefacto que no cambie una decisión.** La carga de la prueba recae en quien exige el control, no en quien lo omite.

**Descartar a tiempo es un éxito.** Y cuesta quince minutos.

---

## 6. Referencia rápida

| Comando | Etapa mínima | Qué produce |
|---------|:---:|-------------|
| `/spec-init` | Boceto | `project.md`, estructura, clasificación |
| `/prd-lite` | Prototipo | `prd-lite.md` (corto o completo) |
| `/expand` | MVP | `requirements.md`: EARS, ciclo de vida, permisos |
| `/specify` | MVP | `spec.md` + gate |
| `/prototype` | Prototipo | `prototype.html` navegable |
| `/plan` | MVP | `plan.md` por fases |
| `/tasks` | MVP | `tasks.md` con evidencia |
| `/implement` | Boceto | Código + evidencia registrada |
| `/amend` | MVP | Cambio tramitado + ADR |
| `/sync-check` | MVP | Informe de deriva spec ↔ código |
| `/go-nogo` | Boceto | Decisión: perseverar/pivotar/descartar |
| `/quality-gate` | MVP | Revisión ciega anexada |
| `/design-system` | Prototipo | Activo reutilizable en el framework |

**Siguiente:** si vas a exponer esto a alguien más que a ti, continúa por la [guía del eje Exposición](guia-exposicion.md).
