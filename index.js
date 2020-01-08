const versioning = require('restify-url-semver')
const config = require('./src/util/config')
const mongoose = require('mongoose')
const restify = require('restify')
const morgan = require('morgan')
const plugins = restify.plugins
const log = require('simple-node-logger').createRollingFileLogger({
  logDirectory: './logs',
  fileNamePattern: 'roll-<DATE>.log',
  dateFormat: 'YYYY.MM.DD'
})

const SERVER_PORT = process.env.PORT || 4242
const server = restify.createServer({
  name: config.name,
  version: process.env.VERSION
})

server.use(plugins.jsonBodyParser({ mapParams: true }))
server.use(plugins.acceptParser(server.acceptable))
server.use(plugins.queryParser({ mapParams: true }))
server.use(plugins.fullResponse())
server.use(morgan('combined'))

server.pre(versioning({ prefix: '/api' }))

server.listen(SERVER_PORT, () => {
  mongoose.Promise = global.Promise
  mongoose.connect(config.db.uri, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })

  const db = mongoose.connection

  db.on('error', err => {
    log.error(err)
    console.error(err)
  })

  db.once('open', () => {
    require('./src/routes')(server)
    log.info(`TPolls server is listening on port ${SERVER_PORT}...`)
    console.log(`TPolls server is listening on port ${SERVER_PORT}...`)
  })
})
