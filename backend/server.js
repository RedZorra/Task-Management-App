import express from 'express';
import { connectDB }from './config/db.js';
import Middleware from './middleware/auth.js';
import taskRouter from './routes/Tasks.js';
import userRouter from './routes/userRoutes.js';

const app = express();

//connect to database
connectDB();

//middleware
app.use(express.json());
app.use(Middleware);
app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));