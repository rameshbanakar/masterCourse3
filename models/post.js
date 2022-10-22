const mongoose=require("mongoose");
const postSchema=mongoose.Schema({
   image:{type:String,require:true},
   description:{type:String,require:true},
   user:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
   createAt:{type:Date,default:Date.now()}
})

module.exports=mongoose.model("post",postSchema)