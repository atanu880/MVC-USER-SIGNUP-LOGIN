const express=require("express")
const mongoose=require("mongoose")
const authRouter=require("./routes/authRoutes")
const cookieParser=require("cookie-parser")
const profileRouter = require("./routes/profileRoute")

let app=express()

//register template engine
app.set("view engine","ejs")

//db connection

async function db(){
    await mongoose.connect("mongodb://127.0.0.1:27017/authDB")
    console.log("db connected");
}
db()

//in built middleware
app.use(express.static("public"))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser()) //to pass the cookie as a object


//routes for app
app.use("/auth",authRouter)
app.use("/profile",profileRouter)  

app.listen(5000,()=>{
    console.log("server is running on port 5000");
})

//cookies 
app.get("/setCookie",(req,res)=>{
    res.cookie("marks","25",{
        maxAge:24*60*60*1000,   //cookie life(available marks value) 24 hr i set
        httpOnly:true, //to prevent client side script from accessing cookie value
        secure:true
    })
    res.send("cookie set")
})

app.get("/getCookie",(req,res)=>{
    res.send(req.cookies)
})

// app.get("/deleteCookie",(req,res)=>{
//     res.clearCookie("marks")     //res.clearcookie method
//     res.send("cookie deleted")
// })

//alternate method of above delete cookie
app.get("/deleteCookie",(req,res)=>{
    res.cookie("marks","",{       //if any one access my cookie,he not get the value,cz of empty string
        maxAge:5000,    //after set ,,deletecookie type on url,,then after 5 sec marks will disappread automatically
        httpOnly:true,
        secure:true
    })
    res.send("cookie deleted")
})
