import db from '../../../infra/db';
import moment from 'moment';
import { NotFoundError } from '../../constant/HttpError';
import taskUseCase from '.';

export default class Done {
  public async execute(id: string): Promise<void> {
    const foundTask = await taskUseCase.findById(id);

    await taskUseCase.updateRecord(id, {
      done: true,
      duration: foundTask.duration,
      quantity: foundTask.quantity,
    });
  }
}
