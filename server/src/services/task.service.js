let tasks = [];
let nextId = 1;

function obtenerTodas() {
  return tasks;
}

function crearTarea(data) {
  const tarea = {
    id: nextId++,
    text: data.text,
    intensity: data.intensity || 'medium',
    completed: data.completed || false,
  };
  tasks.push(tarea);
  return tarea;
}

function actualizarTarea(id, data) {
  const index = tasks.findIndex(t => t.id === parseInt(id));
  if (index === -1) throw new Error('NOT_FOUND');
  tasks[index] = { ...tasks[index], ...data };
  return tasks[index];
}

function eliminarTarea(id) {
  const index = tasks.findIndex(t => t.id === parseInt(id));
  if (index === -1) throw new Error('NOT_FOUND');
  tasks.splice(index, 1);
}

module.exports = { obtenerTodas, crearTarea, actualizarTarea, eliminarTarea };