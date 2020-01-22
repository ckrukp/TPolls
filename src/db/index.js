const ClientService = require('./services/ClientService')
const PollService = require('./services/PollService')
const TeamService = require('./services/TeamService')

/**
 * Get the PollService class which is used for interacting with the MongoDB
 * backend for any data related to a Poll.
 *
 * @param {restify.Request} req The request object to instantiate the service with.
 */
const getPollService = req => new PollService(req.params.clientId, req.params.teamId)

/**
 * Get the TeamService class which is used for interacting with the MongoDB
 * backend for any data related to a Team.
 *
 * @param {restify.Request} req The request object to instantiate the service with.
 */
const getTeamService = req => new TeamService(req)

/**
 * Get the ClientService class which is used for interacting with the MongoDB
 * backend for any data related to clients.
 */
const getClientService = () => new ClientService()

module.exports.getPollService = getPollService
module.exports.getTeamService = getTeamService
module.exports.getClientService = getClientService

// #region TypeData
const restify = require('restify')
// #endregion TypeData
