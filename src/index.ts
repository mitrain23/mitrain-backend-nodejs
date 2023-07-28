import express from 'express';
import cors from 'cors';
import router from './routes/userRoute';
import allRoutes from './routes';
import path from 'path';
require('dotenv').config();


const app = express();



app.use(express.static('public'));
app.use(cors());
app.use(express.json());



app.use(allRoutes)



const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));