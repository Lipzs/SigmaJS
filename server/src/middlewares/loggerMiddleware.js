import logger from '../logger.js';

function loggerMiddleware(req, res, next) {
  logger.info({
    'Method': req.method,
    'URL': req.originalUrl,
    'hostname': req.hostname,
    'headers': req.headers,
    'Time': new Date()
  });

  next();
}

export default loggerMiddleware;