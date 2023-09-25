const constants = require('../utils/constants.util');

/* login schema */
exports.loginSchema = {
  email: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty('Email'),
  },
  password: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty('Password'),
  },
  deviceInfo: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty('Device info'),
  },
};

/* signup schema */
exports.signupSchema = {
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

/* Forgot password schema */
exports.forgotPasswordSchema = {
  email: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty('Email'),
  },
  resetLink: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty('Reset password link'),
  },
};

/* Reset password schema */
exports.resetPasswordSchema = {
  token: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty('Token'),
  },
  newPassword: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty('New password'),
  },
};

/* Update profile schema */
exports.updateProfileSchema = {
  firstName: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty('First name'),
  },
  lastName: {
    notEmpty: true,
    errorMessage: constants.cantBeEmpty('Last name'),
  },
};
