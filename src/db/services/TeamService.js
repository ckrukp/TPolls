/**
 * The class for interacting with the Teams stored in the MongoDB backend.
 */
class TeamService {
  /**
  * The constructor for the Polls class. Requires the id of the team you wish
  * to interact with in order to function.
  *
  * @param {restify.Request} req The request object to instantiate the service with.
  */
  constructor (req) {
    this.Model = require('../models/Team')()
    this.clientId = req.params.clientId
    this.teamId = req.params.teamId
  }

  /**
   * Get a list of all the teams currently stored in the MongoDB backend.
   *
   * @returns {Promise<Team[]>} An array of Teams via a Promise.
   */
  async getAllTeams () { return this.Model.find() }

  /**
   * Gets an array of Teams that have been created by the specified Client.
   *
   * @returns {Promise<Team[]>} An array of Teams via a Promise.
   */
  async getClientTeams () { return this.Model.find({ clientId: this.clientId }) }

  /**
   * Creates a new Team in MongoDB using the provided Team object.
   *
   * @param {Team} team The Team object to create in the DB.
   */
  async createTeam (clientId, team) { return this.Model.create({ clientId: clientId, ...team }) }

  /**
   * Gets the team with the given id from MongoDB and returns it via a Promise.
   *
   * @param {String} teamId The id of the team you wish to retrieve.
   *
   * @returns {Promise<Team>} The requested Team object.
   */
  async getTeam (teamId) { return this.Model.findById(teamId) }

  /**
   * Updates an existing Team with the provided id using the provided Team as
   * the update object. Upsert is set to false, so if the Team doesn't already
   * exist, this request will fail.
   *
   * @param {String} teamId The id of the team to update.
   * @param {Team} updateObj The new version of the Team to update with.
   *
   * @returns {Promise<Team>} The newly updated Team via a Promise.
   */
  async updateTeam (teamId, updateObj) {
    return this.Model.findByIdAndUpdate(teamId, updateObj, { upsert: false, new: true })
  }

  /**
   * Queries the MongoDB for a Team with the given id and if it's found, is
   * deleted and the Team object that was deleted is returned via a Promise.
   *
   * @param {String} teamId The id of the Team to delete.
   *
   * @returns {Promise<Team>} The deleted Team object (if one is found).
   */
  async deleteTeam (teamId) {
    return this.Model.findByIdAndDelete(teamId)
  }

  getMembers (teamId) {
    return new Promise((resolve, reject) => {
      this.Model.findById(teamId, (err, res) => {
        if (err) reject(err)
        else resolve(res.members)
      })
    })
  }

  addMember (teamId, member) {
    return new Promise((resolve, reject) => {
      this.Model.findById(teamId, (err, res) => {
        if (err) reject(err)
        else {
          // Add the new Member object to the current Array of Members.
          res.members.push(member)

          // Send the newly updated Team object to the updateTeam method to store the changes.
          resolve(this.updateTeam(teamId, res))
        }
      })
    })
  }

  getMember (teamId, memberId) {
    return new Promise((resolve, reject) => {
      this.Model.findById(teamId, (err, res) => {
        if (err) reject(err)
        else {
          // Iterate through the current list of Members searching for the one to return.
          for (const member of res.members) {
            // If the ids match, we've found the Member to return, so return it.
            if (member._id === memberId) resolve(member)
          }

          // If we reach this point it means no members were found with a matching id.
          // Resolve undefined, indicating nothing was found.
          resolve(undefined)
        }
      })
    })
  }

  updateMember (teamId, memberId, updateObj) {
    return new Promise((resolve, reject) => {
      this.Model.findById(teamId, (err, res) => {
        if (err) reject(err)
        else {
          let newMembers = []
          // Iterate through the current list of Members searching for the one to update.
          for (const member of res.members) {
            // If the ids match, we've found the Member to update.
            if (member._id === memberId) {
              // If the displayName property doesn't match up, update it with the new one.
              if (member.displayName !== updateObj.displayName) { member.displayName = updateObj.displayName }

              // If the voteCount property doesn't match up, update it with the new one.
              if (member.voteCount !== updateObj.voteCount) { member.voteCount = updateObj.voteCount }
            }

            newMembers.push(member)
          }

          res.members = newMembers
          resolve(this.updateTeam(teamId, res))
        }
      })
    })
  }

  deleteMember (teamId, memberId) {
    return new Promise((resolve, reject) => {
      this.Model.findById(teamId, (err, res) => {
        if (err) reject(err)
        else {
          let newMembers = []
          for (const member of res.members) {
            if (member._id !== memberId) newMembers.push(member)
          }

          res.members = newMembers
          resolve(this.updateTeam(teamId, res))
        }
      })
    })
  }
}

module.exports = TeamService

// #region TypeData
/**
 * @typedef {Object} Team
 *
 * @prop {String} _id The id of the team, also the id of the server on Discord.
 * @prop {String} [displayName] The name of the team to use for display purposes.
 * @prop {Member[]} [members] An array of member objects for each member of the team.
 */

/**
 * @typedef {Object} Member
 *
 * @prop {String} _id The id of the member, also the id of the user on Discord.
 * @prop {String} [displayName] The username/nickname of the member.
 * @prop {Number} [voteCount] The amount of times this member has cast a vote.
 */
// #endregion TypeData
