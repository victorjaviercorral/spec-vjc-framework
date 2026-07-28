# Modelo de dos ejes y dos vías

Documento operativo del framework. Define qué se activa en cada situación. Es la referencia que consultan todos los comandos.

---

## 1. Los dos ejes

### Eje 1 — ETAPA · cuánta definición merece este trabajo

| Etapa | Qué es | Presupuesto por defecto | Definición máx. (20%) |
|-------|--------|:---:|:---:|
| **Boceto** | Explorar una idea o resolver algo puntual para ti. Desechable por diseño. | ≤ 1 día | ~1,5 h |
| **Prototipo** | Validar una propuesta concreta: ¿funciona el concepto, gusta el flujo? No es software mantenible. | ≤ 1 semana | ~1 día |
| **MVP** | Producto real y mínimo puesto delante de alguien para obtener señal de mercado. | ≤ 4 semanas | ~4 días |
| **Producto** | Se mantiene, evoluciona y se opera. Hay compromiso con quien lo usa. | ciclos ≤ 4 semanas | ~4 días/ciclo |

La etapa se declara en `/spec-init` y se cambia solo por decisión explícita (constitution B.10). El presupuesto es de calendario, no de esfuerzo; se puede sobrescribir al declararlo, no a posteriori.

### Eje 2 — EXPOSICIÓN · a qué te expones

| Nivel | Situación | Señales típicas |
|-------|-----------|-----------------|
| **X0 · Privado** | Solo tú, o una máquina tuya. Sin terceros. | script local, herramienta personal, boceto sin desplegar |
| **X1 · Público sin cuentas** | Cualquiera puede verlo; nadie deja datos personales. | landing, documentación, demo pública, blog |
| **X2 · Usuarios con datos personales** | Hay cuentas, contenido subido, correo, analítica identificable. | app con registro, formulario de contacto, subida de fotos |
| **X3 · Alto riesgo** | Dinero, menores, datos de categoría especial (art. 9 GDPR), o IA de cara al usuario. | pagos, salud, servicio que puede atraer a menores, chatbot |

X3 **acumula** X2, que acumula X1. El nivel se re-evalúa obligatoriamente en `/go-live`, porque el paso a usuarios reales casi siempre lo sube.

---

## 2. Las dos vías

```
VÍA NÚCLEO  (siempre)
/spec-init → [/prd-lite] → [/expand] → [/specify +gate] → /prototype → [/plan → /tasks] → /implement → /go-nogo
                                                                                                        │
                                          ┌─────────────────────────────────────────────────────────────┘
                                          │  decisión: perseverar y llevarlo a usuarios reales
                                          ▼
VÍA PRODUCCIÓN  (se activa con /go-live)
/go-live  →  endurecimiento por exposición  →  /preflight  →  GO LIVE  →  /go-nogo (revisión de métricas)
```

**Vía Núcleo** existe para llegar rápido a una decisión informada: construir lo justo, ponerlo delante de alguien y decidir si merece continuar. Todo lo que no sirva a eso, sobra.

**Vía Producción** existe para que ese trabajo aguante usuarios reales: cumplimiento legal, endurecimiento técnico, operación y verificación de lanzamiento. Se ejecuta **una vez** al productivizar y se revisa en cada subida de exposición.

Un proyecto puede vivir para siempre en la Vía Núcleo (herramientas personales) o cruzar a Producción el primer día (si nace en X2 con compromiso de producto). Ambas cosas son normales.

---

## 3. Matriz de activación

### 3.1 Qué artefactos exige la ETAPA

