

import { hashPassword, comparePassword } from "../helpers/authHelper.js"
import jwt from 'jsonwebtoken'


import userModel from "../model/userModel.js"
import orderModel from "../model/orderModel.js"

export const registerController = async (req, res) => {

    try {

        const { name, email, password, phone, address, answer } = req.body

        //validation 
        if (!name || !email || !password || !phone || !address || !answer) {
            return res.status(500).send({ message: 'Please fill in all fields' });
        }

        //check existion user
        const existUser = await userModel.findOne({ email: email })

        if (existUser) {
            return res.status(201).send({
                success: false,
                message: "Already register please login"
            })

        }

        const hash = await hashPassword(password)

        //save record 
        const user = await new userModel({ name, email, phone, address, password: hash, answer }).save()
        res.status(200).send({
            success: true,
            message: "User registerd suucess",
            user: user
        })
        console.log("user", user)
    }
    catch (error) {
        console.log("error in register", error)
        res.status(500).send({
            success: false,
            message: "Error in registraion",
            error: error
        })
    }

}





//JWT_SECRET

export const loginControoler = async (req, res) => {

    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'invalid Email or Password'
            });
        }
        //check user
        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd"
            })
        }
        const match = await comparePassword(password, user.password)


        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Enter correct password"
            })

        }

        //token generaate 
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        // console.log("token is", token)

        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
                userid: user._id
            }, token

        })
    }
    catch (error) {
        console.log("error in login", error)
        res.status(500).send({
            success: false,
            message: "Error in login",
            error: error
        })
    }



}

export const forgotPasswordControler = async (req, res) => {
    //get email first from user
    try {

        const { email, answer, newPassword } = req.body

        if (!email) {
            res.status(400).send({ message: 'Email is required' })
        }

        if (!answer) {
            res.status(400).send({ message: 'Answer is required' })
        }

        if (!newPassword) {
            res.status(400).send({ message: 'NewPassword is required' })
        }

        //check email and passw
        const user = await userModel.findOne({ email: email, answer: answer })
        if (!user) {
            res.status(400).send({ success: false, message: 'Wrong email or Answer' })
        }

        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: 'Password reset sucessfully'
        })

    } catch (error) {
        console.log("error in forgot password", error)
        res.status(500).send({
            message: false,
            message: "Some things went wrong"
        },
            error)
    }



}





export const testController = (req, res) => {
    console.log("protected routes")
    res.send("protect routes")

}



export const updateProfileController = async (req, res) => {


    try {

        const { name, email, password, address, phone } = req.body;

        const user = await userModel.findById(req.user._id)
        //
        if (password && password.length < 4) {
            return res.json({ Error: 'Password is required and four caharacter long' })
        }

        const hashed = password ? await hashPassword(password) : undefined;
        //undefinedmeans change ki need nhi
        const updateUser = await userModel.findByIdAndUpdate(req.user._id, {
            //if change then update otherwise same
            name: name || user.name,
            password: hashed || user.password,
            phone: phone || user.phone,
            address: address || user.address

        }, { new: true })

        res.status(200).send({
            success: true,
            message: 'Profile updated succesfully',
            updateUser
        })



    } catch (error) {
        console.log("error in updated profile", error)
        res.status(500).send({
            message: false,
            message: "Some things went wrong on Updates profile"
        },
            error)
    }




}


export const getOrdersControllers = async (req, res) => {

    try {
        //order model me buyer h us base pr product find
        //buyer me mongoose.object_id diya hai
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name");
        console.log("orders is here ", orders)
        res.json(orders);


    }
    catch (error) {
        console.log("error in getting order", error)
        res.status(500).send({
            message: false,
            message: "Some things went wrong on getting order"
        },
            error)
    }

}


export const getAllOrdersControllers = async (req, res) => {

    try {

        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name").sort({ createdAt: -1 });//sort se latest top pr show honge
        res.json(orders);


    } catch (error) {
        console.log("error in getting All order", error)
        res.status(500).send({
            message: false,
            message: "Some things went wrong on getting All orders"
        },
            error)
    }

}

export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.json(orders);

    } catch (error) {
        console.log("error in getting order status", error)
        res.status(500).send({
            message: false,
            message: "Some things went wrong on update order status"
        },
            error)
    }
}