import AppError from '@/shared/errors/AppError';
import { UserRepositoryInMemory } from '@/modules/auth/repositories/implementations/User.Repository.InMemory';
import { UsersTokensRepositoryInMemory } from '@/modules/auth/repositories/implementations/UsersTokens.Repository.InMemory';
import { SignInUseCase } from './SignIn.UseCase';
import { DateJs } from '@/utils/Date';
let signInUseCase: SignInUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let userTokenRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DateJs;

describe('Sign In', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userTokenRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DateJs();
    signInUseCase = new SignInUseCase(
      userRepositoryInMemory,
      userTokenRepositoryInMemory,
      dateProvider,
    );
  });

  it('should be able to sign in', async () => {
    const user = {
      email: 'martinss2@gmail.com',
      password: 'testestes',
    };
    await userRepositoryInMemory.create({
      name: 'John Doe',
      email: 'martinss2@gmail.com',
      password: '$2a$08$72T9PnJr7.nxBThxb/1XzeAT4vqOW5tjKMqsU0xGJ9Y4lHg4pUEwq',
    });

    const response = await signInUseCase.execute(user);

    expect(response.token).toBeTruthy();
  });

  it('should not be able to sign in with a non-existent user', async () => {
    const user = {
      email: 'martinss2@gmail.com',
      password: 'testestes',
    };

    await expect(signInUseCase.execute(user)).rejects.toEqual(
      new AppError('User not found', 401),
    );
  });

  it('should not be able to sign in with a wrong password', async () => {
    const user = {
      email: 'martinss2@gmail.com',
      password: 'testestes2222',
    };

    await userRepositoryInMemory.create({
      name: 'John Doe',
      email: 'martinss2@gmail.com',
      password: '$2a$08$72T9PnJr7.nxBThxb/1XzeAT4vqOW5tjKMqsU0xGJ9Y4lHg4pUEwq',
    });

    await expect(signInUseCase.execute(user)).rejects.toEqual(
      new AppError('Incorrect password or email', 401),
    );
  });
});
