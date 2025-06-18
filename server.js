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
app.use('/api', userRouter);
app.use('/auth', authRouter);

// Error Handling
app.use((err, req, res, next) => {
  // code body
  console.log(err.message);
  res
    .status(err.code || 500)
    .json({ message: err.message || "Something Wrong!!!" });
});


const PORT = 8000;
//START Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));