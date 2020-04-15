const fs = require('fs')
const {promisify} = require('util')

const F = {}
F.wf = promisify(fs.writeFile)
F.rd = promisify(fs.readdir)
F.rf = promisify(fs.readFile)

module.exports = F