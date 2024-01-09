

import JWT from 'jsonwebtoken'
import userModel from '../model/userModel.js'

//protect routes

export const requireSignin = async (req, res, next) => {
    try {
        //verify token
        //token headers me aur secret key match kare
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)

        req.user = decode
        next()
    }
    catch (error) {
        console.log("error in middleware", error)

    }
}

//check admin

export const isAdmin = async (req, res, next) => {


    try {

        const user = await userModel.findById(req.user._id)
        if (user.role !== 1) {
            return res.status(401).send({ success: false, message: "Unauthorized access" })
        }
        else {
            next()
        }

    }
    catch (error) {
        console.log("err in admin", error)
        res.status(401).send({
            success: false,
            message: "error in admin middleware",
            error
        })
    }
}