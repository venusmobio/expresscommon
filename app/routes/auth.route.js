// Require packages
const express = require('express');
const router = express.Router();
const { checkSchema } = require('express-validator');

// Require controllers
const authController = require('../controllers/auth.controller');

// Require middlewares
const authMiddleware = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');

// Require validators
const authValidator = require('../validators/auth.validator');

// login route
router.post(
  '/login',
  validate(checkSchema(authValidator.loginSchema)),
  authController.login
);
// Signup route
router.post(
  '/signup',
  validate(checkSchema(authValidator.signupSchema)),
  authController.signup
);
// Logout route
router.post('/logout', authMiddleware.verifyToken, authController.logout);

module.exports = router;
