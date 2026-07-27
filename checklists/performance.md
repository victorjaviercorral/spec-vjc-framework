# Checklist de performance

**Activación:** X1, X2 y X3. Presupuestos por defecto, ajustables **en la spec** y siempre antes de medir, nunca después.

## Presupuestos

1. **Lighthouse móvil ≥ 90** en Performance. (Accesibilidad tiene su propia checklist y su propio umbral.)
2. **Core Web Vitals** sobre el despliegue real: **LCP < 2,5s** · **INP < 200ms** · **CLS < 0,1**.
3. **Presupuesto de JavaScript inicial** con cifra concreta en la spec (orientativo: < 200KB comprimido para un MVP web).
4. **Presupuesto de peso total** de la vista principal, además del de JS. Es el número que de verdad nota el usuario con mala conexión.

## Entrega

5. **Imágenes:** formatos modernos (webp/avif), dimensiones servidas acordes al contenedor, `lazy` fuera del viewport, y `width`/`height` declarados para no provocar saltos de layout.
6. **Fuentes sin bloqueo de render:** `font-display: swap` o equivalente, subconjunto de caracteres, precarga solo de la fuente crítica.
7. **Sin recursos de terceros en la ruta crítica.** Cada script externo se justifica; los de analítica y widgets van diferidos y después del consentimiento.
8. **Caché y compresión** correctamente configuradas en el proveedor (inmutables con hash en el nombre, compresión activa).

## Comportamiento

9. **Listas largas con paginación o carga incremental** definida en la spec, no "ya se verá". Incluye el comportamiento con 10.000 elementos, no solo con 10.
10. **Consultas a base de datos con índice** para los accesos frecuentes; sin consultas N+1 en las vistas principales.
11. **Animaciones solo sobre propiedades componibles** (`transform`, `opacity`), a 60fps, respetando `prefers-reduced-motion`.

## Medición

12. **Medición sobre el despliegue real**, no en local: el local miente sistemáticamente a favor. Es ítem obligatorio de `/preflight`.
13. **Prueba en condiciones adversas:** conexión lenta simulada y dispositivo de gama media, que es donde vive buena parte de tus usuarios.
14. **Regresión de performance:** si el presupuesto se supera tras un cambio, es un defecto que se corrige, no un nuevo presupuesto que se acepta en silencio.
