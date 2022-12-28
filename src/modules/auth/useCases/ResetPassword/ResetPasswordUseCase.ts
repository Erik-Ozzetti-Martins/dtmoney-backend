import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@/modules/auth/repositories/IUser.Repository';
import { IUsersTokensRepository } from '@/modules/auth/repositories/IUsersTokens.Repository';
import AppError from '@/shared/errors/AppError';
import { IDateProvider } from '@/utils/Date';

interface IRequest {
  token: string;
  password: string;
}
@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByUserToken(token);

    if (!userToken) {
      throw new AppError('Token invalid', 401);
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow(),
      )
    ) {
      throw new AppError('Token expired', 401);
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = password;
    await this.usersRepository.update(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}
