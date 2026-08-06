---
tipo: verificacion
fecha: 2026-08-06
autor: Claude (sesión dedicada, a petición de Víctor Javier Corral)
estado: para acción
relacionado: docs/informe-auditoria-2026-08-06.md
---

# Informe de verificación — 2026-08-06

**Qué es este documento:** verificación de los cambios que el usuario reportó haber aplicado, en el repo `victorcorral`, para resolver los 8 hallazgos (H-01 a H-08) del [informe de auditoría del mismo día](informe-auditoria-2026-08-06.md). No es una auditoría nueva desde cero — es una comprobación punto por punto de un reporte de cierre ("Walkthrough: Migración de Product Framework a React").

**Método:** nada se dio por bueno por lectura del reporte de cierre. Se verificó contra el repo real:
- `npm install` + `npm run build` en `victorcorral` (build real, no simulado).
- `npm run preview` servido por HTTP y probado en el navegador — desktop (1440px) y mobile (375px) — con clics reales sobre los elementos y scroll real de rueda de ratón, no solo scroll forzado por JS.
- Inspección de DOM y `localStorage` en vivo (`document.documentElement.className`, `window.scrollY`, `element.scrollTop`, estilos computados) antes y después de cada interacción.
- Lectura de `docs/01-prd/prd.md` y `docs/02-spec/spec.md` (framework repo) tal y como quedaron tras el supuesto Quality Gate, contrastados contra el código React real que dice implementar lo que ahí se afirma.

**Resultado en una frase:** de los 8 hallazgos, **5 están genuinamente resueltos**, **2 no lo están** (uno de ellos de forma distinta a como estaba roto antes, no mejor), y la verificación del scroll (H-07) destapó **un bug nuevo y más grave** que no existía en el prototipo estático: en desktop, el scroll real no queda contenido en el panel narrativo, así que el panel visualizador — la pieza central de la propuesta — desaparece de la vista después de la primera sección.

---

## Tabla resumen

| # | Hallazgo original | Veredicto | Severidad restante |
|---|---|:---:|:---:|
| H-01 | Visualizador ausente en mobile | ✅ Resuelto | — |
| H-02 | Selector de tema decorativo/roto | ❌ No resuelto (bug distinto) | 🟠 Alto |
| H-03 | Instrucciones de instalación falsas | ✅ Resuelto (con matiz menor) | ⚪ |
| H-04 | Nav mobile rota | ✅ Resuelto | — |
| H-05 | Tailwind por CDN en producción | ✅ Resuelto | — |
| H-06 | Quality Gate / checklists sin correr | ❌ No resuelto de fondo | 🔴 Crítico |
| H-07 | Scroll real sin verificar | ⚠️ Verificado — y reveló un bug nuevo | 🔴 Crítico |
| H-08 | Superficie de despliegue sin decidir | ⚠️ Decidido en código, no en la spec | 🟡 Medio |
| N-01 a N-05 | Hallazgos nuevos, no estaban en la auditoría original | — | ver detalle |

---

## Detalle por hallazgo

### ✅ H-01 — Visualizador en mobile: resuelto

Confirmado visualmente a 375px de ancho: el panel visualizador (la tarjeta "Alineación Estratégica" y las siguientes) se renderiza apilado debajo del texto narrativo. Contenido interactivo real presente en mobile, a diferencia del prototipo original donde `hidden md:flex` lo eliminaba por completo.

### ❌ H-02 — Selector de tema: no resuelto, roto de otra manera

El botón no se eliminó — sigue presente porque `ProductFramework.tsx` reutiliza el `NavBar` global del sitio (`src/components/NavBar.tsx`), que renderiza el botón "Toggle theme" de forma incondicional, para todas las rutas.

Lo verificado con clic real + inspección de estado:

```
Antes del clic:  <html class="dark">   localStorage.theme = "light"
Clic en el botón de tema
Después:         <html class="dark">   localStorage.theme = "light"   ← ya estaba así, el clic anterior lo dejó en este estado
```

Secuencia completa observada:
1. La página fuerza `document.documentElement.classList.add("dark")` en un `useEffect` con array de dependencias vacío (`ProductFramework.tsx`), es decir, una sola vez al montar, sin usar el hook de tema real del sitio (`useTheme()`).
2. El botón de tema del `NavBar` sí usa `useTheme()` (`src/hooks/use-theme.ts`), que es el mecanismo real y funcional del resto del sitio.
3. Al hacer clic, `useTheme()` cambia su estado interno y **sí** escribe en `localStorage`, pero la página no refleja el cambio visualmente (permanece oscura, gracias al `classList.add` de arriba) — resultado: el icono del botón y el `localStorage` quedan indicando un tema que la página no muestra.
4. Ese `localStorage.theme` corregido/alterado **persiste para el resto del sitio**: al navegar a `/` con una recarga completa, la home sí respeta ese valor guardado (`<html class="">`, sin `dark`) — es decir, un clic en esta página cambia silenciosamente cómo se va a ver el resto del sitio la próxima vez, sin que el usuario haya visto ningún cambio al hacerlo.

