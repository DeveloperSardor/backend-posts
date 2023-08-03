import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

mongoose.connect(process.env.DB_URL)
.then(()=> console.log('Connected successfuly!'))
.catch(err=> console.log(err.message))