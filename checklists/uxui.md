# Checklist UX/UI

**Activación:** etapa Prototipo en adelante. Se aplica en `/prototype` y en las fases de interfaz del plan.
**Accesibilidad:** no se cubre aquí. Es obligación propia con su checklist: `checklists/accesibilidad.md`.

## Identidad y sistema

1. **La identidad del proyecto gobierna a las skills de diseño**, nunca al revés (constitution F.26). Si el resultado podría ser de cualquier otro producto, está mal.
2. **Tokens primero:** cero valores en crudo en los componentes. Color, espaciado, tipografía, radios, sombras y timings salen del sistema.
3. **Coherencia:** el mismo problema se resuelve con el mismo componente en toda la aplicación. Las variantes accidentales son deuda visual y se eliminan al detectarlas.

## Estructura de cada vista

4. **Una acción primaria por vista**, visualmente inequívoca. Si hay dos, decide cuál manda.
5. **Estados completos:** vacío, carga, error y éxito. El estado vacío es una oportunidad de producto, no un hueco; el de error debe decir qué pasó y qué hacer.
6. **Jerarquía visual que refleje la importancia real** del contenido, no la comodidad de implementación.
7. **Responsive verificado a 380px** en dispositivo o viewport real, no solo redimensionando el escritorio.

## Interacción

8. **Feedback inmediato** de toda acción del usuario: estado de carga en operaciones de más de 300ms, confirmación de las que tienen efecto, y posibilidad de deshacer en las destructivas.
9. **Microinteracciones con propósito**, coherentes en timing y easing en toda la aplicación. La animación que no comunica nada, sobra. **Si hay animación o gesto real** (no solo hover/fade — drag, swipe, momentum), verifica que se aplicaron juntas `emil-design-eng` (easing propio, <300ms en UI, solo `transform`/`opacity`, `reduced-motion` que atenúa en vez de eliminar) **y** `apple-design` (manejo directo 1:1, interrumpibilidad, momentum/rubber-banding en drags) — las dos, no una sola (constitution F.26-bis).
10. **Las acciones destructivas piden confirmación** y describen la consecuencia concreta ("se borrarán 42 fotos"), no una genérica.

## Contenido

11. **Copy con el tono definido** en `design-identity.md`. Sin lorem ipsum en ninguna entrega: el texto falso esconde problemas de producto.
12. **Mensajes de error en lenguaje humano**, orientados a la salida: qué ha pasado y qué puede hacer la persona. Nunca códigos internos ni jerga del sistema.
13. **Los textos se revisan como se revisa el código.** El copy es interfaz.
