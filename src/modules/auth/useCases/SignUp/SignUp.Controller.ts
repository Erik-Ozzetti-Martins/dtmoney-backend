import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SignUpUseCase } from './SignUp.UseCase';

export class SignUpController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, email, password } = request.body;

    const signUp = container.resolve(SignUpUseCase);

    await signUp.execute({
      name,
      email,
      password,
    });
    return response.status(201).send();
  }
}
