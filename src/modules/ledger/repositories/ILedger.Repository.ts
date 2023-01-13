import { LedgerDto } from '../dtos/LedgerDto';

interface ILedgerRepository {
  create(ledger: LedgerDto): Promise<LedgerDto>;

  getAll(id: string, page: number, limit: number): Promise<LedgerDto[]>;
}
export { ILedgerRepository };
