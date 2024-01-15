import taskUseCase from '.';

export default class Done {
  public async execute(id: string): Promise<void> {
    const foundTask = await taskUseCase.findById(id);

    await taskUseCase.updateRecord(id, {
      duration: foundTask.duration,
      quantity: foundTask.quantity,
    });
  }
}
