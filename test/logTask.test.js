var logger = require('../lib/loggerjs.browser.test'),
    chai = require('chai'),
    expect = chai.expect,
    options = {
      name:'testTask',
      task: function (logEntry) {
        return 'worked';
      }
    };

describe('Log Tasks', function(){
  describe('Options', function(){
    it('"name" equals "testTask"', function() {
      var task = new logger.LogTask(options);
      expect(task.name).to.equal('testTask');
    });
    it('"task" is a function', function() {
      var task = new logger.LogTask(options);
      expect(typeof task.task).to.equal('function');
      expect(task.task()).to.equal('worked');
    });
  });
});
