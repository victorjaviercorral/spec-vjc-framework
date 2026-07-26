# Changelog — spec-vjc-framework

## [0.1.1] — 2026-07-27

### Retro: piloto LegoVirtualMuseum (constitution E.16, disparo manual)

Durante `/spec-init` de LegoVirtualMuseum se iteraron 4 direcciones visuales completas
(v1 neubrutalismo, v2 archivo/museo, v3 fusion, v4 sandbox interactivo) usando la skill
`ui-ux-pro-max` para la direccion inicial y, para v3/v4, dos skills de motion instaladas
aparte: `emil-design-eng` (pulido de componente: easing propio, performance
transform/opacity, reduced-motion que atenua en vez de eliminar) y `apple-design`
(fisicidad: manejo directo 1:1, momentum/proyeccion, rubber-banding, interrumpibilidad).

**Hallazgo:** la v4 (identidad jugable — tokens de diseno arrastrables, vitrina con
inercia real) fue la mas innovadora de las 4, y goberno bien porque se aplicaron ambas
skills de motion EN LA MISMA iteracion, no una despues de la otra. Son complementarias:
Emil resuelve "que tan bien se siente" a nivel de componente; Apple resuelve "que tan
fisico se siente" a nivel de gesto. Usar solo una deja una mitad del problema sin cubrir.

**Cambio al framework (constitution D.12 + commands/prototype.md + checklists/uxui.md):**
siempre que un prototipo o design-identity incluya animacion real (no solo hover/fade)
o gestos (drag, swipe, momentum), activar `emil-design-eng` y `apple-design` juntas,
nunca una sola.

### Cambios
- constitution D.12: anadida evidencia y regla de combinar ambas skills de motion.
- commands/prototype.md: nuevo paso 3, activa ambas skills de motion cuando aplique.
- checklists/uxui.md: item 7 ahora verifica contra ambas skills cuando hay animacion real.

### Pendiente (actualizado)
- [x] Piloto con LegoVirtualMuseum y retro posterior — ver arriba. Sigue en curso el
  resto del pipeline (`/prd-lite` en adelante).
- [ ] Integracion Kanvas.
- [ ] Primer design system reutilizable extraido de un proyecto real.

## [0.1.0] — 2026-07-26

### Fundacion
- Constitution v0.1 (16 principios en 5 bloques: evidencia, proceso, calidad tecnica, diseno, comunicacion).
- 8 comandos: spec-init, prd-lite, specify, prototype, design-system, plan, tasks, quality-gate.
- Plantillas: prd-lite, spec, plan, tasks, design-identity, adr, comunicacion.
- Checklists: seguridad (10 items), performance (8), UX/UI (9).
- Guia de usuario y estructura de vault documental.

### Decisiones de diseno (origen: lecciones del piloto E2E anterior)
- 1 revision de quality gate por defecto; extras solo bajo peticion explicita (antes: sin criterio de parada).
- Revision ciega en sub-agente fresco, autoevaluacion no vinculante (evidencia: 3/3 rondas infladas).
- Requisitos criticos RC-XX con trazabilidad obligatoria a requisito tecnico verificable (caso EXIF).
- Prototipo HTML autocontenido como gate visual barato previo a implementacion.
- Identidad de diseno por proyecto gobierna a las skills, prohibido look generico.
- Integracion Kanvas diferida; formato de tasks compatible.

### Pendiente
- [ ] Piloto con LegoVirtualMuseum y retro posterior.
- [ ] Integracion Kanvas.
- [ ] Primer design system reutilizable extraido de un proyecto real.
