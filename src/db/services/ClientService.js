/**
 * The class for interacting with the Clients stored in the MongoDB backend.
 */
class ClientService {
  constructor () {
    this.Model = require('../models/Client')
  }

  /**
   * Get an array of all the Clients currently stored in the MongoDB backend and
   * returns them via a Promise.
   *
   * @returns {Promise<Client[]>}
   */
  getClients () { return this.Model.find() }

  /**
   * Gets an existing Client from the MongoDB backend with the provided id and
   * returns it via a Promise.
   *
   * @param {String} clientId The identifier of the Client you wish to retrieve.
   *
   * @returns {Promise<Client>}
   */
  getClient (clientId) { return this.Model.findById(clientId) }

  /**
   * Creates a new Client in the MongoDB backend using the provided Client
   * object and then returns the newly stored object via a Promise.
   *
   * @param {Client} client
   *
   * @returns {Promise<Client>}
   */
  async createClient (client) {
    const pass = await generatePassword(client.hash)

    return new Promise((resolve, reject) => {
      this.Model.findOne({ username: client.username }, (err, res) => {
        if (err) reject(err) // Internal error
        else {
          if (res) {
            reject(new Error('User already exists with this username.'))
          } else {
            client.hash = pass.hash
            client.salt = pass.salt
            resolve(this.Model.create(client))
          }
        }
      })
    })

    // client.hash = this.Model.setPassword(client.hash)
    // return this.Model.create(client)
  }

  /**
   * Deletes an existing Client from the MongoDB backend and then returns the
   * object that was deleted via a Promise.
   *
   * @param {String} clientId The identifier of the Client you wish to delete.
   *
   * @returns {Promise<Client>}
   */
  deleteClient (clientId) { return this.Model.findByIdAndDelete(clientId) }

  /**
   * Updates an existing Client in the MongoDB backend and then returns the
   * updated version via a Promise.
   *
   * @param {String} clientId The identifier of the Client you wish to update.
   * @param {Client} updateObj The new version of the Client to be stored.
   */
  updateClient (clientId, updateObj) { return this.Model.findByIdAndUpdate(clientId, updateObj, { new: true }) }

  getClientToken (clientId) {
    return new Promise((resolve, reject) => {
      this.Model.findById(clientId, (err, res) => {
        if (err) reject(err)
        else {
          if (res) resolve(res.token)
          else resolve(null)
        }
      })
    })
  }

  updateClientToken (clientId, token) { return this.Model.findByIdAndUpdate(clientId, { token: token }, { new: true }) }
}

module.exports = ClientService

const crypto = require('crypto')
const generatePassword = async password => {
  const salt = crypto.randomBytes(16).toString('hex')
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 10000, 512, 'sha512', (err, key) => {
      if (err) reject(err)
      else {
        this.hash = key.toString('hex')
        resolve({
          hash: key.toString('hex'),
          salt: salt
        })
      }
    })
  })
}

// #region TypeData
/**
 * @typedef {Object} Client Represents a user of the TPolls API.
 *
 * @prop {String} _id The unique identifier of the Client.
 * @prop {String} username The display name/login name of the user.
 * @prop {String} hash The stored hash of the users password.
 * @prop {Token} [token] The Token object used to access the API.
 */

/**
 * @typedef {Object} Token Represents the values used by the Client to access the TPolls API.
 *
 * @prop {String} value The actual token String used to access the API.
 * @prop {String} expires The Date/Time of when this token will no longer be valid.
 */
// #endregion TypeData
