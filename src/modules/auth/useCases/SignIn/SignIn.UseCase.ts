import { IUserRepository } from '@/modules/auth/repositories/IUser.Repository';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserDto } from '@/modules/auth/dtos/UserDto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { injectable, inject } from 'tsyringe';
import AppError from '@/shared/errors/AppError';

import authConfig from '../../../../config/auth';
import { IUsersTokensRepository } from '../../repositories/IUsersTokens.Repository';
import { IDateProvider } from '@/utils/Date';

interface ISignInDTO {
  email: string;
  password: string;
}
interface IResponse {
  user: UserDto;
  token: string;
  refreshToken: string;
}

@injectable()
class SignInUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('UsersTokensRepository')
    private usersTokenRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: ISignInDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', 401);
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError('Incorrect password or email', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });
    const refreshToken = sign({ email }, authConfig.jwt.secret_refreshToken, {
      subject: user.id,
      expiresIn: authConfig.jwt.expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(3);
    await this.usersTokenRepository.create({
      user_id: user.id,
      refresh_token: refreshToken,
      expires_date: refresh_token_expires_date,
    });

    return {
      user: new UserDto(user),
      token,
      refreshToken,
    };
  }
}
export { SignInUseCase };
