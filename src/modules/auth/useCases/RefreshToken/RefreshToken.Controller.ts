import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RefreshTokenUseCase } from './RefreshToken.UseCase';

class RefreshTokenController {
  public async execute(req: Request, res: Response): Promise<Response> {
    const { refreshToken } = req.body;
    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const token = await refreshTokenUseCase.execute(refreshToken);

    return res.status(201).json(token);
  }
}

export { RefreshTokenController };
