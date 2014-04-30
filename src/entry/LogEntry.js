
var log = {};


function LogEntry (error, with_stack) {

  // Enforce instanciation
  if (!(this instanceof LogEntry)) {
    return new LogEntry();
  }

  log = parseErrorToJson(error, with_stack);
  addEnvLogInformation(log);
}

LogEntry.prototype.getLogEntry = function () {
  return log;
};

LogEntry.prototype.toString = function () {
  var entry = '';


  entry += this.getConsolePrefix();
  entry += ' ';
  entry += log.logMessage;

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
