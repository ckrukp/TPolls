const checkContent = req => {
  return req.is('application/json')
}

const getLogger = () => {
  const SNL = require('simple-node-logger')
  const manager = new SNL()
  manager.createConsoleAppender()
  manager.createRollingFileAppender({
    logDirectory: './logs',
    fileNamePattern: 'tpolls-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
  })
  return manager.createLogger()
}

module.exports.getLogger = getLogger
module.exports.checkContent = checkContent
