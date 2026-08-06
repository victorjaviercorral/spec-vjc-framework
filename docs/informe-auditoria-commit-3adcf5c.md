---
tipo: auditoria
fecha: 2026-08-06
autor: Claude (sesión dedicada, a petición de Víctor Javier Corral)
estado: para acción
relacionado: docs/informe-auditoria-2026-08-06.md, docs/informe-verificacion-2026-08-06.md
commit_auditado: 3adcf5c4c2f0388d07276df262ec13e5bd60f180 (repo victorcorral)
---

# Informe de auditoría — commit `3adcf5c` (repo `victorcorral`)

**Commit:** `3adcf5c4c2f0388d07276df262ec13e5bd60f180` — *"feat: migrate playbook to native React components and redesign architecture to vertical layout"*

**Qué es este documento:** auditoría del commit que reemplaza la arquitectura split-screen anterior (la que arrastraba el bug de scroll de `H-07`) por un layout vertical de una sola columna, más un nuevo modal "Playbook" a pantalla completa. Es la tercera pasada sobre esta pieza — ver [informe de auditoría original](informe-auditoria-2026-08-06.md) y [su verificación](informe-verificacion-2026-08-06.md) para el hilo completo.

**Método:** lectura del diff completo del commit (`git show --stat` + diffs por archivo), grep dirigido sobre el código nuevo, y verificación en vivo — `npm run build` real, servido por HTTP, con inspección de DOM/CSS computado y clics reales sobre el modal Playbook. Nada de lo que sigue se da por bueno solo por leerlo.

**Resultado en una frase:** el cambio de arquitectura **sí resuelve genuinamente** el bug de scroll (`H-07`) y el efecto colateral del selector de tema (`H-02`/`N-01`), pero el propio commit introduce **3 problemas nuevos y concretos**: dependencias y archivos de depuración comiteados por error, la tipografía de marca rota en toda la página (usa la fuente por defecto del sitio, no la definida en `design-identity.md`), y una incoherencia de marca reproducible en vivo — la página dice "Human-AI Copilot Framework" pero el modal Playbook dice "Spec VJC Framework" tres veces.

---

## Tabla resumen

| # | Elemento | Veredicto | Severidad |
|---|---|:---:|:---:|
| R-01 | H-07 (scroll roto en desktop) | ✅ Resuelto — arquitectura rediseñada, ya no hay panel sticky que romper | — |
| R-02 | H-02 / N-01 (selector de tema con efecto colateral) | ✅ Resuelto — el botón ya no se renderiza en esta ruta | — |
| R-03 | N-02 (enlaces de nav muertos) | ✅ Resuelto — ahora enlazan a `/#seccion` en vez de `#seccion` | — |
| R-04 | N-04 (sin título/meta propios) | ✅ Resuelto — `document.title` y meta description dinámicos | — |
| C-01 | Dependencia y archivos de depuración comiteados | ❌ Nuevo | 🔴 Crítico |
| C-02 | Tipografía de marca rota (fuentes `fw-*` sin definir) | ❌ Nuevo | 🔴 Crítico |
| C-03 | Incoherencia de marca: "Spec VJC" vs "Human-AI Copilot" | ❌ Nuevo | 🟠 Alto |
| C-04 | `spec.md` (framework repo) describe una arquitectura que ya no existe | ⚠️ Empeorado | 🟡 Medio |

---

## Lo que este commit resuelve de verdad

### ✅ H-07 — El bug de scroll de escritorio ya no puede ocurrir

No se depuró el CSS del layout anterior — se eliminó el patrón que lo causaba. `ProductFramework.tsx` pasó de un `<main class="flex md:flex-row ...">` con dos paneles (uno `overflow-y-auto`, otro `sticky`) a una sola columna (`<main class="flex-1 w-full pt-32 pb-32 px-6">`) sin paneles fijos ni `IntersectionObserver`. `VisualizerPane.tsx` fue eliminado; cada sección de `NarrativePane.tsx` ahora muestra su narrativa y su tarjeta ilustrativa **una junto a otra en el mismo flujo del documento** (`flex-col lg:flex-row`), no en paneles independientes. Sin panel sticky, no hay nada que el scroll de página pueda romper. Verificado que compila y sirve sin errores.

### ✅ H-02 / N-01 — El selector de tema ya no tiene efecto colateral

