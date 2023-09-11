const constants = require('../utils/constants.util');

/* create project schema */
exports.createProjectSchema = {
  projectName: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty('Project name'),
  },
};
