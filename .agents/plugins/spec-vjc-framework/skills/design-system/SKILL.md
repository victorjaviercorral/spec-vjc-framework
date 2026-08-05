---
name: design-system
description: Skill para gestionar y crear sistemas de diseño y prototipos usando la integración híbrida con Google Stitch.
---

# design-system Skill (Google Stitch Workflow)

Este skill define cómo el agente de Antigravity colabora con el usuario para crear una identidad visual, apoyándose en **Google Stitch** (stitch.withgoogle.com) para la generación iterativa de UI.

## Paso 0 — Identidad Base
El agente debe asegurarse de que existe el archivo `docs/03-diseno/design-identity.md` y `docs/03-diseno/brand.md`.
Si no existe `brand.md`, debes guiar al usuario para generarlo.
`brand.md` define el **Criterio antes que los tokens**:
- Personalidad en 3 adjetivos
- Voz del copy
- Presupuesto de acento (cuántos momentos fuertes de color)
- Reglas de composición y lista de prohibiciones.

## Paso 1 — Generación de Master Prompt para Google Stitch
En lugar de escribir `tokens.css` a ciegas, vas a preparar el terreno para Google Stitch:
1. Basado en `brand.md`, redacta un "Master Prompt" descriptivo en lenguaje natural (ej: "A mobile web app dashboard with a clean, dark mode aesthetic, deep blue background, bright neon accents, rounded corners, and a dense information layout...").
2. Si es necesario, utiliza la herramienta `generate_image` de Antigravity para crear 1 o 2 mockups iniciales o "vibe checks" y preséntaselos al usuario.
3. Instruye al usuario a ir a [Google Stitch](https://stitch.withgoogle.com/), subir la imagen generada (si aplica) y usar el "Master Prompt" redactado.

## Paso 2 — Iteración Visual Externa
El usuario iterará en el canvas de Stitch hasta obtener un componente o layout que cumpla con los requisitos visuales.
Pide al usuario que exporte el código de Stitch (React, HTML/CSS, Tailwind) y lo deposite en una carpeta temporal, o que pegue el código directamente aquí.

## Paso 3 — Ingestión y Refactorización Autónoma
Una vez que el código de Stitch ingresa al proyecto, el trabajo fuerte del agente comienza:
- **Refactorización**: Stitch a menudo genera código presentacional duro. Debes desglosarlo en componentes modulares, extraer los valores estáticos a un `tokens.css` o al sistema de diseño del framework objetivo (ej. tailwind.config.js).
- **Regla del Motion (F.26-bis)**: Revisa el CSS generado. Si Stitch usó transiciones genéricas (`all 0.3s ease`), refactorízalas para usar curvas con nombre (ej. rebote, entrada) y asegúrate de que el motion se siente físico y responsivo.
- **Sombra en Capas**: Si Stitch usó sombras simples (`box-shadow: 0 4px 6px rgba(0,0,0,0.1)`), transfórmalas en sombras multicapa para mayor profundidad.
- **Lógica**: Conecta el código estático de UI al backend/store de datos del proyecto real.

## Reglas
- **Prohibido el aspecto genérico**. 
- Todo componente heredado de Stitch debe revisarse para cumplir con los contrastes de accesibilidad (AA) descritos en el framework original.
- Cierra este flujo actualizando el archivo `docs/03-diseno/components.md` documentando la anatomía de los componentes importados y generados.
