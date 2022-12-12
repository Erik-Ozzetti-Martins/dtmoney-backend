import { Router } from 'express';
import routerAuth from './routerAuth';
import { routerLedger } from './routerLedger';

const indexRouter = Router();

indexRouter.use('/api/auth', routerAuth);
indexRouter.use('/api/ledger', routerLedger);

export default indexRouter;
