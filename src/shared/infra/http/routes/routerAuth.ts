import { Router } from 'express';
import { SignInController } from '@/modules/auth/useCases/SignIn/SignIn.Controller';
import { SignUpController } from '@/modules/auth/useCases/SignUp/SignUp.Controller';
import { SendForgotPasswordMailController } from '@/modules/auth/useCases/SendForgotPasswordMail/SendForgotPasswordMail.Controller';
import { RefreshTokenController } from '@/modules/auth/useCases/RefreshToken/RefreshToken.Controller';
import { ResetPasswordController } from '@/modules/auth/useCases/ResetPassword/ResetPassword.Controller';
import { celebrate, Joi, Segments } from 'celebrate';

const routerAuth = Router();
const signIn = new SignInController();
const signUp = new SignUpController();
const sendForgotPasswordMail = new SendForgotPasswordMailController();
const refreshToken = new RefreshTokenController();
const resetPassword = new ResetPasswordController();

routerAuth.post(
  '/signin',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  signIn.execute,
);
routerAuth.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  signUp.execute,
);

routerAuth.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),

  sendForgotPasswordMail.execute,
);

routerAuth.post(
  '/refresh-token',
  celebrate({
    [Segments.BODY]: {
      refresh_token: Joi.string().uuid().required(),
    },
  }),
  refreshToken.execute,
);
routerAuth.post(
  '/password/reset',

  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
    },
  }),
  resetPassword.execute,
);

export default routerAuth;
