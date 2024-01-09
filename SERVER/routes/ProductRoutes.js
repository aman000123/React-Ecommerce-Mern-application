import express from 'express';
import { isAdmin, requireSignin } from '../middleware/authMiddleware.js';
import { createProduct, getAllProductController, getSingleProductController, getproductPhotoController, updateProductController, deleteProductController, productFilterController, loadMoreProductCountController, productListPerPage, searchProductController, relatedProductController, categoryWiseProductsController, braintreeTokenController, brainTreePaymentController } from '../controller/productController.js';


import formidable from 'express-formidable'

const router = express.Router();

//formidable() ko pohoto  ke liye lagate 

router.post('/create-product', requireSignin, isAdmin, formidable(), createProduct)

router.get('/get-product', getAllProductController)

//single product
router.get('/get-product/:slug', getSingleProductController)


//get product photo only
router.get('/product-photo/:pid', getproductPhotoController)

//delete product

router.delete('/delete-product/:pid', deleteProductController)


router.put('/update-product/:pid', requireSignin, isAdmin, formidable(), updateProductController)



router.post('/product-filter', productFilterController)

//product count
router.get('/product-count', loadMoreProductCountController)


//product per page
router.get('/product-list/:page', productListPerPage)




//for filter and serarching product
router.get('/search/:keyword', searchProductController)


//similer product show in product details page 

router.get('/related-product/:pid/:cid', relatedProductController)


//category wise product
router.get('/product-category/:slug', categoryWiseProductsController)




//for payment routes
//isme token braintree se aata jisse account verify hai ki nhi btata

router.get('/braintree/token', braintreeTokenController)


//for payment
router.post('/braintree/payment', requireSignin, brainTreePaymentController)


export default router