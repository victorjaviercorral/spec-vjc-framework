---
tipo: auditoria
fecha: 2026-08-06
autor: Claude (sesión dedicada, a petición de Víctor Javier Corral)
estado: para acción
---

# Informe de auditoría — 2026-08-06

**Alcance:** (1) coherencia de referencias tras el cambio de nombre del repo en GitHub, (2) reescritura de `README.md` en inglés para audiencia PM, (3) auditoría de qué documentación mantener, y (4) auditoría del prototipo web `docs/04-prototipo/v2-interactive/`, candidato a incorporarse a victorjaviercorral.com.

**Método:** grep de referencias cruzadas al repo antiguo, lectura de los 15 comandos/checklists/plantillas relevantes, y verificación **funcional** del prototipo — servido por HTTP local (no solo abierto como archivo), con inspección de consola, DOM y CSS reales, en desktop (1440px) y mobile (375px). Los hallazgos del bloque D están verificados en código, no solo observados visualmente.

---

## Resumen ejecutivo

1. **Coherencia de nombre — hecho.** El repo pasó de `spec-vjc-framework` a `Human-AI-Copilot-Framework-for-Product-Development` en GitHub. Las URLs stale se corrigieron en 3 archivos. El identificador técnico del plugin (`spec-vjc-framework`, el que usan `/plugin install` y `/plugin update`) se dejó **sin tocar** a propósito — es una decisión, no un descuido, explicada en la sección A.
2. **README — reescrito.** Nuevo `README.md` en inglés, dirigido a un PM sin trasfondo técnico, con instalación paso a paso verificada contra el mecanismo real (no el que describe el prototipo web — ver punto 4). El resto de la documentación queda en español, por tu propia decisión explícita en esta sesión.
3. **Documentación del repo — en buen estado.** No hay nada que archivar con urgencia; los dos ajustes menores que encontré (versión desactualizada en una cabecera, un nombre de archivo con espacio) ya están corregidos.
4. **El prototipo web (`v2-interactive`) tiene 3 hallazgos críticos que lo descalifican para publicar tal cual**: el panel interactivo — la razón de ser del rediseño v2, según su propio retro — **desaparece por completo en mobile**; el selector de tema no hace nada (no hay una sola línea de CSS de modo claro en el proyecto); y la página "How to Install" describe un mecanismo de instalación que **no es el real**. Detalle completo y evidencia en el bloque D.
5. **Ninguno de los hallazgos del bloque D se ha corregido en esta sesión.** Es auditoría, no reparación — para que decidas tú qué se arregla y en qué orden. El plan de acción al final los prioriza.

---

## Bloque A — Coherencia de nombre de repo

Verificado con `grep -rn "github.com/victorjaviercorral" .` y `grep -rn "spec-vjc-framework"` sobre todo el repo, salvo `.git/`.

**Corregido:**

| Archivo | Antes | Después |
|---|---|---|
| `.claude-plugin/plugin.json:9` | `homepage: .../spec-vjc-framework` | `homepage: .../Human-AI-Copilot-Framework-for-Product-Development` |
| `docs/guia-usuario.md:27` | `/plugin marketplace add victorjaviercorral/spec-vjc-framework` | `.../Human-AI-Copilot-Framework-for-Product-Development`, con nota aclaratoria sobre el identificador técnico |
| `docs/02-spec/spec.md:87` | "repositorio `spec-vjc-framework`" | Nombre del repo actualizado + aclaración del identificador técnico |
| `README.md` | — | Reescrito completo; todas las URLs apuntan al repo nuevo |

**Deliberadamente sin tocar** (y por qué):

