import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import '../../container';
import 'express-async-errors';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import rateLimiter from './middlewares/rateLimiter';
import AppError from '../../errors/AppError';
import indexRouter from './routes/routerIndex';
import swaggerFile from '../../../swagger.json';
import { config } from 'dotenv';
import { CelebrateError, errors } from 'celebrate';

config();
const app = express();
app.use(express.json());
app.use(errors());
app.use(cors());
app.use(rateLimiter);
app.use(indexRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    if (error instanceof CelebrateError) {
      const errorBody = error.details.get('body');
      return response.status(400).json({
        message: errorBody.message.split('"').join(''),
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'internal error',
    });
  },
);
export { app };
