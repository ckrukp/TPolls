// #region TypeData
const restify = require('restify') // Used for type data
// #endregion TypeData

const beautify = require('json-beautify')
const errors = require('restify-errors')
const tools = require('../util/tools')
const DB = require('../db/index')

/**
 *
 * @param {restify.Server} server The server object.
 */
const main = server => {
  // Returns all polls currently created for the given team.
  server.get('/polls/:teamId', (req, res, next) => {
    DB.Polls(req.params.teamId).find((err, dbRes) => {
      if (err) {
        console.error(err)
        return next(err)
      } else {
        res.send(200, dbRes)
        return next()
      }
    })
  })

  // Creates a new poll for the given team using the given NewPoll object.
  server.post('/polls/:teamId', (req, res, next) => {
    DB.Polls(req.params.teamId).create(req.body, (err, dbRes) => {
      if (err) {
        console.error(err)
        return next(err)
      } else {
        res.send(200, dbRes)
        return next()
      }
    })
  })

  server.del('/polls/:teamId', (req, res, next) => {
    // Add step to verify the requesting user is an admin of sorts.
  })

  server.get('/polls/:teamId/:pollId', (req, res, next) => {
    DB.Polls(req.params.teamId).findById(req.params.pollId, (err, dbRes) => {
      if (err) {
        console.error(err)
        return next(err)
      } else {
        res.send(200, dbRes)
        return next()
      }
    })
  })

  server.put('/polls/:teamId/:pollId', (req, res, next) => {
    DB.Polls(req.params.teamId).findByIdAndUpdate(req.params.pollId, req.body, (err, dbRes) => {
      if (err) {
        console.error(err)
        return next(err)
      } else {
        res.send(200, dbRes)
        return next()
      }
    })
  })

  server.del('/polls/:teamId/:pollId', (req, res, next) => {
    DB.Polls(req.params.teamId).findByIdAndDelete(req.params.pollId, (err, dbRes) => {
      if (err) {
        console.error(err)
        return next(err)
      } else {
        res.send(200, dbRes)
        return next()
      }
    })
  })

  server.get('/polls/:teamId/:pollId/question', (req, res, next) => {
    DB.Polls(req.params.teamId).findById(req.params.pollId, (err, dbRes) => {
      if (err) {
        console.error(err)
        return next(err)
      } else {
        res.send(200, dbRes.question)
        return next()
      }
    })
  })

  server.get('/polls/:teamId/:pollId/responses', (req, res, next) => {
    DB.Polls(req.params.teamId).findById(req.params.pollId, (err, dbRes) => {
      if (err) {
        console.error(err)
        return next(err)
      } else {
        res.send(200, dbRes.responses)
        return next()
      }
    })
  })

  server.post('/polls/:teamId/:pollId/responses', (req, res, next) => {
  })
}

module.exports = main
