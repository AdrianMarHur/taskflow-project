Entrenamiento Semanal
======================

Aplicación web sencilla para gestionar entrenamientos semanales: añadir tareas, asignar intensidad, marcarlas como completadas, filtrarlas y reordenarlas, todo desde el navegador y con almacenamiento local.

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
  - Arrastra y suelta las tareas para cambiar su orden cuando el modo de ordenación es **“Orden manual (arrastrar)”**.
  - El orden se guarda en el navegador.

- **Modo claro/oscuro**
  - Botón en el header para cambiar de tema.
  - El tema elegido se guarda y se restaura automáticamente.

- **Accesibilidad y UX**
  - Validación de formularios con mensajes de error claros.
  - Resumen de errores accesible (`aria-live`).
  - Colores e iconografía adaptados a modo claro y oscuro.
  - Texto legible en todos los estados de los campos.

- **Persistencia local**
  - Todas las tareas, su estado (intensidad, completadas) y el orden se guardan en `localStorage`.
  - No necesita backend ni base de datos.

## Tecnologías usadas

- **HTML5** para la estructura de la página.
- **CSS con Tailwind (CDN)** para el estilo y el diseño responsivo.
- **JavaScript** puro (`app.js`) para la lógica de la aplicación y la gestión del estado en el cliente.

## Estructura del proyecto

- `index.html`  
  Página principal de la aplicación (formulario, lista de tareas, filtros, modo oscuro).

- `app.js`  
  Lógica de la aplicación:
  - Helpers (`cx`, `delegate`, normalización de texto, debounce…).
  - Componente `TaskItem` para renderizar cada tarea.
  - Estado (`state`) y funciones de carga/guardado en `localStorage`.
  - Validaciones de entrada.
  - Filtros, búsqueda, completado, edición y drag & drop.

- `styles.css`  
  Estilos adicionales si son necesarios (además de Tailwind).

- `docs/ai/`  
  Documentación sobre el uso de IA y experimentos con prompts (`cursor-workflow.md`, `prompt-engineering.md`, `experiments.md`).

## Cómo ejecutar el proyecto

1. Clonar el repositorio o descargar los archivos.
2. Abrir el archivo `index.html` en un navegador moderno (Chrome, Firefox, Edge…).
3. No se requiere instalación de dependencias ni servidor: es una **SPA estática**.

## Uso básico

1. Escribe una tarea en el campo “Nueva tarea…” y elige una intensidad.
2. Pulsa **“Añadir”**.
3. Usa:
   - El **buscador** para encontrar tareas por texto.
   - Los **filtros** (Todas / Pendientes / Completadas).
   - El filtro de **intensidad** y el **orden** para ver la lista como prefieras.
4. Marca tareas como completadas con el checkbox.
5. Usa **“Editar”** para cambiar el texto de una tarea.
6. Haz clic en **“✖”** para borrarla.
7. En el modo “Orden manual (arrastrar)”, arrastra una tarea y suéltala sobre otra para cambiar el orden.

### Ejemplo de uso

Imagina que quieres planificar tu semana de entrenamiento:

- Añades una tarea **“Correr 5 km”** con intensidad **Alta**.
- Añades **“Sesión de estiramientos”** con intensidad **Baja**.
- Añades **“Entrenamiento de fuerza”** con intensidad **Media**.
- Usas el filtro de **intensidad = Alta** para ver solo las sesiones más exigentes.
- Ordenas por **“Orden manual (arrastrar)”** y colocas primero lo que quieres hacer al principio de la semana.
- Cuando terminas “Correr 5 km”, marcas la tarea como **completada**.
- Si decides cambiar “Entrenamiento de fuerza” por “Fuerza tren superior”, pulsas **“Editar”** y actualizas el texto sin perder su intensidad ni su estado.

## Notas sobre accesibilidad

- La aplicación utiliza:
  - `aria-live` para anunciar errores de formulario.
  - Etiquetas y descripciones accesibles en botones (borrar, editar, completar).
  - Colores con suficiente contraste en modo claro y oscuro.
- El objetivo es que la experiencia sea usable también con teclado y lectores de pantalla.

