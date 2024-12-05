import { Router } from 'express';
import { predictStoryPointByEmployeeController } from '../controllers/employee.controller';
import { validatePredictStoryPointsForEmpMiddleware } from '../middlewares/employee.middleware';

const router = Router();

router.post(
  '/predict',
  validatePredictStoryPointsForEmpMiddleware,
  predictStoryPointByEmployeeController
);

export default router;
