import express from 'express'
import userRouter from './userRoute'
import mitraRouter from './mitraRoute'
import postRouter from './postRoute'

const router = express.Router()
const allRoutes = express()

allRoutes.use('/api', userRouter)
allRoutes.use('/api', mitraRouter)
allRoutes.use('/api', postRouter)
router.get('/hello', (req, res) => {
  res.send('Hello, World!')
})

export default allRoutes
