import express from 'express';
import userRouter from './userRoute';
import postRouter from './postRoute';




const allRoutes = express();

allRoutes.use('/api', userRouter)
allRoutes.use('/api', postRouter)

export default allRoutes