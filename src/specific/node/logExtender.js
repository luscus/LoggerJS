
var os = require('os');

/**
* This function extends the Log with information
* specific to the environment of the Logger
*
* Example: actual url in the Front-End, ProcessId in the Back-End
*
* @param log a reference on the log Object
*/
var addEnvLogInformation = function addEnvLogInformation (log) {
  if (node_gid !== undefined) log.processUid = node_gid;
  if (node_uid !== undefined) log.processGid = node_uid;

  log.processTitle = node_processTitle;
  log.processId    = node_processId;
  log.processTitle = node_processTitle;
  log.platform     = node_platform;
  log.hostname     = node_hostname;

};


// Those values will not change, read only once
var node_processTitle = process.title,
    node_processId    = process.pid,
    node_processTitle = process.title,
    node_platform     = process.platform,
    node_hostname     = os.hostname(),
    node_gid          = (typeof process.getgid === 'function') ? process.getgid() : undefined,
    node_uid          = (typeof process.getuid === 'function') ? process.getuid() : undefined;
