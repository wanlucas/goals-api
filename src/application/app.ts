import 'express-async-errors';
import express from 'express';
import userRouter from './router/userRouter';
import errorHandler from './tool/errorHandler';

const app = express();

app.use(express.json());

app.use('/user', userRouter);

app.use(errorHandler);

export default app;