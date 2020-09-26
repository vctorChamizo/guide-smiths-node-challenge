import { Request, Response, NextFunction } from "express";

import { getInputFiles } from "../services";

export const GetInputFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filesName = await getInputFiles();

    res.status(200).json(filesName);
  } catch (error) {
    next(error);
  }
};

export const CreateInputFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};
