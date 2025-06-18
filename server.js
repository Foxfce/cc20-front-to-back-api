import express from "express";
import morgan from "morgan";
import cors from 'cors';

// Routing
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';

const app = express();

//Basic middlewares
app.use(cors()); //Allow cross domains
app.use(morgan('dev')); //Show logs
app.use(express.json()); // for read body

//Routing GET, POST, PUSH, PATCH, DELETE
// http://localhost:8000
app.use('/api',userRouter);
app.use('/auth',authRouter);




const PORT = 8000;
//START Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));