| Artefacto | Boceto | Prototipo | MVP | Producto |
|-----------|:---:|:---:|:---:|:---:|
| `project.md` (etapa, exposición, presupuesto, entorno) | ✅ | ✅ | ✅ | ✅ |
| `design-identity.md` | — | ✅ | ✅ | ✅ |
| PRD-lite | — | 🟡 1 página | ✅ completo | ✅ completo |
| PRD §2b negocio y §5b riesgos | — | — | ✅ | ✅ |
| `requirements.md` (`/expand`) | — | — | ✅ | ✅ |
| Spec técnica | — | — | ✅ núcleo | ✅ completa |
| Quality gate ciego | — | — | ✅ spec | ✅ PRD + spec |
| Prototipo HTML | 🟡 | ✅ | 🟡 si hay UI nueva | 🟡 por feature |
| Plan + tasks | — | 🟡 lista simple | ✅ | ✅ |
| ADRs | — | — | 🟡 decisiones estructurales | ✅ |
| Pieza de comunicación | — | — | ✅ por fase mayor | ✅ por fase mayor |

✅ obligatorio · 🟡 recomendado/condicional · — no aplica

**PRD-lite de una página (Prototipo):** solo secciones 1 (problema), 5 (hipótesis y asunción más arriesgada), 6 (alcance) y 7 (go/no-go). El resto se omite sin penalización.

**`requirements.md` (MVP+):** expansión de cada capacidad del alcance v1 en requisitos EARS, producida por `/expand`. En Boceto y Prototipo **no aplica**: sin spec que la consuma sería un artefacto que no cambia ninguna decisión (constitution B.5). Qué lentes se activan, en §3.4.

**Secciones de negocio del PRD (MVP+):** §2b propuesta de valor, modelo de negocio, monetización y economía unitaria · §5b riesgos del proyecto. En Boceto y Prototipo **no aplican** salvo petición explícita: a esa altura el modelo de negocio es especulación sobre un producto que aún no existe. La §2b se produce siempre en MVP+, pero **se reduce a una línea** cuando el campo `sostenibilidad` de `project.md` vale `ninguna` — declarar por qué está bien no ganar dinero es obligatorio; desarrollarlo, no.

`sostenibilidad` (`ninguna` · `cubrir costes` · `ingresos`) es un **campo declarado, no un tercer eje**: no activa disciplinas ni cambia el pipeline, solo la profundidad de una sección. Se deduce de la pregunta de dinero del triaje, sin coste adicional de preguntas. Si el modelo implica cobro directo, la exposición sube a X3 y se activa el módulo de pagos (§3.3).

**Spec núcleo (MVP):** secciones 1-5 y 11-12 de la plantilla (arquitectura, trazabilidad, datos, contratos, seguridad/privacidad, flujos, fuera de alcance). Las secciones 6-10 se activan por exposición, no por etapa.

### 3.2 Qué disciplinas exige la EXPOSICIÓN

| Disciplina | X0 | X1 | X2 | X3 |
|------------|:---:|:---:|:---:|:---:|
| Secretos fuera del repo | ✅ | ✅ | ✅ | ✅ |
| `checklists/seguridad-agentica.md` | ✅ | ✅ | ✅ | ✅ |
| `checklists/seguridad.md` | 🟡 básico | ✅ | ✅ | ✅ +revisión humana de diffs sensibles |
| `checklists/performance.md` | — | ✅ | ✅ | ✅ |
| `checklists/accesibilidad.md` | — | ✅ | ✅ | ✅ |
| `checklists/contenido-seo.md` | — | ✅ | ✅ | ✅ |
| `checklists/privacidad-gdpr.md` | — | 🟡 solo cookies/analítica | ✅ | ✅ + DPIA si procede |
| `checklists/testing.md` | — | 🟡 | ✅ RC-XX con test automático | ✅ + rutas críticas |
| `checklists/operacion.md` | — | ✅ mínimo | ✅ | ✅ + reversibilidad probada |
| Textos legales publicados | — | 🟡 aviso de cookies si hay analítica | ✅ privacidad + cookies + términos | ✅ + los del módulo |
| `/preflight` obligatorio | — | ✅ | ✅ | ✅ |
| Módulos de cumplimiento específicos | — | — | — | ✅ |

### 3.3 Módulos de cumplimiento específicos (solo X3)

Se activan por señal detectada en el triaje:

