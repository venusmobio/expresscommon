// Require Packages
const express = require('express');
const router = express.Router();
const { checkSchema } = require('express-validator');

// Require Controllers
const uploadController = require('../controllers/upload.controller');

// Require middlewares
const { validate } = require("../middlewares/validate.middleware");
const  upload = require("../middlewares/multer.middleware")

// Require validators
const uploadValidator = require("../validators/upload.validator");

// upload crud routes
router.get('/', uploadController.list);
router.get('/:id', uploadController.detail);
router.post('/', validate(checkSchema(uploadValidator.createUploadSchema)),upload, uploadController.create);
router.put('/:id', upload ,uploadController.update);
router.delete('/:id', uploadController.delete);

module.exports = router;
