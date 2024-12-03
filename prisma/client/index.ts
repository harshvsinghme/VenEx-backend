import { PrismaClient } from '@prisma/client';
import logger from '../../utils/logger';

const prisma = new PrismaClient();

export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    logger.info('Connected to the database');
  } catch (error) {
    logger.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  try {
    await prisma.$disconnect();
    logger.info('Disconnected from the database');
  } catch (error) {
    logger.error('Error disconnecting from the database:', error);
  }
};

export default prisma;
