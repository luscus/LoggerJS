var logger = require('../build/loggerjs.test'),
    chai = require('chai'),
    expect = chai.expect;


describe('Log Levels', function(){

  // Checking the String values
  describe('String Values', function(){
    it('"FATAL" equal FATAL', function() {
      expect(logger.LOG_LEVELS.FATAL).to.equal('FATAL');
    });

    it('"ERROR" equal ERROR', function() {
      expect(logger.LOG_LEVELS.ERROR).to.equal('ERROR');
    });

    it('"WARNING" equal WARNING', function() {
      expect(logger.LOG_LEVELS.WARNING).to.equal('WARNING');
    });

    it('"INFO" equal INFO', function() {
      expect(logger.LOG_LEVELS.INFO).to.equal('INFO');
    });

    it('"LOG" equal LOG', function() {
      expect(logger.LOG_LEVELS.LOG).to.equal('LOG');
    });

    it('"AUTH" equal AUTH', function() {
      expect(logger.LOG_LEVELS.AUTH).to.equal('AUTH');
    });

    it('"PATH" equal PATH', function() {
      expect(logger.LOG_LEVELS.PATH).to.equal('PATH');
    });

    it('"DEBUG" equal DEBUG', function() {
      expect(logger.LOG_LEVELS.DEBUG).to.equal('DEBUG');
    });
  });

  // Checking the priority
  describe('Priority', function(){
    it('"FATAL" equal 0', function() {
      expect(logger.LOG_LEVELS.priority.FATAL).to.equal('0');
    });

    it('"ERROR" equal 1', function() {
      expect(logger.LOG_LEVELS.priority.ERROR).to.equal('1');
    });

    it('"WARNING" equal 2', function() {
      expect(logger.LOG_LEVELS.priority.WARNING).to.equal('2');
    });

    it('"INFO" equal 3', function() {
      expect(logger.LOG_LEVELS.priority.INFO).to.equal('3');
    });

    it('"LOG" equal 4', function() {
      expect(logger.LOG_LEVELS.priority.LOG).to.equal('4');
    });

    it('"AUTH" equal 5', function() {
      expect(logger.LOG_LEVELS.priority.AUTH).to.equal('5');
    });

    it('"PATH" equal 6', function() {
      expect(logger.LOG_LEVELS.priority.PATH).to.equal('6');
    });

    it('"DEBUG" equal 7', function() {
      expect(logger.LOG_LEVELS.priority.DEBUG).to.equal('7');
    });
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
