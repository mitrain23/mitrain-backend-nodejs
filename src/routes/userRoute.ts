import express from 'express'
import UserController from '../controllers/userController'
import upload from '../utils/multer'

const router = express.Router()

router.get('', (req, res) => {
  res.status(200).json('api ready')
})
router.post('/register', upload.single('images'), UserController.registerUser)
router.post('/login', UserController.loginUser)
router.get('/user', UserController.getAllUser)

export default router
