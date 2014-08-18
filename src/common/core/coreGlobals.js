var loggerJsModule,
    pathSep = null;

var logNamespace = null,
    uniqueLogKeys = true,
    logTasks = {},
    logTags = [];

// FLAGS
var webConsoleActive = false,
    webConsoleParentId,
    webConsoleParent,
    webConsoleId = 'LJSWebConsole',
    webConsole;

var errorStack;
