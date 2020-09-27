import { Application, Request, Response, NextFunction } from "express";
import { BaseError } from "./base.error";

export const handleError = (app: Application) => {
  app.use(
    (error: BaseError, req: Request, res: Response, next: NextFunction) => {
      res.status(error.status).json(error);
    }
  );
};
