import AppError from 'AppError';
import { LedgerRepository } from 'repositories/Ledger.Repository';
import UserRepository from 'repositories/User.Repository';
import { getCustomRepository } from 'typeorm';
import { LedgerDto } from '../dtos/LedgetDto';

interface IRequest {
  type: string;
  title: string;
  amount: number;
  user_id: string;
  category: string;
}

interface IResponse {
  ledger: LedgerDto | LedgerDto[];
}

class LedgerService {
  async created({
    type,
    title,
    amount,
    user_id,
    category,
  }: IRequest): Promise<IResponse> {
    const ledgerRepository = new LedgerRepository();
    const userRepository = getCustomRepository(UserRepository);
    const userExists = await userRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('User does not exists.');
    }

    const newLedger = await ledgerRepository.create({
      type,
      title,
      amount,
      user_id,
      category,
    });
    return { ledger: newLedger };
  }
  async getAll(id: string): Promise<IResponse> {
    const ledgerRepository = new LedgerRepository();

    const ledgers = await ledgerRepository.getAll(id);
    return { ledger: ledgers };
  }
}

export { LedgerService };
