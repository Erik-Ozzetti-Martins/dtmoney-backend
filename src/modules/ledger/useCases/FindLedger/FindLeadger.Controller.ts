import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindLedgerUseCase } from './FindLeadger.UseCase';

class FindLeadgerController {
  async execute(request: Request, response: Response): Promise<Response> {
    const id = request.user.id;

    const { page, limit } = request.query;
    const findLedger = container.resolve(FindLedgerUseCase);

    const ledger = await findLedger.execute(id, Number(page), Number(limit));

    return response.status(200).json(ledger);
  }
}

export { FindLeadgerController };
