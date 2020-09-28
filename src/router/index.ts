import { Router, Request, Response, NextFunction } from 'express';

import InputRoute from './input.route';
import OutputRoute from './output.route';
import InfoRoute from './info.route';

const router = Router();

router.use('/input', InputRoute);
router.use('/output', OutputRoute);
router.use('/info', InfoRoute);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json('Welcome to Martian Robots Challenge!');
});

export default router;
