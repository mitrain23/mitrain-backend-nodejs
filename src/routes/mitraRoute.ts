import express from 'express'
import MitraController from '../controllers/mitraController'
import upload from '../utils/multer'

const router = express.Router()

router.get('', (req, res) => {
  res.status(200).json('api ready')
})
router.post(
  '/register/mitra',
  upload.array('images', 5),
  MitraController.registerMitra
)
router.post('/login/mitra', MitraController.loginMitra)
router.get('/mitra', MitraController.getAllMitra)

export default router
