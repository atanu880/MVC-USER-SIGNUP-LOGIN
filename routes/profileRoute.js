//router instance

const express=require("express");
const { authorizeUser, checkUser } = require("../middlewares/authMiddleware");
let profileRouter=express.Router()


profileRouter.get("/",authorizeUser,checkUser,(req,res)=>{
     let user=req.user
    res.render("profile",{user})
})

module.exports=profileRouter
