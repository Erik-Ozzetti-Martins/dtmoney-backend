import auth from '@config/auth';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AppError from '../AppError';
import { UsersTokensRepository } from '../repositories/UsersTokens.Repository';
interface IPayload {
  sub: string;
}
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const usersTokensRepository = new UsersTokensRepository();
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      auth.jwt.secret_refreshToken,
    ) as IPayload;

    const user = await usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token,
    );
    if (!user) {
      throw new AppError('User does not exists');
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError('invalid jWT Token', 401);
  }
}
