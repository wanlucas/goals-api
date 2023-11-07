import taskUseCase from '../../domain/useCase/taskUseCase';
import { Request, Response } from 'express';
import { IRequest } from '../Interface';

export default class TaskController {
  static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const output = await taskUseCase.findById(id);

    return res.status(200).json(output);
  }

  static async findCurrent(req: Request, res: Response) {
    const { user } = req as IRequest;
    const output = await taskUseCase.findCurrent(user.id);

    return res.status(200).json(output);
  }

  static async create(req: Request, res: Response) {
    const output = await taskUseCase.create(req.body);
    return res.status(201).json(output);
  }

  static async done(req: Request, res: Response) {
    const { id } = req.params;
    const output = await taskUseCase.done(id);

    return res.status(200).json(output);
  }

  static async undone(req: Request, res: Response) {
    const { id } = req.params;
    const output = await taskUseCase.undone(id);

    return res.status(200).json(output);
  }
}
