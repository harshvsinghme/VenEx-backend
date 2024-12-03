import { Router } from 'express';
import {
  getMatchingEmployeesController,
  ingestDummyEmployeesController,
  updateEmpByIdController
} from '../controllers/employee.controller';
import { validateUpdateEmployeeMiddleware } from '../middlewares/employee.middleware';

const router = Router();

router.patch('/employees/:empId', validateUpdateEmployeeMiddleware, updateEmpByIdController);
router.get('/employees', getMatchingEmployeesController);
router.post('/employees/ingest', ingestDummyEmployeesController);

export default router;
