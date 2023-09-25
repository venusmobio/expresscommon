// Base route path
const baseRoute = '/api';

module.exports = app => {
  app.use(`${baseRoute}/auth`, require('./auth.route'));
  app.use(`${baseRoute}/users`, require('./user.route'));
  app.use(`${baseRoute}/projects`, require('./project.route'));
  app.use(`${baseRoute}/tasks`, require('./task.route'));
  app.use(`${baseRoute}/uploads`, require('./upload.route'));
};
