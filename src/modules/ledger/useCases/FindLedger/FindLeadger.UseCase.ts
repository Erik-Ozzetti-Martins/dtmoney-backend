import { LedgerDto } from '@/modules/ledger/dtos/LedgerDto';
import { ILedgerRepository } from '@/modules/ledger/repositories/ILedger.Repository';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindLedgerUseCase {
  constructor(
    @inject('LedgerRepository')
    private ledgerRepository: ILedgerRepository,
  ) {}

  async execute(id: string): Promise<LedgerDto[]> {
    const ledger = await this.ledgerRepository.getAll(id);

    return ledger;
  }
}
export { FindLedgerUseCase };
