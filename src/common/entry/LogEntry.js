

function LogEntry (error) {

  // Enforce instanciation
  if (!(this instanceof LogEntry)) {
    return new LogEntry();
  }

  this.log = parseErrorToJson(error);
}

LogEntry.prototype.toJson = function () {
  return this.log;
};

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
  prefix += logNamespace;
  prefix += ' - ';
  prefix += log.logLevel;
  prefix += ' - ';
  prefix += log.logLocation;
  prefix += ' -';

  return prefix;
};
