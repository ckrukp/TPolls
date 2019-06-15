const crypto = require('crypto')

/**
 * The sole class for interacting with the authentication portion of the MongoDB
 * backend.
 */
class AuthService {
  constructor (clientId) {
    this.clientId = clientId
    this.TokenModel = require('../models/Token')
    this.ClientModel = require('../models/Client')
  }

  /**
   * Generates a token to use for authenticating against the API.
   *
   * @param {String} data The data to use in generating a token.
   */
  generateToken (data) {
    var random = Math.floor(Math.random() * 100001)
    var timestamp = (new Date()).getTime()
    var sha256 = crypto.createHmac('sha256', random + 'WOO' + timestamp)

    return sha256.update(data).digest('base64')
  }

  async getToken (clientId) { }
  async newToken (clientId) { }
  async expireToken (clientId) { }
}

module.exports = AuthService
