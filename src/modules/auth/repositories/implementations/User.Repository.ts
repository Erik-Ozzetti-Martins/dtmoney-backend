import { prisma } from '@/shared/infra/prisma';
import { User } from '@/modules/auth/dtos/UserDto';
import { IUserRepository } from '../IUser.Repository';

export class UserRepository implements IUserRepository {
  public async findByEmail(email: string): Promise<User | undefined> {
    const [user] = await prisma.user.findMany({
      where: {
        email,
      },
    });
    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const [user] = await prisma.user.findMany({
      where: {
        id,
      },
    });
    return user;
  }

  public async create({ email, name, password }: User): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
    return user;
  }

  public async update(user: User): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: user.password,
      },
    });
    return updatedUser;
  }
}
