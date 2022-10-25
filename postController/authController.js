const jwt = require("jwt-simple");
const { secretOrKey } = require("../config");
const config = require("../config");
const User = require("../models/user");
//const redisClient=require("../config/redis").getClient();
const validationHandler = require("../validation/validationHandler");
exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    let user = await User.findOne({ email }).select("password");
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
    const token = jwt.encode({ id: user.id },secretOrKey);
    user=await User.findOne({email});
    return res.send({ user, token });
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    validationHandler(req);
    const existUser = await User.findOne({ email: req.body.email });
    if (existUser) {
      const error = new Error("email already exist");
      error.status = 402;
      throw error;
    }
    let user = new User();
    user.email = req.body.email;
    user.password = await user.encryptPassword(req.body.password);
    user.name = req.body.name;
    user = await user.save();

    const token = jwt.encode({ id: user.id }, config.secretOrKey);
    return res.send({ user, token });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    // const cacheValue=await redisClient.hget("user",req.user.id)
    // if(cacheValue){
    //   console.console.log("getting from redis")
    //   const doc=JSON.parse(cacheValue)
    //   const cacheUser=new User(doc)
    //   return res.send(cacheUser)
    // }
    console.log("getting from db")
    const user = await User.findById(req.user);
    //redisClient.hget("user",req.user.id,JSON.stringify(user))
    return res.send(user);
  } catch (err) {
    next(err);
  }
};
