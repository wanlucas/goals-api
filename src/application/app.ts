import 'express-async-errors';
import express from 'express';
import errorHandler from './tool/errorHandler';

import userRouter from './router/userRouter';
import publicRouter from './router/publicRouter';

import TokenValidator from './middleware/TokenValidator';

const app = express();

app.use(express.json());

app.use('/public', publicRouter);

app.use(TokenValidator.execute);

app.use('/user', userRouter);

app.use(errorHandler);

export default app;