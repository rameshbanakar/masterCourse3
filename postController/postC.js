const validationHandler = require("../validation/validationHandler");
const Post = require("../models/post");
const post = require("../models/post");

exports.index = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createAt: -1 });
    res.send(posts);
  } catch (err) {
    next(err);
  }
};
exports.show = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id }).populate("user");
    res.send(post);
  } catch (err) {
    next(err);
  }
};
exports.store = async (req, res, next) => {
  try {
    validationHandler(req);
    let post = new Post();
    post.description = req.body.description;
    post.image = req.file.filename;
    post.user = req.user;
    post = await post.save();

    res.send(post);
  } catch (err) {
    next(err);
  }
};
exports.update = async (req, res, next) => {
  try {
    validationHandler(req);
    let post = await Post.findById(req.params.id);
    if (!post || post.user != req.user.id) {
      
      const error = new Error("you are not post owner to update");
      error.status = 400;
      throw error;
    }
    post.description = req.body.description;

    post = await post.save();

    res.send(post);
  } catch (err) {
    next(err);
  }
};
exports.delete = async (req, res, next) => {
  try {
    validationHandler(req);
    let post = await Post.findById(req.params.id);
    if (!post || post.user != req.user.id) {
     
      const error = new Error("you are not post owner to delete");
      error.status = 400;
      throw error;
    }

    post = await post.delete();

    res.send({ message: "success" });
  } catch (err) {
    next(err);
  }
};
