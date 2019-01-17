var path = require('path')

function resolvePath(a, b) {
	return path.resolve('/', path.dirname(a), b)
}
module.exports = resolvePath
