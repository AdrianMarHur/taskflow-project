const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Taskflow API',
      version: '1.0.0',
      description: 'API REST para gestionar tareas de entrenamiento semanal',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Servidor local',
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/task.routes.js')],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;