/**
 * The base class for interacting with the Polls stored in the MongoDB backend.
 */
class PollService {
  /**
   * The constructor for the PollService class. Requires the id of the team you
   * wish to interact with in order to function.
   *
   * @param {String} teamId The id of the team you wish to interact with.
   */
  constructor (clientId, teamId) {
    if (teamId) {
      this.Model = require('../models/Poll')(clientId, teamId)
    } else {
      return new Error('You must provide a client and team id in order to use the PollService.')
    }
  }

  /**
   * Get all polls currently stored in the given teams collection.
   *
   * @returns {Promise<Poll[]>} An array of Polls via a Promise.
   */
  async getPolls () { return this.Model.find() }

  /**
   * Creates a new poll in MongoDB using the provided poll object.
   *
   * @param {Poll} poll The poll object to create in the DB.
   *
   * @returns {Promise<Poll>} The newly created Poll via a Promise.
   */
  async createPoll (poll) { return this.Model.create(poll) }

  /**
   * Queries the teams collection for the poll with the provided id.
   *
   * @param {String} pollId The id of the poll to return.
   *
   * @returns {Promise<Poll>} The requested Poll via a Promise.
   */
  async getPoll (pollId) { return this.Model.findById(pollId) }

  /**
   * Updates an existing Poll with the provided id using the provided Poll as
   * the update object. Upsert is set to false, so if a Poll doesn't already
   * exist with the given id, this request will fail.
   *
   * @param {String} pollId The id of the Poll to update.
   * @param {Poll} updateObj The new version of the Poll to update with.
   *
   * @returns {Promise<Poll>} The updated Poll via a Promise.
   */
  async updatePoll (pollId, updateObj) {
    return this.Model.findByIdAndUpdate(pollId, updateObj, { upsert: false, new: true })
  }

  /**
   * Deletes a poll from the current team using the given id.
   *
   * @param {String} pollId The id of the poll to delete.
   */
  async deletePollFromTeam (pollId) { return this.Model.findByIdAndDelete(pollId) }

  /**
   * Searches the current teams collection for a poll with the given id and
   * if it exists, returns the question object associated with it.
   *
   * @param {String} pollId The id of the poll to search for.
   *
   * @returns {Promise<Question>} The question posed for this poll via a Promise.
   */
  async getPollQuestion (pollId) {
    try {
      const poll = await this.getPoll(pollId)

      return poll.question
    } catch (err) {
      console.error(err)
      return err
    }
  }

  /**
   * Searches the current teams collection for a poll with the given id and
   * if it exists, returns the responses object associated with it.
   *
   * @param {String} pollId The id of the poll to search for.
   *
   * @returns {Promise<Response[]>} An array of Responses via a Promise.
   */
  async getPollResponses (pollId) {
    try {
      const poll = await this.getPoll(pollId)

      return poll.responses
    } catch (err) {
      console.error(err)
      return err
    }
  }

  /**
   * Adds the given response to the poll with the given id.
   *
   * @param {String} pollId The id of the poll to add the response to.
   * @param {Response} response The new response to add to the poll.
   *
   * @returns {Promise<Poll>} The updated Poll object via a Promise.
   */
  async addResponseToPoll (pollId, response) {
    try {
      const ogPoll = await this.getPoll(pollId)

      let exists = false

      for (let x = 0; x < ogPoll.responses.length; x++) {
        if (ogPoll.responses[x].content === response.content) {
          exists = true
        }
      }

      if (exists) {
        return {
          code: 409,
          msg: 'This poll already has a response with the same content. Please submit a response with a different content value.'
        }
      } else {
        ogPoll.responses.push(response)
        return this.Model.findByIdAndUpdate(pollId, ogPoll, { new: true, upsert: false })
      }
    } catch (err) {
      console.error(err)
      return err
    }
  }

  /**
   * Casts a vote in the poll with the given id for the response that matches
   * the query provided.
   *
   * @param {String} pollId The id of the poll to be voting in.
   * @param {ResponseQuery} response The response you wish to vote on.
   *
   * @returns {Promise<Poll>} The updated Poll via a Promise.
   */
  async voteOnPollResponse (pollId, response) {
    try {
      const ogPoll = await this.getPoll(pollId)
      let voted = false

      for (let x = 0; x < ogPoll.responses.length; x++) {
        const tmpRes = ogPoll.responses[x]

        if (tmpRes.content === response.content || tmpRes['_id'].toString() === response['_id']) {
          ogPoll.responses[x].count++
          voted = true
        }
      }

      if (voted) {
        const nsPoll = await this.updatePoll(pollId, ogPoll)

        return nsPoll
      } else {
        return {
          code: 404,
          msg: "A response with the given content couldn't be located."
        }
      }
    } catch (err) {
      console.error(err)
      return err
    }
  }
}

module.exports = PollService

// #region TypeData
/**
 * @typedef {Object} Poll
 *
 * @prop {String} [_id] The unique identifier of the poll.
 * @prop {String} [displayName] The name of the poll.
 * @prop {Question} question The question being posed.
 * @prop {Response[]} responses The available responses to vote on.
 * @prop {PollOpts} [options] The options for this poll.
 */

/**
 * @typedef {Object} Response
 * @prop {String} content The response to the posed question.
 * @prop {Number} count The amount of times this response has been voted on.
 */

/**
 * @typedef {Object} Question
 *
 * @prop {String} title The overall question to ask and be voted on.
 * @prop {String} [description] An optional field to expand on the question.
 */

/**
 * @typedef {Object} PollOpts
 *
 * @prop {boolean} [unknownResponses] Whether or not to accept responses that haven't already been added to the poll.
 * @prop {Number} [voteCount] The amount of times team members can cast a vote (defaults to 1).
 */

/**
 * @typedef {Object} ResponseQuery
 *
 * @prop {String} [_id] The unique identifier of the response.
 * @prop {String} [content] The response to the posed question.
 */
// #endregion TypeData
