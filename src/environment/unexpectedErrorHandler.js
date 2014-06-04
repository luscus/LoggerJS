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
