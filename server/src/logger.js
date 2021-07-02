import winston from 'winston';

const logConfiguration = {
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
    winston.format.prettyPrint()
  ),
  'transports': [
    new winston.transports.File({
      filename: './logs/info.log'
    }),
  ]
};

const logger = winston.createLogger(logConfiguration);

export default logger;