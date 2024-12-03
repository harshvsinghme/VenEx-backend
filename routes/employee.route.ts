import { Router } from 'express';
import { updateEmpByIdController } from '../controllers/employee.controller';
import { validateUpdateEmployeeMiddleware } from '../middlewares/employee.middleware';

const router = Router();

router.patch('/employees/:empId', validateUpdateEmployeeMiddleware, updateEmpByIdController);

export default router;