**No es el mismo bug que antes** (antes el botón no hacía nada visible ni invisible; ahora hace algo invisible con efecto fuera de la página). Sigue sin resolver la recomendación original: quitar el botón en esta ruta, no dejarlo ahí con un comportamiento fantasma.

### ✅ H-03 — Instrucciones de instalación: resuelto, con un matiz menor

`NarrativePane.tsx`, sección 07 ("Instalación"), muestra ahora las dos líneas reales:
```
/plugin marketplace add victorjaviercorral/Human-AI-Copilot-Framework-for-Product-Development
/plugin install spec-vjc-framework@spec-vjc-framework
```
seguidas de `/spec-init` como paso siguiente. Correcto en lo sustancial. Matiz menor, no bloqueante: no aclara que `/spec-init` se teclea **dentro** de una sesión de Claude Code ya abierta, no como argumento de terminal — el mismo matiz que ya se corrigió en el `README.md` del framework.

### ✅ H-04 — Nav mobile: resuelto

Confirmado a 375px: logo sin partirse, icono de tema y menú hamburguesa correctamente alineados, sin desbordamiento. Al heredar el `NavBar` ya probado del resto del sitio en lugar de una nav propia del prototipo, hereda también su robustez.

### ✅ H-05 — Tailwind por CDN: resuelto

`npm run build` genera CSS compilado real (`dist/assets/index-*.css`, 90.2 kB con purge). Cero warnings de consola sobre `cdn.tailwindcss.com` en las tres verificaciones (carga inicial, tras navegación, tras interacción). El framework CSS ya no se sirve sin purgar desde un tercero.

### ❌ H-06 — Quality Gate: se ejecutó, pero el resultado no se sostiene

Verificado leyendo `docs/01-prd/prd.md` y `docs/02-spec/spec.md` del propio repo del framework tal y como quedaron tras el gate, y contrastándolos con el código React real.

**Puntuación sospechosa.** Ambos documentos puntúan **exactamente 7.0 / 7.0 / 7.0** en las tres dimensiones — el mismo patrón redondo y uniforme que la propia auditoría histórica del framework (`docs/auditoria-v0.1.md`, hallazgo **H-19**) señala como el síntoma de una revisión que no está discriminando de verdad, no evidencia de calidad pareja.

**La corrección de accesibilidad que el gate acepta no existe en el código.** `spec.md` afirma, tras el gate: *"A11Y-03: Los simuladores de la derecha utilizarán `aria-live="polite"` en el contenedor principal `#visualizer-container`"*. Verificado por búsqueda de texto sobre `src/pages/ProductFramework/`: **cero apariciones de `aria-live` en todo el directorio**. El documento pasó el gate afirmando un comportamiento que el código entregado no tiene — exactamente el patrón que `/sync-check` existe para detectar.

**Contradicción interna sin resolver.** `spec.md §12` (Fuera de alcance) sigue diciendo *"Analítica web (Pendiente AS-02)"*, mientras que `§9` y `§10` del mismo documento afirman que sí se va a añadir analítica (Vercel Analytics). Las dos afirmaciones conviven en el mismo documento que obtuvo PASS.

**Dato no verificado contra la realidad.** "Vercel Analytics" no coincide con la infraestructura real del sitio: `victorcorral/docs/00-proyecto/project.md` (el propio project.md del sitio real) declara Netlify como despliegue y Umami como analítica. Introducir una herramienta distinta sin contrastarla contra el proyecto real es precisamente lo que el Principio A.1 del framework —el que este ejercicio entero pretende demostrar— prohíbe.

### 🔴 H-07 — Scroll real: verificado, y aparece un bug nuevo y más grave

La pregunta original era "¿funciona el scroll real, no solo el simulado por JS?". Respuesta: **el listener de scroll sí funciona** (el `useInView` de framer-motion detecta correctamente el cambio de sección al hacer scroll real de rueda de ratón — verificado, el contenido del panel derecho cambia de tarjeta). Pero al verificarlo con scroll real apareció esto:

```
Tras hacer scroll real hacia abajo (desktop, 1440px):
  window.scrollY = 1000        ← la página entera se desplazó
  narrativeDiv.scrollTop = 0   ← el contenedor propio del panel narrativo nunca se movió
```

Es decir: en vez de que el scroll quede contenido dentro del panel narrativo (que es lo que permite que el panel visualizador de la derecha se quede fijo en pantalla mientras el usuario lee), **es la página entera la que se desplaza**. El panel visualizador, aunque sigue existiendo en el DOM con el contenido correcto (verificado leyendo su `innerText`), se desplaza junto con todo lo demás y sale de la pantalla — queda un hueco negro donde debería seguir visible la tarjeta explicativa.

**Confirmado que es específico de desktop:** repetido el mismo scroll real a 375px (mobile) y el layout se comporta correctamente — ahí no depende de un panel fijo, así que el bug no se manifiesta. Es un problema de contención de scroll en el layout de escritorio (`overflow-y-auto` en el panel narrativo sin una altura realmente restringida en su contenedor flex — patrón clásico de Flexbox donde un hijo con `overflow` necesita también limitar su propia altura para que el scroll quede contenido en vez de expandir al padre).

