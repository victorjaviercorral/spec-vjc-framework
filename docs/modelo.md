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
/spec-init → [/prd-lite] → [/specify +gate] → /prototype → [/plan → /tasks] → /implement → /go-nogo
                                                                                              │
                                          ┌───────────────────────────────────────────────────┘
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
| Spec técnica | — | — | ✅ núcleo | ✅ completa |
| Quality gate ciego | — | — | ✅ spec | ✅ PRD + spec |
| Prototipo HTML | 🟡 | ✅ | 🟡 si hay UI nueva | 🟡 por feature |
| Plan + tasks | — | 🟡 lista simple | ✅ | ✅ |
| ADRs | — | — | 🟡 decisiones estructurales | ✅ |
| Pieza de comunicación | — | — | ✅ por fase mayor | ✅ por fase mayor |

✅ obligatorio · 🟡 recomendado/condicional · — no aplica

**PRD-lite de una página (Prototipo):** solo secciones 1 (problema), 5 (hipótesis y asunción más arriesgada), 6 (alcance) y 7 (go/no-go). El resto se omite sin penalización.

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

## 4. Rutas típicas

**Herramienta personal** — Boceto · X0
`/spec-init` → construir → usar. Sin PRD, sin spec, sin gates. Única regla dura: secretos fuera del repo. El framework debe ser casi invisible aquí.

**Publicación o landing** — Prototipo/MVP · X1
`/spec-init` → `/prototype` → `/implement` → `/preflight` → publicar. Accesibilidad, performance, SEO y aviso de cookies si hay analítica. Sin PRD formal si el contenido ya está claro.

**Validación de una idea de producto** — Prototipo · X0/X1
`/spec-init` → `/prd-lite` (1 página) → `/prototype` → enseñarlo a 5 personas → `/go-nogo`. **Esta es la ruta que el framework debe hacer más rápida**: de idea a señal en una semana, con un descarte barato como desenlace perfectamente válido.

**MVP con usuarios reales** — MVP · X2
`/spec-init` → `/prd-lite` → `/specify` +gate → `/prototype` → `/plan` → `/tasks` → `/implement` → `/go-live` → `/preflight` → lanzar → `/go-nogo` a los 3 meses.

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
4. **Ningún comando puede endurecer los umbrales de C.14** ni añadir gates obligatorios fuera de C.15.
