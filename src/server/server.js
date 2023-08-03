import express from 'express';
import dotenv from 'dotenv'
import '../utils/connection.js'
import cors from 'cors'
dotenv.config();
import router from '../routes/index.routes.js';

const PORT = process.env.PORT ||  3000;

const app = express();

app.use(express.json());
app.use(cors('*'))

app.use('/api', router)


app.listen(PORT, console.log(`Server running on PORT ${PORT}`))