import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateLedgerUseCase } from './CreateLedger.UseCase';
class CreateLedgerController {
  async execute(request: Request, response: Response): Promise<Response> {
    const id = request.user.id;
    const { amount, category, title, type } = request.body;

    const createLedger = container.resolve(CreateLedgerUseCase);

    const ledger = await createLedger.execute({
      amount,
      category,
      title,
      type,
      userId: id,
    });
    return response.status(201).json(ledger);
  }
}
export { CreateLedgerController };
