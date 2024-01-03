import taskUseCase from '.';

export default class Undone {
  public async execute(id: string): Promise<void> {
    await taskUseCase.updateRecord(id, {
      done: false,
      duration: 0,
      quantity: 0,
    });
  }
}
