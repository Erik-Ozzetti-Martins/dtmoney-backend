import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindLedgerUseCase } from './FindLeadger.UseCase';

class FindLeadgerController {
  async execute(request: Request, response: Response): Promise<Response> {
    const id = request.user.id;

    const findLedger = container.resolve(FindLedgerUseCase);

    const ledger = await findLedger.execute(id);

    return response.status(200).json(ledger);
  }
}

export { FindLeadgerController };
