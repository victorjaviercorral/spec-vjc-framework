# Checklist de privacidad y protección de datos (GDPR / ePrivacy)

**Activación:** obligatoria en X2 y X3. En X1, solo los ítems 11 y 12 (cookies y analítica).
**Aplicación:** cada ítem se convierte en requisito con ID, o se marca `N/A` con razón escrita. Sin terceras opciones.

> Esta checklist es una herramienta de diligencia técnica, no asesoramiento jurídico. En X3 (dinero, menores, datos de categoría especial) conviene validación legal profesional antes del lanzamiento.

## Mapa y minimización

1. **Mapa de datos personales.** Tabla en la spec: dato → finalidad → base legal (art. 6) → retención → dónde se almacena → quién accede. Todo dato recogido aparece aquí; lo que no aparezca, no se recoge.
2. **Minimización justificada.** Por cada campo personal, una frase de por qué es imprescindible para la finalidad. Los campos "por si acaso" se eliminan del modelo de datos, no se documentan.
3. **Categorías especiales (art. 9)** — salud, biometría, ideología, religión, orientación sexual, origen étnico: identificadas explícitamente. Si las hay, base legal reforzada, cifrado en reposo y DPIA obligatoria.
4. **Datos inferidos y metadatos** contemplados: dirección IP, huella de dispositivo, geolocalización, **metadatos EXIF/GPS de imágenes subidas**. Son datos personales aunque el usuario no los teclee.

## Bases legales y consentimiento

5. **Base legal por tratamiento**, no una global: consentimiento (6.1.a), contrato (6.1.b), interés legítimo (6.1.f, con ponderación escrita), obligación legal (6.1.c).
6. **Consentimiento verificable:** se registra cuándo, cómo y sobre qué versión del texto se otorgó.
7. **Retirada tan fácil como la concesión.** Si el consentimiento se da con un clic, se retira con un clic. Un consentimiento que solo se retira por email es un incumplimiento.

## Derechos de las personas

8. **Mecanismo real para cada derecho** (acceso, rectificación, supresión, oposición, portabilidad, limitación). Mínimo aceptable: borrado de cuenta autoservicio + canal de contacto con SLA declarado. "Escríbenos" sin plazo ni responsable no es un mecanismo.
9. **Borrado que borra de verdad:** cuenta, contenido, copias en almacenamiento de objetos, caché y CDN, y menciones en logs. Plazo declarado para las copias de seguridad derivadas (habitual: ≤30 días). El borrado se **prueba de extremo a extremo** una vez antes del lanzamiento.
10. **Portabilidad:** exportación de los datos del usuario en formato legible por máquina, si el tratamiento se basa en consentimiento o contrato.

## ePrivacy, cookies y analítica

11. **Nada no esencial antes del consentimiento.** Ningún script de analítica, píxel, fuente externa o incrustación de terceros se carga antes del opt-in. Se verifica mirando las peticiones de red en una carga limpia, no leyendo el código.
12. **Banner correcto:** rechazar tan accesible como aceptar, sin casillas premarcadas, sin patrones oscuros, con panel de preferencias por categoría y decisión revocable.
13. **Analítica preferentemente sin cookies ni identificadores persistentes.** Si la herramienta declara ser cookie-less, **confírmalo contra su política de privacidad vigente** en el momento de integrarla, no de memoria.

## Terceros e infraestructura

14. **Registro de encargados del tratamiento:** cada proveedor que toca datos personales (alojamiento, base de datos, correo, analítica, almacenamiento, IA) con su DPA aceptado y su región de datos anotada. Preferir región UE cuando exista la opción.
15. **Transferencias fuera del EEE** identificadas y amparadas (decisión de adecuación o cláusulas contractuales tipo). Aplica también a los servicios de IA a los que envíes contenido de usuarios.
16. **Sin datos personales en logs, trazas de error ni prompts a modelos de IA.** Si algo se envía a un tercero para procesarlo, aparece en el mapa del ítem 1.

## Gobierno

17. **Procedimiento de brecha escrito:** cómo se detecta, quién evalúa el riesgo, notificación a la autoridad de control en ≤72h cuando proceda, y comunicación a los afectados si el riesgo es alto. Media página basta; no tenerla es el problema.
18. **Triaje de DPIA:** ¿tratamiento a gran escala, categorías especiales, observación sistemática, o decisiones automatizadas con efecto sobre personas? Si sí ⇒ DPIA antes de lanzar.
19. **Menores:** si el servicio puede atraer a menores de edad, mecanismo del art. 8 (14 años en España) y prohibición de perfilado publicitario.
20. **Política de privacidad publicada y coherente con el mapa real.** El texto describe lo que el sistema hace, no lo que se pretendía que hiciera. Se revisa cada vez que cambia el mapa de datos.
