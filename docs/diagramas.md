# Diagramas de flujo

Representación visual del framework: cómo se relacionan ejes, vías, comandos y artefactos. Los diagramas son Mermaid y renderizan en GitHub, en Obsidian y en la futura documentación pública.

**Índice**
1. [Mapa general](#1-mapa-general) · 2. [Triaje](#2-triaje-de-clasificación) · 3. [Vía Núcleo](#3-vía-núcleo-por-etapa) · 4. [Vía Producción](#4-vía-producción) · 5. [Comandos y artefactos](#5-comandos--artefactos-qué-lee-y-escribe-cada-uno) · 6. [Ciclo de una tarea](#6-ciclo-de-vida-de-una-tarea) · 7. [Ciclo de un artefacto](#7-ciclo-de-vida-de-un-artefacto) · 8. [Quality gate](#8-quality-gate) · 9. [Bucle de aprendizaje](#9-bucle-de-aprendizaje) · 10. [Expansión de requisitos](#10-expansión-de-requisitos-los-dos-techos)

---

## 1. Mapa general

Los dos ejes determinan qué se activa; las dos vías determinan cuándo.

```mermaid
flowchart TD
    START(["Idea o necesidad"]) --> INIT["/spec-init<br/>triaje de 2 ejes"]

    INIT --> E1{"Eje 1<br/>ETAPA<br/>¿cuánto vale?"}
    INIT --> E2{"Eje 2<br/>EXPOSICIÓN<br/>¿a qué te expones?"}

    E1 --> ET["Boceto · Prototipo<br/>MVP · Producto"]
    E2 --> EX["X0 · X1<br/>X2 · X3"]

    ET -->|"gobierna cuánta<br/>definición"| NUCLEO
    EX -->|"gobierna qué<br/>disciplinas"| NUCLEO

    NUCLEO["<b>VÍA NÚCLEO</b><br/>definir · construir · validar · decidir"]

    NUCLEO --> DEC{"/go-nogo<br/>¿hay señal?"}
    DEC -->|"descartar"| KILL(["Cierre limpio<br/>15 minutos"])
    DEC -->|"pivotar"| NUCLEO
    DEC -->|"perseverar y<br/>exponer a usuarios"| PROD

    PROD["<b>VÍA PRODUCCIÓN</b><br/>/go-live → endurecer → /preflight"]
    PROD --> LIVE(["GO LIVE"])
    LIVE --> DEC

    classDef via fill:#1f2937,stroke:#4b5563,color:#fff
    classDef fin fill:#065f46,stroke:#10b981,color:#fff
    class NUCLEO,PROD via
    class KILL,LIVE fin
```

---

## 2. Triaje de clasificación

Las preguntas de `/spec-init` y el nivel que activan. Ante la duda en exposición, **sube**.

```mermaid
flowchart TD
    Q0["¿Qué es esto hoy?"] --> B["Boceto<br/>≤1 día"]
    Q0 --> P["Prototipo<br/>≤1 semana"]
    Q0 --> M["MVP<br/>≤4 semanas"]
    Q0 --> PR["Producto<br/>ciclos ≤4 sem"]

    Q1{"¿Lo ve alguien<br/>más que tú?"} -->|no| X0["X0 · Privado"]
    Q1 -->|sí| Q2{"¿Alguien deja<br/>datos personales?"}
    Q2 -->|no| X1["X1 · Público<br/>sin cuentas"]
    Q2 -->|sí| Q3{"¿Dinero, menores,<br/>datos sensibles o IA?"}
    Q3 -->|no| X2["X2 · Usuarios<br/>con datos"]
    Q3 -->|sí| X3["X3 · Alto riesgo<br/>+ módulo específico"]

    X0 --> R["project.md<br/>etapa + exposición<br/>+ presupuesto"]
    X1 --> R
    X2 --> R
    X3 --> R
    B --> R
    P --> R
    M --> R
    PR --> R

    classDef riesgo fill:#7f1d1d,stroke:#ef4444,color:#fff
    class X3 riesgo
```

---

## 3. Vía Núcleo por etapa

Lo que corre en cada etapa. Los comandos entre corchetes en el pipeline general son los que aparecen o desaparecen aquí.

```mermaid
flowchart LR
    subgraph BOC["BOCETO · X0 · ≤1 día"]
        direction LR
        B1["/spec-init"] --> B2["construir"] --> B3["usar"]
    end

    subgraph PRO["PROTOTIPO · ≤1 semana"]
        direction LR
        P1["/spec-init"] --> P2["/prd-lite<br/><i>modo corto</i>"] --> P3["/prototype"] --> P4["enseñarlo<br/>a 5 personas"] --> P5["/go-nogo"]
    end

    subgraph MVP["MVP · ≤4 semanas"]
        direction LR
        M1["/spec-init"] --> M2["/prd-lite"] --> M2E["/expand"] --> M3["/specify"] --> M3G{"gate"} --> M4["/prototype"] --> M5["/plan"] --> M6["/tasks"] --> M7["/implement<br/><i>× N tareas</i>"] --> M8["/go-nogo"]
    end

    BOC -.->|"sube de etapa"| PRO
    PRO -.->|"sube de etapa"| MVP

    classDef gate fill:#78350f,stroke:#f59e0b,color:#fff
    class M3G gate
```

**Producto** recorre lo mismo que MVP en ciclos de ≤4 semanas, añadiendo `/amend` para cada cambio de requisito y `/sync-check` al cerrar cada fase.

---

## 4. Vía Producción

Se activa al decidir llevar el trabajo a usuarios reales.

```mermaid
flowchart TD
    IN(["Trabajo validado<br/>en Vía Núcleo"]) --> GL["/go-live"]

    GL --> RT["Re-triaje de exposición<br/><i>casi siempre sube</i>"]
    RT --> DIFF["Diferencial de endurecimiento<br/>solo lo que falta"]

    DIFF --> BL["Legal y datos"]
    DIFF --> BS["Seguridad"]
    DIFF --> BA["Accesibilidad"]
    DIFF --> BO["Operación"]
    DIFF --> BC["Contenido"]
    DIFF --> BM["Medición"]

    BL & BS & BA & BO & BC & BM --> COST{"¿Cabe en el<br/>presupuesto?"}

    COST -->|"sí"| IMPL["/implement<br/>tareas de endurecimiento"]
    COST -->|"no"| ALT{"Alternativas"}
    ALT -->|"bajar exposición"| RED(["Quitar cuentas o datos<br/>→ menos obligaciones<br/>→ lanzar antes"])
    ALT -->|"aplazar"| WAIT(["Posponer lanzamiento"])

    IMPL --> PF["/preflight<br/><i>contra despliegue real</i>"]
    RED --> PF

    PF --> V{"Veredicto"}
    V -->|"GO"| LIVE(["GO LIVE"])
    V -->|"GO con excepciones<br/>aceptadas por escrito"| LIVE
    V -->|"NO-GO"| FIX["Corregir bloqueantes"]
    FIX --> PF

    LIVE --> GN["/go-nogo<br/>en la fecha de revisión"]

    classDef stop fill:#7f1d1d,stroke:#ef4444,color:#fff
    classDef ok fill:#065f46,stroke:#10b981,color:#fff
    class FIX stop
    class LIVE,RED ok
```

**Bloqueantes absolutos de `/preflight`** (no admiten excepción): secreto expuesto · dato personal accesible por quien no debe · incumplimiento de accesibilidad nivel A · falta de texto legal en X2+ · scripts sin consentimiento · copia de seguridad sin restaurar en X2+.

---

## 5. Comandos ↔ artefactos: qué lee y escribe cada uno

La relación real entre comandos. Una flecha continua es "escribe"; una discontinua, "lee".

```mermaid
flowchart LR
    CONST[("constitution.md<br/>+ modelo.md")]

    SI["/spec-init"] ==> PJ["project.md"]
    SI ==> DI["design-identity.md"]

    PJ -.-> PL["/prd-lite"]
    PL ==> PRD["prd-lite.md"]

    PRD -.-> EX["/expand"]
    EX ==> REQ["requirements.md"]

    REQ -.-> SP["/specify"]
    PRD -.-> SP
    DI -.-> SP
    CHK[("checklists/")] -.-> SP
    MOD[("modules/")] -.-> EX
    MOD -.-> SP
    SP ==> SPEC["spec.md"]
    SP ==> ADR["ADR-XXX.md"]

    SPEC -.-> QG["/quality-gate"]
    QG ==> GATE["sección<br/>Quality Gate"]

    SPEC -.-> PT["/prototype"]
    DI -.-> PT
    PT ==> HTML["prototype.html"]

    SPEC -.-> PN["/plan"]
    PN ==> PLAN["plan.md"]
    PLAN -.-> TK["/tasks"]
    TK ==> TASKS["tasks.md"]

    TASKS -.-> IM["/implement"]
    SPEC -.-> IM
    IM ==> CODE["código + commit"]
    IM ==> EV["evidencia<br/>en tasks.md"]

    SPEC -.-> SC["/sync-check"]
    CODE -.-> SC

    SPEC -.-> AM["/amend"]
    AM ==> SPEC
    AM ==> ADR

    PJ -.-> GL["/go-live"]
    GL ==> END["endurecimiento.md"]
    GL ==> SPEC

    END -.-> PF["/preflight"]
    PF ==> PFR["preflight-fecha.md"]

    PRD -.-> GN["/go-nogo"]
    GN ==> DEC["decision-continuidad.md"]
    GN ==> ADR

    CONST -.-> SI & PL & EX & SP & PN & IM & GL & PF & GN

    classDef art fill:#1e3a5f,stroke:#3b82f6,color:#fff
    class PJ,DI,PRD,REQ,SPEC,ADR,GATE,HTML,PLAN,TASKS,CODE,EV,END,PFR,DEC art
```

`/amend` y `/sync-check` operan sobre los `R-nn`, que nacen en `requirements.md` y se proyectan a `spec.md` **sin renumerar**. Es la razón de que `/expand` asigne los IDs definitivos en lugar de una numeración propia: una tabla de mapeo entre dos numeraciones sería una cosa más que mantener sincronizada, y por tanto una cosa más que puede divergir.

---

## 6. Ciclo de vida de una tarea

El ciclo que impone `/implement`. La transición a `verificada` **solo existe con evidencia registrada**.

```mermaid
stateDiagram-v2
    [*] --> pendiente: /tasks la crea
    pendiente --> en_curso: /implement la toma
    en_curso --> en_curso: verificación en rojo → corregir
    en_curso --> hecha: implementada
    hecha --> verificada: evidencia registrada<br/>comando + resultado
    hecha --> hecha: sin evidencia<br/><i>se queda aquí</i>
    verificada --> pendiente: /amend la invalida<br/>pierde su evidencia
    verificada --> [*]: fase cerrada

    note right of hecha
        Una tarea sin evidencia
        nunca pasa a verificada.
        Constitution A.3
    end note
```

---

## 7. Ciclo de vida de un artefacto

Por qué existe `/amend`: un artefacto aprobado no se edita a mano.

```mermaid
stateDiagram-v2
    [*] --> borrador: comando lo genera
    borrador --> en_revision: /quality-gate
    en_revision --> borrador: CONDICIONAL o FAIL<br/>corregir hallazgos
    en_revision --> aprobado: PASS o umbral cumplido
    borrador --> aprobado: sin gate obligatorio<br/>aprobación humana
    aprobado --> amendado: /amend<br/>impacto + versión + ADR
    amendado --> aprobado: cambio aplicado
    aprobado --> obsoleto: proyecto descartado
    obsoleto --> [*]

    note right of amendado
        Orden obligatorio:
        spec → tareas → código.
        Nunca al revés.
    end note
```

---

## 8. Quality gate

Por qué la revisión es ciega y por qué hay suelo por dimensión.

```mermaid
flowchart TD
    ART["Artefacto<br/>prd · spec · plan"] --> QG["/quality-gate"]

    QG --> AGT["Agente quality-reviewer<br/><i>solo lectura</i>"]

    CONV["Conversación previa"] -.->|"BLOQUEADO"| AGT
    AUTO["Autoevaluación<br/>del autor"] -.->|"BLOQUEADO"| AGT
    PREV["Gates anteriores"] -.->|"BLOQUEADO"| AGT

    ART --> AGT
    RUB["Rúbrica + anclas<br/>3 / 5 / 7 / 9"] --> AGT
    CON["constitution.md"] --> AGT

    AGT --> SCORE["Nota por dimensión<br/>+ hallazgos con cita"]

    SCORE --> C1{"¿Media ≥<br/>umbral de etapa?"}
    C1 -->|no| FAIL["No avanza"]
    C1 -->|sí| C2{"¿Toda dimensión<br/>≥ su suelo?"}
    C2 -->|no| FAIL
    C2 -->|sí| C3{"¿Cobertura<br/>RC-XX = 100%?"}
    C3 -->|no| FAIL2["FAIL automático"]
    C3 -->|sí| PASS["Avanza"]

    FAIL --> CORR["Corregir lo aceptado<br/>documentar lo rechazado"]
    FAIL2 --> CORR
    CORR --> ART

    classDef block fill:#7f1d1d,stroke:#ef4444,color:#fff
    classDef ok fill:#065f46,stroke:#10b981,color:#fff
    class FAIL,FAIL2 block
    class PASS ok
```

**Umbrales (constitution C.14):** MVP media ≥6,5 y suelo 6,0 · Producto ≥7,0 y suelo 6,5 · cualquier etapa en X3 ≥7,5 y suelo 7,0.

---

## 9. Bucle de aprendizaje

Cómo cada proyecto deja al framework mejor que antes — incluidos los descartados.

```mermaid
flowchart LR
    PROY["Proyecto<br/>en ejecución"] --> GN["/go-nogo"]

    GN -->|"perseverar"| CICLO["Siguiente ciclo"]
    GN -->|"pivotar"| PRD2["/prd-lite<br/>nueva hipótesis"]
    GN -->|"descartar"| CIERRE["Cierre limpio"]

    CICLO --> PROY
    PRD2 --> PROY

    PROY --> EXTR{"¿Hay algo<br/>reutilizable?"}
    CIERRE --> EXTR

    EXTR -->|"tokens y componentes"| DS[("design-systems/")]
    EXTR -->|"capacidad transversal:<br/>auth · consentimiento<br/>borrado · upload"| MOD[("modules/")]
    EXTR -->|"lección generalizable"| CL[("CHANGELOG<br/>+ constitution")]

    DS --> NEXT["Siguiente proyecto<br/><i>empieza más arriba</i>"]
    MOD --> NEXT
    CL --> NEXT

    NEXT --> PROY

    MET["Métricas del framework:<br/>tiempo por fase · rondas de gate<br/>gate escapes"] -.-> CL

    classDef asset fill:#1e3a5f,stroke:#3b82f6,color:#fff
    class DS,MOD,CL asset
```

> Un proyecto descartado que deja un activo reutilizable no fue tiempo perdido. Es el motivo por el que el cierre de `/go-nogo` incluye extraer lo reutilizable **antes** de archivar.

---

## 10. Expansión de requisitos: los dos techos

Cómo `/expand` convierte una capacidad de una línea en requisitos implementables sin sobredisparar. Lo que impide la sobreingeniería no es el filtro del final: son los **dos techos que van antes del generador**.

```mermaid
flowchart TD
    CAP["Capacidad C-n<br/>del alcance v1"] --> ES["Event Storming ligero<br/>eventos · comandos<br/>políticas · agregados"]

    ES --> T1{"TECHO 1<br/>¿activa el eje<br/>esta lente?"}

    ET["Eje ETAPA<br/>gobierna definición"] -.-> T1
    EX["Eje EXPOSICIÓN<br/>gobierna cumplimiento"] -.-> T1

    T1 -->|no| CE1["Cerrada con razón<br/><i>declarada, no omitida</i>"]
    T1 -->|sí| T2{"TECHO 2<br/>¿tiene sujeto<br/>en esta capacidad?"}

    T2 -->|no| CE2["Cerrada con razón<br/><i>declarada, no omitida</i>"]
    T2 -->|sí| GEN["Generador<br/>6 plantillas EARS"]

    GEN --> DENS{"¿Densidad<br/>suficiente?"}
    DENS -->|"&lt;8 req · &lt;2 no deseada<br/>&lt;1 de estado"| REDO["Re-ejecutar L4 y L5<br/><i>prohibido rellenar</i>"]
    REDO --> GEN
    DENS -->|sí| CORTE["FILTRO<br/>clasificación + presupuesto B.7"]

    CORTE --> V1["v1 → spec"]
    CORTE --> V2["v2 → diferido<br/>con razón"]
    CORTE --> DESC["descartado<br/>con razón"]

    V1 --> HU["Historias de usuario<br/><i>solo ahora, nunca antes</i>"]
    HU --> AC["Cada AC cita su R-nn<br/><i>sin cita = defecto</i>"]

    classDef techo fill:#78350f,stroke:#f59e0b,color:#fff
    classDef cerrado fill:#1f2937,stroke:#4b5563,color:#fff
    classDef ok fill:#065f46,stroke:#10b981,color:#fff
    class T1,T2 techo
    class CE1,CE2 cerrado
    class V1,AC ok
```

**Por qué dos techos y no un filtro.** Un generador sin límite con un filtro detrás produce masa que hay que descartar, y el descarte es trabajo. El techo 1 decide qué lentes tienen sentido en este proyecto; el techo 2, si esa lente tiene sujeto en esta capacidad concreta. Solo lo que pasa ambos llega al generador, y solo entonces el corte arbitra lo que cabe en el presupuesto.

**Por qué el cierre se declara por escrito.** Una lente cerrada en silencio y una lente olvidada son indistinguibles al leer el artefacto. Con la razón escrita, el gate puede juzgar si el techo se aplicó bien; sin ella, el mecanismo entero deja de ser auditable. Es el mismo motivo por el que un ítem de checklist se marca `N/A` con razón en lugar de borrarse.

**Reparto de las siete lentes entre los dos ejes** (`modelo.md` §3.4):

| Gobierna ETAPA · el dominio | Gobierna EXPOSICIÓN · la obligación |
|-----------------------------|-------------------------------------|
| L1 ciclo de vida de la entidad | L2 permisos rol × estado |
| L3 validaciones y límites | L6 concurrencia |
| L4 modos de fallo | L7 auditoría y su mitad negativa |
| L5 fronteras y vacío | |

No es una convención del comando: es la aplicación directa de `modelo.md` §6 — *exposición gana a etapa en cumplimiento, etapa gana a exposición en definición*.
