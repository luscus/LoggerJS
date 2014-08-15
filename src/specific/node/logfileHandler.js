var logfileStream,
    logfileWatcher,
    logfilePath,
    logfileActive,
    logfileCreateRetry = 0,
    fs = require('fs');


Logger.prototype.useLogfile = function (path) {
    logfilePath = path;
    setLogfile();

    var options = {
      name: 'LogFile',
      status: logfileActive,
      logLevel: LOG_LEVELS.DEBUG,
      task: handleLogfile,
    };

    this.registerLogTask(new LogTask(options));
};

Logger.prototype.enableLogfile = function () {
  setLogfile();
};

Logger.prototype.disableLogfile = function () {
  closeLogfileStream();
};



function handleLogfile (entry) {
  if (logfileStream && logfileActive) {
    //console.log('LogFile task running, writing to '+logfilePath+'...');
    logfileStream.write(entry.toString() + ' - pid:' + node_processId + '\n');

    checkLogfile();
  }
}

function checkLogfile () {
  if (!fs.existsSync(logfilePath)) {
    // File has been deleted

    // desactivate task
    logfileActive = false;
    // try to reactivate logging
    handleLogfileDeletion();
  }
}

function handleLogfileDeletion () {
  // close old write.stream
  closeLogfileStream();
  // open new write.stream
  setLogfile();
}

function setLogfile () {
  if (!fs.existsSync(logfilePath)) {
    var file = fs.open(logfilePath, 'w', function (error,fd) {
      if (error) {
        // desactivate task
        logfileActive = false;

        // increment counter
        logfileCreateRetry++;


        if (logfileCreateRetry > 20) {
          // retry only 20 times (10 seconds)
          error.message = 'Logfile could not be created: '+error.message;

          var log = new LogEntry(error);

          console.error(log.toString());
          triggerLogTaskProcessing(log);

          process.exit();
        }

        // schedule retry
        setTimeout(setLogfile, 500);

        return;
      }

      // reset retry counter
      logfileCreateRetry = 0;

      logfileActive = true;

      fs.closeSync(fd);
      setLogfileStream();
    });
  }
  else {
    logfileActive = true;
    setLogfileStream ();
  }
}

function setLogfileStream () {
  if (!logfileStream) {

    if (logfileActive) {
      logfileStream = fs.createWriteStream(logfilePath, {
        flags    : 'a',
        encoding : 'utf8',
        mode     : 0644
      });

      logfileStream.on('error', function (err) {
        console.log('error logfile '+logfilePath, err);
      });

      logfileStream.on('finish', function (err) {
        console.log('Logfile Stream closed for '+logfilePath);
        logfileStream = undefined;
      });

      return true;
    }
    else {
      return false;
    }
  }
}

function closeLogfileStream () {
  logfileActive = false;

  if (logfileStream) {
    logfileStream.end();
  }
}

process.on('SIGINT', function () {
  process.exit();
});

process.on('exit', function () {
  console.log('process exit...');
  closeLogfileStream();
});
