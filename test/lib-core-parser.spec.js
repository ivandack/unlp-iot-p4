const chai = require('chai');
const assertArrays = require('chai-arrays');
const assertStrings = require('chai-string');
const coreParser = require('../src/lib/core-parser');

const { expect } = chai;
chai.use(assertArrays);
chai.use(assertStrings);

describe('CoRE Parser', () => {
  it('should parse only the path', () => {
    const expectedPath = '/hola/que/tal';
    const result = coreParser.parseCoreResponse(`<${expectedPath}>`);
    expect(result)
      .to.be.array()
      .ofSize(1);
    const resource = result[0];
    expect(resource).to.have.property('path', expectedPath);
  });

  it('should parse path and title parameter', () => {
    const expectedPath = '/hola/que/tal';
    const title = 'Un titulo';
    const result = coreParser.parseCoreResponse(`<${expectedPath}>;title="${title}"`);
    expect(result)
      .to.be.array()
      .ofSize(1);
    const resource = result[0];
    expect(resource).to.have.property('path', expectedPath);
    expect(resource).to.have.property('title', title);
  });

  it('should parse path and title parameter of multiple resources', () => {
    const res1 = {
      path: '/path/de/resource1',
      title: 'Resource 1',
    };
    const res2 = {
      path: '/path/de/resource2',
      cr: '4',
    };
    const str = `<${res1.path}>;title="${res1.title}",<${res2.path}>;cr="${res2.cr}"`;
    const result = coreParser.parseCoreResponse(str);
    expect(result)
      .to.be.array()
      .ofSize(2);
    const resource1 = result[0];
    expect(resource1).to.have.property('path', res1.path);
    expect(resource1).to.have.property('title', res1.title);
    const resource2 = result[1];
    expect(resource2).to.have.property('path', res2.path);
    expect(resource2).to.have.property('cr', res2.cr);
  });

  it('should fail when receiving an invalid input', () => {
    try {
      coreParser.parseCoreResponse('string cualquiera');
      expect.fail('should have thrown an error for invalid input');
    } catch (err) {
      expect(err).to.be.an('error');
    }
  });
});
