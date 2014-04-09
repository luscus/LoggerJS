
var log = {};


function LogEntry (error, with_stack) {

  // Enforce instanciation
  if (!(this instanceof LogEntry)) {
    return new LogEntry();
  }

  var regex = null,
      parts = [];

  log = parseErrorToJson(error, with_stack);
  addEnvLogInformation(log);
}

LogEntry.prototype.getLogEntry = function () {
  return log;
};

LogEntry.prototype.toString = function () {
  var entry = '';


  entry += log.timestamp.toISOString();
  entry += ' - ';
  entry += log_namespace;
  entry += ' - ';
  entry += log.logLevel;
  entry += ' - ';
  entry += log.logMessage;
  entry += ' - ';
  entry += log.logLocation;

  return entry;
};

LogEntry.prototype.getConsolePrefix = function () {
  var prefix = '';

  prefix += log.timestamp.toISOString();
  prefix += ' - ';
  prefix += log_namespace;
  prefix += ' - ';
  prefix += log.logLevel;
  prefix += ' - ';
  prefix += log.logLocation;
  prefix += ' -';

  return prefix;
};
