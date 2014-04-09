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
LOG_LEVELS.log_priority = [
  LOG_LEVELS.AUTH,
  LOG_LEVELS.INFO,
  LOG_LEVELS.FATAL,
  LOG_LEVELS.ERROR,
  LOG_LEVELS.WARNING,
  LOG_LEVELS.LOG,
  LOG_LEVELS.PATH,
  LOG_LEVELS.DEBUG
];


for (var idx in LOG_LEVELS.log_priority) {
  LOG_LEVELS.priority[LOG_LEVELS.log_priority[idx]] = idx;
}

LOG_LEVELS.checkPriority = function (level, control_level) {
  return (LOG_LEVELS.priority[level] <= LOG_LEVELS.priority[control_level]);
};

LOG_LEVELS.exists = function (level) {
  return (LOG_LEVELS.priority[level]) ? true : false;
};
