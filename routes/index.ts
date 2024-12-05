import { Router } from 'express';
import employeeRoute from './employee.route';
import intelligenceRoute from './intelligence.route';

const router = Router();

router.use('/employee-service', employeeRoute);
router.use('/intelligence-service', intelligenceRoute);

export default router;
