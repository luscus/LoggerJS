/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(e,m){var p={},j=p.lib={},l=function(){},f=j.Base={extend:function(a){l.prototype=this;var c=new l;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
n=j.WordArray=f.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=m?c:4*a.length},toString:function(a){return(a||h).stringify(this)},concat:function(a){var c=this.words,q=a.words,d=this.sigBytes;a=a.sigBytes;this.clamp();if(d%4)for(var b=0;b<a;b++)c[d+b>>>2]|=(q[b>>>2]>>>24-8*(b%4)&255)<<24-8*((d+b)%4);else if(65535<q.length)for(b=0;b<a;b+=4)c[d+b>>>2]=q[b>>>2];else c.push.apply(c,q);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=e.ceil(c/4)},clone:function(){var a=f.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],b=0;b<a;b+=4)c.push(4294967296*e.random()|0);return new n.init(c,a)}}),b=p.enc={},h=b.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++){var f=c[d>>>2]>>>24-8*(d%4)&255;b.push((f>>>4).toString(16));b.push((f&15).toString(16))}return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d+=2)b[d>>>3]|=parseInt(a.substr(d,
2),16)<<24-4*(d%8);return new n.init(b,c/2)}},g=b.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++)b.push(String.fromCharCode(c[d>>>2]>>>24-8*(d%4)&255));return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d++)b[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return new n.init(b,c)}},r=b.Utf8={stringify:function(a){try{return decodeURIComponent(escape(g.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return g.parse(unescape(encodeURIComponent(a)))}},
k=j.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new n.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=r.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,b=c.words,d=c.sigBytes,f=this.blockSize,h=d/(4*f),h=a?e.ceil(h):e.max((h|0)-this._minBufferSize,0);a=h*f;d=e.min(4*a,d);if(a){for(var g=0;g<a;g+=f)this._doProcessBlock(b,g);g=b.splice(0,a);c.sigBytes-=d}return new n.init(g,d)},clone:function(){var a=f.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});j.Hasher=k.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){k.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,b){return(new a.init(b)).finalize(c)}},_createHmacHelper:function(a){return function(b,f){return(new s.HMAC.init(a,
f)).finalize(b)}}});var s=p.algo={};return p}(Math);
(function(){var e=CryptoJS,m=e.lib,p=m.WordArray,j=m.Hasher,l=[],m=e.algo.SHA1=j.extend({_doReset:function(){this._hash=new p.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(f,n){for(var b=this._hash.words,h=b[0],g=b[1],e=b[2],k=b[3],j=b[4],a=0;80>a;a++){if(16>a)l[a]=f[n+a]|0;else{var c=l[a-3]^l[a-8]^l[a-14]^l[a-16];l[a]=c<<1|c>>>31}c=(h<<5|h>>>27)+j+l[a];c=20>a?c+((g&e|~g&k)+1518500249):40>a?c+((g^e^k)+1859775393):60>a?c+((g&e|g&k|e&k)-1894007588):c+((g^e^
k)-899497514);j=k;k=e;e=g<<30|g>>>2;g=h;h=c}b[0]=b[0]+h|0;b[1]=b[1]+g|0;b[2]=b[2]+e|0;b[3]=b[3]+k|0;b[4]=b[4]+j|0},_doFinalize:function(){var f=this._data,e=f.words,b=8*this._nDataBytes,h=8*f.sigBytes;e[h>>>5]|=128<<24-h%32;e[(h+64>>>9<<4)+14]=Math.floor(b/4294967296);e[(h+64>>>9<<4)+15]=b;f.sigBytes=4*e.length;this._process();return this._hash},clone:function(){var e=j.clone.call(this);e._hash=this._hash.clone();return e}});e.SHA1=j._createHelper(m);e.HmacSHA1=j._createHmacHelper(m)})();

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
  LOG_LEVELS.FATAL,
  LOG_LEVELS.ERROR,
  LOG_LEVELS.WARNING,
  LOG_LEVELS.INFO,
  LOG_LEVELS.AUTH,
  LOG_LEVELS.LOG,
  LOG_LEVELS.PATH,
  LOG_LEVELS.DEBUG
];

