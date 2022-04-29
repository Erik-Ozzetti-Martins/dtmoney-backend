import { Request, Response } from 'express';
import AuthService from '@services/Auth.Service';

class AuthController {
  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authService = new AuthService();
    const user = await authService.login({ email, password });

    return response.json(user);
  }

  async register(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const authService = new AuthService();
    const user = await authService.register({ name, email, password });

    return response.json(user);
  }
  async refreshToken(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers['x-acess-token'] ||
      request.query.token;

    const authService = new AuthService();
    const refreshToken = await authService.refreshToken(token);

    return response.json(refreshToken);
  }

  async sendForgotPasswordMail(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email } = request.body;

    const authService = new AuthService();
    await authService.sendForgotPasswordMail(email);
    return response.send();
  }
  async resetPassword(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const authService = new AuthService();
    await authService.resetPassword(String(token), password);

    return response.send();
  }
}

export default AuthController;
