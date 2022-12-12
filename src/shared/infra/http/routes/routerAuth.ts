import AuthController from 'controller/Auth.Controller';
import { Router } from 'express';

const routerAuth = Router();
const controllerAuth = new AuthController();

routerAuth.post('/login', controllerAuth.login);
routerAuth.post('/register', controllerAuth.register);
routerAuth.post('/refresh-token', controllerAuth.refreshToken);
routerAuth.post('/forgot', controllerAuth.sendForgotPasswordMail);
routerAuth.post('/password/reset', controllerAuth.resetPassword);

export default routerAuth;
