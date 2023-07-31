const User=require("../models/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const getLogin=(req,res)=>{
    res.render("login")
}

const getSignup=(req,res)=>{
    res.render("signup")
}

const postSignup=async(req,res)=>{
    // console.log(req.body)
    const{name,email,password}=req.body

    try{
        let existingUser= await User.findOne({email}).lean()
        if(existingUser){
            return res.redirect("/auth/login") //if already present redirect to login page
        }
        else{
            let saltRounds=await bcrypt.genSalt(10)
            let hashedPassword=await bcrypt.hash(password,saltRounds)
        
            let data=await User.create({
                name:name,
                email:email,
                password:hashedPassword
            })
            console.log(data); //used only to get the data in console,,store the await User in data variable

        }
        res.status(201).redirect("/auth/login") //we cant take "redirect" in a same block ,1st one mention in try block,
    }
    catch(error){
        console.log(error); //for understand what is the error
        res.redirect("/auth/signup")
    }

}

const postLogin=async (req,res)=>{
    const {email,password}= req.body;  //destructuring email and password from login form
    try{
        //verify user
        let existingUser=await User.findOne({email}).lean()
        if(existingUser){
            //verify password
            const validUser=await bcrypt.compare(password,existingUser.password) //both password need to be compare 1 in login time 2 is in database which is hash based password
            
            if(validUser){
                const token=await jwt.sign({id:existingUser._id},"SECRET")
               // console.log(token);
               // res.send(token) 
               res.cookie("jwt",token,{
                maxAge:24*60*60*1000,
                httpOnly:true,
                secure:true
               })
            //    res.render("home",{user:existingUser}) 1st step
            res.redirect("/profile/")
            }

        }
    }  catch(error){
      console.log(error);

      res.redirect("/auth/login")
    }
}


module.exports={
    getLogin,getSignup,postSignup,postLogin
}