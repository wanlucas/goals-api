import Entity, { IEntity } from "./Entity";
import Joi from "joi";

const goalSchema = Joi.object({
  id: Joi.string().uuid(),
  description: Joi.string().min(3).max(200).required(),
  target: Joi.number().min(1).required(),
  score: Joi.number().min(1).max(Joi.ref('target')),
  difficulty: Joi.number().min(1).max(10).required(),
  branchId: Joi.string().uuid().required(),
});

export interface IGoal extends IEntity {
  description: string;
  target: number;
  score?: number;
  branchId: string;
  difficulty: number;
}

export default class Goal extends Entity {
  public readonly description: string;
  public readonly target: number;
  public readonly branchId: string;
  public readonly difficulty: number;
  public score: number;

  public constructor (body: IGoal) {
    super(body, goalSchema);

    this.description = body.description;
    this.target = body.target;
    this.branchId = body.branchId;
    this.difficulty = body.difficulty;
    this.score = body.score || 0;
  }

  public updateScore(score: number): void {
    this.score = Math.min(this.target, this.score + score);
  }

  public isCompleted(): boolean {
    return this.score === this.target;
  }

  public getXp(): number {
    return this.difficulty * 21.21;
  }
}