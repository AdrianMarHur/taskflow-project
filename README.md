Entrenamiento Semanal
======================

Aplicación web para gestionar entrenamientos semanales: añadir tareas, asignar intensidad, marcarlas como completadas, filtrarlas y reordenarlas, todo desde el navegador con un servidor Node.js como backend.

## Características principales

- **Gestión de tareas de entrenamiento**
  - Añadir nuevas tareas con un nivel de intensidad: **Alta**, **Media** o **Baja**.
  - Marcar tareas como **completadas** o **pendientes**.
  - Editar el texto de una tarea existente.
  - Eliminar tareas individualmente.

- **Filtros y búsqueda**
  - Filtros por estado: **Todas / Pendientes / Completadas**.
  - Filtro por intensidad: **Todas / Alta / Media / Baja**.
  - Ordenación por:
    - **Orden manual (arrastrar y soltar)**.
    - Más nuevas / Más antiguas.
    - Intensidad (Alta → Baja / Baja → Alta).
  - Buscador por texto en el título de la tarea.

- **Reordenación por drag & drop**
  - Arrastra y suelta las tareas para cambiar su orden cuando el modo de ordenación es **"Orden manual (arrastrar)"**.

- **Modo claro/oscuro**
  - Botón en el header para cambiar de tema.
  - El tema elegido se guarda y se restaura automáticamente.

- **Accesibilidad y UX**
  - Validación de formularios con mensajes de error claros.
  - Resumen de errores accesible (`aria-live`).
  - Colores e iconografía adaptados a modo claro y oscuro.

## Tecnologías usadas

- **HTML5** para la estructura de la página.
- **CSS con Tailwind (CDN)** para el estilo y el diseño responsivo.
- **JavaScript** puro (`app.js`) para la lógica de la aplicación.
- **Node.js + Express** para el servidor backend.
- **fetch API** para la comunicación entre frontend y backend.
- **Swagger (OpenAPI)** para la documentación interactiva de la API.

## Estructura del proyecto
```
taskflow_project/
├── index.html           → Página principal
├── app.js               → Lógica del frontend
├── styles.css           → Estilos adicionales
├── src/
│   └── api/
│       └── client.js    → Capa de red (fetch al servidor)
├── docs/
│   ├── ai/              → Documentación sobre uso de IA
│   └── backend-api.md   → Documentación sobre herramientas de backend
└── server/
    ├── README.md                 → Documentación técnica exhaustiva del backend
    ├── src/
    │   ├── index.js              → Punto de entrada del servidor
    │   ├── config/
    │   │   ├── env.js            → Carga y validación de variables de entorno
    │   │   └── swagger.js        → Configuración de Swagger
    │   ├── services/
    │   │   └── task.service.js   → Lógica de negocio (array en memoria)
    │   ├── controllers/
    │   │   └── task.controller.js → Validación y gestión de peticiones HTTP
    │   └── routes/
    │       └── task.routes.js    → Definición de rutas y documentación JSDoc
    ├── .env                      → Variables de entorno (no subir a GitHub)
    ├── .gitignore
    └── package.json
```

## Arquitectura backend

El servidor sigue una **arquitectura por capas**:
```
Cliente (navegador)
      ↓
  index.js          → monta Express, middlewares y rutas
      ↓
task.routes.js      → conecta verbos HTTP con controladores
      ↓
task.controller.js  → valida datos y gestiona la petición
      ↓
task.service.js     → ejecuta la lógica pura (array en memoria)
```

### Middlewares

- **`cors`** — permite que el frontend (puerto 5500) se comunique con el servidor (puerto 3000) sin ser bloqueado por el navegador.
- **`express.json()`** — parsea automáticamente el body de las peticiones en formato JSON.
- **Middleware global de errores** — captura cualquier error no controlado. Si el error es `NOT_FOUND` devuelve un 404; para cualquier otro error devuelve un 500 con un mensaje genérico sin filtrar detalles técnicos al exterior.

## API REST

Base URL: `http://localhost:3000/api/v1`

> Para explorar y probar la API de forma interactiva, accede a la documentación Swagger en `http://localhost:3000/api/docs` con el servidor corriendo.

### Endpoints

#### GET /tasks
Obtiene todas las tareas.

**Respuesta exitosa (200):**
```json
[
  {
    "id": 1,
    "text": "Correr 5 km",
    "intensity": "high",
    "completed": false
  }
]
```

#### POST /tasks
Crea una nueva tarea.

**Body:**
```json
{
  "text": "Correr 5 km",
  "intensity": "high",
  "completed": false
}
```

**Respuesta exitosa (201):**
```json
{
  "id": 1,
  "text": "Correr 5 km",
  "intensity": "high",
  "completed": false
}
```

#### PUT /tasks/:id
Actualiza una tarea existente (texto, intensidad o estado completado).

**Body:**
```json
{
  "text": "Correr 10 km",
  "intensity": "high",
  "completed": true
}
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "text": "Correr 10 km",
  "intensity": "high",
  "completed": true
}
```

#### DELETE /tasks/:id
Elimina una tarea por ID.

**Respuesta exitosa (204):** sin body.

---

## Errores de la API

### 400 — Datos inválidos
Se produce al hacer un POST sin el campo `text`.

**Request:**
```http
POST /api/v1/tasks
Content-Type: application/json

{}
```

**Response:**
```json
{
  "error": "El campo text es obligatorio"
}
```

### 404 — Recurso no encontrado
Se produce al intentar eliminar o actualizar una tarea que no existe.

**Request:**
```http
DELETE /api/v1/tasks/999
```

**Response:**
```json
{
  "error": "Recurso no encontrado"
}
```

### 500 — Error interno del servidor
Se produce cuando el servidor recibe una petición malformada o ocurre un fallo inesperado.

**Request:**
```http
POST /api/v1/tasks
Content-Type: application/json

{ "text": "tarea  ← JSON mal formado
```

**Response:**
```json
{
  "error": "Error interno del servidor"
}
```

---

## Cómo ejecutar el proyecto

### 1. Arrancar el servidor
```bash
cd server
npm install
npm run dev
```

El servidor arrancará en `http://localhost:3000`.
La documentación Swagger estará disponible en `http://localhost:3000/api/docs`.

### 2. Arrancar el frontend

Abre `index.html` con **Live Server** en VS Code. El frontend estará disponible en `http://127.0.0.1:5500`.

> Es necesario tener el servidor corriendo antes de abrir el frontend, de lo contrario las tareas no cargarán.

> Para documentación técnica detallada del backend consulta `server/README.md`.

## Notas sobre accesibilidad

- La aplicación utiliza:
  - `aria-live` para anunciar errores de formulario.
  - Etiquetas y descripciones accesibles en botones (borrar, editar, completar).
  - Colores con suficiente contraste en modo claro y oscuro.
- El objetivo es que la experiencia sea usable con teclado y lectores de pantalla.