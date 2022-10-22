const validationHandler=require("../validation/validationHandler")
const Post=require("../models/post")
const post = require("../models/post")

exports.index=async(req,res)=>{
    try{
        const posts=await Post.find().sort({createAt:-1})
        res.send(posts)
    }catch(err){next(err)}
}
exports.show=async (req,res)=>{
    try{
        const post= await Post.findOne({_id:req.params.id});
        res.send(post)
    }catch(err){next(err)}
}
exports.store=async(req,res,next)=>{
    try{
      validationHandler(req);
      let post= new  Post();
      post.description=req.body.description;
      post.image=req.file.filename;
      post=await post.save();

      res.send(post)

    }catch(err){
        next(err)
    }

}
exports.update=async(req,res,next)=>{
    try{
      validationHandler(req);
      let post= await Post.findById(req.params.id);
      post.description=req.body.description;
      
       post=await post.save();

      res.send(post)

    }catch(err){
        next(err)
    }

}
exports.delete=async(req,res,next)=>{
    try{
      validationHandler(req);
      let post= await Post.findById(req.params.id);
      
      
       post=await post.delete();

      res.send({message:"success"})

    }catch(err){
        next(err)
    }

}