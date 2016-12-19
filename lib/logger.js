var winston = require('winston');
//var MongoDB = require('winston-mongodb').MongoDB;
var config = require('../config');
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ 
      level:            'debug', 
      handleExceptions: true, 
      json:             false, 
      colorize:         true ,
      timestamp:        true, 
    })//,
    //new (winston.transports.MongoDB)({
    //  db: 'mongodb://' + config.database.server + ':' + config.database.port + '/' + config.database.name
    //})
  ], 
  exitOnError: false 
}); 

module.exports = logger;