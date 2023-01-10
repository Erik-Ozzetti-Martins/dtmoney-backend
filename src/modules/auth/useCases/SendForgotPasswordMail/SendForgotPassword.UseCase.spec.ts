import { UserRepositoryInMemory } from '@/modules/auth/repositories/implementations/User.Repository.InMemory';
import { UsersTokensRepositoryInMemory } from '@/modules/auth/repositories/implementations/UsersTokens.Repository.InMemory';
import { MailProviderInMemory } from '@/shared/container/providers/MailProvider/inMemory/MailProviderInMemory';
import { DateJs } from '@/utils/Date';
import { SendForgotPasswordMailUseCase } from './SendForgotPassword.UseCase';
import AppError from '@/shared/errors/AppError';
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateJs: DateJs;
let mailProvider: MailProviderInMemory;
describe('SendForgotPasswordMail UseCase', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateJs = new DateJs();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      mailProvider,
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateJs,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      email: 'test@mail.com',
      name: 'John Doe',
      password: '1234',
    });
    await sendForgotPasswordMailUseCase.execute('test@mail.com');
    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('test11@mail.com'),
    ).rejects.toEqual(new AppError('User does not exists!', 401));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create',
    );

    await usersRepositoryInMemory.create({
      email: 'test@mail.com',
      name: 'John Doe',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('test@mail.com');

    expect(generateTokenMail).toBeCalled();
  });
});
