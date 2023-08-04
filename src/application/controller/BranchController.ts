
import branchUseCase from '../../domain/useCase/branchUseCase';
import { Request, Response } from 'express';
import { IRequest } from '../Interface';
     
export default class BranchController {
  static async findAll(req: Request, res: Response) {
    const { user } = (req as IRequest);
    const output = await branchUseCase.findAll(user.id);

    return res.status(200).json(output);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const output = await branchUseCase.findById(id);

    return res.status(200).json(output);
  }

  static async create(req: Request, res: Response) {
    const { user } = (req as IRequest);
    const output = await branchUseCase.create({ 
      ...req.body,
      userId: user.id
    });

    return res.status(201).json(output);
  }
}
