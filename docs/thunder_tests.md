# Pruebas de endpoints — Thunder Client

Registro de pruebas realizadas con Thunder Client sobre la API REST de Taskflow.

Base URL: `http://localhost:3000/api/v1`

---

## GET /tasks — Obtener todas las tareas

**Request:**
```http
GET http://localhost:3000/api/v1/tasks
```

**Response (200):**
```json
[]
```

---

## POST /tasks — Crear una tarea correctamente

**Request:**
```http
POST http://localhost:3000/api/v1/tasks
Content-Type: application/json
```
```json
{
  "text": "Correr 5 km",
  "intensity": "high",
  "completed": false
}
```

**Response (201):**
```json
{
  "id": 1,
  "text": "Correr 5 km",
  "intensity": "high",
  "completed": false
}
```

---

## POST /tasks — Error 400: sin campo text

**Request:**
```http
POST http://localhost:3000/api/v1/tasks
Content-Type: application/json
```
```json
{}
```

**Response (400):**
```json
{
  "error": "El campo text es obligatorio"
}
```

---

## PUT /tasks/:id — Actualizar una tarea

**Request:**
```http
PUT http://localhost:3000/api/v1/tasks/1
Content-Type: application/json
```
```json
{
  "text": "Correr 10 km",
  "intensity": "high",
  "completed": true
}
```

**Response (200):**
```json
{
  "id": 1,
  "text": "Correr 10 km",
  "intensity": "high",
  "completed": true
}
```

---

## DELETE /tasks/:id — Eliminar una tarea correctamente

**Request:**
```http
DELETE http://localhost:3000/api/v1/tasks/1
```

**Response (204):** sin body.

---

## DELETE /tasks/:id — Error 404: ID inexistente

**Request:**
```http
DELETE http://localhost:3000/api/v1/tasks/999
```

**Response (404):**
```json
{
  "error": "Recurso no encontrado"
}
```

---

## POST /tasks — Error 500: JSON mal escrito

**Request:**
```http
POST http://localhost:3000/api/v1/tasks
Content-Type: application/json
```
```json
{ "text": "tarea  ← JSON mal escrito
```

**Response (500):**
```json
{
  "error": "Error interno del servidor"
}
```