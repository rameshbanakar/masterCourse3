const { body } = require("express-validator/check");
exports.hasDescription = body("description")
  .isLength({ min: 5 })
  .withMessage("Description should have 5 chars");
exports.isEmail = body("email")
  .isEmail()
  .withMessage("Enter the valid email id");
exports.hasPassword = body("password")
  .isLength({min:5})
  .withMessage("Enter the valid password");
exports.hasName = body("name")
  .isLength({ min: 5 })
  .withMessage("name should have minimum 5 chars");
