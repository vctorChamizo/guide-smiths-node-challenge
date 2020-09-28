import { Request, Response, NextFunction } from 'express';
import { SUCCESSFUL_OP } from '@constants';

import { getInputFiles, createInputFile } from '../services';

export const GetInputFiles = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const { filename } = req.query as { filename: string };

    await createInputFile(data, filename);

    res.status(200).json(SUCCESSFUL_OP);
  } catch (error) {
    next(error);
  }
};
