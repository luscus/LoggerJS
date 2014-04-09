
/**
* Global Error Handling definition.
* Here is the environment specific handler
* for unexpected errors.
*/
(function (global) {

  function UnexpectedErrorHandler (message, filename, line, column, error) {
    var entry = null;

    if (error) {
      if (!error.fileName && filename)
        error.fileName = filename;

      if (!error.lineNumber && line)
        error.lineNumber = line;
    }
    else {
      error = new Error();
      error.message = message;
      error.fileName = filename;
      error.lineNumber = line;
    }

    error.name = 'UnexpectedError';

    entry = new LogEntry(error);

    if (logServerEnabled) {
      pushToLogServer(entry);
    }

    console.error(entry.toString());

    // supress propagation
    return true;
  }

  if (window)
    window.onerror = window.onerror || UnexpectedErrorHandler;

})(this);
