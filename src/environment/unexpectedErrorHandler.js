
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

    error.name = 'ERROR';

    entry = new LogEntry(error);

    // Output error
    console.error(entry.toString());

    // Execute handlers
    pushToLogServer(entry);
    handleWebConsole(entry);

    // Trigger tasks
    triggerLogTaskProcessing(entry);

    // supress propagation
    return true;
  }

  if (window)
    window.onerror = window.onerror || UnexpectedErrorHandler;

})(this);
