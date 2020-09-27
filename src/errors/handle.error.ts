import { Application, Request, Response } from 'express';
import { BaseError } from './base.error';

export const handleError = (app: Application) => {
  app.use((error: BaseError, req: Request, res: Response) => {
    res.status(error.status).json(error);
  });
};
