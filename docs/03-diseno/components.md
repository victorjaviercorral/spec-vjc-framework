# Sistema de Diseño: Componentes y Utilidades

Basado en la ingestión del código de Google Stitch (Tailwind + Glassmorphism).

## 1. Sistema Espacial y Layout
- **Split Screen:** El layout principal (`.md:flex-row`) se divide en 50/50. 
  - Izquierda (`#narrative-pane`): Scrollable (`overflow-y-auto`), con padding alto para lectura cómoda.
  - Derecha (`#visualizer-container`): Estático/Sticky, actúa como *canvas* de simulación.

## 2. Superficies (Glassmorphism)
Clase utilitaria CSS: `.glass-panel`
- **Fondo:** `rgba(24, 24, 27, 0.8)` (Oscuro translúcido).
- **Blur:** `backdrop-filter: blur(12px)`.
- **Borde:** `1px solid #27272A` (Bordes sutiles para delimitar sin cargar visualmente).
- **Sombra Multicapa (Hover):** Efecto de *glow* exterior heredado de `app.css` combinado con `box-shadow` multicapa puro.

## 3. Topografía (Tipografía)
- **Titulares:** Plus Jakarta Sans (`font-headline-*`). Usado para el impacto visual y secciones grandes.
- **Cuerpo:** Plus Jakarta Sans (`font-body-*`). Textos legibles.
- **Data/Código:** JetBrains Mono (`font-code-sm`). Usado exclusivamente para snippets, etiquetas, o puntuaciones técnicas (ej. `[PENDIENTE]`, puntuaciones del Quality Gate).

## 4. Animaciones y Físicas (F.26-bis)
Las transiciones por defecto de Tailwind (`duration-500 ease-in-out`) fueron sustituidas por curvas físicas:
- **Rebote suave:** `cubic-bezier(0.34, 1.56, 0.64, 1)` (clase `.ease-out-bounce`). Usado al inyectar nuevos simuladores en el DOM.
- **Entrada lateral:** `@keyframes slideInRight` inyectada en módulos dinámicos (`.animate-module`).

## 5. Módulos Inyectados
Documentados en `simulators.js`:
- **Evidencia (Mock Chat):** Burbujas de chat contrastadas (Usuario alineado a la derecha, Agente grisáceo, Sistema en Rojo `#EF4444`).
- **Prisma de /expand:** Grid `grid-cols-2` con tarjetas *glass-panel*.
- **Quality Gate:** Reporte ciego con tabla semántica (PASS/FAIL) y veredicto destacado.
- **Matriz de Riesgo:** Filas apiladas con efecto *hover* y *glow* en el nivel activo (X2).
