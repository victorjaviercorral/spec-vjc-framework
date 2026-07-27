---
description: Ejecuta una tarea del plan con disciplina de spec: lee su sección, implementa, verifica de verdad y registra la evidencia. Gobierna la fase donde más deriva introduce un agente.
argument-hint: [task-id | next]
---

# /implement

Implementa **una** tarea (o la siguiente pendiente cuyas dependencias estén satisfechas si el argumento es `next` o está vacío).

## Paso 0 — Precondiciones
1. Lee `docs/00-proyecto/project.md` (etapa, exposición, entorno objetivo) y `${CLAUDE_PLUGIN_ROOT}/constitution.md`.
2. Localiza la tarea en `docs/05-plan/tasks.md`. Si no existe `tasks.md`:
   - Etapa Boceto o Prototipo: es normal. Trabaja directamente contra el PRD corto o el prototipo y salta al paso 2, pero **conserva el paso 4** (verificación con evidencia).
   - Etapa MVP o Producto: detente y pide `/plan` + `/tasks`.
3. Verifica dependencias: si la tarea depende de otra no verificada, dilo y propón la correcta.
4. Carga el contexto mínimo suficiente: **la sección de la spec que la tarea referencia por número** (literal, no de memoria), la definición de hecho de su fase, y solo las checklists activas para esa fase y exposición. No cargues el árbol documental entero.

## Paso 1 — Contrato antes de escribir
Enuncia en 3 líneas: qué vas a implementar, qué requisitos cubre (IDs) y cómo se va a verificar. Si al leer la spec detectas contradicción, ambigüedad o hueco:
**PARA.** No improvises la decisión de producto. Propón la corrección y tramítala con `/amend` (constitution D.21). La spec manda sobre el código.

## Paso 2 — Implementar
- Ajústate al alcance de la tarea. Trabajo adyacente "que ya que estamos" no entra: se anota como tarea nueva.
- Sigue las convenciones del código existente (nomenclatura, estructura, densidad de comentarios).
- Aplica las checklists activas de la fase. En rutas sensibles (autenticación, pagos, permisos de base de datos, CI/CD, dependencias nuevas) marca el diff para revisión humana explícita antes de continuar (constitution E.25).
- Secretos: solo variables de entorno, en toda etapa y exposición, sin excepción.

## Paso 3 — Verificar de verdad
Ejecuta el criterio de verificación de la tarea en el entorno objetivo. Ejecutar significa correr el comando o el test, no razonar sobre lo que pasaría.
- Si hay test: escríbelo y córrelo. En X2+, todo `RC-XX` requiere test automatizado.
- Si es visual: captura o descripción de lo comprobado en el navegador.
- Si falla: arréglalo y vuelve a ejecutar. **Nunca marques como hecha una tarea con la verificación en rojo**, y nunca describas como verificado algo que no has ejecutado (constitution A.3).

## Paso 4 — Registrar evidencia
Actualiza la fila de la tarea en `tasks.md`: estado `verificada` y columna **Evidencia** con el comando ejecutado y el resultado resumido (`pytest tests/test_exif.py::test_gps_stripped → 1 passed`). Sin evidencia, el estado máximo es `hecha`, nunca `verificada`.

## Paso 5 — Cerrar
- Commit convencional con el ID de tarea: `feat(upload): elimina EXIF al subir imagen [LVM-07]`.
- Si esta tarea cierra una fase: repasa la definición de hecho de la fase, ejecuta las checklists pendientes de esa fase y —si es fase mayor y la etapa es MVP+— genera la pieza en `docs/07-comunicacion/`.
- Informa del progreso contra el presupuesto de la etapa. Si el presupuesto se está agotando y quedan tareas, dilo claramente y plantea recortar alcance, no estirar el plazo (constitution B.7).

## Regla de una tarea por invocación
Una invocación, una tarea. Encadenar tareas sin verificación intermedia es exactamente el modo de fallo que este comando existe para impedir.
