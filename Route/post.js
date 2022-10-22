const express=require("express");
const router=express.Router()
const uploadImg=require("../middleWare/multer")
const {hasDescription}=require("../validation/validator")
const postController=require("../postController/postC")
router.get("/",postController.index)
router.get("/:id",postController.show)
router.post("/",uploadImg("posts").single("image"),hasDescription,postController.store)
router.patch("/:id",hasDescription,postController.update)
router.delete("/:id",postController.delete)
module.exports=router