`NavBar.tsx` ahora envuelve el botón de tema en `{location.pathname !== '/product-framework' && (...)}` — en esta ruta, el botón **no se renderiza**. Confirmado en vivo: `document.querySelector('[aria-label="Toggle theme"]')` devuelve `null` en `/product-framework`. La página sigue forzando modo oscuro (`<html class="dark">`, confirmado) sin que haya ningún control visible que prometa algo que no cumple.

### ✅ N-02 — Los enlaces de navegación heredados ya no son enlaces muertos

El cálculo `const actualHref = link.isRoute ? link.href : (location.pathname === '/' ? link.href : \`/${link.href}\`)` hace que, fuera de la home, "About"/"Impact"/"Timeline"/etc. enlacen a `/#about` (vuelve a la home y salta a la sección) en vez de a `#about` (que en cualquier ruta que no sea `/` no hace nada). Arreglo correcto y de una línea.

### ✅ N-04 — Título y metadescripción propios

`ProductFramework.tsx` ahora fija `document.title` y una `<meta name="description">` específicos al montar. Confirmado en vivo: la pestaña del navegador muestra "Human-AI Copilot Framework | Victor Corral" en vez del título por defecto del sitio.

---

## Lo que este commit rompe o introduce

### 🔴 C-01 — Dependencia y archivos de depuración comiteados al repo

El diff incluye, sin relación con la funcionalidad del sitio:

- **`package.json`**: `"puppeteer": "^25.5.0"` añadido al bloque `dependencies` (no `devDependencies`). Puppeteer empaqueta un binario de Chromium completo — del orden de **cientos de MB** — y no lo usa ningún archivo dentro de `src/`. Infla `npm install` y el árbol de dependencias de producción sin ninguna razón de negocio.
- **`inspect.js`** (comiteado en la raíz del repo): script que lanza Puppeteer contra `http://localhost:8080/product-framework` y hace `document.getElementById('narrative-scroll-container')` / `visualizer-container` — los IDs de la arquitectura **anterior**, la que este mismo commit elimina. Es decir: además de ser un script de depuración que nunca debió comitearse, ya está describiendo una página que ya no existe.
- **`dom_dump.html`**: volcado de HTML generado por ese script, con el mismo problema — es un snapshot del layout viejo, doblemente obsoleto.
- **`screenshot.png`, `screenshot_fixed.png`, `screenshot_fixed2.png`, `screenshot_step4.png`**: capturas de pantalla de sesiones de depuración local, ~130 KB cada una, sin ninguna función en el sitio.

Ninguno de estos siete archivos/dependencia tiene una razón para estar en el repositorio del sitio en producción. No hay riesgo de exposición de datos sensibles (son solo HTML/CSS de la propia página y capturas de la propia UI), pero sí es peso muerto y una dependencia de producción injustificada.

**Acción:** `git rm inspect.js dom_dump.html screenshot*.png`, quitar `puppeteer` de `package.json` (o moverlo a `devDependencies` si de verdad se va a seguir usando como herramienta de desarrollo, nunca en `dependencies`), y añadir un patrón al `.gitignore` (`screenshot*.png`, `dom_dump.html`, `inspect.js` o una carpeta `scratch/` dedicada) para que no vuelva a pasar.

### 🔴 C-02 — La tipografía de marca no se está aplicando en ningún sitio

`design-identity.md` (`docs/03-diseno/`, ver más abajo) especifica Plus Jakarta Sans para titulares y JetBrains Mono para código/datos. El código usa clases `font-fw-headline`, `font-fw-body`, `font-fw-code`, `font-fw-label` (ya presentes desde el commit anterior) y ahora también `font-fw-title` (nuevo, usado **11 veces** solo en `playbookSlides.tsx`).

Ninguna de las cinco existe en `tailwind.config.ts` — verificado por búsqueda de texto sobre el archivo completo, cero coincidencias con `fontFamily`. Confirmado además en vivo, con el navegador ya renderizando la página real:

```
h1 (title="Human-AI Copilot Framework"):
  font-family computado → "Inter, sans-serif"   ← la fuente global del sitio, no la de marca

code:
  font-family computado → "ui-monospace, SFMono-Regular, Menlo, Monaco, ..."  ← pila del sistema, no "JetBrains Mono"
```

