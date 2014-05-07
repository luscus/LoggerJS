
var log_namespace = null,
    uniqueLogKeys = true,
    log_tags = [];

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
    var error = new Error();
    error.name = 'LoggerInstanciationError';
    error.message = 'you have to provide a namespace for the Logger instance: options = {namespace: "x.y.z"}';

    throw error;
  }

  if (options.tags) {
    log_tags = options.tags;
  }


  if (typeof options.uniqueLogKeys === 'boolean') {
    uniqueLogKeys = options.uniqueLogKeys;
  }
  else {
    uniqueLogKeys = true;
  }


  log_namespace = options.namespace;

  this.status = (typeof options.status === 'boolean') ? options.status : true;
  this.log_level = (LOG_LEVELS.exists(options.logLevel)) ? options.logLevel : LOG_LEVELS.ERROR;

  if (options.logServerUrl) {
    logServerLevel = (LOG_LEVELS.exists(options.logServerLevel)) ? options.logServerLevel : this.log_level;
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


(function () {
  var property = null;

  for (property in LOG_LEVELS) {
    Logger.prototype[property] = LOG_LEVELS[property];
  }

  Logger.prototype.setLogLevel = function (log_level) {
    if (LOG_LEVELS.exists(log_level)) {
      this.log_level = log_level;
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
    return log_namespace;
  };

  Logger.prototype.getTags = function () {
    return log_tags;
  };

  Logger.prototype.be = function (log_level) {
    log_level = (log_level) ? log_level : this.log_level;

    if (!this.status) {
      return false;
    }

    if (!LOG_LEVELS.checkPriority(log_level, this.log_level)) {
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
      log_tasks[logTask.name] = logTask;
    }
  };

  Logger.prototype.getLogTasks = function () {
    return log_tasks;
  };

  Logger.prototype.setLogTaskLogLevel = function (name, log_level) {

    if (log_tasks[name] && LOG_LEVELS.exists(log_level)) {
      log_tasks[name].setLogLevel(log_level);
    }
  };

  Logger.prototype.enableLogTask = function (name) {

    if (log_tasks[name]) {
      log_tasks[name].enable();
    }
  };

  Logger.prototype.disableLogTask = function (name) {

    if (log_tasks[name]) {
      log_tasks[name].disable();
    }
  };

  Logger.prototype.setLogTaskStatus = function (name, status) {

    if (log_tasks[name]) {
      log_tasks[name].setLogLevel(status);
    }
  };

  Logger.prototype.unregisterLogTask = function (task) {
    if (typeof task === 'string' && log_tasks[task])
      delete log_tasks[task];

    if (task instanceof LogTask && log_tasks[task.name])
      delete log_tasks[task.name];
  };

})();
