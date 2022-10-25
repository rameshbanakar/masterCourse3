const User = require("../models/user");
//const redisClient=require("../config/redis").getClient();
exports.follow = async (req, res, next) => {
  try {
    req.user.following.push(req.params.id);
    req.user.save();
    //redisClient.hdel("user",req.user.id)
    res.send({ message: "success" });
  } catch (err) {
    next(err);
  }
};
