import express from 'express';
const router = express.Router();
import { registerController, loginControoler, testController, forgotPasswordControler, updateProfileController, getOrdersControllers, getAllOrdersControllers, orderStatusController } from '../controller/authController.js'
import { requireSignin, isAdmin } from '../middleware/authMiddleware.js';
import { sendEmail, sentOtp } from '../controller/sentOtp.js';



//for register

router.post('/register', registerController);

router.post('/login', loginControoler);

router.post('/sent-otp', sentOtp)
router.get('/sent-email', sendEmail)

router.get('/test', requireSignin, isAdmin, testController);



//protected route

router.get('/user-auth', requireSignin, (req, res) => {
    res.status(200).send({ ok: true })
});


//admin routes
router.get('/admin-auth', requireSignin, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
});
//forgot password

router.post('/forgot-password', forgotPasswordControler);


//update profile

router.put('/update', requireSignin, updateProfileController)



//order items

router.get('/orders', requireSignin, getOrdersControllers)


router.get('/Allorders', requireSignin, isAdmin, getAllOrdersControllers)



//order status update

router.put('/order-status/:orderId', requireSignin, isAdmin, orderStatusController)

export default router
