var expect = require('chai').expect;
var resolve = require('../resolve');

describe('resolve()', function () {
  it('should resolve a sibling correctly', function () {
		let result = resolve('/a/b', 'c')
    expect(result).to.be.equal('/a/c');
  });
  it('should add a leading slash if given two relative paths', function () {
		let result = resolve('a/b', 'c')
    expect(result).to.be.equal('/a/c');
  });
  it('should ignore a trailing slash', function () {
		let result = resolve('/a/b/', 'c')
    expect(result).to.be.equal('/a/c');
  });
});
