import { container } from 'tsyringe';
import { UserRepository } from '@/modules/auth/repositories/implementations/User.Repository';
import { IUserRepository } from '@/modules/auth/repositories/IUser.Repository';
import { UsersTokensRepository } from '@/modules/auth/repositories/implementations/UsersTokens.Repository';
import { IUsersTokensRepository } from '@/modules/auth/repositories/IUsersTokens.Repository';
import { LedgerRepository } from '@/modules/ledger/repositories/implementations/Ledger.Repository';
import { ILedgerRepository } from '@/modules/ledger/repositories/ILedger.Repository';
import { EtherealMailProvider } from './providers/MailProvider/implementations/EtherealMailProvider';
import { IMailProvider } from './providers/MailProvider/IMail.Provider';
import { DateJs, IDateProvider } from '@/utils/Date';

container.registerSingleton<IUserRepository>('UsersRepository', UserRepository);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);

container.registerSingleton<ILedgerRepository>(
  'LedgerRepository',
  LedgerRepository,
);
const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
};

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  mailProvider.ethereal,
);

container.registerSingleton<IDateProvider>('DayjsDateProvider', DateJs);