**Por qué es más grave que antes:** en el prototipo HTML original, el problema era "no pude verificar si el scroll real funciona con la herramienta automatizada". Ahora sí se verificó con scroll real, y el resultado es que **la funcionalidad central de la página — el split-screen con el panel derecho fijo — no funciona en desktop** más allá de la primera sección. Es el requisito **must C1** del propio PRD del proyecto.

### 🟡 H-08 — Superficie de despliegue: decidida en código, no en la documentación

La decisión sí se tomó y se ejecutó: el framework vive ahora como ruta React dentro de `victorcorral` (`/product-framework`), confirmado por los archivos y el build real. Pero `docs/02-spec/spec.md §9` (framework repo) **no se actualizó** para reflejarlo — sigue diciendo *"Despliegue único en Netlify o integración en victorcorral.com"* y *"branch `main` del repositorio `Human-AI-Copilot-Framework-for-Product-Development` o `victorcorral`"*, con el "o" tal cual, sin resolver. La spec que superó el Quality Gate documenta una decisión que ya no es la real — spec y código divergieron desde el primer día.

---

## Hallazgos nuevos (no estaban en la auditoría original)

Estos aparecieron al verificar, no estaban en el alcance de H-01 a H-08:

- **N-01 — El clic en el selector de tema tiene efecto fuera de esta página.** Ver detalle en H-02: cambia `localStorage.theme` para todo el sitio sin que el usuario vea ningún cambio en la página donde hizo clic.
- **N-02 — Enlaces muertos heredados del `NavBar` del portfolio.** Los anclajes "About", "Impact", "Timeline", "Recognition", "Contact" apuntan a secciones (`#about`, `#cases`...) que solo existen en la home; en `/product-framework` no hacen nada.
- **N-03 — Contenido de "Casos de Uso" no migrado.** Los dos casos de estudio del prototipo original (Lego Virtual Museum, PM Toolkit) no tienen equivalente en `NarrativePane.tsx` / `VisualizerPane.tsx`. Puede ser un recorte de alcance deliberado, pero no está declarado en ningún documento — conviene decidirlo explícitamente en vez de que quede como una omisión silenciosa.
- **N-04 — Sin `<title>` ni metadatos propios para la ruta.** `/product-framework` conserva el título por defecto del sitio ("Víctor Corral - Senior IT Project Manager"), sin meta description ni OG propios — relevante si se va a compartir el enlace.
- **N-05 (housekeeping, ya corregido durante esta verificación)** — al probar el build localmente se borró por error el `.claude/launch.json` ya existente y versionado del repo `victorcorral`. Detectado y restaurado con `git checkout -- .claude/launch.json` en la misma sesión; `git status` quedó limpio en ese archivo. Se menciona por transparencia, no requiere ninguna acción del usuario.

---

## Plan de acción

**P0 — bloqueante, es la funcionalidad central de la página:**
1. Arreglar la contención de scroll en desktop (H-07). Candidato más probable: forzar altura real en el panel narrativo dentro de su contenedor flex (p. ej. `min-h-0` en el flex item, y confirmar que `<main>` restringe altura de verdad) para que `overflow-y-auto` capture el scroll en vez de que se propague a la página.
2. Quitar (o inhabilitar de verdad) el selector de tema en esta ruta (H-02) — no dejarlo con un efecto colateral invisible sobre el resto del sitio.

**P0 — antes de dar el Quality Gate por válido:**
3. Implementar de verdad `aria-live="polite"` en `#visualizer-container` (o retirar la afirmación de `spec.md` si no se va a implementar) (H-06).
4. Resolver la contradicción de `spec.md §12` vs `§9`/`§10` sobre si hay analítica o no (H-06).
5. Sustituir "Vercel Analytics" por la herramienta real del sitio (Umami, según `victorcorral/docs/00-proyecto/project.md`) o justificar explícitamente por qué se introduce una nueva (H-06).
6. Re-ejecutar `/quality-gate` sobre `prd.md` y `spec.md` una vez aplicado lo anterior — la puntuación 7.0/7.0/7.0 actual no es fiable tal como quedó.

**P1 — antes de anunciar el enlace públicamente:**
7. Actualizar `spec.md §9` para reflejar la decisión real de despliegue (dentro de `victorcorral`, no "o") (H-08).
8. Añadir `<title>` y metadatos propios a la ruta `/product-framework` (N-04).
9. Decidir explícitamente qué pasa con "Casos de Uso" — migrarlo o declarar el recorte de alcance en el PRD (N-03).

**P2 — pulido, no bloqueante:**
10. Quitar o adaptar los enlaces de anclaje heredados del `NavBar` de portfolio cuando se está en `/product-framework` (N-02).

---

## Qué queda genuinamente cerrado

H-01, H-03, H-04 y H-05 están resueltos y verificados con evidencia directa (no solo con la palabra del reporte de cierre) — no hace falta volver sobre ellos. El resto de esfuerzo debería concentrarse en el plan de acción de arriba, empezando por P0.
