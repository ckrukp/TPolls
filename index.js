const config = require('./src/index').Config
const restify = require('restify')
const mongoose = require('mongoose')
const plugins = restify.plugins
const logOpts = {
  logDirectory: './logs',
  fileNamePattern: 'roll-<DATE>.log',
  dateFormat: 'YYYY.MM.DD'
}
const log = require('simple-node-logger').createRollingFileLogger(logOpts)
const versioning = require('restify-url-semver')

const server = restify.createServer({
  name: config.name,
  version: config.version
})

server.use(plugins.jsonBodyParser({ mapParams: true }))
server.use(plugins.acceptParser(server.acceptable))
server.use(plugins.queryParser({ mapParams: true }))
server.use(plugins.fullResponse())

server.pre(versioning({ prefix: '/api' }))

server.listen(config.port, () => {
  mongoose.Promise = global.Promise
  mongoose.connect(config.db.uri, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })

  const db = mongoose.connection

  db.on('error', err => {
    log.error(err)
    console.error(err)
  })

  db.once('open', () => {
    require('./src/routes')(server)
    log.info(`TPolls server is listening on port ${config.port}...`)
    console.log(`TPolls server is listening on port ${config.port}...`)
  })
})
