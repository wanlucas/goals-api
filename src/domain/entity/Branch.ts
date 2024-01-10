import Entity, { IEntity } from './Entity';
import Joi from 'joi';

const branchSchema = Joi.object({
  id: Joi.string().uuid(),
  name: Joi.string().min(3).max(25).required(),
  class: Joi.string().min(3).max(25).allow(null),
  userId: Joi.string().uuid().required(),
  icon: Joi.string().max(10).allow(null),
});

export interface IBranch extends IEntity {
  name: string;
  userId: string;
  class?: string | null;
  icon?: string | null;
}

export default class Branch extends Entity {
  public readonly name: string;
  public readonly userId: string;
  public readonly icon: string | null;
  public readonly class: string | null;

  public constructor (body: IBranch) {
    super(body, branchSchema);

    this.name = body.name;
    this.userId = body.userId;
    this.icon = body.icon || null;
    this.class = body.class || null;
  }
}