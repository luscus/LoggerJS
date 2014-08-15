var LOG_LEVELS = {};

// log LOG_LEVELS
LOG_LEVELS.AUTH    = 'AUTH';
LOG_LEVELS.LOG     = 'LOG';
LOG_LEVELS.INFO    = 'INFO';
LOG_LEVELS.FATAL   = 'FATAL';
LOG_LEVELS.ERROR   = 'ERROR';
LOG_LEVELS.WARNING = 'WARNING';
LOG_LEVELS.PATH    = 'PATH';
LOG_LEVELS.DEBUG   = 'DEBUG';
// log priority
LOG_LEVELS.priority = {};
LOG_LEVELS.logPriority = [
  LOG_LEVELS.FATAL,
  LOG_LEVELS.ERROR,
  LOG_LEVELS.WARNING,
  LOG_LEVELS.INFO,
  LOG_LEVELS.LOG,
  LOG_LEVELS.AUTH,
  LOG_LEVELS.PATH,
  LOG_LEVELS.DEBUG
];

// Log level that are always diplayed with the error stack
LOG_LEVELS.withStack = [
  LOG_LEVELS.FATAL,
  LOG_LEVELS.ERROR
];


for (var idx in LOG_LEVELS.logPriority) {
  LOG_LEVELS.priority[LOG_LEVELS.logPriority[idx]] = idx;
}

LOG_LEVELS.checkPriority = function (checkLevel, controlLevel) {
  return (LOG_LEVELS.priority[checkLevel] <= LOG_LEVELS.priority[controlLevel]);
};

LOG_LEVELS.exists = function (logLevel) {
  return (LOG_LEVELS.priority[logLevel]) ? true : false;
};
