const express = require("express");
const path = require("path");
const errorHandler = require("./middleWare/errorHandler");
const bodyParser = require("body-parser");
const rateLimit=require("express-rate-limit")
const cors = require("cors");
const mongoose = require("mongoose");
const passportJWT = require("./middleWare/passportJWT")();
const config=require("./config")
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
});

const app = express();
const postRoute = require("./Route/post");
const authRoute = require("./Route/auth");
const followRoute = require("./Route/follow");

app.use(bodyParser.json());
app.use(express.json())
app.use(cors());
//
// const limiter = rateLimit({
// 	windowMs: 15 * 1000, // 15 seconds
// 	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
// 	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// })

// Apply the rate limiting middleware to all requests
//app.use(limiter)

app.use("/api/post",passportJWT.authenticate(),postRoute);
app.use("/api/auth", authRoute);
app.use("/api/follow",passportJWT.authenticate(),followRoute)
app.use(errorHandler);
app.use(express.static(path.join(__dirname, "public")));
app.use(passportJWT.initialize());

app.listen(config.port, () => console.log("listening"));
