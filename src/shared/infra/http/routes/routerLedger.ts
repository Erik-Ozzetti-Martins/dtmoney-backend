import { ensureAuthenticated } from '@/shared/infra/http/middlewares/ensureAuthenticated';
import { CreateLedgerController } from '@/modules/ledger/useCases/CreateLedger/CreateLedger.Controller';
import { FindLeadgerController } from '@/modules/ledger/useCases/FindLedger/FindLeadger.Controller';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

const routerLedger = Router();
const createLedgerController = new CreateLedgerController();
const findLeadgerController = new FindLeadgerController();

routerLedger.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      type: Joi.string().required(),
      title: Joi.string().required(),
      amount: Joi.number().required(),
      category: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  createLedgerController.execute,
);
routerLedger.get('/', ensureAuthenticated, findLeadgerController.execute);

export { routerLedger };
