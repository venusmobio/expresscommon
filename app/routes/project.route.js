// Require Packages
const express = require('express');
const router = express.Router();
const { checkSchema } = require('express-validator');

// Require Controllers
const projectController = require('../controllers/project.controller');

// Require middlewares
const { validate } = require('../middlewares/validate.middleware');

// Require validators
const projectValidator = require('../validators/project.validator');

// project crud routes
router.get('/', projectController.list);
router.get('/:id', projectController.detail);
router.post(
  '/',
  validate(checkSchema(projectValidator.createProjectSchema)),
  projectController.create
);
router.put('/:id', projectController.update);
router.delete('/:id', projectController.delete);

module.exports = router;
