# Checklist de estrategia de test

**Activación:** obligatoria en X2 y X3; recomendada en X1. En etapa Boceto no aplica.
**Aplicación:** cada ítem se convierte en requisito con ID, o se marca `N/A` con razón escrita.

## Estrategia

1. **Declarada en la spec, no improvisada:** qué capas se prueban (unidad, integración, extremo a extremo), con qué herramientas y qué se deja deliberadamente sin automatizar. Decidir no probar algo es legítimo; no haberlo pensado, no.
2. **Proporcional a la etapa.** Un MVP no necesita cobertura alta: necesita que **lo que destruye el valor** esté cubierto. Perseguir un porcentaje global de cobertura es la forma más común de gastar tiempo de test en el sitio equivocado.

## Qué se prueba sí o sí

3. **Todo `RC-XX` con test automatizado** en X2+. Es la traducción operativa de constitution A.2: un requisito crítico verificado a mano se deja de verificar a la tercera vez que alguien tiene prisa.
4. **Rutas críticas con test de integración:** autenticación, autorización (incluido el intento de acceso a recursos ajenos), subida y procesado de archivos, pagos, y borrado de cuenta.
5. **Un test extremo a extremo del flujo principal**, usable además como comprobación de humo tras cada despliegue.
6. **Los criterios Given/When/Then de la spec se traducen 1:1 a tests.** Si un criterio no se puede traducir, está mal escrito: vuelve a la spec.

## Calidad de los tests

7. **Datos de prueba sintéticos.** Nunca datos personales reales en fixtures, capturas ni entornos de prueba.
8. **Tests deterministas.** Un test que falla de forma intermitente se arregla o se elimina; tolerarlo entrena a ignorar los fallos.
9. **Se prueba el comportamiento, no la implementación.** Un test que se rompe con cada refactor sin que cambie el comportamiento es un impuesto, no una red.
10. **Casos límite y de error**, no solo el camino feliz: entrada vacía, entrada enorme, caracteres especiales, sin permisos, dependencia caída.

## Proceso

11. **Ejecución en local y en CI** antes de integrar a la rama principal, cuando exista CI.
12. **Regresión:** todo defecto corregido deja un test que lo cubre. Sin excepción — es el único mecanismo que impide que el mismo error vuelva.
13. **Evidencia registrada** en la tarea correspondiente: comando ejecutado y resultado (constitution A.3).
