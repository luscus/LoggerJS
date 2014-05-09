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

  if (array.length < 2) {
    return array;
  }


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
