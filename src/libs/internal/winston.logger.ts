import { createLogger, format, transports } from 'winston';

const customFormat = format.printf(({ timestamp, level, stack, message }) => {
  return `${timestamp} - [${level.toUpperCase().padEnd(1)}] - ${stack || message}`;
});

const options = {
  file: {
    filename: './logs/error.log',
    level: 'error',
  },
  console: {
    level: 'silly',
    colorize: true,
  },
  ExceptionHandlers: {
    filename: './logs/exceptions.log',
  },
};

const devLogger = {
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    customFormat,
  ),
  transports: [
    new transports.File(options.file),
    new transports.File({
      filename: './logs/combine.log',
      level: 'info',
    }),
    new transports.Console(options.console),
  ],
};

export const WinstonLogger = createLogger(devLogger);

WinstonLogger.exceptions.handle(
  new transports.File({ filename: './logs/exceptions.log' }),
);
