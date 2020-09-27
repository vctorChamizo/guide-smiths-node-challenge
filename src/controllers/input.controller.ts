import { Request, Response, NextFunction } from "express";

import { getInputFiles, createInputFile } from "../services";

import { SUCCESSFUL_OP } from "@constants";

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
  const data = req.body;
  const { filename } = req.query as { filename: string };

  await createInputFile(data, filename);

  res.status(200).json(SUCCESSFUL_OP);
  try {
  } catch (error) {
    next(error);
  }
};
