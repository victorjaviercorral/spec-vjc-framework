# Guia de usuario — Spec VJC Framework v0.1

Paso a paso para gestionar un proyecto de principio a fin con el framework, en su estado actual (sin integracion Kanvas, prevista para una fase posterior).

## 0. Instalacion (una sola vez)

1. Publica este repo en GitHub (`victorjaviercorral/spec-vjc-framework`).
2. En Claude Code (app de escritorio), en cualquier proyecto:
   ```
   /plugin marketplace add victorjaviercorral/spec-vjc-framework
   /plugin install spec-vjc-framework@spec-vjc-framework
   ```
3. Verifica con `/help` que aparecen los comandos: `/spec-init`, `/prd-lite`, `/specify`, `/prototype`, `/design-system`, `/plan`, `/tasks`, `/quality-gate`.
4. Instala las skills de implementacion recomendadas (una vez):
   ```
   /plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
   /plugin install ui-ux-pro-max@ui-ux-pro-max-skill
   ```
   Opcional: taste-skill (leonxlnx/taste-skill) como segunda opinion de calidad frontend.

A partir de aqui, los comandos estan disponibles en TODOS los proyectos que abras en Claude Code. No se copia nada por proyecto.

## 1. Iniciar un proyecto nuevo

1. Crea el repo del proyecto en GitHub y clonalo (ej. `LegoVirtualMuseum`).
2. Abre esa carpeta en Claude Code.
3. Ejecuta `/spec-init <nombre>`. Responde el triaje de tier (3 preguntas) y la entrevista de identidad de diseno (5 preguntas).
4. Resultado: estructura `docs/` creada, `project.md` con tier y criterios de parada, `design-identity.md`.
5. Commit: `chore: spec-init del proyecto`.

La carpeta `docs/` del proyecto es la que abres (o vinculas) en Obsidian como vault documental del proyecto. Codigo y documentacion viajan juntos en git.

## 2. Definir (PRD-lite)

1. Ejecuta `/prd-lite`. Entrevista corta por bloques; confirma cada bloque antes de avanzar.
2. Presta especial atencion al bloque 5 (requisitos criticos RC-XX): ahi va todo lo que no puede diluirse.
3. Tier ligero: el quality gate es opcional. Si lo quieres: `/quality-gate prd`.
4. Aprueba el PRD-lite. Commit: `docs: prd-lite v0.1`.

## 3. Especificar

1. Ejecuta `/specify`. Revisa especialmente la tabla de trazabilidad: todo RC-XX debe tener requisito tecnico verificable.
2. El comando ejecuta `/quality-gate spec` automaticamente (1 revision ciega). Corrige los hallazgos que aceptes; documenta los que rechaces.
3. Si quieres una segunda revision, pidela explicitamente. Por defecto no se hace.
4. Aprueba la spec. Commit: `docs: spec v0.1 (gate: <veredicto>)`.

## 4. Prototipar (validacion visual barata)

1. Ejecuta `/prototype`. Genera `docs/04-prototipo/prototype.html`.
2. Abre el archivo en tu navegador. Evalua: identidad propia (no look generico), flujo principal completo, estados de error/vacio, responsive.
3. Pide ajustes si hacen falta (maximo 2 iteraciones) y aprueba.
4. Si el prototipo destapa un problema de fondo, se corrige la spec primero. Commit del prototipo aprobado.

Opcional en este punto: `/design-system crear <nombre>` para extraer tokens y componentes del prototipo como activo reutilizable en el repo del framework.

## 5. Planificar y trocear

1. Ejecuta `/plan`. Revisa que la Fase 0 (setup + seguridad + smoke test en Windows) este presente y que cada fase tenga definicion de hecho.
2. Aprueba el plan. Ejecuta `/tasks`. Revisa IDs, dependencias y que los RC-XX tengan verificacion dentro de su tarea.
3. Commit: `docs: plan + tasks v0.1`.

## 6. Implementar

1. Sesiones de Claude Code tarea a tarea, en orden de dependencias, empezando SIEMPRE por Fase 0.
2. En cada tarea: referencia la seccion de spec por numero, aplica las checklists de su fase, actualiza el estado en `tasks.md` y commit por tarea (o grupo pequeno).
3. Requisito critico terminado = su verificacion ejecutada y anotada, no solo el codigo escrito.

## 7. Comunicar y cerrar fase

1. Al cerrar cada fase mayor (spec aprobada, prototipo aprobado, v1 desplegada): genera la pieza en `docs/07-comunicacion/` con la plantilla del framework. Es la materia prima de las docs publicas y de LinkedIn; se redacta despues con la skill de comunicacion, sin acoplarla al ritmo del proyecto.
2. Retro solo por invocacion explicita (skill retro-implementacion). Las lecciones generalizables se proponen como cambio al framework: issue o commit en `spec-vjc-framework` + entrada en su CHANGELOG.

## Resumen del flujo

```
/spec-init  ->  /prd-lite  ->  /specify (+gate)  ->  /prototype  ->  /plan  ->  /tasks  ->  implementacion
     |               |                |                   |                                      |
  tier + design   RC-XX          trazabilidad        gate humano                        checklists + verificacion
```

## Que NO esta en v0.1 (diferido, decidido)
- Integracion con Kanvas (el formato de tasks.md ya es compatible con el futuro volcado).
- Tier completo con discovery formal (usar el pipeline anterior si surge el caso).
- Automatizacion de despliegue.
