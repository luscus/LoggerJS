

/**
*
*
*/
function Logger (options) {

  // Enforce instanciation
  if (!(this instanceof Logger)) {
    return new Logger();
  }

  options = (options) ? options : {};

  if (!options.namespace) {
    var error = new Error('you have to provide a namespace for the Logger instance: options = {namespace: "x.y.z"}');
    error.name = 'LoggerInstanciationError';

    throw error;
  }

  if (options.tags) {
    logTags = options.tags;
  }


  if (typeof options.uniqueLogKeys === 'boolean') {
    uniqueLogKeys = options.uniqueLogKeys;
  }
  else {
    uniqueLogKeys = true;
  }


  logNamespace = options.namespace;

  this.status = (typeof options.status === 'boolean') ? options.status : true;
  this.logLevel = (LOG_LEVELS.exists(options.logLevel)) ? options.logLevel : LOG_LEVELS.ERROR;

  if (options.logServerUrl) {
    logServerLevel = (LOG_LEVELS.exists(options.logServerLevel)) ? options.logServerLevel : this.logLevel;
    logServerUrl = options.logServerUrl;

    this.useLogServer(logServerUrl, logServerLevel);
  }
}
// inherit ConsoleWrapper
Logger.prototype = ConsoleWrapper;
// correct the constructor pointer because it points to Logger
Logger.prototype.constructor = ConsoleWrapper;


function LoggerInstanciationError (message) {
  var error = new Error();

  error.name = 'LoggerInstanciationError';
  error.message = message;
}

var logServerEnabled = false,
    logServerLevel = null,
    logServerUrl = null;


  var property = null;

  Logger.prototype.levels = {};

  for (property in LOG_LEVELS) {
    Logger.prototype.levels[property] = LOG_LEVELS[property];
  }

  Logger.prototype.setLogLevel = function (log_level) {
    if (LOG_LEVELS.exists(log_level)) {
      this.logLevel = log_level;
      this.status = true;
    }
  };

  Logger.prototype.disable = function () {
    this.status = false;
  };

  Logger.prototype.enable = function () {
    this.status = true;
  };

  Logger.prototype.toggleStatus = function () {
    this.status = ! this.status;
  };

  Logger.prototype.setStatus = function (status) {
    this.status= (typeof status === 'boolean') ? status : false;
  };

  Logger.prototype.getNamespace = function () {
    return logNamespace;
  };

  Logger.prototype.getTags = function () {
    return logTags;
  };

  Logger.prototype.be = function (log_level) {
    log_level = (log_level) ? log_level : this.logLevel;

    if (!this.status) {
      return false;
    }

    if (!LOG_LEVELS.checkPriority(log_level, this.logLevel)) {
      return false;
    }

    return true;
  };


  Logger.prototype.useLogServer = function (url, level_filter) {
    logServerLevel = (LOG_LEVELS.exists(level_filter)) ? level_filter : LOG_LEVELS.ERROR;
    logServerEnabled = true;
    logServerUrl = url;

    var options = {
      name: 'LogServer',
      status: logServerEnabled,
      logLevel: logServerLevel,
      task: pushToLogServer,
    };

    this.registerLogTask(new LogTask(options));
  };

  Logger.prototype.setLogServerLevel = function (level_filter) {
    logServerLevel = (LOG_LEVELS.exists(level_filter)) ? level_filter : LOG_LEVELS.ERROR;

    this.setLogTaskLogLevel('LogServer', logServerLevel);
  };

  Logger.prototype.enableLogServer = function () {
    this.enableLogTask('LogServer');
  };

  Logger.prototype.disableLogServer = function () {
    this.disableLogTask('LogServer');
  };

  Logger.prototype.registerLogTask = function (logTask) {
    if (logTask instanceof LogTask) {
      logTasks[logTask.name] = logTask;
    }
  };

  Logger.prototype.getLogTasks = function () {
    return logTasks;
  };

  Logger.prototype.setLogTaskLogLevel = function (name, log_level) {

    if (logTasks[name] && LOG_LEVELS.exists(log_level)) {
      logTasks[name].setLogLevel(log_level);
    }
  };

  Logger.prototype.enableLogTask = function (name) {

    if (logTasks[name]) {
      logTasks[name].enable();
    }
  };

  Logger.prototype.disableLogTask = function (name) {

    if (logTasks[name]) {
      logTasks[name].disable();
    }
  };

  Logger.prototype.setLogTaskStatus = function (name, status) {

    if (logTasks[name]) {
      logTasks[name].setLogLevel(status);
    }
  };

  Logger.prototype.unregisterLogTask = function (task) {
    if (typeof task === 'string' && logTasks[task])
      delete logTasks[task];

    if (task instanceof LogTask && logTasks[task.name])
      delete logTasks[task.name];
  };
