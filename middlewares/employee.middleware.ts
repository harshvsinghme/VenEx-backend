import dayjs from 'dayjs';
import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ExtendedRequest } from '../types/common';
import logger from '../utils/logger';
import {
  validatorPredictStoryPointsForEmp,
  validatorUpdateEmployee
} from '../utils/validators/employee.validator';

export const validateUpdateEmployeeMiddleware = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const result = validatorUpdateEmployee.safeParse(req.body);
  if (!result.success) {
    logger.log({
      level: 'debug',
      message: JSON.stringify(req.body)
    });

    console.log(
      'Error updating the employee in validateUpdateEmployeeMiddleware',
      req.id,
      result.error.issues
    );
    logger.error('Error updating the employee in validateUpdateEmployeeMiddleware', {
      requestId: req.id,
      error: result.error.issues
    });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Error updating the employee: ${result.error.issues.map((issue) => issue.message).join(', ')}`,
      requestId: req.id,
      error: result.error.issues,
      timestamp: dayjs().toDate()
    });
  } else {
    next();
  }
};

export const validatePredictStoryPointsForEmpMiddleware = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const result = validatorPredictStoryPointsForEmp.safeParse(req.body);
  if (!result.success) {
    logger.log({
      level: 'debug',
      message: JSON.stringify(req.body)
    });

    console.log(
      'Error predicting story points for employee in validatePredictStoryPointsForEmpMiddleware',
      req.id,
      result.error.issues
    );
    logger.error(
      'Error predicting story points for employee in validatePredictStoryPointsForEmpMiddleware',
      {
        requestId: req.id,
        error: result.error.issues
      }
    );
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Error predicting story points for employee: ${result.error.issues.map((issue) => issue.message).join(', ')}`,
      requestId: req.id,
      error: result.error.issues,
      timestamp: dayjs().toDate()
    });
  } else {
    next();
  }
};
