
function addWebConsole () {
  if (window && !webConsole) {
    var inbody = false;

    if (webConsoleParentId) {
      webConsoleParent = window.document.getElementById(webConsoleParentId);
    }

    if (!parent) {
      webConsoleParent = window.document.body;
      inbody = true;
    }

    webConsole = document.createElement('div');
    webConsole.id = webConsoleId;

    if (inbody) {
      if (webConsoleParent.firstChild) {
        webConsoleParent.insertBefore(webConsole, webConsoleParent.firstChild);
      }
      else {
        webConsoleParent.appendChild(webConsole);
      }
    }
    else {
      webConsoleParent.appendChild(webConsole);
    }
    webConsoleActive = true;
  }
  else {
    webConsoleActive = false;
  }
}

function addWebConsoleEntry (entry) {
  if (!webConsole) {
    addWebConsole();
  }

  var logText = entry.toString().replace(/\n/g, '<br/>&nbsp;&nbsp;&nbsp;&nbsp;');

  var newLogEntryDiv = document.createElement('div');
  newLogEntryDiv.id = entry.namespace + '-' + entry.hash;
  newLogEntryDiv.className = 'LJS' + entry.logLevel;

  newLogEntryDiv.innerHTML = logText;

  if (webConsole.firstChild) {
    webConsole.insertBefore(newLogEntryDiv, webConsole.firstChild);
  }
  else {
    webConsole.appendChild(newLogEntryDiv);
  }
}


Logger.prototype.useWebConsole = function (parentId, consoleId) {
  webConsoleParentId = parentId || webConsoleParentId;
  webConsoleId = consoleId || webConsoleId;
  webConsoleActive = true;
};

Logger.prototype.enableWebConsole = function (parentId, consoleId) {
  if (webConsole) {
    webConsoleActive = true;
  }
};

Logger.prototype.disableWebConsole = function (parentId, consoleId) {
  webConsoleActive = false;
  webConsoleParent.innerHTML = '';
};

Logger.prototype.cleanWebConsole = function (parentId, consoleId) {
  webConsole.innerHTML = '';
};
