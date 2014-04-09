var log_tasks = {};

var ConsoleWrapper = (function (methods, undefined) {
  var Log = Error; // does this do anything?  proper inheritance...?
  Log.prototype.write = function (args, method) {
    /// <summary>
    /// Paulirish-like console.log wrapper.  Includes stack trace via @fredrik SO suggestion (see remarks for sources).
    /// </summary>
    /// <param name="args" type="Array">list of details to log, as provided by `arguments`</param>
    /// <param name="method" type="string">the console method to use:  debug, log, warn, info, error</param>
    /// <remarks>Includes line numbers by calling Error object -- see
    /// * http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
    /// * http://stackoverflow.com/questions/13815640/a-proper-wrapper-for-console-log-with-correct-line-number
    /// * http://stackoverflow.com/a/3806596/1037948
    /// </remarks>

    // Set a flag for the errorParser.js
    this.isFromConsoleWrapper = true;

    if (args.length > 1) {
      this.message = JSON.stringify(args);
    }
    else {
      this.message = args[0];
    }


    if (this.name === 'Error') {
      this.name = method.toUpperCase();
    }

    var entry = new LogEntry(this, false),
        task_name = null,
        task_log_level = null;

    // execute all logging tasks
    for (task_name in log_tasks) {
      if (LOG_LEVELS.checkPriority(method.toUpperCase(), log_tasks[task_name].log_level))
        log_tasks[task_name].task(entry);
    }

    // Convert Error arguments to Object
    for (var idx in args) {
      if (args[idx] instanceof Error) {
        args[idx] = parseNestedError(args[idx]);
      }
    }

    // via @fredrik SO trace suggestion; wrapping in special construct so it stands out
    var prefix = entry.getConsolePrefix();

    args = [prefix].concat(args);
    // via @paulirish console wrapper
    if (console) {
      if (console[method]) {
        if (console[method].apply) { console[method].apply(console, args); } else { console[method](args); } // nicer display in some browsers
      }
      else {
        if (console.log.apply) { console.log.apply(console, args); } else { console.log(args); } // nicer display in some browsers
      }
    }
  };

  // method builder
  var logMethod = function(method) {
    var logLevel = method.toUpperCase();

    return function (params) {
      /// <summary>
      /// Paulirish-like console.log wrapper
      /// </summary>
      /// <param name="params" type="[...]">list your logging parameters</param>
      if (!this.status) return;
      // only if explicitly true somewhere
      if (!LOG_LEVELS.checkPriority(logLevel, this.log_level)) return;

      // call handler extension which provides stack trace
      Log().write(Array.prototype.slice.call(arguments, 0), method); // turn into proper array & declare method to use
    };//--  fn  logMethod
  };
  var result = logMethod('log'); // base for backwards compatibility, simplicity
  // add some extra juice
  for(var i in methods) {
    result[methods[i].toLowerCase()] = logMethod(methods[i].toLowerCase());
    result[methods[i].toLowerCase()].LEVEL = methods[i];
  }

  return result; // expose
})(LOG_LEVELS.log_priority);
