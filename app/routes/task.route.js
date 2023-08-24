// Require Packages
const express = require('express');
const router = express.Router();
const { checkSchema } = require('express-validator');

// require Controllers
const taskController = require('../controllers/task.controller');

// Require middlewares
const { validate } = require('../middlewares/validate.middleware');

// Require validators
const taskValidator = require('../validators/task.validator');

// Task crud routes
router.get('/', taskController.list);
router.get('/:id', taskController.detail);
router.post(
  '/',
  validate(checkSchema(taskValidator.createTaskSchema)),
  taskController.create
);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);

module.exports = router;