- **`.claude-plugin/plugin.json` → `"name": "spec-vjc-framework"`** y **`.claude-plugin/marketplace.json` → `"name": "spec-vjc-framework"`**. Es el identificador que usan `/plugin install <nombre>@<marketplace>` y `/plugin update <nombre>`. Cambiarlo no es "corregir una referencia stale" — es un cambio de interfaz pública que rompería el comando de instalación de cualquiera que ya lo tenga instalado. Lo dejé fijo y lo documenté explícitamente en el nuevo README para que no parezca una inconsistencia sin explicar. Si quieres rebrandearlo también (p. ej. a `human-ai-copilot`), es una decisión tuya — technically trivial, pero rompe compatibilidad con instalaciones existentes.
- **`.agents/plugins/spec-vjc-framework/`** (carpeta real usada por Antigravity). Es una ruta funcional, no una URL; renombrarla obliga a tocar todas las referencias internas (`rules/AGENTS.md`, los tres `SKILL.md`, `docs/guia-antigravity.md`) sin beneficio claro. Sin tocar.
- **`docs/obsidian.md`** (líneas 54, 135-136) y **`docs/validacion-1.2.md`** (frontmatter `proyecto: spec-vjc-framework`). Son referencias a la carpeta local de tu máquina (`C:\...\spec-vjc-framework`, que sigue llamándose así) y a un identificador de proyecto interno, no al repo de GitHub. Nada que corregir mientras no renombres la carpeta local.
- **`CHANGELOG.md`**. Es un registro histórico; reescribir menciones pasadas de `spec-vjc-framework` falsearía el historial. Sin tocar.

---

## Bloque B — README.md

Reescrito por completo. Decisiones tomadas (todas reversibles, dímelo si alguna no encaja):

- **Título "Human-AI Copilot Framework"**, no "Spec VJC Framework". El nuevo nombre del repo y el prototipo web ya adoptan esa marca de forma consistente; mantener "Spec VJC" en el README habría creado una tercera identidad para el mismo producto.
- **Idioma:** inglés, según tu confirmación. El resto de la documentación (`constitution.md`, `docs/*.md`, comandos) queda en español — lo dice explícitamente el README para que nadie lo lea como un olvido.
- **Instalación verificada contra el mecanismo real** (`/plugin marketplace add` + `/plugin install`, tal y como está en `docs/guia-usuario.md` y en `.claude-plugin/marketplace.json`) — no contra lo que describe `install.html` del prototipo, que está equivocado (bloque D, hallazgo 5).
- **Patrón de plugin README estándar:** pitch de una frase, para quién es / no es, quick start numerado con bloques de comando copiables, explicación del modelo en lenguaje llano antes de la jerga (Etapa/Exposición reformulado como dos preguntas), tabla de rutas típicas, principios resumidos con enlace a la fuente completa, tabla de documentación, estado y licencia. Sin badges inventados (no hay CI, no hay build) — los tres badges que sí puse (licencia, "works with Claude Code", versión) son verificables desde el propio repo.

---

## Bloque C — Qué mantener, qué tocar, en la documentación existente

| Documento / carpeta | Rol | Recomendación |
|---|---|---|
| `constitution.md` | Fuente única de los principios | **Mantener intacto.** No tocar salvo cambio real de regla, con su entrada de CHANGELOG. |
| `CHANGELOG.md` | Historial de versiones | **Mantener intacto.** No reescribir entradas pasadas. |
| `docs/guia-usuario.md` | Referencia completa; el README ahora lo señala como punto de entrada | **Hecho en esta sesión:** la cabecera decía "v1.2" y el plugin real está en v1.3.1 — corregido. |
| `docs/guia-etapa.md`, `guia-exposicion.md`, `diagramas.md`, `fundamentos.md`, `modelo.md`, `vault-structure.md` | Documentación de referencia core | **Mantener sin cambios.** Son la base operativa citada desde el README y desde `guia-usuario.md`; consistentes entre sí. |
| `docs/obsidian.md` | Integración opcional con Obsidian | **Mantener.** No es crítico para alguien que solo instala el plugin, correctamente relegado a un enlace secundario. |
| `docs/validacion-1.2.md` | Autocrítica activa de `/expand`, citada desde el README | **Mantener y seguir citando.** Es honestidad declarada sobre las partes menos maduras — un activo de credibilidad, no un documento a esconder. |
| `docs/auditoria-v0.1.md` | Histórico — ya se autoetiqueta como tal en su primera línea | **Mantener el contenido, considerar moverlo.** Hoy vive al mismo nivel que la documentación vigente y no está enlazado desde ningún índice (README, guia-usuario.md); solo es "hallable" explorando la carpeta a mano. Sugerencia de baja prioridad: `docs/historial/auditoria-v0.1.md`, o al menos un enlace desde `CHANGELOG.md` en la entrada donde se adoptó su propuesta, para que quede trazado en vez de huérfano. |
| `docs/guia-antigravity.md` | Adaptación a Google Antigravity | **Mantener**, ahora enlazado desde el README. |
| `docs/comandos-y-skills-antigravity.md` | Mapa de invocación de skills en Antigravity | **Hecho en esta sesión:** el nombre tenía un espacio (`comandos-y-skills antigravity.md`), inconsistente con el resto del repo (kebab-case) y frágil en enlaces/URLs. Renombrado; verificado por grep que ningún otro doc lo referenciaba todavía, así que no rompe nada. |
| `docs/00-proyecto/` … `docs/04-prototipo/` (proyecto "Spec VJC Showcase") | El propio prototipo web, construido dogfooding el framework sobre sí mismo | **Mantener como proyecto legítimo** — es exactamente el uso previsto de la convención de vault (`vault-structure.md`). Pero **no está listo para publicar**: ver bloque D. Antes de "incorporarlo" a victorjaviercorral.com, a este proyecto le falta pasar por su propio `/quality-gate` y sus propias checklists de Accesibilidad y Performance — las que su propio `project.md` declara obligatorias por ser X1 (línea 6). |
| `.agents/plugins/spec-vjc-framework/` | Runtime funcional para Antigravity | **Mantener nombre y estructura.** Ver bloque A. |

