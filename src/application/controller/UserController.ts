import userUseCase from '../../domain/useCase/userUseCase';
import { Request, Response } from 'express';
     
export default class UserController {
  static async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const output = await userUseCase.findOne(id);

    return res.status(200).json(output);
  }

  static async create(req: Request, res: Response) {
    const output = await userUseCase.create(req.body);

    return res.status(201).json(output);
  }
}