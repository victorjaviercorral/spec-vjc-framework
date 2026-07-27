---
description: Crea, reutiliza o extiende un design system (tokens + componentes) como activo del framework, compartible entre proyectos.
argument-hint: [crear <nombre> | extender <nombre-existente>]
---

# /design-system

Gestiona design systems reutilizables en `${CLAUDE_PLUGIN_ROOT}/design-systems/<nombre>/`. Son activos del framework, no del proyecto: se versionan en el repo del framework (constitution F.28).

## Modos

**Crear** — a partir del `design-identity.md` del proyecto actual (y del prototipo aprobado si existe), genera:
- `tokens.css` — color, tipografía, espaciado, radios, sombras, timings y easings de animación, como custom properties. Escala definida, no valores sueltos.
- `components.md` — inventario de componentes base con anatomía y **todos sus estados**: default, hover, focus, active, disabled, error, loading, vacío.
- `usage.md` — cómo consumirlo desde un proyecto, qué se puede sobrescribir y qué no.
- `a11y.md` — contrastes verificados de cada par de la paleta, tamaños mínimos de objetivo táctil, comportamiento del foco.

**Extender** — copia la referencia al design system elegido en `docs/03-diseno/` del proyecto y genera **solo un archivo de overrides con las diferencias**. Duplicar el sistema completo está prohibido: es la vía por la que dos proyectos acaban con dos verdades divergentes.

## Reglas
- **Tokens primero**: ningún componente usa valores en crudo.
- **Accesibilidad verificada**, no declarada: contraste AA comprobado par a par en la paleta real, incluidos los estados (un `disabled` que no llega a contraste sigue siendo un fallo).
- Todo componente documenta sus estados; un componente sin estado de error ni de carga está incompleto.
- Cambios al design system: commit en el repo del framework + entrada en su CHANGELOG. Un proyecto nunca modifica el sistema base directamente; propone el cambio.

## Cuándo merece la pena
Crear un design system cuesta tiempo real. Hazlo cuando vayas a reutilizarlo, típicamente al extraerlo de un prototipo ya validado. Para un boceto de un día, no.
