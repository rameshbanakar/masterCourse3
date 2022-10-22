const {body}=require("express-validator/check")
exports.hasDescription=body("description").isLength({min:5}).withMessage("Description should have 5 chars");
