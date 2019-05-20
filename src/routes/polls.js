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
  server.get({ path: '/polls/:teamId', version: '1' }, (req, res, next) => {
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
  server.post({ path: '/polls/:teamId', version: '1' }, (req, res, next) => {
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

  server.del({ path: '/polls/:teamId', version: '1' }, (req, res, next) => {
    // Add step to verify the requesting user is an admin of sorts.
  })

  server.get({ path: '/polls/:teamId/:pollId', version: '1' }, (req, res, next) => {
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

  server.put({ path: '/polls/:teamId/:pollId', version: '1' }, (req, res, next) => {
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

  server.del({ path: '/polls/:teamId/:pollId', version: '1' }, (req, res, next) => {
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

  server.get({ path: '/polls/:teamId/:pollId/question', version: '1' }, (req, res, next) => {
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

  server.get({ path: '/polls/:teamId/:pollId/responses', version: '1' }, (req, res, next) => {
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

  server.post({ path: '/polls/:teamId/:pollId/responses', version: '1' }, (req, res, next) => {
    DB.Polls(req.params.teamId).findById(req.params.pollId, (err, ogDbRes) => {
      if (err) {
        console.error(err)
        return next(err)
      } else {
        let exists = false

        for (let x = 0; x < ogDbRes.responses.length; x++) {
          const resA = ogDbRes.responses[x]
          if (resA.content === req.body.content) {
            exists = true
          }
        }

        if (exists) {
          res.send(409, 'This poll already has a response with the same content. Please submit a response with a different content value.')
          return next()
        } else {
          ogDbRes.responses.push(req.body)
          DB.Polls(req.params.teamId).updateOne({ _id: req.params.pollId }, ogDbRes, (err, nsDbRes) => {
            if (err) {
              console.error(err)
              return next(err)
            } else {
              res.send(200, ogDbRes)
              return next()
            }
          })
        }
      }
    })
  })
}

module.exports = main
