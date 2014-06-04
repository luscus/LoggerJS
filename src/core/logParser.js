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
