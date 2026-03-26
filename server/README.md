# Taskflow — Documentación técnica del servidor

Servidor REST construido con Node.js y Express que gestiona las tareas de la aplicación Taskflow. Sigue una arquitectura por capas con validación de entorno, manejo global de errores y documentación interactiva con Swagger.

---

## Requisitos previos

- Node.js v18 o superior
- npm v9 o superior

---

## Instalación y arranque
```bash
npm install
npm run dev
```

El servidor arrancará en `http://localhost:3000`.
La documentación Swagger estará disponible en `http://localhost:3000/api/docs`.

---

## Variables de entorno

El servidor requiere un archivo `.env` en la raíz de `server/` con las siguientes variables:

| Variable  | Descripción                        | Ejemplo |
|---        |---                                        |---|
| `PORT`    | Puerto en el que escucha el servidor | `3000` |

Si alguna variable obligatoria no está definida, el servidor lanza un error y se niega a arrancar. Esto está implementado en `src/config/env.js` y garantiza que nunca arranque con una configuración incompleta.

> El archivo `.env` está incluido en `.gitignore` y nunca debe subirse al repositorio.

---

## Estructura de carpetas
```
server/
├── src/
│   ├── index.js              → Punto de entrada: monta Express, middlewares y rutas
│   ├── config/
│   │   ├── env.js            → Carga dotenv y valida variables de entorno
│   │   └── swagger.js        → Configuración de swagger-jsdoc
│   ├── services/
│   │   └── task.service.js   → Lógica de negocio pura (sin HTTP)
│   ├── controllers/
│   │   └── task.controller.js → Validación de peticiones y respuestas HTTP
│   └── routes/
│       └── task.routes.js    → Definición de rutas y comentarios JSDoc para Swagger
├── .env                      → Variables de entorno (no subir a GitHub)
├── .gitignore
├── package.json
└── README.md
```

---

## Arquitectura por capas

El servidor sigue el patrón **Routes → Controller → Service**. Cada capa tiene una responsabilidad única y no conoce los detalles de las capas adyacentes.
```
Petición HTTP entrante
        ↓
    index.js
    - Inicializa Express
    - Registra middlewares globales (cors, express.json)
    - Monta las rutas bajo /api/v1/tasks
    - Registra el middleware global de errores
        ↓
task.routes.js
    - Mapea verbos HTTP (GET, POST, PUT, DELETE) a controladores
    - Contiene comentarios JSDoc para Swagger
        ↓
task.controller.js
    - Extrae datos de req.body y req.params
    - Aplica validaciones defensivas
    - Devuelve códigos HTTP semánticos (200, 201, 204, 400, 404, 500)
    - Delega la lógica al servicio
    - Pasa errores al middleware global con next(error)
        ↓
task.service.js
    - Contiene la lógica pura de negocio
    - No conoce nada de HTTP (sin req, res, next)
    - Gestiona el array en memoria como persistencia simulada
    - Lanza Error('NOT_FOUND') si una operación no puede completarse
```

---

## Middlewares

### `cors`
Permite que el frontend (servido desde un origen diferente, por ejemplo `http://127.0.0.1:5500`) pueda hacer peticiones al servidor sin ser bloqueado por la política de mismo origen del navegador (CORS).

### `express.json()`
Parsea automáticamente el cuerpo de las peticiones entrantes con `Content-Type: application/json` y lo hace disponible en `req.body`. Sin este middleware, `req.body` sería `undefined`.

### Middleware global de errores
Es el último middleware registrado en `index.js` y tiene la firma especial de 4 parámetros `(err, req, res, next)` que Express reconoce como manejador de errores.

Implementa un **mapeo semántico de errores HTTP**:
```js
app.use((err, req, res, next) => {
  if (err.message === 'NOT_FOUND') {
    return res.status(404).json({ error: 'Recurso no encontrado' });
  }
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});
```

- Si el error tiene el mensaje `NOT_FOUND` (lanzado por el servicio cuando no existe el recurso), devuelve un **404**.
- Para cualquier otro error no controlado, registra la traza completa en consola con `console.error` y devuelve un **500** con un mensaje genérico, garantizando que no se filtran detalles técnicos sensibles al cliente.

---

## Capa de servicio

`task.service.js` implementa la persistencia en memoria mediante un array global:
```js
let tasks = [];
let nextId = 1;
```

| Método                | Descripción |
|---|                   |---|
| `obtenerTodas()`      |Devuelve el array completo de tareas |
| `crearTarea(data)`    | Crea una tarea con ID autoincremental y la añade al array |
| `actualizarTarea(id, data)` | Busca la tarea por ID y la actualiza. Lanza `Error('NOT_FOUND')` si no existe |
| `eliminarTarea(id)`   | Busca la tarea por ID y la elimina. Lanza `Error('NOT_FOUND')` si no existe |

> Al ser una persistencia en memoria, los datos se pierden cada vez que el servidor se reinicia. En una versión futura se sustituiría por una base de datos real.

---

## Validaciones

El controlador aplica validaciones defensivas antes de llamar al servicio:

- **POST /tasks** — verifica que el campo `text` existe en el body. Si no, devuelve un **400** con mensaje de error.
- **POST /tasks** — verifica que el campo `intensity` es uno de los valores permitidos (`high`, `medium`, `low`). Si no, devuelve un **400**.
- **PUT y DELETE /tasks/:id** — si el servicio lanza `Error('NOT_FOUND')`, el controlador lo pasa al middleware global con `next(error)` que devuelve un **404**.

---

## Documentación interactiva

La API está documentada con **Swagger (OpenAPI 3.0)**. Los comentarios JSDoc en `task.routes.js` definen los esquemas, parámetros y respuestas de cada endpoint.

Con el servidor corriendo, accede a:
```
http://localhost:3000/api/docs
```

Desde ahí puedes ver y probar todos los endpoints directamente desde el navegador.

---

## Dependencias

### Producción
| Paquete   | Versión | Uso |
|---|---|---|
| `express` | 5.2.1 | Framework HTTP |
| `cors`    | 2.8.6 | Middleware CORS |
| `dotenv`  | 17.3.1 | Carga de variables de entorno |
| `swagger-jsdoc` | 6.2.8 | Generación de spec desde JSDoc |
| `swagger-ui-express` | 5.0.1 | Interfaz web de Swagger |

### Desarrollo
| Paquete   | Versión   | Uso |
|---|---|---|
| `nodemon` | 3.1.14    | Recarga automática del servidor |

## Scripts disponibles

| Script    | Comando               | Descripción |
|---|---|---|
| `dev`     | `nodemon src/index.js` | Arranca el servidor en modo desarrollo con recarga automática |