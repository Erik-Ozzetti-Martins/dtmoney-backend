import { IUsersTokensRepository } from '@/modules/auth/repositories/IUsersTokens.Repository';
import { IMailProvider } from '@/shared/container/providers/MailProvider/IMail.Provider';
import AppError from '@/shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { IDateProvider } from '@/utils/Date';
import { resolve } from 'path';
import { v4 as uuidV4 } from 'uuid';
import { IUserRepository } from '@/modules/auth/repositories/IUser.Repository';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider,
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}
  public async execute(email: string): Promise<void> {
    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs',
    );
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists!', 401);
    }

    const expires_date = this.dateProvider.addHours(3);

    const token = uuidV4();
    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const variables = {
      name: user.name,
      link: `http://localhost:3000/password/reset?token=${token} `,
    };

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha ',
      variables,
      templatePath,
    );
  }
}
export { SendForgotPasswordMailUseCase };
