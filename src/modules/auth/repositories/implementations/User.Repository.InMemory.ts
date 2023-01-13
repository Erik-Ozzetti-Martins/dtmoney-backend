import { IUserDto, IUser } from '@/modules/auth/repositories/IUser.Repository';
import { IUserRepository } from '../IUser.Repository';

class UserRepositoryInMemory implements IUserRepository {
  data: IUserDto[] = [];

  async findByEmail(email: string): Promise<IUserDto | undefined> {
    const user = this.data.find(user => user.email === email);
    return user;
  }

  async findById(id: string): Promise<IUserDto | undefined> {
    const user = this.data.find(user => user.id === id);
    return user;
  }

  async create({ email, name, password }: IUser): Promise<IUserDto> {
    const newUser = {
      id: String(new Date().valueOf()),
      name,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.data.push(newUser);
    return newUser;
  }

  async update(user: IUserDto): Promise<IUserDto> {
    const index = this.data.findIndex(user => user.id === user.id);
    this.data[index] = user;
    return user;
  }
}

export { UserRepositoryInMemory };
