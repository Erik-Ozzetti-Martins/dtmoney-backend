import { LedgerDto } from '../dtos/LedgerDto';

interface ILedgerRepository {
  create(ledger: LedgerDto): Promise<LedgerDto>;

  getAll(id: string): Promise<LedgerDto[]>;
}
export { ILedgerRepository };
