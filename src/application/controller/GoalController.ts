
import goalUseCase from '../../domain/useCase/goalUseCase';
import { Request, Response } from 'express';
import { IRequest } from '../Interface';
     
export default class GoalController {
  static async findAll(req: Request, res: Response) {
    const { user } = (req as IRequest);
    const output = await goalUseCase.findAll(user.id);

    return res.status(200).json(output);
  }

  // static async findById(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const output = await goalUseCase.findById(id);

  //   return res.status(200).json(output);
  // }

  static async findByBranchId(req: Request, res: Response) {
    const { branchId } = req.params;
    const output = await goalUseCase.findByBranchId(branchId);

    return res.status(200).json(output);
  }

  static async bulkCreate(req: Request, res: Response) {
    const { user } = (req as IRequest);
    const { branchId, goals } = req.body;
    const output = await goalUseCase.bulkCreate(user.id, branchId, goals);

    return res.status(201).json(output);
  }

  static async create(req: Request, res: Response) {
    const { user } = (req as IRequest);
    const output = await goalUseCase.create(user.id, req.body);

    return res.status(201).json(output);
  }
}
