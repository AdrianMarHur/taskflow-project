# Herramientas de desarrollo backend

Este documento explica qué son y para qué se usan diferentes herramientas del ecosistema backend.

## Axios

Axios es una librería JavaScript para realizar peticiones HTTP tanto desde el navegador como desde Node.js. Es una alternativa a la API nativa `fetch` con ventajas adicionales:

- Transforma automáticamente las respuestas a JSON sin necesidad de llamar a `.json()`.
- Manejo de errores más claro: lanza excepciones automáticamente cuando el servidor devuelve un código de error (4xx, 5xx).
- Permite configurar instancias con una URL base, cabeceras o timeouts predefinidos, evitando repetir configuración en cada petición.
- Compatible con navegadores antiguos sin necesidad de polyfills.

**Ejemplo de uso:**
```js
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000/api/v1' });

const { data } = await api.get('/tasks');
const nueva = await api.post('/tasks', { text: 'Correr 5 km', intensity: 'high' });
```

En este proyecto se usa `fetch` nativo, pero Axios sería la alternativa recomendada en proyectos más grandes donde se necesite mayor control sobre las peticiones.

---

## Postman

Postman es una herramienta de escritorio para probar APIs REST. Permite enviar peticiones HTTP (GET, POST, PUT, DELETE) a un servidor y ver las respuestas sin necesidad de un frontend.

**Para qué se usa:**
- Probar endpoints durante el desarrollo antes de conectar el frontend.
- Forzar errores intencionados (enviar un POST sin campos obligatorios, hacer un DELETE de un ID inexistente) para verificar que el servidor responde correctamente.
- Organizar peticiones en **colecciones** para documentar y compartir el comportamiento de una API con el equipo.
- Automatizar pruebas de integración.

En este proyecto se ha usado **Thunder Client** (extensión de VS Code) como alternativa más ligera a Postman para verificar los endpoints durante el desarrollo.

---

## Sentry

Sentry es una plataforma de monitorización de errores en tiempo real. Se integra en aplicaciones web y backend para capturar automáticamente excepciones y errores que ocurren en producción.

**Para qué se usa:**
- Recibir alertas cuando un usuario real encuentra un error en la aplicación.
- Ver la traza completa del error (stack trace), el contexto y los datos del usuario afectado.
- Identificar qué errores ocurren con más frecuencia para priorizarlos.
- Monitorizar tanto el frontend (errores de JavaScript en el navegador) como el backend (excepciones en Node.js).

**Ejemplo de integración en Node.js:**
```js
const Sentry = require('@sentry/node');

Sentry.init({ dsn: 'https://tu-dsn@sentry.io/proyecto' });

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler()); // captura errores automáticamente
```

Sin Sentry, los errores en producción solo quedan registrados en los logs del servidor y son difíciles de detectar. Con Sentry, el equipo recibe una notificación inmediata con toda la información necesaria para reproducir y corregir el fallo.

---

## Swagger

Swagger (actualmente conocido como **OpenAPI**) es un estándar para documentar APIs REST de forma estructurada y legible tanto por humanos como por máquinas.

**Para qué se usa:**
- Generar documentación interactiva de la API automáticamente a partir del código.
- Permite a otros desarrolladores explorar y probar los endpoints directamente desde el navegador sin necesidad de Postman.
- Define el contrato de la API: qué rutas existen, qué parámetros aceptan, qué respuestas devuelven y qué errores pueden ocurrir.
- Facilita la comunicación entre equipos de frontend y backend.

**Ejemplo de integración en Express:**
```js
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
```

Con esto, la documentación interactiva de la API quedaría disponible en `http://localhost:3000/api/docs`, donde cualquier desarrollador podría ver y probar todos los endpoints sin necesidad de herramientas externas.

---

## Resumen comparativo

| Herramienta   | Categoría         | Para qué sirve |
|---|---|---|
| **Axios**     | Librería HTTP     | Hacer peticiones al servidor desde el cliente |
| **Postman**   | Testing           | Probar y documentar endpoints de una API |
| **Sentry**    |   Monitorización  | Detectar y registrar errores en producción |
| **Swagger**   | Documentación     | Documentar y explorar una API REST |