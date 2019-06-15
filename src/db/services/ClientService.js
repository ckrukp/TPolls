/**
 * The class for interacting with the Clients stored in the MongoDB backend.
 */
class ClientService {
  constructor () {
    this.Model = require('../models/Client')
  }

  async getClients () {
    try {
      return this.Model.find({})
    } catch (err) {
      console.error(err)
      return err
    }
  }

  async getClient (clientId) {
    try {
      return this.Model.findById(clientId)
    } catch (err) {
      console.error(err)
      return err
    }
  }

  /**
   *
   * @param {Client} client
   */
  addClient (client) {
    return this.Model.create(client)
  }

  deleteClient (clientId) {
    return this.Model.findByIdAndDelete(clientId)
  }

  updateClient (clientId, updateObj) {
    return this.Model.findByIdAndUpdate(clientId, updateObj)
  }
}

module.exports = ClientService

// #region TypeData
const { ObjectId } = require('mongodb')

/**
 * @typedef {Object} Client
 *
 * @prop {ObjectId} _id The unique identifier of the Client.
 * @prop {String} [username]
 * @prop {String} [hash]
 * @prop {String} [salt]
 * @prop {Token} [token]
 */

/**
 * @typedef {Object} Token
 *
 * @prop {String} value
 * @prop {String} expires
 */
// #endregion TypeData
