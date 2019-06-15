const Mongo = require('../db/index')

/**
 *
 * @param {restify.Server} server
 */
const main = server => {
  // Get a list of all the current teams.
  server.get({ path: '/teams', version: '1' }, async (req, res, next) => {
    try {
      const tService = Mongo.getTeamService(req)
      const teams = await tService.getTeams()

      res.send(200, teams)
      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  // Create a new team.
  server.post({ path: '/teams', version: '1' }, async (req, res, next) => {
    try {
      const tService = Mongo.getTeamService(req)
      const newTeam = await tService.createTeam(req.body)

      res.send(200, newTeam)
      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  // Get a specific team.
  server.get({ path: '/teams/:teamId', version: '1' }, async (req, res, next) => {
    try {
      const tService = Mongo.getTeamService(req)
      const team = await tService.getTeam(req.params.teamId)

      res.send(200, team)
      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  // Update an existing team.
  server.put({ path: '/teams/:teamId', version: '1' }, async (req, res, next) => {
    try {
      const tService = Mongo.getTeamService(req)
      const newTeam = await tService.updateTeam(req.params.teamId, req.body)

      res.send(200, newTeam)
      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  // Delete an existing team.
  server.del({ path: '/teams/:teamId', version: '1' }, async (req, res, next) => {
    try {
      const tService = Mongo.getTeamService(req)
      const oldTeam = await tService.deleteTeam(req.params.teamId)

      res.send(200, oldTeam)
      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  // Get the list of members currently in the team.
  server.get({ path: '/teams/:teamId/members', version: '1' }, async (req, res, next) => {
    try {
      const tService = Mongo.getTeamService(req)
      const members = await tService.getMembers(req.params.teamId)

      res.send(200, members)
      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  // Create/add a new member to the team.
  server.post({ path: '/teams/:teamId/members', version: '1' }, async (req, res, next) => {
    try {
      const tService = Mongo.getTeamService(req)
      const members = await tService.addMember(req.params.teamId, req.body)

      res.send(200, members)
      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  // Get the information of a specific team member.
  server.get({ path: '/teams/:teamId/members/:memberId', version: '1' }, async (req, res, next) => {
    try {
      const tService = Mongo.getTeamService(req)
      const member = await tService.getMember(req.params.teamId, req.params.memberId)

      res.send(200, member)
      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  // Update the information of an existing team member.
  server.put({ path: '/teams/:teamId/members/:memberId', version: '1' }, async (req, res, next) => {
    try {
      const tService = Mongo.getTeamService(req)
      const updatedMember = await tService.updateMember(req.params.teamId, req.params.memberId, req.body)

      res.send(200, updatedMember)
      return next()
    } catch (err) {
      console.error(err)
      res.send(err)
      return next(err)
    }
  })

  // Delete an existing team member from the team.
  server.del({ path: '/teams/:teamId/members/:memberId', version: '1' }, async (req, res, next) => {
    try {
      const tService = Mongo.getTeamService(req)
      const oldMember = await tService.deleteMember(req.params.teamId, req.params.memberId)

      res.send(200, oldMember)
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
