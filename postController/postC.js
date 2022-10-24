const validationHandler = require("../validation/validationHandler");
const Post = require("../models/post");
const post = require("../models/post");
const { populate } = require("../models/user");

exports.index = async (req, res, next) => {
  try {
    const pagination = req.query.pagination
      ? parseInt(req.query.pagination)
      : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const posts = await Post.find({
      user: { $in: [...req.user.following, req.user.id] },
    })
      .skip((page - 1) * pagination)
      .limit(pagination)
      .populate("user")
      .sort({ createAt: -1 });
    res.send(posts);
  } catch (err) {
    next(err);
  }
};
exports.show = async (req, res, next) => {
  try {
    const post = await Post.find({
      _id: req.params.id,
      user: { $in: [...req.user.following, req.user.id] },
    }).populate("user");
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
