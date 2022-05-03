import auth from '@config/auth';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AppError from '../AppError';
import UserRepository from '../repositories/User.Repository';
import { getCustomRepository } from 'typeorm';

interface IPayload {
  sub: string;
}
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const userRepository = getCustomRepository(UserRepository);
  const authHeader = request.headers.authorization;
  console.log(authHeader, 'auth');
  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }
  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      auth.jwt.secret || auth.jwt.secret_refreshToken,
    ) as IPayload;
    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not  exists!', 401);
    }
    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError('invalid JWT Token', 401);
  }
}
