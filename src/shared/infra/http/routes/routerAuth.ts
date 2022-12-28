import { Router } from 'express';
import { SignInController } from '@/modules/auth/useCases/SignIn/SignIn.Controller';
import { SignUpController } from '@/modules/auth/useCases/SignUp/SignUp.Controller';
import { SendForgotPasswordMailController } from '@/modules/auth/useCases/SendForgotPasswordMail/SendForgotPasswordMail.Controller';
import { RefreshTokenController } from '@/modules/auth/useCases/RefreshToken/RefreshToken.Controller';
import { ResetPasswordController } from '@/modules/auth/useCases/ResetPassword/ResetPassword.Controller';

const routerAuth = Router();
const signIn = new SignInController();
const signUp = new SignUpController();
const sendForgotPasswordMail = new SendForgotPasswordMailController();
const refreshToken = new RefreshTokenController();
const resetPassword = new ResetPasswordController();

routerAuth.post('/signin', signIn.execute);
routerAuth.post('/signup', signUp.execute);

routerAuth.post('/forgot', sendForgotPasswordMail.execute);

routerAuth.post('/refresh-token', refreshToken.execute);
routerAuth.post('/password/reset', resetPassword.execute);

export default routerAuth;
