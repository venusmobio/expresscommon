// Require Packages
const express = require('express');
const router = express.Router()

// require Controllers
const userController = require('../controllers/user.controller');

// User list route
router.get('/', userController.list)
router.get('/:id', userController.detail)
router.post('/', userController.create)
router.put('/:id', userController.update)
router.delete('/', userController.delete)

module.exports = router;