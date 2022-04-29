import { Router } from 'express';
import routerAuth from './routerAuth';

const indexRouter = Router();

indexRouter.use('/api/auth', routerAuth);

export default indexRouter;
