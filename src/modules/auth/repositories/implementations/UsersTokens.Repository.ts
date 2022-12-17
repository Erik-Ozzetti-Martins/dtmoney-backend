import { ICreateUserTokenDTO } from 'modules/auth/dtos/ICreateUserTokenDTO';
import { UserTokens } from 'entities/UserTokens';

import { IUsersTokensRepository } from './IUsersTokens.Repository';

class UsersTokensRepository implements IUsersTokensRepository {
  public repositry: Repository<UserTokens>;
  constructor() {
    this.repositry = getRepository(UserTokens);
  }
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repositry.create({
      expires_date,
      refresh_token,
      user_id,
    });
    await this.repositry.save(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    const usersTokens = await this.repositry.findOne({
      user_id,
      refresh_token,
    });
    return usersTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repositry.delete(id);
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = await this.repositry.findOne({ refresh_token });
    return userToken;
  }
}

export { UsersTokensRepository };
