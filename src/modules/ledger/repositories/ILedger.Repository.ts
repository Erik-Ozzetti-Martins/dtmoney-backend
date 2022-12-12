import { LedgerDto } from 'modules/ledger/dtos/LedgetDto';
import { Ledger } from 'entities/Ledger';

interface ILedgerRepository {
  create({
    type,
    title,
    amount,
    user_id,
    category,
  }: LedgerDto): Promise<Ledger>;
}
export { ILedgerRepository };
