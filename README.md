# LoggerJS

LoggerJS enables client side logging using the console (if available) and pushing Log Entries towards a Log Server.

Features:

* Uses the console to output information to the Browser Developer Tools.
* Supports sending the log entry (as JSON) to some Log Server.
* Supports output to the document if console is not available (no CSS provided).
* custom tasks to be processed on specified log levels.
* Handles unexpected errors in the window.
* Delivers a skeleton lib to build uppon (example: [node-LoogerJS](https://github.com/luscus/node-LoggerJS))

Please report bugs there [on Github](https://github.com/luscus/LoggerJS/issues).

----------

## Usage

### Set Dependency

Add following entry to your `bower.json` in the `dependencies` property

    "dependencies": {
      "LoggerJS" : "https://github.com/luscus/LoggerJS.git"
    },


### Bind Library

    <script type="application/javascript" src="..bower_components/LoggerJS/build/loggerjs.js"></script>

Or the minified version

    <script type="application/javascript" src="..bower_components/LoggerJS/build/loggerjs.min.js"></script>

### Instanciate

Create a Logger instance

    var options = {
      namespace :    'my.awsome.project',
      uniqueLogKeys: <boolean>,
      status :       <boolean>,
      logLevel :     LoggerJS.<LEVEL>,
      logServerUrl : '<logging_service_url>',
      tags :         ['myproject', 'gui', 'something']
    },
    logger = new LoggerJS.Logger(options);

Here is the option list

* `namespace`: is mandatory and provides information about the module
* `uniqueLogKeys`: the error ID (key) can be unique or shared per log message. This can be useful for some databases, it enables to group similar log entries and only increment a counter (default: true).
* `status`: a boolean representing the logger's activity state (default: true)
* `logLevel`: initial Log Level (default: ERROR)
* `logServerUrl`: an url pointing to the logging service
* `logServerLevel`: the Log Level as of Log are been sent to the logging service
* `tags`: is an Array of String that can later be used to filter the Log Entries



### Custom Logging Tasks

Logging Taks are triggered each time a new LogEntry is generated.
They are run after the outputing of the LogEntry.


#### Create new LogTask

    var options = {
          name: 'somename',
          status: <boolean>,
          logLevel : LoggerJS.<LEVEL>,
          strict : <boolean>,
          task: function (logEntry) {
            /* do something.
               You can find the LogEntry API at the end of the README */
          }
        },
        task = new LoggerJS.LogTask(options);

Here is the option list

* `name`: is mandatory and provides information about the module
* `status`: a boolean representing the task's activity state (default: true)
* `logLevel`: minimum Log Level at which the Task will be active (default: logger.status)
* `strict`: log level check is strict, the LogTask level and the LogEntry level must match (default: false)
* `task`: a mandatory function awaiting a LogEntry object as parameter


#### Register new LogTask

    logger.registerLogTask(task);

#### Unregister new LogTask

    logger.unregisterLogTask(taskOject);
or

    logger.unregisterLogTask(task_name);


----------


## API

### Logger

#### Properties

* `logger.status`: state of the logger: true=active, false=inactive
* `logger.log_level`: logger's active log level, see bellow for existing levels

Log Levels in order of priority:

* `LoggerJS.AUTH`: related to authentication (lowest level)
* `LoggerJS.INFO`: information about the state of the application
* `LoggerJS.FATAL`: critical issue. After output, application should be brocken
* `LoggerJS.ERROR`: critical issue
* `LoggerJS.WARNING`: something isn't quite correct, but the application runs
* `LoggerJS.LOG`: generic logging
* `LoggerJS.PATH`: output about the function navigation of the data
* `LoggerJS.DEBUG`: debugging information (highest level)


#### setStatus

Parameters:

* status: boolean representing the logger's activity state

Examples:

    // Logs will be outputed
    logger.setStatus(true);

    // no logs entries generated
    logger.setStatus(false);


#### disable / enable

Wrappers for `setStatus`

Examples:

    // Logs will be outputed
    logger.enable();

    // no logs entries generated
    logger.disable();


#### setLogLevel

Parameters:

* logLevel: the new Log Level to be set

Examples:

    // Log Level set to DEBUG (show all Logs)
    logger.setLogLevel(LoggerJS.DEBUG);


#### getNamespace

Returns the namespace of the Logger. It should provide information about the module using it.

Examples:

    // return example: 'loggerjs.test.run'
    logger.getNamespace();


#### getTags

Returns the Tag Array defined for this Logger instance.

Examples:

    // return example: ["my", "test", "run"]
    logger.getTags();


#### be

Returns the activity state of the specified Log Level as Boolean.

Parameters:

* logLevel: the new Log Level to be set

Examples:

    // returns boolean
    logger.be(LoggerJS.DEBUG);


----------

### Web Console (no available in the skeleton)


#### useWebConsole

Parameters:

* parentId (String): ID of the Web Console's parent element (default: Web Console becomes first child of window.document.body)
* consoleId (String): ID of the Web Console's DIV element (default: LJSWebConsole )

Examples:

    logger.useWebConsole();

    logger.useWebConsole('myCustomParentElement');

    logger.useWebConsole('myCustomParentElement', 'myCustomWebConsoleId');

#### enableWebConsole

Examples:

    logger.enableWebConsole();

#### enableWebConsole

Examples:

    logger.disableWebConsole();

#### cleanWebConsole

Removes console content.

Examples:

    logger.cleanWebConsole();

----------

### Log Server

#### useLogServer

Parameters:

* url: target Log Server URL
* filter: allows to send only entries with same or higher priority as the one you specified

Examples:

    logger.useLogServer('http://localhost:25998');

    logger.useLogServer('http://localhost:25998', LoggerJS.ERROR);


#### setLogServerStatus

Parameters:

* status: boolean representing the logger's activity state

Examples:

    // Logs will be outputed
    logger.setLogServerStatus(true);

    // no logs entries generated
    logger.setLogServerStatus(false);


#### enableLogServer / disableLogServer

Wrappers for `setLogServerStatus`

Examples:

    // Send logs to Log Service
    logger.enableLogServer();

    // no logs will be sent
    logger.disableLogServer();


#### setLogServerLevel

Parameters:

* filter: allows to send only entries with same or higher priority as the one you specified

Example:

    logger.setLogServerLevel(LoggerJS.ERROR);


----------

### Log Task

#### registerLogTask

Parameters:

* logTask: an LogTask object (see at the bottom for more infomation)

Example:

    logger.registerLogTask(logTask);


#### getLogTasks

Returns all the registred tasks as an array of Objects

    logger.getLogTasks();


#### setLogTaskLogLevel

Parameters:

* name: LogTask name
* logLevel: minimum Log Level at which the LogTask is active. Default is the logger logLevel.

Example:

    logger.setLogTaskLogLevel('xyz', LoggerJS.ERROR);


#### disable / enable LogTask

Wrappers for `setLogTaskStatus`

Parameters:

* name: LogTask name

Examples:

    // task turned on
    logger.enableLogTask('xyz');

    // task turned off
    logger.disableLogTask('xyz');


#### setLogTaskStatus

Parameters:

* name: the Task's name
* status: boolean representing the task's activity state

Examples:

    // Logs will be outputed
    logger.setLogTaskStatus('xyz', true);

    // no logs entries generated
    logger.setLogTaskStatus('xyz', false);


#### unregisterLogTask

Parameters:

* logTask: an LogTask object (see at the bottom for more infomation) or a LogTask name

Examples:

    // unregister using LogTask name
    logger.unregisterLogTask('xyz');

    // unregister using LogTask object
    logger.unregisterLogTask(task);


-------


## LogEntry API

### toJson

returns the full JSON Log Object

### toString

returns the Log as string formated as follows:

    2014-04-04T12:53:09.490Z - <namespace> - <log_level> - <path_to_file>:<line_number> - <message>

### getConsolePrefix

returns part of the Log as prefix string for the console Object:

    2014-04-04T12:53:09.490Z - <namespace> - <log_level> - <path_to_file>:<line_number> -
