import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'database/';
import cors from 'cors';
import AppError from 'AppError';
import indexRouter from 'shared/infra/http/routes/routes/routerIndex';

const app = express();
app.use(express.json());
app.use(cors());
app.use(indexRouter);

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

app.listen(3333, () => {
  console.log('server start in port 3333');
});