No hay documentación que sobre o que deba eliminarse. El repo está limpio; los únicos huecos son de trazabilidad (auditoria-v0.1 huérfana) y de higiene (un nombre de archivo, una cabecera de versión), no de contenido redundante.

---

## Bloque D — Auditoría del prototipo web (`docs/04-prototipo/v2-interactive/`)

Este es el candidato a "la nueva web" para victorjaviercorral.com que mencionaste. Lo serví por HTTP local (`python -m http.server`, no como archivo abierto directamente — abrir el `.html` a secas no ejecuta el JS de scroll de forma fiable) e inspeccioné DOM, CSS y consola reales. Severidad: 🔴 crítico (bloquea publicar) · 🟠 alto · 🟡 medio · ⚪ verificar antes de publicar.

### 🔴 H-01 — El panel interactivo desaparece por completo en mobile

`index.html:268` — `<div class="hidden md:flex w-full md:w-1/2 ...">` es el contenedor del Visualizador (los simuladores: bloqueo por invención de datos, quality gate, matriz de exposición...). En viewport <768px, la clase `hidden` lo oculta sin ningún reemplazo. Verificado renderizando a 375px de ancho: el usuario mobile solo ve el texto narrativo de la izquierda, cero interactividad.

Esto no es un detalle de responsive cualquiera — contradice tres fuentes del propio proyecto:
- El propio PRD (`docs/01-prd/prd.md`, capacidad **C1, must**): *"Visualizar narrativa y simulador de forma simultánea (Split-Screen desktop **o partición móvil**)"*.
- La asunción de riesgo más alta que el propio PRD declaró (`prd.md`, A1): *"El panel interactivo se fijará en la mitad inferior de la pantalla"* en mobile — nunca se implementó.
- El retro que motivó esta v2 (`docs/03-diseno/retro-01-failure-analysis.md`, Causa C): la v1 fracasó por *"falsa interactividad... el usuario es pasivo, solo lee"*. En mobile, la v2 reproduce exactamente ese fallo.

**Impacto:** en un sitio que se promociona como "documentación interactiva", la mayoría del tráfico entrante (móvil) no ve ninguna de las partes que justifican esa etiqueta.

### 🔴 H-02 — El selector de tema no hace nada

`theme.js` alterna la clase `.dark` en `<html>` y guarda la preferencia en `localStorage`. Pero `app.css` (69 líneas, revisado completo) no contiene ni un solo selector `.dark`, `prefers-color-scheme` ni variante `dark:`; los colores están fijados directamente en la configuración de Tailwind (`background: #131313`, etc.), sin rama clara/oscura. Confirmado con clic real sobre el botón: cero cambio visual.

