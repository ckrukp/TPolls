const mongooseStringQuery = require('mongoose-string-query')
const Constants = require('../../util/config').constants
const timestamps = require('mongoose-timestamp')
const UIDGenerator = require('uid-generator')
const mongoose = require('mongoose')
const crypto = require('crypto')

const tokenGen = new UIDGenerator(Constants.tokenBaseEncoding, Constants.tokens.length)
const uidGen = new UIDGenerator(Constants.uid.baseEncoding, Constants.uid.length)

const ClientSchema = mongoose.Schema({
  _id: String,
  username: String,
  hash: String,
  salt: String,
  token: {
    value: String,
    expires: String
  }
})

/**
 * Generates a unique identifier for the client and returns it as a String via a
 * Promise.
 *
 * @returns {Promise<String>} The generated id for the client.
 */
const generateId = async () => {
  try {
    this._id = await uidGen.generate()

    return this._id
  } catch (err) {
    console.error(err)
    return err
  }
}

const generateToken = async () => {
  try {
    const tokenValue = await tokenGen.generate()
    const expires = new Date()
    expires.setDate(expires.getDate() + 90)

    this.token = {
      value: tokenValue,
      expires: expires
    }

    return this.token
  } catch (err) {
    console.error(err)
    return err
  }
}

const setPassword = async password => {
  this.salt = crypto.randomBytes(16).toString('hex')
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, this.salt, 10000, 512, 'sha512', (err, key) => {
      if (err) reject(err)
      else {
        this.hash = key.toString('hex')
        resolve()
      }
    })
  })
}

const validatePassword = async password => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, this.salt, 10000, 512, 'sha512', (err, key) => {
      if (err) reject(err)
      else resolve(this.hash === key.toString('hex'))
    })
  })
}

ClientSchema.plugin(mongooseStringQuery)
ClientSchema.plugin(timestamps)

ClientSchema.methods.generateId = generateId
ClientSchema.methods.setPassword = setPassword
ClientSchema.methods.generateToken = generateToken
ClientSchema.methods.validatePassword = validatePassword

module.exports = mongoose.connection.useDb('config').model('Client', ClientSchema, 'Clients')
