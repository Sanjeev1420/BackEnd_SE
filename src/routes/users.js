import express from 'express'
import TokenValidation from '../middlewares/validateToken.js'
import UserController from '../controllers/users.js'

const router = express.Router()

router.post('/signin' , UserController.signIn)
router.post('/login' , UserController.logIn)
router.put('/updateUser' , TokenValidation,UserController.updateUser)
router.get('/', UserController.getUserById)
router.post('/addUserAddress', TokenValidation,UserController.addAddress)
router.put('/updateUserAddress' , TokenValidation,UserController.updateAddress)
router.delete('/deleteUserAddress' , TokenValidation,UserController.deleteAddress)

export default router

