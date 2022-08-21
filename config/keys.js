if (process.env.NODE_ENV === 'production') {
    // return production set of keys
    module.exports = require('./prod')
}
else {
    module.exports = require('./dev')
}