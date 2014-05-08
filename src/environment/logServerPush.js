
var http_request = false,
    requestMethod;


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
        error.name = 'LoggerJS::LogServerException';
      }
      else {
        error = new Error('LogServer unreachable, url: '+logServerUrl);
        error.name = 'LoggerJS::LogServerException';
      }

      entry = new LogEntry(error);

      // Output error
      console.error(entry.toString());
      handleWebConsole(entry);
    }
  }
}
