import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SendForgotPasswordMailUseCase } from './SendForgotPassword.UseCase';

export class SendForgotPasswordMailController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordMailUseCase = container.resolve(
      SendForgotPasswordMailUseCase,
    );

    await sendForgotPasswordMailUseCase.execute(email);

    return response.status(204).send();
  }
}
