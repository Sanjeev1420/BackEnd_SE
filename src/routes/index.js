import express from 'express'
import UserRoutes from './users.js'
import CategoriesOnlineRoutes from './categoriesOnline.js'

const router = express.Router()
router.use('/user',UserRoutes)
router.use('/categoryOnline' , CategoriesOnlineRoutes);
// router.use('/productsOnline' , );

export default router