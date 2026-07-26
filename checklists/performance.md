# Checklist de performance (presupuestos por defecto, ajustables en la spec)

1. Lighthouse >= 90 en Performance y Accessibility (movil).
2. LCP < 2.5s en conexion 4G simulada.
3. Presupuesto JS inicial: definir cifra en la spec (orientativo < 200KB gzip para MVPs web).
4. Imagenes: formatos modernos (webp/avif), lazy loading fuera de viewport, tamanos servidos acordes al contenedor.
5. Sin bloqueo de render por fuentes: `font-display: swap` o equivalente.
6. Listas largas: paginacion o carga incremental definida en la spec (no "ya se vera").
7. Animaciones: solo propiedades componibles (transform, opacity); 60fps; respetar `prefers-reduced-motion`.
8. Medicion real: tarea explicita en el plan para medir en el entorno de despliegue, no solo en local.
