const { verifyTokenIsAdmin, validateToken } = require('../util/auth')
const Mongo = require('../db/index')

/**
 *
 * @param {restify.Server} server
 */
const main = server => {
  // GET /api/v1/teams
  // Get a list of all the current teams.
  server.get({ path: '/teams', version: '1' }, async (req, res, next) => {
    try {
      const isAdmin = await verifyTokenIsAdmin(req.headers['api-key'])

      if (!isAdmin) res.send(401, 'Only admins of the API are able to use this endpoint.')
      else {
        const tService = Mongo.getTeamService(req)
        const teams = await tService.getAllTeams()

        res.send(200, teams)
      }

      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  // POST /api/v1/teams/:clientId
  // Create a new team.
  server.post({ path: '/teams/:clientId', version: '1' }, async (req, res, next) => {
    try {
      const validToken = await validateToken(req.params.clientId, req.headers['api-key'])

      if (!validToken) res.send(401, 'The token you provided was either invalid or does not match the provided clientId.')
      else {
        const tService = Mongo.getTeamService(req)
        const newTeam = await tService.createTeam(req.params.clientId, req.body)

        res.send(200, newTeam)
      }

      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  // GET /api/v1/teams/:clientId
  // Get a list of all the teams created by a specific client.
  server.get({ path: '/teams/:clientId', version: '1' }, async (req, res, next) => {
    try {
      const validToken = await validateToken(req.params.clientId, req.headers['api-key'])

      if (!validToken) res.send(401, 'The token you provided was either invalid or does not match the provided clientId.')
      else {
        const tService = Mongo.getTeamService(req)
        const teams = await tService.getClientTeams()

        res.send(200, teams)
      }

      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  // GET /api/v1/teams/:clientId/:teamId
  // Get a specific team.
  server.get({ path: '/teams/:clientId/:teamId', version: '1' }, async (req, res, next) => {
    try {
      const validToken = await validateToken(req.params.clientId, req.headers['api-key'])

      if (!validToken) res.send(401, 'The token you provided was either invalid or does not match the provided clientId.')
      else {
        const tService = Mongo.getTeamService(req)
        const team = await tService.getTeam(req.params.teamId)

        res.send(200, team)
      }

      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  // PUT /api/v1/teams/:clientId/:teamId
  // Update an existing team.
  server.put({ path: '/teams/:clientId/:teamId', version: '1' }, async (req, res, next) => {
    try {
      const validToken = await validateToken(req.params.clientId, req.headers['api-key'])

      if (!validToken) res.send(401, 'The token you provided was either invalid or does not match the provided clientId.')
      else {
        const tService = Mongo.getTeamService(req)
        const newTeam = await tService.updateTeam(req.params.teamId, req.body)

        res.send(200, newTeam)
      }

      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  // DELETE /api/v1/teams/:clientId/:teamId
  // Delete an existing team.
  server.del({ path: '/teams/:clientId/:teamId', version: '1' }, async (req, res, next) => {
    try {
      const validToken = await validateToken(req.params.clientId, req.headers['api-key'])

      if (!validToken) res.send(401, 'The token you provided was either invalid or does not match the provided clientId.')
      else {
        const tService = Mongo.getTeamService(req)
        const oldTeam = await tService.deleteTeam(req.params.teamId)

        res.send(200, oldTeam)
      }

      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  // GET /api/v1/teams/:clientId/:teamId/members
  // Get the list of members currently in the team.
  server.get({ path: '/teams/:clientId/:teamId/members', version: '1' }, async (req, res, next) => {
    try {
      const validToken = await validateToken(req.params.clientId, req.headers['api-key'])

      if (!validToken) res.send(401, 'The token you provided was either invalid or does not match the provided clientId.')
      else {
        const tService = Mongo.getTeamService(req)
        const members = await tService.getMembers(req.params.teamId)

        res.send(200, members)
      }

      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  // POST /api/v1/teams/:clientId/:teamId/members
  // Create/add a new member to the team.
  server.post({ path: '/teams/:clientId/:teamId/members', version: '1' }, async (req, res, next) => {
    try {
      const validToken = await validateToken(req.params.clientId, req.headers['api-key'])

      if (!validToken) res.send(401, 'The token you provided was either invalid or does not match the provided clientId.')
      else {
        const tService = Mongo.getTeamService(req)
        const members = await tService.addMember(req.params.teamId, req.body)

        res.send(200, members)
      }

      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  // GET /api/v1/teams/:clientId/:teamId/members/:memberId
  // Get the information of a specific team member.
  server.get({ path: '/teams/:clientId/:teamId/members/:memberId', version: '1' }, async (req, res, next) => {
    try {
      const validToken = await validateToken(req.params.clientId, req.headers['api-key'])

      if (!validToken) res.send(401, 'The token you provided was either invalid or does not match the provided clientId.')
      else {
        const tService = Mongo.getTeamService(req)
        const member = await tService.getMember(req.params.teamId, req.params.memberId)

        res.send(200, member)
      }

      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  // PUT /api/v1/teams/:clientId/:teamId/members/:memberId
  // Update the information of an existing team member.
  server.put({ path: '/teams/:clientId/:teamId/members/:memberId', version: '1' }, async (req, res, next) => {
    try {
      const validToken = await validateToken(req.params.clientId, req.headers['api-key'])

      if (!validToken) res.send(401, 'The token you provided was either invalid or does not match the provided clientId.')
      else {
        const tService = Mongo.getTeamService(req)
        const updatedMember = await tService.updateMember(req.params.teamId, req.params.memberId, req.body)

        res.send(200, updatedMember)
      }

      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  // DELETE /api/v1/teams/:clientId/:teamId/members/:memberId
  // Delete an existing team member from the team.
  server.del({ path: '/teams/:clientId/:teamId/members/:memberId', version: '1' }, async (req, res, next) => {
    try {
      const validToken = await validateToken(req.params.clientId, req.headers['api-key'])

      if (!validToken) res.send(401, 'The token you provided was either invalid or does not match the provided clientId.')
      else {
        const tService = Mongo.getTeamService(req)
        const oldMember = await tService.deleteMember(req.params.teamId, req.params.memberId)

        res.send(200, oldMember)
      }

      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })
}

module.exports = main

// #region TypeData
const restify = require('restify')
// #endregion TypeData
