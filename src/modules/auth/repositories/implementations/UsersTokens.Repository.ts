import { ICreateUserTokenDTO } from '@/modules/auth/dtos/ICreateUserTokenDTO';
import { prisma } from '@/shared/infra/prisma/index';
import { IUsersTokensRepository } from '../IUsersTokens.Repository';

export class UsersTokensRepository implements IUsersTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<ICreateUserTokenDTO> {
    const userToken = prisma.userTokens.create({
      data: {
        expires_date,
        user_id,
        refresh_token,
      },
    });
    return userToken;
  }

  async findByUserToken(refresh_token: string): Promise<ICreateUserTokenDTO> {
    const userToken = await prisma.userTokens.findFirst({
      where: {
        refresh_token,
      },
    });
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await prisma.userTokens.delete({
      where: {
        id,
      },
    });
  }
}
