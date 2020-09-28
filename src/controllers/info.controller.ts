import { Request, Response, NextFunction } from 'express';
import { getLostRobots, getGridExplore } from '../services';

export const GetLostRobot = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { filename } = req.query as { filename: string };
    const robots: number = await getLostRobots(filename);

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
    const { filename } = req.query as { filename: string };
    const grid: number = await getGridExplore(filename);

    res.status(200).json(grid);
  } catch (error) {
    next(error);
  }
};
