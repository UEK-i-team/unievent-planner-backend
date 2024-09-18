import { createLogger, format, transports } from 'winston';

const customFormat = format.printf(({ timestamp, level, stack, message }) => {
  return `${timestamp} - [${level.toUpperCase().padEnd(7)}] - ${stack || message}`;
});

const options = {
  file: {
    filename: './logger/error.log',
    level: 'error',
  },
  console: {
    level: 'silly',
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
      filename: './logger/combine.log',
      level: 'info',
    }),
    new transports.Console(options.console),
  ],
};

export const instance = createLogger(devLogger);
