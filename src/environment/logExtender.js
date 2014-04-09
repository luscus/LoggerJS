
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
