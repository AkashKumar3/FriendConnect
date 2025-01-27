import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

//Mongodb connnection
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('connected successfully'))
.catch((e)=>console.log('connection error', e));

const port  = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})