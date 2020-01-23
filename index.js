const log = require('./src/util/tools').getLogger()
const versioning = require('restify-url-semver')
const Cors = require('restify-cors-middleware')
const config = require('./src/util/config')
const mongoose = require('mongoose')
const restify = require('restify')
const morgan = require('morgan')
const plugins = restify.plugins

const cors = Cors({
  origins: ['localhost:4242', 'tpolls.app'],
  allowHeaders: ['Api-Key', 'Content-Type'],
  exposeHeaders: ['Api-Key', 'Content-Type']
})

const SERVER_PORT = process.env.PORT || 4242
const server = restify.createServer({
  name: config.name,
  version: process.env.VERSION
})

server.pre(versioning({ prefix: '/api' }))
server.pre(cors.preflight)

server.use(plugins.acceptParser(server.acceptable))
server.use(plugins.fullResponse())
server.use(plugins.gzipResponse())
server.use(plugins.bodyParser())
server.use(morgan('combined'))
server.use(cors.actual)

server.listen(SERVER_PORT, () => {
  mongoose.Promise = global.Promise
  mongoose.connect(config.db.uri, config.mongoOpts)

  const db = mongoose.connection

  db.on('error', err => {
    log.error(err)
  })

  db.once('open', () => {
    require('./src/routes')(server)
    log.info(`TPolls server is listening on port ${SERVER_PORT}...`)
  })
})

// server.on('after', plugins.metrics({ server: server }, (err, metrics, req, res, route) => {
//   if (err) log.err(err)
//   else {
//     log.info(metrics)
//     log.info(route)
//   }
// }))
