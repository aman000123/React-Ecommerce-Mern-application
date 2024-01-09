import express from 'express';
import { isAdmin, requireSignin } from '../middleware/authMiddleware.js';
import { createCategoryColler, updateCategoryColler, getAllCategoriesColler, getASingleCategoriesColler, deleteCategoriesColler } from '../controller/categoryController.js';
const router = express.Router();



router.post('/create-category', requireSignin, isAdmin, createCategoryColler)


router.put('/update-category/:id', requireSignin, isAdmin, updateCategoryColler)


router.get('/get-categories', getAllCategoriesColler)

router.get('/single-category/:slug', getASingleCategoriesColler)



router.delete('/delete-category/:id', requireSignin, isAdmin, deleteCategoriesColler)




export default router