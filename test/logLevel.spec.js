var logger = require('../lib/loggerjs.browser.test'),
    chai = require('chai'),
    expect = chai.expect;


describe('Log Levels', function(){

  // Checking the String values
  describe('String Values', function(){

    function checkStringValues (logLevel, index) {
      it('"' + logLevel + '" has string value "' + logLevel + '"', function() {
        expect(index).to.be.above(-1);
      });
    }

    for(var logLevel in logger.LOG_LEVELS.priority) {
      var index = logger.LOG_LEVELS.logPriority.indexOf(logLevel);
      checkStringValues(logLevel, index);
    }

//     it('"FATAL" equal FATAL', function() {
//       expect(logger.LOG_LEVELS.FATAL).to.equal('FATAL');
//     });

//     it('"ERROR" equal ERROR', function() {
//       expect(logger.LOG_LEVELS.ERROR).to.equal('ERROR');
//     });

//     it('"WARNING" equal WARNING', function() {
//       expect(logger.LOG_LEVELS.WARNING).to.equal('WARNING');
//     });

//     it('"INFO" equal INFO', function() {
//       expect(logger.LOG_LEVELS.INFO).to.equal('INFO');
//     });

//     it('"LOG" equal LOG', function() {
//       expect(logger.LOG_LEVELS.LOG).to.equal('LOG');
//     });

//     it('"AUTH" equal AUTH', function() {
//       expect(logger.LOG_LEVELS.AUTH).to.equal('AUTH');
//     });

//     it('"PATH" equal PATH', function() {
//       expect(logger.LOG_LEVELS.PATH).to.equal('PATH');
//     });

//     it('"DEBUG" equal DEBUG', function() {
//       expect(logger.LOG_LEVELS.DEBUG).to.equal('DEBUG');
//     });
  });

  // Checking the priority
  describe('Priority', function(){

    function checkPriority (logLevel, index) {
      it('"' + logLevel + '" equal ' + index, function() {
        expect(logLevel).to.equal(index);
      });
    }

    for(var logLevel in logger.LOG_LEVELS.priority) {
      var index = logger.LOG_LEVELS.logPriority.indexOf(logLevel);
      checkPriority(logLevel, index);
    }

//     it('"FATAL" equal 0', function() {
//       expect(logger.LOG_LEVELS.priority.FATAL).to.equal(logger.LOG_LEVELS.logPriority.indexOf(logger.LOG_LEVELS.FATAL));
//     });

//     it('"ERROR" equal 1', function() {
//       expect(logger.LOG_LEVELS.priority.ERROR).to.equal(logger.LOG_LEVELS.logPriority.indexOf(logger.LOG_LEVELS.ERROR));
//     });

//     it('"WARNING" equal 2', function() {
//       expect(logger.LOG_LEVELS.priority.WARNING).to.equal(logger.LOG_LEVELS.logPriority.indexOf(logger.LOG_LEVELS.WARNING));
//     });

//     it('"INFO" equal 3', function() {
//       expect(logger.LOG_LEVELS.priority.INFO).to.equal(logger.LOG_LEVELS.logPriority.indexOf(logger.LOG_LEVELS.INFO));
//     });

//     it('"LOG" equal 4', function() {
//       expect(logger.LOG_LEVELS.priority.LOG).to.equal(logger.LOG_LEVELS.logPriority.indexOf(logger.LOG_LEVELS.LOG));
//     });

//     it('"AUTH" equal 5', function() {
//       expect(logger.LOG_LEVELS.priority.AUTH).to.equal(logger.LOG_LEVELS.logPriority.indexOf(logger.LOG_LEVELS.AUTH));
//     });

//     it('"PATH" equal 6', function() {
//       expect(logger.LOG_LEVELS.priority.PATH).to.equal(logger.LOG_LEVELS.logPriority.indexOf(logger.LOG_LEVELS.PATH));
//     });

//     it('"DEBUG" equal 7', function() {
//       expect(logger.LOG_LEVELS.priority.DEBUG).to.equal(logger.LOG_LEVELS.logPriority.indexOf(logger.LOG_LEVELS.DEBUG));
//     });
  });

  // Checking Stack levels
  describe('Levels with error stack output', function(){
    it('2 Levels are stack enabled', function() {
      expect(logger.LOG_LEVELS.withStack.length).to.equal(2);
    });

    it('"FATAL" stack enabled', function() {
      expect(logger.LOG_LEVELS.withStack.indexOf(logger.LOG_LEVELS.FATAL)).to.be.above(-1);
    });

    it('"ERROR" stack enabled', function() {
      expect(logger.LOG_LEVELS.withStack.indexOf(logger.LOG_LEVELS.ERROR)).to.be.above(-1);
    });
  });

  // Checking method checkPriority
  describe('Method checkPriority(checkLevel, controlLevel)', function(){
    it('Prio-0 Level higher than Prio-1 => return true', function() {
      expect(logger.LOG_LEVELS.checkPriority(logger.LOG_LEVELS.logPriority[0], logger.LOG_LEVELS.logPriority[1])).to.equal(true);
    });

    it('Prio-1 Level NOT higher than Prio-0 => return false', function() {
      expect(logger.LOG_LEVELS.checkPriority(logger.LOG_LEVELS.logPriority[1], logger.LOG_LEVELS.logPriority[0])).to.equal(false);
    });

    it('Prio-1 ckecked against Prio-1 to return true', function() {
      expect(logger.LOG_LEVELS.checkPriority(logger.LOG_LEVELS.logPriority[1], logger.LOG_LEVELS.logPriority[1])).to.equal(true);
    });

    it('undefined ckecked against Prio-1 to return false', function() {
      expect(logger.LOG_LEVELS.checkPriority(undefined, logger.LOG_LEVELS.logPriority[1])).to.equal(false);
    });

    it('undefined ckecked against undefined to return false', function() {
      expect(logger.LOG_LEVELS.checkPriority(undefined, undefined)).to.equal(false);
    });

    it('Prio-1 ckecked against undefined to return false', function() {
      expect(logger.LOG_LEVELS.checkPriority(logger.LOG_LEVELS.logPriority[1], undefined)).to.equal(false);
    });
  });

  // Checking method exists
  describe('Method exists(logLevel)', function(){
    it('Prio-0 Level => return true', function() {
      expect(logger.LOG_LEVELS.exists(logger.LOG_LEVELS.logPriority[0])).to.equal(true);
    });

    it('"TEST" Level => return false', function() {
      expect(logger.LOG_LEVELS.checkPriority('TEST')).to.equal(false);
    });

    it('undefined => return false', function() {
      expect(logger.LOG_LEVELS.checkPriority(undefined)).to.equal(false);
    });
  });
});
