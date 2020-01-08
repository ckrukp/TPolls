const mongooseStringQuery = require('mongoose-string-query')
const timestamps = require('mongoose-timestamp')
const mongoose = require('mongoose')
const crypto = require('crypto')

const ClientSchema = mongoose.Schema({
  username: String,
  hash: String,
  salt: String,
  token: String,
  dasAdmin: Boolean
})

const generatePassword = async (password, salt) => {
  this.salt = crypto.randomBytes(16).toString('hex')
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 10000, 512, 'sha512', (err, key) => {
      if (err) reject(err)
      else {
        this.hash = key.toString('hex')
        resolve()
      }
    })
  })
}

ClientSchema.plugin(mongooseStringQuery)
ClientSchema.plugin(timestamps)

module.exports.generatePassword = generatePassword
module.exports = mongoose.connection.useDb('tpConfig').model('Client', ClientSchema, 'Clients')
