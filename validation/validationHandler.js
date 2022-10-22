const {validationResult}=require("express-validator/check");
module.exports=req=>{
    const validationError=validationResult(req);
    if(!validationError.isEmpty()){
        const error=new Error("validation failed");
        error.statusCode=422;
        error.validation=validationError.array();
        throw error;
    }
}