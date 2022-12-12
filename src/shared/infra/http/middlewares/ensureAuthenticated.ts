import auth from '@config/auth';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import AppError from 'shared/errors/AppError';

interface IPayload {
  sub: string;
}
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }
  const token = authHeader.replace(/^Bearer\s(.)/, '$1');

  if (!token) {
    throw new AppError('Token missing', 401);
  }

  try {
    const { sub: user_id } = verify(token, auth.jwt.secret) as IPayload;
    request.user = {
      id: user_id,
    };

    return next();
  } catch (error) {
    throw new AppError('invalid JWT Token', 401);
  }
}
