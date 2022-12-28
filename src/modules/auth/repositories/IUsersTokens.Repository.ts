import { ICreateUserTokenDTO } from '@/modules/auth/dtos/ICreateUserTokenDTO';

interface IUsersTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<ICreateUserTokenDTO>;
  findByUserToken(refresh_token: string): Promise<ICreateUserTokenDTO>;
  deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };

export interface IUsersTokensRepositoryD {
  id: string;
  user_id: string;
  refresh_token: string;
  expires_date: Date;
  created_at: Date;
  updated_at: Date;
}
