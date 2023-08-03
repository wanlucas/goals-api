import userUseCase from '../../domain/useCase/userUseCase';
import { Request, Response } from 'express';
     
export default class UserController {
  static async login(req: Request, res: Response) {
    const output = await userUseCase.login(req.body);
    return res.status(200).json(output);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const output = await userUseCase.findById(id);

    return res.status(200).json(output);
  }

  static async create(req: Request, res: Response) {
    const output = await userUseCase.create(req.body);
    return res.status(201).json(output);
  }
}