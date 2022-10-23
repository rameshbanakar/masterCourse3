const express = require("express");
const router = express.Router();
const authController = require("../postController/authController");
const { hasName, hasPassword, isEmail } = require("../validation/validator");
router.post("/login", authController.login);
router.post("/signup", [hasName, hasPassword, isEmail], authController.signup);
router.get("/me", authController.me);

module.exports = router;
