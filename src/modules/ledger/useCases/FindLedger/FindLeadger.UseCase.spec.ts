import { FindLedgerUseCase } from './FindLeadger.UseCase';
import { LedgerRepositoryInMemory } from '@/modules/ledger/repositories/implementations/Ledger.Repository.InMemory';

let ledgerRepositoryInMemory: LedgerRepositoryInMemory;
let findLedgerUseCase: FindLedgerUseCase;

describe('Find Ledger', () => {
  beforeEach(() => {
    ledgerRepositoryInMemory = new LedgerRepositoryInMemory();
    findLedgerUseCase = new FindLedgerUseCase(ledgerRepositoryInMemory);
  });

  it('should be able to find a ledger', async () => {
    const ledger = {
      type: 'income',
      title: 'Salary',
      amount: 1000,
      userId: '123',
      category: 'Salary',
    };
    const ledger2 = {
      type: 'income',
      title: 'Salary',
      amount: 1000,
      userId: '1234',
      category: 'Salary',
    };
    const ledger3 = {
      type: 'income',
      title: 'Salary',
      amount: 1000,
      userId: '1235',
      category: 'Salary',
    };

    await ledgerRepositoryInMemory.create(ledger);
    await ledgerRepositoryInMemory.create(ledger2);
    await ledgerRepositoryInMemory.create(ledger3);
    const foundLedger = await findLedgerUseCase.execute(ledger.userId);
    const response = await ledgerRepositoryInMemory.getAll('123');
    expect(response).toEqual(foundLedger);
  });

  it('should not be able to find a ledger', async () => {
    const ledger = {
      type: 'income',
      title: 'Salary',
      amount: 1000,
      userId: '12',
      category: 'Salary',
    };
    const ledger2 = {
      type: 'income',
      title: 'Salary',
      amount: 1000,
      userId: '1234',
      category: 'Salary',
    };
    const ledger3 = {
      type: 'income',
      title: 'Salary',
      amount: 1000,
      userId: '1235',
      category: 'Salary',
    };
    await ledgerRepositoryInMemory.create(ledger);
    await ledgerRepositoryInMemory.create(ledger2);
    await ledgerRepositoryInMemory.create(ledger3);
    const foundLedger = await findLedgerUseCase.execute('123');
    const response = await ledgerRepositoryInMemory.getAll('123');
    expect(response).toEqual(response);
  });
});
