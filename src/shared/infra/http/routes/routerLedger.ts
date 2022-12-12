import { LedgerController } from 'controller/Ledger.Controller';
import { Router } from 'express';
import { ensureAuthenticated } from 'middlewares/ensureAuthenticated';

const routerLedger = Router();
const ledgerController = new LedgerController();

routerLedger.post('/', ensureAuthenticated, ledgerController.created);
routerLedger.get('/', ensureAuthenticated, ledgerController.getAll);

export { routerLedger };
