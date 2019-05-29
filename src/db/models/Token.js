const mongooseStringQuery = require('mongoose-string-query')
const timestamps = require('mongoose-timestamp')
const mongoose = require('mongoose')

const SCOPE = require('./Shared').SCOPE

const TokenSchema = mongoose.Schema({
  _id: String,
  token: String,
  expires: String,
  access: [{
    _id: String,
    scope: SCOPE
  }]
})

TokenSchema.plugin(mongooseStringQuery)
TokenSchema.plugin(timestamps)

module.exports = mongoose.model('Token', TokenSchema, 'tokens')
