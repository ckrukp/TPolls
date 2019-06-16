const Mongo = require('../db/index')

/**
 * Initiates the routes used for the Client endpoints.
 *
 * @param {restify.Server} server The Restify Server object representing all of TPolls.
 */
const main = server => {
  server.get({ path: '/clients', version: '1' }, async (req, res, next) => {
    try {
      const cService = Mongo.getClientService()
      const clients = await cService.getClients()

      res.send(200, clients)
      return next()
    } catch (err) {
      console.error(err)
      return next(err)
    }
  })

  server.post({ path: '/clients', version: '1' }, async (req, res, next) => {
    try {
      const cService = Mongo.getClientService()
      const newClient = await cService.createClient(req.body)

      res.send(200, newClient)
      return next()
    } catch (err) {
      console.error(err)
      return next(err)
    }
  })

  server.get({ path: '/clients/:clientId', version: '1' }, async (req, res, next) => {
    try {
      const cService = Mongo.getClientService()
      const client = await cService.getClient(req.params.clientId)

      res.send(200, client)
      return next()
    } catch (err) {
      console.error(err)
      return next(err)
    }
  })

  server.put({ path: '/clients/:clientId', version: '1' }, async (req, res, next) => {
    try {
      const cService = Mongo.getClientService()
      const updatedClient = await cService.updateClient(req.params.clientId, req.body)

      res.send(200, updatedClient)
      return next()
    } catch (err) {
      console.error(err)
      return next(err)
    }
  })

  server.del({ path: '/clients/:clientId', version: '1' }, async (req, res, next) => {
    try {
      const cService = Mongo.getClientService()
      const deletedClient = await cService.deleteClient(req.params.clientId)

      res.send(200, deletedClient)
      return next()
    } catch (err) {
      console.error(err)
      return next(err)
    }
  })
}

module.exports = main

// #region TypeData
const restify = require('restify')
// #endregion TypeData
