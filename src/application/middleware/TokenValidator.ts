import { NextFunction, Response, Request } from 'express';
import { TokenPayload, validateToken } from '../tool/webToken';
import { IRequest } from '../Interface';

export default class TokenValidator {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token not found' });

    try {
      const { id } = validateToken(token) as unknown as TokenPayload;

      (req as IRequest).user = { id };
  
      return next();
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}