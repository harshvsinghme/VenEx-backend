import winston, { LoggerOptions } from 'winston';
import { DEVELOPMENT } from './enum/standard.enum';

const loggerProps: LoggerOptions = {
  level: 'debug',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  defaultMeta: {},
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple())
    })
  ]
};

if (Array.isArray(loggerProps.transports)) {
  if ([DEVELOPMENT].includes(process.env.NODE_ENV!)) {
    loggerProps.transports.push(
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    );
  }
}

const logger = winston.createLogger(loggerProps);

export default logger;
