const chai = require('chai');
const sinon = require('sinon');
const assertArrays = require('chai-arrays');
const assertStrings = require('chai-string');
const utils = require('../src/lib/utils');

const { expect } = chai;
chai.use(assertArrays);
chai.use(assertStrings);

describe('Utils', () => {
  /*
   * Tests for "parseIntParam" function
   */
  describe('parseIntParam', () => {
    it('should parse a simple positive number', () => {
      const expectedValue = 3123;
      expect(utils.parseIntParam(`${expectedValue}`)).to.equals(expectedValue);
    });

    it('should parse a simple negative number', () => {
      const expectedValue = -342;
      expect(utils.parseIntParam(`${expectedValue}`)).to.equals(expectedValue);
    });

    it('should not parse a number with something other than numbers', () => {
      try {
        utils.parseIntParam('1412.1');
        expect.fail('It should have failed');
      } catch (err) {
        expect(err).to.be.an('error');
      }
      try {
        utils.parseIntParam('0,14121');
        expect.fail('It should have failed');
      } catch (err) {
        expect(err).to.be.an('error');
      }
    });

    it('should fail if input is not a number', () => {
      try {
        utils.parseIntParam('a');
        expect.fail('It should have failed');
      } catch (err) {
        expect(err).to.be.an('error');
      }
    });
  });

  /*
   * Tests for "parsePort" function
   */
  describe('parsePort', () => {
    it('should parse a port number', () => {
      const expectedValue = 8080;
      expect(utils.parsePort(`${expectedValue}`)).to.equals(expectedValue);
    });

    it('should fail if input value is lower than 0', () => {
      try {
        utils.parsePort('-1');
        expect.fail('It should have failed');
      } catch (err) {
        expect(err).to.be.an('error');
      }
    });

    it('should fail if input value is higher than 65535', () => {
      try {
        utils.parsePort('65536');
        expect.fail('It should have failed');
      } catch (err) {
        expect(err).to.be.an('error');
      }
    });

    it('should not parse a port string with something other than numbers', () => {
      try {
        utils.parsePort('1412.1');
        expect.fail('It should have failed');
      } catch (err) {
        expect(err).to.be.an('error');
      }
      try {
        utils.parsePort('0,14121');
        expect.fail('It should have failed');
      } catch (err) {
        expect(err).to.be.an('error');
      }
    });

    it('should fail if input is not a number', () => {
      try {
        utils.parsePort('a');
        expect.fail('It should have failed');
      } catch (err) {
        expect(err).to.be.an('error');
      }
    });
  });

  /*
   * Tests for "parseIntParam" function
   */
  describe('exitWithError', () => {
    before(() => {
      sinon.stub(process, 'exit');
    });

    after(() => {
      process.exit.restore();
    });

    it('should have exited with default error code (-1)', () => {
      utils.exitWithError('message');
      sinon.assert.called(process.exit);
      sinon.assert.calledWith(process.exit, -1);
    });

    it('should have exited with given error code', () => {
      const code = 41;
      utils.exitWithError('message', code);
      sinon.assert.called(process.exit);
      sinon.assert.calledWith(process.exit, code);
    });
  });
});
