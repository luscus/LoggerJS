
/**
* Global Error Handling definition.
* Here is the environment specific handler
* for unexpected errors.
*/
process.on('uncaughtException', function (error) {
  error.message = 'UncaughtException: ' + error.message;
  error.name = 'ERROR';

  var entry = new LogEntry(error);

  console.error(entry.toString());
  triggerLogTaskProcessing(entry);
});
