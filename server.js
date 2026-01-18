import express from 'express';
import connectDb from "./config/db.js"
import cookieParser from 'cookie-parser'
import AuthRoutes from './routes/authRoutes.js'
import {limiter} from './middleware/ratelimiter.js'

const app= express();
const PORT= 3000;
connectDb();
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth' ,AuthRoutes)

app.listen(PORT,()=>{
  console.log("server running on port 3000")
})