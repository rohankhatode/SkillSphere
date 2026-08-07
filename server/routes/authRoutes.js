const express = require("express");

const { signup, login, checkUser } = require("../controllers/authController");
const { googleAuth } = require("../controllers/googleAuthController");

const router = express.Router();

// Authentication Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/check-user", checkUser);
router.post("/google", googleAuth);

module.exports = router;