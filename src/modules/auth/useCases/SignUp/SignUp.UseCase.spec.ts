import AppError from '@/shared/errors/AppError';
import { UserRepositoryInMemory } from '../../repositories/implementations/User.Repository.InMemory';
import { SignUpUseCase } from './SignUp.UseCase';

let signUpUseCase: SignUpUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Sign Up', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    signUpUseCase = new SignUpUseCase(userRepositoryInMemory);
  });

  it('should be able to sign up', async () => {
    const user = {
      name: 'John Doe',
      email: 'martinss2@gmail.com',
      password: 'testestes',
    };

    const response = await signUpUseCase.execute(user);
    expect(response).toBeUndefined();
  });

  it('should not be able to sign up with an existing email', async () => {
    const user = {
      name: 'John Doe',
      email: 'martinss2@gmail.com',
      password: 'testestes',
    };

    await userRepositoryInMemory.create({
      name: 'John Doe',
      email: 'martinss2@gmail.com',
      password: '$2a$08$72T9PnJr7.nxBThxb/1XzeAT4vqOW5tjKMqsU0xGJ9Y4lHg4pUEwq',
    });

    await expect(signUpUseCase.execute(user)).rejects.toEqual(
      new AppError('User already exists', 401),
    );
  });
});
