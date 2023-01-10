import { UserRepositoryInMemory } from '@/modules/auth/repositories/implementations/User.Repository.InMemory';
import { UsersTokensRepositoryInMemory } from '@/modules/auth/repositories/implementations/UsersTokens.Repository.InMemory';
import { DateJs } from '@/utils/Date';
import { sign } from 'jsonwebtoken';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';
import { faker } from '@faker-js/faker';
import authConfig from '@/config/auth';
import AppError from '@/shared/errors/AppError';

let resetPasswordUseCase: ResetPasswordUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DateJs;

describe('Reset Password', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DateJs();
    resetPasswordUseCase = new ResetPasswordUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await usersRepositoryInMemory.create({
      email: faker.internet.email(),
      name: faker.name.firstName(),
      password: faker.internet.password(),
    });
    const { email, id } = user;

    const refresh_token = sign({ email }, authConfig.jwt.secret_refreshToken, {
      subject: id,
      expiresIn: authConfig.jwt.expires_in_refresh_token,
    });

    const tokens = await usersTokensRepositoryInMemory.create({
      expires_date: dateProvider.addHours(3),
      user_id: id,
      refresh_token,
    });

    const response = await resetPasswordUseCase.execute({
      token: tokens.refresh_token,
      password: faker.internet.password(),
    });

    expect(response).toBeUndefined();
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordUseCase.execute({
        password: faker.internet.password(),
        token: 'x',
      }),
    ).rejects.toEqual(new AppError('Token invalid', 401));
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const user = await usersRepositoryInMemory.create({
      email: faker.internet.email(),
      name: faker.name.firstName(),
      password: '$2a$08$72T9PnJr7.nxBThxb/1XzeAT4vqOW5tjKMqsU0xGJ9Y4lHg4pUEwq',
    });
    const { email, id } = user;
    const refresh_token = sign({ email }, authConfig.jwt.secret_refreshToken, {
      subject: id,
      expiresIn: authConfig.jwt.expires_in_refresh_token,
    });
    await usersTokensRepositoryInMemory.create({
      expires_date: dateProvider.addHours(0),
      user_id: id,
      refresh_token,
    });
    const response = await resetPasswordUseCase.execute({
      token: '3ccfe5e6-90b3-41e5-ba2e-e7e5d56f7d',
      password: faker.internet.password(),
    });

    expect(response).rejects.toEqual(new AppError('Token expired', 401));
  });
});
