---
description: Crea o reutiliza un design system (tokens + componentes base) como activo del framework, reutilizable entre proyectos.
argument-hint: [nombre-del-design-system | nombre-existente a extender]
---

# /design-system

Gestiona design systems reutilizables en `design-systems/<nombre>/` del repo del framework.

## Modos
- **Crear**: a partir del `design-identity.md` del proyecto actual, genera `tokens.css` (colores, tipografia, espaciado, radios, sombras, timings de animacion como custom properties), `components.md` (inventario de componentes base con anatomia y estados) y `usage.md` (como consumirlo desde un proyecto).
- **Reutilizar/extender**: copia referencias al design system elegido en `docs/03-diseno/` del proyecto y genera un archivo de overrides con SOLO las diferencias. Prohibido duplicar el sistema completo (constitution D.13).

## Reglas
- Tokens primero: ningun componente usa valores en crudo, siempre custom properties.
- Todo componente documenta sus estados (default, hover, focus, disabled, error, loading).
- Accesibilidad minima: contraste AA verificado en la paleta.
- El design system se versiona en el repo del framework (commit + entrada en su CHANGELOG), no en el proyecto.
