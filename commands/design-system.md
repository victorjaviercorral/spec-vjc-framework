---
description: Crea, reutiliza o extiende un design system (tokens + componentes) como activo del framework, compartible entre proyectos.
argument-hint: [crear <nombre> | extender <nombre-existente>]
---

# /design-system

Gestiona design systems reutilizables en `${CLAUDE_PLUGIN_ROOT}/design-systems/<nombre>/`. Son activos del framework, no del proyecto: se versionan en el repo del framework (constitution F.28).

Un design system que solo existe como texto no es verificable — es una promesa. Este comando produce dos capas, siempre en este orden: **criterio** (qué se decide y por qué, en `brand.md`) y **tokens** (esa decisión codificada en variables, en `tokens.css`). Tokens sin criterio producen números sin dirección; criterio sin tokens produce una promesa que cada componente interpreta distinto (constitution F.26-ter). Cierra con una prueba que se mira, no que se lee: `showcase.html`.

## Paso 0 — Referencias, antes de tokens

Un sistema sin referencia parte de cero, y desde cero converge al aspecto genérico que F.26 prohíbe.

1. Reúne **2-3 referencias visuales coherentes entre sí** — no dispares: mezclar una referencia minimalista y clara con otra densa y oscura produce un Frankenstein, no una identidad. Si `design-identity.md` ya las declara, úsalas; si no, pregúntalas. No consumen cupo de las 8 preguntas del flujo de definición (constitution B.6-bis): `/design-system` no es un comando de definición.
2. De cada referencia extrae, con capturas o descripción concreta: paleta y su lógica (fondo/superficie/texto en niveles de opacidad/acento), tipografía y sus pesos, escala de espaciado, tratamiento de esquina (afilada o redondeada — y por qué esa y no la otra), tratamiento de sombra y profundidad, densidad de información, y qué hace que un componente suyo se sienta pulido y no genérico.
3. Escribe la extracción en `brand.md` antes de tocar `tokens.css`. El orden importa: referencias → criterio en lenguaje humano → tokens en código → componentes. Invertirlo es lo que produce un sistema que parece bien en la especificación y se ve genérico en pantalla.

## Modos

**Crear** — a partir de `design-identity.md`, las referencias del Paso 0 y el prototipo aprobado si existe, genera:

- **`brand.md`** — la capa de criterio que gobierna toda decisión no cubierta por un token. Personalidad en 3 adjetivos, voz del copy, **presupuesto de acento** (cuántos momentos fuertes del color de marca por vista — un acento sin presupuesto se convierte en decoración y deja de dirigir la mirada), reglas de composición (qué combina con qué, qué nunca se mezcla), y una lista explícita de **prohibido** heredada de `design-identity.md` más lo que la extracción de referencias descarta. Es el archivo que `/prototype` y cualquier componente nuevo leen primero: el criterio externalizado que hace que el modelo ejecute con precisión en vez de inventar valores sueltos.
- **`tokens.css`** — la capa de código, sin un solo valor suelto. Además de color, tipografía y espaciado en escala definida, cubre obligatoriamente:
  - **Radios y espaciado en escala** (múltiplos de una unidad base), nunca valores sueltos por componente.
  - **Motion con nombre propio**: curvas de easing declaradas y con propósito (entrada, rebote, simétrica) — nunca el `ease`/`ease-in-out`/`linear` por defecto del navegador. Duraciones con nombre (rápida/normal/lenta), no milisegundos sueltos repetidos en cada componente.
  - **Sombras en capas, nunca una sola sombra plana**: un anillo de opacidad muy baja en vez de borde, una sombra de contacto ajustada y una ambiente más amplia y suave, todas a opacidad baja. La suma de varias capas tenues lee como profundidad real; una sola capa oscura lee como pegatina.
  - **Estado táctil**: un token de escala para el estado "presionado" de cualquier elemento interactivo — sutil, nunca un colapso.
- **`components.md`** — inventario de componentes base con anatomía y **todos sus estados**: default, hover, focus, active, disabled, error, loading, vacío. Todo estado con transición **declara qué tokens de motion usa** (qué curva, qué duración); un estado sin motion declarado se construirá con el `ease` por defecto que el criterio prohíbe.
- **`usage.md`** — cómo consumirlo desde un proyecto, qué se puede sobrescribir y qué no.
- **`a11y.md`** — contrastes verificados de cada par de la paleta, tamaños mínimos de objetivo táctil, comportamiento del foco.
- **`showcase.html`** — galería autocontenida (un único HTML, sin build) que importa `tokens.css` y renderiza **en vivo** cada componente en cada estado declarado en `components.md`. No son capturas ni descripciones: es el sistema ejecutándose. Es lo primero que expone un token mal calibrado — un botón que en prosa suena bien y en pantalla se ve genérico es un defecto que solo el render revela.

**Gate humano visual** — igual que `/prototype` (constitution F.27): abre `showcase.html` en el navegador antes de dar el sistema por cerrado. Si algo se ve genérico o inconsistente, se corrige `brand.md` primero y `tokens.css` después — nunca el componente suelto, o la próxima extensión reintroduce el mismo defecto.

**Extender** — copia la referencia al design system elegido en `docs/03-diseno/` del proyecto y genera **solo un archivo de overrides con las diferencias**. Duplicar el sistema completo está prohibido: es la vía por la que dos proyectos acaban con dos verdades divergentes.

## Reglas
- **Tokens primero**: ningún componente usa valores en crudo.
- **Criterio antes que tokens**: `brand.md` existe y se escribe antes que `tokens.css` (constitution F.26-ter). Un `tokens.css` sin `brand.md` es una paleta sin dirección.
- **Motion con nombre, nunca por defecto**: prohibido `transition: all 0.3s ease` o equivalente en cualquier componente del sistema. Toda curva y duración sale de `tokens.css`. Si el sistema incluye gestos o animación real (drag, swipe, momentum), se aplica también F.26-bis: `emil-design-eng` y `apple-design` juntas, nunca una sola.
- **Sombra en capas, nunca plana.** Una sola sombra con blur único es el indicio más rápido de que un componente no pasó por criterio.
- **Accesibilidad verificada**, no declarada: contraste AA comprobado par a par en la paleta real, incluidos los estados (un `disabled` que no llega a contraste sigue siendo un fallo).
- Todo componente documenta sus estados y el motion de cada transición; un componente sin estado de error, de carga o sin motion declarado está incompleto.
- **`showcase.html` se regenera en cada cambio de tokens.** Un showcase desactualizado miente sobre el estado real del sistema — es peor que no tenerlo.
- Cambios al design system: commit en el repo del framework + entrada en su CHANGELOG. Un proyecto nunca modifica el sistema base directamente; propone el cambio.

## Cuándo merece la pena
Crear un design system cuesta tiempo real. Hazlo cuando vayas a reutilizarlo, típicamente al extraerlo de un prototipo ya validado. Para un boceto de un día, no.
