const express=require("express")
const router=express.Router()

const followController=require("../postController/followController")

router.post("/:id",followController.follow)
module.exports=router;