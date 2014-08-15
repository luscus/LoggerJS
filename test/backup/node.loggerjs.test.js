var LoggerJS = require('../../lib/loggerjs.node'),
    options = {
      "namespace" :    "node.logger.test.run",
      "status" :       true,
      "logLevel" :     "DEBUG",
      "tags" :         ["NODE","TEST","LOGGERJS"]
    },
    logger = new LoggerJS.Logger(options);


console.log(logger);

// Handle unexpected errors
var options = {
      name: 'error',
      status: true,
      strict: false,
      logLevel : LoggerJS.ERROR,
      task: function (logEntry) {
        console.log('error TASK running...');
      }
    },
    task = new LoggerJS.LogTask(options);

logger.registerLogTask(task);

logger.useLogfile('./test/backup/test.log');



function runTest () {
  for (var idx in logger.levels.logPriority) {
    var method = logger.levels.logPriority[idx];
    logger[method.toLowerCase()]('ein kleiner "'+method+'" output Test');
  }

  console.info(logger.log('some return value test'));

  logger.useLogServer('http://dggfgd');


  test.doit();
}


setInterval(runTest, 1000);
