const taskService = require('../services/task.service');

function obtenerTareas(req, res) {
  const tareas = taskService.obtenerTodas();
  res.status(200).json(tareas);
}

function crearTarea(req, res) {
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }

  const tarea = taskService.crearTarea(req.body);
  res.status(201).json(tarea);
}

function eliminarTarea(req, res) {
  const { id } = req.params;

  try {
    taskService.eliminarTarea(id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = { obtenerTareas, crearTarea, eliminarTarea };