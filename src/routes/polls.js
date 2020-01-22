const { validateToken, verifyTokenIsAdmin } = require('../util/auth')
const log = require('../util/tools').getLogger()
const Mongo = require('../db')

const main = server => {
  // GET /api/v1/polls/:clientId/:teamId
  // Returns all polls currently created for the given team.
  server.get({ path: '/polls/:clientId/:teamId', version: '1' }, async (req, res, next) => {
    try {
      const validToken = await validateToken(req.params.clientId, req.headers['api-key'])

      if (!validToken) res.send(401, 'The token you provided was either invalid or does not match the provided clientId.')
      else {
        const pService = Mongo.getPollService(req)
        const polls = await pService.getPolls()

        res.send(200, polls)
      }

      return next()
    } catch (err) {
      log.error(err)
      res.send(500, err)
      return next(err)
    }
  })

  // POST /api/v1/polls/:clientId/:teamId
  // Creates a new poll for the given team using the given NewPoll object.
  server.post({ path: '/polls/:clientId/:teamId', version: '1' }, async (req, res, next) => {
    try {
      const validToken = await validateToken(req.params.clientId, req.headers['api-key'])

      if (!validToken) res.send(401, 'The token you provided was either invalid or does not match the provided clientId.')
      else {
        const pService = Mongo.getPollService(req)
        const newPoll = await pService.createPoll(req.body)

        if (newPoll instanceof Error) res.send(409, 'A poll already exists with the given displayName.')
        else res.send(200, newPoll)
      }

      return next()
    } catch (err) {
      log.error(err)
      res.send(500, err)
      return next(err)
    }
  })

  // DELETE /api/v1/polls/:clientId/:teamId
  // Delete all polls that exist for a given Team.
  server.del({ path: '/polls/:clientId/:teamId', version: '1' }, async (req, res, next) => {
    res.send(501, 'This endpoint has not been implemented yet.')
    return next()
    try {
      const validToken = await verifyTokenIsAdmin(req.headers['api-key'])
      if (!validToken) res.send(401)
      else {

      }
    } catch (err) {
      log.error(err)
      res.send(500, err)
      return next(err)
    }
  })

  // GET /api/v1/polls/:clientId/:teamId/:pollId
  // Get a specific poll by id.
  server.get({ path: '/polls/:clientId/:teamId/:pollId', version: '1' }, async (req, res, next) => {
    try {
      const validToken = await validateToken(req.params.clientId, req.headers['api-key'])

      if (!validToken) res.send(401, 'The token you provided was either invalid or does not match the provided clientId.')
      else {
        const pService = Mongo.getPollService(req)
        const poll = await pService.getPoll(req.params.pollId)

        res.send(200, poll)
      }

      return next()
    } catch (err) {
      log.error(err)
      res.send(500, err)
      return next(err)
    }
  })

  // PUT /api/v1/polls/:clientId/:teamId/:pollId
  // Update the information an existing poll.
  server.put({ path: '/polls/:clientId/:teamId/:pollId', version: '1' }, async (req, res, next) => {
    try {
      const validToken = await validateToken(req.params.clientId, req.headers['api-key'])

      if (!validToken) res.send(401, 'The token you provided was either invalid or does not match the provided clientId.')
      else {
        const pService = Mongo.getPollService(req)
        const updatedPoll = await pService.updatePoll(req.params.pollId, req.body)

        res.send(200, updatedPoll)
      }

      return next()
    } catch (err) {
      log.error(err)
      res.send(500, err)
      return next(err)
    }
  })

  // DELETE /api/v1/polls/:clientId/:teamId/:pollId
  // Delete an existing poll.
  server.del({ path: '/polls/:clientId/:teamId/:pollId', version: '1' }, async (req, res, next) => {
    try {
      const validToken = await validateToken(req.params.clientId, req.headers['api-key'])

      if (!validToken) res.send(401, 'The token you provided was either invalid or does not match the provided clientId.')
      else {
        const pService = Mongo.getPollService(req)
        const dRes = await pService.deletePollFromTeam(req.params.pollId)

        res.send(200, dRes)
      }
      return next()
    } catch (err) {
      log.error(err)
      res.send(500, err)
      return next(err)
    }
  })

  // GET /api/v1/polls/:clientId/:teamId/:pollId/question
  // Get the question for an existing Poll.
  server.get({ path: '/polls/:clientId/:teamId/:pollId/question', version: '1' }, async (req, res, next) => {
    try {
      const validToken = await validateToken(req.params.clientId, req.headers['api-key'])

      if (!validToken) res.send(401, 'The token you provided was either invalid or does not match the provided clientId.')
      else {
        const pService = Mongo.getPollService(req)
        const question = await pService.getPollQuestion(req.params.pollId)

        res.send(200, question)
      }
      return next()
    } catch (err) {
      log.error(err)
      res.send(500, err)
      return next(err)
    }
  })

  // GET /api/v1/polls/:clientId/:teamId/:pollId/responses
  // Get all of the available responses for an existing poll.
  server.get({ path: '/polls/:clientId/:teamId/:pollId/responses', version: '1' }, async (req, res, next) => {
    try {
      const validToken = await validateToken(req.params.clientId, req.headers['api-key'])

      if (!validToken) res.send(401, 'The token you provided was either invalid or does not match the provided clientId.')
      else {
        const pService = Mongo.getPollService(req)
        const responses = await pService.getPollResponses(req.params.pollId)

        res.send(200, responses)
      }
      return next()
    } catch (err) {
      log.error(err)
      res.send(500, err)
      return next(err)
    }
  })

  // POST /api/v1/polls/:clientId/:teamId/:pollId/responses
  // Add a new possible response to an existing poll.
  server.post({ path: '/polls/:clientId/:teamId/:pollId/responses', version: '1' }, async (req, res, next) => {
    try {
      const validToken = await validateToken(req.params.clientId, req.headers['api-key'])

      if (!validToken) res.send(401, 'The token you provided was either invalid or does not match the provided clientId.')
      else {
        const pService = Mongo.getPollService(req)
        const status = await pService.addResponseToPoll(req.params.pollId, req.body)

        if (status.code === 409) {
          res.send(409, status.msg)
          return next()
        } else {
          res.send(200, status)
          return next()
        }
      }
    } catch (err) {
      log.error(err)
      res.send(500, err)
      return next(err)
    }
  })

  // POST /api/v1/polls/:clientId/:teamId/:pollId/vote
  // Cast a vote on an existing poll.
  server.post({ path: '/polls/:clientId/:teamId/:pollId/vote', version: '1' }, async (req, res, next) => {
    try {
      const validToken = await validateToken(req.params.clientId, req.headers['api-key'])

      if (!validToken) res.send(401, 'The token you provided was either invalid or does not match the provided clientId.')
      else {
        const pService = Mongo.getPollService(req)
        const status = await pService.voteOnPollResponse(req.params.pollId, req.body)

        if (status.code === 404) {
          res.send(404, status.msg)
          return next()
        } else {
          res.send(200, status)
          return next()
        }
      }
    } catch (err) {
      log.error(err)
      res.send(500, err)
      return next(err)
    }
  })
}

module.exports = main
