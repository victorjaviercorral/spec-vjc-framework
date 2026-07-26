# Constitution — Spec VJC Framework v0.1

Principios inmutables. Aplican a todo proyecto gestionado con este framework y a toda sesion de agente. Ningun comando, skill o preferencia puntual puede contradecirlos. Los cambios a este documento requieren bump de version y entrada en CHANGELOG.

## A. Verdad y evidencia

1. **No inventar.** Si falta un dato, se marca `[PENDIENTE: <que falta y como obtenerlo>]`. Nunca se rellena con un valor plausible. Aplica a metricas, evidencia, requisitos y resultados de tests.
2. **Trazabilidad evidencia -> requisito.** Todo requisito de la spec referencia su origen (evidencia del PRD-lite, hallazgo, decision ADR). Los requisitos criticos de negocio (seguridad, privacidad, diferenciales de valor) NUNCA se expresan solo como narrativa: bajan a requisito tecnico verificable. Caso de referencia a no repetir: la limpieza EXIF/GPS diluida en "anonimato" durante el piloto anterior.
3. **Texto plano versionable.** Todos los artefactos son Markdown en el repo/vault del proyecto. El vault de Obsidian es la fuente unica de verdad documental; el codigo, la fuente de verdad tecnica.

## B. Proceso y parada

4. **Spec antes que codigo. PRD-lite antes que spec.** No se implementa nada sin spec aprobada; no se especifica nada sin PRD-lite aprobado.
5. **Criterios de parada definidos ANTES de empezar cada gate.** Por defecto: 1 unica revision de quality gate. Rondas adicionales (maximo 2) solo si el usuario las solicita explicitamente. Banda de avance: PASS o CONDICIONAL >= 6.5 permite avanzar en tier ligero; en tier medio/completo se exige >= 7.
6. **Revision ciega, no autoevaluacion.** El quality gate lo ejecuta un sub-agente fresco sin acceso a la autoevaluacion del autor. La autoevaluacion es informativa, nunca vinculante (evidencia del piloto: 3/3 rondas infladas).
7. **Profundidad escalable por riesgo (tiers).** `/spec-init` clasifica el proyecto:
   - **Ligero:** builder = usuario principal, sin stakeholders externos, sin datos sensibles de terceros. Proceso minimo.
   - **Medio:** usuarios externos reales o datos de terceros. Se anaden research ligero y gate a >= 7.
   - **Completo:** multiples stakeholders o mercado incierto. Discovery formal (fuera del alcance v0.1; usar el pipeline anterior si se da el caso).

## C. Calidad tecnica (no negociable en implementacion)

8. **Seguridad por defecto.** Checklist `checklists/security.md` obligatoria en /specify y /plan: secretos solo en variables de entorno, rate limiting en APIs publicas, validacion de inputs, RLS/permisos en base de datos, sanitizacion de contenido subido por usuarios, dependencias auditadas.
9. **Performance con presupuesto.** Checklist `checklists/performance.md`: objetivos Lighthouse >= 90, presupuesto de bundle y de imagenes definidos en la spec, no despues.
10. **Contratos ruidosos.** Toda etapa que consume el output de otra valida el formato y falla con mensaje explicito. Prohibida la perdida silenciosa de datos.
11. **Tooling probado en el entorno real.** Windows + version actual del runtime. Ningun script se da por bueno sin smoke test en destino.

## D. Identidad y diseno

12. **Identidad visual propia por proyecto.** Cada proyecto define su `design-identity.md` en /spec-init. Prohibido el look generico por defecto (gradientes violeta, glassmorphism de plantilla, tipografia por defecto). Las skills de diseno (ui-ux-pro-max, taste-skill u otras) se usan como motor, pero la identidad del proyecto las gobierna, no al reves.
13. **Design system como activo reutilizable.** Los componentes y tokens generados con /design-system se persisten en `design-systems/<nombre>/` del framework para reutilizacion en futuros proyectos. Un proyecto puede partir de un design system existente y extenderlo (override), nunca duplicarlo.
14. **Prototipo antes de implementacion.** /prototype genera un HTML autocontenido navegable para validar propuesta visual y flujo principal antes de escribir la implementacion real. Gate humano visual: mas barato descartar un HTML que una implementacion desplegada.

## E. Comunicacion y conocimiento

15. **Cada entregable con su pieza de comunicacion.** Al cerrar cada fase mayor se genera un resumen comunicable en `07-comunicacion/` del vault del proyecto (materia prima para docs publicas y LinkedIn).
16. **Retro con disparo manual.** Las retrospectivas se ejecutan solo por invocacion explicita. Las lecciones generalizables se destilan al framework via CHANGELOG + propuesta de cambio a esta constitution.
