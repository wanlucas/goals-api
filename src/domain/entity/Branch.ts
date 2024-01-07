import Entity, { IEntity } from './Entity';
import Joi from 'joi';

const branchSchema = Joi.object({
  id: Joi.string().uuid(),
  name: Joi.string().min(3).max(25).required(),
  class: Joi.string().min(3).max(25),
  userId: Joi.string().uuid().required(),
  icon: Joi.string().max(10),
});

export interface IBranch extends IEntity {
  name: string;
  userId: string;
  class?: string | null;
  icon?: string;
}

export default class Branch extends Entity {
  public readonly name: string;
  public readonly userId: string;
  public readonly icon: string;
  public readonly class: string | null;

  public constructor (body: IBranch) {
    super(body, branchSchema);

    this.name = body.name;
    this.userId = body.userId;
    this.icon = body.icon || '1';
    this.class = body.class || null;
  }
}