import express from 'express'
import userRouter from './userRoute'
import mitraRouter from './mitraRoute'
import postRouter from './postRoute'
import categoryRouter from './categoryRoute'
import subcategoryRouter from './subcategoryRoute'

const router = express.Router()
const allRoutes = express()

allRoutes.use('/api/user', userRouter)
allRoutes.use('/api/mitra', mitraRouter)
allRoutes.use('/api/post', postRouter)
allRoutes.use('/api/category', categoryRouter)
allRoutes.use('/api/subcategory', subcategoryRouter)
router.get('/hello', (req, res) => {
  res.send('Hello, World!')
})

export default allRoutes