Además, esto no es un simple "falta implementar" — `docs/03-diseno/brand.md` (§5, Prohibiciones Estrictas) dice literalmente: *"NO al modo claro deslumbrante: perdería el efecto potente"*. El propio criterio de marca prohíbe el modo claro. El botón promete algo que el propio proyecto decidió no construir.

**Fix recomendado:** quitar el botón (y `theme.js`), no implementar modo claro — sería remar contra la propia decisión de marca ya tomada.

### 🔴 H-03 — Las instrucciones de instalación no son las reales

`install.html`: "1. Añadir reglas al proyecto — Clona o copia la carpeta `.agents/` en la raíz de tu proyecto" y `claude /spec-init` como comando de terminal. Esto no es cómo se instala el framework. El mecanismo real (`docs/guia-usuario.md §2`, `.claude-plugin/marketplace.json`, y el nuevo `README.md`) es:

```
/plugin marketplace add victorjaviercorral/Human-AI-Copilot-Framework-for-Product-Development
/plugin install spec-vjc-framework@spec-vjc-framework
```
— nada se copia al proyecto, y `/spec-init` se teclea **dentro** de una sesión de Claude Code ya abierta, no como argumento de `claude`. La sección de Antigravity añade `agy install` y `/goal usa el skill spec-init para este proyecto`, comandos que no aparecen en ningún otro lugar del repo (`docs/guia-antigravity.md` no los menciona).

Es, literalmente, el principio A.1 del propio framework incumplido por su propia página de marketing: una instrucción verosímil pero no verificada, presentada como si fuera un hecho.

**Fix:** reescribir `install.html` con los pasos reales — ya redactados y verificados en el nuevo `README.md`, section "Installation".

### 🟠 H-04 — Nav bar rota en mobile, sin forma de navegar

A 375px: el logo "Human-AI Copilot" se parte en dos líneas, el botón "Ver Pitch Deck" se corta/desborda, y los enlaces a `install.html` / `casos.html` (correctamente ocultos con `hidden md:flex`) no tienen ningún sustituto — no hay menú hamburguesa. Un usuario mobile que entra por `index.html` no tiene ninguna forma de llegar a "How to install" o "Casos de Uso".

**Fix:** nav responsive real (menú colapsable) antes de publicar — sin esto, dos de las tres páginas del sitio son inalcanzables en mobile.

### 🟠 H-05 — Tailwind vía CDN en producción

Consola del navegador, en las tres páginas: *"cdn.tailwindcss.com should not be used in production."* — warning del propio proveedor. Consecuencias concretas para este caso:

- El `project.md` de este mismo proyecto (línea 6) activa **Performance** como módulo obligatorio por ser X1; cargar el framework CSS completo sin purgar desde un CDN externo va en la dirección contraria.
- victorjaviercorral.com ya tiene cabeceras de seguridad estrictas en producción (Mozilla Observatory A+ 115/100, según su propio README). Un `<script src="cdn.tailwindcss.com">` es una fuente externa que, si el CSP actual no la contempla, o bien rompe la carga de esta página al incorporarla, o bien obliga a debilitar la CSP existente para todo el dominio — ninguna de las dos es gratis.

**Fix:** compilar Tailwind a un CSS estático con purge (o pasar a CSS a mano, dado que `components.md` ya documenta que el uso real de utilidades es acotado) antes de integrar esto en cualquier dominio con CSP.

### 🟡 H-06 — El propio quality gate de este proyecto sigue vacío

`docs/01-prd/prd.md` y `docs/02-spec/spec.md` tienen la sección Quality Gate literalmente en blanco (*"Anexado por `/quality-gate`. Vacío hasta entonces."*), y no hay evidencia de que se hayan corrido las checklists de Accesibilidad (`checklists/accesibilidad.md`) ni Performance (`checklists/performance.md`) que el propio `project.md` declara activas. El framework exige "evidencia, no afirmación" — publicar esta pieza sin pasar por sus propios controles sería el framework incumpliendo, sobre sí mismo, la regla que más repite.

