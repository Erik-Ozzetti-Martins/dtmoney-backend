import { User } from '@/modules/auth/dtos/UserDto';

export type IUser = Omit<User, 'id'>;

export interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User>;
  create(data: IUser): Promise<User>;
  update(user: User): Promise<User>;
}

export interface IUserDto {
  id: string;
  name: string;
  email: string;
  password: string;
}
