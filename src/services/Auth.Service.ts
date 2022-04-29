import AppError from 'AppError';
import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { User } from 'entities/User';
import UserRepository from 'repositories/User.Repository';
import authConfig from '../config/auth';
import { v4 as uuidV4 } from 'uuid';
import { getCustomRepository } from 'typeorm';
import { UserDto } from 'dtos/UserDto';
import { UsersTokensRepository } from 'repositories/UsersTokens.Repository';
import { DateJs } from 'utils/Date';
import { EtherealMailProvider } from 'email/EtherealMailProvider';
import { resolve } from 'path';

interface IRequest {
  name?: string;
  email: string;
  password: string;
}
interface IResponse {
  user: UserDto;
  token: string;
  refresh_token: string;
}

interface IPayload {
  sub: string;
  email: string;
}

class AuthService {
  public async login({ email, password }: IRequest): Promise<IResponse> {
    console.log(email, password);
    const userRepository = getCustomRepository(UserRepository);

    const dateJs = new DateJs();

    const usersTokensRepository = new UsersTokensRepository();

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirm = await compare(password, user.password);

    if (!passwordConfirm) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    const refresh_token = sign({ email }, authConfig.jwt.secret_refreshToken, {
      subject: user.id,
      expiresIn: authConfig.jwt.expires_in_refresh_token,
    });

    const refresh_token_expires_date = dateJs.addDays(3);
    await usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    return {
      user: new UserDto(user),
      token,
      refresh_token,
    };
  }
  public async register({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const emailExists = await userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used');
    }
    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);
    return user;
  }

  async refreshToken(token: string): Promise<string> {
    const usersTokensRepository = new UsersTokensRepository();
    const { email, sub } = verify(
      token,
      authConfig.jwt.secret_refreshToken,
    ) as IPayload;
    const user_id = sub;
    const userToken = await usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token,
    );

    if (!userToken) {
      throw new AppError('Refresh token error not exists!');
    }
    await usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, authConfig.jwt.secret_refreshToken, {
      subject: sub,
      expiresIn: authConfig.jwt.expires_in_refresh_token,
    });

    await usersTokensRepository.create({
      expires_date: new Date(),
      refresh_token,
      user_id,
    });
    return refresh_token;
  }

  async sendForgotPasswordMail(email: string): Promise<void> {
    const dateJs = new DateJs();
    const userRepository = getCustomRepository(UserRepository);
    const usersTokensRepository = new UsersTokensRepository();
    const etherealMailProvider = new EtherealMailProvider();
    const templatePath = resolve(
      __dirname,
      '..',
      'views',
      'emails',
      'forgotPassword.hbs',
    );
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists.');
    }

    const expires_date = dateJs.addHours(3);

    const token = uuidV4();

    await usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const variables = {
      name: user.name,
      link: `http://localhost:3333/auth/password/reset?token=${token} `,
    };

    await etherealMailProvider.sendMail(
      email,
      'Recuperação  de senha ',
      variables,
      templatePath,
    );
  }
  async resetPassword(token: string, password: string): Promise<void> {
    const dateJs = new DateJs();

    const userRepository = getCustomRepository(UserRepository);

    const usersTokensRepository = new UsersTokensRepository();

    const userToken = await usersTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError('Token invalid!');
    }

    if (dateJs.compareIfBefore(userToken.expires_date, dateJs.dateNow())) {
      throw new AppError('Token expired!');
    }

    const user = await userRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await userRepository.create(user);

    await userRepository.save(user);

    await usersTokensRepository.deleteById(userToken.id);
  }
}

export default AuthService;
