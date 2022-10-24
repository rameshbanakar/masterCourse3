const express = require("express");
const passportJWT = require("../middleWare/passportJWT")();
const router = express.Router();
const authController = require("../postController/authController");
const { hasName, hasPassword, isEmail } = require("../validation/validator");
router.post("/login", authController.login);
router.post("/signup", [hasName, hasPassword, isEmail], authController.signup);
router.get("/me", passportJWT.authenticate(),authController.me);

module.exports = router;
