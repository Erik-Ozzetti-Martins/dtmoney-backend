import { Request, Response } from 'express';

export class AuthSignInController {
  execute(request: Request, response: Response): Response {
    return response.json({ message: 'Hello World' });
  }
}
