import { Request } from 'express';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Body<T> = Pick<T, { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]>;

export interface IRequest extends Request {
  user: {
    id: string;
  }
}
