import userUseCase from "../../domain/useCase/userUseCase";
import { Request, Response } from "express";

export default class UserController {
  static async create(req: Request, res: Response) {
    const output = await userUseCase.createUser(req.body);
    return res.status(201).json(output);
  }
}