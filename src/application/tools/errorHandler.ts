import { Response, Request, NextFunction, ErrorRequestHandler } from "express";
import HttpError from "../../domain/constant/HttpError";

export default (err: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: 'Internal Server Error',
  });
};