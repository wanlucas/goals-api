import Entity, { IEntity } from './Entity';
import Joi from 'joi';

const branchSchema = Joi.object({
  id: Joi.string().uuid(),
  name: Joi.string().min(3).max(30).required(),
  userId: Joi.string().uuid().required(),
  xp: Joi.number().min(0).required(),
});

export interface IBranch extends IEntity {
  name: string;
  userId: string;
  xp: number;
}

export default class Branch extends Entity {
  public readonly name: string;
  public readonly userId: string;
  public readonly xp: number;

  public constructor (body: IBranch) {
    super(body, branchSchema);

    this.name = body.name;
    this.userId = body.userId;
    this.xp = body.xp;
  }
}