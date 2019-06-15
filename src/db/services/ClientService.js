/**
 * The class for interacting with the Clients stored in the MongoDB backend.
 */
class ClientService {
  constructor () {
    this.Model = require('../models/Client')
  }

  getClients () { return this.Model.find() }

  getClient (clientId) { return this.Model.findById(clientId) }

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
/**
 * @typedef {Object} Client
 *
 * @prop {String} _id The unique identifier of the Client.
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
