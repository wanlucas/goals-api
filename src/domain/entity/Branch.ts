import Entity, { IEntity } from './Entity';
import Joi from 'joi';

const branchSchema = Joi.object({
  id: Joi.string().uuid(),
  name: Joi.string().min(3).max(25).required(),
  class: Joi.string().min(3).max(25),
  userId: Joi.string().uuid().required(),
  icon: Joi.string().max(10),
  xp: Joi.number().min(0),
});

export interface IBranch extends IEntity {
  name: string;
  userId: string;
  class?: string | null;
  xp?: number;
  icon?: string;
}

export default class Branch extends Entity {
  public readonly name: string;
  public readonly userId: string;
  public readonly icon: string;
  public readonly class: string | null;
  public xp: number;

  public constructor (body: IBranch) {
    super(body, branchSchema);

    this.name = body.name;
    this.userId = body.userId;
    this.xp = body.xp || 0;
    this.icon = body.icon || '1';
    this.class = body.class || null;
  }

  public incrementXp(variation: number): void {
    this.xp += variation;
  }
}