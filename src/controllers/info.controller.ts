import { Request, Response, NextFunction } from 'express';
import { getLostRobots, getGridExplore } from '../services';

export const GetLostRobot = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { fileName } = req.query as { fileName: string };
    const robots: number = await getLostRobots(fileName);

    res.status(200).json(robots);
  } catch (error) {
    next(error);
  }
};

export const GetGridExplore = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json('');
  } catch (error) {
    next(error);
  }
};
