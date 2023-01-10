import { IUsersTokensRepository } from '@/modules/auth/repositories/IUsersTokens.Repository';
import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import authConfig from '@/config/auth';
import AppError from '@/shared/errors/AppError';
import { IDateProvider } from '@/utils/Date';

interface IPayload {
  sub: string;
  email: string;
}

interface IRequest {
  token: string;
  refresh_token: string;
}
@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<IRequest> {
    const { email, sub: user_id } = verify(
      token,
      authConfig.jwt.secret_refreshToken,
    ) as IPayload;

    const userToken = await this.usersTokensRepository.findByUserToken(token);

    if (!userToken) {
      throw new AppError('Refresh token does not exists!');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, authConfig.jwt.secret_refreshToken, {
      subject: user_id,
      expiresIn: authConfig.jwt.expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(3);
    const tokenResponse = sign({}, authConfig.jwt.secret, {
      subject: user_id,
      expiresIn: authConfig.jwt.expiresIn,
    });
    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    return {
      refresh_token,
      token: tokenResponse,
    };
  }
}

export { RefreshTokenUseCase };
