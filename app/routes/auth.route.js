// Require packages
const express = require("express");
const router = express.Router();

// Require controllers
const authController = require("../controllers/auth.controller");

// Require middlewares
const authMiddleware = require("../middlewares/auth.middleware");

// login route
router.post("/login", authController.login);
// Signup route
router.post("/signup", authController.signup);
// Logout route
router.post("/logout", authMiddleware.verifyToken, authController.logout);

module.exports = router;
