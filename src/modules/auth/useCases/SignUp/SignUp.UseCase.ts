import { IUserRepository } from '@/modules/auth/repositories/IUser.Repository';
import AppError from '@/shared/errors/AppError';
import { hash } from 'bcrypt';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class SignUpUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new AppError('User already exists', 401);
    }

    const hashedPassword = await hash(password, 8);

    await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}
export { SignUpUseCase };
