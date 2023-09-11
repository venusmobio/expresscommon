// Require Packages
const express = require('express');
const router = express.Router();
const { checkSchema } = require('express-validator');

// require Controllers
const userController = require('../controllers/user.controller');

// Require middlewares
const { validate } = require('../middlewares/validate.middleware');

// Require validators
const userValidator = require('../validators/user.validator');

// User list route
router.get('/', userController.list);
router.get('/:id', userController.detail);
router.post('/', validate(checkSchema(userValidator.createUserSchema)), userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;
