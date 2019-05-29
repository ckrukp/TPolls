const mongooseStringQuery = require('mongoose-string-query')
const timestamps = require('mongoose-timestamp')
const mongoose = require('mongoose')

const SCOPE = require('./Shared').SCOPE

const ClientSchema = mongoose.Schema({
  _id: String,
  secret: String,
  teams: [{
    _id: String,
    scope: SCOPE
  }]
})

ClientSchema.plugin(mongooseStringQuery)
ClientSchema.plugin(timestamps)

module.exports = mongoose.model('Client', ClientSchema, 'clients')
