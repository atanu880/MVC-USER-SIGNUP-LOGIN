//authorize the user
const jwt = require("jsonwebtoken")
const User = require("../models/User")


const authorizeUser = async (req, res, next) => {
    try {
        let token = req.cookies.jwt
        if (token) {
            //  let verifiedtoken=await jwt.verify(token,"SECRET")  1st one //jwt.verify to verify whether token is present or not 
            let decodedToken = await jwt.verify(token, "SECRET")
            if (decodedToken) {
                next()
            } else {
                res.redirect("/auth/login")
            }
        } else {
            
            res.redirect("/auth/login")
        }


    } catch (error) {
        res.redirect("/auth/login")
    }

}

const checkUser = async (req, res, next) => {
    try {
        let token = req.cookies.jwt
        if (token) {
            let decodedToken = await jwt.verify(token, "SECRET")
            if (decodedToken) {

                let id = decodedToken.id
                let user = await User.findById(id)
                req.user = user
                next()
            } else {
                res.user = null
                res.redirect("/auth/login")
            }
        } else {
            res.user = null
            res.redirect("/auth/login")
        }


    } catch (error) {
        res.user = null
        res.redirect("/auth/login")
    }

}


module.exports = {
    authorizeUser,
    checkUser
}