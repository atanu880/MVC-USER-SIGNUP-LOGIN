//router instance
const express=require("express");
const { getLogin, getSignup,postSignup,postLogin } = require("../controllers/authController");
let authRouter=express.Router()


//signup
authRouter.get("/signup",getSignup)
authRouter.post("/signup",postSignup)


//login
authRouter.get("/login",getLogin)
authRouter.post("/login",postLogin)


module.exports=authRouter;