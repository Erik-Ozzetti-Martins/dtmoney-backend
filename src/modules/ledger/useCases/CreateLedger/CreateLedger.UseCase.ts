import { ILedgerRepository } from '@/modules/ledger/repositories/ILedger.Repository';
import { LedgerDto } from '@/modules/ledger/dtos/LedgerDto';
import { inject, injectable } from 'tsyringe';

interface Ledger {
  type: string;
  title: string;
  amount: number;
  userId: string;
  category: string;
}

@injectable()
class CreateLedgerUseCase {
  constructor(
    @inject('LedgerRepository')
    private ledgerRepository: ILedgerRepository,
  ) {}

  async execute({
    amount,
    category,
    title,
    type,
    userId,
  }: Ledger): Promise<LedgerDto> {
    const ledger = await this.ledgerRepository.create({
      amount,
      category,
      title,
      type,
      userId,
    });

    return ledger;
  }
}
export { CreateLedgerUseCase };
