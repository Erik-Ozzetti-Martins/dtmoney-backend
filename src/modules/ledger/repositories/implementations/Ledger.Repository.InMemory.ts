import { LedgerDto } from '../../dtos/LedgerDto';
import { ILedgerRepository } from '../ILedger.Repository';

class LedgerRepositoryInMemory implements ILedgerRepository {
  ledger: LedgerDto[] = [];

  async create({
    type,
    title,
    amount,
    userId,
    category,
  }: LedgerDto): Promise<LedgerDto> {
    const newLedger = {
      id: Math.random().toString(36).substr(2),
      type,
      title,
      amount,
      userId,
      category,
    };

    this.ledger.push(newLedger);

    return newLedger;
  }

  async getAll(id: string): Promise<LedgerDto[]> {
    const ledgersByUser = this.ledger.filter(ledger => ledger.userId === id);
    return ledgersByUser;
  }
}

export { LedgerRepositoryInMemory };
