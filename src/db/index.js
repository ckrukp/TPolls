
const PollService = require('./services/PollService')
const TeamService = require('./services/TeamService')

/**
 * Get the PollService class which is used for interacting with the MongoDB
 * backend for any data related to a Poll.
 *
 * @param {restify.Request} req
 */
const getPollService = req => {
  return new PollService(req.params.teamId)
}

/**
 * Get the TeamService class which is used for interacting with the MongoDB
 * backend for any data related to a Team.
 *
 * @param {restify.Request} req
 */
const getTeamService = req => {
  return new TeamService(req.params.teamId)
}

module.exports.getPollService = getPollService
module.exports.getTeamService = getTeamService

// #region TypeData
const restify = require('restify')
// #endregion TypeData
