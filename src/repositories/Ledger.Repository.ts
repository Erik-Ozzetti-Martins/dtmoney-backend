import { LedgerDto } from 'dtos/LedgetDto';
import { Ledger } from 'entities/Ledger';
import { getRepository, Repository } from 'typeorm';
import { ILedgerRepository } from './ILedger.Repository';

class LedgerRepository implements ILedgerRepository {
  repository: Repository<Ledger>;
  constructor() {
    this.repository = getRepository(Ledger);
  }
  async create({
    type,
    title,
    amount,
    user_id,
    category,
  }: LedgerDto): Promise<Ledger> {
    const ledger = this.repository.create({
      type,
      title,
      amount,
      user_id,
      category,
    });

    await this.repository.save(ledger);
    return ledger;
  }

  async getAll(id: string): Promise<LedgerDto[]> {
    const ledgers = this.repository.find({
      where: { user_id: id },
    });
    return ledgers;
  }
}

export { LedgerRepository };
