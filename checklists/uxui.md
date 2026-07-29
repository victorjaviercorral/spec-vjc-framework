# Checklist UX/UI

**Activación:** etapa Prototipo en adelante. Se aplica en `/prototype` y en las fases de interfaz del plan.
**Accesibilidad:** no se cubre aquí. Es obligación propia con su checklist: `checklists/accesibilidad.md`.

## Identidad y sistema

1. **La identidad del proyecto gobierna a las skills de diseño**, nunca al revés (constitution F.26). Si el resultado podría ser de cualquier otro producto, está mal.
2. **Tokens primero:** cero valores en crudo en los componentes. Color, espaciado, tipografía, radios, sombras y timings salen del sistema.
3. **Coherencia:** el mismo problema se resuelve con el mismo componente en toda la aplicación. Las variantes accidentales son deuda visual y se eliminan al detectarlas.
4. **Criterio antes que tokens** (constitution F.26-ter): existe un `brand.md` (o la sección de identidad equivalente) con presupuesto de acento y reglas de composición, escrito antes que `tokens.css`. Si el acento aparece sin límite declarado, no dirige la mirada — decora.
5. **Sombras en capas, nunca una sola sombra plana.** Un `box-shadow` de una sola capa con blur único en cualquier componente es hallazgo directo.
6. **Ninguna curva de easing por defecto del navegador** (`ease`, `ease-in-out`, `linear` sin declarar) en transiciones. Toda curva tiene nombre y propósito en el sistema de tokens.
7. **Si existe `design-systems/<nombre>/showcase.html`, se ha abierto y mirado en el navegador**, no solo leído `tokens.css` y `components.md`. Un sistema aprobado solo en prosa no pasa este punto.

## Estructura de cada vista

8. **Una acción primaria por vista**, visualmente inequívoca. Si hay dos, decide cuál manda.
9. **Estados completos:** vacío, carga, error y éxito. El estado vacío es una oportunidad de producto, no un hueco; el de error debe decir qué pasó y qué hacer.
10. **Jerarquía visual que refleje la importancia real** del contenido, no la comodidad de implementación.
11. **Responsive verificado a 380px** en dispositivo o viewport real, no solo redimensionando el escritorio.

## Interacción

12. **Feedback inmediato** de toda acción del usuario: estado de carga en operaciones de más de 300ms, confirmación de las que tienen efecto, y posibilidad de deshacer en las destructivas.
13. **Microinteracciones con propósito**, coherentes en timing y easing en toda la aplicación. La animación que no comunica nada, sobra. **Toda transición o entrada usa un token de motion con nombre** (no un valor suelto ni el easing por defecto). **Si hay animación o gesto real** (no solo hover/fade — drag, swipe, momentum), verifica que se aplicaron juntas `emil-design-eng` (easing propio, <300ms en UI, solo `transform`/`opacity`, `reduced-motion` que atenúa en vez de eliminar) **y** `apple-design` (manejo directo 1:1, interrumpibilidad, momentum/rubber-banding en drags) — las dos, no una sola (constitution F.26-bis).
14. **Todo elemento interactivo tiene estado de presión** (tactile): un token de escala sutil al pulsar, no solo hover.
15. **Las acciones destructivas piden confirmación** y describen la consecuencia concreta ("se borrarán 42 fotos"), no una genérica.

## Contenido

16. **Copy con el tono definido** en `design-identity.md`. Sin lorem ipsum en ninguna entrega: el texto falso esconde problemas de producto.
17. **Mensajes de error en lenguaje humano**, orientados a la salida: qué ha pasado y qué puede hacer la persona. Nunca códigos internos ni jerga del sistema.
18. **Los textos se revisan como se revisa el código.** El copy es interfaz.