| Señal | Módulo | Núcleo de la obligación |
|-------|--------|------------------------|
| Cobros o pagos | **Pagos** | Delegar en proveedor certificado (nunca tocar datos de tarjeta), SCA/PSD2, política de reembolso, facturación |
| Puede atraer a menores | **Menores** | Verificación de edad proporcionada, consentimiento parental (art. 8 GDPR; 14 años en España), sin perfilado publicitario |
| IA de cara al usuario | **IA** | Transparencia (el usuario sabe que interactúa con IA), marcado de contenido generado, clasificación de riesgo AI Act, supervisión humana donde decida sobre personas |
| Datos de salud, biometría, ideología, orientación | **Categoría especial** | Base legal reforzada (art. 9), DPIA obligatoria, cifrado en reposo, acceso mínimo auditado |

---

## 3.4 Qué lentes de descomposición activa `/expand`

`/expand` convierte cada capacidad del alcance v1 del PRD en requisitos EARS aplicándole **lentes de descomposición**. Una lente que no se activa no genera nada: es lo que evita que un producto sin ciclo de vida rico reciba el tratamiento de uno que sí lo tiene.

La aplicabilidad se decide con **dos techos encadenados**, y ambos son necesarios.

### Techo 1 — el eje que gobierna cada lente

El reparto aplica §6 de este documento: **etapa gobierna la definición, exposición gobierna el cumplimiento**. Las lentes que describen cómo funciona el dominio son definición; las que describen qué le debes a un tercero son cumplimiento.

**Lentes de dominio — gobierna ETAPA**

| Lente | Boceto | Prototipo | MVP | Producto |
|-------|:---:|:---:|---|---|
| **L1** Ciclo de vida de la entidad | — | — | ✅ estados y transiciones | ✅ + diagrama de estados e invariantes |
| **L3** Validaciones y límites | — | — | ✅ | ✅ |
| **L4** Modos de fallo | — | — | ✅ | ✅ + compensación e idempotencia |
| **L5** Fronteras y vacío | — | — | ✅ | ✅ |

**Lentes de obligación — gobierna EXPOSICIÓN**

| Lente | X0 | X1 | X2 | X3 |
|-------|:---:|---|:---:|---|
| **L2** Permisos rol × estado | — | — | ✅ | ✅ + denegación por defecto explícita |
| **L6** Concurrencia | — | 🟡 solo si hay escritura anónima | ✅ | ✅ |
| **L7** Auditoría y su mitad negativa | — | 🟡 solo la mitad negativa | ✅ | ✅ + retención por tipo de registro |

En X0 no hay segundo actor ni tercero al que rendir cuentas: L2, L6 y L7 no aplican por construcción, no por ahorro. En X1 la mitad negativa de L7 (qué **no** debe registrarse) sí aplica, porque hay analítica aunque no haya cuentas — es el mismo recorte parcial que hace `checklists/privacidad-gdpr.md` en X1.

### Techo 2 — el disparador por capacidad

Una lente activa por eje **no se aplica a todas las capacidades**. Cada una tiene una precondición que se lee de la capacidad concreta:

| Lente | Se aplica a una capacidad solo si… |
|-------|-----------------------------------|
| L1 | crea o transiciona una entidad persistente |
| L2 | su entidad tiene ≥2 estados **o** el proyecto tiene ≥2 roles |
| L3 | acepta input de una persona |
| L4 | toca ≥1 dependencia externa **o** ≥2 recursos |
| L5 | muestra o acepta una colección, un número, una fecha o texto libre |
| L6 | ≥2 actores pueden escribir el mismo recurso |
| L7 | escribe o borra datos de una persona |

Una lente activa cuyo disparador no se cumple **se cierra por escrito en una línea con su razón**, igual que un ítem de checklist se marca `N/A` con razón. No se omite en silencio: sin la declaración escrita no hay forma de auditar si el techo se aplicó o se olvidó.

### Después del generador: el corte

