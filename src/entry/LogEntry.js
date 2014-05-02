

function LogEntry (error, with_stack) {

  // Enforce instanciation
  if (!(this instanceof LogEntry)) {
    return new LogEntry();
  }

  var log = parseErrorToJson(error, with_stack);
  addEnvLogInformation(log);


  this.toJson = function () {
    return log;
  };
}

LogEntry.prototype.toString = function () {
  var log = this.toJson(),
      entry = '';


  entry += this.getConsolePrefix();
  entry += ' ';
  entry += log.logMessage;

  return entry;
};

LogEntry.prototype.getConsolePrefix = function () {
  var log = this.toJson(),
      prefix = '';

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
