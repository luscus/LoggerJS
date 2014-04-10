var extractLineFromStack = function extractLineFromStack (stack, isFromConsoleWrapper) {
  /// <summary>
  /// Get the line/filename detail from a Webkit stack trace.  See http://stackoverflow.com/a/3806596/1037948
  /// </summary>
  /// <param name="stack" type="String">the stack string</param>

  // some stacks use pretty print for the first line
  // so we have to use a regex to split at the right place
  var line_array = stack.split(/\n\s+at\s+/),
      line;

  if (isFromConsoleWrapper) {
    // correct line number according to how Log().write implemented
    line = line_array[3];
  }
  else {
    line = line_array[1];
  }

  // fix for various display text
  line = (line.indexOf(' (') >= 0 ? line.split(' (')[1].substring(0, line.length - 1) : line.split('at ')[1]);
  line = (line.indexOf(')') >= 0 ? line.split(')')[0] : line);

  return line;
};

var path_delimiter = null;
var parseErrorToJson = function parseErrorToJson (error, with_stack) {
  with_stack = (typeof with_stack === 'boolean') ? with_stack : true;

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

    if (error.message instanceof Error) {
      // Convert Error to Object
      log.logMessage = parseNestedError(error.message);
    }
    else {
      log.logMessage = error.message;
    }

    if (with_stack) {
      log.stack = error.stack;
    }

    if (!error.fileName) {
      log.logLocation = extractLineFromStack(error.stack, error.isFromConsoleWrapper);
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

  }

  return log;
};

var parseNestedError = function parseNestedError (error) {
  var json = {};

  json.name = error.name;
  json.message = error.message;
  json.stack = error.stack;

  return json;
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
