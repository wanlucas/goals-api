import Joi from 'joi';
import Entity, { IEntity } from './Entity';

const userSchema = Joi.object({
  id: Joi.string().uuid(),
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(8).max(30).required(),
});

export interface IUser extends IEntity {
  name: string;
  password: string;
}

export default class User extends Entity {
  public readonly name: string;
  public readonly password: string;

  public constructor (body: IUser) {
    super(body, userSchema);

    this.name = body.name;
    this.password = body.password;
  }
}