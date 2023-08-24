const constants = require("../utils/constants.util");

/* login schema */
exports.loginSchema = {
  email: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty("Email"),
  },
  password: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty("Password"),
  },
  deviceInfo: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty("Device info"),
  },
};

/* signup schema */
exports.signupSchema = {
  firstName: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty("First name"),
  },
  lastName: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty("Last name"),
  },
  email: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty("Email"),
  },
  phoneNumber: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty("Phone number"),
  },
  password: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty("Password"),
  },
};
