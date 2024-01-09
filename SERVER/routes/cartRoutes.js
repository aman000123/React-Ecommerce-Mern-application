
import express from 'express';
import { cartController, deleteCartController, getCartController } from '../controller/cartControler.js';
import { requireSignin } from '../middleware/authMiddleware.js';
const router = express.Router();


router.post('/cartAdd/:userId', requireSignin, cartController)

router.get('/getCart/:userId', requireSignin, getCartController)

router.delete('/cartDelete/:userId/:productId', requireSignin, deleteCartController)


export default router