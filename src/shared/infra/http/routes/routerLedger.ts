import { ensureAuthenticated } from '@/shared/infra/http/middlewares/ensureAuthenticated';
import { CreateLedgerController } from '@/modules/ledger/useCases/CreateLedger/CreateLedger.Controller';
import { FindLeadgerController } from '@/modules/ledger/useCases/FindLedger/FindLeadger.Controller';
import { Router } from 'express';

const routerLedger = Router();
const createLedgerController = new CreateLedgerController();
const findLeadgerController = new FindLeadgerController();

routerLedger.post('/', ensureAuthenticated, createLedgerController.execute);
routerLedger.get('/', ensureAuthenticated, findLeadgerController.execute);

export { routerLedger };
