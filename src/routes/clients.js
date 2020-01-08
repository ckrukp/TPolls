const { verifyTokenIsAdmin } = require('../util/auth')
const Mongo = require('../db/index')

/**
 * Initiates the routes used for the Client endpoints.
 *
 * @param {restify.Server} server The Restify Server object representing all of TPolls.
 */
const main = server => {
  // GET /api/v1/clients
  // Retrieve a list of all currently created Clients.
  server.get({ path: '/clients', version: '1' }, async (req, res, next) => {
    try {
      const isAdmin = await verifyTokenIsAdmin(req.headers['request-token'])
      if (isAdmin) {
        const cService = Mongo.getClientService()
        const clients = await cService.getClients()

        res.send(200, clients)
      } else {
        res.send(401, 'Only admins of the API are able to use this endpoint.')
      }
      return next()
    } catch (err) {
      console.error(err)
      return next(err)
    }
  })

  // POST /api/v1/clients
  // Create a new Client.
  server.post({ path: '/clients', version: '1' }, async (req, res, next) => {
    try {
      const isAdmin = await verifyTokenIsAdmin(req.headers['request-token'])
      if (isAdmin) {
        const cService = Mongo.getClientService()
        const newClient = await cService.createClient(req.body)

        res.send(200, newClient)
      } else {
        res.send(401, 'Only admins of the API are able to use this endpoint.')
      }
      return next()
    } catch (err) {
      console.error(err)
      return next(err)
    }
  })

  // GET /api/v1/clients/:clientId
  // Retrieve an existing Client by ID.
  server.get({ path: '/clients/:clientId', version: '1' }, async (req, res, next) => {
    try {
      const isAdmin = await verifyTokenIsAdmin(req.headers['request-token'])
      if (isAdmin) {
        const cService = Mongo.getClientService()
        const client = await cService.getClient(req.params.clientId)

        res.send(200, client)
      } else {
        res.send(401, 'Only admins of the API are able to use this endpoint.')
      }
      return next()
    } catch (err) {
      console.error(err)
      return next(err)
    }
  })

  // PUT /api/v1/clients/:clientId
  // Update an existing Client by ID.
  server.put({ path: '/clients/:clientId', version: '1' }, async (req, res, next) => {
    try {
      const isAdmin = await verifyTokenIsAdmin(req.headers['request-token'])
      if (isAdmin) {
        const cService = Mongo.getClientService()
        const updatedClient = await cService.updateClient(req.params.clientId, req.body)

        res.send(200, updatedClient)
      } else {
        res.send(401, 'Only admins of the API are able to use this endpoint.')
      }
      return next()
    } catch (err) {
      console.error(err)
      return next(err)
    }
  })

  // DELETE /api/v1/clients/:clientId
  // Delete an existing Client by ID.
  server.del({ path: '/clients/:clientId', version: '1' }, async (req, res, next) => {
    try {
      const isAdmin = await verifyTokenIsAdmin(req.headers['request-token'])
      if (isAdmin) {
        const cService = Mongo.getClientService()
        const deletedClient = await cService.deleteClient(req.params.clientId)

        res.send(200, deletedClient)
      } else {
        res.send(401, 'Only admins of the API are able to use this endpoint.')
      }
      return next()
    } catch (err) {
      console.error(err)
      return next(err)
    }
  })

  // GET /api/v1/clients/:clientId/token
  // Retrieve the token for the given Client.
  server.get({ path: '/clients/:clientId/token', version: '1' }, async (req, res, next) => {
    try {
      const isAdmin = await verifyTokenIsAdmin(req.headers['request-token'])
      if (isAdmin) {
        const cService = Mongo.getClientService()
        const client = await cService.getClient(req.params.clientId)

        res.send(200, client.token)
      } else {
        res.send(401, 'Only admins of the API are able to use this endpoint.')
      }
      return next()
    } catch (err) {
      console.error(err)
      return next(err)
    }
  })

  // PUT /api/v1/clients/:clientId/token
  // Update the token for the given Client.
  server.put({ path: '/clients/:clientId/token', version: '1' }, async (req, res, next) => {
    try {
      const isAdmin = await verifyTokenIsAdmin(req.headers['request-token'])
      if (isAdmin) {
        const cService = Mongo.getClientService()
        const updatedClient = await cService.updateClientToken(req.params.clientId, req.body)

        res.send(200, updatedClient)
      } else {
        res.send(401, 'Only admins of the API are able to use this endpoint.')
      }
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
