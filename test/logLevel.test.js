var logger = require('../build/loggerjs.test'),
    chai = require('chai'),
    expect = chai.expect;

it('Log level "fatal" equal FATAL', function() {
    expect(logger.LOG_LEVELS.FATAL).to.equal('FATAL');
});

it('Log level "error" equal ERROR', function() {
    expect(logger.LOG_LEVELS.ERROR).to.equal('ERROR');
});

it('Log level "warning" equal WARNING', function() {
    expect(logger.LOG_LEVELS.WARNING).to.equal('WARNING');
});

it('Log level "info" equal INFO', function() {
    expect(logger.LOG_LEVELS.INFO).to.equal('INFO');
});

it('Log level "log" equal LOG', function() {
    expect(logger.LOG_LEVELS.LOG).to.equal('LOG');
});

it('Log level "auth" equal AUTH', function() {
    expect(logger.LOG_LEVELS.AUTH).to.equal('AUTH');
});

it('Log level "PATH" equal PATH', function() {
    expect(logger.LOG_LEVELS.PATH).to.equal('PATH');
});

it('Log level "DEBUG" equal DEBUG', function() {
    expect(logger.LOG_LEVELS.DEBUG).to.equal('DEBUG');
});
