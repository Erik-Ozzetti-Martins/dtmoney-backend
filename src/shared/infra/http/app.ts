import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import '../../container';
import 'express-async-errors';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import AppError from '../../errors/AppError';
import indexRouter from './routes/routerIndex';
import swaggerFile from '../../../swagger.json';
import { config } from 'dotenv';
config();
const app = express();
app.use(express.json());
app.use(cors());
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
    return response.status(500).json({
      status: 'error',
      message: 'internal error',
    });
  },
);
export { app };
