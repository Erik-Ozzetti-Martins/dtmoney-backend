import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';

export class ResetPasswordController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;
    const { password } = request.body;

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

    await resetPasswordUseCase.execute({ token, password });

    return response.status(204).send();
  }
}
