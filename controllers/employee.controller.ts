import dayjs from 'dayjs';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { allEmployees } from '../data/employee';
import prisma from '../prisma/client';
import { ExtendedRequest } from '../types/common';
import logger from '../utils/logger';

export const updateEmpByIdController = async (
  req: ExtendedRequest,
  res: Response
): Promise<void> => {
  try {
    const { empId } = req.params;
    const { productivity, collaboration, communication } = req.body;

    const employeeRecord = await prisma.employee.findUnique({
      where: {
        id: parseInt(empId!)
      }
    });
    if (!employeeRecord) {
      throw new Error(`Could not find employee`);
    }

    await prisma.employee.update({
      where: {
        id: parseInt(empId!)
      },
      data: {
        productivity,
        collaboration,
        communication
      }
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Employee updated successfully',
      requestId: req.id,
      data: {},
      timestamp: dayjs().toDate()
    });
  } catch (error: unknown) {
    console.log('Error updating the employee in updateEmpByIdController', req.id, error);
    logger.error('Error updating the employee in updateEmpByIdController', {
      requestId: req.id,
      error
    });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Error updating the employee: ${(error as { message: string }).message}`,
      requestId: req.id,
      error: (error as { message: string }).message,
      timestamp: dayjs().toDate()
    });
  }
};

export const getMatchingEmployeesController = async (
  req: ExtendedRequest,
  res: Response
): Promise<void> => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Employees fetched successfully',
      requestId: req.id,
      data: { employees },
      timestamp: dayjs().toDate()
    });
  } catch (error: unknown) {
    console.log('Error fetching the employees in getMatchingEmployeesController', req.id, error);
    logger.error('Error fetching the employees in getMatchingEmployeesController', {
      requestId: req.id,
      error
    });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Error fetching the employees: ${(error as { message: string }).message}`,
      requestId: req.id,
      error: (error as { message: string }).message,
      timestamp: dayjs().toDate()
    });
  }
};

export const ingestDummyEmployeesController = async (
  req: ExtendedRequest,
  res: Response
): Promise<void> => {
  try {
    await prisma.employee.createMany({
      data: allEmployees
    });
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Employees ingested successfully',
      requestId: req.id,
      data: {},
      timestamp: dayjs().toDate()
    });
  } catch (error: unknown) {
    console.log('Error ingesting the employees in ingestDummyEmployeesController', req.id, error);
    logger.error('Error ingesting the employees in ingestDummyEmployeesController', {
      requestId: req.id,
      error
    });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Error ingesting the employees: ${(error as { message: string }).message}`,
      requestId: req.id,
      error: (error as { message: string }).message,
      timestamp: dayjs().toDate()
    });
  }
};
