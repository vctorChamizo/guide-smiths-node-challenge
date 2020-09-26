import { Request, Response, NextFunction } from "express";

import { executeInput, getOutputFiles } from "../services";

export const GetOutputFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filesName = await getOutputFiles();

    res.status(200).json(filesName);
  } catch (error) {
    next(error);
  }
};

export const ExecuteInput = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { filename } = req.query as { filename: string };

    const scannigs = executeInput(filename);

    res.status(200).json(scannigs);
  } catch (error) {
    next(error);
  }
};
