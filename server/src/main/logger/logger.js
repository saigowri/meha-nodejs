'use strict'
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const fs = require('fs');

var path = require('path');

//winston.exitOnError = false;

//find all unhandled exception in this file
//winston.exceptions.handle(new winston.transports.File({ filename: '../logs/uncaughtExceptions.log' }));
const logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync('../'+logDir)) {
  fs.mkdirSync('../'+logDir);
}

const myFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

var getLogger = function(module) {
  //var parts = module.filename.split(path.sep);
  //var name = path.join(parts[parts.length - 2], parts.pop());
  let name = path.basename(module.filename);
  console.log('====='+name);
  
  //=============Logger code starts=============
  const logger = createLogger({
    level: 'debug',
    format: combine(        
      label({ label: name }),
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      myFormat     
    ),
    transports: [
      //
      // - Write to all logs with level `debug` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new transports.File({ 
          filename: '../logs/error.log', 
          level: 'error', 
          handleExceptions: true
        }),
      new transports.File({ 
          filename: '../logs/combined.log', 
          handleExceptions: true
        }),
      new transports.Console()     
    ]
  });
  //=============Logger code ends===============

  return logger;

};

module.exports = getLogger;