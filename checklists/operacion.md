# Checklist de operación, despliegue y observabilidad

**Activación:** X1 los ítems marcados `[mín]` · X2 y X3, todos.
**Aplicación:** cada ítem se convierte en requisito con ID, o se marca `N/A` con razón escrita.

## Entornos y despliegue

1. `[mín]` **Entornos definidos:** como mínimo local y producción. Preview por rama si el proveedor lo ofrece sin coste.
2. `[mín]` **Despliegue reproducible** con un comando único o por push a git, documentado en el repo. Si solo sabe desplegarlo quien lo montó, no está desplegado: está sostenido.
3. `[mín]` **Variables de entorno por entorno**, documentadas en un `.env.example` sin valores reales.
4. **Esqueleto desplegado desde el día uno** (constitution G.29): el pipeline se valida cuando cambiarlo es barato.
5. **Reversión en menos de 10 minutos**, por procedimiento escrito y **ejecutado una vez** antes del lanzamiento. Un rollback no probado es una intención.
6. **Migraciones de base de datos versionadas y reversibles**, probadas contra una copia de datos realista antes de aplicarse en producción.

## Observabilidad

7. `[mín]` **Seguimiento de errores** activo (Sentry o equivalente), recibiendo eventos de verdad: se provoca uno de prueba y se comprueba que llega.
8. `[mín]` **Alerta con destinatario real** para errores nuevos y para caídas. Una alerta que nadie recibe es un panel decorativo.
9. **Logs estructurados y sin datos personales**, con nivel adecuado y suficiente contexto para reconstruir un incidente (identificador de petición, no identidad de persona).
10. `[mín]` **Comprobación de disponibilidad externa** sobre el endpoint principal, desde fuera de tu infraestructura.
11. **Métricas de producto instrumentadas** según el plan de medición de la spec: las del Go/No-Go tienen que estar disparando antes de lanzar, no después.

## Continuidad

12. **Copias de seguridad automáticas** con frecuencia declarada y retención definida.
13. **Restauración probada al menos una vez** antes del lanzamiento. Una copia de seguridad no restaurada nunca es una hipótesis, no un respaldo. **Bloqueante en X2+.**
14. **Dependencias externas con modo degradado definido:** qué ve el usuario si cae la base de datos, el proveedor de autenticación o el de almacenamiento. Un error genérico está bien si es una decisión; el fallo silencioso, no.
15. **Objetivo de disponibilidad declarado** y proporcionado a la etapa. Un MVP personal puede asumir varias horas de caída; declararlo evita fingir después.

## Coste y mantenimiento

16. `[mín]` **Presupuesto mensual estimado y alerta de facturación** configurada en cada proveedor de pago.
17. **Cadencia de actualización de dependencias** declarada (por ejemplo mensual, más los parches de seguridad en cuanto salen).
18. **Plan de fin de vida** para el proyecto: si se apaga, cómo se avisa a los usuarios, cómo exportan su contenido y cómo se borran sus datos personales. Obligatorio en X2+ aunque nunca llegue a usarse: el día que se decida apagar, no habrá tiempo de improvisarlo.