// Log level that are always diplayed with the error stack
LOG_LEVELS.withStack = [
  LOG_LEVELS.FATAL,
  LOG_LEVELS.ERROR
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

var extractLineFromStack = function extractLineFromStack (error) {
  /// <summary>
  /// Get the line/filename detail from a Webkit stack trace.  See http://stackoverflow.com/a/3806596/1037948
  /// </summary>
  /// <param name="stack" type="String">the stack string</param>

  // some stacks use pretty print for the first line
  // so we have to use a regex to split at the right place
  var line_array = cleanStack(error),
      line = line_array[0];

  // fix for various display text
  //        line may have enclosing parenthesis
  //   or   line may start with "at"
  //   else return raw line
  line = (line.indexOf(' (') >= 0 ? line.split(' (')[1].substring(0, line.length - 1) : line.split('at ')[1]) || line;

  // get rid of the trailing parenthese if any
  line = (line.indexOf(')') >= 0 ? line.split(')')[0] : line);

  return line;
};


function stackToArray (stack) {
  return stack.split(/\n\s+at\s+/);
}

function stackArrayToString (stackArray) {
  return stackArray.join('\n    at ');
}

function cleanStack (error) {
  var array = stackToArray(error.stack),
      stack;

  if (error.isFromConsoleWrapper) {
    // correct line number according to how Log().write is implemented
    stack = array.slice(3);
  }
  else {
    // all other cases, take first line of the stack
    stack = array.slice(1);
  }

  return stack;
}


var path_delimiter = null;
var parseErrorToJson = function parseErrorToJson (error) {
  var with_stack = (LOG_LEVELS.withStack.indexOf(error.name) > -1) ? true : false;

  var log = {},
      endOfLine,
      parts;

  if (error instanceof Error) {

    log.type = 'logentry';
    log.namespace = log_namespace;
    log.tags = log_tags;
    log.timestamp = new Date();
    log.logLevel = error.name;
    log.uniqueKey = uniqueLogKeys;

    if (uniqueLogKeys) {
      // generate hash with message and timestamp
      log.hash = CryptoJS.SHA1(log.logMessage + log.timestamp.toISOString()).toString();
    }
    else {
      // generate hash only with message: one entry per type in the database
      log.hash = CryptoJS.SHA1(log.logMessage).toString();
    }

    if (error.message instanceof Error || LOG_LEVELS.withStack.indexOf(error.name) > -1) {
      // Format message from stack
      //   - suppress leading lines depending on Error origin
      var stackArray = cleanStack(error);

      //   - add message at the top of the stack
      stackArray.unshift(error.message);

      //   - rebuild string
      log.logMessage = stackArrayToString(stackArray);
    }
    else {
      log.logMessage = error.message;
    }

    if (!error.fileName) {
      log.logLocation = extractLineFromStack(error);
    }
    else {
      log.logLocation = error.fileName;
    }

    endOfLine = getLineEnd(log.logLocation);
    parts = endOfLine.split(':');

    if (!error.lineNumber) {
      log.fileName = (parts[0]) ? parts[0] : 'unknown';
      log.lineNumber = (parts[1]) ? parts[1] : 'unknown';
    }
    else {
      log.fileName = (parts[0]) ? parts[0] : 'unknown';
      log.lineNumber = error.lineNumber;
    }

    if (log.logLocation.indexOf(':'+log.lineNumber) < 0) {
      log.logLocation += ':' + log.lineNumber;
    }


    if (with_stack) {
      log.stack = error.stack;
    }
    else {
      log.logLocation = log.fileName + ':' + log.lineNumber;
    }
  }

  return log;
};


var getLineEnd = function getFileNameFromLine (line) {
  if (!path_delimiter) {
    path_delimiter = (line.lastIndexOf('/') > 0) ? '/' : '\\';
  }

  var index = line.lastIndexOf(path_delimiter) + 1;

  if (index > 0) {
    return line.substring(index);
  }

  return line;
};

var LogEntry = LogEntry || (function (global) {



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


  return LogEntry;
})(this);

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
  this.strict = (typeof options.strict === 'boolean') ? options.strict : false;
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


function triggerLogTaskProcessing (entry) {
  if (!entry || !(entry instanceof LogEntry)) {
    throw new Error('triggerLogTaskProcessing awaits a LogEntry object as argument');
  }

  var log = entry.toJson();

  // execute all logging tasks
  for (var task_name in log_tasks) {

    // check if the task isn't strict
    // otherwise check if the log levels match
    if (!log_tasks[task_name].strict || (log.logLevel === log_tasks[task_name].log_level)) {

      // check if the log priority is right
      if (LOG_LEVELS.checkPriority(log.logLevel, log_tasks[task_name].log_level)) {
        log_tasks[task_name].task(entry);
      }
    }
  }
}

var log_tasks = {},
    webConsoleActive = false;

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


    var uppercase_method = method.toUpperCase(),
        withStack = (LOG_LEVELS.withStack.indexOf(uppercase_method) > -1) ? true : false,
        task_name = null,
        task_log_level = null;

    // change error.name to the method name
    this.name = uppercase_method;

    var  entry = new LogEntry(this);

    if (withStack) {
      if (! (args[0] instanceof Error)) {
        // stack has to be cleaned from LoggerJS internal calls
        var stack = stackToArray(this.stack).slice(3);

        // add message at stack start
        stack.unshift(args[0]);

        // store back as log message
        args[0] = stack.join('\n    at ');
      }
    }

    // Convert Error arguments to Object
    for (var idx in args) {
      if (args[idx] instanceof Error) {
        args[idx] = args[idx].stack;
      }
    }

    // via @fredrik SO trace suggestion; wrapping in special construct so it stands out
    var prefix = entry.getConsolePrefix();

    args = [prefix].concat(args);
    // via @paulirish console wrapper
    if (console) {
      // get a RED display for all methods displaying a stack
      var console_method = (withStack) ? 'error' : method;

      if (console[console_method]) {
        if (console[console_method].apply) { console[console_method].apply(console, args); } else { console[console_method](args); } // nicer display in some browsers
      }
      else {
        if (console.log.apply) { console.log.apply(console, args); } else { console.log(args); } // nicer display in some browsers
      }
    }
    else {
      // console is not available
      // activating WebConsole
      webConsoleActive = true;
    }


    handleWebConsole(entry);

    // execute all logging tasks
    triggerLogTaskProcessing(entry);
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


function handleWebConsole (entry) {
  if (webConsoleActive && addWebConsoleEntry) {
    addWebConsoleEntry(entry);
  }
}


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
