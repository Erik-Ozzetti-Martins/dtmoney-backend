import { Router } from 'express';
import routerAuth from './routerAuth';
import { routerLedger } from './routerLedger';

const indexRouter = Router();

indexRouter.use('/api/v1/auth', routerAuth);
indexRouter.use('/api/v1/ledger', routerLedger);

export default indexRouter;
