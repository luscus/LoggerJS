var LoggerJS = LoggerJS || (function (global) {

'use strict';

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

var loggerJsModule,
    pathSep = null;

var logNamespace = null,
    uniqueLogKeys = true,
    logTasks = {},
    logTags = [];

// FLAGS
var webConsoleActive = false,
    webConsoleParentId,
    webConsoleParent,
    webConsoleId = 'LJSWebConsole',
    webConsole;

var errorStack;

var LOG_LEVELS = {},
    levels = [
      'AUTH',
      'LOG',
      'INFO',
      'FATAL',
      'ERROR',
      'WARNING',
      'PATH',
      'DEBUG'
    ];

LOG_LEVELS.priority = {};

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

function extractLineFromStack (error) {
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
}

function analyseStack (stack) {

  // Firefox >= 29
  if (/\n.*@/.test(stack)) {
    return {
      type: '@',
      offset: 1,
      lineSeparator: /\n.*@/,
      lineJoiner: '\n    at '
    };
  }

  // Chrome
  if (/\n\s+at\s+/.test(stack)) {
    return {
      type: 'at',
      offset: 3,
      lineSeparator: /\n\s+at\s+/,
      lineJoiner: '\n    at '
    };
  }
}

function stackToArray (stack) {
  return stack.split(errorStack.lineSeparator);
}

function stackArrayToString (stackArray) {
  return stackArray.join(errorStack.lineJoiner);
}

function cleanStack (error) {
  if (!errorStack) {
    errorStack = analyseStack(error.stack);
  }

  var array = stackToArray(error.stack),
      stack;

  if (array.length < 2) {
    return array;
  }


  if (error.isFromConsoleWrapper) {
    // correct line number according to how Log().write is implemented
    stack = array.slice(errorStack.offset);
  }
  else {
    // all other cases, take first line of the stack
    stack = array.slice(1);
  }

  return stack;
}


function parseErrorToJson (error) {
  var with_stack = (LOG_LEVELS.withStack.indexOf(error.name) > -1) ? true : false;

  var log = {},
      endOfLine,
      parts;

  if (error instanceof Error) {

    log.type = 'logentry';
    log.namespace = logNamespace;
    log.tags = logTags;
    log.timestamp = new Date();
    log.logLevel = error.name.toUpperCase();
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

    log.logLocation = extractLineFromStack(error);

    endOfLine = getLineEnd(log.logLocation);
    parts = endOfLine.split(':');

    log.fileName = (parts[0]) ? parts[0] : 'unknown';
    log.lineNumber = (parts[1]) ? parts[1] : 'unknown';

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

  // add environment specific data
  // see src/environment/logExtender.js
  addEnvLogInformation(log);

  return log;
}


function getLineEnd (line) {
  if (!pathSep) {
    pathSep = (line.lastIndexOf('\\') > 0) ? '\\' : '/';
  }

  var index = line.lastIndexOf(pathSep) + 1;

  if (index > 0) {
    return line.substring(index);
  }

  return line;
}



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
  this.logLevel = (LOG_LEVELS.exists(options.logLevel)) ? options.logLevel : LOG_LEVELS.ERROR;
}



LogTask.prototype.setLogLevel = function (logLevel) {
  if (LOG_LEVELS.exists(logLevel)) {
    this.logLevel = logLevel;
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


function triggerLogTaskProcessing (entry) {
  if (!entry || !(entry instanceof LogEntry)) {
    throw new Error('triggerLogTaskProcessing awaits a LogEntry object as argument');
  }

  var log = entry.toJson();

  // execute all logging tasks
  for (var taskName in logTasks) {

    // check if the task isn't strict
    // otherwise check if the log levels match
    if (!logTasks[taskName].strict || (log.logLevel === logTasks[taskName].logLevel)) {

      // check if the log priority is right
      if (LOG_LEVELS.checkPriority(log.logLevel, logTasks[taskName].logLevel)) {
        logTasks[taskName].task(entry);
      }
    }
  }
}


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
        var stack = cleanStack(this);

        // add message at stack start
        stack.unshift(args[0]);

        // store back as log message
        args[0] = stackArrayToString (stack);
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
      if (!LOG_LEVELS.checkPriority(logLevel, this.logLevel)) return;

      // call handler extension which provides stack trace
      Log().write(Array.prototype.slice.call(arguments, 0), method); // turn into proper array & declare method to use
    };//--  fn  logMethod
  };
  var result = logMethod('log'); // base for backwards compatibility, simplicity
  // add some extra juice
  for(var i in methods) {
    result[methods[i].toLowerCase()] = logMethod(methods[i].toLowerCase());
    //result[methods[i].toLowerCase()].LEVEL = methods[i];
  }

  return result; // expose
})(LOG_LEVELS.logPriority);


function handleWebConsole (entry) {
  if (webConsoleActive && addWebConsoleEntry) {
    addWebConsoleEntry(entry);
  }
}



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


/**
* This function extends the Log with information
* specific to the environment of the Logger
*
* Example: actual url in the Front-End, ProcessId in the Back-End
*
* @param log a reference on the log Object
*/
var addEnvLogInformation = function addEnvLogInformation (log) {

    log.userLocation = window.location.href;

};


