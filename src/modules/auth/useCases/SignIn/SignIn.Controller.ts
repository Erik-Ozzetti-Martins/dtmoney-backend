import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SignInUseCase } from './SignIn.UseCase';

export class SignInController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const signInUse = container.resolve(SignInUseCase);
    const auth = await signInUse.execute({ email, password });

    return response.json(auth);
  }
}
