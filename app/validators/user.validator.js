const constants = require('../utils/constants.util');

/* create user schema */
exports.createUserSchema = {
  firstName: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty('First name'),
  },
  lastName: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty('Last name'),
  },
  email: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty('Email'),
  },
  phoneNumber: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty('Phone number'),
  },
  password: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty('Password'),
  },
};
