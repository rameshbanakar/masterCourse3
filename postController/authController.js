const jwt = require("jwt-simple");
const config = require("../config");
const User = require("../models/user");
exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email }).select("password");
    if (!user) {
      const error = new Error("credentials not found");
      error.status = 401;
      throw error;
    }
    const validPassword = await user.validPassword(password);
    if (!validPassword) {
      const error = new Error("credentials not correct");
      error.status = 401;
      throw error;
    }
    const token = jwt.encode({ id: user.id }, config.jwtSecret);
    return res.send({ user, token });
  } catch (err) {
    next(err);
  }
};
