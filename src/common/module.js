
  var loggerJsModule = {
    Logger: function (options) {
      var logger = new Logger(options);

      return logger;
    },
    LogTask: function (options) {
      var task = new LogTask(options);

      return task;
    }
  };

  // Add Log Level constants
  for (var property in LOG_LEVELS) {
    if (typeof LOG_LEVELS[property] === 'string') {
      loggerJsModule[property] = LOG_LEVELS[property];
    }
  }