La masa generada no entra entera en la spec. Se clasifica en **v1 · v2 · descartado** con este orden de decisión:

1. ¿Su ausencia produce pérdida de datos, brecha de permisos o incumplimiento legal? → **v1, no negociable.** No compite por presupuesto (§6.1: exposición gana a etapa).
2. ¿Sirve a una capacidad `must` del PRD §6? → candidato fuerte a v1.
3. ¿Sirve solo a una `should`? → compite por el presupuesto de la etapa.
4. Resto → v2 por defecto, registrado con su razón.

El presupuesto que arbitra el paso 3 es el de la etapa (constitution B.7): cuando no cabe, **se recorta alcance**. No existe un presupuesto propio de `/expand`; duplicarlo serían dos fuentes de verdad para el mismo número.

---

## 4. Rutas típicas

**Herramienta personal** — Boceto · X0
`/spec-init` → construir → usar. Sin PRD, sin spec, sin gates. Única regla dura: secretos fuera del repo. El framework debe ser casi invisible aquí.

**Publicación o landing** — Prototipo/MVP · X1
`/spec-init` → `/prototype` → `/implement` → `/preflight` → publicar. Accesibilidad, performance, SEO y aviso de cookies si hay analítica. Sin PRD formal si el contenido ya está claro.

**Validación de una idea de producto** — Prototipo · X0/X1
`/spec-init` → `/prd-lite` (1 página) → `/prototype` → enseñarlo a 5 personas → `/go-nogo`. **Esta es la ruta que el framework debe hacer más rápida**: de idea a señal en una semana, con un descarte barato como desenlace perfectamente válido.

**MVP con usuarios reales** — MVP · X2
`/spec-init` → `/prd-lite` → `/expand` → `/specify` +gate → `/prototype` → `/plan` → `/tasks` → `/implement` → `/go-live` → `/preflight` → lanzar → `/go-nogo` a los 3 meses.

**Producto que crece** — Producto · X2/X3
Ciclos de ≤ 4 semanas. Cada cambio de requisito por `/amend`. `/sync-check` periódico. Nueva exposición ⇒ repetir `/go-live`.

---

## 5. Transiciones

| Transición | Comando | Qué obliga |
|------------|---------|-----------|
| Subir de etapa | `/spec-init --etapa <nueva>` | Nuevo presupuesto, re-triaje de exposición, y crear los artefactos que la nueva etapa exige (retroactivamente si faltan) |
| Subir de exposición | `/go-live` | Re-triaje completo, activación de checklists y módulos, plan de endurecimiento |
| Cambiar un requisito | `/amend` | Impacto sobre requisitos, tareas y código + ADR |
| Cerrar el experimento | `/go-nogo` | Decisión: perseverar / pivotar / descartar |

**Regla de no retroceso silencioso:** bajar de exposición (por ejemplo, retirar el registro de usuarios) exige borrar o anonimizar los datos personales ya recogidos y documentarlo. No basta con dejar de usarlos.

---

## 6. Cómo se resuelven los conflictos

1. **Exposición gana a etapa en cumplimiento.** Un Boceto en X2 aplica la checklist de privacidad completa aunque no tenga PRD ni spec. Si eso resulta caro, la respuesta correcta suele ser bajar a X0 (no desplegarlo, o no pedir datos), no saltarse la checklist.
2. **Etapa gana a exposición en definición.** Un Producto en X0 no necesita textos legales, pero sí spec, ADRs y gates.
3. **Ante duda de si aplicar un control, manda el bloque B de la constitution** (proporcionalidad): si el control no cambia una decisión ni reduce un riesgo real, no se aplica.
4. **Ningún comando puede endurecer los umbrales de C.14** ni añadir gates obligatorios fuera de C.15, ni ampliar el presupuesto de preguntas de B.6-bis.

Las reglas 1 y 2 son las que reparten las lentes de `/expand` entre los dos ejes (§3.4). No es una convención del comando: es la aplicación directa de este apartado.
