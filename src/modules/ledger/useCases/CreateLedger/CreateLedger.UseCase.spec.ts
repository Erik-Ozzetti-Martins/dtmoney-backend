import { LedgerRepositoryInMemory } from '@/modules/ledger/repositories/implementations/Ledger.Repository.InMemory';
import { CreateLedgerUseCase } from './CreateLedger.UseCase';

let ledgerRepositoryInMemory: LedgerRepositoryInMemory;
let createLedgerUseCase: CreateLedgerUseCase;

describe('Create Ledger', () => {
  beforeEach(() => {
    ledgerRepositoryInMemory = new LedgerRepositoryInMemory();
    createLedgerUseCase = new CreateLedgerUseCase(ledgerRepositoryInMemory);
  });

  it('should be able to create a new ledger', async () => {
    const ledger = {
      type: 'income',
      title: 'Salary',
      amount: 1000,
      userId: '123',
      category: 'Salary',
    };

    await createLedgerUseCase.execute(ledger);
  });
});
