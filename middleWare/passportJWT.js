const passport=require("passport");
const passportJWT=require("passport-jwt");
const User=require("../models/user");
const config=require("../config");

const ExtractJwt=passportJWT.ExtractJwt;
const Strategy=passportJWT.Strategy;

const params={
    secretOrKey:config.jwtSecret,
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports=()=>{
    const Stratery=new Strategy(params,async (payload,done)=>{
       const User=await User.findById(payload.id);
       if(!User)return done(new Error("user not found"))
       return done(null,User)
    })
    passport.use(Strategy)
    return{
        initialize:function(){return passport.initialize()},
        autheticate:function(){return passport.authenticate("jwt",{session:false})}
    }
}
