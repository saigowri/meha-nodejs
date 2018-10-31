'use strict';
const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

//const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync('../'+logDir)) {
  fs.mkdirSync('../'+logDir);
}

const combinedFilename = path.join(logDir, '/combined.log');
const errorFilename = path.join(logDir, '/error.log');

console.log(errorFilename)

const logger = createLogger({
  // change level if in dev environment versus production
  level: 'debug',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    new transports.File({ combinedFilename }),
    new transports.File({ errorFilename })
  ]
});

logger.info('Hello world');
logger.warn('Warning message');
logger.debug('Debugging info');