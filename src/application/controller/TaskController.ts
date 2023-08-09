
import taskUseCase from '../../domain/useCase/taskUseCase';
import { Request, Response } from 'express';
     
export default class TaskController {
  static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const output = await taskUseCase.findById(id);

    return res.status(200).json(output);
  }

  static async create(req: Request, res: Response) {
    const output = await taskUseCase.create(req.body);
    return res.status(201).json(output);
  }
}
