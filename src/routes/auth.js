const restify = require('restify')
const crypto = require('crypto')
const SCOPE = Object.freeze({
  READ: 'READ',
  WRITE: 'WRITE',
  ADMIN: 'ADMIN'
})

const mongoose = require('mongoose')
const TokensSchema = mongoose.Schema({
  _id: String,
  token: String,
  expires: String,
  access: [{
    _id: String,
    scope: SCOPE
  }]
})
const ClientSchema = mongoose.Schema({
  _id: String,
  secret: String,
  teams: [{
    _id: String,
    scope: SCOPE
  }]
})

const TokenModel = mongoose.model('Token', TokensSchema, 'tokens')
const ClientModel = mongoose.model('Client', ClientSchema, 'clients')

const generateToken = data => {
  var random = Math.floor(Math.random() * 100001)
  var timestamp = (new Date()).getTime()
  var sha256 = crypto.createHmac('sha256', random + 'WOO' + timestamp)

  return sha256.update(data).digest('base64')
}

/**
 * @param {restify.Server} server
 */
const main = server => {
  /**
   * Get the currently issued token for the given client id.
   */
  server.get({ path: '/token', version: '1' }, (req, res, next) => {

  })

  // Get a new token for the given client id.
  server.post({ path: '/token/new', version: '1' }, (req, res, next) => {

  })

  // Expire the currently issued token for the given client id.
  server.post({ path: '/token/expire', version: '1' }, (req, res, next) => {

  })
}

module.exports = main