**Fix:** correr `/quality-gate` sobre `prd.md`/`spec.md`, y las dos checklists, antes de dar esto por publicable.

### ⚪ H-07 — Verificar el scroll real en navegador, no dar la interactividad por buena

El scroll automatizado (rueda/trackpad simulado) que usé para probar la página **no movió** el `scrollTop` del panel narrativo pese a que el contenedor sí es scrolleable (`overflow-y: auto`, `scrollHeight: 6415px` vs `clientHeight: 820px`, verificado por JS). Al forzar el scroll por `scrollTo()` sí funciona correctamente: el `IntersectionObserver` cambia de sección y el visualizador se actualiza sin fallos aparentes. No puedo afirmar con certeza si el fallo es de la herramienta de automatización o de la página real — pero como el scroll **es** la interacción principal del sitio, no debería darse por buena sin probarla a mano (rueda de ratón y trackpad, Chrome/Safari/Firefox, desktop) antes de publicar.

### ⚪ H-08 — Superficie de despliegue sin decidir

`docs/02-spec/spec.md §9` fija el despliegue en un sitio Netlify propio conectado al branch `main` de **este** repo (el framework). Pero la intención que me diste es incorporarlo a **victorjaviercorral.com**, que ya vive en otro repo (`victorcorral`) con su propio pipeline y sus propias cabeceras. Son dos superficies distintas, y hoy ningún documento dice cuál es la real:

- **Opción A — ruta dentro de victorcorral.com** (p. ej. `/framework` o `/tools/human-ai-copilot`): mismas cabeceras de seguridad, mismo dominio, pero exige portar el HTML/CSS/JS actual al stack real del sitio (React + Vite + Tailwind compilado, no CDN) — resuelve H-05 de raíz.
- **Opción B — microsite Netlify aparte** (lo que dice `spec.md` hoy), enlazado desde victorjaviercorral.com: más rápido de lanzar tal cual, pero necesita su propio dominio/subdominio, sus propias cabeceras, y "incorporado a victorjaviercorral.com" pasaría a significar "enlazado desde", no "parte de".

No es una decisión técnica, es de producto — pero condiciona directamente cómo se resuelven H-05 y H-04, así que vale la pena cerrarla antes de arreglar el resto.

---

## Plan de acción priorizado

**P0 — bloqueante antes de publicar en cualquier dominio real:**
1. Decidir la superficie de despliegue (H-08) — condiciona todo lo demás.
2. Arreglar el panel interactivo ausente en mobile (H-01) — es el requisito must C1 del propio alcance v1.
3. Arreglar la navegación mobile (H-04).
4. Quitar el selector de tema falso (H-02).
5. Corregir `install.html` con los pasos reales (H-03) — ya están redactados en el nuevo `README.md`.
6. Compilar Tailwind sin CDN (H-05).
7. Correr `/quality-gate` + checklists de accesibilidad y performance sobre el propio prototipo (H-06), y verificar el scroll a mano en un navegador real (H-07).

**P1 — housekeeping, no bloqueante:**
8. ~~Actualizar la cabecera de versión de `docs/guia-usuario.md` (v1.2 → v1.3.1).~~ Hecho en esta sesión.
9. ~~Renombrar `docs/comandos-y-skills antigravity.md` → `docs/comandos-y-skills-antigravity.md`.~~ Hecho en esta sesión.
10. Enlazar `docs/auditoria-v0.1.md` desde algún índice, o moverlo a un subfolder histórico. (Pendiente — decisión de organización, no urgente.)

**P2 — decisión de producto, no técnica:**
11. Decidir si el identificador técnico del plugin (`spec-vjc-framework`) se rebrandea también (rompe instalaciones existentes) o se mantiene como slug interno estable (recomendado, ya documentado así en el README).

---

## Qué no se tocó en esta sesión

Ningún archivo del bloque D se corrigió — es auditoría, no reparación, para que la priorización sea tuya. Tampoco se renombró la carpeta local del repo, ni los identificadores técnicos del plugin/marketplace, ni el historial de `CHANGELOG.md`. Si quieres que ejecute alguno de los puntos del plan de acción, dímelo y en qué orden.
