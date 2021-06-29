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
    new winston.transports.Console({
      level: 'silly',
      prettyPrint: true,
      colorize: true,
      silent: false,
      timestamp: false
    })
  ]
};

const logger = winston.createLogger(logConfiguration);

export default logger;