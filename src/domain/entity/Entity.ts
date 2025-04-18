import Joi from 'joi';
import { v4 as uuid } from 'uuid';
import { UnprocessableEntityError } from '../constant/HttpError';
import DateTime from './DateTime';

export interface IEntity {
  id?: string;
}

export interface IBody extends IEntity {
  [key: string]: any;
}

export default abstract class Entity {
  public readonly id: string;

  constructor(body: IBody, schema: Joi.ObjectSchema) {
    const { error } = schema.validate(body, { allowUnknown: true });

    if (error) {
      throw new UnprocessableEntityError(error.message);
    }

    this.id = body.id || uuid();
  }

  protected getYearMonthDay() {
    return new DateTime().toYearMonthDay();
  }
}
