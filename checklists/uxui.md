# Checklist UX/UI (aplicar en /prototype y fases de UI del plan)

1. Identidad del proyecto gobierna las skills de diseno, no al reves (constitution D.12).
2. Tokens primero: cero valores en crudo en componentes.
3. Estados completos en cada vista: vacio, carga, error, exito.
4. Jerarquia visual clara: una accion primaria por vista.
5. Accesibilidad: contraste AA, foco visible, navegacion por teclado en flujos principales, alt en imagenes.
6. Responsive verificado en movil real o viewport 380px.
7. Microinteracciones con proposito (feedback de accion), coherentes en timing y easing en toda la app. Si hay animacion o gesto real (no solo hover/fade), verificar contra `emil-design-eng` (easing propio, <300ms en UI, transform/opacity only, reduced-motion que atenua en vez de eliminar) Y `apple-design` (manejo directo 1:1, interrumpibilidad, momentum/rubber-banding en drags) — las dos, no una sola.
8. Copys revisados con el tono definido en design-identity (sin placeholder lorem en entregas).
9. Coherencia: mismo componente para el mismo problema en toda la app (sin variantes accidentales).
