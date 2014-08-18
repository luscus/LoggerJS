var LOG_LEVELS = {},
    levels = [
      'FATAL',
      'ERROR',
      'WARNING',
      'LOG',
      'INFO',
      'AUTH',
      'PATH',
      'DEBUG'
    ];

LOG_LEVELS.priority = {};
LOG_LEVELS.logPriority = levels;

// log LOG_LEVELS
for (var index in levels) {
  var level = levels[index];

  LOG_LEVELS[level] = level;
  LOG_LEVELS.priority[level] = index;
}

// Log level that are always diplayed with the error stack
LOG_LEVELS.withStack = [
  LOG_LEVELS.FATAL,
  LOG_LEVELS.ERROR
];

LOG_LEVELS.checkPriority = function (checkLevel, controlLevel) {
  return (LOG_LEVELS.priority[checkLevel] <= LOG_LEVELS.priority[controlLevel]);
};

LOG_LEVELS.exists = function (logLevel) {
  return (LOG_LEVELS.priority[logLevel]) ? true : false;
};
