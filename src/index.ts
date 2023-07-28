import cors from 'cors';
const express = require('express');

import router from './routes/userRoute';
import allRoutes from './routes';
import path from 'path';


const app = express();



app.use(express.static('public'));
app.use(cors());
app.use(express.json());



app.use(allRoutes)



app.listen(8080, () => {
    console.log('listening on port 8080');
});