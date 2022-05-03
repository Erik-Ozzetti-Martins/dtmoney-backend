import { LedgerService } from '@services/Ledger.Service';
import { Request, Response } from 'express';

class LedgerController {
  async created(request: Request, response: Response): Promise<Response> {
    const ledgerService = new LedgerService();
    const { type, title, amount, category } = request.body;
    const { id } = request.user;

    const ledger = await ledgerService.created({
      type,
      title,
      amount,
      user_id: id,
      category,
    });
    return response.json(ledger);
  }
  async getAll(request: Request, response: Response): Promise<Response> {
    const ledgerService = new LedgerService();
    const { id } = request.user;
    const ledgerAll = await ledgerService.getAll(id);

    return response.json(ledgerAll);
  }
}

export { LedgerController };
