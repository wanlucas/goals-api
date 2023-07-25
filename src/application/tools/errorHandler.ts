import { Response, Request, NextFunction } from 'express';
import HttpError from '../../domain/constant/HttpError';

export default (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  console.log(err.message);

  return res.status(500).json({
    message: 'Internal Server Error',
  });
};