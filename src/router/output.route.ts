import { Router } from 'express';
import { GetOutputFiles, ExecuteInput } from '../controllers';

const router = Router();

router.get('/exec', ExecuteInput);

router.get('/list', GetOutputFiles);

export default router;
