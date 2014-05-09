var logger = require('../build/loggerjs.test'),
    chai = require('chai'),
    expect = chai.expect;

it('Log level "info" equal INFO', function() {
    expect(logger.LOG_LEVELS.INFO).to.equal('INFO');
});

it('Log level "fatal" equal FATAL', function() {
    expect(logger.LOG_LEVELS.FATAL).to.equal('FATAL');
});
