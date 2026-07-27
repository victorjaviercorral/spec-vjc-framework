# Guía del eje EXPOSICIÓN — Vía Producción

**Qué gobierna este eje:** qué disciplinas de seguridad, cumplimiento legal y operación son obligatorias.
**Pregunta que responde:** *¿a qué y a quién te expones?*

Este eje es **independiente de la [Etapa](guia-etapa.md)**. No mide lo ambicioso que es el proyecto, sino el daño posible: a los usuarios, a sus datos, a su dinero, a ti.

> **La consecuencia práctica de la independencia:** un boceto de un día que recoge emails aplica la checklist de privacidad completa aunque no tenga PRD ni spec. Y un producto grande que solo usas tú no necesita banner de cookies. Confundir los ejes es la causa habitual de que un framework aplique rigor donde no toca y exima donde sí toca.

---

## 1. Los cuatro niveles

| | **X0 · Privado** | **X1 · Público sin cuentas** | **X2 · Usuarios con datos** | **X3 · Alto riesgo** |
|---|---|---|---|---|
| **Situación** | Solo tú o una máquina tuya | Cualquiera lo ve; nadie deja datos | Hay cuentas, contenido, correo | Dinero, menores, datos sensibles o IA |
| **Ejemplos** | script local, herramienta personal | landing, documentación, demo | app con registro, formulario, subida de fotos | pagos, salud, chatbot |
| **Daño posible si falla** | Tuyo y reversible | Reputacional | Datos de terceros, sanción | Económico, legal, sobre personas vulnerables |
| **`/preflight`** | No aplica | Obligatorio | Obligatorio | Obligatorio |

**Los niveles acumulan:** X3 incluye todo lo de X2, que incluye todo lo de X1.

### Las cinco preguntas del triaje

1. ¿Lo va a ver alguien más que tú? ¿Se despliega en internet? → **X1**
2. ¿Alguien dejará datos personales: cuenta, email, contenido subido, analítica identificable? → **X2**
3. ¿Hay dinero de por medio? → **X3**
4. ¿Datos de salud, biometría, ideología, religión u orientación? ¿Puede atraer a menores? → **X3**
5. ¿Hay IA con la que interactúe el usuario final? → **X3**

**Ante la duda, sube.** Clasificar de más te cuesta trabajo; clasificar de menos te expone a ti y a terceros.

**Trampas frecuentes de clasificación:**
- *"Solo pido el email para la lista de espera"* → es X2. Un email es un dato personal.
- *"La analítica es anónima"* → depende de la herramienta. Si usa cookies o identificadores persistentes, es X2.
- *"Es una demo, no cuenta"* → si está en internet con datos reales de alguien, cuenta.
- *"Los metadatos de las fotos no los pido yo"* → EXIF y GPS son datos personales aunque el usuario no los teclee.

---

## 2. Qué activa cada nivel

| Disciplina | X0 | X1 | X2 | X3 |
|------------|:---:|:---:|:---:|:---:|
| Secretos fuera del repo | ✅ | ✅ | ✅ | ✅ |
| `seguridad-agentica.md` | ✅ | ✅ | ✅ | ✅ |
| `seguridad.md` | 🟡 básico | ✅ | ✅ | ✅ + revisión humana de diffs sensibles |
| `performance.md` | — | ✅ | ✅ | ✅ |
| `accesibilidad.md` | — | ✅ | ✅ | ✅ |
| `contenido-seo.md` | — | ✅ | ✅ | ✅ |
| `privacidad-gdpr.md` | — | 🟡 cookies y analítica | ✅ | ✅ + DPIA si procede |
| `testing.md` | — | 🟡 | ✅ RC con test automático | ✅ + rutas críticas |
| `operacion.md` | — | ✅ mínimo | ✅ | ✅ + reversibilidad probada |
| Textos legales publicados | — | 🟡 aviso de cookies | ✅ privacidad + cookies + términos | ✅ + los del módulo |
| `/preflight` | — | ✅ | ✅ | ✅ |
| Módulo de cumplimiento | — | — | — | ✅ |

