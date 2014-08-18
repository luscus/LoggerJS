
var requester = require('request');

/**
* This function push the log entry to
* the specified Log Server
*
* @param entry a log Object
*/
function pushToLogServer (entry) {

  if (!logServerEnabled) {
    return false;
  }

  requester.post(
    {
      uri: logServerUrl,
      json: entry.toJson(),
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      }
    },
    function(error, req_response, body) {
      body = body || {};

      if (error || body.error) {
        logServerEnabled = false;


        if (!error) {
          error = new Error(body.error);
        }

        error.message = 'Error while pushing to LogServer '+logServerUrl+': '+ error.message;
        error.name = LOG_LEVELS.WARNING;

        var log = new LogEntry(error);

        console.error(log.toString());
        triggerLogTaskProcessing(log);
      }
    }
  );
}
