const constants = require('../utils/constants.util');

/* create task schema */
exports.createTaskSchema = {
  taskName: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty('Task name'),
  },
};
