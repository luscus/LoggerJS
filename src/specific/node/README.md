# Node.js specifics [return to README](https://github.com/luscus/LoggerJS/blob/master/README.md)


## Usage

### Set Dependency

Add following entry to your `package.json` in the `dependencies` property

    "dependencies": {
      "loggerjs" : "0.0.x"
    },


### Instanciate

Use a Logger instance in a Node.js module

    var LoggerJS = require('loggerjs'),
    options = {
      namespace :    'my.awesome.project',
      status :       true,
      logLevel :     LoggerJS.DEBUG,
      logServerUrl : '<logging_service_url>',
      tags :         ['myproject', 'node', 'something']
    },
    logger = new LoggerJS.Logger(options);

please refer to the [README](https://github.com/luscus/LoggerJS/blob/master/README.md) for an up to date list of options.

## API

please refer to the [README](https://github.com/luscus/LoggerJS/blob/master/README.md) for an up to date API description.

----------

### Logfile API (Node specific)

#### useLogfile

Activates writing log entries to files.

Parameter:

* path: absolute path to the logfile

Example:

    // activates file logging
    logger.useLogfile(<path>);

#### enableLogfile

Enables logfile task.

Example:

    // enables file logging
    logger.enableLogfile();

#### disableLogfile

Disables logfile task.

Example:

    // disables file logging
    logger.disableLogfile();

