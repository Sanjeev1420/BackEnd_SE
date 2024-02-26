import express from 'express'
import TokenValidation from '../middlewares/validateToken.js'
import UserController from '../controllers/users.js'

const router = express.Router()

router.post('/signin' , UserController.signIn)
router.post('/login' , UserController.logIn)
router.put('/updateUser' , TokenValidation,UserController.updateUser)
router.get('/:id', )
router.post('/addAddress', TokenValidation,UserController.addAddress)
router.post('/updateAddress' , TokenValidation,UserController.updateAddress)
router.delete('/deleteAddress' , TokenValidation)

export default router

