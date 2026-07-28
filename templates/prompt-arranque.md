# Prompt de arranque — Spec VJC Framework

Prompt común a **cualquier** proyecto. La parte fija no se toca; solo se rellena el bloque de datos. Copiar entero en una sesión nueva de Claude Code, abierta en la carpeta del repo del proyecto.

Los campos que no sepas, déjalos como `[PENDIENTE]`: el framework los resolverá. **No los inventes** — el principio A.1 aplica también a ti.

Cuantos más campos rellenes, menos preguntas gasta el framework de su presupuesto de 8 (principio B.6-bis). Lo que dejes en blanco y sea una **decisión** te lo propondrá marcado como `[ASUMIDO: …]` para que lo confirmes o lo corrijas; lo que sea un **dato** se quedará como `[PENDIENTE]` hasta que lo averigües.

---

## Copiar desde aquí

````markdown
Vas a arrancar un proyecto bajo el **Spec VJC Framework v1.2**, instalado como plugin en Claude Code.

## Antes de nada

1. Lee `${CLAUDE_PLUGIN_ROOT}/constitution.md` y `${CLAUDE_PLUGIN_ROOT}/docs/modelo.md` completos, y cúmplelos.
2. Confirma en una línea qué has entendido que gobierna cada eje. Si algo del bloque de datos contradice la constitution, dilo antes de empezar.

## Datos del proyecto

```yaml
nombre:            # nombre del proyecto
slug:              # kebab-case, se usará en las propiedades YAML
repo:              # url o "local"
una_frase:         # qué es esto, en una frase

# EJE 1 — ETAPA (cuánta definición merece)
etapa:             # boceto | prototipo | mvp | producto
presupuesto:       # fecha límite concreta, ej. "3 semanas, hasta 2026-08-17"
por_que_esta_etapa:

# EJE 2 — EXPOSICIÓN (a qué te expones)
lo_ve_alguien_mas:        # sí/no — ¿se despliega en internet?
recoge_datos_personales:  # sí/no — cuentas, email, contenido subido, analítica identificable
dinero_menores_sensibles: # sí/no — pagos, menores, salud/biometría/ideología
ia_de_cara_al_usuario:    # sí/no
jurisdiccion_usuarios:    # ej. "UE (España)"

# ENTORNO
desarrollo:        # SO + runtime, ej. "Windows 11, Node 22"
despliegue:        # proveedor y región, o [PENDIENTE]
stack_previsto:    # o [PENDIENTE]

# DISEÑO (si etapa >= prototipo)
personalidad:      # 3 adjetivos
referencias:       # qué te gusta visualmente
evitar:            # qué NO quieres
modo:              # claro | oscuro | ambos
tono_copy:
design_system:     # ninguno | nombre en design-systems/

# CONTEXTO PREVIO (opcional)
material_existente:  # rutas a documentos, PRDs heredados, investigación previa
```

## Qué quiero que hagas

1. **Clasifica y confirma.** Con los datos de arriba, determina etapa y exposición (X0-X3) según `docs/modelo.md`. Dime el resultado, los módulos de cumplimiento que activa y **qué comandos voy a recorrer**. Si mi etapa propuesta no encaja con lo que describo, discrepa y explica por qué.

2. **Ejecuta `/spec-init <nombre>`.** No repitas las preguntas cuyo dato ya esté en el bloque; pregunta solo lo que falte o esté como `[PENDIENTE]`.

3. **Para y espera mi confirmación** antes de pasar al siguiente comando de la ruta. No encadenes la ruta entera de una vez.

## Reglas de esta sesión

- **No inventes un dato.** Un dato, una métrica, una fuente o una obligación legal que falte va como `[PENDIENTE: qué falta y cómo obtenerlo]`. Nunca como asunción.
- **Sí puedes proponer una decisión** marcada `[ASUMIDO: <decisión> | <razón> | <riesgo si me equivoco>]`, y yo la confirmo o la corrijo. La frontera es si el hueco se resuelve eligiendo o averiguando.
- **Máximo 8 preguntas en todo el flujo de definición.** Redacta el borrador completo antes de preguntar nada y agrupa las preguntas en un único bloque al final, ordenadas por impacto y con opción por defecto.
- **Respeta la regla del 20%**: la definición no supera el 20% del presupuesto. Avísame si nos acercamos.
- **Proporcionalidad (bloque B)**: no produzcas ningún artefacto que mi etapa no exija, aunque "pueda venir bien".
- **La exposición manda en cumplimiento** aunque la etapa sea baja. Si mi combinación obliga a algo caro, dímelo pronto y plantéame bajar la exposición como alternativa.
- Al terminar cada comando, dime **el siguiente paso concreto** y qué decisión necesito tomar.
````

## Hasta aquí

---

## Variante corta (Boceto · X0)

Para algo desechable y privado, el prompt completo es sobre-proceso. Basta con:

````markdown
Arranca un proyecto con el **Spec VJC Framework v1.2** (lee `${CLAUDE_PLUGIN_ROOT}/constitution.md` antes).

- Nombre: <nombre>
- Etapa: **boceto** · Exposición: **X0** (privado, solo yo)
- Presupuesto: <1 día>
- Entorno: <SO + runtime>
- Qué es: <una frase>

Ejecuta `/spec-init` en modo mínimo: dos preguntas, crea solo `project.md` y a construir. Sin PRD, sin spec, sin gates. Única regla dura: secretos en variables de entorno.
````

---

## Continuación en sesiones posteriores

Los proyectos no caben en una sesión. Para retomar:

````markdown
Continúo el proyecto <nombre> con el **Spec VJC Framework v1.2**.

1. Lee `${CLAUDE_PLUGIN_ROOT}/constitution.md`, `docs/00-proyecto/project.md` y el último artefacto producido.
2. Dime en 3 líneas: dónde estamos, qué queda de presupuesto y cuál es el siguiente comando.
3. Si hay tareas en `tasks.md`, ejecuta `/implement next`. Una tarea por invocación.

No des por hecho nada que no esté escrito en los artefactos.
````
