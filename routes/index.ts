import { Router } from 'express';
import employeeRoute from './employee.route';

const router = Router();

router.use('/employee-service', employeeRoute);

export default router;
