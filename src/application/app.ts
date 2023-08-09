import 'express-async-errors';
import express from 'express';
import errorHandler from './tool/errorHandler';

import userRouter from './router/userRouter';
import branchRouter from './router/branchRouter';
import goalRouter from './router/goalRouter';
import publicRouter from './router/publicRouter';

import TokenValidator from './middleware/TokenValidator';

const app = express();

// app.use(express.json());

// app.use('/public', publicRouter);

// app.use(TokenValidator.execute);

// app.use('/user', userRouter);
// app.use('/branch', branchRouter);
// app.use('/goal', goalRouter);

// app.use(errorHandler);

export default app;