import cors, { CorsOptions } from 'cors';
import { randomUUID } from 'crypto';
import express, { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import morgan from 'morgan';
import { loadEnvFile } from 'process';
import { connectToDatabase, disconnectDatabase } from './prisma/client';
import router from './routes';
import { ExtendedRequest } from './types/common';
import { DEVELOPMENT } from './utils/enum/standard.enum';
import logger from './utils/logger';

loadEnvFile();

const requiredEnvVars: Array<string> = ['PORT', 'DATABASE_URL'];

const missingEnvVars = requiredEnvVars.filter((variable) => !process.env[variable]);

if (missingEnvVars.length > 0) {
  logger.error(`Missing required .env variables ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

export const app = express();

const corsOptions: CorsOptions = {
  origin: [DEVELOPMENT].includes(process.env.NODE_ENV!) ? [] : ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
app.use(cors(corsOptions));
(async () => {
  await connectToDatabase();
})();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use((req: ExtendedRequest, _: Response, next: NextFunction) => {
  req.id = randomUUID();
  next();
});

app.get('/', (req: ExtendedRequest, res: Response) => {
  res.status(StatusCodes.OK).json({
    success: true,
    messages: [`Application is running: v1.0.0`],
    requestId: req.id
  });
});

app.use('/', router);

app.use('*', (req: ExtendedRequest, res: Response) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ success: false, msg: 'Route not found', requestId: req.id });
});

app.listen(process.env.PORT!, () => {
  logger.info(`Application started on port ${process.env.PORT!}`);
});

process.on('unhandledRejection', async (reason, promise) => {
  console.error(reason, promise);
  logger.error('Unhandled rejection at:', promise, 'reason:', reason);
  await disconnectDatabase();
  process.exit(1);
});

process.on('uncaughtException', async (err) => {
  console.error(err);
  logger.error('Uncaught exception:', err);
  await disconnectDatabase();
  process.exit(1);
});

process.on('SIGINT', async () => {
  logger.info('Received SIGINT. shutting down gracefully...');
  await disconnectDatabase();
  process.exit(0);
});
