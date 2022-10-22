module.exports=(err,req,res,next)=>{
    const status=err.status || 500;
    const message=err.message;
    const data=err.data;
    const validation=err.validation;
    res.status(status).json({message,data,validation});
}