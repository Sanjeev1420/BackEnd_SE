import express from 'express'
import TokenValidation from '../middlewares/validateToken.js'
import coController from "../controllers/categoriesOnline.js"

const router = express.Router();

router.post('/addCategory' , coController.addCategory);
router.get('/getAllCategories' , TokenValidation ,coController.getAllCategories);

export default router;