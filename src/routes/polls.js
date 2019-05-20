// #region TypeData
const restify = require('restify') // Used for type data
// #endregion TypeData

const DB = require('../db/index')

const getPollsDb = req => {
  return new DB.Polls(req.params.teamId)
}

/**
 *
 * @param {restify.Server} server The server object.
 */
const main = server => {
  // Returns all polls currently created for the given team.
  server.get({ path: '/polls/:teamId', version: '1' }, async (req, res, next) => {
    try {
      const pollsDb = getPollsDb(req)
      const polls = await pollsDb.getPolls()

      res.send(200, polls)
      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  // Creates a new poll for zthe given team using the given NewPoll object.
  server.post({ path: '/polls/:teamId', version: '1' }, async (req, res, next) => {
    try {
      const pollsDb = getPollsDb(req)
      const newPoll = await pollsDb.createPoll(req.body)

      res.send(200, newPoll)
      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  server.del({ path: '/polls/:teamId', version: '1' }, async (req, res, next) => {
    // Add step to verify the requesting user is an admin of sorts.
  })

  server.get({ path: '/polls/:teamId/:pollId', version: '1' }, async (req, res, next) => {
    try {
      const pollsDb = getPollsDb(req)
      const poll = await pollsDb.getPoll(req.params.pollId)

      res.send(200, poll)
      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  server.put({ path: '/polls/:teamId/:pollId', version: '1' }, async (req, res, next) => {
    try {
      const pollsDb = getPollsDb(req)
      const updatedPoll = await pollsDb.updatePoll(req.params.pollId, req.body)

      res.send(200, updatedPoll)
      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  server.del({ path: '/polls/:teamId/:pollId', version: '1' }, async (req, res, next) => {
    try {
      const pollsDb = getPollsDb(req)
      const dRes = await pollsDb.deletePollFromTeam(req.params.pollId)

      res.send(200, dRes)
      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  server.get({ path: '/polls/:teamId/:pollId/question', version: '1' }, async (req, res, next) => {
    try {
      const pollsDb = getPollsDb(req)
      const question = await pollsDb.getPollQuestion(req.params.pollId)

      res.send(200, question)
      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  server.get({ path: '/polls/:teamId/:pollId/responses', version: '1' }, async (req, res, next) => {
    try {
      const pollsDb = getPollsDb(req)
      const responses = await pollsDb.getPollResponses(req.params.pollId)

      res.send(200, responses)
      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  server.post({ path: '/polls/:teamId/:pollId/responses', version: '1' }, async (req, res, next) => {
    try {
      const pollsDb = getPollsDb(req)
      const status = await pollsDb.addResponseToPoll(req.params.pollId, req.body)

      if (status.code === 409) {
        res.send(409, status.msg)
        return next()
      } else {
        res.send(200, status)
        return next()
      }
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  server.post({ path: '/polls/:teamId/:pollId/vote', version: '1' }, async (req, res, next) => {
    try {
      const pollsDb = getPollsDb(req)
      const status = await pollsDb.voteOnPollResponse(req.params.pollId, req.body)

      if (status.code === 404) {
        res.send(404, status.msg)
        return next()
      } else {
        res.send(200, status)
        return next()
      }
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })
}

module.exports = main
