# Brand Identity: Spec VJC Framework

## 1. Personalidad
- **Potente:** Transmite autoridad, solidez técnica y control.
- **Interactiva / Didáctica:** Explica conceptos abstractos (agentes, modelos, reglas) a través de la exploración visual, no con muros de texto.
- **Clara:** Reducción de ruido. Máximo contraste para legibilidad de datos técnicos.

## 2. Voz del Copy
- Directa, asertiva y técnica. Sin adornos de marketing. Hablamos de "disciplina", "cuellos de botella" y "evidencia".

## 3. Composición y Paleta (El Vibe)
- **Modo Oscuro Técnico:** Fondo profundo (`#0A0A0A` o `#111827`) que evoca un entorno de terminal o editor de código avanzado.
- **Superficies (Glassmorphism):** Paneles translúcidos sutiles con bordes de 1px semitransparentes para separar información sin cargar visualmente (ej. bento boxes).
- **Acentos Neón (Presupuesto de Acento):** Verde esmeralda brillante (`#10B981`) o Azul eléctrico (`#3B82F6`) reservado EXCLUSIVAMENTE para elementos interactivos, llamadas a la acción, o para iluminar la respuesta "correcta" frente a un error. No se usa para decoración vacía.

## 4. Tipografía
- **Headers/Display:** Fuente geométrica sans-serif (ej. Inter, Roboto o Plus Jakarta Sans) muy definida, en pesos fuertes (700-800).
- **Cuerpo y Código:** Fuente monoespaciada para pequeños *snippets* o etiquetas que imiten código, y sans-serif legible para párrafos descriptivos.

## 5. Prohibiciones Estrictas
- **NO forzar un modo por encima de la elección real del usuario.** [CORREGIDO — decisión revertida por el autor, 2026-08-06] Este documento decía originalmente "NO al modo claro deslumbrante", y esa regla se implementó literalmente forzando `dark` por JS en `ProductFramework.tsx`, ignorando el toggle de tema real del resto del sitio (`useTheme`, persistido en `localStorage`). Un usuario con Claro seleccionado desde Home veía la página ponerse en negro sin haberlo pedido. El autor corrigió esto explícitamente: la página debe seguir siempre la selección real del usuario, nunca imponer una propia. El modo oscuro sigue siendo el diseño de referencia (paleta pensada primero para oscuro), pero ahora existe una variante clara genuina (`--fw-*` en `src/index.css`, con valores propios en `:root` y `.dark`) en vez de un modo claro no implementado detrás de una prohibición de facto.
- **NO a las animaciones genéricas:** Toda animación (`hover`, `scroll`) debe sentirse física, con curvas de aceleración deliberadas.
- **NO a muros de texto:** Si se puede explicar con una tarjeta o un diagrama interactivo, no se escribe un párrafo.