var http_request = false,
    requestMethod;

if (window) {
  if (window.XMLHttpRequest) { // Mozilla, Safari,...
    requestMethod = function () {
      var request = new XMLHttpRequest();
      if (request.overrideMimeType) {
        request.overrideMimeType('application/json');
      }
      return request;
    };
  } else if (window.ActiveXObject) { // IE
    try {
      new ActiveXObject("Msxml2.XMLHTTP");

      requestMethod = function () {
        return new ActiveXObject("Msxml2.XMLHTTP");
      };
    }
    /*jshint -W002 */
    catch (err) {
      try {
        new ActiveXObject("Microsoft.XMLHTTP");

        requestMethod = function () {
          return new ActiveXObject("Microsoft.XMLHTTP");
        };
      }
      catch (err) {}
    }
  }
}

/**
* This function push the log entry to
* the specified Log Server
*
* @param entry a log Object
*/
function pushToLogServer (entry) {

  if (!logServerEnabled && requestMethod) {
    return false;
  }

  http_request = requestMethod();

  if (!http_request) {
    console.error('LoggerJS::pushToLogServer - no HTTP Request coultd be instanciated');
    return false;
  }


  http_request.onreadystatechange = checkPush;

  http_request.open('POST', logServerUrl, true);
  http_request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');


  http_request.send(JSON.stringify(entry.toJson()));
}

/**
* This function checks the Request status.
* If the Log Entry could not be sent to the
* Log Server, an connection Error is thrown
*/
function checkPush () {
  if (this.readyState === 4) {
    if (this.status !== 200) {
      var error;

      if (this.status) {
        error = new Error('LogServer returned HTTP StatusCode '+this.status+', url: '+logServerUrl);
      }
      else {
        error = new Error('LogServer unreachable, url: '+logServerUrl);
      }

      error.name = LOG_LEVELS.WARNING;

      entry = new LogEntry(error);

      // Output error
      console.error(entry.toString());
      handleWebConsole(entry);
    }
  }
}

var oldOnError;

/**
* Global Error Handling definition.
* Here is the environment specific handler
* for unexpected errors.
*/
function UnexpectedErrorHandler (message, filename, line, column, error) {
  var entry = null;

  if (error) {
    if (!error.fileName && filename)
      error.fileName = filename;

    if (!error.lineNumber && line)
      error.lineNumber = line;
  }
  else {
    error = new Error(message);
    error.fileName = filename;
    error.lineNumber = line;
  }

  error.name = 'ERROR';

  entry = new LogEntry(error);

  // Output error
  console.error(entry.toString());

  // Execute handlers
  pushToLogServer(entry);
  handleWebConsole(entry);

  // Trigger tasks
  triggerLogTaskProcessing(entry);


  if (oldOnError) {
    oldOnError(message, filename, line, column, error);
  }

  // supress propagation
  return true;
}

if (window) {
  if (window.onerror) {
    oldOnError = window.onerror;
  }

  window.onerror = UnexpectedErrorHandler;
}


function addWebConsole () {
  if (window && !webConsole) {
    var inbody = false;

    if (webConsoleParentId) {
      webConsoleParent = window.document.getElementById(webConsoleParentId);
    }

    if (!parent) {
      webConsoleParent = window.document.body;
      inbody = true;
    }

    webConsole = document.createElement('div');
    webConsole.id = webConsoleId;

    if (inbody) {
      if (webConsoleParent.firstChild) {
        webConsoleParent.insertBefore(webConsole, webConsoleParent.firstChild);
      }
      else {
        webConsoleParent.appendChild(webConsole);
      }
    }
    else {
      webConsoleParent.appendChild(webConsole);
    }
    webConsoleActive = true;
  }
  else {
    webConsoleActive = false;
  }
}

function addWebConsoleEntry (entry) {
  if (!webConsole) {
    addWebConsole();
  }

  var logText = entry.toString().replace(/\n/g, '<br/>&nbsp;&nbsp;&nbsp;&nbsp;');

  var newLogEntryDiv = document.createElement('div');
  newLogEntryDiv.id = entry.namespace + '-' + entry.hash;
  newLogEntryDiv.className = 'LJS' + entry.logLevel;

  newLogEntryDiv.innerHTML = logText;

  if (webConsole.firstChild) {
    webConsole.insertBefore(newLogEntryDiv, webConsole.firstChild);
  }
  else {
    webConsole.appendChild(newLogEntryDiv);
  }
}


Logger.prototype.useWebConsole = function (parentId, consoleId) {
  webConsoleParentId = parentId || webConsoleParentId;
  webConsoleId = consoleId || webConsoleId;
  webConsoleActive = true;
};

Logger.prototype.enableWebConsole = function (parentId, consoleId) {
  if (webConsole) {
    webConsoleActive = true;
  }
};

Logger.prototype.disableWebConsole = function (parentId, consoleId) {
  webConsoleActive = false;
  webConsoleParent.innerHTML = '';
};

Logger.prototype.cleanWebConsole = function (parentId, consoleId) {
  webConsole.innerHTML = '';
};


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
    if (typeof LOG_LEVELS[property] === 'string')
      loggerJsModule[property] = LOG_LEVELS[property];
  }

  return loggerJsModule;
})(this);