### Módulos específicos de X3

| Señal | Módulo | Núcleo de la obligación |
|-------|--------|------------------------|
| Cobros o pagos | **Pagos** | Delegar en proveedor certificado (nunca tocar datos de tarjeta), SCA/PSD2, política de reembolso, facturación |
| Puede atraer a menores | **Menores** | Verificación de edad proporcionada, consentimiento parental (art. 8 GDPR, 14 años en España), sin perfilado publicitario |
| IA de cara al usuario | **IA** | Transparencia (el usuario sabe que interactúa con IA), marcado de contenido generado, clasificación de riesgo AI Act, supervisión humana donde decida sobre personas |
| Salud, biometría, ideología, orientación | **Categoría especial** | Base legal reforzada (art. 9), DPIA obligatoria, cifrado en reposo, acceso mínimo auditado |

---

## 3. La transición: `/go-live`

Es el comando que cruza de la Vía Núcleo a la Vía Producción. **No lanza nada**: produce el trabajo pendiente para poder lanzar.

```
/go-live  →  endurecimiento  →  /preflight  →  GO LIVE
```

### Paso 1 — Re-triaje obligatorio

El paso a usuarios reales casi siempre sube el nivel. `/go-live` vuelve a hacer las cinco preguntas sin dar por buena la clasificación anterior, y añade una: **¿en qué jurisdicciones estarán los usuarios?** Si hay UE, GDPR y accesibilidad son obligatorios.

Declara el salto explícitamente: *"pasas de X1 a X2: se activan privacidad, testing de requisitos críticos y textos legales"*.

### Paso 2 — El diferencial

Genera `docs/09-lanzamiento/endurecimiento.md` con **solo lo que falta**, no con la lista completa. Por cada hueco: qué falta, por qué (checklist e ítem), esfuerzo estimado y si bloquea el lanzamiento.

Agrupado en seis bloques: legal y datos · seguridad · accesibilidad · operación · contenido · medición.

### Paso 3 — La decisión de coste

Aquí está el valor real del comando. Suma el esfuerzo del endurecimiento, lo contrasta con tu presupuesto y te presenta **tres salidas**:

1. **Adelante** con el endurecimiento completo.
2. **Reducir exposición** — por ejemplo, quitar el registro de usuarios y quedarse en X1: menos obligaciones, menos superficie, lanzas antes.
3. **Aplazar** el lanzamiento público.

> La opción 2 es legítima y a menudo la más inteligente. Si el cumplimiento de X2 se come tu presupuesto, la respuesta correcta suele ser **no recoger esos datos**, no saltarse la checklist.

---

## 4. El control final: `/preflight`

Último control antes de que exista para el mundo. **Verifica ejecutando contra el despliegue real**, nunca contra local y nunca por inspección de código: comprueba lo que hay publicado, no lo que debería haberse publicado.

Ocho bloques: seguridad · privacidad y legal · accesibilidad · performance · operación · contenido · medición · módulo específico.

Cada ítem se resuelve como `OK` **con la evidencia obtenida**, `FALLO` con lo observado, o `N/A` con razón. Prohibido `OK` sin evidencia ejecutada.

### Veredicto

- **GO** — sin fallos, o solo menores ya corregidos durante el propio preflight.
- **GO CON EXCEPCIONES** — fallos no bloqueantes, cada uno con riesgo aceptado, responsable y fecha, y **aceptación escrita** en el documento.
- **NO-GO** — hay al menos un bloqueante.

### Bloqueantes absolutos

Estos no admiten excepción:

- Secreto expuesto.
- Dato personal accesible por quien no debe.
- Incumplimiento de accesibilidad de **nivel A**.
- Ausencia de texto legal obligatorio en X2+.
- Scripts no esenciales cargando antes del consentimiento.
- Copia de seguridad sin restaurar en X2+.

> El valor entero de `/preflight` está en ser el único punto del framework que dice *"esto todavía no sale"*. Un NO-GO suavizado convierte el comando en decoración.

---

## 5. Lo mínimo por nivel, en concreto

### X1 — público sin cuentas

