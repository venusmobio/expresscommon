// Require Packages
const express = require('express');
const router = express.Router()

// require Controllers
const userController = require('../controllers/user.controller');

// User list route
router.get('/', userController.list)

module.exports = router;