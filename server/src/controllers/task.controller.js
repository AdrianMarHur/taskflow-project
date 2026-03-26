const taskService = require('../services/task.service');

function obtenerTareas(req, res) {
  const tareas = taskService.obtenerTodas();
  res.status(200).json(tareas);
}

function crearTarea(req, res) {
  const { text, intensity } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'El campo text es obligatorio' });
  }

  const intensidades = ['high', 'medium', 'low'];
  if (intensity && !intensidades.includes(intensity)) {
    return res.status(400).json({ error: 'Intensidad inválida' });
  }

  const tarea = taskService.crearTarea(req.body);
  res.status(201).json(tarea);
}

function actualizarTarea(req, res, next) {
  const { id } = req.params;
  try {
    const tarea = taskService.actualizarTarea(id, req.body);
    res.status(200).json(tarea);
  } catch (error) {
    next(error);
  }
}

function eliminarTarea(req, res, next) {
  const { id } = req.params;
  try {
    taskService.eliminarTarea(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { obtenerTareas, crearTarea, actualizarTarea, eliminarTarea };