Lo que más se olvida y más se nota:
- **Accesibilidad**: contraste real (no solo el de la paleta), navegación completa con teclado, foco visible.
- **Performance sobre el despliegue real**: el local miente sistemáticamente a favor.
- **Metadatos y Open Graph**: determinan cómo se ve cada vez que alguien comparte el enlace.
- **`robots.txt` y `sitemap` coherentes**: verifica que no quedó un `noindex` de desarrollo, ni lo contrario.
- **Aviso de cookies** si usas analítica.

### X2 — usuarios con datos personales

El salto real de obligaciones. Lo imprescindible:

- **Mapa de datos personales** en la spec: dato → finalidad → base legal → retención → ubicación → encargado. Lo que no esté en el mapa, no se recoge.
- **Borrado que borra de verdad**: cuenta, contenido, almacenamiento de objetos, caché, CDN y menciones en logs. Se **prueba de extremo a extremo** una vez antes de lanzar.
- **Consentimiento retirable tan fácil como se dio.** Si se da con un clic y solo se retira por email, es un incumplimiento.
- **Nada no esencial antes del opt-in.** Se verifica mirando las peticiones de red en carga limpia, no leyendo el código.
- **Registro de encargados** con DPA aceptado y región de datos. Preferir región UE cuando exista la opción.
- **Sin datos personales en logs, trazas ni prompts a modelos de IA.**
- **Copia de seguridad restaurada al menos una vez.** Una copia nunca restaurada es una hipótesis, no un respaldo.
- **Todo `RC-XX` con test automatizado.** Un requisito crítico verificado a mano se deja de verificar a la tercera vez que alguien tiene prisa.
- **Procedimiento de brecha escrito**: detectar, evaluar, notificar en ≤72h cuando proceda. Media página basta; no tenerla es el problema.

### X3 — alto riesgo

Todo lo anterior más el módulo correspondiente, DPIA cuando proceda, y revisión humana obligatoria de los diffs generados por agente en rutas sensibles.

> En X3 conviene validación legal profesional antes del lanzamiento. Las checklists del framework son diligencia técnica, no asesoramiento jurídico.

---

## 6. Después del lanzamiento

**`/go-nogo`** en la fecha de revisión escrita en `project.md`. Métricas reales contra targets y una decisión de cuatro: perseverar, pivotar, descartar o extender el plazo.

Si una métrica no se instrumentó, no se estima: se marca `[SIN DATO]` y se registra como fallo de proceso. Es exactamente lo que el plan de medición de la spec existe para evitar.

**Si se descarta habiendo tenido usuarios reales**, el cierre tiene una parte no negociable: avisar con antelación razonable, ofrecer exportación del contenido, y **borrar los datos personales de verdad, documentándolo**. Aunque el proyecto muera.

**Bajar de exposición** (retirar el registro, por ejemplo) exige lo mismo: borrar o anonimizar lo ya recogido. No basta con dejar de usarlo.

---

## 7. Referencia rápida

| Comando | Nivel mínimo | Qué hace |
|---------|:---:|----------|
| `/go-live` | X1 | Re-triaje + diferencial de endurecimiento + decisión de coste |
| `/preflight` | X1 | Verificación contra despliegue real → GO / NO-GO |
| `/go-nogo` | cualquiera | Cierre del experimento con decisión explícita |
| `/sync-check` | X2 | Detecta exposición real mayor que la declarada |

| Checklist | Ítems | Activación |
|-----------|:---:|:---:|
| `seguridad.md` | 20 | X0 parcial · X1+ completa |
| `seguridad-agentica.md` | 14 | siempre |
| `accesibilidad.md` | 23 | X1+ |
| `performance.md` | 14 | X1+ |
| `contenido-seo.md` | 17 | X1+ |
| `operacion.md` | 18 | X1 mínimo · X2+ completa |
| `privacidad-gdpr.md` | 20 | X1 parcial · X2+ completa |
| `testing.md` | 13 | X2+ |

**Anterior:** [guía del eje Etapa](guia-etapa.md) · **Diagramas:** [flujos y relaciones](diagramas.md)
