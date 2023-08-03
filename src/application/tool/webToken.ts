import 'dotenv/config';
import jwt from 'jsonwebtoken';

const key = process.env.JWT_KEY || 'secret';

export interface TokenPayload {
  id: string;
}

export const createToken = (payload: TokenPayload) => jwt.sign(payload, key);

export const validateToken = (token: string) => jwt.verify(token, key);