Este mismo commit añade dos `@import` nuevos a `src/index.css` (`Plus Jakarta Sans`, `JetBrains Mono`) — las fuentes se descargan del CDN de Google Fonts, pero **no están enlazadas a ninguna clase de Tailwind que las use**, así que el navegador las descarga y no las aplica en ningún elemento. Es la definición exacta de trabajo desperdiciado: coste de red sin beneficio visual.

**Acción:** añadir el bloque `fontFamily` que falta en `tailwind.config.ts` (`fw-headline`, `fw-body`, `fw-code`, `fw-label`, `fw-title` → los stacks de fuente reales) y volver a verificar visualmente que el texto cambia.

### 🟠 C-03 — Incoherencia de marca reproducida en vivo

`src/data/playbookSlides.tsx` usa **"Spec VJC Framework"** tres veces:

- Línea 14 — `<h1>`, título de la primera diapositiva del Playbook.
- Línea 57 — `"La Solución / Spec VJC"`, encabezado de la comparativa Espejismo vs Solución.
- Línea 233 — `"El Spec VJC Framework es open-source..."`, párrafo de la diapositiva final de cierre (CTA a GitHub).

Mientras tanto, la propia página que abre este modal usa consistentemente **"Human-AI Copilot Framework"**: el `<h1>` de la sección de introducción, el `<title>` del documento, la metadescripción, y el nuevo enlace "Framework" del nav.

Confirmado en el navegador real, con el modal abierto: `document.body.innerText.includes('Spec VJC Framework')` → `true`. No es una inconsistencia teórica de código sin usar — un visitante que hace clic en "Ver el Playbook" ve literalmente los dos nombres del mismo producto en la misma sesión de scroll, algo que este mismo proyecto ya corrigió una vez en el `README.md` del framework (ver informe de auditoría original, Bloque B) y que aquí ha vuelto a aparecer en un archivo nuevo.

**Acción:** sustituir las tres apariciones de "Spec VJC Framework"/"Spec VJC" por "Human-AI Copilot Framework" en `playbookSlides.tsx`.

### 🟡 C-04 — La spec del framework ahora describe un sistema que no existe en absoluto

Ya se había señalado en el informe de verificación anterior que `docs/02-spec/spec.md` (repo del framework) no se había actualizado tras la primera migración a React. Este commit lo agrava: la sección 1 (arquitectura), la tabla de trazabilidad (R-01 a R-05) y el requisito de accesibilidad A11Y-03 sobre `aria-live` en `#visualizer-container` describen el sistema split-screen/sticky que **ya no existe en el código en absoluto** — ni siquiera con bugs, directamente no está. La spec que superó el Quality Gate no describe ninguna versión del código que se haya ejecutado nunca en producción.

**Acción:** no urgente para publicar (`spec.md` no se sirve a los visitantes), pero si se pretende que el Quality Gate signifique algo, esta spec necesita una revisión completa de la sección de arquitectura antes de considerarse vigente — o marcarse explícitamente como desactualizada mientras tanto.

---

## Nota sobre `docs/00-proyecto/project.md` y `docs/03-diseno/design-identity.md`

El commit también añade/actualiza estos dos archivos en `victorcorral` (77 y 27 líneas respectivamente) — son los artefactos `/spec-init` de este mismo proyecto dentro de `victorcorral`, coherentes con el patrón de dogfooding ya visto en el framework repo. No se ha detectado ninguna inconsistencia en su contenido frente al resto de la auditoría; el problema no es lo que declaran, es que el código (C-02, C-03) no cumple todavía lo que `design-identity.md` pide sobre tipografía.

---

## Plan de acción

**P0 — antes de publicar el enlace:**
1. Quitar `inspect.js`, `dom_dump.html` y los 4 `screenshot*.png` del repo; sacar `puppeteer` de `dependencies` (C-01).
2. Añadir el bloque `fontFamily` que falta en `tailwind.config.ts` para que `font-fw-*` haga algo — es la identidad tipográfica de marca completa, actualmente invisible (C-02).
3. Unificar el nombre del producto en `playbookSlides.tsx` a "Human-AI Copilot Framework" (C-03).

**P1 — higiene, no bloqueante:**
4. Actualizar `docs/02-spec/spec.md` (framework repo) para reflejar la arquitectura real, o marcarlo explícitamente como desactualizado (C-04).

**Ya cerrado, no requiere más trabajo:** H-07, H-02/N-01, N-02 y N-04 — los cuatro verificados con evidencia directa contra el código y el navegador real, no solo leídos.
