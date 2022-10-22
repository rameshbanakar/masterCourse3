const express=require("express");
const path=require("path")
const errorHandler=require("./middleWare/errorHandler")
const bodyParser=require("body-parser");
const cors=require("cors");
const mongoose=require("mongoose")
const passportJWT=require("./middleWare/passportJWT")();

mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost/rest-api-node",{useNewUrlParser:true})

const app=express();
const postRoute=require("./Route/post");

app.use(bodyParser.json());
app.use(cors());
app.use("/api/post",postRoute)
app.use(errorHandler)
app.use(express.static(path.join(__dirname,"public")));
app.use(passportJWT.initialize())
app.listen("8000",()=>console.log("listening"));