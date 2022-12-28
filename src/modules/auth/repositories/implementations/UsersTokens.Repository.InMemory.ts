import { ICreateUserTokenDTO } from '@/modules/auth/dtos/ICreateUserTokenDTO';
import { IUsersTokensRepositoryD } from '@/modules/auth/repositories/IUsersTokens.Repository';
import { IUsersTokensRepository } from '../IUsersTokens.Repository';
interface ICreateUserToken {
  expires_date: Date;
  token: string;
  user_id: string;
}
class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  userTokens: IUsersTokensRepositoryD[] = [];
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<ICreateUserTokenDTO> {
    const userToken = {
      id: Math.random().toString(36).substr(2),
      expires_date,
      refresh_token,
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.userTokens.push(userToken);
    return Promise.resolve(userToken);
  }

  async findByUserToken(refresh_token: string): Promise<ICreateUserTokenDTO> {
    const find = await this.userTokens.find(
      token => token.refresh_token === refresh_token,
    );
    return find;
  }
  async deleteById(id: string): Promise<void> {
    await this.userTokens.filter(token => token.id !== id);
  }
}
export { UsersTokensRepositoryInMemory };
