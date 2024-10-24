import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/User.js';
import assignmentRouter from './routes/Assignment.js';
import classRouter from './routes/Class.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;


// Connect to DB

try{
    await mongoose.connect(process.env.MONGO_URI);
} catch(error){
    console.error(error);
}

// ===== Middlewares ===== //
app.use(morgan('dev')); // logger
app.use(express.json()); // parse data to the body
app.use(express.urlencoded({extended: true}));
app.use(cors()); // allows backend to talk to frontend in the same machine


//===== Routes =====
app.use('/user', userRouter);
app.use('/assignment', assignmentRouter);
app.use('/class', classRouter);

// ===== Error Middlewares ===== //
app.use((e, req, res, next) => {
    console.error(e);
    res.status(500).json({message: e.message, error: e });
});


app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));