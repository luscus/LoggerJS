function LogTask (options) {
  // Enforce instanciation
  if (!(this instanceof LogTask)) {
    return new LogTask();
  }

  options = (options) ? options : {};
  var error;


  if (!options.task) {
    error = new Error();
    error.name = 'LogTaskInstanciationError';
    error.message = 'you have to provide a task for the LogTask instance: options = {task: function (logEntry) {/*your task code*/}}';

    throw error;
  }

  if (!options.name) {
    error = new Error();
    error.name = 'LogTaskInstanciationError';
    error.message = 'you have to provide a name for the LogTask instance: options = {name: "xyz"}';

    throw error;
  }


  this.task = options.task;
  this.name = options.name;

  this.status = (typeof options.status === 'boolean') ? options.status : true;
  this.log_level = (LOG_LEVELS.exists(options.logLevel)) ? options.logLevel : LOG_LEVELS.ERROR;
}



(function () {

  LogTask.prototype.setLogLevel = function (log_level) {
    if (LOG_LEVELS.exists(log_level)) {
      this.log_level = log_level;
      this.status = true;
    }
  };

  LogTask.prototype.disable = function () {
    this.status = false;
  };

  LogTask.prototype.enable = function () {
    this.status = true;
  };

  LogTask.prototype.setStatus = function (status) {
    this.status= (typeof status === 'boolean') ? status : false;
  };

})();
